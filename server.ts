import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize PostgreSQL Pool (lazy connection with Aiven / SSL support)
let pool: pg.Pool | null = null;
let dbInitialized = false;

function getDbPool(): pg.Pool | null {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log('[Database] No DATABASE_URL provided. Running with memory/local fallback mode.');
    return null;
  }

  try {
    const isSsl = connectionString.includes('sslmode=require') || connectionString.includes('aivencloud.com') || process.env.NODE_ENV === 'production';
    pool = new Pool({
      connectionString,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000,
    });

    pool.on('error', (err) => {
      console.error('[Database Pool Error]', err);
    });

    return pool;
  } catch (err) {
    console.error('[Database Init Error]', err);
    return null;
  }
}

// Ensure database schema exists on Aiven PostgreSQL and seed Otake7 account
async function ensureDbSchema() {
  const db = getDbPool();
  if (!db || dbInitialized) return;

  try {
    const client = await db.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ddon_users (
          id VARCHAR(120) PRIMARY KEY,
          username VARCHAR(80) UNIQUE NOT NULL,
          character_name VARCHAR(120) NOT NULL,
          password_hash TEXT,
          main_vocation VARCHAR(60) DEFAULT 'fighter',
          main_vocations JSONB DEFAULT '["fighter"]'::jsonb,
          servers JSONB DEFAULT '["Rising"]'::jsonb,
          role VARCHAR(30) DEFAULT 'user',
          roles JSONB DEFAULT '["user"]'::jsonb,
          clan_tag VARCHAR(30) DEFAULT '',
          title VARCHAR(120) DEFAULT 'Arisen of Lestania',
          bio TEXT DEFAULT '',
          avatar_icon VARCHAR(60) DEFAULT 'flame',
          avatar_color VARCHAR(60) DEFAULT 'amber',
          progress_data JSONB DEFAULT '{}'::jsonb,
          created_at BIGINT NOT NULL,
          last_login_at BIGINT NOT NULL
        );
        ALTER TABLE ddon_users ADD COLUMN IF NOT EXISTS role VARCHAR(30) DEFAULT 'user';
        ALTER TABLE ddon_users ADD COLUMN IF NOT EXISTS roles JSONB DEFAULT '["user"]'::jsonb;
        CREATE INDEX IF NOT EXISTS idx_ddon_users_username_lower ON ddon_users (LOWER(username));

        CREATE TABLE IF NOT EXISTS ddon_adventure_guides (
          id VARCHAR(120) PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          category VARCHAR(60) NOT NULL DEFAULT 'Progression',
          author VARCHAR(100) NOT NULL DEFAULT 'Arisen',
          author_id VARCHAR(120),
          summary TEXT,
          tags JSONB NOT NULL DEFAULT '[]'::jsonb,
          content TEXT NOT NULL,
          last_updated VARCHAR(80) DEFAULT 'Season 3.4',
          likes INT DEFAULT 0,
          dislikes INT DEFAULT 0,
          is_builtin BOOLEAN DEFAULT FALSE,
          created_at BIGINT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ddon_leveling_routes (
          id VARCHAR(120) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          level_range VARCHAR(50) NOT NULL,
          region VARCHAR(80) NOT NULL,
          description TEXT,
          quests JSONB NOT NULL DEFAULT '[]'::jsonb,
          author VARCHAR(100) DEFAULT 'Community Arisen',
          created_at BIGINT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ddon_feedback (
          id VARCHAR(120) PRIMARY KEY,
          author_name VARCHAR(100) NOT NULL,
          author_clan VARCHAR(30) DEFAULT '',
          author_role VARCHAR(30) DEFAULT 'user',
          avatar_icon VARCHAR(60) DEFAULT 'flame',
          avatar_color VARCHAR(60) DEFAULT 'amber',
          type VARCHAR(40) NOT NULL,
          rating INT DEFAULT 5,
          title VARCHAR(200) NOT NULL,
          content TEXT NOT NULL,
          likes INT DEFAULT 0,
          dislikes INT DEFAULT 0,
          created_at BIGINT NOT NULL
        );
      `);

      // Seed / Ensure the Otake7 Master Owner & Moderator Account exists in Aiven PostgreSQL
      const otakeCheck = await client.query(
        'SELECT id FROM ddon_users WHERE LOWER(username) = LOWER($1)',
        ['Otake7']
      );

      if (otakeCheck.rows.length === 0) {
        await client.query(
          `INSERT INTO ddon_users (
            id, username, character_name, password_hash, main_vocation,
            main_vocations, servers, role, roles, clan_tag, title, bio,
            avatar_icon, avatar_color, progress_data, created_at, last_login_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
          [
            'arisen-otake7-master',
            'Otake7',
            'Yukinari Flixia',
            null, // Permits logging in or using previous password/PIN if set
            'sorcerer',
            JSON.stringify(['sorcerer', 'spirit_lancer']),
            JSON.stringify(['Rising']),
            'owner',
            JSON.stringify(['owner', 'moderator']),
            'SUP',
            'Arisen of Lestania',
            'Leveling & exploring the world of Dragon\'s Dogma Online.',
            'flame',
            'amber',
            JSON.stringify({ currentLevel: 71, targetLevel: 100 }),
            Date.now(),
            Date.now()
          ]
        );
        console.log('[Database] Otake7 master Owner & Moderator profile seeded to Aiven DB successfully.');
      } else {
        // Upgrade existing Otake7 to have Owner & Moderator tags + character details
        await client.query(
          `UPDATE ddon_users SET
            character_name = COALESCE(NULLIF(character_name, ''), 'Yukinari Flixia'),
            role = 'owner',
            roles = '["owner", "moderator"]'::jsonb,
            clan_tag = 'SUP',
            title = 'Arisen of Lestania',
            main_vocation = 'sorcerer',
            main_vocations = '["sorcerer", "spirit_lancer"]'::jsonb,
            servers = '["Rising"]'::jsonb
          WHERE LOWER(username) = LOWER('Otake7')`
        );
        console.log('[Database] Verified Otake7 account with Owner & Moderator roles in Aiven DB.');
      }

      console.log('[Database] Successfully connected to Aiven PostgreSQL and verified ddon_users table.');
      dbInitialized = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('[Database Schema Setup Error]', err);
  }
}

// In-memory fallback if no database connection string is provided
const memoryUsers = new Map<string, any>();

// Seed in-memory fallback for Otake7 with Owner & Moderator tags
memoryUsers.set('otake7', {
  id: 'arisen-otake7-master',
  username: 'Otake7',
  characterName: 'Yukinari Flixia',
  password: null,
  mainVocation: 'sorcerer',
  mainVocations: ['sorcerer', 'spirit_lancer'],
  servers: ['Rising'],
  role: 'owner',
  roles: ['owner', 'moderator'],
  clanTag: 'SUP',
  title: 'Arisen of Lestania',
  bio: "Leveling & exploring the world of Dragon's Dogma Online.",
  avatarIcon: 'flame',
  avatarColor: 'amber',
  progress: { currentLevel: 71, targetLevel: 100 },
  createdAt: Date.now(),
  lastLoginAt: Date.now(),
  isGuest: false,
});

// --- API Routes ---

// Health Check (useful for Render deployment health checks)
app.get('/api/health', async (req, res) => {
  const db = getDbPool();
  let dbStatus = 'not_configured';
  if (db) {
    try {
      await db.query('SELECT 1');
      dbStatus = 'connected';
    } catch (e: any) {
      dbStatus = `error: ${e.message}`;
    }
  }
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    await ensureDbSchema();
    const {
      username,
      characterName,
      password,
      mainVocation,
      mainVocations,
      servers,
      clanTag,
      title,
      bio,
      avatarIcon,
      avatarColor,
    } = req.body;

    const cleanUsername = String(username || '').trim();
    if (!cleanUsername) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const cleanCharName = String(characterName || '').trim() || cleanUsername;
    const now = Date.now();
    const userId = `arisen-${now}-${Math.random().toString(36).substring(2, 7)}`;
    const pass = password ? String(password).trim() : null;

    const db = getDbPool();
    if (db) {
      // Check if username already exists
      const existing = await db.query(
        'SELECT id FROM ddon_users WHERE LOWER(username) = LOWER($1)',
        [cleanUsername]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: `Username "${cleanUsername}" is already taken. Please choose another.` });
      }

      const result = await db.query(
        `INSERT INTO ddon_users (
          id, username, character_name, password_hash, main_vocation,
          main_vocations, servers, clan_tag, title, bio,
          avatar_icon, avatar_color, progress_data, created_at, last_login_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *`,
        [
          userId,
          cleanUsername,
          cleanCharName,
          pass,
          mainVocation || 'fighter',
          JSON.stringify(mainVocations || ['fighter']),
          JSON.stringify(servers || ['Rising']),
          clanTag || '',
          title || 'Dragonforged Arisen',
          bio || '',
          avatarIcon || 'flame',
          avatarColor || 'amber',
          JSON.stringify({}),
          now,
          now,
        ]
      );

      const row = result.rows[0];
      return res.status(201).json({
        user: {
          id: row.id,
          username: row.username,
          characterName: row.character_name,
          password: row.password_hash ? '***' : undefined,
          mainVocation: row.main_vocation,
          mainVocations: typeof row.main_vocations === 'string' ? JSON.parse(row.main_vocations) : row.main_vocations,
          servers: typeof row.servers === 'string' ? JSON.parse(row.servers) : row.servers,
          clanTag: row.clan_tag,
          title: row.title,
          bio: row.bio,
          avatarIcon: row.avatar_icon,
          avatarColor: row.avatar_color,
          progress: row.progress_data,
          createdAt: Number(row.created_at),
          lastLoginAt: Number(row.last_login_at),
          isGuest: false,
        },
      });
    } else {
      // Memory fallback
      const key = cleanUsername.toLowerCase();
      if (memoryUsers.has(key)) {
        return res.status(409).json({ error: `Username "${cleanUsername}" is already taken.` });
      }

      const newUser = {
        id: userId,
        username: cleanUsername,
        characterName: cleanCharName,
        password: pass,
        mainVocation: mainVocation || 'fighter',
        mainVocations: mainVocations || ['fighter'],
        servers: servers || ['Rising'],
        clanTag: clanTag || '',
        title: title || 'Dragonforged Arisen',
        bio: bio || '',
        avatarIcon: avatarIcon || 'flame',
        avatarColor: avatarColor || 'amber',
        progress: {},
        createdAt: now,
        lastLoginAt: now,
        isGuest: false,
      };

      memoryUsers.set(key, newUser);
      return res.status(201).json({ user: newUser });
    }
  } catch (err: any) {
    console.error('[Register Error]', err);
    return res.status(500).json({ error: 'Failed to create account. ' + (err.message || '') });
  }
});

