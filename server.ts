import express from 'express';
import path from 'path';
import fs from 'fs';
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
          author_id VARCHAR(120),
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
          created_at BIGINT NOT NULL,
          updated_at BIGINT
        );
        ALTER TABLE ddon_feedback ADD COLUMN IF NOT EXISTS author_id VARCHAR(120);
        ALTER TABLE ddon_feedback ADD COLUMN IF NOT EXISTS updated_at BIGINT;

        CREATE TABLE IF NOT EXISTS ddon_feedback_votes (
          feedback_id VARCHAR(120) NOT NULL,
          voter_id VARCHAR(120) NOT NULL,
          direction VARCHAR(10) NOT NULL,
          created_at BIGINT NOT NULL,
          PRIMARY KEY (feedback_id, voter_id)
        );

        CREATE TABLE IF NOT EXISTS ddon_community_comments (
          id VARCHAR(120) PRIMARY KEY,
          item_id VARCHAR(150) NOT NULL,
          parent_id VARCHAR(120),
          parent_author_name VARCHAR(100),
          item_type VARCHAR(60) NOT NULL DEFAULT 'guide',
          author_id VARCHAR(120),
          author_name VARCHAR(100) NOT NULL,
          author_clan VARCHAR(40) DEFAULT '',
          author_role VARCHAR(30) DEFAULT 'user',
          avatar_icon VARCHAR(60) DEFAULT 'flame',
          avatar_color VARCHAR(60) DEFAULT 'amber',
          content TEXT NOT NULL,
          upvotes INT DEFAULT 0,
          downvotes INT DEFAULT 0,
          is_deleted BOOLEAN DEFAULT FALSE,
          created_at BIGINT NOT NULL
        );
        ALTER TABLE ddon_community_comments ADD COLUMN IF NOT EXISTS parent_id VARCHAR(120);
        ALTER TABLE ddon_community_comments ADD COLUMN IF NOT EXISTS parent_author_name VARCHAR(100);
        ALTER TABLE ddon_community_comments ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
        CREATE INDEX IF NOT EXISTS idx_ddon_comments_item_id ON ddon_community_comments (item_id);
        CREATE INDEX IF NOT EXISTS idx_ddon_comments_parent_id ON ddon_community_comments (parent_id);

        CREATE TABLE IF NOT EXISTS ddon_comment_votes (
          comment_id VARCHAR(120) NOT NULL,
          voter_id VARCHAR(120) NOT NULL,
          direction VARCHAR(10) NOT NULL,
          created_at BIGINT NOT NULL,
          PRIMARY KEY (comment_id, voter_id)
        );

        CREATE TABLE IF NOT EXISTS ddon_deleted_items (
          id VARCHAR(120) PRIMARY KEY,
          item_type VARCHAR(60) NOT NULL,
          deleted_at BIGINT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_ddon_deleted_items_type ON ddon_deleted_items (item_type);

        CREATE TABLE IF NOT EXISTS ddon_farm_spots (
          id VARCHAR(120) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          region VARCHAR(80) NOT NULL,
          server VARCHAR(50) NOT NULL,
          min_level INT NOT NULL,
          max_level INT NOT NULL,
          xp_per_run INT NOT NULL,
          gold_per_run INT NOT NULL,
          runs_to_level INT NOT NULL,
          target_enemies TEXT NOT NULL,
          description TEXT NOT NULL,
          recommended_vocations JSONB DEFAULT '[]'::jsonb,
          quests JSONB DEFAULT '[]'::jsonb,
          author_id VARCHAR(120),
          author_name VARCHAR(100) NOT NULL,
          author_clan VARCHAR(40) DEFAULT '',
          author_role VARCHAR(30) DEFAULT 'user',
          avatar_icon VARCHAR(60) DEFAULT 'flame',
          avatar_color VARCHAR(60) DEFAULT 'amber',
          upvotes INT DEFAULT 0,
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
const memoryDeletedItems: { id: string; itemType: string; deletedAt: number }[] = [];

app.get('/api/guides', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    let remoteRows: any[] = [];
    let deletedIds: string[] = [];
    if (db) {
      const result = await db.query('SELECT * FROM ddon_adventure_guides ORDER BY created_at DESC LIMIT 150');
      const delResult = await db.query("SELECT id FROM ddon_deleted_items WHERE item_type = 'guide'");
      deletedIds = delResult.rows.map(r => r.id);
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
      return res.json({ guides: remoteRows, deletedIds });
    }
    deletedIds = memoryDeletedItems.filter(x => x.itemType === 'guide').map(x => x.id);
    return res.json({ guides: memoryGuides, deletedIds });
  } catch (err: any) {
    console.error('[Get Guides Error]', err);
    return res.json({ guides: memoryGuides, deletedIds: [] });
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
      // Remove from deleted items if re-created
      await db.query("DELETE FROM ddon_deleted_items WHERE id = $1 AND item_type = 'guide'", [guide.id]);
    }

    const delMemIdx = memoryDeletedItems.findIndex(x => x.id === guide.id && x.itemType === 'guide');
    if (delMemIdx !== -1) memoryDeletedItems.splice(delMemIdx, 1);

    return res.json({ success: true, guide });
  } catch (err: any) {
    console.error('[Save Guide Error]', err);
    return res.status(500).json({ error: 'Failed to save guide.' });
  }
});

