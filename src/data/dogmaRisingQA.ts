import { JournalQuestion } from '../types';

export const DOGMA_RISING_CORE_QA: JournalQuestion[] = [
  // 1. INSTALLATION & SETUP
  {
    id: 'dr-setup-1',
    question: 'How do I install the game?',
    answer: 'Download the game client from the mirrors in #how-to-install, extract with 7zip, download the latest launcher, place it in the game folder, and run as administrator.',
    category: 'Installation & Setup',
    tags: ['Install', 'Download', '7zip', 'Launcher', 'Setup'],
    source: '@September Everglow, 04/26/2026',
    verified: true,
    popularity: 99
  },
  {
    id: 'dr-setup-2',
    question: 'Why is my launcher not opening or shows an error?',
    answer: 'Try running as administrator. If on Windows 11 with multiple monitors, disconnect all but one. Alternatively, use the modified exe from #performance-patches.',
    category: 'Installation & Setup',
    tags: ['Launcher Error', 'Crash', 'Windows 11', 'Multi-monitor', 'Admin'],
    source: '@September Everglow, 05/10/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-setup-3',
    question: 'Where do I get the latest launcher?',
    answer: 'https://github.com/D00MK1D/DDON-Launcher-WPF/releases or from #how-to-install. Choose the x64 version.',
    category: 'Installation & Setup',
    tags: ['Launcher', 'Download', 'GitHub', 'x64', 'Release'],
    source: '@jared, 04/24/2026',
    discordLink: 'https://github.com/D00MK1D/DDON-Launcher-WPF/releases',
    verified: true,
    popularity: 92
  },
  {
    id: 'dr-setup-4',
    question: 'Can I transfer my character from another server?',
    answer: 'No, characters cannot be transferred. You need a new account. Character appearance presets (stored locally) can be reused.',
    category: 'Installation & Setup',
    tags: ['Character Transfer', 'Account', 'Presets', 'Appearance'],
    source: '@Prisca, 05/06/2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'dr-setup-5',
    question: 'My game crashes at startup or on cutscenes – what to do?',
    answer: '1. Try Bunie\'s modified exe (performance patch).\n2. Check Event Viewer for crash details.\n3. Disconnect multi-monitor setup.\n4. Try Windows 7 compatibility mode.\n5. For Steam Deck/Linux, try Proton GE 9-2 or GE-Proton10-34.',
    category: 'Installation & Setup',
    tags: ['Crash', 'Startup', 'Cutscenes', 'Steam Deck', 'Proton', 'Fix'],
    source: '@September Everglow, 04/26/2026; @Annuate, 05/04/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-setup-6',
    question: 'How to run on Steam Deck or Linux?',
    answer: 'Use Proton GE 9-2 or GE-Proton10-34 with the modified exe. Install .NET Desktop Runtime 9.0 LTS via protontricks. Use Window mode. Add launcher as non-Steam game.',
    category: 'Installation & Setup',
    tags: ['Steam Deck', 'Linux', 'Proton', 'GE-Proton', '.NET', 'Protontricks'],
    source: '@Strudel, 04/14/2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'dr-setup-7',
    question: 'The download gets stuck at 100% – what can I do?',
    answer: 'Try using a download manager like Free Download Manager. Or switch to a different mirror (single-file 15GB archive). Some browsers (Edge) may cause issues.',
    category: 'Installation & Setup',
    tags: ['Download Stuck', '100%', 'Mirror', 'FDM', 'Free Download Manager'],
    source: '@SirRockEmSockEm, 05/06/2026',
    verified: true,
    popularity: 87
  },

  // 2. ACCOUNT & LOGIN
  {
    id: 'dr-account-1',
    question: 'I forgot my password or username – how to recover?',
    answer: 'Check C:\\Users\\NAME\\AppData\\Local\\DDO_Launcher for user.config files containing your credentials in plain text. If you reinstalled Windows, create a ticket in #password-recovery with your account info.',
    category: 'Account & Login',
    tags: ['Password', 'Username', 'Credentials', 'Recovery', 'user.config'],
    source: '@September Everglow, 04/10/2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'dr-account-2',
    question: 'Registration says "email cannot be empty" – what\'s wrong?',
    answer: 'You\'re using an old launcher. Download the newest launcher from #how-to-install which includes an email field.',
    category: 'Account & Login',
    tags: ['Registration', 'Email Cannot Be Empty', 'Launcher Update', 'Register'],
    source: '@LostMyLeg, 08/09/2026',
    verified: true,
    popularity: 89
  },
  {
    id: 'dr-account-3',
    question: 'Can I change my character name?',
    answer: 'No, character name cannot be changed. Pawn names can be changed at the Beauty Salon.',
    category: 'Account & Login',
    tags: ['Name Change', 'Character Name', 'Pawn Name', 'Salon'],
    source: '@September Everglow, 04/05/2026',
    verified: true,
    popularity: 85
  },

  // 3. GAMEPLAY BASICS
  {
    id: 'dr-gameplay-1',
    question: 'What\'s the best starting vocation?',
    answer: 'Pick one of the red (DPS) vocations that isn\'t High Scepter – Fighter, Hunter, Seeker, or Warrior. Stick to it until level 90. Avoid Spirit Lancer, High Scepter, and Alchemist as first vocations.',
    category: 'Gameplay Basics',
    tags: ['Starting Class', 'Best Vocation', 'Fighter', 'Hunter', 'Seeker', 'Warrior'],
    source: '@September Everglow, 04/06/2026',
    verified: true,
    popularity: 98
  },
  {
    id: 'dr-gameplay-2',
    question: 'Why do I do no damage?',
    answer: 'Gear is 95% of your stats – keep your weapon within 3-5 levels of enemies. If weapon is more than 4 levels below enemies, you\'ll deal minimal damage. Don\'t enhance gear until endgame.',
    category: 'Gameplay Basics',
    tags: ['No Damage', 'Low Damage', 'Gear Scaling', 'Weapon Level', 'Atk Stats'],
    source: '@September Everglow, 05/02/2026',
    verified: true,
    popularity: 97
  },
  {
    id: 'dr-gameplay-3',
    question: 'How do I get more pawns?',
    answer: '• 2nd pawn: Do "Crafted Token of the Heart" quest, get 10 Riftstone Shards, talk to White Dragon for "Myrmidon\'s Pledge".\n• 3rd pawn: Complete third tier of Blood Orb tree (~19,500 BO), then same process.',
    category: 'Gameplay Basics',
    tags: ['More Pawns', '2nd Pawn', '3rd Pawn', 'Token of the Heart', 'Blood Orb Tree'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/15/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-gameplay-4',
    question: 'Why am I getting no XP in a party?',
    answer: 'If you have support pawns or other players in the party, an XP penalty applies if the level gap between highest and lowest is 21+. Your own main pawns don\'t trigger this penalty.',
    category: 'Gameplay Basics',
    tags: ['No XP', '0 XP', 'Level Gap', '21 Levels', 'Party Penalty', 'Support Pawns'],
    source: '@Prisca, 04/18/2026',
    verified: true,
    popularity: 99
  },
  {
    id: 'dr-gameplay-5',
    question: 'When can I party up with friends?',
    answer: 'After getting your first pawn (around level 6 MSQ, "A Servant\'s Pledge" and "A Reliable Source of Information"). Keep party size at 4 or less for MSQ to avoid bugs.',
    category: 'Gameplay Basics',
    tags: ['Party', 'Co-op', 'Friends', 'MSQ', 'Reliable Source of Information'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/07/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-gameplay-6',
    question: 'What is the Rookie Ring and how does it work?',
    answer: 'Gives 25% more XP until level 41. Once you reach level 90 with ANY vocation, it becomes 50% XP for all vocations below 90. Does not stack with multiple rings.',
    category: 'Gameplay Basics',
    tags: ['Rookie Ring', '50% XP', 'XP Boost', 'Level 90', 'Ring of Blessing'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/15/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-gameplay-7',
    question: 'How do I transmog and use fashion gear?',
    answer: 'Complete "Lestania\'s Best Dressed" quest (level 16). Press X / Shift on equipment to access fashion slots. For cross-vocation fashion, use /fashion add while wearing gear, then /fashion apply on desired vocation.',
    category: 'Gameplay Basics',
    tags: ['Fashion', 'Transmog', 'Lestania Best Dressed', 'Shift', '/fashion'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/05/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-gameplay-8',
    question: 'How do I unlock EX skills?',
    answer: 'Progress through Epitaph in Season 3. First two EX skills are available via Rathnite and Feryana Epitaphs. Third and fourth require 3.2 and 3.3 (not yet available).',
    category: 'Gameplay Basics',
    tags: ['EX Skills', 'Epitaph', 'Season 3', 'Rathnite', 'Feryana'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/10/2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'dr-gameplay-9',
    question: 'What is PP mode and how do I use it?',
    answer: 'PP (Play Point) mode is for endgame – you get PP from killing level 70+ enemies. Used for Job Emblem progression and buying bonus dungeon tickets. Enable via Archibald in the Relay Station.',
    category: 'Gameplay Basics',
    tags: ['PP Mode', 'Play Points', 'Job Emblem', 'Archibald', 'Endgame'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/08/2026',
    verified: true,
    popularity: 89
  },
  {
    id: 'dr-gameplay-10',
    question: 'How does enrage and stamina shake / stagger work?',
    answer: 'Enrage happens at certain HP thresholds (e.g., 75%, 25%). To break enrage, hit secret cores (revealed by green vocations) or damage the break gauge. When the gauge is blue, climbing and pressing shake (Y / RMB) deals huge stamina depletion damage.',
    category: 'Gameplay Basics',
    tags: ['Enrage', 'Stagger', 'Shake', 'Secret Cores', 'Stamina', 'Climb'],
    source: '@Karin Miller, 04/20/2026; @September Everglow, 05/02/2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'dr-gameplay-11',
    question: 'How do I change channels or worlds?',
    answer: 'In the in-game menu (second-to-last tab) while in a safe area and not in a party. You can also select your channel upon logging in.',
    category: 'Gameplay Basics',
    tags: ['Change Channel', 'Switch World', 'Safe Area', 'Login'],
    source: '@Dr. Aven, 04/19/2026',
    verified: true,
    popularity: 86
  },

  // 4. CRAFTING
  {
    id: 'dr-craft-1',
    question: 'What should I spend pawn crafting points on?',
    answer: 'Cost Reduction until Level 93 (saves substantial gold), then Equipment Enhancement. DO NOT pick Crafting Time reduction – crafting is instant on this server!',
    category: 'Crafting',
    tags: ['Crafting Points', 'Cost Reduction', 'Pawn Crafting', 'Equipment Enhancement'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/10/2026',
    verified: true,
    popularity: 97
  },
  {
    id: 'dr-craft-2',
    question: 'Can I respec pawn crafting points?',
    answer: 'You get 2 resets per pawn initially at a Riftstone, plus 1 more per Crafting Exam completed. Resets are strictly limited, so allocate carefully.',
    category: 'Crafting',
    tags: ['Respec', 'Reset Crafting Points', 'Riftstone', 'Pawn'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/26/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-craft-3',
    question: 'What are the crafting exam levels?',
    answer: 'Crafting exams occur at levels: 8, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66. Make sure the pawn taking the exam leads the craft.',
    category: 'Crafting',
    tags: ['Crafting Exam', 'Levels', 'Pawn Level', 'Exam Recipe'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/26/2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'dr-craft-4',
    question: 'How do I get +3 quality (max crest slots)?',
    answer: 'Use Change Quality at the crafting NPC. Buy Armor/Weapon Upgrade Stones from Ophelia with RC. Success gives +2 slots, Great Success gives +3.',
    category: 'Crafting',
    tags: ['Quality', 'Crest Slots', 'Upgrade Stone', 'Ophelia', 'Change Quality'],
    source: '@_Font_, 05/15/2026',
    verified: true,
    popularity: 94
  },

  // 5. PAWNS
  {
    id: 'dr-pawns-1',
    question: 'What is the best pawn squad setup?',
    answer: 'Element Archer (green) + 2 Sorcerers (red). Later, drop Alchemist for a 2nd Sorcerer. Pawn AI is generally bad, so these vocations require the least AI complexity to be effective.',
    category: 'Pawns',
    tags: ['Pawn Setup', 'Best Pawns', 'Element Archer', 'Sorcerer', 'Party'],
    source: '@September Everglow, 05/04/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-pawns-2',
    question: 'Why do my pawns perform poorly at Shield Sage?',
    answer: 'Pawns prioritize dodging over blocking, so they never build Force gauge properly. Use Alchemist if you want an effective tank pawn.',
    category: 'Pawns',
    tags: ['Shield Sage Pawn', 'Tank Pawn', 'Alchemist', 'Pawn AI', 'Blocking'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/07/2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'dr-pawns-3',
    question: 'How do I force pawns to expose secret cores?',
    answer: 'Use Pawn Commands in the menu and set "Expose Secret Cores" to a shortcut. Command them manually in battle. Elemental Archer pawns reveal cores by aiming True Aid.',
    category: 'Pawns',
    tags: ['Secret Cores', 'Pawn Commands', 'Shortcut', 'True Aid', 'Elemental Archer'],
    source: '@StrifeFellower, 04/21/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-pawns-4',
    question: 'Do pawns get a catch-up XP bonus?',
    answer: 'Yes, they get 2.5x more XP if they are at least 6 levels below your Arisen.',
    category: 'Pawns',
    tags: ['Pawn Catch-up', '2.5x XP', 'Level Gap', 'Catch-up Bonus'],
    source: '@September Everglow, 05/08/2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'dr-pawns-5',
    question: 'Can I change my pawn\'s vocation?',
    answer: 'Yes, talk to Archibald in the Relay Station, just like changing your own. Make sure your pawn is currently in your active party.',
    category: 'Pawns',
    tags: ['Change Pawn Vocation', 'Archibald', 'Relay Station', 'Switch Class'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/21/2026',
    verified: true,
    popularity: 87
  },

  // 6. BITTERBLACK MAZE (BBM)
  {
    id: 'dr-bbm-1',
    question: 'When should I do Bitterblack Maze (BBM)?',
    answer: 'When you\'re confident in your chosen vocation and understand basic combat mechanics. Channel 5 has scaling specifically tailored for solo play.',
    category: 'Bitterblack Maze (BBM)',
    tags: ['BBM', 'Bitterblack Maze', 'Solo', 'Channel 5', 'Entry'],
    source: '@September Everglow, 05/13/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-bbm-2',
    question: 'What BBM gear is worth keeping?',
    answer: '• Cursed/Chaos sets (equal to level 55 armor at level 1)\n• Pleiades/Valkyrian sets (fashion, slightly worse stats)\n• Nemesis/Marquis sets (fashion)\n• White gear (can be dyed any color – white dye doesn\'t exist otherwise)',
    category: 'Bitterblack Maze (BBM)',
    tags: ['BBM Gear', 'Chaos Set', 'Cursed Set', 'White Gear', 'Fashion'],
    source: '@September Everglow, 05/18/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-bbm-3',
    question: 'How do BBM tickets work?',
    answer: 'You get 10 free tickets per week (resets Monday). You can also reset with Golden Gemstones (GGs) for 20 more. Use /schedule in chat to check reset times.',
    category: 'Bitterblack Maze (BBM)',
    tags: ['BBM Tickets', 'Reset', 'Weekly Tickets', 'GGs', '/schedule'],
    source: '@September Everglow, 05/08/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-bbm-4',
    question: 'What is the difference between BBM channels?',
    answer: '• Ch1/2/6 = Vanilla experience.\n• Ch3 = Easier Abyss (Evil Eye and Black Knight are nerfed).\n• Ch5 = Normal boss drops 2 boxes guaranteed and has dynamic party scaling.',
    category: 'Bitterblack Maze (BBM)',
    tags: ['BBM Channels', 'Ch1', 'Ch3', 'Ch5', 'Abyss', 'Evil Eye'],
    source: '@Arisen of Balance & NO FUN: Wren, 03/31/2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'dr-bbm-5',
    question: 'How do I seal BBM items?',
    answer: 'At Luca in Cave Harbor, you can spend Red Marks to seal items (bracelets/earrings) so they won\'t be lost on reset. Sealing costs increase per sealed item.',
    category: 'Bitterblack Maze (BBM)',
    tags: ['Seal Items', 'Luca', 'Cave Harbor', 'Red Marks', 'Bracelets'],
    source: '@Kantido, 04/26/2026',
    verified: true,
    popularity: 86
  },
  {
    id: 'dr-bbm-6',
    question: 'Can I take BBM items out into the main game?',
    answer: 'Yes, using Gold Dragon Marks or Golden Gemstones (3 each per item). Items are sent directly to your item post or inventory.',
    category: 'Bitterblack Maze (BBM)',
    tags: ['Extract Items', 'Golden Gemstones', 'Gold Dragon Marks', 'Item Post'],
    source: '@September Everglow, 04/07/2026',
    verified: true,
    popularity: 91
  },

  // 7. ENDGAME
  {
    id: 'dr-endgame-1',
    question: 'What should I be doing at level 80+?',
    answer: '1. Craft IR105 armor (or farm Abandoned Armory).\n2. Run Channel 4 content for materials.\n3. Do Epitaph trials for EX skills.\n4. Farm BBM for accessories.\n5. Join groups for Erte Deenan (CH4) runs.',
    category: 'Endgame',
    tags: ['Level 80+', 'Endgame Loop', 'IR105', 'Channel 4', 'Erte Deenan', 'Epitaph'],
    source: '@September Everglow, 04/13/2026',
    verified: true,
    popularity: 97
  },
  {
    id: 'dr-endgame-2',
    question: 'What is the current max gear available?',
    answer: 'IR105 (level 93 gear). The First King set from Epitaph is future Best In Slot (BIS) when 3.2 and 3.3 content drops.',
    category: 'Endgame',
    tags: ['Max Gear', 'IR105', 'Level 93', 'First King', 'BIS'],
    source: '@Druin, 05/19/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-endgame-3',
    question: 'How do I get Black Venom weapons?',
    answer: 'Erte Deenan on Channel 4. Rare drops from Ch4 dungeon runs. They also drop from Divine Blossom Terrace.',
    category: 'Endgame',
    tags: ['Black Venom', 'Weapons', 'Erte Deenan', 'Channel 4', 'Divine Blossom'],
    source: '@September Everglow, 05/04/2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'dr-endgame-4',
    question: 'How do I get Dash Earrings?',
    answer: 'Exchange 20 Extreme Palm Fragments at Gregory in the Shopping District Alley. Farm fragments from Moltova Ruins on Channel 4.',
    category: 'Endgame',
    tags: ['Dash Earrings', 'Gregory', 'Extreme Palm Fragments', 'Moltova Ruins'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/28/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-endgame-5',
    question: 'What is the First King armor set?',
    answer: 'Epitaph reward set. Currently 1-star upgradable (equal to level 90 gear). In 3.2 it becomes 3-star (level 95 gear), and in 3.3 best in slot. Gives complete fire immunity with the full set.',
    category: 'Endgame',
    tags: ['First King', 'Armor Set', 'Epitaph', 'Fire Immunity', 'BIS'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/24/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-endgame-6',
    question: 'How do I farm Golden Gemstones (GG)?',
    answer: 'Ifrit EXM (8-man) is the best source. Also acquired from some EXM rank rewards, BBM, and daily login stamps.',
    category: 'Endgame',
    tags: ['Golden Gemstones', 'GG', 'Ifrit EXM', 'Daily Login', 'Farming'],
    source: '@Uniforce, 04/05/2026',
    verified: true,
    popularity: 91
  },

  // 8. CLASSES & SKILLS
  {
    id: 'dr-classes-1',
    question: 'Is High Scepter viable as a first class?',
    answer: 'Not recommended. Large weapon level gaps (1 > 30 > 50 > 70 > 75), requires constant manual enhancement, and creates a false balance impression. Excellent as a 2nd or 3rd vocation.',
    category: 'Classes & Skills',
    tags: ['High Scepter', 'Starter Class', 'Viability', 'Weapon Gaps'],
    source: '@September Everglow, 04/06/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-classes-2',
    question: 'Is Spirit Lancer viable as a first class?',
    answer: 'Not recommended. Low damage early, lacks stamina management until late (level 84+), and is a heavy stamina consumable sink. Great later in endgame.',
    category: 'Classes & Skills',
    tags: ['Spirit Lancer', 'Starter Class', 'Stamina Sink', 'Support'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/05/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-classes-3',
    question: 'How do I get skills with (P) and (T) designations?',
    answer: 'EX skills from Epitaph trials in Season 3. (P) = Power, (T) = Technical. Most are unreleased; only the first two per vocation are accessible now.',
    category: 'Classes & Skills',
    tags: ['EX Skills', '(P) Power', '(T) Technical', 'Epitaph', 'Season 3'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/02/2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'dr-classes-4',
    question: 'How do I unlock Job Emblem?',
    answer: 'Reach level 70, raise Mysree Forest to Area Rank 13, complete the quest from Archibald, follow the White Dragon quest, then the Goblin King quest. Level up with PP mode.',
    category: 'Classes & Skills',
    tags: ['Job Emblem', 'Level 70', 'Mysree Forest AR13', 'Goblin King', 'PP Mode'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/04/2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'dr-classes-5',
    question: 'What are the best augments for physical damage?',
    answer: 'Combat Momentum (Fighter, +31 STR at level 6), Great Grasp (Warrior S2 tree), various element attack augments from Sorcerer, and relevant enemy slayer augments.',
    category: 'Classes & Skills',
    tags: ['Augments', 'Physical Damage', 'Combat Momentum', 'Great Grasp', 'STR'],
    source: '@September Everglow, 05/18/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-classes-6',
    question: 'Can I mix fashion from different vocations?',
    answer: 'Yes, using /fashion commands. Equip gear from any vocation as fashion (/fashion add then /fashion apply), even if you cannot normally equip it in battle.',
    category: 'Classes & Skills',
    tags: ['Fashion Mix', 'Cross Vocation', '/fashion', 'Cosmetics'],
    source: '@September Everglow, 05/05/2026',
    verified: true,
    popularity: 89
  },

  // 9. LEVELING
  {
    id: 'dr-level-1',
    question: 'How do I level alt vocations quickly?',
    answer: 'Once you have one vocation at 90, equip the upgraded Rookie Ring (50% XP). Let high-level main pawns carry you. Complete delivery board quests using stockpiled materials.',
    category: 'Leveling',
    tags: ['Alt Vocations', 'Powerleveling', 'Rookie Ring', 'Board Quests', 'Main Pawns'],
    source: '@jared, 05/15/2026',
    verified: true,
    popularity: 98
  },
  {
    id: 'dr-level-2',
    question: 'Where should I level around level 45-60?',
    answer: 'Bloodbane Isle. Complete board quests, world quests, and dungeons. Hire high-level pawns (within 20 levels) if needed.',
    category: 'Leveling',
    tags: ['Level 45-60', 'Bloodbane Isle', 'BBI', 'World Quests', 'Grind Spot'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/10/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-level-3',
    question: 'How do I get from level 60 to 70 fast?',
    answer: 'Bloodbane Isle quests, especially board quests with high XP payouts. Run world quests and dungeon sweeps with hired high-level pawns.',
    category: 'Leveling',
    tags: ['Level 60-70', 'Fast Leveling', 'Bloodbane Isle', 'Dungeon Sweeps'],
    source: '@Dr. Aven, 04/24/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-level-4',
    question: 'What is the XP curve after level 80?',
    answer: 'Flat ~4.2M XP per level from level 80 through level 93.',
    category: 'Leveling',
    tags: ['XP Curve', 'Level 80', '4.2M XP', 'Level 93 Cap'],
    source: '@Kinbaku, 04/13/2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'dr-level-5',
    question: 'How do bonus dungeon XP tickets work?',
    answer: 'They scale dynamically with your level. Best used at level 80+ for maximum XP efficiency. Save your tickets until then.',
    category: 'Leveling',
    tags: ['Bonus Dungeon', 'XP Tickets', 'Scaling', 'Level 80+'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/27/2026',
    verified: true,
    popularity: 92
  },

  // 10. TECHNICAL ISSUES
  {
    id: 'dr-tech-1',
    question: 'Why does my UI break or have missing text?',
    answer: 'If using modified exe, set WordWrap=0 in DDO_perf.ini. This fixes most UI display and text cutoff issues.',
    category: 'Technical Issues',
    tags: ['UI Break', 'Missing Text', 'WordWrap=0', 'DDO_perf.ini', 'Bug'],
    source: '@_Font_, 05/23/2026',
    verified: true,
    popularity: 94
  },
  {
    id: 'dr-tech-2',
    question: 'How do I unlock the framerate (60+ FPS)?',
    answer: 'Use Bunie\'s modified exe from #performance-patches. Edit DDO_perf.ini to set your desired FPS. Must run the game in Windowed or Borderless mode.',
    category: 'Technical Issues',
    tags: ['FPS Unlock', 'Framerate', '60 FPS', '144 FPS', 'DDO_perf.ini'],
    source: '@Strudel, 04/20/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-tech-3',
    question: 'My controller is not working – what to do?',
    answer: '1. Add launcher as a non-Steam game and enable Steam Input.\n2. Run Steam as administrator.\n3. For PS5 controllers, use DS4Windows or Steam Input.\n4. Calibrate controller in the in-game settings.',
    category: 'Technical Issues',
    tags: ['Controller', 'Gamepad', 'Steam Input', 'DS4Windows', 'PS5 Controller'],
    source: '@SirRockEmSockEm, 05/02/2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'dr-tech-4',
    question: 'How do I update the English translation?',
    answer: 'Use the "Update Translation" button (kanji/letter icon) in the launcher. It turns green when an update is available.',
    category: 'Technical Issues',
    tags: ['Translation', 'English Patch', 'Update Translation', 'Launcher'],
    source: '@Sapphira (She/Her), 04/26/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-tech-5',
    question: 'I get constant disconnections (M-errors) – what to do?',
    answer: '1. Use Cloudflare WARP 1.1.1.1 VPN.\n2. Restart your router.\n3. Allow game executable through Windows firewall.\n4. Replace DDO.exe and launcher with fresh copies.\n5. Try moving game folder to your C: drive.',
    category: 'Technical Issues',
    tags: ['M-errors', 'Disconnect', 'WARP 1.1.1.1', 'Firewall', 'Network Fix'],
    source: '@Emma Evergard, 05/23/2026',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-tech-6',
    question: 'Why does the game run at low FPS?',
    answer: 'The game is 32-bit and primarily utilizes a single CPU core. Use Bunie\'s modified exe for better performance. S3 areas are particularly CPU intensive.',
    category: 'Technical Issues',
    tags: ['Low FPS', 'Lag', 'Single Core', '32-bit', 'Performance Patch'],
    source: '@September Everglow, 04/22/2026',
    verified: true,
    popularity: 90
  },
  {
    id: 'dr-tech-7',
    question: 'How do I take screenshots in-game?',
    answer: 'Use ReShade or photo mode (saves to AppData\\Local\\CAPCOM\\Dragon\'s Dogma Online\\ScreenShot). Steam overlay may not capture for non-Steam launcher.',
    category: 'Technical Issues',
    tags: ['Screenshots', 'Photo Mode', 'AppData', 'ReShade'],
    source: '@4ssendnik, 04/25/2026',
    verified: true,
    popularity: 84
  },

  // 11. EVENTS & COSMETICS
  {
    id: 'dr-event-1',
    question: 'How do I get Overlord outfits (Albedo, Ainz)?',
    answer: 'Currently only available by completing Hardcore mode (all vocations to level 93 on one HC character). Will be made available to everyone eventually.',
    category: 'Events & Cosmetics',
    tags: ['Overlord', 'Albedo', 'Ainz', 'Hardcore Mode', 'Cosmetics'],
    source: '@jared, 05/13/2026',
    verified: true,
    popularity: 93
  },
  {
    id: 'dr-event-2',
    question: 'Are Berserk and Rathalos crossover items available?',
    answer: 'Berserk was limited-time during the anniversary (November). Rathalos was from a short event. Both may return in future event rotations.',
    category: 'Events & Cosmetics',
    tags: ['Berserk', 'Rathalos', 'Monster Hunter', 'Crossover', 'Events'],
    source: '@Arisen of Balance & NO FUN: Wren, 05/07/2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'dr-event-3',
    question: 'How do I get Re:Zero crossover outfits?',
    answer: 'Exchange 100 Peafowl Medals at Lisa in the Relay Station. Subaru jersey is male-only; Rem/Ram ensembles are female-only.',
    category: 'Events & Cosmetics',
    tags: ['Re:Zero', 'Rem', 'Ram', 'Subaru', 'Peafowl Medals', 'Lisa'],
    source: '@_Font_, 05/17/2026',
    verified: true,
    popularity: 91
  },
  {
    id: 'dr-event-4',
    question: 'How do I get Street Fighter cosmetics?',
    answer: 'Random drops from World Quests and dungeon chests. M.Bison hat is a rare drop from select high-rank WQs.',
    category: 'Events & Cosmetics',
    tags: ['Street Fighter', 'M.Bison', 'Wigs', 'Chests', 'Cosmetics'],
    source: '@ChimpyChan, 05/19/2026',
    verified: true,
    popularity: 86
  },
  {
    id: 'dr-event-5',
    question: 'Are there any ongoing events on the server?',
    answer: 'BO weekends give 1.5x Blood Orbs from kills (active on weekends). BBM box Wednesdays give extra boxes. Check in-game schedule using /schedule.',
    category: 'Events & Cosmetics',
    tags: ['BO Weekend', '1.5x BO', 'BBM Wednesday', '/schedule', 'Events'],
    source: '@September Everglow, 05/04/2026',
    verified: true,
    popularity: 89
  },

  // 12. QUICK COMMANDS
  {
    id: 'dr-cmd-1',
    question: 'What commands are available in-game?',
    answer: '• /autoloot on/off – toggle automatic loot pickup\n• /fashion add/apply/reset – manage cross-vocation fashion\n• /schedule – view server weekly reset timers & active events\n• /bbminfo – view Bitterblack Maze weekly status\n• /claimrewards – claim all quest & event rewards at once\n• /locale – change language for server-sent text\n• /transfer [First Last] – trade items to another player\n• /claimhcreward – claim Hardcore mode rewards\n• /fixmsq – emergency reset for broken MSQ stages (on Channel 6)\n• /help – display full command list',
    category: 'Quick Commands',
    tags: ['/autoloot', '/fashion', '/schedule', '/bbminfo', '/claimrewards', '/fixmsq', 'Commands'],
    source: 'Various, 04/2026–05/2026',
    verified: true,
    popularity: 99
  },

  // 13. MISCELLANEOUS
  {
    id: 'dr-misc-1',
    question: 'Where can I find monster locations and maps?',
    answer: 'Use the interactive map: https://play.dogmarising.org/map-selection or our Spot Search radar. Search for any monster by name or region.',
    category: 'Miscellaneous',
    tags: ['Interactive Map', 'Monster Locations', 'Radar', 'play.dogmarising.org'],
    source: '@Emma Evergard, 05/23/2026',
    discordLink: 'https://play.dogmarising.org/map-selection',
    verified: true,
    popularity: 95
  },
  {
    id: 'dr-misc-2',
    question: 'How do I dye gear?',
    answer: 'Enhance gear to at least 1-star (★1), then use Rainbow Dye (purchasable from Ophelia with RC) in the crafting menu.',
    category: 'Miscellaneous',
    tags: ['Dye Gear', 'Rainbow Dye', 'Ophelia', '1 Star', 'Color'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/07/2026',
    verified: true,
    popularity: 88
  },
  {
    id: 'dr-misc-3',
    question: 'What are Golden Gemstones used for?',
    answer: 'Limit breaking, Job Emblem slotting insurance, BBM item extraction (3 per item), instant revives, and resetting equipment dismantle attempts.',
    category: 'Miscellaneous',
    tags: ['Golden Gemstones', 'GG', 'Limit Break', 'Extraction', 'Revives'],
    source: '@September Everglow, 04/01/2026',
    verified: true,
    popularity: 92
  },
  {
    id: 'dr-misc-4',
    question: 'How does the EXP penalty work with party members?',
    answer: 'If you have any support pawns or other players in the party and the level gap between the highest and lowest member is 21+, no one gets XP. Your own main pawns do not trigger this penalty.',
    category: 'Miscellaneous',
    tags: ['XP Penalty', '21 Levels', 'Party', 'Support Pawns'],
    source: '@Prisca, 04/18/2026',
    verified: true,
    popularity: 96
  },
  {
    id: 'dr-misc-5',
    question: 'What are Relief Coins used for?',
    answer: '• Azure/Mint: Exchange for crests and endgame materials.\n• Vivid Violet: Endgame dungeon access, cosmetics.\n• Pure White/Moon White: Cosmetics and select equipment enhancements.',
    category: 'Miscellaneous',
    tags: ['Relief Coins', 'Azure Coins', 'Mint Coins', 'Vivid Violet', 'Pure White'],
    source: '@Dr. Aven, 04/29/2026',
    verified: true,
    popularity: 89
  },
  {
    id: 'dr-misc-6',
    question: 'How do I get my pawns to use stamina buffs?',
    answer: 'Set their AI priority to "Restore Stamina" at the bell in your Arisen\'s Room. Use Pawn Commands to force stamina restoration during fights.',
    category: 'Miscellaneous',
    tags: ['Pawn Stamina', 'Stamina Buffs', 'Arisen Room', 'Pawn Bell'],
    source: '@Morpheus Matrix, 04/07/2026',
    verified: true,
    popularity: 87
  },
  {
    id: 'dr-misc-7',
    question: 'What is the difference between Say and Shout chat?',
    answer: 'Say is for your current channel and immediate area. Shout is broadcast across all channels (global) with a 10s cooldown (5s with performance patch).',
    category: 'Miscellaneous',
    tags: ['Say Chat', 'Shout Chat', 'Global Chat', 'Channels'],
    source: '@Skar/Vyrnnoth, 04/24/2026',
    verified: true,
    popularity: 85
  },
  {
    id: 'dr-misc-8',
    question: 'How long does the in-game day/night cycle last?',
    answer: '6:00 PM to 6:00 AM in-game is night (45 minutes real time). Day is also 45 minutes (total 90-minute full cycle).',
    category: 'Miscellaneous',
    tags: ['Day Night Cycle', 'Night Duration', '45 Minutes', 'Lestania Time'],
    source: '@Arisen of Balance & NO FUN: Wren, 04/09/2026',
    verified: true,
    popularity: 86
  }
];