// User Login (Strict: ONLY permits previously registered accounts)
app.post('/api/auth/login', async (req, res) => {
  try {
    await ensureDbSchema();
    const { username, password } = req.body;
    const cleanUsername = String(username || '').trim();

    if (!cleanUsername) {
      return res.status(400).json({ error: 'Please enter your username.' });
    }

    const inputPassword = password ? String(password).trim() : '';
    const db = getDbPool();

    if (db) {
      const result = await db.query(
        `SELECT * FROM ddon_users WHERE LOWER(username) = LOWER($1) OR LOWER(character_name) = LOWER($1)`,
        [cleanUsername]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: `Account "${cleanUsername}" not found. You must register an account first before logging in.`,
        });
      }

      const row = result.rows[0];

      // If user has a password set, verify it
      if (row.password_hash && row.password_hash !== inputPassword) {
        return res.status(401).json({ error: 'Incorrect password or PIN. Please try again.' });
      }

      // Update last login timestamp
      const now = Date.now();
      await db.query('UPDATE ddon_users SET last_login_at = $1 WHERE id = $2', [now, row.id]);

      return res.json({
        user: {
          id: row.id,
          username: row.username,
          characterName: row.character_name,
          password: row.password_hash ? '***' : undefined,
          mainVocation: row.main_vocation,
          mainVocations: typeof row.main_vocations === 'string' ? JSON.parse(row.main_vocations) : row.main_vocations,
          servers: typeof row.servers === 'string' ? JSON.parse(row.servers) : row.servers,
          role: row.role || (row.username.toLowerCase() === 'otake7' ? 'owner' : 'user'),
          roles: typeof row.roles === 'string' ? JSON.parse(row.roles) : (row.roles || (row.username.toLowerCase() === 'otake7' ? ['owner', 'moderator'] : ['user'])),
          clanTag: row.clan_tag,
          title: row.title,
          bio: row.bio,
          avatarIcon: row.avatar_icon,
          avatarColor: row.avatar_color,
          progress: row.progress_data,
          createdAt: Number(row.created_at),
          lastLoginAt: now,
          isGuest: false,
        },
      });
    } else {
      // Memory fallback check
      const key = cleanUsername.toLowerCase();
      const user = memoryUsers.get(key);

      if (!user) {
        return res.status(404).json({
          error: `Account "${cleanUsername}" not found. Please click "Register New Arisen" to create an account first.`,
        });
      }

      if (user.password && user.password !== inputPassword) {
        return res.status(401).json({ error: 'Incorrect password or PIN.' });
      }

      user.lastLoginAt = Date.now();
      return res.json({ user });
    }
  } catch (err: any) {
    console.error('[Login Error]', err);
    return res.status(500).json({ error: 'Login failed. ' + (err.message || '') });
  }
});

