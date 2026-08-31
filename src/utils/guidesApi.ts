import { GuideSubPage } from '../types';

/**
 * Client-side API service to communicate with our Express + Aiven database backend
 */

export async function fetchRemoteGuides(): Promise<GuideSubPage[]> {
  try {
    const res = await fetch('/api/guides');
    if (!res.ok) throw new Error('Failed to fetch remote guides');
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((g: any) => ({
        id: g.id,
        title: g.title,
        category: g.category || 'Community',
        author: g.author || 'Anonymous Arisen',
        authorId: g.author_id || g.authorId,
        lastUpdated: g.last_updated || g.lastUpdated || 'Season 3.4',
        tags: Array.isArray(g.tags) ? g.tags : typeof g.tags === 'string' ? JSON.parse(g.tags) : [],
        summary: g.summary || '',
        content: g.content || '',
        likes: Number(g.likes) || 0,
        dislikes: Number(g.dislikes) || 0,
        isBuiltIn: Boolean(g.is_builtin || g.isBuiltIn),
      }));
    }
    return [];
  } catch (err) {
    console.warn('Could not load remote guides from database, falling back to local:', err);
    return [];
  }
}

export async function saveRemoteGuide(guide: GuideSubPage): Promise<boolean> {
  try {
    const res = await fetch('/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guide),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to save guide to remote database:', err);
    return false;
  }
}

export async function voteRemoteGuide(guideId: string, type: 'like' | 'dislike'): Promise<{ likes: number; dislikes: number } | null> {
  try {
    const res = await fetch(`/api/guides/${encodeURIComponent(guideId)}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to vote on guide in remote database:', err);
    return null;
  }
}

export async function deleteRemoteGuide(guideId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/guides/${encodeURIComponent(guideId)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to delete guide from database:', err);
    return false;
  }
}
