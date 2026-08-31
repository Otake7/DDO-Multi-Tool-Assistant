import { LevelPresetRoute } from '../types';

export interface RemoteFeedback {
  id: string;
  authorName: string;
  authorClan?: string;
  authorRole?: string;
  avatarIcon?: string;
  avatarColor?: string;
  type: 'praise' | 'critique' | 'feature_request' | 'general';
  rating: number; // 1 to 5 stars
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: number;
}

// Fetch community routes from Aiven backend
export async function fetchRemoteRoutes(): Promise<LevelPresetRoute[]> {
  try {
    const res = await fetch('/api/routes');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Failed to fetch remote routes:', err);
    return [];
  }
}

// Save community route to Aiven backend
export async function saveRemoteRoute(route: LevelPresetRoute & { author?: string }): Promise<boolean> {
  try {
    const res = await fetch('/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to save route:', err);
    return false;
  }
}

// Delete community route
export async function deleteRemoteRoute(routeId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/routes/${encodeURIComponent(routeId)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to delete route:', err);
    return false;
  }
}

// Fetch feedback from Aiven backend
export async function fetchRemoteFeedback(): Promise<RemoteFeedback[]> {
  try {
    const res = await fetch('/api/feedback');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Failed to fetch feedback:', err);
    return [];
  }
}

// Submit feedback to Aiven backend
export async function submitRemoteFeedback(feedback: Omit<RemoteFeedback, 'likes' | 'dislikes'>): Promise<boolean> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to submit feedback:', err);
    return false;
  }
}

// Vote on feedback
export async function voteRemoteFeedback(id: string, type: 'like' | 'dislike'): Promise<{ likes: number; dislikes: number } | null> {
  try {
    const res = await fetch(`/api/feedback/${encodeURIComponent(id)}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to vote feedback:', err);
    return null;
  }
}