// Save Progress & Settings (syncs character levels, trials, quest planner to Aiven DB)
app.post('/api/auth/sync-progress', async (req, res) => {
  try {
    const { userId, progressData } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const db = getDbPool();
    if (db) {
      await db.query('UPDATE ddon_users SET progress_data = $1, last_login_at = $2 WHERE id = $3', [
        JSON.stringify(progressData || {}),
        Date.now(),
        userId,
      ]);
      return res.json({ success: true, savedTo: 'aiven_postgresql' });
    } else {
      return res.json({ success: true, savedTo: 'memory' });
    }
  } catch (err: any) {
    console.error('[Sync Progress Error]', err);
    return res.status(500).json({ error: 'Failed to sync progress. ' + (err.message || '') });
  }
});

// Update Profile info
app.post('/api/auth/update-profile', async (req, res) => {
  try {
    const {
      userId,
      characterName,
      mainVocation,
      mainVocations,
      servers,
      clanTag,
      title,
      bio,
      avatarIcon,
      avatarColor,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const db = getDbPool();
    if (db) {
      await db.query(
        `UPDATE ddon_users SET
          character_name = $1,
          main_vocation = $2,
          main_vocations = $3,
          servers = $4,
          clan_tag = $5,
          title = $6,
          bio = $7,
          avatar_icon = $8,
          avatar_color = $9,
          last_login_at = $10
        WHERE id = $11`,
        [
          characterName,
          mainVocation,
          JSON.stringify(mainVocations || []),
          JSON.stringify(servers || []),
          clanTag || '',
          title || '',
          bio || '',
          avatarIcon || 'flame',
          avatarColor || 'amber',
          Date.now(),
          userId,
        ]
      );
      return res.json({ success: true });
    } else {
      return res.json({ success: true });
    }
  } catch (err: any) {
    console.error('[Update Profile Error]', err);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// --- Adventure Guides API ---
const memoryGuides: any[] = [];

app.get('/api/guides', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    let remoteRows: any[] = [];
    if (db) {
      const result = await db.query('SELECT * FROM ddon_adventure_guides ORDER BY created_at DESC LIMIT 150');
      remoteRows = result.rows.map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        author: row.author,
        authorId: row.author_id,
        summary: row.summary,
        tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
        content: row.content,
        lastUpdated: row.last_updated,
        likes: Number(row.likes) || 0,
        dislikes: Number(row.dislikes) || 0,
        isBuiltIn: Boolean(row.is_builtin),
        createdAt: Number(row.created_at)
      }));
      return res.json(remoteRows);
    }
    return res.json(memoryGuides);
  } catch (err: any) {
    console.error('[Get Guides Error]', err);
    return res.json(memoryGuides);
  }
});

