import { JournalQuestion } from '../types';
import { DOGMA_RISING_CORE_QA } from './dogmaRisingQA';
import { DOGMA_RISING_DISCORD_QA } from './dogmaRisingDiscordQA';
import { SECRET_AUGMENTS_QA } from './secretAugmentsQA';
import { SPECIAL_ACCESSORIES_QA } from './specialAccessoriesQA';
import { STATS_EXPLANATION_QA } from './statsExplanationQA';
import { STATUS_EFFECTS_QA } from './statusEffectsQA';
import { COMBAT_FLOW_QA } from './combatFlowQA';
import { PAWN_ORDERS_QA } from './pawnOrdersQA';
import { LIMIT_BREAKS_QA } from './limitBreaksQA';

// Merge the Core 13 Sections with Discord FAQ, Secret Augments, Special Accessories, Stats, Status Effects, Flow of Combat, Pawn Orders, and Limit Breaks Knowledge Base
export const INITIAL_JOURNAL_QUESTIONS: JournalQuestion[] = [
  ...DOGMA_RISING_CORE_QA.map(q => ({ ...q, server: q.server || 'Rising' as const })),
  ...DOGMA_RISING_DISCORD_QA.map(q => ({ ...q, server: q.server || 'Rising' as const })),
  ...SECRET_AUGMENTS_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...SPECIAL_ACCESSORIES_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...STATS_EXPLANATION_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...STATUS_EFFECTS_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...COMBAT_FLOW_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...PAWN_ORDERS_QA.map(q => ({ ...q, server: q.server || 'All' as const })),
  ...LIMIT_BREAKS_QA.map(q => ({ ...q, server: q.server || 'All' as const }))
];

export const JOURNAL_CATEGORIES = [
  'ALL',
  'Installation & Setup',
  'Account & Login',
  'Gameplay Basics',
  'Crafting',
  'Pawns',
  'Bitterblack Maze (BBM)',
  'Endgame',
  'Classes & Skills',
  'Leveling',
  'Technical Issues',
  'Events & Cosmetics',
  'Quick Commands',
  'Miscellaneous'
] as const;

export function searchJournalQuestions(
  query: string, 
  category: string, 
  questions: JournalQuestion[] = INITIAL_JOURNAL_QUESTIONS,
  server: string = 'ALL',
  includeUniversal: boolean = true
): JournalQuestion[] {
  const normalizedQuery = query.toLowerCase().trim();

  return questions.filter((item) => {
    // Server filtering
    if (server !== 'ALL') {
      const itemServer = item.server || 'All';
      if (includeUniversal) {
        if (itemServer !== server && itemServer !== 'All') return false;
      } else {
        if (itemServer !== server) return false;
      }
    }

    // Category match
    const categoryMatches = category === 'ALL' || item.category === category;
    if (!categoryMatches) return false;

    // Search query match across question, answer, tags, sources, and id
    if (!normalizedQuery) return true;

    const inQuestion = item.question.toLowerCase().includes(normalizedQuery);
    const inAnswer = item.answer.toLowerCase().includes(normalizedQuery);
    const inTags = item.tags.some(t => t.toLowerCase().includes(normalizedQuery));
    const inSource = (item.source || '').toLowerCase().includes(normalizedQuery);
    const inNumber = item.number ? item.number.toString() === normalizedQuery || `#${item.number}` === normalizedQuery : false;

    return inQuestion || inAnswer || inTags || inSource || inNumber;
  });
}
