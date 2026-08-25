import { JournalQuestion } from '../types';
import { DOGMA_RISING_CORE_QA } from './dogmaRisingQA';
import { DOGMA_RISING_DISCORD_QA } from './dogmaRisingDiscordQA';

// Merge the Core 13 Sections with the Discord Knowledge Base FAQ
export const INITIAL_JOURNAL_QUESTIONS: JournalQuestion[] = [
  ...DOGMA_RISING_CORE_QA,
  ...DOGMA_RISING_DISCORD_QA
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
  questions: JournalQuestion[] = INITIAL_JOURNAL_QUESTIONS
): JournalQuestion[] {
  const normalizedQuery = query.toLowerCase().trim();

  return questions.filter((item) => {
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