app.post('/api/guides', async (req, res) => {
  try {
    await ensureDbSchema();
    const guide = req.body;
    if (!guide || !guide.id || !guide.title) {
      return res.status(400).json({ error: 'Guide ID and Title are required.' });
    }

    const now = Date.now();
    const db = getDbPool();

    // Cache in memory
    const existingIdx = memoryGuides.findIndex(g => g.id === guide.id);
    if (existingIdx !== -1) {
      memoryGuides[existingIdx] = { ...memoryGuides[existingIdx], ...guide };
    } else {
      memoryGuides.unshift({ ...guide, createdAt: now });
    }

    if (db) {
      await db.query(
        `INSERT INTO ddon_adventure_guides (id, title, category, author, author_id, summary, tags, content, last_updated, is_builtin, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           category = EXCLUDED.category,
           author = EXCLUDED.author,
           author_id = COALESCE(EXCLUDED.author_id, ddon_adventure_guides.author_id),
           summary = EXCLUDED.summary,
           tags = EXCLUDED.tags,
           content = EXCLUDED.content,
           last_updated = EXCLUDED.last_updated`,
        [
          guide.id,
          guide.title,
          guide.category || 'Progression',
          guide.author || 'Community Arisen',
          guide.authorId || null,
          guide.summary || '',
          JSON.stringify(guide.tags || []),
          guide.content || '',
          guide.lastUpdated || 'Season 3.4',
          Boolean(guide.isBuiltIn),
          now
        ]
      );
    }

    return res.json({ success: true, guide });
  } catch (err: any) {
    console.error('[Save Guide Error]', err);
    return res.status(500).json({ error: 'Failed to save guide.' });
  }
});