app.delete('/api/guides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const now = Date.now();
    const db = getDbPool();
    if (db) {
      await db.query('DELETE FROM ddon_adventure_guides WHERE id = $1', [id]);
      await db.query(
        `INSERT INTO ddon_deleted_items (id, item_type, deleted_at)
         VALUES ($1, 'guide', $2)
         ON CONFLICT (id) DO UPDATE SET deleted_at = $2`,
        [id, now]
      );
      await db.query('DELETE FROM ddon_community_comments WHERE item_id = $1', [id]);
    }
    const idx = memoryGuides.findIndex(g => g.id === id);
    if (idx !== -1) memoryGuides.splice(idx, 1);
    if (!memoryDeletedItems.some(x => x.id === id && x.itemType === 'guide')) {
      memoryDeletedItems.push({ id, itemType: 'guide', deletedAt: now });
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Guide Error]', err);
    return res.status(500).json({ error: 'Failed to delete guide.' });
  }
});

// --- Community Comments & Discussion API ---
const memoryComments: any[] = [];
const memoryCommentVotes: Record<string, string> = {}; // `${commentId}_${voterId}` -> 'up' | 'down'

app.get('/api/comments', async (req, res) => {
  try {
    await ensureDbSchema();
    const itemId = req.query.itemId as string | undefined;
    const db = getDbPool();

    if (db) {
      let queryText = 'SELECT * FROM ddon_community_comments';
      const params: any[] = [];
      if (itemId) {
        queryText += ' WHERE item_id = $1';
        params.push(itemId);
      }
      queryText += ' ORDER BY created_at DESC LIMIT 300';
      const result = await db.query(queryText, params);
      const comments = result.rows.map(r => ({
        id: r.id,
        itemId: r.item_id,
        parentId: r.parent_id || null,
        parentAuthorName: r.parent_author_name || null,
        itemType: r.item_type,
        authorId: r.author_id,
        authorName: r.is_deleted ? '[deleted]' : r.author_name,
        authorClan: r.is_deleted ? '' : r.author_clan,
        authorRole: r.is_deleted ? 'user' : r.author_role,
        avatarIcon: r.is_deleted ? 'user' : r.avatar_icon,
        avatarColor: r.is_deleted ? 'slate' : r.avatar_color,
        content: r.is_deleted ? '[deleted]' : r.content,
        upvotes: Number(r.upvotes) || 0,
        downvotes: Number(r.downvotes) || 0,
        isDeleted: Boolean(r.is_deleted),
        createdAt: Number(r.created_at)
      }));
      return res.json(comments);
    }

    const filtered = itemId ? memoryComments.filter(c => c.itemId === itemId) : memoryComments;
    return res.json(filtered);
  } catch (err: any) {
    console.error('[Get Comments Error]', err);
    return res.json(memoryComments);
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id, itemId, parentId, parentAuthorName, itemType, authorId, authorName, authorClan, authorRole, avatarIcon, avatarColor, content } = req.body;
    if (!itemId || !content || !content.trim()) {
      return res.status(400).json({ error: 'itemId and comment content are required.' });
    }

    const commentId = id || `comm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = Date.now();
    const db = getDbPool();

    const commentObj = {
      id: commentId,
      itemId,
      parentId: parentId || null,
      parentAuthorName: parentAuthorName || null,
      itemType: itemType || 'guide',
      authorId: authorId || null,
      authorName: authorName || 'Guest Arisen',
      authorClan: authorClan || '',
      authorRole: authorRole || 'user',
      avatarIcon: avatarIcon || 'flame',
      avatarColor: avatarColor || 'amber',
      content: content.trim(),
      upvotes: 0,
      downvotes: 0,
      createdAt: now
    };

    if (db) {
      await db.query(
        `INSERT INTO ddon_community_comments (id, item_id, parent_id, parent_author_name, item_type, author_id, author_name, author_clan, author_role, avatar_icon, avatar_color, content, upvotes, downvotes, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 0, 0, $13)
         ON CONFLICT (id) DO NOTHING`,
        [
          commentObj.id,
          commentObj.itemId,
          commentObj.parentId,
          commentObj.parentAuthorName,
          commentObj.itemType,
          commentObj.authorId,
          commentObj.authorName,
          commentObj.authorClan,
          commentObj.authorRole,
          commentObj.avatarIcon,
          commentObj.avatarColor,
          commentObj.content,
          now
        ]
      );
    }

    memoryComments.unshift(commentObj);
    return res.json({ success: true, comment: commentObj });
  } catch (err: any) {
    console.error('[Add Comment Error]', err);
    return res.status(500).json({ error: 'Failed to post comment.' });
  }
});

app.post('/api/comments/:id/vote', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id } = req.params;
    const { direction, voterId } = req.body; // direction: 'up' | 'down', voterId: string
    if (!voterId || (direction !== 'up' && direction !== 'down')) {
      return res.status(400).json({ error: 'Valid voterId and direction (up/down) required.' });
    }

    const db = getDbPool();
    const now = Date.now();

    if (db) {
      // Check existing vote
      const existingVoteRes = await db.query(
        'SELECT direction FROM ddon_comment_votes WHERE comment_id = $1 AND voter_id = $2',
        [id, voterId]
      );

      const existingVote = existingVoteRes.rows[0]?.direction;

      if (existingVote === direction) {
        // Toggle OFF existing vote
        await db.query('DELETE FROM ddon_comment_votes WHERE comment_id = $1 AND voter_id = $2', [id, voterId]);
        if (direction === 'up') {
          await db.query('UPDATE ddon_community_comments SET upvotes = GREATEST(0, upvotes - 1) WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_community_comments SET downvotes = GREATEST(0, downvotes - 1) WHERE id = $1', [id]);
        }
      } else if (existingVote) {
        // Switching vote from up -> down or down -> up
        await db.query('UPDATE ddon_comment_votes SET direction = $1, created_at = $2 WHERE comment_id = $3 AND voter_id = $4', [direction, now, id, voterId]);
        if (direction === 'up') {
          await db.query('UPDATE ddon_community_comments SET upvotes = upvotes + 1, downvotes = GREATEST(0, downvotes - 1) WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_community_comments SET downvotes = downvotes + 1, upvotes = GREATEST(0, upvotes - 1) WHERE id = $1', [id]);
        }
      } else {
        // New vote
        await db.query('INSERT INTO ddon_comment_votes (comment_id, voter_id, direction, created_at) VALUES ($1, $2, $3, $4)', [id, voterId, direction, now]);
        if (direction === 'up') {
          await db.query('UPDATE ddon_community_comments SET upvotes = upvotes + 1 WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_community_comments SET downvotes = downvotes + 1 WHERE id = $1', [id]);
        }
      }

      const updatedRow = await db.query('SELECT upvotes, downvotes FROM ddon_community_comments WHERE id = $1', [id]);
      const comment = updatedRow.rows[0] || { upvotes: 0, downvotes: 0 };
      const currentVoteRes = await db.query('SELECT direction FROM ddon_comment_votes WHERE comment_id = $1 AND voter_id = $2', [id, voterId]);
      const currentVote = currentVoteRes.rows[0]?.direction || null;

      return res.json({ success: true, upvotes: Number(comment.upvotes) || 0, downvotes: Number(comment.downvotes) || 0, userVote: currentVote });
    }

    // Memory fallback
    const key = `${id}_${voterId}`;
    const prev = memoryCommentVotes[key];
    const c = memoryComments.find(x => x.id === id);
    if (c) {
      if (prev === direction) {
        delete memoryCommentVotes[key];
        if (direction === 'up') c.upvotes = Math.max(0, (c.upvotes || 0) - 1);
        else c.downvotes = Math.max(0, (c.downvotes || 0) - 1);
      } else if (prev) {
        memoryCommentVotes[key] = direction;
        if (direction === 'up') {
          c.upvotes = (c.upvotes || 0) + 1;
          c.downvotes = Math.max(0, (c.downvotes || 0) - 1);
        } else {
          c.downvotes = (c.downvotes || 0) + 1;
          c.upvotes = Math.max(0, (c.upvotes || 0) - 1);
        }
      } else {
        memoryCommentVotes[key] = direction;
        if (direction === 'up') c.upvotes = (c.upvotes || 0) + 1;
        else c.downvotes = (c.downvotes || 0) + 1;
      }
      return res.json({ success: true, upvotes: c.upvotes || 0, downvotes: c.downvotes || 0, userVote: memoryCommentVotes[key] || null });
    }

    return res.json({ success: true, userVote: null });
  } catch (err: any) {
    console.error('[Vote Comment Error]', err);
    return res.status(500).json({ error: 'Vote failed.' });
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const now = Date.now();
    const db = getDbPool();
    if (db) {
      // Check if this comment has any child replies
      const childrenRes = await db.query('SELECT COUNT(*) as count FROM ddon_community_comments WHERE parent_id = $1', [id]);
      const childCount = Number(childrenRes.rows[0]?.count) || 0;

      if (childCount > 0) {
        // Soft delete: keep ladder structure intact so replies remain visible
        await db.query(
          `UPDATE ddon_community_comments 
           SET is_deleted = TRUE, content = '[deleted]', author_name = '[deleted]', author_clan = '', author_role = 'user'
           WHERE id = $1`,
          [id]
        );
      } else {
        // No replies: safe to hard delete
        await db.query('DELETE FROM ddon_comment_votes WHERE comment_id = $1', [id]);
        await db.query('DELETE FROM ddon_community_comments WHERE id = $1', [id]);
        await db.query(
          `INSERT INTO ddon_deleted_items (id, item_type, deleted_at)
           VALUES ($1, 'comment', $2)
           ON CONFLICT (id) DO UPDATE SET deleted_at = $2`,
          [id, now]
        );
      }
    }

    // Memory fallback
    const hasRepliesInMemory = memoryComments.some(c => c.parentId === id);
    const target = memoryComments.find(c => c.id === id);
    if (target) {
      if (hasRepliesInMemory) {
        target.isDeleted = true;
        target.content = '[deleted]';
        target.authorName = '[deleted]';
        target.authorClan = '';
        target.authorRole = 'user';
      } else {
        const idx = memoryComments.findIndex(c => c.id === id);
        if (idx !== -1) memoryComments.splice(idx, 1);
        if (!memoryDeletedItems.some(x => x.id === id && x.itemType === 'comment')) {
          memoryDeletedItems.push({ id, itemType: 'comment', deletedAt: now });
        }
      }
    }

    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Comment Error]', err);
    return res.status(500).json({ error: 'Failed to delete comment.' });
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
      await db.query("DELETE FROM ddon_deleted_items WHERE id = $1 AND item_type = 'route'", [routeId]);
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
    const now = Date.now();
    const db = getDbPool();
    if (db) {
      await db.query('DELETE FROM ddon_leveling_routes WHERE id = $1', [id]);
      await db.query(
        `INSERT INTO ddon_deleted_items (id, item_type, deleted_at)
         VALUES ($1, 'route', $2)
         ON CONFLICT (id) DO UPDATE SET deleted_at = $2`,
        [id, now]
      );
      await db.query('DELETE FROM ddon_community_comments WHERE item_id = $1', [id]);
    }
    const idx = memoryRoutes.findIndex(r => r.id === id);
    if (idx !== -1) memoryRoutes.splice(idx, 1);
    if (!memoryDeletedItems.some(x => x.id === id && x.itemType === 'route')) {
      memoryDeletedItems.push({ id, itemType: 'route', deletedAt: now });
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Route Error]', err);
    return res.status(500).json({ error: 'Failed to delete route.' });
  }
});

// --- Community Farm Spots API ---
const memoryFarmSpots: any[] = [];

app.get('/api/farm-spots', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    if (db) {
      const result = await db.query('SELECT * FROM ddon_farm_spots ORDER BY created_at DESC LIMIT 150');
      const spots = result.rows.map(r => ({
        id: r.id,
        name: r.name,
        region: r.region,
        server: r.server,
        minLevel: Number(r.min_level),
        maxLevel: Number(r.max_level),
        xpPerRun: Number(r.xp_per_run),
        goldPerRun: Number(r.gold_per_run),
        runsToLevel: Number(r.runs_to_level),
        targetEnemies: r.target_enemies,
        description: r.description,
        recommendedVocations: typeof r.recommended_vocations === 'string' ? JSON.parse(r.recommended_vocations) : r.recommended_vocations,
        quests: typeof r.quests === 'string' ? JSON.parse(r.quests) : r.quests,
        authorId: r.author_id,
        authorName: r.author_name,
        authorClan: r.author_clan,
        authorRole: r.author_role,
        avatarIcon: r.avatar_icon,
        avatarColor: r.avatar_color,
        upvotes: Number(r.upvotes) || 0,
        createdAt: Number(r.created_at)
      }));
      return res.json(spots);
    }
    return res.json(memoryFarmSpots);
  } catch (err: any) {
    console.error('[Get Farm Spots Error]', err);
    return res.json(memoryFarmSpots);
  }
});

app.post('/api/farm-spots', async (req, res) => {
  try {
    await ensureDbSchema();
    const spot = req.body;
    if (!spot || !spot.name) {
      return res.status(400).json({ error: 'Spot name is required.' });
    }

    const spotId = spot.id || `farm-spot-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = Date.now();
    const db = getDbPool();

    if (db) {
      await db.query(
        `INSERT INTO ddon_farm_spots (
          id, name, region, server, min_level, max_level, xp_per_run, gold_per_run,
          runs_to_level, target_enemies, description, recommended_vocations, quests,
          author_id, author_name, author_clan, author_role, avatar_icon, avatar_color,
          upvotes, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 0, $20)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          region = EXCLUDED.region,
          server = EXCLUDED.server,
          min_level = EXCLUDED.min_level,
          max_level = EXCLUDED.max_level,
          xp_per_run = EXCLUDED.xp_per_run,
          gold_per_run = EXCLUDED.gold_per_run,
          runs_to_level = EXCLUDED.runs_to_level,
          target_enemies = EXCLUDED.target_enemies,
          description = EXCLUDED.description,
          recommended_vocations = EXCLUDED.recommended_vocations,
          quests = EXCLUDED.quests`,
        [
          spotId,
          spot.name,
          spot.region || 'Volden Mines',
          spot.server || 'Rising',
          spot.minLevel || 1,
          spot.maxLevel || 100,
          spot.xpPerRun || 0,
          spot.goldPerRun || 0,
          spot.runsToLevel || 3,
          spot.targetEnemies || '',
          spot.description || '',
          JSON.stringify(spot.recommendedVocations || []),
          JSON.stringify(spot.quests || []),
          spot.authorId || null,
          spot.authorName || 'Community Arisen',
          spot.authorClan || '',
          spot.authorRole || 'user',
          spot.avatarIcon || 'flame',
          spot.avatarColor || 'amber',
          now
        ]
      );
      await db.query("DELETE FROM ddon_deleted_items WHERE id = $1 AND item_type = 'farm_spot'", [spotId]);
      return res.json({ success: true, id: spotId });
    }

    const existingIdx = memoryFarmSpots.findIndex(s => s.id === spotId);
    const spotObj = { ...spot, id: spotId, createdAt: now };
    if (existingIdx !== -1) {
      memoryFarmSpots[existingIdx] = spotObj;
    } else {
      memoryFarmSpots.unshift(spotObj);
    }
    return res.json({ success: true, id: spotId });
  } catch (err: any) {
    console.error('[Save Farm Spot Error]', err);
    return res.status(500).json({ error: 'Failed to save farm spot.' });
  }
});

