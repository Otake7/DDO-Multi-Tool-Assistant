export interface BestiarySpecies {
  id: string;
  name: string;
  category: string;
  season?: string;
  explanation: string;
  strategy: string;
  includedEnemies: string[];
  coreType?: 'Elemental Core' | 'Chance Core' | 'Spore Spikes' | 'Armor Peeling' | 'None' | 'Varies';
  weaknesses?: string[];
  resistances?: string[];
  keyDebilitations?: string[];
  dangerLevel?: 'Low' | 'Medium' | 'High' | 'Extreme';
  iconName?: string;
  colorTheme?: string;
  loreNote?: string;
}

export const BESTIARY_SPECIES: BestiarySpecies[] = [
  {
    id: 'demihuman',
    name: 'Demihuman',
    category: 'Demihuman',
    explanation: 'This category includes bipedal enemies that have simple intelligence. Mostly found in earlier sections of most areas, they won\'t pose a challenge in small numbers. Includes all Goblin types (except Infected and Alchemized), all Saurian types (except War-Ready) and all Pixie types (except Infected). Mandragoras are also included, for some reason. No large enemies included.',
    strategy: 'Nothing special to mention. Observe their attack patterns and react accordingly. Saurians have damage reduction and high Endurance until you cut their tails; cutting it off severely weakens them. Goblins\' strength comes from their sheer numbers. Do not get swarmed by them.',
    includedEnemies: [
      'Goblin',
      'Hobgoblin',
      'Goblin Shaman',
      'Goblin Leader',
      'Saurian',
      'Saurian Sage',
      'Saurian King',
      'Gecko Saurian',
      'Pixie',
      'Forest Pixie',
      'Mandragora'
    ],
    coreType: 'None',
    weaknesses: ['Fire (Goblins & Saurians)', 'Ice (Desert types)', 'Slashing (Saurian Tails)'],
    resistances: ['Water (Saurians in water)'],
    keyDebilitations: ['Sleep', 'Freeze', 'Stun'],
    dangerLevel: 'Low',
    colorTheme: 'emerald',
    loreNote: 'Basic intelligent humanoids. Severing Saurian tails completely removes their defense buff.'
  },
  {
    id: 'human',
    name: 'Human',
    category: 'Human',
    explanation: 'As you can guess, all human enemies count as Human. This category includes all types of Human, Bandit and Pawn enemies (except Mist variants). Phindymian human enemies also count as Human, even though they have infected models. Also includes Diamantes, but only his human form. Also includes certain other important folks that I won\'t mention, due to spoilers. You\'ll have to find out yourself. No large enemies included, since anything larger is not a Human anyway.',
    strategy: 'No special measures needed. All generic human enemies have the same moveset as Pawns and you except for a few exceptions, so you just need to observe what skills they can use and kill them before they get to pull any funny moves. For you-know-who, use Lightning damage and be wary of the ice attacks. You can get frozen easily by some of his attacks. As for Diamantes\' human form, he\'s basically a bootleg Sorcerer. Avoid his Crescent Blade and massive AoEs, and you\'ll be fine. All human and pawn enemies are usually susceptible to Dark damage, and most debilitations work on them (except for Mist variants). Golden and Petrification won\'t kill them instantly like they do to you, however.',
    includedEnemies: [
      'Bandit Fighter',
      'Bandit Hunter',
      'Bandit Sorcerer',
      'Rogue Pawns',
      'Corrupted Arisen',
      'Phindymian Human',
      'Diamantes (Human Form)',
      'Hostile Knights'
    ],
    coreType: 'None',
    weaknesses: ['Dark', 'Lightning', 'Headshots / Critical Strikes'],
    resistances: ['Physical status instant-kill (Golden/Petrify won\'t 1-shot)'],
    keyDebilitations: ['Darkness', 'Blind', 'Silence', 'Freeze'],
    dangerLevel: 'Medium',
    colorTheme: 'blue',
    loreNote: 'Humans share player animations and skill pools. Silence completely neuters human sorcerers.'
  },
  {
    id: 'beast',
    name: 'Beast',
    category: 'Beast',
    explanation: 'Includes all Chimera types (except for Shadow and Blaze), all Wolf and Warg types (except Alchemized and Infected variants), and all other passive animals around the overworld. Includes Foot Biters, as well.',
    strategy: 'For "dog" type enemies, move sideways to avoid their lunges or overwhelm them before they get to lunge at you. They can be easily staggered and knocked down with repeated hits. For Chimeras, cutting the tail will help, but will only disable the occasional breath attack the snake can do. It won\'t be weakened much otherwise. White Chimeras are extremely weak to Dark damage.',
    includedEnemies: [
      'Wolf',
      'Direwolf',
      'Warg',
      'Grimwarg',
      'Chimera (Standard)',
      'Gorechimera',
      'White Chimera',
      'Foot Biter',
      'Boar',
      'Deer'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Fire (Standard Beasts)', 'Dark (White Chimera)', 'Lightning (Water beasts)'],
    resistances: ['Ice (Direwolves)'],
    keyDebilitations: ['Burn', 'Shock', 'Stag/Knockdown'],
    dangerLevel: 'Medium',
    colorTheme: 'amber',
    loreNote: 'Chimera snake tails cast poison/petrify; severing the tail stops rear breath attacks.'
  },
  {
    id: 'giant',
    name: 'Giant',
    category: 'Giant',
    explanation: 'As the name implies, this category only includes some large enemies. Includes all Cyclops types (except Infected), all Ent types, Trolls and Colossuses.',
    strategy: 'No special strategy needed. Hit them where it hurts (the head), reveal their cores and topple them. Normal Ents are weak to fire and usually have their cores at their knees, but Phindymian Ents are weak to Dark instead, and have the cores at their hands. All Giants have Elemental Cores. Some variants will have the cores in their elbows or knees, but the weak spot is still the head.',
    includedEnemies: [
      'Cyclops',
      'Armored Cyclops',
      'Gorecyclops',
      'Colossus',
      'Troll',
      'Cave Troll',
      'Ent',
      'Ancient Ent',
      'Phindymian Ent'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Lightning (Cyclops/Colossus)', 'Fire (Standard Ents)', 'Dark (Phindymian Ents)'],
    resistances: ['Earth/Strike on armored parts'],
    keyDebilitations: ['Blind (Eye hits)', 'Burn', 'Shock'],
    dangerLevel: 'High',
    colorTheme: 'orange',
    loreNote: 'Aim for the helmet or armor latches on Armored Cyclopes to expose vulnerable hitboxes.'
  },
  {
    id: 'undead',
    name: 'Undead',
    category: 'Undead',
    explanation: 'If it\'s dead but still has decaying flesh on it, it\'s an undead. Includes all Undead types, Torturers, and Eliminator variants. No large enemies included, however.',
    strategy: 'You don\'t need to plan ahead unless you are fighting Eliminators. Most undead are easy to deal with, but Eliminators are tough and will rush at you if you give them the chance. They also have an execution attack that will take your head clean off, if you can\'t escape their grasp in time. Move sideways to avoid their rushing attack, and try to not lose your head.',
    includedEnemies: [
      'Undead Warrior',
      'Undead Mage',
      'Fat Undead',
      'Torturer',
      'Eliminator',
      'Executioner Eliminator',
      'Plague Zombie'
    ],
    coreType: 'None',
    weaknesses: ['Holy', 'Fire', 'Bludgeoning / Strike damage'],
    resistances: ['Dark (Absorbed/Resisted)', 'Poison/Bleed (Immune)'],
    keyDebilitations: ['Holy Burst', 'Burn', 'Knockdown'],
    dangerLevel: 'Medium',
    colorTheme: 'rose',
    loreNote: 'Eliminator tackle grabs will instantly execute downed players; sidestep charges immediately.'
  },
  {
    id: 'skeleton',
    name: 'Skeleton / Skeletal',
    category: 'Skeleton / Skeletal',
    explanation: 'If it\'s dead and only the bones are left, it\'s a Skeleton enemy. Includes all variants of Skeletons (except Alchemized). Wights and Skull Lords also count as Skeletons. Skeleton Cyclops and Skeleton Wargs are also included.',
    strategy: 'Regular skeletons only pose a challenge in numbers. Wights can cast magick on you while floating, so you\'ll need ranged attacks or magick. Skull Lords are heavily armored and can also cast magick. Skeleton Cyclops types have to be dealt with in a specific manner, however. You must attack and break the head first, then the arms. They will be damage resistant until then, but will go down easily once all three limbs are broken. Skeleton Wargs have the same moveset as other "wolf" enemies.',
    includedEnemies: [
      'Skeleton Knight',
      'Skeleton Sorcerer',
      'Skeleton Warg',
      'Skull Lord',
      'Wight',
      'Lich',
      'Skeleton Cyclops'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Holy', 'Bludgeoning / Strike (High bonus vs bones)'],
    resistances: ['Slashing / Piercing', 'Dark', 'Poison / Disease (Immune)'],
    keyDebilitations: ['Holy Burst', 'Stun', 'Freeze'],
    dangerLevel: 'Medium',
    colorTheme: 'slate',
    loreNote: 'Skeleton Cyclopes require breaking Head -> Left Arm -> Right Arm to break their massive defense barrier.'
  },
  {
    id: 'winged',
    name: 'Winged',
    category: 'Winged',
    explanation: 'If it has a beak or tells you riddles and can fly on top of those, it\'s a Winged type! Includes all Griffin, Sphinx and Cockatrice types. Also includes all Harpy, Bee and bird types. Except Infected, Alchemized and War-Ready variants. Includes Moths too, funny enough. Gargoyles are excluded, and count as Magickal Constructs.',
    strategy: 'For bird types and harpies, high Knockdown Power and repeated hits will let you drop them on the ground and finish them off easily. For larger ones, you must drain their stamina quickly and not give them a chance to fly out of reach. Watch out for Griffins\' Wind Pressure and magick, Nightmares\' songs and Cockatrices\' petrifying breath. Winged large enemies have Elemental Cores. White Griffins are very weak to Dark.',
    includedEnemies: [
      'Harpy',
      'Snow Harpy',
      'Nightmare',
      'Siren',
      'Killer Bee',
      'Moth',
      'Griffin',
      'White Griffin',
      'Cockatrice',
      'Sphinx',
      'Grand Sphinx'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Fire (Feathers/Wings ignite)', 'Dark (White Griffin)', 'Lightning (Cockatrice)'],
    resistances: ['Wind (Resisted)', 'Petrify (Cockatrice is immune)'],
    keyDebilitations: ['Burn (Grounds them)', 'Freeze', 'Blind'],
    dangerLevel: 'High',
    colorTheme: 'cyan',
    loreNote: 'Igniting feathers with Fire prevents aerial lift-off and forces ground combat.'
  },
  {
    id: 'construct',
    name: 'Magickal Construct / Construct / Golem',
    category: 'Magickal Construct / Construct / Golem',
    explanation: 'If it\'s manmade, moves via magick and programmed to smash your head in, it\'s a Golem! Includes all Golem types, Machinas and Gargoyles. Damned Golems and Goliaths count as Alchemized, however.',
    strategy: 'For Gargoyles, the strategy is the same for other Winged enemies. Watch out for their dash attack, though. They will attempt to grab you if you get knocked down. For Golems, break all the magick talismans they have all over their bodies until only one is left. This might be more challenging than it sounds if the target falls on the only weak spot it has. Bring AoE or precise magick if possible. For Machina types, target the dorsal exhaust first, then the chest when it\'s enraged. All large Construct enemies have Chance Cores.',
    includedEnemies: [
      'Golem',
      'Stone Golem',
      'Iron Golem',
      'Machina',
      'Ancient Machina',
      'Gargoyle',
      'Dread Gargoyle'
    ],
    coreType: 'Chance Core',
    weaknesses: ['Strike / Bludgeoning', 'Lightning (Machinas)', 'Chance Attacks on Cores'],
    resistances: ['Piercing / Slashing (High defense)', 'All Debilitations (High immunity)'],
    keyDebilitations: ['Physical Stagger (Chance attacks only)'],
    dangerLevel: 'High',
    colorTheme: 'violet',
    loreNote: 'Constructs feature Chance Cores instead of Elemental Cores; build Chance Attack to deplete enrage.'
  },
  {
    id: 'fiend',
    name: 'Fiend / Demon',
    category: 'Fiend / Demon',
    explanation: 'All sorts of demonic entities are included in this category. Zuhl variants, Manticores, all Floating Gem Eye variants (except Alchemy Eyes), all Medusa types and Maneaters. Includes Hellhounds and Grigoris; Evil Eye and Volt Eye, as well as Ifrit.',
    strategy: 'For Zuhl, hit him with Ice or Lightning depending on the version. Also watch out for his lunging attacks and magick. Medusas and Gorgons can petrify you or grab you, so make sure you observe their moves carefully. Hellhounds are basically wolves that can spit fire. Grigoris are agile Fiends that can lunge at you. Manticores are weakened if you cut the tail, but they can regrow it (unlike Chimeras). Evil Eye is weak to Holy and can petrify you, while Volt Eye is weak to Fire and can Shock you. Ifrit is another can of worms, and he is an EXM boss. He has two phases, with the first one having Zuhl moveset. Hit the arms in the first phase. Second phase is a unique form that requires you to break both arms at about the same time. All large Fiend enemies have Elemental Cores.',
    includedEnemies: [
      'Zuhl',
      'Zuhl (Flame/Frost variants)',
      'Manticore',
      'Goremanticore',
      'Medusa',
      'Gorgon',
      'Maneater (Chest mimic)',
      'Hellhound',
      'Grigori (Demonkin)',
      'Evil Eye',
      'Volt Eye',
      'Ifrit (EXM Extreme)'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Holy (Evil Eye/Demons)', 'Ice / Lightning (Zuhl/Hellhound)', 'Fire (Volt Eye)'],
    resistances: ['Dark', 'Fire (Hellhounds/Ifrit)'],
    keyDebilitations: ['Holy Burst', 'Freeze', 'Silence'],
    dangerLevel: 'Extreme',
    colorTheme: 'purple',
    loreNote: 'Manticore scorpion tails regrow over time! Ifrit phase 2 requires synchronized arm breaks.'
  },
  {
    id: 'ogre',
    name: 'Ogre / Demonkin / Ogrekin',
    category: 'Ogre / Demonkin / Ogrekin',
    explanation: 'This category includes bipedal monsters that are somewhat more intelligent than Demihumans. It includes all Orc variants, Apes, Ghouls and Ogre types (except Infected and War-Ready variants). Also includes Spinebacks, Little Spines and Cragger types. The Dwarf Orcs in Season 3 are also Ogres, even though it\'s easy to think they\'d be War-Ready.',
    strategy: 'Orcs are medium-sized enemies who are usually weak to Lightning. They are smart and use weapons, and are also strong even when alone. Apes and Ghouls are chaotic, but you can dodge their rushing attacks fairly easily. Spinebacks and Little Spines can spin like a wheel and go around wildly. All Ogrekin enemies have Chance Cores (slot Chance Attack to deplete enrage).',
    includedEnemies: [
      'Orc Soldier',
      'Orc Chieftain',
      'Orc General',
      'Dwarf Orc',
      'Ogre',
      'Elder Ogre',
      'Ghoul',
      'Dread Ape',
      'Silver Roar',
      'Spineback',
      'Little Spine',
      'Cragger',
      'Progenitor'
    ],
    coreType: 'Chance Core',
    weaknesses: ['Lightning (Orcs)', 'Fire (Apes & Ogres)', 'Holy (Ghouls)', 'Chance Attacks on Cores'],
    resistances: ['Physical Stagger during Berserk rushes'],
    keyDebilitations: ['Shock', 'Burn', 'Sleep'],
    dangerLevel: 'High',
    colorTheme: 'red',
    loreNote: 'Orcs possess high intelligence and will coordinate shield blocks and ranged volleys. All Ogrekin possess Chance Cores.'
  },
  {
    id: 'dragon',
    name: 'Dragon / Dragonkin',
    category: 'Dragon / Dragonkin',
    explanation: 'Includes Lindwurms, Lotus Fins, Dagons, Behemoths, Drakes, Elder Dragons, Angules, Wyrms, Cursed Dragons, Phantasmic Great Dragon, Tarasque and its variants, Spirit Dragon Willmia and Golgorran. Also includes the Black Dragon and the Evil Dragon.',
    strategy: 'For Lindwurm types, break their wings to remove the aura. Behemoths\' weak spot is usually in their tailbone region, but you can also break the tusks. Angules is weak to Dark and will stop casting magick if you break the horn, and the weak spot is in the dorsal region. Drakes and Wyrms can breathe elemental flames and cast magick, and the weak spot is usually in the chest. Cursed Dragons can not be damaged outside of their weak spots until you break the crystals. Phantasmic Great Dragon is weak to Sleep, Poison and Dark damage, but immune to Frozen Solid. Tarasque is a tortoise-like Dragon, and requires you to break the legs first before you can attack the weak spot which is on its back. Golgorran has the same pseudo-armor mechanic as other Alchemized enemies and can inflict Golden. Elder Dragons are always angry and have breakable spikes on their bodies, with the final weak spot is on the chest.',
    includedEnemies: [
      'Drake (Fire)',
      'Wyrm (Ice)',
      'Wyvern (Lightning)',
      'Lindwurm',
      'Lotus Fin',
      'Dagon',
      'Behemoth',
      'Grand Behemoth',
      'Angules',
      'Cursed Dragon',
      'Tarasque',
      'Elder Dragon',
      'Spirit Dragon Willmia',
      'Phantasmic Great Dragon',
      'Golgorran',
      'Black Dragon',
      'Evil Dragon'
    ],
    coreType: 'Elemental Core',
    weaknesses: ['Ice (Drake/Fire Dragons)', 'Fire (Wyrms)', 'Dark (Angules/Cursed)', 'Holy (Evil Dragon)'],
    resistances: ['Opposing elements (Immune to matching elements)'],
    keyDebilitations: ['Sleep (Willmia/Phantasmic)', 'Poison', 'Elemental Burst'],
    dangerLevel: 'Extreme',
    colorTheme: 'amber',
    loreNote: 'Heart cores on Drakes/Wyrms yield massive downed multipliers. Break Lindwurm wings to dispel water shroud.'
  },
  {
    id: 'spirit',
    name: 'Spirit',
    category: 'Spirit',
    explanation: 'All manners of otherworldly filth is gathered under this category. Death Knights, Witches, Empress Ghosts, Ghost Mails, Living Armors and Death. All Ghost types except Grudge Ghosts (which count as Cursed instead). All "Mist" and "Blaze" enemies also count as Spirits, regardless of their forms. Black Knight is also a Spirit, even though one might think he\'s a Human at first glance.',
    strategy: 'Death Knights can cast some strong magick and have a mean slash. They can also use their lanterns to put you to sleep. Witches and Empress Ghosts can float out of reach while casting. Ghost Mails and Living Armors can block with their shields and overwhelm you with their speed. Ghosts will try to get in close range and shriek; getting hit will make you fall on the ground. Death is immune to most debilitations and will attempt to escape if you don\'t kill him fast enough. It only has two attacks, though. It\'ll try to put you to sleep with its shrieking lantern before trying to reap your soul with one scythe slash. Large Mist and Blaze enemies do not have cores. All Spirit type enemies can be staggered and toppled if you have high Chance Attack, and the ones who have cores have Chance Cores.',
    includedEnemies: [
      'Ghost',
      'Phantom',
      'Empress Ghost',
      'Witch',
      'Death Knight',
      'Ghost Mail',
      'Living Armor',
      'Black Knight',
      'Death (Reaper)',
      'Mist Enemy Variants',
      'Blaze Enemy Variants'
    ],
    coreType: 'Chance Core',
    weaknesses: ['Holy', 'Chance Attacks', 'Magick attacks (Bypasses ethereal defense)'],
    resistances: ['Physical strike/pierce (High base ethereal resistance)', 'Dark'],
    keyDebilitations: ['Holy Burst', 'Silence (Witches)'],
    dangerLevel: 'Extreme',
    colorTheme: 'indigo',
    loreNote: 'Death will attempt to escape when health drops; prepare sleep resist lanterns and high burst DPS.'
  },
  {
    id: 'cursed',
    name: 'Cursed',
    category: 'Cursed',
    explanation: 'Intangible shadow enemies are categorized as this. Includes all Shadow enemy variants, such as Shadow Chimeras, Shadow Wolves, Shadow Goblins and Shadow Harpies. Grudge Ghosts also count as Cursed, for some reason.',
    strategy: 'No special strategy needed. Just be aware that Shadow enemies are immune to all debilitations and have no cores (which also means they can\'t get enraged). High Chance Attack will let you topple them easier and they take more damage when toppled, which is the exact same as Spirit type enemies. Watch out for the attacks of Shadow enemies, because they can accumulate Cursed on you.',
    includedEnemies: [
      'Shadow Goblin',
      'Shadow Wolf',
      'Shadow Harpy',
      'Shadow Chimera',
      'Grudge Ghost'
    ],
    coreType: 'None',
    weaknesses: ['Chance Attacks (Fast topple)', 'Holy Damage', 'Downed Damage Multipliers'],
    resistances: ['All Debilitations (100% Immune)', 'Dark Damage'],
    keyDebilitations: ['None (Completely Immune)'],
    dangerLevel: 'High',
    colorTheme: 'zinc',
    loreNote: 'Shadow variants cannot enrage (no cores). Build maximum Chance Attack to trigger fast downs.'
  },
  {
    id: 'formless',
    name: 'Formless / Soft',
    category: 'Formless / Soft',
    explanation: 'Includes some pathetic enemies that don\'t pose a challenge even if they got the numbers on their side. All types of Slimes, Blobs, Jellies, all types of Mudmen, and Worms/Leeches. There are no large Soft enemies.',
    strategy: 'There isn\'t much to note. Just don\'t catch some nasty debilitation because you touched one of the slimes or leeches without protection, and you should be fine. Soft enemies barely pose a challenge other than being annoying. Leeches and worms may leave a small pool of poison after death that can poison you if you step into it.',
    includedEnemies: [
      'Green Slime',
      'Acid Blob',
      'Magma Jelly',
      'Mudman',
      'Giant Leech',
      'Grave Worm'
    ],
    coreType: 'None',
    weaknesses: ['Fire', 'Ice', 'Elemental Magick'],
    resistances: ['Physical Piercing / Slashing (Gelatinous body resistance)'],
    keyDebilitations: ['Burn', 'Freeze'],
    dangerLevel: 'Low',
    colorTheme: 'teal',
    loreNote: 'Gelatinous foes resist physical stabs; burn or freeze them with elemental attacks.'
  },
  {
    id: 'alchemized',
    name: 'Season 1 Alchemized',
    category: 'Season 1 Alchemized',
    season: 'Season 1.3 - 1.4',
    explanation: 'Once you get to Mergoda, you will start encountering Alchemized enemies. Which is somewhere close to the end of Season 1. Includes enemies with the "Damned" and "Alchemized" prefixes, as well as Goliaths. Also includes Alchemy Eyes, Unspeakable Meat and phase two of Diamantes.',
    strategy: 'Small enemies are barely any different, since they are goblins, wolves and harpies anyway. Nothing you haven\'t seen before. However, some Alchemized enemies have a pseudo-armor mechanic where the golden parts on them act as armor, and can be broken to reveal weaknesses. As previously mentioned, Golgorran counts as a Dragon, but he has the same "gold armor" mechanic as Alchemized Griffins and Goliaths do. You must break the gold parts to weaken them and reveal their true weaknesses. Alchemized enemies are often weak to Holy, but Damned Golems and Goliaths have Chance Cores.',
    includedEnemies: [
      'Alchemized Goblin',
      'Alchemized Wolf',
      'Alchemized Harpy',
      'Damned Golem',
      'Goliath (Gold Guardian)',
      'Alchemized Griffin',
      'Alchemy Eye',
      'Unspeakable Meat',
      'Diamantes (Phase 2 Alchemized)'
    ],
    coreType: 'Chance Core',
    weaknesses: ['Holy', 'Armor-Breaking Physical Strikes', 'Chance Attacks on Cores'],
    resistances: ['Dark', 'Golden Debilitation (Immune)'],
    keyDebilitations: ['Holy Burst', 'Armor Break Stagger'],
    dangerLevel: 'Extreme',
    colorTheme: 'yellow',
    loreNote: 'Gold casing acts as hardened pseudo-armor. Focus high-damage attacks to shatter golden plating.'
  },
  {
    id: 'infected',
    name: 'Season 2 Infected / Corrupted',
    category: 'Season 2 Infected / Corrupted',
    season: 'Season 2.0 - 2.3',
    explanation: 'You will encounter this type of enemy often once you reach Season 2 content. Includes all Infected enemy types, even if they are flying, crawling or walking.',
    strategy: 'Small Infected enemies include goblins, wolves and harpies as usual, until you reach Phindym and start seeing Infected Pixies instead (which happen to be reskinned goblins anyway). The spore aura Infected enemies have will slowly inflict Infection on you, so you might want to increase your resistance with augments or consumables. For large enemies, the strategy boils down to hitting them in the weak spot and then breaking the sprouted infection spikes when they get angry. Infected enemies have no cores, and they are usually weak to Ice. Higher Knockdown Power lets you disable their spore auras faster. Further details can be found in the Flow of Combat section.',
    includedEnemies: [
      'Infected Goblin',
      'Infected Wolf',
      'Infected Harpy',
      'Infected Pixie',
      'Infected Cyclops',
      'Infected Ent',
      'Infected Chimera',
      'Corrupted Beasts'
    ],
    coreType: 'Spore Spikes',
    weaknesses: ['Ice (Primary weakness)', 'High Knockdown Power (Disperses Spore Aura)'],
    resistances: ['Infection / Disease Debilitation (Immune)'],
    keyDebilitations: ['Freeze', 'Knockdown'],
    dangerLevel: 'High',
    colorTheme: 'emerald',
    loreNote: 'Infected foes have no standard cores; destroy sprouted black-and-purple spikes when enraged.'
  },
  {
    id: 'war_ready',
    name: 'Season 3 War-Ready',
    category: 'Season 3 War-Ready',
    season: 'Season 3.0 - 3.4',
    explanation: 'All enemies that have "War-Ready" in the name count as War-Ready. Whatever\'s inside the armor is irrelevant. Includes War-Ready Saurians (light and heavy), War-Ready Grimwargs (light and heavy), War-Ready Goremanticores (light and heavy), War-Ready Ogres (light and heavy), War-Ready Gorecyclopses (light and heavy), War-Ready Nightmares (light and heavy) and of course, Catobeplas.',
    strategy: 'For Saurians, breaking the armor on their tails and cutting it off will yield results the fastest. For Grimwargs, hit them in the head. However, for large targets, you\'ll have to peel off all armor. The short of it is, you are supposed to break all armor before you can deal proper damage to a War-Ready enemy in most cases. Further details are included in the Flow of Combat section regarding the armor mechanic. War-Ready enemies don\'t have cores, and do not Enrage. However, they can get riled up when damaged sufficiently. This only grants them a buff.',
    includedEnemies: [
      'War-Ready Saurian (Light & Heavy)',
      'War-Ready Grimwarg (Light & Heavy)',
      'War-Ready Goremanticore (Light & Heavy)',
      'War-Ready Ogre (Light & Heavy)',
      'War-Ready Gorecyclops (Light & Heavy)',
      'War-Ready Nightmare (Light & Heavy)',
      'Catoblepas (Fortress Beast)'
    ],
    coreType: 'Armor Peeling',
    weaknesses: ['Armor-Breaking Physical Skills', 'Focus-firing armored segments'],
    resistances: ['All Damage through intact heavy armor plating'],
    keyDebilitations: ['Armor Shatter', 'Stagger'],
    dangerLevel: 'Extreme',
    colorTheme: 'amber',
    loreNote: 'War-Ready enemies do not enrage or possess cores; peel armor off plates to expose weak meat.'
  },
  {
    id: 'unknown',
    name: 'Unknown',
    category: 'Unknown',
    explanation: 'A very few select "enemies" have no type, so they fall into this category. I only found out about this because I have access to the file that lists all enemies and their species. It includes a bunch of crystals (such as the ones in the Spirit Dragon Willmia fights) and other non-hostile entities that appear in some combat scenarios, such as floating medals. This category probably exists to have static enemies that don\'t take more or less damage due to the type.',
    strategy: 'Hit them until they are destroyed. Watch out, though. Some of them do fight back.',
    includedEnemies: [
      'Dragon Crystals (Willmia Raid)',
      'Floating Trial Medals',
      'Magick Barrier Pylons',
      'Target Dummies',
      'Ritual Summoning Totems'
    ],
    coreType: 'None',
    weaknesses: ['Direct DPS / Sustained Physical or Magick'],
    resistances: ['Neutral to all species species-bonus augment multipliers'],
    keyDebilitations: ['None'],
    dangerLevel: 'Low',
    colorTheme: 'slate',
    loreNote: 'Static battlefield objects and crystals with neutral damage scaling.'
  }
];

export interface SpecificEnemyDetail {
  name: string;
  speciesId: string;
  speciesName: string;
  size: 'Small' | 'Medium' | 'Large' | 'Raid / EXM Boss' | 'Medium / Large' | 'Large / Colossal';
  elementalWeakness: string;
  coreInfo: string;
  strategyTip: string;
  locations: string[];
}

export const SPECIFIC_ENEMIES: SpecificEnemyDetail[] = [
  {
    name: 'Goblin / Hobgoblin',
    speciesId: 'demihuman',
    speciesName: 'Demihuman',
    size: 'Small',
    elementalWeakness: 'Fire / Slashing',
    coreInfo: 'No Core',
    strategyTip: 'Avoid getting swarmed in tight hallways. Cleave with AoE skills or ignite with fire.',
    locations: ['Blandez Coast', 'Hidell Plains', 'Misery Woods']
  },
  {
    name: 'Saurian / Saurian Sage',
    speciesId: 'demihuman',
    speciesName: 'Demihuman',
    size: 'Medium',
    elementalWeakness: 'Fire / Ice (desert) / Slashing',
    coreInfo: 'No Core',
    strategyTip: 'Focus slashing attacks on their tails. Cutting off the tail completely strips their defense buff.',
    locations: ['Blandez Coast', 'Dinar Wetlands', 'Mergoda Waterways']
  },
  {
    name: 'Bandit / Rogue Pawns',
    speciesId: 'human',
    speciesName: 'Human',
    size: 'Medium',
    elementalWeakness: 'Dark / Lightning',
    coreInfo: 'No Core',
    strategyTip: 'Watch out for Sorcerer pawn spells; use Silence or burst them down first.',
    locations: ['Hidell Plains', 'Volden Caverns', 'Phindym Forests']
  },
  {
    name: 'Diamantes (Human Form)',
    speciesId: 'human',
    speciesName: 'Human',
    size: 'Medium',
    elementalWeakness: 'Lightning / Dark',
    coreInfo: 'No Core',
    strategyTip: 'Evade Crescent Blade and wide AoE spells. Stay close and interrupt his casting.',
    locations: ['Mergoda Royal Citadel (Story Boss)']
  },
  {
    name: 'Chimera / Gorechimera',
    speciesId: 'beast',
    speciesName: 'Beast',
    size: 'Large',
    elementalWeakness: 'Fire (Standard) / Dark (White)',
    coreInfo: 'Elemental Core on Goat/Lion head',
    strategyTip: 'Sever snake tail to stop rear venom. Climb lion head and expose elemental core to enrage drain.',
    locations: ['Misery Woods', 'Dinar Wetlands', 'Northern Grandys']
  },
  {
    name: 'Cyclops / Armored Cyclops',
    speciesId: 'giant',
    speciesName: 'Giant',
    size: 'Large',
    elementalWeakness: 'Lightning',
    coreInfo: 'Elemental Core on Eye / Head',
    strategyTip: 'Climb the head and hit the single eye. For armored variants, break the helmet locks first.',
    locations: ['Hidell Plains', 'Blandez Valley', 'Blood Ore Mines']
  },
  {
    name: 'Ent / Ancient Ent',
    speciesId: 'giant',
    speciesName: 'Giant',
    size: 'Large',
    elementalWeakness: 'Fire (Normal) / Dark (Phindymian)',
    coreInfo: 'Elemental Core at knees (Normal) or hands (Phindymian)',
    strategyTip: 'Normal Ents have cores at knees; Phindymian variants have cores at hands and are weak to Dark.',
    locations: ['Misery Woods', 'Phindym Ancient Woods']
  },
  {
    name: 'Eliminator / Executioner',
    speciesId: 'undead',
    speciesName: 'Undead',
    size: 'Medium',
    elementalWeakness: 'Holy / Strike damage',
    coreInfo: 'No Core',
    strategyTip: 'Sidestep their rushing charges. If knocked down, mash jump/evade to avoid the instant-kill stomp.',
    locations: ['Volden Catacombs', 'Mergoda Depths', 'Blood Shrine']
  },
  {
    name: 'Skull Lord / Skeleton Cyclops',
    speciesId: 'skeleton',
    speciesName: 'Skeleton / Skeletal',
    size: 'Large',
    elementalWeakness: 'Holy / Bludgeoning',
    coreInfo: 'Elemental Core after breaking limbs',
    strategyTip: 'For Skeleton Cyclops: Break Head first -> Left Arm -> Right Arm to break its massive defense shield.',
    locations: ['Tomb of the Forsaken', 'Blood Ore Underground']
  },
  {
    name: 'Griffin / White Griffin',
    speciesId: 'winged',
    speciesName: 'Winged',
    size: 'Large',
    elementalWeakness: 'Fire (Standard) / Dark (White Griffin)',
    coreInfo: 'Elemental Core on Chest / Beak',
    strategyTip: 'Burn wings with Fire to prevent flight. White Griffins are extremely weak to Dark damage.',
    locations: ['Grandys Highlands', 'Hidell Cliffs', 'Phindym Skybridge']
  },
  {
    name: 'Cockatrice',
    speciesId: 'winged',
    speciesName: 'Winged',
    size: 'Large',
    elementalWeakness: 'Lightning / Slashing',
    coreInfo: 'Elemental Core on Throat Throat Sac',
    strategyTip: 'Carry Softener potions against petrifying breath. Attack the throat sac when it inflates to cause stagger.',
    locations: ['Dinar Wetlands', 'Mergoda Outskirts']
  },
  {
    name: 'Golem / Machina',
    speciesId: 'construct',
    speciesName: 'Magickal Construct / Construct / Golem',
    size: 'Large',
    elementalWeakness: 'Strike / Lightning (Machina)',
    coreInfo: 'Chance Core on Talismans / Dorsal Exhaust',
    strategyTip: 'Destroy all glowing body talismans. Machinas require targeting the back dorsal vent first.',
    locations: ['Blood Ore Ruins', 'Mergoda Ancient Factory']
  },
  {
    name: 'Zuhl / Frost Zuhl',
    speciesId: 'fiend',
    speciesName: 'Fiend / Demon',
    size: 'Large',
    elementalWeakness: 'Ice (Fire Zuhl) / Lightning (Frost Zuhl)',
    coreInfo: 'Elemental Core on Chest Horns',
    strategyTip: 'High mobility demon. Dodge lunging slashes, climb chest horns when enraged to topple.',
    locations: ['Underworld Rift', 'Mergoda Inner Sanctum']
  },
  {
    name: 'Evil Eye / Volt Eye',
    speciesId: 'fiend',
    speciesName: 'Fiend / Demon',
    size: 'Large',
    elementalWeakness: 'Holy (Evil Eye) / Fire (Volt Eye)',
    coreInfo: 'Elemental Core inside Main Pupil',
    strategyTip: 'Slice tentacles when they sprout to cause knockdown and force the central eye to collapse.',
    locations: ['Abyssal Dungeons', 'Mergoda Astral Chamber']
  },
  {
    name: 'Ifrit (Extreme EXM Boss)',
    speciesId: 'fiend',
    speciesName: 'Fiend / Demon',
    size: 'Raid / EXM Boss',
    elementalWeakness: 'Ice (Phase 1 & 2)',
    coreInfo: 'Arm Weakspots in Phase 2',
    strategyTip: 'Phase 1 follows Zuhl moveset. Phase 2 requires coordinated party DPS to break both arms simultaneously.',
    locations: ['Extreme Raid: Molten Throne']
  },
  {
    name: 'Orc General / Dwarf Orc',
    speciesId: 'ogre',
    speciesName: 'Ogre / Demonkin / Ogrekin',
    size: 'Medium',
    elementalWeakness: 'Lightning / Piercing',
    coreInfo: 'Chance Core on Belt/Back',
    strategyTip: 'Interrupt their war horn calls before they rally backup. High Shock accumulation is very effective.',
    locations: ['Mergoda Frontlines', 'Volden Border Fortress']
  },
  {
    name: 'Drake / Wyrm / Wyvern',
    speciesId: 'dragon',
    speciesName: 'Dragon / Dragonkin',
    size: 'Large',
    elementalWeakness: 'Ice (Drake) / Fire (Wyrm) / Earth (Wyvern)',
    coreInfo: 'Glowing Heart Core on Chest',
    strategyTip: 'Priest/Shield Sage reveal glowing chest heart. Climb chest to drain enrage gauge rapidly.',
    locations: ['Dragon Valley', 'Volcanic Crater', 'Sky Citadel']
  },
  {
    name: 'Lindwurm / Lotus Fin',
    speciesId: 'dragon',
    speciesName: 'Dragon / Dragonkin',
    size: 'Large',
    elementalWeakness: 'Lightning / Fire',
    coreInfo: 'Elemental Core on Dorsal Crest',
    strategyTip: 'Break water wings to dispel the damaging water current barrier that protects its body.',
    locations: ['Dinar Estuary', 'Phindym Lake']
  },
  {
    name: 'Spirit Dragon Willmia',
    speciesId: 'dragon',
    speciesName: 'Dragon / Dragonkin',
    size: 'Raid / EXM Boss',
    elementalWeakness: 'Dark / Sleep Debilitation',
    coreInfo: 'Spirit Pylons & Tail Base Core',
    strategyTip: 'Inflict Sleep during heavy enrage phase. Destroy surrounding dragon crystals to expose main heart.',
    locations: ['Season 2 Grand Raid: Tree of Life']
  },
  {
    name: 'Living Armor / Black Knight',
    speciesId: 'spirit',
    speciesName: 'Spirit',
    size: 'Medium / Large',
    elementalWeakness: 'Holy / Chance Attacks',
    coreInfo: 'Chance Core on Shield Crest',
    strategyTip: 'Shatter outer armor with strike damage or Holy spells to expose spectral core underneath.',
    locations: ['Catacombs Level 3', 'Mergoda Throne Room']
  },
  {
    name: 'Death (The Reaper)',
    speciesId: 'spirit',
    speciesName: 'Spirit',
    size: 'Large',
    elementalWeakness: 'Holy / High Chance Attack',
    coreInfo: 'Chance Core on Lantern',
    strategyTip: 'Carry Sleep protection! Evade lantern sleep radius and roll away before the instant-kill scythe swing.',
    locations: ['Random Incursions in Deep Dungeons']
  },
  {
    name: 'Goliath / Damned Golem',
    speciesId: 'alchemized',
    speciesName: 'Season 1 Alchemized',
    size: 'Large',
    elementalWeakness: 'Holy / Strike damage',
    coreInfo: 'Chance Core under Golden Plating',
    strategyTip: 'Break gold casing plates on arms and legs to disable golden beam attacks and stagger.',
    locations: ['Mergoda Royal Lab', 'Alchemical Sanctuary']
  },
  {
    name: 'Infected Chimera / Infected Cyclops',
    speciesId: 'infected',
    speciesName: 'Season 2 Infected / Corrupted',
    size: 'Large',
    elementalWeakness: 'Ice / High Knockdown',
    coreInfo: 'Spore Spikes (No Core)',
    strategyTip: 'No standard cores! When enraged, black spore spikes sprout. Target and break spikes to cause topple.',
    locations: ['Phindym Outskirts', 'Corrupted Glade']
  },
  {
    name: 'War-Ready Gorecyclops / Catoblepas',
    speciesId: 'war_ready',
    speciesName: 'Season 3 War-Ready',
    size: 'Large / Colossal',
    elementalWeakness: 'Armor Peeling / Raw Burst DPS',
    coreInfo: 'Armor Peeling (No Core)',
    strategyTip: 'No enrage cores exist! Destroy armor plates on legs and torso to expose vulnerable flesh beneath.',
    locations: ['Season 3 Borderlands', 'Acriss Fortress']
  }
];