app.delete('/api/guides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDbPool();
    if (db) {
      await db.query('DELETE FROM ddon_adventure_guides WHERE id = $1', [id]);
    }
    const idx = memoryGuides.findIndex(g => g.id === id);
    if (idx !== -1) memoryGuides.splice(idx, 1);
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Guide Error]', err);
    return res.status(500).json({ error: 'Failed to delete guide.' });
  }
});

// --- Community Leveling Routes API ---
const memoryRoutes: any[] = [];

app.get('/api/routes', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    if (db) {
      const result = await db.query('SELECT * FROM ddon_leveling_routes ORDER BY created_at DESC LIMIT 100');
      const routes = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        levelRange: row.level_range,
        region: row.region,
        description: row.description,
        quests: typeof row.quests === 'string' ? JSON.parse(row.quests) : row.quests,
        author: row.author,
        createdAt: Number(row.created_at),
      }));
      return res.json(routes);
    }
    return res.json(memoryRoutes);
  } catch (err: any) {
    console.error('[Get Routes Error]', err);
    return res.json(memoryRoutes);
  }
});

app.post('/api/routes', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id, name, levelRange, region, description, quests, author } = req.body;
    if (!name || !quests) {
      return res.status(400).json({ error: 'Route name and quests are required.' });
    }

    const routeId = id || `custom-route-${Date.now()}`;
    const now = Date.now();
    const db = getDbPool();

    if (db) {
      await db.query(
        `INSERT INTO ddon_leveling_routes (id, name, level_range, region, description, quests, author, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           level_range = EXCLUDED.level_range,
           region = EXCLUDED.region,
           description = EXCLUDED.description,
           quests = EXCLUDED.quests,
           author = EXCLUDED.author`,
        [routeId, name, levelRange || 'Lv 1 - 100', region || 'Hidell Plains', description || '', JSON.stringify(quests || []), author || 'Community Arisen', now]
      );
      return res.json({ success: true, id: routeId });
    }

    const routeObj = { id: routeId, name, levelRange, region, description, quests, author, createdAt: now };
    memoryRoutes.unshift(routeObj);
    return res.json({ success: true, id: routeId });
  } catch (err: any) {
    console.error('[Save Route Error]', err);
    return res.status(500).json({ error: 'Failed to save route.' });
  }
});