app.delete('/api/farm-spots/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const now = Date.now();
    const db = getDbPool();
    if (db) {
      await db.query('DELETE FROM ddon_farm_spots WHERE id = $1', [id]);
      await db.query(
        `INSERT INTO ddon_deleted_items (id, item_type, deleted_at)
         VALUES ($1, 'farm_spot', $2)
         ON CONFLICT (id) DO UPDATE SET deleted_at = $2`,
        [id, now]
      );
      await db.query('DELETE FROM ddon_community_comments WHERE item_id = $1', [id]);
    }
    const idx = memoryFarmSpots.findIndex(s => s.id === id);
    if (idx !== -1) memoryFarmSpots.splice(idx, 1);
    if (!memoryDeletedItems.some(x => x.id === id && x.itemType === 'farm_spot')) {
      memoryDeletedItems.push({ id, itemType: 'farm_spot', deletedAt: now });
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Farm Spot Error]', err);
    return res.status(500).json({ error: 'Failed to delete farm spot.' });
  }
});

// --- Community Feedback API ---
const memoryFeedback: any[] = [];
const memoryFeedbackVotes: Record<string, string> = {}; // `${feedbackId}_${voterId}` -> 'like' | 'dislike'

app.get('/api/feedback', async (req, res) => {
  try {
    await ensureDbSchema();
    const db = getDbPool();
    if (db) {
      const result = await db.query('SELECT * FROM ddon_feedback ORDER BY created_at DESC LIMIT 150');
      const items = result.rows.map(row => ({
        id: row.id,
        authorId: row.author_id,
        authorName: row.author_name,
        authorClan: row.author_clan,
        authorRole: row.author_role,
        avatarIcon: row.avatar_icon,
        avatarColor: row.avatar_color,
        type: row.type,
        rating: row.rating,
        title: row.title,
        content: row.content,
        likes: Number(row.likes) || 0,
        dislikes: Number(row.dislikes) || 0,
        createdAt: Number(row.created_at),
        updatedAt: row.updated_at ? Number(row.updated_at) : undefined
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
    const { id, authorId, authorName, authorClan, authorRole, avatarIcon, avatarColor, type, rating, title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const feedbackId = id || `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = Date.now();
    const db = getDbPool();

    if (db) {
      await db.query(
        `INSERT INTO ddon_feedback (id, author_id, author_name, author_clan, author_role, avatar_icon, avatar_color, type, rating, title, content, likes, dislikes, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 0, 0, $12)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           content = EXCLUDED.content,
           type = EXCLUDED.type,
           rating = EXCLUDED.rating,
           updated_at = $12`,
        [feedbackId, authorId || null, authorName || 'Anonymous Arisen', authorClan || '', authorRole || 'user', avatarIcon || 'flame', avatarColor || 'amber', type || 'feature_request', rating || 5, title, content, now]
      );
      await db.query("DELETE FROM ddon_deleted_items WHERE id = $1 AND item_type = 'feedback'", [feedbackId]);
      return res.json({ success: true, id: feedbackId });
    }

    const existingIdx = memoryFeedback.findIndex(x => x.id === feedbackId);
    if (existingIdx !== -1) {
      memoryFeedback[existingIdx] = {
        ...memoryFeedback[existingIdx],
        title,
        content,
        type: type || memoryFeedback[existingIdx].type,
        rating: rating || memoryFeedback[existingIdx].rating,
        updatedAt: now
      };
    } else {
      const item = { id: feedbackId, authorId: authorId || null, authorName, authorClan, authorRole, avatarIcon, avatarColor, type, rating, title, content, likes: 0, dislikes: 0, createdAt: now };
      memoryFeedback.unshift(item);
    }
    return res.json({ success: true, id: feedbackId });
  } catch (err: any) {
    console.error('[Submit Feedback Error]', err);
    return res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

// Edit Feedback
app.put('/api/feedback/:id', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id } = req.params;
    const { title, content, type, rating, requesterId, requesterRole } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const db = getDbPool();
    const now = Date.now();

    if (db) {
      // Fetch feedback to verify authorization
      const checkRes = await db.query('SELECT author_id, author_name, author_role FROM ddon_feedback WHERE id = $1', [id]);
      if (checkRes.rows.length === 0) {
        return res.status(404).json({ error: 'Feedback post not found.' });
      }

      const fb = checkRes.rows[0];
      const isOwner = requesterRole === 'owner' || requesterId === 'arisen-otake7-master';
      const isMod = requesterRole === 'moderator';
      const isAuthor = fb.author_id && requesterId && fb.author_id === requesterId;

      if (!isOwner && !isMod && !isAuthor) {
        return res.status(403).json({ error: 'You are not authorized to edit this feedback post.' });
      }

      await db.query(
        `UPDATE ddon_feedback SET
          title = $1,
          content = $2,
          type = COALESCE($3, type),
          rating = COALESCE($4, rating),
          updated_at = $5
        WHERE id = $6`,
        [title.trim(), content.trim(), type || null, rating || null, now, id]
      );
      return res.json({ success: true });
    }

    // Memory fallback
    const target = memoryFeedback.find(f => f.id === id);
    if (target) {
      target.title = title.trim();
      target.content = content.trim();
      if (type) target.type = type;
      if (rating) target.rating = rating;
      target.updatedAt = now;
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Edit Feedback Error]', err);
    return res.status(500).json({ error: 'Failed to edit feedback.' });
  }
});

// Delete Feedback
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { requesterId, requesterRole } = req.body || {};
    const now = Date.now();
    const db = getDbPool();

    if (db) {
      // Check authorization if requester info supplied
      if (requesterId || requesterRole) {
        const checkRes = await db.query('SELECT author_id FROM ddon_feedback WHERE id = $1', [id]);
        if (checkRes.rows.length > 0) {
          const fb = checkRes.rows[0];
          const isOwner = requesterRole === 'owner' || requesterId === 'arisen-otake7-master';
          const isMod = requesterRole === 'moderator';
          const isAuthor = fb.author_id && requesterId && fb.author_id === requesterId;

          if (!isOwner && !isMod && !isAuthor) {
            return res.status(403).json({ error: 'You are not authorized to delete this feedback post.' });
          }
        }
      }

      await db.query('DELETE FROM ddon_feedback_votes WHERE feedback_id = $1', [id]);
      await db.query('DELETE FROM ddon_community_comments WHERE item_id = $1', [id]);
      await db.query('DELETE FROM ddon_feedback WHERE id = $1', [id]);
      await db.query(
        `INSERT INTO ddon_deleted_items (id, item_type, deleted_at)
         VALUES ($1, 'feedback', $2)
         ON CONFLICT (id) DO UPDATE SET deleted_at = $2`,
        [id, now]
      );
    }

    const idx = memoryFeedback.findIndex(f => f.id === id);
    if (idx !== -1) memoryFeedback.splice(idx, 1);
    if (!memoryDeletedItems.some(x => x.id === id && x.itemType === 'feedback')) {
      memoryDeletedItems.push({ id, itemType: 'feedback', deletedAt: now });
    }

    return res.json({ success: true });
  } catch (err: any) {
    console.error('[Delete Feedback Error]', err);
    return res.status(500).json({ error: 'Failed to delete feedback.' });
  }
});

// Feedback Vote (Strict single vote per user, untoggle on re-click, swap vote on opposite click)
app.post('/api/feedback/:id/vote', async (req, res) => {
  try {
    await ensureDbSchema();
    const { id } = req.params;
    const { type, voterId } = req.body; // type: 'like' | 'dislike', voterId: string
    if (!type || (type !== 'like' && type !== 'dislike')) {
      return res.status(400).json({ error: 'Valid type (like/dislike) required.' });
    }

    const cleanVoterId = voterId || 'anonymous_voter';
    const db = getDbPool();
    const now = Date.now();

    if (db) {
      // Check existing vote
      const existingVoteRes = await db.query(
        'SELECT direction FROM ddon_feedback_votes WHERE feedback_id = $1 AND voter_id = $2',
        [id, cleanVoterId]
      );
      const existingVote = existingVoteRes.rows[0]?.direction;

      if (existingVote === type) {
        // Toggle OFF existing vote
        await db.query('DELETE FROM ddon_feedback_votes WHERE feedback_id = $1 AND voter_id = $2', [id, cleanVoterId]);
        if (type === 'like') {
          await db.query('UPDATE ddon_feedback SET likes = GREATEST(0, likes - 1) WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_feedback SET dislikes = GREATEST(0, dislikes - 1) WHERE id = $1', [id]);
        }
      } else if (existingVote) {
        // Switching vote (like -> dislike or dislike -> like)
        await db.query(
          'UPDATE ddon_feedback_votes SET direction = $1, created_at = $2 WHERE feedback_id = $3 AND voter_id = $4',
          [type, now, id, cleanVoterId]
        );
        if (type === 'like') {
          await db.query('UPDATE ddon_feedback SET likes = likes + 1, dislikes = GREATEST(0, dislikes - 1) WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_feedback SET dislikes = dislikes + 1, likes = GREATEST(0, likes - 1) WHERE id = $1', [id]);
        }
      } else {
        // Fresh vote
        await db.query(
          'INSERT INTO ddon_feedback_votes (feedback_id, voter_id, direction, created_at) VALUES ($1, $2, $3, $4)',
          [id, cleanVoterId, type, now]
        );
        if (type === 'like') {
          await db.query('UPDATE ddon_feedback SET likes = likes + 1 WHERE id = $1', [id]);
        } else {
          await db.query('UPDATE ddon_feedback SET dislikes = dislikes + 1 WHERE id = $1', [id]);
        }
      }

      const updatedRow = await db.query('SELECT likes, dislikes FROM ddon_feedback WHERE id = $1', [id]);
      const fb = updatedRow.rows[0] || { likes: 0, dislikes: 0 };
      const currentVoteRes = await db.query('SELECT direction FROM ddon_feedback_votes WHERE feedback_id = $1 AND voter_id = $2', [id, cleanVoterId]);
      const currentVote = currentVoteRes.rows[0]?.direction || null;

      return res.json({
        success: true,
        likes: Number(fb.likes) || 0,
        dislikes: Number(fb.dislikes) || 0,
        userVote: currentVote
      });
    }

    // Memory fallback
    const key = `${id}_${cleanVoterId}`;
    const prev = memoryFeedbackVotes[key];
    const f = memoryFeedback.find(x => x.id === id);
    if (f) {
      if (prev === type) {
        delete memoryFeedbackVotes[key];
        if (type === 'like') f.likes = Math.max(0, (f.likes || 0) - 1);
        else f.dislikes = Math.max(0, (f.dislikes || 0) - 1);
      } else if (prev) {
        memoryFeedbackVotes[key] = type;
        if (type === 'like') {
          f.likes = (f.likes || 0) + 1;
          f.dislikes = Math.max(0, (f.dislikes || 0) - 1);
        } else {
          f.dislikes = (f.dislikes || 0) + 1;
          f.likes = Math.max(0, (f.likes || 0) - 1);
        }
      } else {
        memoryFeedbackVotes[key] = type;
        if (type === 'like') f.likes = (f.likes || 0) + 1;
        else f.dislikes = (f.dislikes || 0) + 1;
      }
      return res.json({
        success: true,
        likes: f.likes || 0,
        dislikes: f.dislikes || 0,
        userVote: memoryFeedbackVotes[key] || null
      });
    }

    return res.json({ success: true, userVote: null });
  } catch (err: any) {
    console.error('[Vote Feedback Error]', err);
    return res.status(500).json({ error: 'Vote failed.' });
  }
});

// --- Vite / Static Serve ---
async function startServer() {
  const publicPath = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }

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