app.delete('/api/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDbPool();
    if (db) {
      await db.query('DELETE FROM ddon_leveling_routes WHERE id = $1', [id]);
    }
    const idx = memoryRoutes.findIndex(r => r.id === id);
    if (idx !== -1) memoryRoutes.splice(idx, 1);
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Route Error]', err);
    return res.status(500).json({ error: 'Failed to delete route.' });
  }
});

// --- Community Feedback API ---
const memoryFeedback: any[] = [];

app.get('/api/feedback', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    if (db) {
      const result = await db.query('SELECT * FROM ddon_feedback ORDER BY created_at DESC LIMIT 150');
      const items = result.rows.map(row => ({
        id: row.id,
        authorName: row.author_name,
        authorClan: row.author_clan,
        authorRole: row.author_role,
        avatarIcon: row.avatar_icon,
        avatarColor: row.avatar_color,
        type: row.type,
        rating: row.rating,
        title: row.title,
        content: row.content,
        likes: row.likes || 0,
        dislikes: row.dislikes || 0,
        createdAt: Number(row.created_at),
      }));
      return res.json(items);
    }
    return res.json(memoryFeedback);
  } catch (err: any) {
    console.error('[Get Feedback Error]', err);
    return res.json(memoryFeedback);
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id, authorName, authorClan, authorRole, avatarIcon, avatarColor, type, rating, title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const feedbackId = id || `feedback-${Date.now()}`;
    const now = Date.now();
    const db = getDbPool();

    if (db) {
      await db.query(
        `INSERT INTO ddon_feedback (id, author_name, author_clan, author_role, avatar_icon, avatar_color, type, rating, title, content, likes, dislikes, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0, 0, $11)`,
        [feedbackId, authorName || 'Anonymous Arisen', authorClan || '', authorRole || 'user', avatarIcon || 'flame', avatarColor || 'amber', type || 'feature_request', rating || 5, title, content, now]
      );
      return res.json({ success: true, id: feedbackId });
    }

    const item = { id: feedbackId, authorName, authorClan, authorRole, avatarIcon, avatarColor, type, rating, title, content, likes: 0, dislikes: 0, createdAt: now };
    memoryFeedback.unshift(item);
    return res.json({ success: true, id: feedbackId });
  } catch (err: any) {
    console.error('[Submit Feedback Error]', err);
    return res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

app.post('/api/feedback/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // 'like' | 'dislike'
    const db = getDbPool();

    if (db) {
      if (type === 'like') {
        await db.query('UPDATE ddon_feedback SET likes = likes + 1 WHERE id = $1', [id]);
      } else {
        await db.query('UPDATE ddon_feedback SET dislikes = dislikes + 1 WHERE id = $1', [id]);
      }
      const resRow = await db.query('SELECT likes, dislikes FROM ddon_feedback WHERE id = $1', [id]);
      if (resRow.rows.length > 0) {
        return res.json(resRow.rows[0]);
      }
    }

    const f = memoryFeedback.find(x => x.id === id);
    if (f) {
      if (type === 'like') f.likes++;
      else f.dislikes++;
      return res.json({ likes: f.likes, dislikes: f.dislikes });
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Vote Feedback Error]', err);
    return res.status(500).json({ error: 'Vote failed.' });
  }
});

// --- Vite / Static Serve ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const portToListen = process.env.PORT ? parseInt(process.env.PORT, 10) : PORT;
  app.listen(portToListen, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${portToListen}`);
    ensureDbSchema().catch((e) => console.error('[Initial Schema Check]', e));
  });
}

startServer();
