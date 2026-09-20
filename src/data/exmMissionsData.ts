export interface EXMMonsterInfo {
  name: string;
  speciesType: string;
  weakness: string;
  coreType?: string;
  notes?: string;
}

export interface EXMReferenceVideo {
  title: string;
  perspective: string;
  note?: string;
  youtubeVideoId: string;
  youtubeUrl: string;
}

export interface EXMSoloStrategy {
  goldResistanceNotes: string;
  greenPawnsAnalysis: {
    job: string;
    badge: string;
    description: string;
    recommendedFor?: string;
  }[];
  keyTakeaways: string[];
}

export interface EXMMission {
  id: string;
  name: string;
  japaneseName?: string;
  badge: string;
  partySize?: string;
  recommendedLevel: number | string;
  timeLimit: string;
  minDefense: string;
  clearRewards: string[];
  additionalHelpingRewards?: string[];
  clearTimeRewards?: { time: string; reward: string }[];
  rankingRewards?: { rank: string; reward: string }[];
  itemRankRequirement?: string;
  orderConditions: string;
  preparationNotes: string;
  specialPreparationTips?: string[];
  troubleWinningAdvice?: string;
  remarks?: string;
  sideNote?: string;
  monstersAppearing: EXMMonsterInfo[];
  partyRecommendation?: string;
  vocationAdvice?: {
    fighter?: {
      abilities?: string[];
      skills?: string[];
      notes: string;
      gearExample?: string;
    };
    hunter?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    alchemist?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    seeker?: {
      coreSkill?: string;
      skills?: string[];
      abilities?: string[];
      notes: string;
      combos?: string;
      interrupts?: string;
    };
    warrior?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    sorcerer?: {
      spells?: string[];
      skills?: string[];
      abilities?: string[];
      notes: string;
      targets?: { spell: string; target: string }[];
    };
    shieldSage?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    elementalArcher?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    priest?: {
      spells?: string[];
      skills?: string[];
      notes: string;
      abilities?: string[];
    };
    highScepter?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
    spiritLancer?: {
      skills?: string[];
      abilities?: string[];
      notes: string;
    };
  };
  soloStrategy?: EXMSoloStrategy;
  suppliedItemsText: string;
  walkthroughAreas: {
    areaNumber: number;
    title: string;
    enemies: string[];
    tactics: string;
    keyTips?: string[];
  }[];
  referenceVideos: EXMReferenceVideo[];
}

export const EXM_MISSIONS: EXMMission[] = [
  {
    id: 'invitation-catacombs',
    name: 'An invitation to the catacombs',
    japaneseName: '地下墓地の誘い (EM1)',
    badge: 'EXM 1 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 58,
    timeLimit: '60 minutes',
    minDefense: 'Physical Defense 1350+ / Magic Defense 1350+',
    clearRewards: ['Crystal of the Underworld x3'],
    orderConditions: 'Completed the personal quest < Dragon Power Vortex >.',
    preparationNotes: 
      'Equip yourself with gear equivalent to level 58 or higher. (Minimum defense guideline: physical defense 1350 or higher, magic defense 1350 or higher). Specialize your skills and abilities for EM. In "Invitation to the Catacombs," monsters such as General Orc, Wight, Living Armor, Skull Lord, Shadow Chimera, Witch, Ghost Mail, and Death Knight will appear.',
    specialPreparationTips: [
      'Specialize your skills and abilities specifically for EM encounters.',
      'Because supplied items are strictly limited and resurrecting downed allies consumes tight party time, self-healing and crowd control are top priorities.'
    ],
    monstersAppearing: [
      {
        name: 'General Orc',
        speciesType: 'Ogrekin (Ogre / Demonkin)',
        weakness: 'Lightning / Piercing',
        coreType: 'Chance Core',
        notes: 'Intelligent bipedal commander; coordinates shield blocks and call-outs. High Shock accumulation interrupts them.'
      },
      {
        name: 'Wight',
        speciesType: 'Skeleton / Skeletal',
        weakness: 'Holy / Bludgeoning (Strike)',
        coreType: 'Elemental Core',
        notes: 'Floats above melee range and casts high-tier dark magick. Use Holy ranged attacks or spells.'
      },
      {
        name: 'Living Armor',
        speciesType: 'Spirit',
        weakness: 'Holy / Chance Attacks',
        coreType: 'Chance Core',
        notes: 'Spectral knight inside heavy plate; shatter armor with Holy or Chance stagger to expose spirit core.'
      },
      {
        name: 'Skull Lord',
        speciesType: 'Skeleton / Skeletal',
        weakness: 'Holy / Bludgeoning (Strike)',
        coreType: 'Elemental Core',
        notes: 'Heavily armored skeletal commander with dark blade slashes and AoE spells. Strike damage cracks bone armor.'
      },
      {
        name: 'Shadow Chimera',
        speciesType: 'Cursed',
        weakness: 'Holy / High Chance Attacks',
        coreType: 'None (Immune to Enrage)',
        notes: '100% immune to all debilitations. Accumulates Cursed status; topple rapidly using high Chance Attack skills.'
      },
      {
        name: 'Witch',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick',
        coreType: 'Chance Core',
        notes: 'Floats out of melee range and summons Sludgemen; highly vulnerable to Silence.'
      },
      {
        name: 'Ghost Mail',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick / Chance Attacks',
        coreType: 'Chance Core',
        notes: 'Floating phantom armor; highly resistant to physical strikes, bypass ethereal defense with Magick & Holy.'
      },
      {
        name: 'Death Knight',
        speciesType: 'Spirit',
        weakness: 'Holy / Chance Attacks',
        coreType: 'Chance Core',
        notes: 'Lethal boss with sleep lantern, sweeping cleaves, and decapitation attacks. Stagger with Falcon Drop or Holy burst.'
      }
    ],
    vocationAdvice: {
      fighter: {
        abilities: ['Strength', 'Spirit', 'Activation', 'Endurance', 'Self-Healing', 'Holy Attack'],
        notes: 'With this lineup, you don\'t need to stun, so I recommend abilities like Strength, Spirit, Activation, Endurance, Self-Healing, and Holy Attack. EM has a time limit and you only have a limited number of items, so Self-Healing is very useful.',
        gearExample: 'For reference, with the Executioner set + Zuhl armor + 55 cloak, my defense was 1376, which I think was pretty decent.'
      },
      seeker: {
        coreSkill: 'Level 6 Falcon Drop',
        notes: 'The Level 6 Falcon Drop\'s effect of staggering surrounding enemies is particularly effective against armored units like Living Armor and Death Knight.',
        combos: 'You can stop their movement with Falcon Drop, land the first hit of Agito Slash, and then use Falcon Drop again as they start moving to defeat them without them being able to do anything. Adding delays with Shield Sage\'s Slow Light will further extend their stagger animation, allowing you to attack freely and easily even defeat Death Knights.',
        interrupts: 'It can also interrupt Living Armor\'s ice magic and Death Knight\'s stomp and decapitation attacks.'
      }
    },
    suppliedItemsText: 'Special Healing Potion x20, Concentrated Garlic Extract x20, First Aid Kit x10, War God\'s Amulet x6, Demon God\'s Amulet x6, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Area 1: Orc Outpost Wave',
        enemies: ['Orc Butlers', 'Orc Bringers', 'Grimwargs', 'General Orcs'],
        tactics: 
          'First, Orc Butlers and Orc Bringers appear, followed by Grimwargs and General Orcs after they are all defeated. At this stage, conserve your items and quickly eliminate them without taking unnecessary damage.',
        keyTips: [
          'Conserve healing items and amulets for deeper areas.',
          'Since you will be waiting for Grimwargs to respawn, depending on your party composition, it may be quicker if two people handle each General while the others take care of the Grimwargs.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Area 2: Catacomb Crypts (Living Armor Duo)',
        enemies: ['Corpse Torturer Frost', 'Wight', 'Skeleton Warrior', 'Skeleton Sorcerer', 'Living Armor (x2)', 'Skull Lord'],
        tactics: 
          'In the next area, Corpse Torturer Frost, Wight, and after defeating them all, Skeleton Warrior, Skeleton Sorcerer, Living Armor, and finally Skull Lord will appear. The two Living Armors are extremely powerful, and poor positioning can easily lead to a party wipe.',
        keyTips: [
          'Objective shortcut: The door will open once you defeat the Living Armor and Skeleton Sorcerer, so you do not need to defeat the Skull Lord.',
          'However, it\'s not a situation where you can just ignore him and fight, so it\'s probably best for someone to engage and distract him occasionally.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Area 3: Shadow Lair',
        enemies: ['Shadow Goblins', 'Shadow Goblin Fighters', 'Shadow Chimeras', 'Shadow Harpies'],
        tactics: 
          'In the third area, Shadow Goblins will appear, followed by Shadow Goblin Fighters, Shadow Chimeras, and then additional Shadow Harpies. This area isn\'t too difficult, but be careful not to get cursed. Dark Mist and Sleep are also dangerous, but you only have 5 First Aid Potions, so be careful.',
        keyTips: [
          'Beware of status hazards: Curse, Dark Mist, and Sleep can quickly drain your limited supplies.',
          'Objective shortcut: You don\'t need to defeat the Shadow Harpies to proceed.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Area 4: Final Boss Arena (Death Knight & Ghost Mail)',
        enemies: ['Death Knight', 'Witch (summons Sludgemen)', 'Ghost Mail', 'Sludgemen'],
        tactics: 
          'In the final area, a Death Knight, a Witch (who summons Sludgemen), and a Ghost Mail appear in place of the Witch. When the Death Knight\'s health decreases, the Witch is replaced by a Ghost Mail. The Sludgemen do not disappear. The level is cleared by defeating the Death Knight and the Ghost Mail, but with the current equipment, brute force is difficult, so it is safer for someone to hold off the Death Knight while systematically defeating the weaker enemies.',
        keyTips: [
          'Baiting Strategy: If you lead the Death Knight to the small rooms on the left or right, you can separate the Ghost Mail that appears in the center in exchange for it.',
          'Focus down the Ghost Mail and minions first while a tank or agile member kites the Death Knight.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Catacombs Clear Run (JP Community Archive)',
        perspective: 'Full Clear Perspective',
        youtubeVideoId: 'JotR8tp9hrw',
        youtubeUrl: 'https://www.youtube.com/watch?v=JotR8tp9hrw&source_ve_path=OTY3MTQ&embeds_referring_euri=https%3A%2F%2Fwww.h1g.jp%2F'
      }
    ]
  },
  {
    id: 'ancient-power',
    name: 'Drown to the Acient Power',
    japaneseName: '古の力に溺れし者 (EM2)',
    badge: 'EXM 2 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 'Lv. 60 (or Lv. 58+ with Zuul armor)',
    timeLimit: '25 minutes',
    minDefense: 'Physical Defense 1400+ / Magic Defense 1400+',
    clearRewards: ['Ancient Festival Crystal x3'],
    orderConditions: 'Completed the Extreme Mission < Invitation to the Catacombs >.',
    preparationNotes: 
      'Equip yourself with a Lv60 weapon and Zuul armor (with a Guardian ability) or armor equivalent to Lv58 or higher. (Minimum defense guideline: Physical Defense 1400+, Magic Defense 1400+). Specialize your skills and abilities for EM. The damage dealt to Mist Drake can vary by several times depending on whether you can exploit its weakness to ice, so an ice-element weapon or enchantment is desirable. For abilities, "Spirit Striker" is good for increasing damage. Opportunity-boosting abilities like "Heavy Attack" are also effective for knocking it down.',
    specialPreparationTips: [
      'The damage dealt to Mist Drake can vary by several times depending on whether you can exploit its weakness to ice, so an ice-element weapon or enchantment is desirable.',
      'For abilities, "Spirit Striker" is good for increasing damage against spirit/mist entities.',
      'Opportunity-boosting abilities like "Heavy Attack" are highly effective for knocking it down and draining the enrage bar.'
    ],
    monstersAppearing: [
      {
        name: 'Chimera (Standard)',
        speciesType: 'Beast',
        weakness: 'Fire',
        coreType: 'Elemental Core (Lion/Goat Head)',
        notes: 'Sever snake tail to stop rear poison breath; climb lion head to expose core and enrage drain.'
      },
      {
        name: 'White Lion King (White Chimera)',
        speciesType: 'Beast',
        weakness: 'Dark',
        coreType: 'Elemental Core',
        notes: 'High resistance to status ailments! Extremely vulnerable to Dark elemental damage.'
      },
      {
        name: 'Shadow Chimera',
        speciesType: 'Cursed',
        weakness: 'Holy / High Chance Attacks',
        coreType: 'None (Immune to Enrage)',
        notes: 'Immune to all debilitations! Those with high-chance attack skills (Warrior, Seeker) should take it on.'
      },
      {
        name: 'Cyclops (x2)',
        speciesType: 'Giant',
        weakness: 'Lightning',
        coreType: 'Elemental Core (Eye / Head)',
        notes: 'Climb the head and hit the single eye. Much squishier than General Orc—take them down first.'
      },
      {
        name: 'General Orc',
        speciesType: 'Ogrekin (Ogre / Demonkin)',
        weakness: 'Lightning / Piercing',
        coreType: 'Chance Core',
        notes: 'Several times tougher than the Cyclops; bait and fight near starting point to avoid chaotic aggro.'
      },
      {
        name: 'Orc Troopers',
        speciesType: 'Ogrekin (Ogre / Demonkin)',
        weakness: 'Lightning / Slashing',
        coreType: 'None',
        notes: 'Appear once one Cyclops is defeated or when General Orc\'s health is reduced.'
      },
      {
        name: 'Geo Golem',
        speciesType: 'Magickal Construct / Golem',
        weakness: 'Strike / Bludgeoning & Fire (Explosive Flames)',
        coreType: 'Chance Core (Body Talismans)',
        notes: 'Resistant to slashing/piercing; Explosive Flames and strike attacks deal massive damage to Geo Golems.'
      },
      {
        name: 'Rock Lizard',
        speciesType: 'Demihuman (Saurian)',
        weakness: 'Slashing / Ice',
        coreType: 'None',
        notes: 'Sever their tails immediately to strip their damage reduction and defense buffs.'
      },
      {
        name: 'Skeleton Mage',
        speciesType: 'Skeleton / Skeletal',
        weakness: 'Holy / Bludgeoning (Strike)',
        coreType: 'Elemental Core',
        notes: 'Vulnerable to Holy burst and blunt strike impacts; eliminate quickly with ranged strikes.'
      },
      {
        name: 'Sludge Men (Mudman)',
        speciesType: 'Formless / Soft',
        weakness: 'Fire / Ice / Elemental Magick',
        coreType: 'None',
        notes: 'Appear around the center of the map; ignore them by fighting near the starting perimeter.'
      },
      {
        name: 'Mist Drake (Drawn to Power)',
        speciesType: 'Dragonkin (Spirit variant)',
        weakness: 'Ice (Zero damage from Explosive Flames)',
        coreType: 'Heart Core on Chest',
        notes: 'Explosive flames do NO damage to Mist Drakes! Must exploit Ice weakness. Use Spirit Striker & Heavy Attack.'
      },
      {
        name: 'Empress Ghosts (x3)',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick / Chance Attacks',
        coreType: 'Chance Core',
        notes: 'Appear on north side of map when Mist Drake HP decreases. Defeating all Empress Ghosts completes the stage!'
      }
    ],
    vocationAdvice: {
      seeker: {
        coreSkill: 'Ice-element weapons & Whirlwind Blades',
        notes: 'Explosive flames do no damage to Mist Drakes, so prepare ice-element weapons and whirlwind blades. However, Explosive flames are effective against Geo Golems, so bringing both will make the battle easier.'
      }
    },
    suppliedItemsText: 'Healing Potion x10, Concentrated Garlic Extract x10, First Aid Kit x5, War God\'s Amulet x3, Demon God\'s Amulet x3, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Battle 1: Chimera Trio (Edge Lure Tactics)',
        enemies: ['Chimera', 'White Lion King (White Chimera)', 'Shadow Chimera'],
        tactics: 
          'Initially, a Chimera, a White Lion King, and a Shadow Chimera will appear simultaneously. Those with high-chance attack skills should take on the Shadow Chimera (Warrior, Seeker, etc.). Approaching from the edge will allow you to lure only the Shadow Chimera. The remaining White Chimera and Chimera can be lured one at a time during the night. This White Chimera has high resistance to status ailments.',
        keyTips: [
          'Edge Lure: Approach along the outer perimeter to pull only the Shadow Chimera first.',
          'High Chance Attackers (Warrior, Seeker) should focus down the Shadow Chimera.',
          'Nighttime Mechanic: White Chimera and standard Chimera can be pulled one at a time at night. White Chimera heavily resists debilitations—use Dark damage.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Battle 2: Cyclops Duo & General Orc',
        enemies: ['Cyclops (x2)', 'General Orc', 'Orc Troopers'],
        tactics: 
          'In the second battle, you\'ll encounter two Cyclops, a General Orc, and several additional Orc Troopers. Orc Troopers will appear once you defeat one Cyclops or when the General Orc\'s health is reduced. The General Orc is several times tougher than the Cyclops, so it\'s easier to take down the Cyclops first. Approach from the edge and lure one Cyclops, fighting it near the starting point. When it\'s down, lure the General and the other Cyclops to avoid a chaotic battle. (If you\'re slow at luring, all of them will react.) Then, defeat the remaining Orc Troopers.',
        keyTips: [
          'The General Orc is far tougher than the Cyclops; prioritize burning down the Cyclops first.',
          'Fight near the starting entrance so other enemies do not aggro at once.',
          'If you take too long to pull, all enemies will aggro simultaneously.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Battle 3: Geo Golem & Minions',
        enemies: ['Geo Golem', 'Rock Lizard', 'Skeleton Mage', 'Sludge Men'],
        tactics: 
          'In the third battle, Geo Golem, Rock Lizard, Skeleton Mage, and several Sludge Men will appear. When the Geo Golem\'s health decreases, the initial weaker enemies will be replaced by Sludge Men. Quickly defeat the weaker enemies before attacking the Geo Golem. The Sludge Men appear around the center of the map, so you can ignore them if you fight near the starting point; you don\'t need to defeat them. If it\'s nighttime, you can lure only the Geo Golem and completely ignore the weaker enemies.',
        keyTips: [
          'Quickly eliminate the initial weaker enemies before committing damage to the Geo Golem.',
          'Explosive Flames are very effective at breaking Geo Golem talismans.',
          'Sludge Men spawn around the center; keep the fight pinned near the entrance perimeter to ignore them completely.',
          'Nighttime Mechanic: At night, you can pull only the Geo Golem and skip all other enemies!'
        ]
      },
      {
        areaNumber: 4,
        title: 'Final Battle: Mist Drake & Empress Ghosts',
        enemies: ['Mist Drake (Drawn to Power)', 'Empress Ghosts (x3)'],
        tactics: 
          'The final boss is a Mist Drake, drawn to power, and three Empress Ghosts appear in addition. The Empress Ghosts appear when the Mist Drake\'s health decreases, but they appear on the north side of the map, so you can separate them by fighting near the starting point. Defeating all the Empress Ghosts completes the stage.',
        keyTips: [
          'Zero Damage Warning: Explosive flames deal zero damage to Mist Drake! Use Ice element weapons and Whirlwind Blades.',
          'Equip Spirit Striker and Heavy Attack to boost down rate and enrage depletion.',
          'Separation Strategy: Keep Mist Drake engaged near the southern starting point; when Empress Ghosts spawn in the north, defeat all three to trigger mission completion!'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Mist Drake & Empress Ghosts Clear Run',
        perspective: 'Full Clear Perspective',
        youtubeVideoId: 'xp29WPHU9YU',
        youtubeUrl: 'https://www.youtube.com/watch?v=xp29WPHU9YU&source_ve_path=OTY3MTQ&embeds_referring_euri=https%3A%2F%2Fwww.h1g.jp%2F'
      }
    ]
  },
  {
    id: 'gift-ancient-capital',
    name: 'A gift from the ancient capital',
    japaneseName: 'いにしえの都よりの宝 (EM3)',
    badge: 'EXM 3 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 'Lv. 60 (or Lv. 58+ with Zul armor)',
    timeLimit: '25 minutes',
    minDefense: 'Physical Defense 1400+ / Magic Defense 1400+',
    clearRewards: ['Aoba\'s Rare Crystal x3'],
    orderConditions: 'Completed the Extreme Mission < Those Enticed by Ancient Powers >.',
    partyRecommendation: 'Based on the enemy lineup, an ideal team composition is Sorcerer, Priest or Elemental Archer, Shield Sage, and one other Red Mage (DPS).',
    preparationNotes: 
      'For equipment, make sure your weapon is a Lv60 weapon and your armor is either Zul armor (with a protection-type ability required) or equivalent to Lv58 or higher. (Minimum defense guideline: physical defense 1400 or higher, magic defense 1400 or higher). Specialize your skills and abilities for EM. Based on the enemy lineup, a good team would seem to be Sorcerer, Priest or Elemental Archer, Sage, and one other Red Mage.',
    specialPreparationTips: [
      'Weapon & Armor: Equip a Lv60 weapon and Zul armor (with Guardian/Protection-type ability required) or equivalent Lv58+ gear.',
      'Defensive Benchmark: Physical Defense 1400+, Magic Defense 1400+.',
      'Team Synergy: Having a Sorcerer is extremely powerful in EM3. Having two Sorcerers allows you to simply overpower and blitz the enemies.'
    ],
    monstersAppearing: [
      {
        name: '1st Guard Silver Roar',
        speciesType: 'Ogrekin (Ogre / Demonkin)',
        weakness: 'Fire / Ice / Rain (Sorcerer)',
        coreType: 'Chance Core',
        notes: 'Chaotic ape beast with heavy rolling charges. Sorcerer\'s Rain spell inflicts continuous stagger and damage.'
      },
      {
        name: '1st Guard Ghouls (x2)',
        speciesType: 'Ogrekin (Ogre / Demonkin / Undead)',
        weakness: 'Holy / Fire / Sleep Debilitation',
        coreType: 'Chance Core',
        notes: 'Violent rush attacks. Shield Sage should run to the back right, taunt both ghouls, and put them to sleep.'
      },
      {
        name: '1st & 2nd Guard Orc Bringer',
        speciesType: 'Ogrekin (Ogre / Demonkin)',
        weakness: 'Lightning / Piercing / Briarro (Sorcerer)',
        coreType: 'Chance Core',
        notes: 'High threat bipedal orc commanders. Prioritize and eliminate first in both waves before larger foes.'
      },
      {
        name: '2nd Guard Nightmare',
        speciesType: 'Winged',
        weakness: 'Fire (Ignites wings) / Dark',
        coreType: 'Elemental Core',
        notes: 'Flying harpy variant with hypnotic sleep song. Burn wings with fire to ground it; or sleep Ents and burn Nightmare.'
      },
      {
        name: '2nd Guard Ents',
        speciesType: 'Giant',
        weakness: 'Fire / Meteor (Sorcerer)',
        coreType: 'Elemental Core (at knees)',
        notes: 'Massive woodland giant with cores at knees. Shield Sage can put them to sleep, or Sorcerer obliterate with Meteor.'
      },
      {
        name: 'Maltrolls',
        speciesType: 'Giant',
        weakness: 'Lightning / Fire / Strike',
        coreType: 'Elemental Core',
        notes: 'Multiple club-swinging brutes appearing simultaneously. Strike/bludgeoning and elemental burst stagger them fast.'
      },
      {
        name: 'Madmen (Sludge Men)',
        speciesType: 'Formless / Soft',
        weakness: 'Fire / Ice / Briarro (Sorcerer)',
        coreType: 'None',
        notes: 'Gelatinous soft minions. Sorcerer\'s Briarro wipes them out instantly in wide sweeps.'
      },
      {
        name: 'Solitary Beast Mistwyrm',
        speciesType: 'Dragonkin (Spirit / Mist variant)',
        weakness: 'Lightning / Rain (Sorcerer)',
        coreType: 'Heart Core on Chest',
        notes: 'Blazing rays are INEFFECTIVE! Prepare lightning-element weapons, Whirlwind Blades, and Sorcerer\'s Rain. Lure alone!'
      },
      {
        name: 'Vengeful Warrior Mogock',
        speciesType: 'Ogrekin (Ogre / Warlord)',
        weakness: 'Lightning / Meteor (Sorcerer)',
        coreType: 'Chance Core',
        notes: 'Brutal orc warlord boss. Do not rush in initially! Sleep or kite at distance while party defeats Mistwyrm and Grimwargs.'
      },
      {
        name: 'Grimwargs',
        speciesType: 'Beast',
        weakness: 'Fire / Slashing',
        coreType: 'None',
        notes: 'Fast canine reinforcements. Eliminate after Mistwyrm is down before committing full DPS to Mogock.'
      }
    ],
    vocationAdvice: {
      seeker: {
        coreSkill: 'Lightning-element weapons & Whirlwind Blades',
        notes: 'Blazing rays are ineffective against Mistwyrm; prepare lightning-element weapons and whirlwind blades instead.'
      },
      sorcerer: {
        spells: ['Meteor', 'Rain', 'Briarro'],
        notes: 'Sorcerer is very useful in EM3. Having Meteor, Rain, and Briarro is helpful. If you have two or more Sorcerers, it\'s much faster to just overwhelm them than to try to scare them. If you have a Sage, it\'s better to take them out one by one carefully.',
        targets: [
          { spell: 'Briarro', target: 'Wipe out Orcs and Madmen' },
          { spell: 'Meteor', target: 'Devastate Ents and Mogocks' },
          { spell: 'Rain', target: 'Stagger and damage Roars and Mistwyrms' }
        ]
      },
      shieldSage: {
        notes: 'Essential for crowd control! In Battle 1, move back right from entrance, draw both Ghouls, and sleep them. In Battle 2, put Ents to sleep so party can burst Nightmare. In the boss arena, keep Mogock slept at distance.'
      }
    },
    suppliedItemsText: 'Healing Potion x10, Concentrated Garlic Extract x10, Universal Remedy x5, War God\'s Amulet x3, Demon God\'s Amulet x3, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Battle 1: Silver Roar, Ghouls & Orc Bringer',
        enemies: ['1st Guard Silver Roar', '1st Guard Ghouls (x2)', '1st Guard Orc Bringer'],
        tactics: 
          'First, the 1st Guard Silver Roar, 2 1st Guard Ghouls, and 1st Guard Orc Bringer will appear simultaneously. Defeat the orcs first, then take down the ghouls and Roar in order. If you\'re a Shield Sage, move to the back right from the entrance, draw the aggro of the two ghouls, and put them to sleep. This time, you need to eliminate all enemies in all areas.',
        keyTips: [
          'Target priority: Orc Bringer ⇒ Ghouls ⇒ Silver Roar.',
          'Shield Sage tactic: Run back-right from entrance, draw the 2 Ghouls, and cast Sleep.',
          'Elimination Requirement: All enemies in all areas must be eliminated to proceed.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Battle 2: Nightmare, Ents & Orc Bringer',
        enemies: ['2nd Guard Nightmare', '2nd Guard Ents', '2nd Guard Orcbringer'],
        tactics: 
          'In the second battle, the 2nd Guard Nightmare, 2nd Guard Ents, and 2nd Guard Orcbringer appear simultaneously. Defeat them in the order of Orc ⇒ Ent ⇒ Nightmare. If you have a Shield Sage, you can also try putting the Ents to sleep first and then defeating the Nightmare first.',
        keyTips: [
          'Target priority: Orc Bringer ⇒ Ent ⇒ Nightmare.',
          'Shield Sage alternative: Put the Ents to sleep first, then focus burst damage on the Nightmare.',
          'Sorcerer Meteor: Cast Meteor onto Ents to rapidly shatter their knee cores.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Battle 3: Maltrolls & Madmen Swarm',
        enemies: ['Multiple Maltrolls', 'Multiple Madmen'],
        tactics: 
          'In the third battle, multiple Maltrolls and Madmen appear simultaneously. Sorcerers should cast Briarro to sweep and wipe out the Madmen, while the melee and tank focus on knocking down the Maltrolls with blunt strike attacks.',
        keyTips: [
          'Use Sorcerer\'s Briarro to immediately clean up the Madmen swarms.',
          'Focus strike/impact and lightning damage onto the Maltrolls to stagger them.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Final Battle: Mistwyrm, Mogock & Grimwargs',
        enemies: ['Solitary Beast Mistwyrm', 'Vengeful Warrior Mogock', 'Grimwargs'],
        tactics: 
          'The final boss is the solitary beast Mistwyrm, the vengeful warrior Mogock, and several additional Grimwargs. The general strategy is to defeat them in the order of Mistwyrm ⇒ Grimwargs ⇒ Mogock. It\'s easier to avoid rushing in at the beginning and instead lure only the Mistwyrm and fight it from a distance. If someone gets too close to a Mogock, one person should either deal with it or put it to sleep at a distance. After defeating the Mistwyrm, eliminate the Grimwargs and then focus your attacks on the Mogock.',
        keyTips: [
          'Opening Lure: Avoid rushing in at the start! Lure only the Mistwyrm and fight it at a distance.',
          'Target priority: Mistwyrm ⇒ Grimwargs ⇒ Mogock.',
          'Mogock crowd control: If anyone draws Mogock\'s aggro, one person should isolate it or sleep it at a distance.',
          'Vocation Roles: Sorcerers cast Rain on Mistwyrm and Meteor on Mogock. Seekers use lightning weapons & Whirlwind Blades (Blazing Rays do 0 damage!).'
        ]
      }
    ],
    referenceVideos: [
      {
        title: "Sorcerer's Perspective Clear Guide",
        perspective: "Sorcerer's perspective",
        youtubeVideoId: 'JEitPyjr4ZE',
        youtubeUrl: 'https://www.youtube.com/watch?v=JEitPyjr4ZE'
      },
      {
        title: "Sage's Perspective Clear Guide",
        perspective: "Sage's perspective",
        youtubeVideoId: 'S7ojhxDbxZY',
        youtubeUrl: 'https://www.youtube.com/watch?v=S7ojhxDbxZY'
      }
    ]
  },
  {
    id: 'shining-gate',
    name: 'Shining Gate',
    japaneseName: '光の前哨 / 輝く門 (EM4)',
    badge: 'EXM 4 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 'Lv. 60 Gear',
    timeLimit: '20 minutes',
    minDefense: 'Level 60 Armor (Dragon Guard & Spirit recommended)',
    clearRewards: ['Golden Crystal x 3'],
    orderConditions: 'Completed the personal quest < Signs of Further Calamity >.',
    partyRecommendation: 
      'Smooth 1-down composition (>10 min remaining): 2 Warriors + Warrior or Seeker/Deer + Elemental Archer with all required abilities. (For green slot, even Priest can achieve 1-down if everyone has Mighty Arm. Core damage: Warrior Hilt > Deer Jaw > Fighter Slash/Blade Fang).',
    preparationNotes: 
      'For equipment, we recommend using weapons and armor equivalent to level 60 gear. Specialize your skills and abilities for EM. *Holy Cleric weapons are recommended for countering Gorgoran. Elfin or golden weapons are the best. As long as you have sufficient attack power and Holy attribute, it\'s OK. Everyone should have Dragon Slayer, Dragon Guard, Heavy Step, and Holy Attack. Attackers should have Fighting Spirit (physical) / Composure (magic), and if you\'re not confident in your armor or skills, add Spirit or Self-Healing. (With level 60 armor + Dragon Guard and Spirit, you\'ll almost never die instantly.) If any of your party members lack these, your win rate will drop drastically.',
    specialPreparationTips: [
      'Gorgoran frequently generates wind pressure from flapping its wings, so the Heavy Step ability is essential, especially when fighting it with pawns. (Pointed Step is also desirable if possible.) Without it, pawns and players will be constantly flinched and practically useless.',
      'Holy Cleric weapons are recommended for countering Gorgoran. Elfin or golden weapons are the best. As long as you have sufficient attack power and Holy attribute, it\'s OK.',
      'Mandatory Abilities: Everyone should equip Dragon Slayer, Dragon Guard, Heavy Step, and Holy Attack.',
      'Attackers: Equip Fighting Spirit (Physical) or Composure (Magick). If not confident in armor, add Spirit or Self-Healing.'
    ],
    monstersAppearing: [
      {
        name: 'Melgan Elemental',
        speciesType: 'Magickal Construct / Alchemy',
        weakness: 'Physical / Elemental',
        coreType: 'Elemental Core',
        notes: 'Alchemical elemental minion; eliminate quickly in the opening wave.'
      },
      {
        name: 'Melgan Guarder',
        speciesType: 'Demihuman / Alchemy',
        weakness: 'Lightning / Slashing',
        coreType: 'None',
        notes: 'Shielded alchemical soldier defending the entrance corridors. Pierce through blocks.'
      },
      {
        name: 'Skeleton Alchemy',
        speciesType: 'Skeleton / Skeletal',
        weakness: 'Holy / Bludgeoning (Strike)',
        coreType: 'Elemental Core',
        notes: 'Alchemical animated skeleton. Vulnerable to holy burst and strike impacts.'
      },
      {
        name: 'Gigan Machina',
        speciesType: 'Magickal Construct / Alchemy',
        weakness: 'Lightning / Strike / Holy',
        coreType: 'Machina Core',
        notes: 'Only one appears, so you should be able to defeat it easily. Two Gorgoran amulets should be enough—use them to ensure you defeat it in one hit. Sage can freeze/delay.'
      },
      {
        name: 'Sealed Red Dragon (Drake)',
        speciesType: 'Dragonkin',
        weakness: 'Ice / Holy',
        coreType: 'Heart Core on Chest',
        notes: 'Appears at top of spiral stairs. At night, only lure the Drake in front so you take them down one by one. Vulnerable to sleep.'
      },
      {
        name: 'Sealed Azure Dragon (Wyrm)',
        speciesType: 'Dragonkin',
        weakness: 'Fire / Holy',
        coreType: 'Heart Core on Chest',
        notes: 'During the day, reacts at the same time as Drake. Someone should target the Drake or put it to sleep, and take down Wyrm first as its magic is troublesome.'
      },
      {
        name: 'Golden Dragon Gorgoran',
        speciesType: 'Dragonkin (Golden Dragon)',
        weakness: 'Holy / Strike & Ice (Freeze) / Delay',
        coreType: 'Golden Secret Core',
        notes: 'Final boss! Flaps wings for violent wind pressure (Heavy Step is essential). Freeze and Delay make the fight smoother. Beware of lethal golden transformation attacks.'
      }
    ],
    vocationAdvice: {
      seeker: {
        coreSkill: 'Heavy Step + Explosive Line + Flame Cloak',
        notes: 'If you\'re using Heavy Step Explosive Line + Flame Cloak, you don\'t need Attack Holy. If you have the ability to jump, you can reach the secret core faster than running and deplete its stamina.'
      },
      warrior: {
        notes: 'In terms of core damage, Warrior\'s "Hilt" > Deer\'s "Jaw" are overwhelmingly more effective. Having 2 Warriors with optimal abilities allows smooth one-down boss clears with over 10 minutes to spare.'
      },
      fighter: {
        notes: 'For Fighters, "Slash" or "Blade Fang" are effective for core depletion and damage.'
      },
      shieldSage: {
        notes: 'With some effort, it is possible to inflict 2-3 freezes and 2 delays on your own. Its role is to induce breaths or debuffs. Practically useless as a core damage dealer, so it must contribute with breath induction and debuffs. Before Gorgoran, very useful for delaying/freezing Machina, and putting Wyrm/Drake to sleep.'
      },
      elementalArcher: {
        notes: 'Core extraction is easier because it can reach from a distance. If Weakening Magic Bow hits, it has high core-destroying ability. Aim for freezing with Chain Magic Bullet.'
      }
    },
    soloStrategy: {
      goldResistanceNotes: 
        'Achieve 100% resistance to golden transformation. Equipping armor with gold-resistant crests and achieving 100% gold-resistant armor will grant complete resistance and prevent transformation into gold. If both the Arisen and their Pawn have 100% gold resistance, the difficulty of the final battle against Gorgoran will dramatically decrease. This is a last resort. The problem is that gold-resistant crests are rare. It\'s difficult to find, but you could also try to find a rental Pawn with 100% gold resistance.',
      greenPawnsAnalysis: [
        {
          job: 'Priest',
          badge: 'Beginner Recommended',
          description: 'To extract the core, you or an ally needs to get close to it. Seraphim Flap is strong as it also chips away at the core. For beginners playing solo, Priest is slightly recommended.',
          recommendedFor: 'Reliable core chipping & high sustain healing'
        },
        {
          job: 'Elemental Archer',
          badge: 'Ranged Utility',
          description: 'Core extraction is easier because it can reach from a distance. If the Weakening Magic Bow hits, it has high core-destroying ability. Depending on the equipped abilities, you can also aim for freezing with Chain Magic Bullet.',
          recommendedFor: 'Distance core extraction & Freeze debuffs'
        },
        {
          job: 'Spirit Lancer',
          badge: 'Most Reliable Self-Extraction',
          description: 'If you receive the Wall Grasta buff, the Arisen can extract the core on their own. In a sense, it\'s the most reliable.',
          recommendedFor: 'Wall Grasta enabling Arisen self-core extraction'
        }
      ],
      keyTakeaways: [
        'If you are not a green pawn yourself, one green job pawn is essential. With sufficient firepower, having two or more green pawns makes core extraction much easier.',
        'Create an environment where pawns can function effectively, such as by using Heavy Step abilities so they are not flinched by wing wind pressure.',
        'Equip counters against Gorgoran\'s Holy Core depletion to break stamina during enrage.'
      ]
    },
    suppliedItemsText: 'Healing Potion x10, Concentrated Gala Extract x10, Universal Remedy x5, Aqua Regia Sorbet x3, War God\'s Amulet x5, Demon God\'s Amulet x5, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Area 1: Melgan Elemental, Guarder & Skeleton Alchemy',
        enemies: ['Melgan Elemental', 'Melgan Guarder', 'Skeleton Alchemy'],
        tactics: 
          'Initially, Melgan Elemental, Melgan Guarder, and Skeleton Alchemy will appear simultaneously. Clear out the minions quickly with lightning, holy, and blunt strike attacks to open the pathway forward.',
        keyTips: [
          'Group them up and eliminate the elemental minions quickly.',
          'Conserve your high-tier amulets and Aqua Regia Sorbet for later bosses.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Area 2: Gigan Machina Encounter',
        enemies: ['Gigan Machina'],
        tactics: 
          'Further ahead, Gigan Machina will appear. There\'s only one, so you should be able to defeat it easily. Two Gorgoran amulets should be enough, so use them to ensure you defeat it in one hit. Shield Sages can apply freeze and delay to immobilize it.',
        keyTips: [
          'Pop two amulets to ensure an instant one-phase kill.',
          'Shield Sage can delay and freeze Machina to prevent any spinning rocket attacks.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Area 3: Spiral Staircase — Sealed Red Dragon & Azure Dragon',
        enemies: ['Sealed Red Dragon (Drake)', 'Sealed Azure Dragon (Wyrm)'],
        tactics: 
          'At the top of the spiral staircase, the Sealed Red Dragon and Sealed Azure Dragon appear simultaneously. At night, you can only lure the Drake in front of you, so take them down one by one. During the day, the Wyrm will also react at the same time as the Drake, making it impossible to separate them. Someone should target the Drake or put it to sleep, and take down the Wyrm first, as its magic is troublesome.',
        keyTips: [
          'Nighttime Mechanic: Enter at night to lure only the front Drake and fight the dragons one by one.',
          'Daytime Strategy: If fighting during the day, put the Drake to sleep and rush down the Wyrm first to prevent high-tier spell casts.',
          'Drake is weak to Ice; Wyrm is weak to Fire. Both have Holy vulnerability.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Area 4: Final Boss — Golden Dragon Gorgoran',
        enemies: ['Golden Dragon Gorgoran'],
        tactics: 
          'The final boss is the golden dragon Gorgoran. It\'s basically the same as in the GM version. Using delay and freeze will make it easier, but you\'ll need to work hard to land either delay or freeze. Burn and poison can also land, but the effect duration is short and the damage is minimal, so don\'t rely on them.',
        keyTips: [
          'Heavy Step is non-negotiable to prevent wing wind flinching.',
          'Land Freeze (Chain Magic Bullet / Ice spells) and Delay to extend down windows.',
          'Focus Holy core depletion (Warrior Hilt / Seeker Jaw / Fighter Slash) to knock down Gorgoran for massive damage.',
          'Watch for the golden transformation roar and maintain distance or 100% gold resistance.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: "Elemental Archer's Perspective Clear Run",
        perspective: "Elemental Archer's perspective",
        youtubeVideoId: 'yKjNxhqbpI4',
        youtubeUrl: 'https://www.youtube.com/watch?v=yKjNxhqbpI4'
      },
      {
        title: "Warrior's Perspective Clear Run",
        perspective: "Warrior perspective",
        youtubeVideoId: 'zRdW5FP6yy0',
        youtubeUrl: 'https://www.youtube.com/watch?v=zRdW5FP6yy0'
      }
    ]
  },
  {
    id: 'together-with-the-warriors',
    name: 'Together with the warriors',
    japaneseName: '戦士達と共に (EXM)',
    badge: 'EXM 5 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 70,
    timeLimit: '30 minutes',
    minDefense: 'Physical Defense 1850+ / Magic Defense 1850+',
    clearRewards: ['The Book of Mastery [Friendship and Healing]'],
    orderConditions: 'Reach Lv. 70 or higher. Accept from the Extreme Mission Officer in the White Dragon Temple.',
    preparationNotes: 
      'Since there\'s no way to recover stamina, you\'ll need to include a Priest or Elemental Archer, or use abilities or appraised jewelry to manage stamina.',
    specialPreparationTips: [
      'Stamina Recovery: Normal item stamina recovery is unavailable. You MUST bring a Priest or Elemental Archer, or rely on stamina-saving abilities and BBM appraised jewelry.',
      'Mixed Offense: Certain enemies have extreme physical resistance (Empress Ghost) or heavy golem plating (Geo Golem). A balanced mixed party is essential.',
      'Battle 2 Petrification: Medusa appears in Battle 2; watch out for her petrifying gaze and prepare curatives or Anti-Stone crests.',
      'Battle 3 Shortcut: In the third battle with the Geo Golem, all additional reinforcements (Griffin, Dangerous, Plants) can be safely ignored to rush the golem down.',
      'Battle 4 Target Order: In Game 4, eliminate Pawn Mage & Elemental in Wave 1, and instantly focus down Pawn Healer upon Wave 2 spawn!'
    ],
    partyRecommendation: 'Any job is fine, but since there are enemies with extremely high physical or magical resistance, a mixed physical/magical party is recommended.',
    monstersAppearing: [
      {
        name: 'Wight (Lv70)',
        speciesType: 'Skeleton / Spirit',
        weakness: 'Holy / Fire',
        coreType: 'Elemental Core',
        notes: 'Floats out of melee range and casts high-tier dark magick. Use Holy ranged attacks, aerial skills, or spells.'
      },
      {
        name: 'Witch (Lv70)',
        speciesType: 'Spirit / Demihuman',
        weakness: 'Holy / Physical',
        coreType: 'Chance Core',
        notes: 'Floats and casts disruptive status magic while summoning minions. Burn down quickly with burst damage.'
      },
      {
        name: 'Empress Ghost (Lv70)',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick',
        coreType: 'Chance Core',
        notes: 'Has extremely high physical resistance. Physical attacks deal minimal damage; rely on Holy elemental magick or magic-imbued attacks.'
      },
      {
        name: 'Eliminator (Lv70)',
        speciesType: 'Giant / Beast',
        weakness: 'Lightning / Holy',
        coreType: 'Elemental Core',
        notes: 'Two appear simultaneously in Battle 2. Heavy charging axe slams and pin-downs deal devastating burst damage.'
      },
      {
        name: 'Ghost (Lv70)',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick',
        coreType: 'Chance Core',
        notes: 'Phantom adds in Battle 2; disperse with Holy spells or area attacks.'
      },
      {
        name: 'Madman (Lv70)',
        speciesType: 'Undead / Cursed',
        weakness: 'Holy / Fire',
        coreType: 'None',
        notes: 'Swarm reinforcements in Battle 2. Group them and sweep them away before they interrupt casters.'
      },
      {
        name: 'Medusa (Lv70)',
        speciesType: 'Beast / Cursed',
        weakness: 'Lightning / Fire',
        coreType: 'Elemental Core',
        notes: 'Additional boss in Battle 2 with lethal petrification gaze. Avert eyes or cure petrification immediately with Priest curatives.'
      },
      {
        name: 'Geo Golem (Lv70)',
        speciesType: 'Construct / Golem',
        weakness: 'Strike / Blunt Impact',
        coreType: 'Medallion Seals',
        notes: 'The sole mandatory objective in Third Battle. Immune to normal body damage; smash the glowing medallion seals using strike/blunt attacks.'
      },
      {
        name: 'Corrupting Griffin (Lv70)',
        speciesType: 'Winged / Corrupted',
        weakness: 'Fire',
        coreType: 'Elemental Core',
        notes: 'Third Battle additional spawn. Can be completely IGNORED—focus all damage on the Geo Golem.'
      },
      {
        name: 'Dangerous (Lv70)',
        speciesType: 'Cursed / Beast',
        weakness: 'Holy / Fire',
        coreType: 'Elemental Core',
        notes: 'Third Battle additional spawn. Can be completely IGNORED—rush down the Geo Golem.'
      },
      {
        name: 'Corrupted Plant (Lv70) x4',
        speciesType: 'Plant / Corrupted',
        weakness: 'Fire',
        coreType: 'None',
        notes: 'Third Battle adds. Can be completely IGNORED—do not waste stamina fighting them.'
      },
      {
        name: 'Rogue Pawn Squad (Lv70)',
        speciesType: 'Humanoid Pawns',
        weakness: 'Variable / Status Stagger',
        coreType: 'Chance Core',
        notes: 'Game 4 multi-pawn trial. Wave 1: Seeker, Warrior, Mage, Elemental. Wave 2: Fighter, Hunter, Healer, Guardian. Eliminate Healer & Mage with highest priority.'
      }
    ],
    vocationAdvice: {
      priest: {
        notes: 'Essential for stamina management. Because there is no way to recover stamina through items, your stamina buff auras and curative support are mandatory. Keep Holy enchantments active against ghosts/undead and immediately cleanse petrification when Medusa appears.'
      },
      elementalArcher: {
        notes: 'Outstanding stamina and healing provider. Sustains the party\'s stamina pool from long range, reveals elemental cores, and can freeze or shock Eliminators and Medusa with Chain Magic Bullet.'
      },
      sorcerer: {
        spells: ['Briarro', 'Rockfall', 'Holy Spells', 'Giga Friez'],
        notes: 'Essential for overcoming enemies with extreme physical defense like Empress Ghost and Wight. In Game 4, unleash high-tier area spells to wipe out enemy Pawn Mage and Pawn Elemental.',
        targets: [
          { spell: 'Holy Magick', target: 'Empress Ghost & Wight (bypasses physical resistance)' },
          { spell: 'Lightning / Freeze', target: 'Eliminators & Medusa' },
          { spell: 'Burst AoE', target: 'Rogue Pawn Squad (Game 4)' }
        ]
      },
      fighter: {
        abilities: ['Strength', 'Spirit', 'Activation', 'Endurance'],
        notes: 'Provides frontline tanking and disruption against Eliminators and enemy pawns. Because stamina cannot be recovered with items, manage stamina consumption carefully with abilities and BBM jewelry.'
      },
      seeker: {
        coreSkill: 'Falcon Drop',
        notes: 'Use high mobility and Falcon Drop stagger to ground flying Wights, interrupt Medusa\'s petrification gaze, and lock down enemy Pawn Healer and Mage in Game 4.',
        combos: 'Rope zip directly into enemy backline casters to prevent spellcasts without taking ground hazard damage.'
      },
      warrior: {
        notes: 'The premier damage dealer against the Geo Golem in Third Battle. Blunt/strike greatsword attacks crack the golem\'s glowing medallions in record time.'
      }
    },
    suppliedItemsText: 'Strictly limited EXM supply rations. Consumable stamina recovery items are NOT available; stamina sustain must come from Priest/Elemental Archer or abilities/jewelry.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Match 1: Spectral Trio',
        enemies: ['Wight (Lv70)', 'Witch (Lv70)', 'Empress Ghost (Lv70)'],
        tactics: 
          'Wight (Lv70), Witch (Lv70), and Empress Ghost (Lv70) appear together. Empress Ghost and Wight have extremely high physical resistance, making magical attacks and Holy damage essential. Eliminate the Witch quickly to stop spell disruption, while using ranged magic or aerial skills to bring down the floating Wight and Empress Ghost.',
        keyTips: [
          'Empress Ghost has extreme physical defense; rely on Holy spells or magic-imbued attacks.',
          'Take out the Witch first to shut down minion summons and crowd control.',
          'Bring down the floating Wight with aerial strikes or ranged Holy shots.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Battle 2: Eliminators & Chaos Wave',
        enemies: ['Eliminator (Lv70) x2', 'Ghost (Lv70) x2', 'Madman (Lv70) x4', 'Medusa (Lv70)', 'Madman (Lv70) reinforcements'],
        tactics: 
          'Battle 2 begins with Eliminator (Lv70) x2. Reinforcements will quickly arrive: Ghost (Lv70) x2 and Madman (Lv70) x4, followed by Medusa (Lv70) and additional Madman reinforcements. Beware of the Eliminators\' devastating charge tackles and overhead hammer slams. Watch for Medusa\'s petrifying gaze—turn away when she charges her eyes or cleanse petrification immediately with Priest curatives. Priests and Elemental Archers must keep party stamina sustained.',
        keyTips: [
          'Eliminators deal lethal burst damage; use shock, freeze, or slow to control them.',
          'Medusa Petrification Gaze: avert your camera or use Priest cleanse / anti-petrification items immediately.',
          'Sweep the Madman and Ghost adds with wide AoE attacks so they do not interrupt spellcasters.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Third Battle: Geo Golem (Ignore Adds)',
        enemies: ['Geo Golem (Lv70)', 'Corrupting Griffin (Lv70) [Ignore]', 'Dangerous (Lv70) [Ignore]', 'Corrupted Plant (Lv70) x4 [Ignore]'],
        tactics: 
          'The primary victory objective is defeating the Geo Golem (Lv70). Additional enemies will spawn: a Corrupting Griffin, Dangerous, and Corrupted Plant x4. These additions can be safely IGNORED! Do not waste time, stamina, or cooldowns fighting the extra monsters. Focus 100% of the party\'s attacks on shattering the glowing rune medallions on the Geo Golem\'s body. Physical blunt/strike impact cracks the medallions rapidly.',
        keyTips: [
          'CAN BE IGNORED: Corrupting Griffin, Dangerous, and Corrupted Plant x4 can all be ignored to finish the battle fast.',
          'Focus purely on the glowing medallion weak points on the Geo Golem.',
          'Strike/blunt damage (Warriors, blunt skills) shatters golem medallions far faster than slashing.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Game 4: The Rogue Pawn Squads (Wave 1 & Wave 2)',
        enemies: [
          'Pawn Seeker (Lv70)', 'Pawn Warrior (Lv70)', 'Pawn Mage (Lv70)', 'Pawn Elemental (Lv70)',
          'Pawn Fighter (Lv70)', 'Pawn Hunter (Lv70)', 'Pawn Healer (Lv70)', 'Pawn Guardian (Lv70)'
        ],
        tactics: 
          'A climactic gauntlet against rogue Pawn squads. Wave 1 deploys Pawn Seeker, Pawn Warrior, Pawn Mage, and Pawn Elemental. Focus down Pawn Mage and Pawn Elemental first to prevent continuous area magic bombardment. Once the first wave is defeated, Wave 2 enters: Pawn Fighter, Pawn Hunter, Pawn Healer, and Pawn Guardian. Crucial: eliminate the Pawn Healer immediately to halt their team-wide healing, then finish the remaining pawns.',
        keyTips: [
          'Wave 1: Focus fire on Pawn Mage and Pawn Elemental first to eliminate dangerous spells.',
          'Wave 2: Pawn Healer MUST be eliminated first! Otherwise, they will heal the party back to full.',
          'Watch for Pawn Guardian\'s shield taunts and Pawn Hunter\'s pin-point arrow snipes.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Together with the warriors (戦士達と共に) Clear Walkthrough',
        perspective: 'Mixed Party Perspective',
        youtubeVideoId: 'EICFTJA7H_4',
        youtubeUrl: 'https://www.youtube.com/watch?v=EICFTJA7H_4'
      }
    ]
  },
  {
    id: 'distortion-enforcer',
    name: 'The Distortion Enforcer',
    japaneseName: '歪みの執行人 (EXM)',
    badge: 'EXM 6 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 75,
    itemRankRequirement: 'Item rank 22 or higher',
    timeLimit: '20 minutes',
    minDefense: 'Physical Defense 1700+ / Magic Defense 1700+',
    clearRewards: ['Starry Rain Crystal x1'],
    additionalHelpingRewards: ['Erosion treatment x 5'],
    orderConditions: 'Completed the personal quest < Footsteps of Evil >. Item rank 22 or higher.',
    preparationNotes: 
      'I think everyone meets the equipment requirements due to the item rank restrictions. Let\'s try to upgrade our gear as much as possible before challenging the boss.\n\nSince Scourge is weak to ice, it\'s a good idea to prepare ice crests, ice attacks, and ice assaults.\n\nBesides offensive abilities, knockback abilities like "Full Power" > "Strength" > "Invigoration" are also important. (It\'s also a good idea to include blue and green knockback abilities.)\n\nEven with a defense of 1700 or more, you\'ll still take a fair amount of damage, and since many parties are expected to lack green-type healing items, self-healing abilities and self-healing jewelry are also effective.\n\nFreeze, petrify, turn to gold, and delay are effective against Scourge.\n\nSince items are limited, helping each other with the corruption will be more efficient overall than usual. Let\'s help each other as much as possible, except for those who are completely useless in battle.',
    specialPreparationTips: [
      'Ice Element Weakness: Scourge is weak to ice. Prepare ice crests, ice attacks, and ice assaults.',
      'Knockback Power: Knockback abilities like "Full Power" > "Strength" > "Invigoration" are vital. (Include blue and green knockback abilities.)',
      'Defensive & Self-Healing: Even with 1700+ defense, you will take high damage. Since green healing items are lacking, self-healing abilities and jewelry are effective.',
      'Status Ailments: Freeze, petrify, turn to gold, and delay are all effective against Scourge.',
      'Mutual Corruption Cleansing: Since items are limited, helping each other with corruption will be more efficient than usual.'
    ],
    partyRecommendation: 'Red 3 + Blue or Elemental Archer is recommended.',
    troubleWinningAdvice: 'See information about the strongest weapons.',
    monstersAppearing: [
      {
        name: 'Scourge (Boss)',
        speciesType: 'Demon / Corrupted',
        weakness: 'Ice',
        coreType: 'Corruption Core',
        notes: 'Weak to ice. Susceptible to Freeze, petrify, turn to gold, and delay. High knockback power is critical to knock away Scourge\'s corruption in phase 3.'
      },
      {
        name: 'Corrupted Hobgoblin Fighter',
        speciesType: 'Demihuman / Corrupted',
        weakness: 'Ice / Fire',
        coreType: 'Chance Core',
        notes: 'Fixed spawn at destination during the 1st teleport separation.'
      },
      {
        name: 'Corrupted Sling Hobgoblin',
        speciesType: 'Demihuman / Corrupted',
        weakness: 'Ice / Fire',
        coreType: 'Chance Core',
        notes: 'Fixed spawn at destination during the 1st teleport separation.'
      },
      {
        name: 'Corrupted Direwolf',
        speciesType: 'Beast / Corrupted',
        weakness: 'Fire / Ice',
        coreType: 'None',
        notes: 'Fixed spawn at destination during the 2nd teleport separation, and respawns continuously with Snow Harpies in the final phase.'
      },
      {
        name: 'Ghost',
        speciesType: 'Spirit',
        weakness: 'Holy / Magick',
        coreType: 'Chance Core',
        notes: 'Fixed spawn at destination during the 2nd teleport separation.'
      },
      {
        name: 'Lizardman Sage',
        speciesType: 'Demihuman / Reptile',
        weakness: 'Ice / Physical',
        coreType: 'Chance Core',
        notes: 'Fixed spawn at destination during the 3rd teleport separation.'
      },
      {
        name: 'Gargoyle',
        speciesType: 'Construct / Winged',
        weakness: 'Thunder / Strike',
        coreType: 'None',
        notes: 'Fixed spawn at destination during the 3rd teleport separation.'
      },
      {
        name: 'Corrupted Snow Harpy',
        speciesType: 'Winged / Corrupted',
        weakness: 'Fire',
        coreType: 'None',
        notes: 'Spawns in rapid succession alongside Corrupted Dire Wolves after the third teleport separation.'
      }
    ],
    vocationAdvice: {
      fighter: {
        abilities: ['Full Power', 'Strength', 'Invigoration', 'Self-Healing'],
        notes: 'Equip heavy knockback abilities to blast away Scourge\'s corruption. Ice enchantments and ice crests on your sword significantly amplify your burst during stagger windows.'
      },
      seeker: {
        coreSkill: 'Falcon Drop',
        notes: 'Falcon Drop and rope pulls deliver tremendous knockback force to disrupt Scourge. Use high mobility to instantly eliminate adds when teleported.'
      },
      warrior: {
        notes: 'Unrivaled raw knockback and stagger capability. Charge attacks with knockback passives like "Full Power" > "Strength" > "Invigoration" make knocking away Scourge\'s corruption effortless.'
      },
      sorcerer: {
        spells: ['Giga Friez', 'Ice Spikes', 'Rockfall', 'Briarro'],
        notes: 'Scourge is weak to Ice; unleash high-tier ice magick to trigger Freeze status. Prepare Self-Healing passives or jewelry to counter party curative deficits.',
        targets: [
          { spell: 'Giga Friez / Ice Spikes', target: 'Scourge (Weakness: Ice + Freeze effect)' },
          { spell: 'Rockfall / Briarro', target: 'Teleport destination adds & final phase swarms' }
        ]
      },
      shieldSage: {
        notes: 'Freeze, petrify, turn to gold, and delay are all effective against Scourge. Shield Sage can cycle elemental bursts and status enchants to lock Scourge down while drawing aggro.'
      },
      elementalArcher: {
        notes: 'Recommended in the composition (Red 3 + Blue or Elemental Archer). Provides crucial healing sustain, cures corruption, and inflicts ice status or core markers from long distance.'
      }
    },
    suppliedItemsText: 'Premium Healing Potion x10, Concentrated Gala Extract x10, Superior Anti-Invasion Potion x4, Invasion Treatment Potion x3, War God\'s Amulet x3, Demon God\'s Amulet x3, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Opening Phase: Direct Engagement with Scourge',
        enemies: ['Scourge (Boss)'],
        tactics: 
          'You\'ll start the battle with Scourge right from the beginning. Infuse ice damage and focus on knockback power using abilities like "Full Power" > "Strength" > "Invigoration". Freeze, petrify, turn to gold, and delay are all effective against Scourge. Assist teammates with corruption immediately to conserve limited curatives.',
        keyTips: [
          'Start fighting Scourge immediately from the battle opening.',
          'Scourge is weak to Ice; use ice crests, ice attacks, and ice assaults.',
          'Status ailments work: Freeze, petrify, turn to gold, and delay are effective.',
          'Help each other cleanse corruption to preserve limited items.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Teleport Separations (1st, 2nd, and 3rd Transfers)',
        enemies: [
          'Corrupted Hobgoblin Fighter', 'Corrupted Sling Hobgoblin',
          'Corrupted Direwolf', 'Ghost',
          'Lizardman Sage', 'Gargoyle'
        ],
        tactics: 
          'After dealing a certain amount of damage, two random players will be teleported away while the remaining two players continue fighting Scourge.\n\nThe monsters that appear at the destination are fixed:\n• 1st time: Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin\n• 2nd time: Corrupted Direwolf, Ghost\n• 3rd time: Lizardman Sage, Gargoyle\n\nEliminate the destination adds rapidly to reunite with the team.',
        keyTips: [
          '1st transfer: Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin.',
          '2nd transfer: Corrupted Direwolf, Ghost.',
          '3rd transfer: Lizardman Sage, Gargoyle.',
          'The 2 players left behind must play defensively until the teleported players return.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Final Phase: Corruption Knockback & Rapid Reinforcements',
        enemies: ['Scourge (Boss)', 'Corrupted Direwolf', 'Corrupted Snow Harpy'],
        tactics: 
          'If your knockback power isn\'t strong enough, you might run out of time in the third and final phases because you can\'t knock away the Scourge\'s corruption. If you use your abilities properly, you should be able to knock it away smoothly and defeat it reliably with more than 10 minutes to spare.\n\nAdditionally, there will be no further transfers after the third time, but corrupted Dire Wolves and corrupted Snow Harpies will start appearing in rapid succession. Focus down Scourge while cleaving the adds.',
        keyTips: [
          'Knockback is mandatory: knock away Scourge\'s corruption to prevent running out of time.',
          'No further transfers occur after the third time.',
          'Corrupted Dire Wolves and Corrupted Snow Harpies spawn in rapid succession.',
          'Clear reliably with >10 minutes to spare when knockback is applied properly.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'The Distortion Enforcer (歪みの執行人) Clear Walkthrough',
        perspective: 'EXM 6 Scourge Walkthrough',
        youtubeVideoId: '_RjoafTLnZk',
        youtubeUrl: 'https://www.youtube.com/watch?v=_RjoafTLnZk'
      }
    ]
  },
  {
    id: 'phantasmic-great-white-dragon',
    name: 'Phantasmic Greate White Dragon',
    japaneseName: '幻の白竜 (EXM)',
    badge: 'EXM 7 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 80,
    itemRankRequirement: 'Item rank 37 or higher',
    timeLimit: '15 minutes',
    minDefense: 'Physical Defense 2100+ / Magic Defense 2100+',
    clearRewards: ['Sacred Vortex Crystal x3 (Reward for clearing once a day)'],
    orderConditions: 'Completed the personal quest < Signs of Chaos >. Item rank 37 or higher.',
    preparationNotes: 
      'Its race is Dragon, and its weakness is Darkness. Be sure to equip skills like "Dragon Slayer" and "Darkness Attack".\n\nDelay, sleep, petrification, stun, and golden transformation are effective, but freezing is ineffective.\n\nThey have high resistance to all status ailments, making them difficult to inflict.\n\nThe warriors who are summoned repeatedly often drop consumable items, so make good use of them. (They drop amulets as well as healing items.)',
    specialPreparationTips: [
      'Dragon Race & Darkness Weakness: Its race is Dragon, and its weakness is Darkness. Be sure to equip skills like "Dragon Slayer" and "Darkness Attack".',
      'Status Vulnerabilities: Delay, sleep, petrification, stun, and golden transformation are effective, but freezing is completely ineffective.',
      'High Ailment Resistance: The dragon has high resistance to all status ailments, making them difficult to inflict without accumulated buildup.',
      'Loot Summoned Warriors: Warriors summoned repeatedly often drop consumable items (both amulets and healing items)—make good use of them.',
      'Grab Countermeasures: Frontliners must equip Quick Release and Dragon Guard; without countermeasures, the dragon\'s grab attack will likely kill you instantly.'
    ],
    partyRecommendation: 'While it\'s possible to defeat this opponent with any team composition, it\'s best to have someone dedicated to exposing the core.',
    troubleWinningAdvice: 'See information about the strongest weapons.',
    monstersAppearing: [
      {
        name: 'Stagnant Great Dragon Power (White Dragon)',
        speciesType: 'Dragonkin / Dragon',
        weakness: 'Darkness',
        coreType: 'Elemental Core (Requires Exposure)',
        notes: 'Race is Dragon; weak to Darkness. Attacks are much more powerful than the main quest version with wider AoE magic. Freezing is ineffective, but sleep, petrify, stun, delay, and gold work. Beware lethal grab attack.'
      },
      {
        name: 'Summoned Phantom Warriors (Mid Phase)',
        speciesType: 'Humanoid / Spirit',
        weakness: 'Darkness / Variable',
        coreType: 'Chance Core',
        notes: 'Summoned repeatedly from the middle of the battle. Drop consumable items including amulets and healing items when slain.'
      },
      {
        name: 'High-Level Minions (Lv70 End Phase)',
        speciesType: 'Humanoid / Demihuman',
        weakness: 'Darkness / Physical',
        coreType: 'Chance Core',
        notes: 'Spawn towards the end of the battle. Their Meteor and Beat spells are extremely lethal and can cause instant death. Eliminate any that get in your way!'
      }
    ],
    vocationAdvice: {
      sorcerer: {
        spells: ['Rock Beat', 'Darkness Mist', 'Briarro'],
        notes: 'Rock Beat and Darkness Mist will be very useful. If someone can draw the enemy\'s attention or protect you, the battle will go much more smoothly.',
        targets: [
          { spell: 'Darkness Mist', target: 'Phantasmic White Dragon (exploits Darkness weakness)' },
          { spell: 'Rock Beat', target: 'Dragon Core burst during stagger & knockdown windows' },
          { spell: 'Briarro / Area Spells', target: 'Summoned warrior waves & Lv70 minions' }
        ]
      },
      shieldSage: {
        notes: 'Make good use of Sleep and Petrify (Freezing doesn\'t work, and delay is especially hard to land). The minions often get in the way, so Hands of God will be very useful for creating an invincible safe zone for the party.'
      },
      fighter: {
        abilities: ['Dragon Slayer', 'Dragon Guard', 'Quick Release', 'Darkness Attack'],
        notes: 'Equip Dragon Slayer and Darkness Attack for maximum damage output. The dragon\'s grab attack is a major threat to the front line—equip Quick Release and Dragon Guard to prevent instant death.'
      },
      seeker: {
        coreSkill: 'Falcon Drop & Rope Pull',
        notes: 'Excel at climbing and exposing the dragon\'s core quickly while staying clear of wide-area sweep attacks. Intercept dangerous Lv70 minion casters before they can cast Meteor.'
      },
      elementalArcher: {
        notes: 'Ideal dedicated core revealer. Shines with long-range core marking, darkness elemental coverage, and continuous party healing support against wide AoE attacks.'
      },
      warrior: {
        notes: 'Equip Dragon Slayer and utilize high-stagger greatsword swings during knockdown windows. Aim to finish the dragon within 2-3 knockdowns.'
      }
    },
    suppliedItemsText: 'Premium Healing Potion x6, High-Quality Concentrated Garlic Extract x6, Universal Remedy x3, War God\'s Amulet x1, Demon God\'s Amulet x1, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Opening Phase: Stagnant Great Dragon Power',
        enemies: ['Stagnant Great Dragon Power (White Dragon)'],
        tactics: 
          'The battle begins with a fight against the stagnant great dragon power. The enemy\'s attacks are more powerful than when you fought them in the main quest, and their area-of-effect magic attacks are wider. The grab attack is also a threat to the front line, so abilities like Quick Release and Dragon Guard will be very useful. Without some kind of countermeasure, you\'re highly likely to die instantly.',
        keyTips: [
          'The dragon attacks with wider AoE magick than in the story quest.',
          'Frontline players: Quick Release and Dragon Guard are essential against the instant-kill grab.',
          'Have a dedicated player expose the core immediately to build down stagger.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Mid Phase: Summoned Warriors & Vocation Synergies',
        enemies: ['Stagnant Great Dragon Power (White Dragon)', 'Summoned Phantom Warriors'],
        tactics: 
          'The enemy will summon minions repeatedly from the middle of the battle. At first they are low level and weak. Defeated warriors often drop consumable items (healing potions and amulets)—collect them to sustain party resources.\n\n• If you have a Sorcerer in your party, Rock Beat and Darkness Mist will be useful; protect them or draw aggro so they can cast uninterrupted.\n• If you have a Sage in your party, make good use of Sleep and Petrify. (Freezing doesn\'t work, and delay is especially hard to land.) Hands of God is very useful to shield the team from nuisance minions.',
        keyTips: [
          'Sorcerer: Rock Beat and Darkness Mist deal massive damage when protected.',
          'Sage: Inflict Sleep and Petrify (Freeze does not work); use Hands of God to protect the party.',
          'Collect items dropped by summoned warriors (healing items and amulets).'
        ]
      },
      {
        areaNumber: 3,
        title: 'Final Phase: Dangerous Lv70 Minions & 2-3 Knockdown Finish',
        enemies: ['Stagnant Great Dragon Power (White Dragon)', 'High-Level Minions (Lv70)'],
        tactics: 
          'Towards the end, level 70 minions appear and become extremely dangerous. You can die instantly from the attacks of these minions, so be sure to take down any that get in your way. (Meteor and Beat are especially dangerous.)\n\nCoordinate party burst damage and amulets during knockdown phases. Ideally, you should try to defeat the Phantasmic White Dragon in 2-3 knockdowns within the 15-minute time limit.',
        keyTips: [
          'Lv70 minions spawn towards the end: watch out for instant-kill Meteor and Beat spells!',
          'Eliminate obstructing minions immediately before they unleash magic.',
          'Aim to defeat the dragon within 2 to 3 knockdowns.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Phantasmic Greate White Dragon (幻の白竜) Clear Walkthrough',
        perspective: 'EXM 7 Dragon Walkthrough',
        youtubeVideoId: '98HySBiLZv8',
        youtubeUrl: 'https://www.youtube.com/watch?v=98HySBiLZv8'
      }
    ]
  },
  {
    id: 'wrath-of-the-earth',
    name: 'Wrath of the Earth',
    japaneseName: '大地の怒り (EXM)',
    badge: 'EXM 8 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 75,
    itemRankRequirement: 'Item rank 52 or higher',
    timeLimit: '20 minutes (Rescue bonus: +240s each)',
    minDefense: 'Physical Defense 2300+ / Magic Defense 2300+',
    clearRewards: ['Green Tree Crystal x3 (Reward for clearing once a day)'],
    orderConditions: 'Completed the personal quest < The Rustling Land >. Item rank 52 or higher.\n\nAs a general guideline, a level 75 or higher weapon will result in one down, while a level 75 weapon will result in two downs (if going straight for the kill). If your skills and abilities are solid, you can defeat them without any problems even with a level 75 weapon.',
    preparationNotes: 
      'Required abilities: Dragon Slayer, Fire Attack, Lightning Attack, Effect Extension (Effect Extension Light)\n\nI have three amulets in my inventory, so if I have an effect extension, I can maintain the effect indefinitely as long as I don\'t die.\n\nRecommended ability: Dragon Protection\n\nAbilities & Jewelry for people who die often: Protection, Ice Resistance, Lightning Resistance, Elemental Resistance\n\nEffective status effects: Stun, Golden, Sleep\nIneffective status effect: Petrification',
    specialPreparationTips: [
      'Required abilities: Dragon Slayer, Fire Attack, Lightning Attack, Effect Extension (Effect Extension Light).',
      'Infinite Amulet Buff: With three amulets in inventory and Effect Extension, maintain the effect indefinitely as long as you don\'t die.',
      'Recommended ability: Dragon Protection.',
      'For players who die often: Equip Protection, Ice Resistance, Lightning Resistance, and Elemental Resistance (Abilities & Jewelry).',
      'Status Vulnerabilities: Stun, Golden, and Sleep are effective. Petrification is ineffective.',
      'Damage Output Benchmark: Level 75+ weapon results in 1 down; level 75 weapon results in 2 downs (going straight for the kill). Solid skills and abilities can defeat them without problems even with a level 75 weapon.'
    ],
    partyRecommendation: 'There are no cores or breaks. Red 4 is also fine.',
    troubleWinningAdvice: 'See information about the strongest weapons.',
    remarks: 'Rescue Bonus: Time limit +240 seconds, the rescued Arisen\'s party will accompany you.\nThe order in which you struggle is random.\nAfter a tough battle, the monsters and the Arisen\'s party disappeared as time passed.',
    monstersAppearing: [
      {
        name: 'Adtarasque (Lv75)',
        speciesType: 'Dragonkin / Armored Dragon',
        weakness: 'Fire / Lightning',
        coreType: 'None (No Cores or Breaks)',
        notes: 'Main boss in the center. Has no cores or breaks, so Red 4 parties are fully viable. Vulnerable to Fire, Lightning, Stun, Golden, and Sleep. Petrification is ineffective.'
      },
      {
        name: 'Gore Chimera (Lv75) [Afraid of Armored Dragon]',
        speciesType: 'Beast / Ogrekin',
        weakness: 'Fire / Holy',
        coreType: 'Chance Core',
        notes: 'Battling Liz on the left side of the map (X258/Y365) alongside Styparides. Terrified of the armored dragon.'
      },
      {
        name: 'Styparides (Lv75) [Afraid of Armored Dragon]',
        speciesType: 'Spirit / Undead',
        weakness: 'Holy / Fire',
        coreType: 'Chance Core',
        notes: 'Battling Liz on the left side of the map (X258/Y365) alongside Gore Chimera. Terrified of the armored dragon.'
      },
      {
        name: 'Gore Cyclops (Lv75) [Terrified of Armored Dragon]',
        speciesType: 'Giant / Demihuman',
        weakness: 'Thunder / Lightning',
        coreType: 'None',
        notes: 'Battling Gardrin at the bottom of the map (X267/Y369) alongside Berserker Warg. Terrified of the armored dragon.'
      },
      {
        name: 'Berserker Warg (Lv75) [Terrified of Armored Dragon]',
        speciesType: 'Beast',
        weakness: 'Fire / Thunder',
        coreType: 'None',
        notes: 'Battling Gardrin at the bottom of the map (X267/Y369) alongside Gore Cyclops. Terrified of the armored dragon.'
      },
      {
        name: 'Medusa (Lv75) [Afraid of Armored Dragon]',
        speciesType: 'Beast / Cursed',
        weakness: 'Thunder / Fire',
        coreType: 'Elemental Core',
        notes: 'Battling Elliot in the upper right corner of the map (X266/Y363) alongside three Eliminators. Afraid of the armored dragon.'
      },
      {
        name: 'Eliminator (Lv75) x3 [Afraid of Armored Dragon]',
        speciesType: 'Giant / Beast',
        weakness: 'Lightning / Thunder',
        coreType: 'Elemental Core',
        notes: 'Battling Elliot in the upper right corner of the map (X266/Y363) alongside Medusa. Afraid of the armored dragon.'
      }
    ],
    vocationAdvice: {
      fighter: {
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Effect Extension', 'Dragon Protection'],
        notes: 'Equip Dragon Slayer, Fire Attack, Lightning Attack, and Effect Extension (or Effect Extension Light). Since there are three amulets in your inventory, Effect Extension keeps the damage buff active permanently as long as you do not die.'
      },
      warrior: {
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Dragon Protection'],
        notes: 'Devastating burst damage. Since Adtarasque has no cores or breaks, unleash relentless charged slashes to down the boss in 1 to 2 downs.'
      },
      seeker: {
        coreSkill: 'Falcon Drop',
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Effect Extension'],
        notes: 'High agility enables rapid travel to rescue locations across the map (Liz, Gardrin, Elliot) or quick direct rush against Adtarasque. Fire and lightning daggers tear through the dragon.'
      },
      sorcerer: {
        spells: ['Meteor Fall', 'Darkness Mist', 'Thunder Spells', 'Briarro'],
        notes: 'Exploit Fire and Lightning weaknesses. Inflict Sleep or Golden status to immobilize Adtarasque, and use area spells to sweep the rescue encounter adds if saving allies.',
        targets: [
          { spell: 'Fire / Lightning Spells', target: 'Adtarasque (Weak to Fire & Lightning)' },
          { spell: 'Sleep / Golden Magick', target: 'Adtarasque (Effective status ailments)' },
          { spell: 'Thunder Spells', target: 'Rescue adds (Gore Cyclops, Medusa, Chimeras)' }
        ]
      },
      shieldSage: {
        notes: 'Effective status effects: Stun, Golden, and Sleep (Petrification is ineffective). Hands of God can shield allies from massive stomps, though pure Red 4 parties are also completely viable.'
      },
      elementalArcher: {
        notes: 'Applies both Fire and Lightning elemental debuffs easily from range, while keeping the team healthy if taking heavy dragon breath or tail sweep damage.'
      }
    },
    suppliedItemsText: 'War God\'s Amulet x3, Demon God\'s Amulet x3, Premium Healing Potions, Concentrated Gala Extracts (With Effect Extension, the 3 amulets maintain their buff indefinitely as long as you don\'t die).',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Start Choice: Direct Adtarasque Rush vs. Arisen Party Rescue',
        enemies: ['Adtarasque (Lv75)', 'Arisen\'s Party (Allies)'],
        tactics: 
          'At the start, Adtarasque (Lv75) will be in front of you, and the Arisen\'s party will be behind you. You can either ignore the party behind you and head straight for Adtarasque, or help the Arisen\'s party to get a time bonus and fight Adtarasque together with them.\n\nThere are no cores or breaks on Adtarasque, so pure DPS compositions like Red 4 are completely fine. As a general guideline, a level 75 or higher weapon will result in one down, while a level 75 weapon will result in two downs (if going straight for the kill). If your skills and abilities are solid, you can defeat them without any problems even with a level 75 weapon.',
        keyTips: [
          'Choose your route: Head straight for Adtarasque to burn it down immediately, or rescue the Arisen\'s party for massive time bonuses.',
          'No cores or breaks exist on Adtarasque—Red 4 is fully viable.',
          'Weapon power benchmark: Lv75+ weapon = 1 down; Lv75 weapon = 2 downs.',
          'Maintain 3 amulets indefinitely using Effect Extension (or Effect Extension Light).'
        ]
      },
      {
        areaNumber: 2,
        title: 'About the Enlightened Ones (Rescue Battles Across the Map)',
        enemies: [
          'Liz: Gore Chimera (Lv75) & Styparides (Lv75)',
          'Gardrin: Gore Cyclops (Lv75) & Berserker Warg (Lv75)',
          'Elliot: Medusa (Lv75) & Eliminator (Lv75) x3'
        ],
        tactics: 
          'If you choose to help the allied Arisen, navigate to their respective encounter zones:\n\n• On the left side of the map (X258/Y365), Liz battles a Gore Chimera (Lv75) that is afraid of the armored dragon, and a Styparides (Lv75) that is also afraid of the armored dragon.\n• At the bottom of the map (X267/Y369), Gardrin battles a Gore Cyclops (Lv75) that is terrified of the armored dragon, and a Berserker Warg (Lv75) that is terrified of the armored dragon.\n• In the upper right corner of the map (X266/Y363), Elliot battles Medusa (Lv75) who is afraid of the armored dragon, and three Eliminators (Lv75) who are afraid of the armored dragon.',
        keyTips: [
          'Left side (X258/Y365): Liz vs. Gore Chimera (Lv75) & Styparides (Lv75).',
          'Bottom (X267/Y369): Gardrin vs. Gore Cyclops (Lv75) & Berserker Warg (Lv75).',
          'Upper right (X266/Y363): Elliot vs. Medusa (Lv75) & 3 Eliminators (Lv75).',
          'All monsters in these encounters are afraid/terrified of the armored dragon.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Remarks: Rescue Bonuses & Final Confrontation',
        enemies: ['Adtarasque (Lv75)', 'Rescued Companions (Liz, Gardrin, Elliot)'],
        tactics: 
          '• Rescue Bonus: Time limit +240 seconds, the rescued Arisen\'s party will accompany you to fight Adtarasque together!\n• The order in which you struggle is random.\n• After a tough battle, the monsters and the Arisen\'s party disappeared as time passed.\n\nStun, Golden, and Sleep are effective against Adtarasque (Petrification is ineffective). Exploit Fire and Lightning attacks, keep your Dragon Protection active, and coordinate with your party or rescued companions for a swift victory.',
        keyTips: [
          'Rescue Bonus: +240 seconds added to time limit, plus rescued allies accompany you into battle.',
          'Encounter struggle order is random.',
          'Monsters and the Arisen\'s party will disappear as time passes if left unattended.',
          'Effective status effects: Stun, Golden, Sleep. Ineffective: Petrification.',
          'People who die often: equip Protection, Ice Resistance, Lightning Resistance, Elemental Resistance.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Wrath of the Earth (大地の怒り) Clear Walkthrough (Onset of darkness restricted stage)',
        perspective: 'EXM 8 Adtarasque Walkthrough',
        note: 'This reference video comes from (Onset of darkness restricted stage)',
        youtubeVideoId: 'rAexYEAmLz0',
        youtubeUrl: 'https://www.youtube.com/watch?v=rAexYEAmLz0'
      }
    ]
  },
  {
    id: 'darkness-reawakened',
    name: 'Darkness Reawakened (limited time events)',
    japaneseName: '黒き闇の再臨 (EXM / 期間限定)',
    badge: 'EXM 9 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 80,
    itemRankRequirement: 'Item rank 72 or higher',
    timeLimit: 'Timed Objective (Bonus time added for kills)',
    minDefense: 'Physical Defense 2100+ / Magic Defense 2100+ (IR 72+ gear)',
    clearRewards: [
      "Black Knight's Thoughts (Thoughts can be obtained through bonus rewards in addition to the first-time reward, so you can collect materials multiple times)"
    ],
    orderConditions: 
      'Completed the personal quest < The Descent of Darkness >.\nItem rank 72 or higher\n*Unlocked from June 15th',
    preparationNotes: 
      'Required abilities: Spirit Targeting, Damage Ability\nRecommended abilities: Assault, Stamina-related, etc.',
    specialPreparationTips: [
      'Required abilities: Spirit Targeting, Damage Ability.',
      'Recommended abilities: Assault, Stamina-related, etc.',
      'If you want to defeat the weaker enemies in the timed shift smoothly, it\'s a good idea to equip skills like "Invasion Sniper" or "Corruption Sniper".',
      'Regarding the Phantom of the Black Knight: unlike the regular Black Knight, it has no core, so critical hit-type attacks are completely unnecessary.',
      'Initial Supplies: You start with only one bottle of pickled liquor and five lantern starters, but you can pick up plenty of healing items from enemy drops and gathering points throughout the game.'
    ],
    partyRecommendation: 
      'Basically, four red jobs are sufficient. There are no situations where blue or green jobs are required, and in fact, having them in the party adds a bonus to the time.',
    vocationAdvice: {
      warrior: {
        abilities: ['Spirit Targeting', 'Assault', 'Stamina abilities'],
        notes: 'Four red jobs are sufficient. Focus on damage-dealing and spirit-targeting abilities to burst down the Black Knight Illusions in pairs.'
      },
      sorcerer: {
        spells: ['Icicle Pierce'],
        notes: 'Rapid Icicle Pierce fire can shatter the Black Swords before running out of shots since swords break by hit counts rather than raw damage.'
      }
    },
    remarks: 
      'Basically, four red jobs are sufficient.\nThere are no situations where blue or green jobs are required, and in fact, having them in the party adds a bonus to the time.\nIf you want to defeat the weaker enemies in the timed shift smoothly, it\'s a good idea to equip skills like "Invasion Sniper " or "Corruption Sniper ."\nRegarding the Phantom of the Black Knight, unlike the regular Black Knight, it has no core, so critical hit-type attacks are completely unnecessary.\nYou start with only one bottle of pickled liquor and five lantern starters , but you can pick up plenty of healing items from enemy drops and gathering points throughout the game.',
    troubleWinningAdvice: 'See information about the strongest weapons.',
    monstersAppearing: [
      {
        name: 'Phantom of the Black Knight',
        speciesType: 'Spirit / Darkness',
        weakness: 'Spirit Targeting / Raw Damage',
        coreType: 'None (No Core)',
        notes: 'Unlike the regular Black Knight, it has no core, so critical hit-type attacks are completely unnecessary.'
      },
      {
        name: 'Black Knight Illusions',
        speciesType: 'Spirit / Phantom',
        weakness: 'Damage Abilities (Burst DPS)',
        coreType: 'None',
        notes: 'The illusions disappear after a certain amount of time, but if you have enough damage-dealing abilities, two people should be able to defeat them. Defeating them adds a significant amount of time to your progress.'
      },
      {
        name: 'Timed Shift Enemies',
        speciesType: 'Demihuman / Corrupted / Invading',
        weakness: 'Invasion Sniper / Corruption Sniper',
        coreType: 'None',
        notes: 'Equip skills like "Invasion Sniper" or "Corruption Sniper" to defeat the weaker enemies in the timed shift smoothly.'
      },
      {
        name: 'Black Swords (10 Objects)',
        speciesType: 'Cursed Relic / Object',
        weakness: 'Attack Hit Count (Repeated Icicle Pierce)',
        coreType: 'None',
        notes: 'There is no damage display. Destroyed by the number of attacks rather than damage. It cannot be destroyed with one charged Icicle Pierce, but it can be destroyed before running out of shots if you fire Icicle Pierce repeatedly.'
      }
    ],
    suppliedItemsText: 'Pickled Liquor x1, Lantern Starters x5 (Healing items drop generously from enemies & gathering spots)',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Walkthrough: Search & Destroy 10 Black Swords',
        enemies: ['10 Black Swords', 'Phantom of the Black Knight', 'Black Knight Illusions', 'Timed Shift Enemies'],
        tactics: 
          'The objective is to find and destroy 10 black swords. This might be difficult in a group. It\'s probably easier to explore in pairs.\n\nThere are also areas where black knights and illusions appear, and defeating them will add a significant amount of time to your progress, so it\'s best to take them down.\n\nThe illusions disappear after a certain amount of time, but if you have enough damage-dealing abilities, two people should be able to defeat them.\n\nAbout the Black Sword:\nThere is no damage display. It seems to be destroyed by the number of attacks rather than damage? It cannot be destroyed with one charged Icicle Pierce, but it can be destroyed before running out of shots if you fire Icicle Pierce repeatedly.',
        keyTips: [
          'The objective is to find and destroy 10 black swords. This might be difficult in a group. It\'s probably easier to explore in pairs.',
          'There are also areas where black knights and illusions appear, and defeating them will add a significant amount of time to your progress, so it\'s best to take them down.',
          'The illusions disappear after a certain amount of time, but if you have enough damage-dealing abilities, two people should be able to defeat them.',
          'About the Black Sword: There is no damage display. It seems to be destroyed by the number of attacks rather than damage? It cannot be destroyed with one charged Icicle Pierce, but it can be destroyed before running out of shots if you fire Icicle Pierce repeatedly.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Darkness Reawakened (黒き闇の再臨) Clear Walkthrough',
        perspective: 'EXM Clear Walkthrough',
        youtubeVideoId: 'gvORwXlUABw',
        youtubeUrl: 'https://www.youtube.com/watch?v=gvORwXlUABw'
      }
    ]
  },
  {
    id: 'onset-of-darkness-restricted-stage',
    name: 'Onset of darkness Restricted Stage',
    japaneseName: '黒き闇の再臨 (限界域)',
    badge: 'EXM 10 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 80,
    itemRankRequirement: 'Item rank 72 or higher',
    timeLimit: 'Restricted Stage Timer',
    minDefense: 'Physical Defense 2200+ / Magic Defense 2200+ (IR 72+ gear)',
    clearRewards: [
      'A panacea',
      'Greedy equipment (can also drop from random reward slot from 2nd clear onwards):',
      'Greedy Mask',
      'Greedy Brest',
      'Greedy Hands',
      'Greedy Boots',
      'Greedy Mantle'
    ],
    orderConditions: 
      'Completed the personal quest < Darkness Reawakened >.\nItem rank 72 or higher',
    preparationNotes: 
      'Be aware that the Black Knight is resistant to all attributes except Holy (and normal damage from ranged attacks).\nWhile physical classes are fine with holy weapons, Sarah should focus on dealing damage with ranged weapons like Icicle Pierce or Blizzard Arrow, which have the Ranged attribute enhanced by Ranged Specialization.\nI don\'t have any buff items in my inventory, so I don\'t need any effect extension items.\nThe enemy\'s attack power is very high, they are tough, and they have few items, so it\'s a good idea to prepare for healing/defense or situations where you\'re near death.\nWith support from Puri\'s Solid Riser , you can dodge the Black Knight\'s consecutive attacks, making both taking damage and surviving much easier.\nSince stamina tends to run low, green-class characters should make sure to provide stamina recovery support. If you have a Priest\'s Energy Spot , there won\'t be any problems at all.\nSince medicine is scarce, increasing your life force and healing ability is effective. If you have healing accessories, equipping them will make things much easier.\nFor draining stamina, Sarah\'s Black Haze and Ele\'s Weakening Magic Bow are effective.　←Select skills that have a high chance of success and are easy to land for each job.\nWhile all status ailments are effective, it\'s best to limit the number of times you inflict the same status ailment to two and then aim for a different debuff.\nWhen enraged, apply some kind of debuff ⇒ weakening magic bow ⇒ stack up on attack power with Haze and you can instantly deplete the core.\nEven without debuffs, you can instantly whittle down their health with moves like the first hit of the deer\'s Agito Slash (with chain effect stacked) or the warrior\'s Great Windmill Slash .',
    specialPreparationTips: [
      'Resistant to all attributes except Holy (and normal damage from ranged attacks). Physical classes should equip holy weapons.',
      'Sarah / Sorcerer: Focus on dealing damage with ranged weapons like Icicle Pierce or Blizzard Arrow, which have the Ranged attribute enhanced by Ranged Specialization.',
      'No Buff Items in inventory, so effect extension items are not needed.',
      'High Enemy ATK: The enemy\'s attack power is very high, they are tough, and medicine is scarce. Increase life force and healing ability, or equip healing accessories.',
      'Solid Riser Support: With support from Priest\'s Solid Riser, you can dodge consecutive attacks, making survival much easier.',
      'Stamina Support: Green classes must provide stamina recovery support; Priest\'s Energy Spot eliminates stamina issues completely.',
      'Stamina Draining: Sarah\'s Black Haze and Ele\'s Weakening Magic Bow are extremely effective.',
      'Status Ailment Rotation: Limit the same status ailment to 2 times, then aim for a different debuff.',
      'Enraged Core Depletion: When enraged: Debuff ⇒ Weakening Magic Bow ⇒ stack attack power with Haze to instantly deplete the core.',
      'Fast Burst Attacks: Deer\'s Agito Slash first hit (with stacked chain effect) or Warrior\'s Great Windmill Slash can instantly whittle down health.'
    ],
    partyRecommendation: 
      'Pre 1 Red 3:\nPriests can reduce damage to almost zero by stacking abilities that reduce damage during casting (such as Brave Chant and Harden ), as well as other protective abilities. Furthermore, by maintaining Solid Riser support during normal times and switching to Attack Riser when downed, even with a weapon around level 80 in red magic, victory is easily achievable.\n\nPre 1 Red 2 Blue 1:\nFor a more stable clear, try this. Blue classes can make things smoother by disrupting gravity casting in the center with sleep spells, etc. If you\'re having trouble with damage output, use a Sage with a spirit-slaying shield and boost damage with bursts. Chemists are not good at boosting damage because they have resistance to blunt attacks.',
    vocationAdvice: {
      fighter: {
        abilities: ['Holy Weapon', 'Damage reduction', 'Life Force'],
        notes: 'Use Holy weapons. Maintain aggressive DPS while inside Priest\'s Solid Riser.'
      },
      priest: {
        spells: ['Solid Riser', 'Attack Riser', 'Energy Spot', 'Brave Chant', 'Harden'],
        notes: 'Priests can reduce damage to almost zero by stacking abilities that reduce damage during casting (Brave Chant, Harden) and protective abilities. Maintain Solid Riser during normal times to allow allies to dodge consecutive attacks, provide Energy Spot for stamina, and switch to Attack Riser when boss is downed.'
      },
      sorcerer: {
        spells: ['Icicle Pierce', 'Blizzard Arrow', 'Black Haze'],
        notes: 'Sarah should focus on dealing damage with ranged weapons like Icicle Pierce or Blizzard Arrow (enhanced by Ranged Specialization). Black Haze is essential for stamina depletion.'
      },
      shieldSage: {
        notes: 'In Pre 1 Red 2 Blue 1 parties, Blue classes disrupt gravity casting in the center with sleep spells. Sage with spirit-slaying shield boosts damage with bursts. (Chemists are ineffective as boss has blunt resistance).'
      },
      elementalArcher: {
        skills: ['Weakening Magic Bow'],
        notes: 'Ele\'s Weakening Magic Bow is critical for stamina drain. In enrage: debuff ⇒ Weakening Magic Bow ⇒ stack with Haze for instant core wipe.'
      },
      warrior: {
        skills: ['Great Windmill Slash'],
        notes: 'Warrior\'s Great Windmill Slash can instantly whittle down the Black Knight\'s health.'
      },
      seeker: {
        skills: ['Agito Slash (Jaw Slash)'],
        notes: 'First hit of Seeker\'s Agito Slash with stacked chain effect cuts down boss health swiftly.'
      }
    },
    remarks: 
      'Pre 1 Red 3:\nPriests can reduce damage to almost zero by stacking abilities that reduce damage during casting (such as Brave Chant and Harden ), as well as other protective abilities. Furthermore, by maintaining Solid Riser support during normal times and switching to Attack Riser when downed, even with a weapon around level 80 in red magic, victory is easily achievable.\n\nPre 1 Red 2 Blue 1:\nFor a more stable clear, try this. Blue classes can make things smoother by disrupting gravity casting in the center with sleep spells, etc. If you\'re having trouble with damage output, use a Sage with a spirit-slaying shield and boost damage with bursts. Chemists are not good at boosting damage because they have resistance to blunt attacks.',
    monstersAppearing: [
      {
        name: 'Black Knight (Restricted Stage)',
        speciesType: 'Spirit / Dark Knight',
        weakness: 'Holy Element / Ranged Attacks (Icicle Pierce, Blizzard Arrow)',
        coreType: 'Dark Core (Weakening Magic Bow + Black Haze)',
        notes: 'Resistant to all attributes except Holy and normal damage from ranged attacks. Resistant to blunt attacks (Alchemist is poor choice). High attack power. Enrage core shatters quickly with debuff + Weakening Magic Bow + Haze.'
      }
    ],
    suppliedItemsText: 'No buff items in inventory (No effect extension needed). Medicine is scarce; healing accessories recommended.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Onset of darkness Restricted Stage Walkthrough',
        enemies: ['Black Knight (Restricted Stage)'],
        tactics: 
          'Be aware that the Black Knight is resistant to all attributes except Holy (and normal damage from ranged attacks).\n\nWhile physical classes are fine with holy weapons, Sarah should focus on dealing damage with ranged weapons like Icicle Pierce or Blizzard Arrow, which have the Ranged attribute enhanced by Ranged Specialization.\n\nI don\'t have any buff items in my inventory, so I don\'t need any effect extension items.\n\nThe enemy\'s attack power is very high, they are tough, and they have few items, so it\'s a good idea to prepare for healing/defense or situations where you\'re near death.\n\nWith support from Puri\'s Solid Riser , you can dodge the Black Knight\'s consecutive attacks, making both taking damage and surviving much easier.\n\nSince stamina tends to run low, green-class characters should make sure to provide stamina recovery support. If you have a Priest\'s Energy Spot , there won\'t be any problems at all.\n\nSince medicine is scarce, increasing your life force and healing ability is effective. If you have healing accessories, equipping them will make things much easier.\n\nFor draining stamina, Sarah\'s Black Haze and Ele\'s Weakening Magic Bow are effective.　←Select skills that have a high chance of success and are easy to land for each job.\n\nWhile all status ailments are effective, it\'s best to limit the number of times you inflict the same status ailment to two and then aim for a different debuff.\n\nWhen enraged, apply some kind of debuff ⇒ weakening magic bow ⇒ stack up on attack power with Haze and you can instantly deplete the core.\n\nEven without debuffs, you can instantly whittle down their health with moves like the first hit of the deer\'s Agito Slash (with chain effect stacked) or the warrior\'s Great Windmill Slash .',
        keyTips: [
          'Black Knight is resistant to all attributes except Holy (and normal damage from ranged attacks).',
          'Sarah uses Icicle Pierce / Blizzard Arrow enhanced by Ranged Specialization; physical classes use Holy weapons.',
          'Priest Solid Riser enables dodging consecutive attacks; Energy Spot solves stamina.',
          'Stamina drain: Sarah\'s Black Haze & Ele\'s Weakening Magic Bow.',
          'Rotate status ailments: max 2 times per ailment, then switch.',
          'Enrage combo: Debuff ⇒ Weakening Magic Bow ⇒ Black Haze for instant core wipe.',
          'Burst DPS: Deer\'s Agito Slash first hit (chain stacked) or Warrior\'s Great Windmill Slash.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Onset of darkness Restricted Stage (黒き闇の再臨 限界域) Clear Walkthrough',
        perspective: 'Restricted Stage Clear Perspective',
        youtubeVideoId: '2GCIQleg_E0',
        youtubeUrl: 'https://www.youtube.com/watch?v=2GCIQleg_E0'
      }
    ]
  },
  {
    id: 'makaimura-collaboration-special-mission',
    name: 'Makaimura Collaboration Special Mission',
    japaneseName: '魔界村コラボ 特殊ダンジョン (EXM)',
    badge: 'EXM 11 • 4-Player EXM',
    partySize: '4 Players',
    recommendedLevel: 'Lv. 60 (IR80 Collab Armor Recommended)',
    itemRankRequirement: 'Makaimura Collab Armor (IR80) / Strawberry Pants / Naked',
    timeLimit: 'Collaboration Event Timer',
    minDefense: 'Naked: ~0 Def (Glass Cannon) / With Collab Armor: IR80 (Virtually Unkillable)',
    clearRewards: [
      'Makaimura Coins',
      'Initial 2 slots: universal remedy or 1, 3, 5, 7, or 9 coins (random)',
      '2 coin slots guaranteed upon first clear each day',
      'Slots increase if you have Makaimura collaboration equipment (cosmetic effect applies)',
      'Slots increase further if the reward pass is active (separate slot from equipment)',
      'Slots increase if there are players who have not yet cleared the game',
      '200 coins: Strawberry Pants (increases coin drop slots)',
      '100-250 coins: Book to learn abilities like Heavy / Light (High priority: Light is very rare!)'
    ],
    orderConditions: 
      'Personal quest " Footsteps of Evil " completed (※There was an error in the official announcement)\n\nThere are equipment restrictions.\nThe only armor you can bring into EM is the two types of armor and two types of dresses from the Makaimura collaboration lot, and the strawberry pants that can be exchanged with coins.\nThe strawberry pants increase the coin drop rate but offer virtually no defense, so the difficulty level will differ drastically depending on whether you have the collaboration equipment with decent defense at IR80. You\'ll need to consider different strategies for each.\n\n*You can bring any weapon, not just those from the Ghosts \'n Goblins collaboration. However, due to a bug or design flaw, you currently cannot switch weapons within the EM (Enhanced Monster) area. Strategies that rely on weapon switching are not possible.',
    preparationNotes: 
      'Since this is a 4-person EM (Effective Microorganisms) session, no chemicals are allowed to be brought in.\n\nIf you don\'t have the Makaimura collaboration armor and are going in naked:\nYour defense will be close to zero and your maximum HP will be low, so even attacks from weak enemies will inflict heavy damage and you\'ll be in danger of dying.\nEquipping damage reduction abilities such as protection and resilience will give you a lot more leeway in the number of hits you can take before dying.\nUnlike armor, there are no restrictions on bringing in jewelry, so make use of it.\nYou don\'t need to defeat all the weak enemies; it\'s best to build your abilities with the boss Zul in mind. (Magic Sniper, Ice Attack\nPhysical Red Mage classes should ideally have an Ice Crest on their weapon. Note that there are restrictions on bringing in potions in EM. )Skill sealing and bird attack reduction have such a significant impact that they can determine whether you succeed or fail in clearing the stage.Green class players should bring healing skills.\n*Strix\'s attack and magic attack reduction is powerful, but it cannot be cured with healing skills. It can be cured with a panacea. Healing skills will be useful if you get electrocuted in the battle against Zul.\n\nIf you have the Ghosts \'n Goblins collaboration armor:\nThe enemies are Lv60, so with the full armor set\'s defense alone, you\'ll almost certainly not die. The game becomes incredibly easy. It\'s a good idea to focus on a damage-focused ability build to maximize farming efficiency.\nHowever, you\'ll be hit with some troublesome status ailments like Strix\'s attack and magic attack down, so it\'s good to have some countermeasures.\nIf there are allies without armor, they may get knocked down frequently, so abilities that help revive them might be interesting.',
    specialPreparationTips: [
      'No Outside Potions: Since this is a 4-person EM session, no chemicals/potions are allowed to be brought in from outside.',
      'Naked vs Armored: If you don\'t have Makaimura armor, your defense is close to 0 and max HP is low—equip damage reduction abilities (Protection, Resilience) and jewelry.',
      'Ice Weapon & Zuul Weakness: Build your abilities with boss Zuul in mind (Magic Sniper, Ice Attack). Physical Red classes should place an Ice Crest on their weapon.',
      'Dangerous Strix Debuff: Strix\'s attack and magic attack reduction halves firepower and cannot be cured by healing skills (only cured with Panacea).',
      'Healing Skills for Electrocution: Green classes should bring healing skills, which are especially useful if allies get electrocuted by Zuul.',
      'Ghosts \'n Goblins Armor: Enemies are Lv60; with full collab armor defense, you almost certainly will not die. Focus on damage abilities to maximize coin farming.',
      'Revival Abilities: If teaming with unarmored allies, equip abilities that assist in quick revivals.'
    ],
    partyRecommendation: 
      'If you don\'t have the Makaimura collaboration armor and are going in naked:\nGreen 1, Blue 1 is probably the safest bet for the most difficult boss battle. Of course, this doesn\'t apply if you\'re confident in your skills. If you\'re not confident in your defensive abilities or dodging:\n• Hunter, Sorcerer, Elemental Archer, and other ranged classes that have attack methods without getting close to the enemy\n• Priest who can nullify damage with Guard Bit\n• Alchemist who can nullify damage with Golda Aurim\n• Fighter, Sage who can defend with a shield\nChoosing one of the above jobs might make you less likely to die. Hunter is especially recommended as it\'s good for quickly dealing with troublesome weak birds with its rain of shots.\n*However, since there is a time limit and you want to defeat the boss in as few as possible knockdowns, red classes will need firepower above the appropriate level.\n\nIf you have the Makaimura collaboration armor:\nThe difficulty is easy if you have many people with the armor. However, since the boss is Zuur, you\'ll want at least one green or blue class character. If the red class (area-of-effect) firepower is insufficient, you may not be able to defeat Zuur in one hit, and time may run out.',
    vocationAdvice: {
      hunter: {
        skills: ['Rain of Arrows', 'Spiral Arrow'],
        abilities: ['Magic Sniper', 'Ice Attack'],
        notes: 'Hunter is especially recommended as it\'s good for quickly dealing with troublesome weak birds (Strix) with its rain of shots to prevent attack-halving debuffs.'
      },
      priest: {
        spells: ['Guard Bit', 'Healing Skills', 'Solid Riser'],
        notes: 'Priest can nullify damage with Guard Bit (vital if naked). Bring healing skills for electrocution during the Zuul battle. Conserve Panaceas for red DPS.'
      },
      alchemist: {
        skills: ['Golda Aurim'],
        notes: 'Can nullify damage with Golda Aurim, drastically increasing survivability when running without collaboration armor.'
      },
      fighter: {
        skills: ['Shield Block', 'Defensive Stance'],
        notes: 'Can defend with a shield to avoid taking fatal hits from weak mobs and bosses when naked.'
      },
      shieldSage: {
        skills: ['Shield Guard', 'Taunt'],
        notes: 'Can defend with a shield and taunt dangerous enemies away from unarmored glass-cannon allies.'
      },
      sorcerer: {
        spells: ['Ice Spells', 'Icicle Pierce'],
        notes: 'Ranged class that can attack from safety without getting close. Use Ice spells against Red Zuul.'
      },
      elementalArcher: {
        skills: ['Ranged Core Exposure', 'Healing Arrow'],
        notes: 'Ranged class that stays safe at distance while exposing Zuul\'s core and providing stamina/healing support.'
      }
    },
    remarks: 
      'Equipment & Drop Bonus Rules:\n• The only armor allowed is the Makaimura collaboration lot armor/dresses and the coin-exchange Strawberry Pants.\n• Strawberry Pants increase coin drops but offer virtually 0 defense.\n• Any weapon can be brought in, but weapon switching within the EM area is currently disabled due to a bug or design flaw.\n\nCoin Drop Slot Mechanics:\n• 2 coin slots guaranteed upon first clear each day.\n• Extra slots awarded for wearing Makaimura collaboration equipment (cosmetic effect applies; shows as passport/course reward on receiving screen).\n• Slots increase further if the reward pass is active (separate slot from equipment).\n• Slots increase if there are players who have not yet cleared the game.\n• 200 coins: Strawberry Pants (increases coin drop slots).\n• 100-250 coins: Ability learning books (Heavy / Light, etc. Light ability is very rare!).',
    sideNote: 
      '- You\'re either wearing armor, going naked, or wearing strawberry panties, and you die after taking a few hits from weak enemies.\n- Weak enemies spawn infinitely.\n- There are many zombie and flying enemies.\n- Weak enemies drop knives and lantern starters (in Ghosts \'n Goblins, weak enemies drop weapons like knives and torches).\n- The boss, Zuul, is red (a nod to the mid-bosses "Red Arremer" and "Satan" from Ghosts \'n Goblins).\nAll of the above are homages to Ghosts \'n Goblins.',
    monstersAppearing: [
      {
        name: 'Red Zuul (Red Zuur / 赤ズール)',
        speciesType: 'Demon / Corrupted',
        weakness: 'Ice Element / Ice Crest',
        coreType: 'Ice Core (Exposed on Back during Enrage)',
        notes: 'Homage to Red Arremer and Satan. Behave like the familiar Zulu from the Fortress. Lightning attacks cause electrocution. When enraged, an ice core appears on its back. If wing parts break during core attacks, core must be exposed again.'
      },
      {
        name: 'Colossus (Key Keeper Giant)',
        speciesType: 'Giant',
        weakness: 'Dark Core / Physical Impact',
        coreType: 'Dark Core (Randomly on Back, Chest, or Knees)',
        notes: 'Key keeper in Room 3. Drops chest-opening tool. Has a lot of HP and stamina. Extremely dangerous if enraged when running naked.'
      },
      {
        name: 'Eliminator (Gatekeeper)',
        speciesType: 'Humanoid / Brute',
        weakness: 'Lightning / Holy',
        coreType: 'None',
        notes: 'Spawns after destroying the two necrotic plants in Room 1. Defeating it unlocks the gate.'
      },
      {
        name: 'Ghost Mail & Ghosts',
        speciesType: 'Undead / Spirit',
        weakness: 'Holy / Knockback Skills (A-rank)',
        coreType: 'None',
        notes: 'Ghosts inflict Skill Seal (wears off before boss). Ghost Mail groups are dangerous when naked—use high knockback skills to keep them flinching.'
      },
      {
        name: 'Strix (Weak Flying Birds)',
        speciesType: 'Bird / Harpy',
        weakness: 'Hunter Rain of Arrows / Ranged Attacks',
        coreType: 'None',
        notes: 'Spawns infinitely. Inflicts powerful Attack and Magic Attack Down debuffs that halve player firepower and cannot be cured by healing skills (only Panacea). Hunter Rain of Arrows cleans them out fast.'
      },
      {
        name: 'Fatman & Necrotic Plants',
        speciesType: 'Undead / Plant',
        weakness: 'Fire / Raw Damage',
        coreType: 'None',
        notes: 'Necrotic plants emit miasma in Room 1. Fatmen near the stairs self-destruct upon dying—be careful not to get caught in explosions while attacking the downed Colossus.'
      }
    ],
    suppliedItemsText: 'No chemicals/potions allowed from outside. 7 treasure chests inside contain Makaimura Coins, healing potions, and rare panaceas (1 chest locked, requires Colossus key tool).',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Room 1: Necrotic Plants, Gatekeeper Eliminator & Treasure Fork',
        enemies: ['Necrotic Plants x2', 'Eliminator (Gatekeeper)', 'Strix', 'Weak Zombies'],
        tactics: 
          'If you don\'t have the Makaimura collaboration armor and are going in naked:\nYou don\'t need to defeat all the weak enemies; just defeat the gatekeepers needed to unlock the three gates along the way.\nThere\'s a time limit and they respawn infinitely, so it\'s recommended to skip them as much as possible. By the way, the items dropped by the weak enemies are throwing knives or lantern tinder, so it\'s recommended to skip those as well.\nThe treasure chests along the way (7 in total, one of which is locked) randomly contain Makaimura Coins and healing potions, so collecting them will make clearing the dungeon easier.\nThere seems to be a general trend in what items you can get from the treasure chests. The chest near the center of the first round room is more likely to contain a panacea, the locked chest before the boss is more likely to contain coins, etc.\nPanaceas are especially valuable, and you often only get 0-2 even if you open all of them.\nStrix\'s attack and magic attack down halves your firepower and is a major factor in preventing you from killing the boss in one down, but to ensure you can kill the boss in one down, red characters should aim to secure at least one panacea when the boss is down.\n\nDestroying the two necrotic plants that emit miasma in the first room will cause a key-guarding Eliminator to spawn in front of the gate.\nYou may receive a magic attack debuff from Strix.\nIf you go right at the fork, you\'ll find a round room with three treasure chests.\nGo back and go left.',
        keyTips: [
          'Skip infinitely respawning weak enemies and knife/torch drops to save time.',
          'Destroy the 2 necrotic plants to spawn the Eliminator key keeper.',
          'Right fork leads to a round room with 3 treasure chests (center chest often has a Panacea!).',
          'Beware of Strix birds inflicting ATK/MATK down.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Room 2: Ghost Mail & Ghost Chamber (Diamond Passage Loot)',
        enemies: ['Ghost Mail', 'Ghosts', 'Dense Weak Mob Horde'],
        tactics: 
          'Defeating the initial Ghost Mail will spawn additional Ghosts and Ghost Mail. Getting the Ghost\'s skill seal is troublesome, but it will wear off before the boss fight.\nBeing ganged up on by Ghost Mail is dangerous, so especially if you\'re naked, don\'t rush in in small groups; stay together and be fully prepared. Using the red skill with enhanced knockback in the A-rank version will make it easy as they\'ll flinch a lot.\nOnce you defeat them all, the gate will open and you can proceed.\nIn the diamond-shaped passage, there is one treasure chest in the room on the right and two treasure chests on the left. Be especially careful on the left, as there is a dense group of weak enemies, so don\'t get killed while you\'re looting items.',
        keyTips: [
          'Stay together against Ghost Mail—getting surrounded while naked is lethal.',
          'Enhanced knockback skills (A-rank) keep Ghost Mail continuously flinching.',
          'Ghost skill seal wears off before the boss encounter.',
          'Diamond passage: 1 chest on right, 2 on left (watch out for dense mobs on the left).'
        ]
      },
      {
        areaNumber: 3,
        title: 'Room 3: Fatman & Colossus Chamber (Key Keeper & Tool Drop)',
        enemies: ['Colossus (Key Keeper)', 'Fatmen (Self-Destruct)', 'Weak Zombies'],
        tactics: 
          'There are many Fatmen near the stairs and one Colossus at the back. The giant is the key keeper, so defeat it. It will also definitely drop a chest-opening tool, so collect it and open the treasure chest in the next room.\nThe Colossus has a Dark Core. Its weak point is randomly located between its back, chest, and both knees.\nBe careful, as the Colossus\'s attacks hurt if you\'re naked.\nThe Colossus has a lot of HP and stamina, so be careful as it can get a bit troublesome if it gets enraged.\nFatmen self-destruct when they die, so be careful not to get interrupted when the giant is down.',
        keyTips: [
          'Defeat the Colossus giant to unlock the gate and pick up the chest-opening tool.',
          'Colossus has a Dark Core randomly located on its back, chest, or knees.',
          'Fatmen self-destruct upon death—steer clear of their blast radius during down burst.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Room 4: Final Boss - Red Zuul & Minions (1-Down Tactics)',
        enemies: ['Red Zuul (Boss)', 'Strix (Flying Birds)', 'Undead & Corpse'],
        tactics: 
          'The boss, Red Zulu, and its minions (Strix, Undead, Corpse) behave like the familiar Zulu from the Fortress.\nWhile its lightning attacks can be a bit troublesome, downing it with damage is more important, so it\'s best to conserve your universal remedies if you\'re running low. Heal the green characters.\nWhen enraged, an ice core appears on its back. If the wing-like parts on its back break while you\'re chipping away at the core, you\'ll need to expose the core again, so green characters should be careful.\nBecause of the time limit, it will be difficult if you can\'t finish off the boss in one down, especially if you have few armored characters, don\'t rush to deplete its stamina and check if any allies are downed. Take down the boss only when you\'re fully prepared.\nIf you get hit by Strix\'s attack and magic attack down debuff, your damage output will drop by almost half, making it impossible to take down the boss even once. Therefore, jobs skilled at clearing out the weaker birds should prioritize taking them out. However, they respawn infinitely, so they may reappear at inconvenient times just before the boss is taken down.\n\nIf you have the Makaimura collaboration armor:\nYou won\'t die, so there are almost no situations that pose a problem to clearing the game. The challenge is to pursue coin collection efficiency.\nIf you really push it, is it faster to ignore the random treasure chests along the way that support doesn\'t work on and go straight to the boss? However, if you skip them all, you\'ll run out of medicine, so be careful during the boss fight.\nOne point to note is that if you miss one down during the boss fight, you may run out of time, so check the status of your allies before the boss is downed → if they\'ve been hit with the bird\'s attack down, focus on healing to avoid failure.',
        keyTips: [
          'Aim for a clean 1-down victory to avoid running out of time.',
          'Enrage Ice Core on Zuul\'s back: avoid breaking wing parts prematurely or the core must be re-exposed.',
          'Check for Strix ATK/MATK debuff before downing: use Panacea immediately to restore damage output.',
          'Hunter/ranged should eliminate Strix birds immediately so they do not debuff attackers.',
          'Green classes heal electrocution; conserve Universal Remedies/Panaceas for the DPS burst.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Makaimura (Ghosts \'n Goblins) Collaboration Special Mission Clear Walkthrough',
        perspective: 'Collaboration Event Clear Walkthrough',
        youtubeVideoId: '9s7GPTY9a6w',
        youtubeUrl: 'https://www.youtube.com/watch?v=9s7GPTY9a6w'
      }
    ]
  },
  {
    id: 'findhams-reminiscences',
    name: "Findham's Reminiscences",
    japaneseName: 'フィンダムの追憶 (EXM)',
    badge: 'EXM 12 • Boss Gauntlet EXM',
    partySize: '4 Players (or Pawn Party)',
    recommendedLevel: 80,
    itemRankRequirement: 'Weapons around Lv. 80 (Low IR restrictions)',
    timeLimit: 'Boss Gauntlet Timer (Timed shifts grant +10 min leeway)',
    minDefense: 'Standard Lv. 80 Defense (Enemy attacks are not too painful)',
    clearRewards: [
      '60 Core Tree Drops (Reward for clearing once a day)',
      'Reward for helping with first clear: If at least one character in your party is clearing for the first time, all party members receive Tree of the Core Drops x 10',
      'Random rewards (from the second time onwards): "Tree of the Core" x 10 / "Tree of the Core" x 20 / "Tree of the Core" x 30'
    ],
    orderConditions: 
      'Completed the main quest <A New Generation> .',
    preparationNotes: 
      'During party play (because the enemy lineup is different from when playing solo)\nRequired abilities: Dragon Slayer , Fire Attack , Lightning Attack , (* Magic Slayer ), Fighting Spirit or Calmness, and other damage-dealing abilities.\n* Not necessary if Altered Zul is easy to obtain.\nThe enemy\'s attacks aren\'t that painful, so abilities that focus on firepower are fine.\nDuring PT play, the only opponents that require core exposure are Altered Zul and Time Guard.',
    specialPreparationTips: [
      'Required abilities: Dragon Slayer, Fire Attack, Lightning Attack, (*Magic Slayer), Fighting Spirit or Calmness, and other damage-dealing abilities.',
      '*Magic Slayer is not strictly necessary if Altered Zuul is already easy for your party.',
      'Enemy attacks are not overly painful, so you can safely prioritize raw firepower abilities.',
      'Core Exposure: During PT play, the only opponents that require core exposure are Altered Zuul and Time Guard.',
      'Unique Boss Flow: Curse Dragons, Adtarasques, and Spirit Dragon Wilmia have unique mechanics—inexperienced players should study their patterns beforehand.'
    ],
    partyRecommendation: 
      'Recommended: Red, Sorcerer, Green, Blue (e.g., Warrior, Sorcerer, Priest, Sage)\nRecommendation #2: Red x2, Green, Blue (Example: Warrior, Warrior, Priest, Sage)\n\n*In terms of whether you can clear it, as long as you have weapons around level 80 and the minimum firepower with the above abilities, and each person acts appropriately to shorten the time, the job restrictions are relatively loose.\nEven with a biased composition such as no Blue or no Green, you can still aim to clear it as long as you defeat the boss on turn 1.',
    troubleWinningAdvice: 
      'Please see the section on the strongest weapons.\nSince there are few restrictions on participation, such as IR limitations, it\'s possible that people who have "never seen a Curse Dragon or Adtarasque" might participate.\nIn particular, Curse Dragons, Adtarasques, and Spirit Dragon Wilmia have unique behaviors and combat flows, so it\'s important for inexperienced players to study how they move beforehand.',
    vocationAdvice: {
      warrior: {
        skills: ['Demon Slayer', 'Heavenly Blade', 'Annihilation Wind Slash'],
        abilities: ['Dragon Slayer', 'Fire Attack', 'Fighting Spirit'],
        notes: 'Altered Zuul: Quickly deplete stamina with Demon Slayer to knock it down. Curse Dragon: Use Heavenly Blade on its chest core during down. Wilmia: Waiting Annihilation Wind Slash wipes out Groaning Dragon Crystals instantly during enrage and destroys Wilmia\'s head when downed.'
      },
      sorcerer: {
        spells: ['Mist Spell', 'Fire Attack Spells', 'Lightning Attack Spells'],
        notes: 'Battle 2 weak enemies can be wiped out in one hit with a Mist spell. Provides massive elemental coverage across the dragon encounters.'
      },
      priest: {
        spells: ['Hands of God', 'Quick Charge', 'Attack Riser'],
        notes: 'Curse Dragon: Cast Hands of God during red warnings when the chest core is attacked to keep allies completely safe while attacking. Wilmia: Deploy Quick Charge so Warriors can rapidly chain Annihilation Wind Slash.'
      },
      shieldSage: {
        skills: ['Stonelight (Petrification)', 'Sleep Spell', 'Fire Force Burst', 'Lightning Weaklight'],
        abilities: ['Dragon Slayer Shield'],
        notes: 'Altered Zuul: Low petrification/gold resistance (Stonelight inflicts in 3-5 sec); chain petrification-sleep to freeze it, or cling to belly with Lightning Weaklight. Wilmia: Apply fire defense reduction and repeatedly fire Fire Force Burst with Dragon Slayer Shield.'
      }
    },
    remarks: 
      'The flow of Oli, Oli, Puri, Sage [Warrior, Warrior, Priest, Sage]:\n• Altered Zul: Weak resistance to petrification and gold (Stonelight takes about 3-5 seconds to inflict), so a Sage can keep it immobilized with a petrification-sleep combo, and a Warrior can quickly deplete its stamina with Demon Slayer to knock it down. Sages have difficulty hitting the belly core with Force Burst, so cling to it and whittle it down with Lightning Weaklight.\n\n• Curse Dragon: When the chest core is attacked after two parts are destroyed, the red warning means you can protect allies with Hands of God while the Warrior smoothly takes it down with Heavenly Blade on its chest.\n\n• Spirit Dragon Wilmia: When enraged, remember the placement of the "Groaning Dragon Crystals" (Konpeito) and destroy them immediately with Warrior\'s waiting Annihilation Wind Slash. Wait for its head to fall and use Annihilation Wind Slash. Priest should deploy Quick Charge. Sage applies fire defense reduction and repeatedly uses Fire Force Burst with Dragon Slayer Shield. If all goes well, it will be over in one knockdown.\n\nSupplementary Information on Curse Dragon Battle:\nWhile Wights and several summoned weaker enemies appear, the only requirement is to defeat the Curse Dragon. Leaving Wights alone can cause magic interruptions while the dragon is down. In random parties, either quickly eliminate Wights at the start or completely ignore them to burst the Curse Dragon. Ignoring Wights and focusing on the Curse Dragon is generally faster. The worst thing to do is hesitate and split your forces!',
    monstersAppearing: [
      {
        name: 'Altered Zuul (Match 1)',
        speciesType: 'Demon / Corrupted',
        weakness: 'Petrification (Stonelight 3-5s) / Gold / Lightning',
        coreType: 'Belly Core (Requires Exposure)',
        notes: 'Low petrification and gold resistance. Sage can lock it with petrification + sleep combo. Warrior uses Demon Slayer for rapid stamina depletion.'
      },
      {
        name: 'Curse Dragon (Battle 3 / Black Knight Roig with Pawns)',
        speciesType: 'Dragon / Cursed',
        weakness: 'Fire / Holy / Dragon Slayer',
        coreType: 'Chest Core (Appears after 2 parts destroyed)',
        notes: 'When chest core is attacked after 2 parts are broken, dangerous red warnings occur—Priest protects with Hands of God while DPS burns chest with Heavenly Blade. Wights spawn alongside it.'
      },
      {
        name: 'Adtarasque (Battle 4 / Tarasque with Pawns)',
        speciesType: 'Draconian / Beast',
        weakness: 'Ice / Lightning / Raw DPS',
        coreType: 'Head / Shell Weakpoints',
        notes: 'Appears in 4th battle. Study attack motions if inexperienced.'
      },
      {
        name: 'Spirit Dragon Wilmia (Battle 5 Boss)',
        speciesType: 'Dragon / Spirit Sovereign',
        weakness: 'Fire / Dragon Slayer Shield / Fire Force Burst',
        coreType: 'Head Core / Groaning Dragon Crystals (Konpeito)',
        notes: 'During enrage, immediately shatter Groaning Dragon Crystals (Konpeito) with waiting Annihilation Wind Slash. When head falls, Priest deploys Quick Charge, Sage applies fire defense down and spams Fire Force Burst, and Warriors burst head with Annihilation Wind Slash for a 1-knockdown finish.'
      },
      {
        name: 'Timed Shift Enemies (Optional Time Boosts)',
        speciesType: 'Mixed (Spineback / Finderent / White Griffin / Bifrost / Frost Machina / Gore Cyclops)',
        weakness: 'Respective Elemental Weaknesses',
        coreType: 'None',
        notes: 'Defeating timed enemies adds substantial time leeway (can clear with 10+ minutes to spare).'
      }
    ],
    suppliedItemsText: 'Standard supplies provided. Timed shift enemies grant extra time bonuses.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Match 1: Altered Zuul (Petrification & Sleep Lock)',
        enemies: ['Altered Zuul'],
        tactics: 
          'Altered Zul has weak resistance to petrification and gold ( Stonelight takes about 3-5 seconds to inflict), so a Sage in particular can keep it immobilized with a petrification-sleep combo, and a Warrior can quickly deplete its stamina with a Demon Slayer to knock it down. Sages have difficulty hitting the core in its belly with Force Burst, so it\'s also a good idea to cling to it and whittle it down with Lightning Weaklight.',
        keyTips: [
          'Sage immobilizes Altered Zuul with Stonelight (3-5s) and sleep combo.',
          'Warrior uses Demon Slayer to quickly deplete stamina and knock it down.',
          'Cling to belly with Lightning Weaklight if Force Burst cannot reach core.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Battle 2: Multiple Weak Enemies (Mist Spell Wipe)',
        enemies: ['Multiple Weak Mob Clusters'],
        tactics: 
          'Battle 2 features multiple weak enemies that can be wiped out completely with one cast of a Mist spell by a Sorcerer. Clear quickly and proceed.',
        keyTips: [
          'One Mist spell wipes out the entire mob group.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Battle 3: Curse Dragon & Wight Strategy (Roig in Pawn Parties)',
        enemies: ['Curse Dragon (or Black Knight Roig)', 'Wights & Summoned Minions'],
        tactics: 
          'Curse Dragon: When the chest core is attacked after two parts are destroyed, the red warning means you can protect your allies with Hands of God while the warrior smoothly takes it down with Heavenly Blade on its chest.\n\nSupplementary Information on the Curse Dragon Battle:\nWhile Wights and several summoned weaker enemies will appear, the only thing needed to proceed is to defeat the Curse Dragon.\nLeaving the Wights alone can lead to troublesome situations, such as being interrupted by magic while the Curse Dragon is down.\nTherefore, in random parties, the most common strategies are either to quickly focus on eliminating the Wights at the start, or to completely ignore them and focus on the Curse Dragon. Depending on the party composition, individual skill levels, and coordination, either approach is fine, but given the diverse compositions and skill levels of random parties, ignoring the Wights and focusing on the Curse Dragon is likely to save time.\nThe worst thing to do is to hesitate and split your forces between the Wights and the Curse Dragon.',
        keyTips: [
          'Priest casts Hands of God to protect the party during dangerous red warning phases on the chest core.',
          'Warrior uses Heavenly Blade on the chest core for huge damage.',
          'Do not split party forces between Wights and Curse Dragon—either burst Wights fast or focus 100% on Curse Dragon.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Battle 4: Adtarasque (Tarasque with Pawns) & Timed Shifts',
        enemies: ['Adtarasque (or Tarasque)', 'Timed Shift Foes (Spineback, Bifrost, Gore Cyclops, etc.)'],
        tactics: 
          '4th battle: Adtarasque / Tarasque when using a pawn party.\n\nThe timed enemies include Spineback or Finderent, White Griffin or Bifrost, and Frost Machina or Gore Cyclops.\nIf you run out of time at Wilmia, you should try defeating the timed enemies first. If you defeat the timed enemies smoothly, you\'ll have enough time to clear the stage with 10 minutes to spare.',
        keyTips: [
          'Study Adtarasque movement patterns if you have not fought one before.',
          'Defeating timed shift enemies adds huge bonus time (leaves 10+ minutes for final boss).'
        ]
      },
      {
        areaNumber: 5,
        title: 'Battle 5: Spirit Dragon Wilmia (1-Knockdown Execution)',
        enemies: ['Spirit Dragon Wilmia'],
        tactics: 
          'When enraged, remember the placement of the "Groaning Dragon Crystals" (Konpeito) and destroy them immediately with the Warrior\'s waiting Annihilation Wind Slash.\nIf you think you can knock it down quickly, wait for its head to fall and use Annihilation Wind Slash. The Priest should deploy Quick Charge and have the Warrior use Annihilation Wind Slash.\nThe Sage should apply the previously stopped fire defense reduction and repeatedly use Fire Force Burst with the Dragon Slayer Shield. If all goes well, it will be over in one knockdown.',
        keyTips: [
          'Shatter enrage crystals ("Konpeito") immediately with waiting Annihilation Wind Slash.',
          'Priest casts Quick Charge as head drops.',
          'Sage applies fire defense down and repeatedly fires Fire Force Burst with Dragon Slayer Shield.',
          'Warrior unleashes Annihilation Wind Slash on fallen head to finish in one knockdown.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: "Findham's Reminiscences (フィンダムの追憶) Clear Walkthrough",
        perspective: 'Boss Gauntlet EXM Perspective',
        youtubeVideoId: 'Hi--f5A_fgw',
        youtubeUrl: 'https://www.youtube.com/watch?v=Hi--f5A_fgw'
      }
    ]
  },
  {
    id: 'earths-fury-restricted-zone',
    name: "Earth's Fury restricted zone",
    japaneseName: '大地の怒り (限界域)',
    badge: 'EXM 13 • Restricted Stage',
    partySize: '4 Players',
    recommendedLevel: 75,
    itemRankRequirement: 'Item rank 57 or higher',
    timeLimit: 'Restricted Stage Timer',
    minDefense: 'IR 57+ Gear (Physical & Magic Defense 2400+)',
    clearRewards: [
      'Green Tree Crystal x3 (Reward for clearing once a day)',
      'Premium Healing Medicines - Top Grade',
      'Breakthrough rewards: Mandragora Lantern [Gold] x1',
      'Reward for helping with the first clear: If any character is clearing the stage for the first time upon completion, you will receive "Unidentified Flower-Carved Equipment [King] x3".',
      'Random rewards (Once per day upon first completion - one of the following): Green Tree Crystal x3, Mandragora Lantern [Gold] x1, Unidentified Flower-Carved Accessory [Imperial] x1',
      'Random rewards (Upon clearing for the second time or later - one of the following): Green Tree Crystal x1, Mandragora Lantern [Gold] x1, Unidentified Flower-Carved Accessory [Emperor] x1, Unidentified Flower-Carved Accessory [King] x2, Premium Healing Potion x3, Panacea x3, High-Quality Gala Extract x3'
    ],
    orderConditions: 
      'Completed the Extreme Mission < Wrath of the Earth >\nItem rank 57 or higher',
    preparationNotes: 
      'Required abilities: Dragon Slayer , Fire Attack , Lightning Attack , Effect Extension ( Effect Extension Light )\nI have three amulets in my inventory, so if I have an effect extension , I can maintain the effect indefinitely as long as I don\'t die.\nRecommended abilities: Dragon Protection , and since you have few items, Medicinal Effect ( Mild Medicinal Effect )\nAbilities & Jewelry for people who die often: Protection , Ice Resistance , Lightning Resistance , Elemental Resistance\nEffective status effects: Stun, Golden, Sleep\nIneffective status effect: Petrification',
    specialPreparationTips: [
      'Required abilities: Dragon Slayer, Fire Attack, Lightning Attack, Effect Extension (Effect Extension Light).',
      'Infinite Amulet Buff: You have three amulets in inventory; with Effect Extension (or Effect Extension Light), you can maintain the effect indefinitely as long as you don\'t die.',
      'Recommended abilities: Dragon Protection, and since you have few items, Medicinal Effect (Mild Medicinal Effect).',
      'For players who die often: Protection, Ice Resistance, Lightning Resistance, Elemental Resistance (Abilities & Jewelry).',
      'Effective status effects: Stun, Golden, Sleep.',
      'Ineffective status effect: Petrification.'
    ],
    partyRecommendation: 'High-firepower party with Fire & Lightning elemental damage. Blue classes with Sleep or Golden status can lock down Adtarasque, while area sweepers suppress continuously spawning minion waves.',
    vocationAdvice: {
      fighter: {
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Effect Extension', 'Dragon Protection'],
        notes: 'Equip Dragon Slayer, Fire Attack, Lightning Attack, and Effect Extension (or Effect Extension Light). Maintain your permanent amulet buff and stagger the Azure Armored Dragon while peeling off aggressive Wights and Skeletonbrutes.'
      },
      warrior: {
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Dragon Protection'],
        notes: 'Unleash high-impact slashes to swiftly down the Azure Armored Dragon. Wide sweeping attacks also clear out surrounding Grigori and Boltgrimwargs.'
      },
      sorcerer: {
        spells: ['Meteor Fall', 'Fire Spells', 'Lightning Spells', 'Sleep Magick'],
        notes: 'Exploit Fire and Lightning weaknesses. Inflict Sleep or Golden status on Adtarasque to completely neutralize its dangerous stomps. AoE spells annihilate continuously spawning minion groups.'
      },
      shieldSage: {
        skills: ['Sleep Spell', 'Golden Spell', 'Stun Burst'],
        notes: 'Effective status effects: Stun, Golden, Sleep (Petrification is ineffective!). Taunt the mob horde and lock down Adtarasque with Sleep/Golden.'
      },
      priest: {
        spells: ['Solid Riser', 'Attack Riser', 'Healing Magick'],
        notes: 'Given scarce items, healing support and medicinal buffs are vital. Provide Solid Riser / Attack Riser to accelerate down phases.'
      },
      seeker: {
        abilities: ['Dragon Slayer', 'Fire Attack', 'Lightning Attack', 'Effect Extension'],
        notes: 'High mobility lets Seekers avoid minion swarms while continuously carving into Adtarasque with fire and lightning blades.'
      }
    },
    remarks: 
      'Limit Zone Differences:\n• Unlike standard Wrath of the Earth where you rescue allies across different sectors, in the Limit Zone weaker enemies continuously spawn right around the Azure Armored Dragon Adtarasque from the very beginning.\n• Continuous enemy spawns: Wights, Skeletonbrute Lux, Grigori, Boltgrimwargs, etc.\n• With scarce healing items, equipping Medicinal Effect / Mild Medicinal Effect, Dragon Protection, and defensive resistances (Ice/Lightning/Elemental) will prevent party casualties.',
    monstersAppearing: [
      {
        name: 'The Azure Armored Dragon Adtarasque (Lv75)',
        speciesType: 'Dragonkin / Armored Dragon',
        weakness: 'Fire / Lightning / Dragon Slayer',
        coreType: 'None (No Cores or Breaks)',
        notes: 'Main boss in the center. Weak to Fire and Lightning. Effective status effects: Stun, Golden, Sleep (Petrification is ineffective). High attack power and dangerous stomps.'
      },
      {
        name: 'Wights (Continuously Spawning)',
        speciesType: 'Undead / Spirit Caster',
        weakness: 'Holy / Fire',
        coreType: 'None',
        notes: 'Continuously appear around Adtarasque from the start. Cast annoying ranged spells; eliminate or silence them quickly.'
      },
      {
        name: 'Skeletonbrute Lux (Continuously Spawning)',
        speciesType: 'Undead / Skeleton Brute',
        weakness: 'Blunt / Holy / Fire',
        coreType: 'None',
        notes: 'Heavy skeletal warriors that swarm alongside the dragon.'
      },
      {
        name: 'Grigori (Continuously Spawning)',
        speciesType: 'Gargoyle / Demihuman',
        weakness: 'Lightning / Fire',
        coreType: 'None',
        notes: 'Aggressive flying gargoyles that harass casters and ranged players.'
      },
      {
        name: 'Boltgrimwargs (Continuously Spawning)',
        speciesType: 'Beast',
        weakness: 'Fire',
        coreType: 'None',
        notes: 'Fast lightning-infused wolves that lunge across the arena.'
      }
    ],
    suppliedItemsText: 'War God\'s Amulet x3, Demon God\'s Amulet x3 (maintain permanently with Effect Extension). Healing items are scarce; Medicinal Effect recommended.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Limit Zone Arena: Azure Armored Dragon Adtarasque & Continuous Minions',
        enemies: [
          'The Azure Armored Dragon Adtarasque (Lv75)',
          'Wights (Continuous)',
          'Skeletonbrute Lux (Continuous)',
          'Grigori (Continuous)',
          'Boltgrimwargs (Continuous)'
        ],
        tactics: 
          'The Azure Armored Dragon Adtarasque (Lv75) will appear.\nIn the Limit Zone, weaker enemies will continuously appear around Adtarasque from the start: Wights, Skeletonbrute Lux, Grigori, Boltgrimwargs, etc.\n\nMaintain permanent buffs: You have three amulets in your inventory, so if you equip Effect Extension (or Effect Extension Light), you can maintain the stat boost indefinitely as long as you do not die.\n\nStatus tactics: Exploit Stun, Golden, and Sleep to disable Adtarasque (remember Petrification is completely ineffective). Due to scarce supplies, utilize Medicinal Effect and keep defensive jewelry (Ice/Lightning/Elemental resistance) equipped if prone to taking heavy hits.',
        keyTips: [
          'Boss is Lv75 Azure Armored Dragon Adtarasque.',
          'Weaker enemies spawn continuously around Adtarasque from the start: Wights, Skeletonbrute Lux, Grigori, Boltgrimwargs.',
          'Equip Effect Extension to keep 3 inventory amulets active permanently without expiring (until death).',
          'Effective statuses: Stun, Golden, Sleep. Ineffective: Petrification.',
          'Defensive preparedness: Dragon Protection, Medicinal Effect, Ice/Lightning/Elemental resistance.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: "Earth's Fury restricted zone (大地の怒り 限界域) Clear Walkthrough",
        perspective: 'Restricted Stage Clear Walkthrough',
        youtubeVideoId: 'oBtFChQLB90',
        youtubeUrl: 'https://www.youtube.com/watch?v=oBtFChQLB90'
      }
    ]
  },
  {
    id: 'great-white-phantasmic-dragon-restricted-stage',
    name: 'Great White Phantasmic Dragon Restricted Stage',
    japaneseName: '白き幻竜 (限界域) / 淀みし大竜力 (限界域)',
    badge: 'EXM 14 • Restricted Stage',
    partySize: '4 Players',
    recommendedLevel: 70,
    itemRankRequirement: 'Item rank 42 or higher',
    timeLimit: '15 minutes',
    minDefense: 'IR 42+ Gear (Physical & Magic Defense 1800+)',
    clearRewards: [
      'Clear Rewards for Stagnant Great Dragon Power (Restricted Stage)',
      'Superior Healing Potion drops (Medusa & Great Dragons)',
      'Superior Concentrated Gala Extract drops (Medusa & Great Dragons)',
      'Universal Remedy drops (Medusa drops)',
      'War God\'s Amulet & Demon God\'s Amulet (Shadow Chimera drops)'
    ],
    orderConditions: 
      'Cleared the Extreme Mission < Stagnant Great Dragon Power >.\nItem rank 42 or higher',
    preparationNotes: 
      'Since three Medusa appear in the limit zone, it would be good to have magic-targeting and ice-targeting abilities in addition to dragon-targeting and dark-attacking abilities .',
    specialPreparationTips: [
      'Targeting Abilities: Dragon-targeting and Dark-attacking abilities for the Stagnant Great Dragon Power.',
      'Medusa Counters: Magic-targeting and Ice-targeting abilities for the three Medusa enemies in the limit zone.',
      'Crowd Control: It\'s best to freeze, petrify, or turn Medusa to gold with Blue or Green vocations to defeat her quickly.',
      'Supplied Items: Exquisite stir-fried meat x1, Blue whiskey x1, Panacea x1, Lantern kindling x3.',
      'Healing Drops: Medusa drops Superior Healing Potion, Superior Concentrated Gala Extract, and Universal Remedy.',
      'Shadow Chimeras: Kill the 2 weak Shadow Chimeras quickly for War God\'s and Demon God\'s Amulet buffs and to prevent Shadow Harpies from spawning.'
    ],
    partyRecommendation: 
      'Balanced 4-Player composition (Red DPS x2, Blue x1, Green x1).\nBlue or Green vocations capable of Freezing, Petrifying, or turning Medusa to Gold are extremely valuable for neutralizing the three Medusas before they petrify the party.',
    vocationAdvice: {
      fighter: {
        abilities: ['Dragon Slayer', 'Dark Attack', 'Magic Slayer', 'Ice Attack'],
        notes: 'Switch targets to Medusa as soon as she spawns. Help focus down the weak Shadow Chimeras to pick up War God\'s Amulet.'
      },
      warrior: {
        abilities: ['Dragon Slayer', 'Dark Attack', 'Magic Slayer'],
        notes: 'Massive burst slashes to quickly eliminate Medusa. Collect dropped War God\'s Amulets from Shadow Chimeras for immense final dragon damage.'
      },
      sorcerer: {
        spells: ['Dark Spells', 'Ice Spells (Freezing)', 'Petrification'],
        notes: 'Exploit Dark element on Stagnant Great Dragon and Ice spells on Medusa. Freezing Medusa completely halts her gaze attacks.'
      },
      shieldSage: {
        skills: ['Ice Force Burst', 'Stonelight (Petrification)', 'Golden Burst'],
        notes: 'Freeze, petrify, or turn Medusa to gold immediately upon spawn so the party can burst her down without danger.'
      },
      priest: {
        spells: ['Solid Riser', 'Attack Riser', 'Healing Magick'],
        notes: 'Keep party cleansed and healthy. Pick up drops from Medusa and Great Dragons to maintain party resources.'
      },
      elementalArcher: {
        skills: ['Ice Arrow', 'Dark Arrow', 'Healing Arrow'],
        notes: 'Freeze Medusa from a distance and exploit the Great Dragon\'s dark weakness.'
      }
    },
    remarks: 
      'Encounter Sequence:\n1. A Stagnant Great Dragon Power appears ⇒ After slightly reducing its HP, three Medusa enemies appear, along with several smaller enemies that disappear over time (Corpse Torcher & Strix, Skeleton Brute, Ghost Mail).\n2. Ignore weaker mobs and focus Medusa (freeze, petrify, or gold). Medusa drops healing items.\n3. Finally, two Stagnant Great Dragons appear (they also drop recovery items).\n4. After defeating one dragon and damaging the second, two weak Shadow Chimeras spawn. Defeat them quickly for War God\'s & Demon God\'s Amulets, and to stop annoying Shadow Harpies from spawning!\n5. Finish off the last dragon with your amulet buffs.',
    monstersAppearing: [
      {
        name: 'Stagnant Great Dragon Power (淀みし大竜力)',
        speciesType: 'Dragon / Corrupted',
        weakness: 'Dark Element / Dragon-targeting Abilities',
        coreType: 'Dragon Core',
        notes: 'Appears initially, then 2 appear in the final phase. Drops Superior Healing Potion and Superior Concentrated Garlic/Gala Extract upon defeat.'
      },
      {
        name: 'Medusa x3 (Limit Zone Spawns)',
        speciesType: 'Magical Creature / Gazer',
        weakness: 'Ice Element / Magic-targeting / Freeze / Petrification / Gold',
        coreType: 'None',
        notes: 'Three Medusas spawn after slightly damaging the first dragon. Gaze attacks are deadly. Freeze, petrify, or turn them to gold to burst them down. Drops Superior Healing Potion, Superior Concentrated Gala Extract, Universal Remedy.'
      },
      {
        name: 'Shadow Chimera x2 (Buff Droppers)',
        speciesType: 'Shadow Beast',
        weakness: 'Raw Damage / Fire / Holy',
        coreType: 'None',
        notes: 'Very weak enemies that spawn when the final dragon is whittled down. Drops War God\'s Amulet and Demon God\'s Amulet. Defeat quickly before Shadow Harpies spawn!'
      },
      {
        name: 'Time-Decaying Smaller Enemies',
        speciesType: 'Mixed (Corpse Torcher, Strix, Skeleton Brute, Ghost Mail)',
        weakness: 'Standard Elements',
        coreType: 'None',
        notes: 'Spawn in waves along with Medusa and disappear over time. Ignore them and prioritize Medusa.'
      }
    ],
    suppliedItemsText: 'Exquisite stir-fried meat x1, Blue whiskey x1, Panacea x1, Lantern kindling x3',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Phase 1: Stagnant Great Dragon & The Three Medusas',
        enemies: ['Stagnant Great Dragon Power', 'Medusa x3', 'Corpse Torcher & Strix', 'Skeleton Brute', 'Ghost Mail'],
        tactics: 
          'Time limit: 15 minutes\nSupplied items: Exquisite stir-fried meat x1, Blue whiskey x1, Panacea x1, Lantern kindling x3\n\nA stagnant Great Dragon Power appears ⇒ After slightly reducing its HP, three Medusa enemies appear, along with several smaller enemies that disappear over time (the enemies appear in the order of Corpse Torcher & Strix, Skeleton Brute, and Ghost Mail).\n\nIgnore the weaker enemies and focus on defeating Medusa. (It\'s best to freeze, petrify, or turn her to gold with the blue or green enemies to defeat her quickly.)\n\nMedusa drops healing items (Superior Healing Potion, Superior Concentrated Gala Extract, Universal Remedy).',
        keyTips: [
          'Ignore time-decaying weaker mobs (Corpse Torcher, Strix, Skeleton Brute, Ghost Mail).',
          'Focus 100% on the 3 Medusas: use Ice, Freeze, Petrification, or Gold status.',
          'Collect valuable recovery items dropped by defeated Medusas.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Phase 2: Two Stagnant Great Dragons & Shadow Chimeras',
        enemies: ['Stagnant Great Dragon Power x2', 'Shadow Chimera x2', 'Shadow Harpies (if Chimeras delayed)'],
        tactics: 
          'Finally, two stagnant great dragons appear.\nEven the stagnant Great Dragon Power drops recovery items. (Superior Healing Potion, Superior Concentrated Garlic Extract)\n\nAfter defeating one of them, and once you\'ve whittled down the last one to a certain extent, two Shadow Chimeras will appear.\nThese Shadow Chimeras are very weak, so defeat them quickly and collect the buff items (War God\'s Amulet, Demon God\'s Amulet).\n\nLeaving them alone will also cause Shadow Harpies to spawn, which is troublesome.\nAfter the Shadow Chimera, nothing else will spawn, so focus on defeating it.',
        keyTips: [
          'Defeat the first Great Dragon while managing the second.',
          'When the final dragon is weakened, slay the 2 weak Shadow Chimeras immediately.',
          'Pick up the dropped War God\'s Amulet and Demon God\'s Amulet for massive attack buffs.',
          'Slaying Chimeras quickly prevents annoying Shadow Harpies from spawning.',
          'Burst down the final dragon with your amulet buffs to complete the mission.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Great White Phantasmic Dragon Restricted Stage (白き幻竜 限界域) Clear Walkthrough',
        perspective: 'Restricted Stage Clear Walkthrough',
        youtubeVideoId: 'kFB5yF0oVUo',
        youtubeUrl: 'https://www.youtube.com/watch?v=kFB5yF0oVUo'
      }
    ]
  },
  {
    id: 'distortion-enforcer-restricted-stage',
    name: 'Distortion Enforcer Restricted Stage',
    japaneseName: '歪みの執行人 (限界域)',
    badge: 'EXM 15 • Restricted Stage',
    partySize: '4 Players',
    recommendedLevel: 65,
    itemRankRequirement: 'Item rank 27 or higher',
    timeLimit: '15 minutes',
    minDefense: 'IR 27+ Gear',
    clearRewards: [
      'Starfall Crystal x3, Erosion Treatment x3 (Reward for clearing once a day)',
      'From the second clear onward: Anti-invasive drug (upper) x3',
      'Random rewards (Once per day upon first completion - one of the following): Starfall Crystal x3, One-Eyed Dragon Eyepatch x1, Unidentified Moon-Carved Accessory [Imperial] x1',
      'Random rewards (Upon clearing for the second time or later - one of the following): Starfall Crystal x1, One-Eyed Dragon\'s Eyepatch x1, Unidentified Moon-Carved Accessory [Emperor] x1, Unidentified Moon-Carved Accessory [King] x2, Premium Healing Medicine (Superior) x3, Erosion Treatment x3, High-Grade Concentrated Gara Extract x3'
    ],
    orderConditions: 
      'Completed the Extreme Mission < Executor of Distortion >\nItem rank 27 or higher',
    preparationNotes: 
      'There are very few items, which makes things difficult. It would be good to add medicinal properties and effects extension . The erosion is tough to deal with unless we help each other.\nQuickly eliminating the weaker enemies other than the Scourge and coordinating well with your teammates towards the end will allow you to defeat them smoothly.\nEveryone will inevitably run out of healing items, so in the later stages, be sure to check your teammates\' regeneration abilities to prevent anyone from becoming weakened.\n(If your team has a good selection of damage-dealing abilities, you might be able to defeat them before the final Gargoyle and Ogre appear.)',
    specialPreparationTips: [
      'Item Economy: There are very few items, which makes things difficult. Equip Medicinal Properties and Effect Extension to make the most of limited potions and amulets.',
      'Erosion Cooperation: The erosion is tough to deal with unless we help each other with anti-invasion items and cleansing.',
      'Mob Prioritization: Quickly eliminate weaker enemies other than Scourge and coordinate well with teammates toward the end to defeat the boss smoothly.',
      'Regeneration Checks: Everyone will inevitably run out of healing items, so in later stages, check teammates\' regeneration abilities to prevent anyone from weakening.',
      'Burst Threshold: With a good selection of damage-dealing abilities, you can defeat Scourge before the final Gargoyle and Ogre appear.',
      'Strongest Weapons: Check the strongest weapon information if struggling to meet DPS requirements.'
    ],
    partyRecommendation: 
      'Balanced 4-Player setup (Red DPS x2, Blue x1, Green x1).\nBecause two players are randomly teleported at damage thresholds, both duos must have enough independent firepower and survival ability to defeat their sub-room trial quickly.',
    troubleWinningAdvice: 
      'See information about the strongest weapons.\nUpgrading weapons to the maximum tier available for IR 27+ ensures the 2-player split teams can burst through isolated trials fast and rejoin the main fight against Scourge.',
    vocationAdvice: {
      fighter: {
        abilities: ['Erosion Resistance', 'Medicinal Properties', 'Effect Extension'],
        notes: 'Help wipe the side spawns (Direwolves, Eliminator) quickly so the tank or casters can focus on Scourge. Use War God\'s Amulet with Effect Extension.'
      },
      warrior: {
        abilities: ['Erosion Resistance', 'Effect Extension', 'Fighting Spirit'],
        notes: 'High burst damage helps push Scourge through HP thresholds quickly, potentially skipping the final Gargoyle and Ogre wave.'
      },
      shieldSage: {
        skills: ['Taunt', 'Sleep Spell', 'Stun Burst'],
        notes: 'Control the wave adds in the main arena and keep Scourge taunted when 2 teammates get teleported away.'
      },
      priest: {
        spells: ['Regeneration', 'Solid Riser', 'Attack Riser'],
        notes: 'Vital role: maintain regeneration fields since potions will run out. Provide anti-invasion support to allies afflicted by erosion.'
      },
      sorcerer: {
        spells: ['Dark Spells', 'Meteor Fall', 'Area Elemental Magick'],
        notes: 'Quickly vaporize weaker minion spawns with large AoEs so Scourge is fought in an empty arena.'
      },
      elementalArcher: {
        skills: ['Healing Arrow', 'Cleanse', 'High-Damage Arrows'],
        notes: 'Exceptional support: can provide long-range healing and erosion cleansing while maintaining steady DPS.'
      }
    },
    remarks: 
      'Teleport Mechanics:\n• You fight Scourge right from the start.\n• Every time a certain amount of damage is inflicted, two random characters are teleported away into a side trial while the remaining two continue fighting Scourge.\n• Side Trial Spawns:\n  - 1st Teleport: Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin, Strix\n  - 2nd Teleport: Ghost Mail or Living Armor, Ghost\n  - 3rd Teleport: Corrupted Gore Cyclops\n• Main Arena Waves (Limited spawns):\n  - First half: Corrupted Snow Harpy & Corrupted Direwolf\n  - Mid-game: Grimwarg & Eliminator\n  - Final stages: Gargoyles & Ogres',
    monstersAppearing: [
      {
        name: 'Scourge (Executor of Distortion)',
        speciesType: 'Demon / Corrupted Executioner',
        weakness: 'Holy / Thunder / Raw DPS',
        coreType: 'Chest / Head Core',
        notes: 'Main boss fought from the start. Teleports 2 random players away at set HP thresholds.'
      },
      {
        name: 'Teleport Trial 1: Hobgoblins & Strix',
        speciesType: 'Demihuman / Bird',
        weakness: 'Fire / Lightning',
        coreType: 'None',
        notes: 'Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin, and Strix. Defeat quickly to reopen the gate.'
      },
      {
        name: 'Teleport Trial 2: Ghost Mail & Ghost',
        speciesType: 'Armor / Ghost',
        weakness: 'Blunt / Holy',
        coreType: 'None',
        notes: 'Ghost Mail or Living Armor, accompanied by Ghosts. Stagger and shatter armor rapidly.'
      },
      {
        name: 'Teleport Trial 3: Corrupted Gore Cyclops',
        speciesType: 'Giant / Corrupted',
        weakness: 'Thunder / Eye Weakpoint',
        coreType: 'Knee / Head Core',
        notes: 'Tough giant in the 3rd teleport room. Burst down the eye to return to the Scourge arena.'
      },
      {
        name: 'Main Arena Wave Foes',
        speciesType: 'Mixed Corrupted Spawns',
        weakness: 'Respective Elemental Weaknesses',
        coreType: 'None',
        notes: 'First half: Corrupted Snow Harpy & Direwolf. Mid-game: Grimwarg & Eliminator. Final: Gargoyles & Ogres (can be skipped with high team DPS).'
      }
    ],
    suppliedItemsText: 'Premium Healing Potion x5, High-Quality Concentrated Garlic Extract x5, Anti-Invasion Potion x5, Invasion Treatment Potion x1, War God\'s Amulet x3, Demon God\'s Amulet x3, Lantern Kindling x10',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Main Arena: Scourge & Phased Minion Spawns',
        enemies: [
          'Scourge',
          'Corrupted Snow Harpy & Corrupted Direwolf (First Half)',
          'Grimwarg & Eliminator (Mid-game)',
          'Gargoyles & Ogres (Final Stages)'
        ],
        tactics: 
          'Time Limit: 15 minutes\nSupplied Items: Premium Healing Potion x5, High-Quality Concentrated Garlic Extract x5, Anti-Invasion Potion x5, Invasion Treatment Potion x1, War God\'s Amulet x3, Demon God\'s Amulet x3, Lantern Kindling x10\n\nAs usual, you\'ll start fighting Scourge right from the beginning. Every time you inflict a certain amount of damage, two random characters will be teleported away. (The remaining two will continue fighting Scourge.)\n\nRegular enemies will appear from the start (only a limited number):\n- First half: Corrupted Snow Harpy & Corrupted Direwolf\n- Mid-game: Grimwarg & Eliminator\n- Final stages: Gargoyles & Ogres\n\nQuickly eliminate the weaker enemies other than Scourge and coordinate well with teammates towards the end. If your team has a good selection of damage-dealing abilities, you can defeat Scourge before the final Gargoyle and Ogre appear!',
        keyTips: [
          'Scourge fought from the beginning.',
          'Two random characters are teleported away at set HP loss thresholds.',
          'Eliminate minion waves immediately: Harpy/Direwolf → Grimwarg/Eliminator → Gargoyle/Ogre.',
          'High party DPS can kill Scourge before Gargoyles & Ogres ever appear.',
          'Monitor teammates\' regeneration since potions will run dry in the late game.'
        ]
      },
      {
        areaNumber: 2,
        title: 'The Destination Trials (Teleport Encounters)',
        enemies: [
          'Trial 1: Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin, Strix',
          'Trial 2: Ghost Mail or Living Armor, Ghost',
          'Trial 3: Corrupted Gore Cyclops'
        ],
        tactics: 
          'The enemies that appear at the teleport destination are as follows:\n- 1st time: Corrupted Hobgoblin Fighter, Corrupted Sling Hobgoblin, Strix\n- 2nd time: Ghost Mail or Living Armor, Ghost\n- 3rd time: Corrupted Gore Cyclops\n\nBoth teleported players should focus fire to rapidly clear the destination trial, then quickly rejoin the remaining two players in the main arena to resume fighting Scourge.',
        keyTips: [
          '1st Teleport: Hobgoblin Fighter, Sling Hobgoblin, Strix (kill Strix first to avoid ATK down).',
          '2nd Teleport: Ghost Mail / Living Armor & Ghost (break armor fast).',
          '3rd Teleport: Corrupted Gore Cyclops (strike eye weakpoint).',
          'Regroup immediately upon returning to maintain full party assault on Scourge.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Distortion Enforcer Restricted Stage (歪みの執行人 限界域) Clear Walkthrough',
        perspective: 'Restricted Stage Clear Walkthrough',
        youtubeVideoId: 'PHTDJ3mKr5k',
        youtubeUrl: 'https://www.youtube.com/watch?v=PHTDJ3mKr5k'
      }
    ]
  },
  {
    id: 'battle-tournament-dragon-slaying',
    name: 'Battle Tournament: Dragon Slaying',
    japaneseName: '闘技会：竜討伐',
    badge: 'EXM 16 • Battle Tournament',
    partySize: '4 Players',
    recommendedLevel: 60,
    itemRankRequirement: 'Standard Battle Tournament equipment',
    timeLimit: 'Tournament Timer',
    minDefense: 'Standard Tournament Defense',
    clearRewards: [
      'One of each key (Extreme Mission Completion Rewards)',
      'First-time reward: Random Crest',
      'Clear Time Rewards (Tiered based on clear speed)'
    ],
    orderConditions: 
      'Abilities that activate based on time or weather conditions are unusable (e.g., " Moon Attack ," " New Attack ," " Rain Attack ," etc.)',
    preparationNotes: 
      'Since the only item available is cloth, medicinal properties and duration of effect are unnecessary.\nThe items you can gather vary depending on your job.\nSince there are many dragon-type monsters, " Dragon Slayer " is essential.',
    specialPreparationTips: [
      'Time/Weather Abilities Disabled: Abilities that activate based on time or weather conditions are unusable (e.g., Moon Attack, New Attack, Rain Attack, etc.).',
      'No Outside Healing Potions: Since the only item available is cloth, medicinal properties and duration of effect are unnecessary.',
      'Gathering by Job: The items you can gather vary depending on your job.',
      'Dragon Slayer Essential: Since there are many dragon-type monsters (Drake, Wyrm, Elder Dragon Blaze), "Dragon Slayer" is essential.',
      'Target Selection (Ignorable White Markers): Only defeat required monsters; ignorable white marker foes (Corrupted Griffin, Harpies, Medusa) can be bypassed or frozen.'
    ],
    partyRecommendation: 
      'Balanced 4-Player setup (Physical DPS, Magical DPS, Healer, Tank/Debuffer).\nA mix of physical and magical damage is essential: Orc Soldiers and Living Armor are weak to physical attacks (high magic resist), while Medusa is weak to magic (high physical resist).',
    vocationAdvice: {
      sorcerer: {
        spells: ['Icicle Pierce', 'Lightning Spells', 'Lock Magick'],
        notes: 'Corrupted Griffins have very low status resistance—freeze them in a single charged hit from Icicle Pierce! On Elder Dragon Blaze, using Lock makes aiming for breaks very easy. Medusa has low magic resistance, so Sorcerers burst her if needed.'
      },
      fighter: {
        abilities: ['Dragon Slayer', 'Physical Damage Boosts'],
        notes: 'Focus directly on high-magic-resist foes: Corrupted Orc Soldiers and Living Armor melt under physical sword combos.'
      },
      warrior: {
        abilities: ['Dragon Slayer', 'Down Extension'],
        notes: 'Deliver huge burst to Drake, Wyrm, and Elder Dragon Blaze. With Down Extension equipped, you can push from 2-3 downs into an extra down phase!'
      },
      shieldSage: {
        skills: ['Ice Enfeeble', 'Lightning Enfeeble', 'Taunt / Sleep'],
        notes: 'Elder Dragon Blaze has a lightning core and is relatively easy to inflict status ailments on (unlike GM). Provide elemental exploit and core control.'
      },
      priest: {
        spells: ['Healing Field', 'Attack Riser', 'Holy / Lightning Magick'],
        notes: 'With only cloth available, the party relies entirely on Priest healing skills and stamina buffs to stay alive and maintain full offensive pressure.'
      },
      hunter: {
        skills: ['Spiral Arrow', 'Rain of Arrows'],
        notes: 'Excellent single-target physical focus on Orcs, Living Armor, and dragon weakpoints from safe range.'
      }
    },
    remarks: 
      'Objective & Wave Targets Table:\n• Wave 1: Required Small: Corrupted Orc Soldier | Ignorable (White Marker): Corrupted Griffin, Corrupted Snow Harpy\n• Wave 2: Required Large: Drake\n• Wave 3: Required Large: Wyrm | Required Small: Living Armor\n• Wave 4: Required Small: Skeleton Brute Bolt | Ignorable (White Marker): Medusa (spawns when Living Armors die)\n• Wave 5: Required Large: Elder Dragon Blaze\n\nDamage & Resistance Logic:\n- Corrupted Orc Soldiers: High magic resistance, low physical resistance.\n- Corrupted Griffins: Low status resistance; frozen in 1 charged hit of Icicle Pierce.\n- Drake: Lightning core.\n- Wyrm: Fire core.\n- Living Armor: High magic resistance, low physical resistance.\n- Medusa: High physical resistance, low magic resistance.\n- Elder Dragon Blaze: Lightning core. Status ailments relatively easy to inflict. 2-3 downs possible (extra down with Down Extension).',
    monstersAppearing: [
      {
        name: 'Elder Dragon Blaze (Final Boss)',
        speciesType: 'Dragon / Elder Sovereign',
        weakness: 'Ice / Thunder / Status Ailments',
        coreType: 'Lightning Core',
        notes: 'Unlike GM, status ailments are relatively easy to inflict. Lightning core. Lock allows easily aiming for a break. 2-3 downs possible (extra down with Down Extension).'
      },
      {
        name: 'Drake (Wave 2 Boss)',
        speciesType: 'Dragonkin',
        weakness: 'Ice / Thunder',
        coreType: 'Lightning Core',
        notes: 'Required large monster in Wave 2. White marker foes continue from wave 1.'
      },
      {
        name: 'Wyrm (Wave 3 Boss)',
        speciesType: 'Dragonkin',
        weakness: 'Ice / Water',
        coreType: 'Fire Core',
        notes: 'Required large monster in Wave 3, fought alongside Living Armor.'
      },
      {
        name: 'Living Armor (Wave 3 Small Target)',
        speciesType: 'Armor / Ghost',
        weakness: 'Physical Attacks / Blunt',
        coreType: 'None',
        notes: 'High magic resistance, low physical resistance. Defeating all Living Armors causes Medusa and Skeleton Brute Bolt to appear.'
      },
      {
        name: 'Skeleton Brute Bolt (Wave 4 Small Target)',
        speciesType: 'Undead / Skeleton',
        weakness: 'Physical / Holy',
        coreType: 'None',
        notes: 'Required target in Wave 4 alongside Medusa.'
      },
      {
        name: 'Medusa (Wave 4 Ignorable White Marker)',
        speciesType: 'Magical Creature',
        weakness: 'Magic Spells / Ice',
        coreType: 'None',
        notes: 'White marker (ignorable). High physical resistance, low magical resistance. Spawns after Living Armor is defeated.'
      },
      {
        name: 'Corrupted Orc Soldier (Wave 1 Target)',
        speciesType: 'Orc / Corrupted',
        weakness: 'Physical Attacks',
        coreType: 'None',
        notes: 'Required target in Wave 1. High magic resistance, low physical resistance.'
      },
      {
        name: 'Corrupted Griffin & Snow Harpy (Wave 1 Ignorable)',
        speciesType: 'Beast / Bird',
        weakness: 'Freeze / Ice / Statuses',
        coreType: 'None',
        notes: 'White marker (ignorable). Corrupted Griffin can be frozen in one charged hit of Icicle Pierce.'
      }
    ],
    suppliedItemsText: 'Only Cloth is available in the arena. Items that can be gathered vary by player vocation.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Phase 1: Corrupted Orc Soldiers & Ignorable Flyers',
        enemies: [
          'Corrupted Orc Soldier (Required)',
          'Corrupted Griffin (Ignorable / White Marker)',
          'Corrupted Snow Harpy (Ignorable / White Marker)'
        ],
        tactics: 
          '● Corrupted Orc Soldiers, Corrupted Harpies, Corrupted Griffins:\n- Corrupted Orc Soldiers have high magic resistance and low physical resistance. Physical attackers should focus them down immediately.\n- Corrupted Griffins have low resistance to all status ailments, to the point where they can be frozen with a single charged hit from Icicle Pierce.\n- Griffin and Harpies have white markers and do not need to be killed to advance.',
        keyTips: [
          'Orc Soldiers have high magic resistance and low physical resistance—physical DPS must kill them.',
          'Griffins freeze in a single charged hit from Icicle Pierce.',
          'Harpies and Griffins have white markers (ignorable).'
        ]
      },
      {
        areaNumber: 2,
        title: 'Phase 2: Drake (Lightning Core)',
        enemies: ['Drake (Required Large)'],
        tactics: 
          '● Drake, white marker continues:\n- Drake has a lightning core.\n- Focus fire down the Drake while keeping any remaining white-marker adds controlled.',
        keyTips: [
          'Drake is the required large target.',
          'Expose and deplete the Lightning core.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Phase 3: Wyrm & Living Armor',
        enemies: [
          'Wyrm (Required Large)',
          'Living Armor (Required Small)'
        ],
        tactics: 
          '● Wyrm & Living Armor ⇒ Medusa & Skeleton Brute Bolt:\n- Wyrm has a fire core.\n- Living Armor has high magic resistance and low physical resistance. Physical classes should burst down Living Armor.\n- Defeating all the Living Armors will trigger Phase 4 (causing Medusa and Skeleton Brute Bolt to appear).',
        keyTips: [
          'Wyrm has a fire core.',
          'Living Armor has high magic resistance and low physical resistance.',
          'Defeating all Living Armor spawns Medusa and Skeleton Brute Bolt.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Phase 4: Skeleton Brute Bolt & Medusa',
        enemies: [
          'Skeleton Brute Bolt (Required Small)',
          'Medusa (Ignorable White Marker)'
        ],
        tactics: 
          '● Medusa & Skeleton Brute Bolt:\n- Medusa has high physical resistance and low magical resistance.\n- Skeleton Brute Bolt is the required target to defeat.\n- If attacking Medusa, casters should handle her with magic, but focus primary DPS on the required Skeleton Brute Bolt to proceed to the final boss.',
        keyTips: [
          'Skeleton Brute Bolt is the required kill target.',
          'Medusa has white marker (ignorable), with high physical resistance and low magic resistance.'
        ]
      },
      {
        areaNumber: 5,
        title: 'Phase 5: Elder Dragon Blaze (Status Down Strategy)',
        enemies: ['Elder Dragon Blaze (Required Boss)'],
        tactics: 
          '● Elder Dragon Blaze:\n- Unlike Grand Missions (GM), status ailments are relatively easy to inflict on Elder Dragon Blaze.\n- Expose its Lightning core.\n- In Sorcerer (Sarah)\'s case, Lock is strongly recommended because you can easily aim for a break with Lock.\n- Depending on your party\'s firepower, you can achieve 2-3 downs. With Down Extension, it\'s possible to get one more down to finish the tournament!',
        keyTips: [
          'Lightning core weakpoint.',
          'Status ailments are relatively easy to inflict compared to GM.',
          'Sorcerers can easily aim for breaks with Lock.',
          'Aim for 2-3 downs; Down Extension can provide an extra down for an easy kill.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Battle Tournament: Dragon Slaying (闘技会：竜討伐) Clear Walkthrough',
        perspective: 'Tournament Clear Walkthrough',
        youtubeVideoId: 'U680f4Bpbjs',
        youtubeUrl: 'https://www.youtube.com/watch?v=U680f4Bpbjs'
      }
    ]
  },
  {
    id: '1st-anniversary-white-dragon-cup',
    name: '1st Anniversary White Dragon Cup',
    japaneseName: '1周年記念 白竜杯',
    badge: 'EXM 17 • Anniversary Cup',
    partySize: '4 Players (Time Attack)',
    recommendedLevel: 55,
    itemRankRequirement: 'Item rank 20 or higher',
    timeLimit: '20 minutes',
    minDefense: 'IR 20+ Equipment',
    clearRewards: [
      'One random reward per day (one of): Power Crest (Modified) x1, Magic Crest (Modified) x1, Defense Crest (Modified) x1, Wisdom Crest (Modified) x1, Stone Crystallization Crest x1, Shining Gold Crest x1',
      'Rewards for clearing the game a second time or later: Premium Healing Medicine (Superior) x 5, Concentrated Chicken Extract (Superior) x 5, All-Purpose Medicine x 3'
    ],
    additionalHelpingRewards: [
      'Crest for minimizing the size of orthotic devices × 1 (Reward for helping with the first clear)'
    ],
    clearTimeRewards: [
      { time: 'Within 5 minutes', reward: 'Blood Orb x 3,000' },
      { time: 'Within 10 minutes', reward: 'Silver Ticket x 100' },
      { time: 'Within 15 minutes', reward: 'Gold x 50,000' },
      { time: 'Complete within the time limit (20 minutes)', reward: 'Orfling Sword [Crimson] ?, Orfling Shell [Crimson] ?' }
    ],
    rankingRewards: [
      { rank: '1st place', reward: "Winner's Crown [I] ? x1, Winner's Mantle [I] ? x1, Gold x10,000,000, Unidentified Moon-Engraved Accessory [King] x10, Dragon Power Key x5, Crystal Key x5, Treasure Key x5, Jewelry Key x5" },
      { rank: '2nd place', reward: "Victor's Crown [II] x1, Victor's Mantle [II] x1, Gold x5,000,000, Unidentified Moon-Engraved Accessory [King] x9, Dragon Power Key x5, Crystal Key x5, Treasure Key x5, Jewelry Key x5" },
      { rank: '3rd place', reward: "Victor's Crown [III] ? x1, Victor's Mantle [III] ? x1, Gold x4,000,000, Unidentified Moon-Engraved Accessory [King] x8, Dragon Power Key x5, Crystal Key x5, Treasure Key x5, Jewelry Key x5" },
      { rank: '4th to 10th place', reward: "Gold x 3,000,000, Unidentified Moon-Engraved Equipment [King] x 7, Dragon Power Key x 5, Crystal Key x 5, Treasure Key x 5, Jewelry Key x 5" },
      { rank: '11th to 50th', reward: "Gold x 2,500,000, Unidentified Moon-Engraved Equipment [King] x 6, Dragon Power Key x 5, Crystal Key x 5, Treasure Key x 5, Jewelry Key x 5" },
      { rank: '51st to 100th', reward: "Gold x 2,000,000, Unidentified Moon-Engraved Equipment [King] x 5, Dragon Power Key x 4, Crystal Key x 4, Treasure Key x 4, Jewelry Key x 4" },
      { rank: '101st to 500th', reward: "Gold x 1,500,000, Unidentified Moon-Engraved Equipment [King] x 4, Dragon Power Key x 3, Crystal Key x 3, Treasure Key x 3, Jewelry Key x 3" },
      { rank: '501st to 1000th place', reward: "Gold x 1,000,000, Unidentified Moon-Engraved Equipment [King] x 3, Dragon Power Key x 2, Crystal Key x 2, Treasure Key x 2, Jewelry Key x 2" },
      { rank: '1001st to 2500th place', reward: "Gold x 500,000, Unidentified Moon-Engraved Equipment [King] x 2, Dragon Power Key x 1, Crystal Key x 1, Treasure Key x 1, Jewelry Key x 1" }
    ],
    orderConditions: 
      'Completed the personal quest <A Heroic Figure Passed Down Through Song> .\nItem rank 20 or higher\nSecret abilities that are affected by time or weather cannot be used.',
    preparationNotes: 
      'The quest itself is balanced so that any job can clear it. However, I think the Sorcerer would be particularly effective.\nSince a large number of weak enemies will appear, it\'s a good idea to have at least one area-of-effect skill equipped (such as Darkness Mist , Crescent Slash , or Rain of Shots ).\nThe "additional monsters" listed below appear at regular intervals, and you can ignore them and proceed. Since there are many of them, check the map icon to determine if you can ignore them.\nPurple monsters must be defeated, while white monsters are newly added monsters that can be ignored. This is a time attack, so you will need to be flexible in deciding whether to ignore or defeat them.',
    specialPreparationTips: [
      'Balanced for All Vocations: The quest itself is balanced so that any job can clear it. Sorcerer is particularly effective with widespread AoE.',
      'Equip Area-of-Effect Skills: Since large numbers of weak enemies appear, bring at least one AoE skill (such as Darkness Mist, Crescent Slash, or Rain of Shots).',
      'Map Marker Rule (Purple vs White): Purple monsters MUST be defeated to advance. White monsters are newly added additions that appear at regular intervals and can be ignored.',
      'Time Attack Strategy: Flexibly decide whether to wipe white monsters with splash damage or completely bypass them to shave down your clear time.',
      'Secret Abilities Inactive: Secret abilities affected by time or weather cannot be used in this arena.'
    ],
    partyRecommendation: 
      'Any job composition can clear this event.\nSorcerers shine brilliantly for rapid clearing of weak mobs with Darkness Mist.\nHigh-clearing physical classes (Warrior with Crescent Slash, Hunter with Rain of Shots) can quickly burst down the required purple targets.',
    vocationAdvice: {
      sorcerer: {
        spells: ['Darkness Mist', 'Meteor Fall', 'Elemental Spells'],
        notes: 'Particularly effective: massive AoE spells wipe the dense swarms of minion spawns instantaneously while you blast down the required purple monsters.'
      },
      warrior: {
        skills: ['Crescent Slash', 'Arc Slice'],
        notes: 'Crescent Slash sweeps clean all surrounding minor mobs while dealing high burst to Corrupted Gore Cyclops, Frost Machina, and Behemoth.'
      },
      hunter: {
        skills: ['Rain of Shots', 'Spiral Arrow'],
        notes: 'Rain of Shots provides wide-angle crowd destruction while Spiral Arrow snipes the core of the required purple boss targets.'
      },
      fighter: {
        skills: ['Dragon Fang', 'Circular Slash'],
        notes: 'Swiftly charges and isolates purple targets, slicing them down while keeping ignored white monsters staggered.'
      },
      shieldSage: {
        skills: ['Force Burst', 'Elemental Enfeeble'],
        notes: 'Enfeebles Frost Machina and Corrupted Behemoth to accelerate party clear speed.'
      },
      priest: {
        spells: ['Attack Riser', 'Solid Riser'],
        notes: 'Attack Riser speeds up mob clearing across the entire party for better ranking time brackets.'
      }
    },
    remarks: 
      'Time Attack Mechanics:\n• Purple monsters must be defeated to advance the battle.\n• White monsters are additional spawns that appear at regular intervals and can be ignored.\n• Evaluate whether to ignore or defeat them with AoE splash to achieve the best ranking bracket (Top 1–3 earn Winner\'s Crowns & Mantles, up to 10M Gold, and King accessories).',
    monstersAppearing: [
      {
        name: 'Battle 1: Corrupted Gore Cyclops (Severe) & Corrupted Hobgoblin Fighter',
        speciesType: 'Giant / Goblin (Purple: Required)',
        weakness: 'Lightning / Eye Weakpoint',
        coreType: 'Knee / Head Core',
        notes: 'Required purple targets. Defeat both to trigger Match 2. Lizardman Sage spawns as an additional ignorable white monster.'
      },
      {
        name: 'Battle 1 Add: Lizardman Sage',
        speciesType: 'Reptile (White: Ignorable)',
        weakness: 'Ice / Physical',
        coreType: 'None',
        notes: 'Additional monster appearing at regular intervals. Can be ignored to save time.'
      },
      {
        name: 'Match 2: Frost Machina & Skeleton Brute Frost',
        speciesType: 'Construct / Undead (Purple: Required)',
        weakness: 'Fire / Strike',
        coreType: 'Core / Chest',
        notes: 'Required purple targets. Defeat both to trigger Match 3. Gargoyle spawns as an additional ignorable white monster.'
      },
      {
        name: 'Match 2 Add: Gargoyle',
        speciesType: 'Demon / Flying (White: Ignorable)',
        weakness: 'Lightning / Holy',
        coreType: 'None',
        notes: 'Additional monster appearing at regular intervals. Can be ignored.'
      },
      {
        name: 'Match 3: Eliminator x2 & Bolt Grimwarg',
        speciesType: 'Giant / Beast (Purple: Required)',
        weakness: 'Holy / Ice / Strike',
        coreType: 'Head Core',
        notes: 'Required purple targets. Two Eliminators and a Bolt Grimwarg. Strix spawns as an additional ignorable white monster.'
      },
      {
        name: 'Match 3 Add: Strix',
        speciesType: 'Bird / Demihuman (White: Ignorable)',
        weakness: 'Fire / Lightning',
        coreType: 'None',
        notes: 'Additional monster appearing at regular intervals. Can be ignored.'
      },
      {
        name: 'Battle 4: Corrupted Behemoth - Danger',
        speciesType: 'Beast / Corrupted Fiend (Purple: Required)',
        weakness: 'Ice / Fire / Horn Weakpoint',
        coreType: 'Mane / Horn Core',
        notes: 'Final battle target! Extreme danger boss. Additional monsters: Corrupted Snow Harpy (severe) & Corrupted Direwolf.'
      },
      {
        name: 'Battle 4 Adds: Corrupted Snow Harpy (Severe) & Corrupted Direwolf',
        speciesType: 'Bird / Beast (White: Ignorable)',
        weakness: 'Fire / Lightning',
        coreType: 'None',
        notes: 'Additional monsters appearing during the final Behemoth encounter. Can be ignored or wiped with AoE splash.'
      }
    ],
    suppliedItemsText: 'Standard supplies with job-dependent gatherables. Cloth available.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Battle 1: Corrupted Gore Cyclops (Severe) & Hobgoblin Fighter',
        enemies: [
          'Corrupted Gore Cyclops (Severe) [Purple - Required]',
          'Corrupted Hobgoblin Fighter [Purple - Required]',
          'Lizardman Sage [White - Additional / Ignorable]'
        ],
        tactics: 
          '● Battle 1:\n- Defeat the purple markers: Corrupted Gore Cyclops (Severe) and Corrupted Hobgoblin Fighter.\n- Additional monster: Lizardman Sage appears at regular intervals. Check your mini-map: this white-marker enemy can be ignored completely to conserve time, or cleaved down if in the splash radius of your AoE attacks.',
        keyTips: [
          'Purple monsters must be defeated to advance.',
          'Lizardman Sage is white-marked and can be ignored.',
          'Blast down the Hobgoblin Fighter first, then focus the Gore Cyclops eye/knee.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Match 2: Frost Machina & Skeleton Brute Frost',
        enemies: [
          'Frost Machina [Purple - Required]',
          'Skeleton Brute Frost [Purple - Required]',
          'Gargoyle [White - Additional / Ignorable]'
        ],
        tactics: 
          '● Match 2:\n- Defeat the purple markers: Frost Machina and Skeleton Brute Frost.\n- Additional monster: Gargoyle appears at regular intervals.\n- Use Fire attacks or Strike damage against the Frost Machina. Ignore the Gargoyle unless it interferes with casting.',
        keyTips: [
          'Frost Machina and Skeleton Brute Frost are required purple targets.',
          'Gargoyle has a white marker and can be ignored.',
          'Exploit Fire element on the Frost Machina.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Match 3: Eliminator x2 & Bolt Grimwarg',
        enemies: [
          'Eliminator x2 [Purple - Required]',
          'Bolt Grimwarg [Purple - Required]',
          'Strix [White - Additional / Ignorable]'
        ],
        tactics: 
          '● Match 3:\n- Defeat the purple markers: two Eliminators and Bolt Grimwarg.\n- Additional monster: Strix appears at regular intervals.\n- Eliminate the Bolt Grimwarg rapidly to prevent mobility disruption, then focus down the two Eliminators. Strix can be ignored.',
        keyTips: [
          'Two Eliminators and one Bolt Grimwarg are required purple targets.',
          'Strix is white-marked and can be ignored.',
          'Use Holy and Strike attacks to stagger the Eliminators.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Battle 4: Corrupted Behemoth - Danger',
        enemies: [
          'Corrupted Behemoth - Danger [Purple - Required Final Boss]',
          'Corrupted Snow Harpy (Severe) [White - Additional / Ignorable]',
          'Corrupted Direwolf [White - Additional / Ignorable]'
        ],
        tactics: 
          '● Battle 4:\n- Final encounter against Corrupted Behemoth - Danger!\n- Additional monsters: Corrupted Snow Harpy (severe) and Corrupted Direwolf appear at regular intervals.\n- Unleash your strongest burst and AoE skills (Darkness Mist, Crescent Slash, Rain of Shots). Let the splash damage handle the Harpy and Direwolf while all primary single-target burst burns down the Behemoth to stop the clock!',
        keyTips: [
          'Corrupted Behemoth - Danger is the final required target.',
          'Corrupted Snow Harpy and Direwolf are white-marked additions that can be ignored or cleaved with AoE.',
          'Aim for sub-5 minute clear to claim Blood Orb x 3,000 and top ranking rewards.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: '1st Anniversary White Dragon Cup (1周年記念 白竜杯) - Sorcerer Day 1 Clear Walkthrough',
        perspective: "Sorcerer's Perspective (Day 1)",
        youtubeVideoId: '6ZQaBashomE',
        youtubeUrl: 'https://www.youtube.com/watch?v=6ZQaBashomE'
      }
    ]
  },
  {
    id: 'lestanias-reminiscences',
    name: "Lestania's Reminiscences",
    japaneseName: 'レスタニア追想',
    badge: 'EXM 18 • Reminiscences',
    partySize: '4 Players',
    recommendedLevel: 60,
    itemRankRequirement: 'Weapons and armor equivalent to level 60 gear',
    timeLimit: '15 minutes',
    minDefense: 'Level 60 Gear',
    clearRewards: [
      'Leze Extract, Elfin Extract, Alchem Extract',
      'Once per day upon first completion (one of): Gem Authentication [Leia] x100, Orb Authentication [Reus] x100, Intangible underwear x1, Intangible underpants x1, Intangible Cloak x1, Intangible cap x1',
      'Upon clearing the game for the second time or later (one of): Gem Authentication [Leia] x20, Orb Authentication [Reus] x20, Intangible underwear x1, Intangible underpants x1, Intangible Cloak x1, Intangible cap x1'
    ],
    additionalHelpingRewards: [
      'Crest for minimizing the size of orthotic devices × 1 (Reward for helping with the first clear)'
    ],
    orderConditions: 
      'Completed the personal quest < Dragon Power Vortex >.',
    preparationNotes: 
      'For equipment, we recommend using weapons and armor equivalent to level 60 gear.\nSpecialize your skills and abilities for EM (Enhanced Monster) use.\nDamage-dealing abilities such as Targeting , Fighting Spirit , Lightning Attack , and Darkness Attack\n(Since there are only 3 healing items, it would be good to have a self-healing ability as well.)\nSince you only have 5 items to restore stamina, it\'s good for Priests to have Energy Spots and for Elemental Archers to have Inspiring Magic Arrows .\nSages or Alchemists should make full use of enchantments and various status effects.\nHumanoid enemies like Diamantes and Leo take double damage from Element Light , making it quite effective.',
    specialPreparationTips: [
      'Level 60 Equipment: Use weapons and armor equivalent to level 60 gear specialized for Enhanced Monster combat.',
      'Essential Damage Abilities: Equip Targeting, Fighting Spirit, Lightning Attack, and Darkness Attack.',
      'Scarce Item Management: Only 3 healing items and 5 stamina restoration items are available. Bring self-healing abilities.',
      'Stamina Support: Priest Energy Spots and Elemental Archer Inspiring Magic Arrows are critical for maintaining stamina without burning items.',
      'Enchants & CC: Sages and Alchemists should exploit elemental enchants and status debuffs (sleep, freeze, delay).',
      'Element Light against Humanoids: Humanoid enemies like Diamantes and Leo take double damage from Element Light.'
    ],
    partyRecommendation: 
      'Blue 1 / Green 1 / Red 2, or Green 1 / Red 3 (If using Red 3, players must switch between different race-slaying and elemental weapons).\nExample: Sage, Priest, Warrior, Warrior (or Fighter/Seeker) with the specified abilities consistently finish with 4–5 minutes remaining.',
    troubleWinningAdvice: 
      'See information about the strongest weapons.\nUpgrading to the highest tier available level 60 gear significantly eases the Amasai Cyclops and Leo fights.',
    vocationAdvice: {
      warrior: {
        skills: ['Arc Slice', 'Crescent Slash'],
        abilities: ['Fighting Spirit', 'Targeting', 'Darkness Attack', 'Lightning Attack'],
        notes: 'Heavy burst DPS. Use Lightning on Golem/Cyclops and Holy/Light on Diamantes/Leo. Great stagger on Mogock and Colossus.'
      },
      priest: {
        spells: ['Energy Spot', 'Attack Riser', 'Solid Riser'],
        notes: 'Energy Spot is crucial due to the strict 5-item stamina limit. Provides continuous party regeneration to cover the 3-item healing limit.'
      },
      elementalArcher: {
        skills: ['Inspiring Magic Arrows', 'Healing Arrow', 'Element Light'],
        notes: 'Inspiring Magic Arrows preserves party stamina. Defense reduction debuff against Armored Cyclops takes effect quickly.'
      },
      shieldSage: {
        skills: ['Enchant Light', 'Sleep Spell', 'Freeze Burst'],
        notes: 'Put Chimera to sleep to take down Boldbanger Golem first. Repeatedly apply freeze, sleep, delay, and defense reduction to Leo.'
      },
      alchemist: {
        skills: ['Elemental Enfeeble', 'Imbue Light'],
        notes: 'Full use of enchantments and status effects. Freeze and delay work repeatedly on humanoid bosses like Diamantes and Leo.'
      },
      fighter: {
        skills: ['Dragon Fang', 'Circular Slash'],
        abilities: ['Targeting', 'Fighting Spirit'],
        notes: 'Fast single-target physical bursts on the Rogues, Mogock, and Diamantes.'
      }
    },
    remarks: 
      'Walkthrough Flow:\n• Stage 1: Goblin Vanguards, Killer Bee Invaders, Orc Invaders (Lv55)\n• Stage 2: Goblin Eater Chimera (Lv55) & Boldbanger Golem (Lv55) (Sleep Chimera, kill Golem first)\n• Stage 3: Orc Soldier (Lv55), Guard Colossus (Lv55), Mogock (Lv60) (Colossus core in legs or chest)\n• Stage 4: Diamantes (Humanoid Form). Spawns mutated Damned Goblins/Wolves at low HP, then Alchemy wolves/goblins/harpies. Weaker enemies can be bypassed once Diamantes falls!\n• Stage 5: Orc Invaders (Lv60) & Black Wolf Rogues (Lv60) in entrance and SW/SE side rooms\n• Stage 6: Fortress-Breaking Armored Cyclops (Lv60) & Summoned Fang Dragon (Lv60) (Use defense reduction on Cyclops; Behemoth/Fang Dragon goes down easily)\n• Stage 7: Leo (Lv60) (Takes 2x from Element Light; repeated freeze, sleep, delay, defense reduction apply indefinitely!)',
    monstersAppearing: [
      {
        name: 'Leo (Lv60 Final Boss)',
        speciesType: 'Humanoid Boss',
        weakness: 'Element Light (2x Damage) / Freeze / Sleep / Delay',
        coreType: 'Chest / Head Core',
        notes: 'Final boss of the quest. Status effects are easily inflicted. Freeze, sleep, delay, and defense reduction are highly effective and can be applied repeatedly.'
      },
      {
        name: 'Diamantes (Humanoid Form)',
        speciesType: 'Humanoid Boss',
        weakness: 'Element Light (2x Damage) / Holy',
        coreType: 'Chest Core',
        notes: 'Takes double damage from Element Light. Spawns waves of mutated and alchemy adds as HP drops. When Diamantes dies, you can proceed without clearing the adds.'
      },
      {
        name: 'Fortress-Breaking Armored Cyclops (Lv60)',
        speciesType: 'Giant / Armored',
        weakness: 'Lightning / Defense Reduction',
        coreType: 'Knee Core',
        notes: 'Extremely tough Amasai. If using Elemental Archer or Alchemist, apply defense reduction immediately to soften its armor.'
      },
      {
        name: 'Summoned Fang Dragon / Behemoth (Lv60)',
        speciesType: 'Beast / Dragonkin',
        weakness: 'Ice / Lightning',
        coreType: 'Mane / Horn Core',
        notes: 'Fought alongside Armored Cyclops. Much easier to defeat—kill this target first before focusing Cyclops.'
      },
      {
        name: 'Guard Colossus (Lv55) & Mogock (Lv60)',
        speciesType: 'Giant / Orc Leader',
        weakness: 'Lightning / Holy',
        coreType: 'Random (Legs or Chest)',
        notes: 'Colossus core is randomly located in either the legs or the chest. Mogock commands the Orc Soldiers.'
      },
      {
        name: 'Goblin Eater Chimera (Lv55) & Boldbanger Golem (Lv55)',
        speciesType: 'Chimera / Construct',
        weakness: 'Ice (Chimera) / Lightning (Golem)',
        coreType: 'Tail / Core Medallions',
        notes: 'Put Chimera to sleep with Sage or sleep arrows, and burn down Boldbanger Golem first.'
      },
      {
        name: 'Orc Invaders & Black Wolf Rogues (Lv60)',
        speciesType: 'Orc / Human Rogue',
        weakness: 'Physical / Fire',
        coreType: 'None',
        notes: 'Orcs guard the entrance. Rogues are in the small rooms to the southwest and southeast (two rogues per room, randomly selected).'
      },
      {
        name: 'Mutated & Alchemy Wave Adds (Lv60)',
        speciesType: 'Mutated / Alchemical Beasts',
        weakness: 'Light / Physical',
        coreType: 'None',
        notes: 'Damned Goblin Fighters, Damned Wolves, Alchemy Wolves, Alchemy Goblins, and Alchemy Harpies. Can be bypassed once Diamantes falls.'
      }
    ],
    suppliedItemsText: 'Only 3 Healing Items and 5 Stamina Restoration Items provided.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Area 1: Entrance Vanguard Mobs (Lv55)',
        enemies: [
          'Goblin Vanguards (Lv55)',
          'Killer Bee Invaders (Lv55)',
          'Orc Invaders (Lv55)'
        ],
        tactics: 
          'Defeat Goblin Vanguards (Lv55), Killer Bee Invaders (Lv55), and Orc Invaders (Lv55) at the entrance to open the gates to the first boss chamber.',
        keyTips: [
          'Clear minor vanguard mobs with wide AoE attacks.',
          'Conserve healing and stamina items for later bosses.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Area 2: Goblin Eater Chimera & Boldbanger Golem (Lv55)',
        enemies: [
          'Goblin Eater Chimera (Lv55)',
          'Boldbanger Golem (Lv55)'
        ],
        tactics: 
          'Defeat Goblin Eater Chimera (Lv55) and Boldbanger Golem (Lv55).\nIf you\'re going to split them up, it\'s easier to put the Chimera to sleep and defeat the Golem first. Strike the Golem\'s glowing medallions with blunt/physical attacks.',
        keyTips: [
          'Put Chimera to sleep to isolate the Golem.',
          'Focus down Boldbanger Golem first.',
          'Wake and finish Chimera with Ice attacks.'
        ]
      },
      {
        areaNumber: 3,
        title: 'Area 3: Orc Soldier, Guard Colossus, and Mogock',
        enemies: [
          'Orc Soldier (Lv55)',
          'Guard Colossus (Lv55)',
          'Mogock (Lv60)'
        ],
        tactics: 
          'Defeat the Orc Soldier (Lv55), the Guard Colossus (Lv55), and Mogock (Lv60).\nThe Colossus\'s core is randomly located in either the legs or the chest—check its location as soon as it enters enrage state.',
        keyTips: [
          'Colossus core is randomly in either the legs or chest.',
          'Wipe Orc Soldiers quickly, then stagger Mogock.',
          'Shatter Colossus armor with Lightning and blunt force.'
        ]
      },
      {
        areaNumber: 4,
        title: 'Area 4: Diamantes (Humanoid Form) & Corrupted Adds',
        enemies: [
          'Diamantes (Humanoid Form)',
          'Mutated Damned Goblin Fighters (Lv60) & Damned Wolves (Lv60)',
          'Alchemy Wolf, Alchemy Goblin, Alchemy Harpy (Lv60)'
        ],
        tactics: 
          'Defeat Diamantes (humanoid form).\nHumanoids take 2x damage from Element Light!\nWhen you reduce Diamantes\' HP, numerous mutated Damned Goblin Fighters (Lv60) and mutated Damned Wolves (Lv60) will appear.\nIf you reduce its HP further, Alchemy Wolf (Lv60), Alchemy Goblin Fighter (Lv60), and Alchemy Harpy (Lv60) will also appear.\nIMPORTANT: You can proceed to the next area without defeating the weaker enemies as soon as Diamantes dies!',
        keyTips: [
          'Diamantes takes double damage from Element Light.',
          'Waves of mutated and alchemy adds spawn at HP thresholds.',
          'You can immediately proceed to the next area once Diamantes is dead—do not waste time killing the adds.'
        ]
      },
      {
        areaNumber: 5,
        title: 'Area 5: Courtyard Orcs & Secret Rogue Rooms',
        enemies: [
          'Orc Invaders (Lv60)',
          'Black Wolf Rogues (Lv60) [Southwest & Southeast Rooms]'
        ],
        tactics: 
          'Defeat all Orc Invaders (Lv60) and Black Wolf Rogues (Lv60).\nThere are orcs at the entrance, and rogues in the small rooms to the southwest and southeast.\nThere are two rogues in each room, randomly selected. Sweep both side chambers clean.',
        keyTips: [
          'Orcs are at the main entrance.',
          'Two rogues are located in the southwest room, and two in the southeast room.',
          'Clear all rogues to unlock the path to the heavy siege beasts.'
        ]
      },
      {
        areaNumber: 6,
        title: 'Area 6: Fortress-Breaking Armored Cyclops & Summoned Fang Dragon',
        enemies: [
          'Fortress-Breaking Armored Cyclops (Lv60)',
          'Summoned Fang Dragon / Behemoth (Lv60)'
        ],
        tactics: 
          'Defeat the Fortress-Breaking Armored Cyclops (Lv60) and the Summoned Fang Dragon (Lv60).\nThis Amasai Cyclops is very tough. If you\'re using Elemental Archer or Alchemist, don\'t forget to reduce its defense—it\'ll take effect quickly!\nThe Fang Dragon / Behemoth isn\'t so bad, so it\'s easier if you defeat him first before focusing down the Cyclops.',
        keyTips: [
          'Amasai Cyclops is extremely tough—apply defense reduction immediately.',
          'Fang Dragon / Behemoth goes down easily; defeat him first.',
          'Exploit Lightning element on the Cyclops core once isolated.'
        ]
      },
      {
        areaNumber: 7,
        title: 'Area 7: Final Showdown - Leo (Lv60)',
        enemies: ['Leo (Lv60)'],
        tactics: 
          'The quest is cleared when you defeat Leo (Lv60) at the end.\nHumanoid enemy: takes double damage from Element Light!\nStatus effects are easily inflicted. Freeze, sleep, delay, and defense reduction are also effective.\nUnlike standard giant monsters, these status effects can be applied repeatedly! Keep Leo continuously locked down with crowd control and blast him with Light element.',
        keyTips: [
          'Takes double damage from Element Light.',
          'Status effects (Freeze, Sleep, Delay, DEF Down) can be applied repeatedly without diminishing returns.',
          'Keep Leo CC-locked to complete the quest with 4-5 minutes remaining.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: "Lestania's Reminiscences (レスタニア追想) - Warrior Walkthrough",
        perspective: 'Warrior Perspective',
        youtubeVideoId: '24IjFhy8kzg',
        youtubeUrl: 'https://www.youtube.com/watch?v=24IjFhy8kzg'
      },
      {
        title: "Lestania's Reminiscences (レスタニア追想) - Priest Walkthrough",
        perspective: 'Priest Perspective',
        youtubeVideoId: 'sAZ1nOIlKCs',
        youtubeUrl: 'https://www.youtube.com/watch?v=sAZ1nOIlKCs'
      },
      {
        title: "Lestania's Reminiscences (レスタニア追想) - Elemental Archer Walkthrough",
        perspective: 'Elemental Archer Perspective',
        youtubeVideoId: '54wk4kiMJ3U',
        youtubeUrl: 'https://www.youtube.com/watch?v=54wk4kiMJ3U'
      }
    ]
  },
  {
    id: 'awakened-dragon',
    name: 'Awakened Dragon',
    japaneseName: '覚醒せし竜',
    badge: 'EXM 19 • 8-Player Raid',
    partySize: '8 Players',
    recommendedLevel: 75,
    itemRankRequirement: 'Other than Priest: IR75 weapon (80+ weapon) or Lightbreak Gacha weapon (with Dragon Slayer Crest 3 x3-4 stacked), Sage: IR75 rod',
    timeLimit: '20 minutes',
    minDefense: 'IR 75+ Raid Armor',
    clearRewards: [
      'Spirit Dragon Wilmia Materials & Dragon Power Keys',
      'First Clear: High-Rank Dragon Slayer Crests & Rare Crafting Materials'
    ],
    orderConditions: 
      'Completed Season 2.3 Main Quest & Pre-requisite Raids.\nItem rank 75 or higher.',
    preparationNotes: 
      'Walkthrough\nNow that the nerfs and other adjustments have been made, it\'s easier to clear the dungeon even without a Sage or Sorcerer.\nThe biggest change is the introduction of the High Scepter, which possesses both physical and magical attacks and can ignore the mechanics where only magic works against the "Power-Destroying Dragon Crystal" and only physical attacks work against the "Magic-Destroying Dragon Crystal."\n\nAs a result, while Sages and Sorcerers capable of magic attacks were previously considered essential, they are no longer as necessary.\nFurthermore, since High Scepter is a popular job, it\'s become much easier to find groups and more accessible.\n\nAlso, while the High Scepter\'s positioning and knockdown damage are limited to the Spirit Dragon Wilmia, its rapid-fire multi-lock attacks with Dim Slice are overwhelmingly powerful, making it very reliable if someone knows how to use it.\n⇒ If there are multiple High Scepters, they can quickly bring Wilmia down to a single knockdown during a major knockdown, effectively ignoring all of its mechanics.\n\nThe following is an article from when it was implemented (Season 2.3).\n\nStructure, etc.\n2018 Version: To counter field attacks, it\'s helpful to have jobs like Sage (HOG), Alchemist (Barial), Priest (withstand attacks with Solid Heal, Solace, etc.), and Spirit Lancer (withstand attacks with Wall, Cure, etc.).\nHaving a Blue Mage who can guide the boss to trigger the "Memory of Groan" gimmick makes things easier. If there isn\'t one, everyone should stick together to guide the boss. If everyone doesn\'t understand the detonation gimmick, it will be activated by mistake and will hinder smooth progress.\nTo counter the Dragon Crystal of Destruction, which is weak to magic and resistant to physical attacks, jobs that can use magic attacks ⇒ Sage, Sorcerer, Elemental Archer, High Scepter are helpful.\nSage and High Scepter, which can attack both physical and magically, are especially reliable.\nHowever, physical attacks are not completely ineffective, so if there are many high-level Red Mages with near-cap damage and many who understand the gimmicks, you can brute-force your way through the Dragon Crystal of Destruction even with a physical Red Mage-centric party.\n\nExample composition: HOG Sage, Priest, 1-3 Magic Attack slots (e.g., Sarah), 3-5 Physical Attack slots, etc.\nExample 1: HOG Sage, Quick Charge Solid Attack Priest, 2-4 Annihilation Warriors, 1-3 Sorcerers, 0-2 other physical attackers. (Alternatively, 1 Elementalist for the Sorcerer slot, and 0-2 physical attackers for sealing, Hunter, or horn destruction are also acceptable.)\nA standard configuration. All parts can be destroyed, and the Konpeito (Groaning Dragon Crystal) can be destroyed quickly with waiting Annihilation or powerful magic, and the damage from knockdown with Quick Annihilation and Meteor is stable.\nExample 2: HOG Sage, 2 Priests, 5 Sarahs (or 1-2 Physical Attackers)\nThe Priests can use Energy Spike and Quick Charge within the HOG, and the Sarahs can use Meteor and Flame Wall to easily clear the stage.\n\nRequired equipment and abilities\nOther than Priest: IR75 weapon (80+ weapon) or Lightbreak Gacha weapon (with Dragon Slayer Crest 3 x3-4 stacked), Sage: IR75 rod\nRequired level: Strength/Magic Power Increase Abilities, Dragon Slayer, Fire Attack, Heavy Step, (* Crafting Slayer, Dark Attack) *Sarah can be removed.\nUseful to have: (* Piercing Walk * and Prisara are essential) Dragon Protection, Lightning Resistance, Effect Extension, Strengthening',
    specialPreparationTips: [
      'High Scepter Meta: Has both physical and magical attacks, ignoring the Power-Destroying / Magic-Destroying Dragon Crystal damage type locks. Dim Slice multi-lock tears through Wilmia during knockdowns.',
      'Hands of God & Defense Walls: Sage Hands of God (HOG), Alchemist Barial, Priest Solid Heal/Solace, and Spirit Lancer Wall/Cure protect against arena earthquakes and lightning field damage.',
      'Memory of Groan Gimmick: Guide the boss cleanly or stick together. When Wilmia enrages and charges, hit the crystal turning green at the precise moment to deplete stamina.',
      'Crystal Mechanics: Magic damage is required for Power-Destroying Dragon Crystals; Physical damage is required for Magic-Destroying Dragon Crystals. Both are weak to Dark and Creation, but immune to Lightning!',
      'Lethal Shockwave: Failure to destroy the dual crystals in time results in a circular arena-wide shockwave blowing players off the floating islands. Survive inside HOG/Barial or adjust knockback vectors.',
      'Part Breaks (Horns, Wings, Tail): Warrior Heaven-Shattering Blade and Sorcerer Haze/Pierce reliably destroy wings and tail without falling.',
      'Buff Items: Bring meat and alcohol buffs—they remain fully effective even when at the base attack cap.'
    ],
    partyRecommendation: 
      '8-Player Raid Setup:\n• Modern High Scepter Comp: High Scepters + Support (Priest / Sage). Multiple High Scepters melt Wilmia down to a single knockdown phase.\n• 2018 Standard Composition: HOG Sage, Quick Charge Solid Attack Priest, 2-4 Annihilation Warriors, 1-3 Sorcerers, 0-2 other physical attackers.\n• Caster Stack: HOG Sage, 2 Priests, 5 Sorcerers (Meteor & Flame Wall inside HOG with Quick Charge).',
    troubleWinningAdvice: 
      'If you still can\'t defeat it after all that, it\'s either a mistake in the mechanics or simply insufficient firepower.\nPrepare IR75 weapons, the essential abilities mentioned above (Dragon Slayer, Fire Attack, Heavy Step), buff items (meat and alcohol), and a Dragon Cleric before attempting this.',
    vocationAdvice: {
      highScepter: {
        skills: ['Dim Slice', 'Back Leap', 'Rustle Edge'],
        abilities: ['Dragon Slayer', 'Fire Attack', 'Heavy Step', 'Strengthening'],
        notes: 'Top tier for this raid! Possesses both physical and magical damage, completely bypassing the crystal immunity shields. Dim Slice multi-lock deals catastrophic knockdown DPS.'
      },
      shieldSage: {
        skills: ['Hands of God (HOG)', 'Pierce Step', 'Enchant Fire'],
        abilities: ['Heavy Step', 'Dragon Protection', 'Effect Extension'],
        notes: 'Hands of God (HOG) is vital for party survival during the earthquake and lightning crystal phase. Pierce Step ensures anchor bursts are not interrupted.'
      },
      priest: {
        skills: ['Solid Riser', 'Quick Charge', 'Energy Spike', 'Solid Heal'],
        abilities: ['Piercing Walk', 'Dragon Protection', 'Lightning Resistance'],
        notes: 'Maintain Solid Riser during lightning earthquakes. Quick Charge in HOG allows Warriors and Sorcerers to annihilate crystals and bosses.'
      },
      sorcerer: {
        skills: ['Meteor Fall', 'Flame Wall', 'Black Haze', 'Icicle Pierce', 'Blizzard Arrow'],
        abilities: ['Piercing Walk', 'Dragon Slayer', 'Fire Attack', 'Heavy Step'],
        notes: 'Target wings and tail with Haze or Pierce. Destroy adjacent Power-Destroying crystals with Blizzard Arrow. Meteor inside HOG provides massive knockdown burst.'
      },
      warrior: {
        skills: ['Heaven-Shattering Blade', 'Great Fang Gouge', 'Annihilation'],
        abilities: ['Dragon Slayer', 'Fire Attack', 'Heavy Step', 'Fighting Spirit'],
        notes: 'Heaven-Shattering Blade hits the wings. Great Fang Gouge breaks horns and tail. Quick Annihilation during knockdown delivers massive damage.'
      },
      alchemist: {
        skills: ['Barial', 'Imbue Fire', 'Elemental Enfeeble'],
        abilities: ['Dragon Slayer', 'Dragon Protection', 'Effect Extension'],
        notes: 'Barial shields the party from field damage. Apply Fire resistance reduction and physical/magical defense down.'
      },
      hunter: {
        skills: ['Invasion Arrow', 'Sealing Arrow'],
        abilities: ['Dragon Slayer', 'Heavy Step'],
        notes: 'Invasion Arrow combined with Sealing Arrow effectively inflicts Seal status on the Memories of Groaning.'
      },
      elementalArcher: {
        skills: ['Defensive Magic Bow', 'Fire Magic Bow', 'Healing Arrow'],
        abilities: ['Dragon Slayer', 'Fire Attack'],
        notes: 'Substitute for magic user. Contribute firepower by maintaining 3 Fire magic bows at key moments and reducing boss defenses.'
      }
    },
    remarks: 
      'remarks\nBe sure to bring buff items such as meat and alcohol. Even against lower-level EMs that have reached their attack power cap, the meat and alcohol buffs are effective.\nEffective status effects include delay, burning, reduced fire resistance, and reduced physical/magical defense.\nSeal is recommended for "Memories of Groaning" (Hunters can be effective with fan-type attacks using Invasion Arrow + Sealing Arrow).\nEven without a Hunter, you can adequately cope by sealing the Priest, or by using other jobs to equip weapons with sealed crests.\nSince it\'s difficult to gather Sarah, if you include Ele as a substitute for a magic user, contribute to firepower by using defensive magic bows or maintaining three fire magic bows at key moments.\nOf course, in that case, Ele should be built with a focus on firepower.\nPower Destruction can be used effectively even with just one Sage and one Sarah, as long as they are working properly.\nIn that case, Sarah should immediately destroy the two adjacent Power Destruction spells with Blizzard Arrow, and Sage should use Pierce Step to ensure that the anchor is not interrupted and be able to fire more bursts.\n\nWhen destroying all parts:\nFaishika is good for clinging to its horns and tail and using powerful charged slashes, or for using its flame armor and performing chaotic slashes, and for the hunter to assist in breaking each part, but...\nThe Heaven-Shattering Blade can be attached to the Warrior\'s wings, and when clinging to the tail or horns, the Great Fang Gouge or the Heaven-Shattering Blade can be used on the horns as a sufficient substitute. Therefore, the Hunter Faishika slot is not necessary.\nSorcerers can easily target the wings and tail with Haze or Pierce. Since there\'s less risk of falling to your death, aiming for the tail is a good strategy.\nWith Blizzard Arrow, the attack tends to hit weak points (destructible parts are highlighted in yellow), and the damage often comes first, making it easy to fail to destroy the weak point.',
    monstersAppearing: [
      {
        name: 'Wilmia the spirit dragon (精霊竜ウィルミア)',
        speciesType: 'Spirit Dragon (8-Player Raid)',
        weakness: 'Fire / Dark / Creation / Part Breaks',
        coreType: 'Chest Core / Horns / Wings / Tail',
        notes: 'Wilmia the spirit dragon (Memory of the Tree). Enters an enraged state summoning "Growling Memory" and dual Dragon Crystals of Destruction. Lightning is ineffective against crystals.'
      }
    ],
    suppliedItemsText: 'Brought by players: IR75+ Weapons, Dragon Slayer Crests 3, Meat & Alcohol Buffs, Stamina/Healing pots.',
    walkthroughAreas: [
      {
        areaNumber: 1,
        title: 'Phase 1: Enraged State & The "Growling Memory" Gimmick',
        enemies: ['Spirit Dragon Wilmia (Enraged)'],
        tactics: 
          'You will fight one of the Tree\'s Memories (Spirit Dragon Wilmia).\nJust like in the main quest, when Wilmia enters its enraged state, destroy the "Growling Memory," and when Wilmia charges, hit the crystal that turns green.\nIf you don\'t hit it at the right time, you will have to destroy the crystal again, which will prolong the battle.\nThe light generated when you attack the crystal will deplete Wilmia\'s stamina, so everyone needs to understand the mechanics.\n*Attack with Dark and Creation are effective against the crystal, but Lightning is ineffective.\nHaving a Blue Mage who can guide the boss to trigger the "Memory of Groan" gimmick makes things easier. If there isn\'t one, everyone should stick together to guide the boss. If everyone doesn\'t understand the detonation gimmick, it will be activated by mistake and will hinder smooth progress.',
        keyTips: [
          'Destroy "Growling Memory" during enraged state.',
          'Hit the green crystal when Wilmia charges to release light and drain stamina.',
          'Dark and Creation attacks damage the crystal; Lightning is ineffective.',
          'Stick together or designate a guide so the detonation is not triggered prematurely.'
        ]
      },
      {
        areaNumber: 2,
        title: 'Phase 2: Power & Demon Destruction Crystals & Shockwave Survival',
        enemies: [
          'Power-Destroying Dragon Crystal (Magic Weakness)',
          'Demon-Destroying Dragon Crystal (Physical Weakness)'
        ],
        tactics: 
          'In the middle of the fight, two large crystals of each type will appear and begin to gather power.\n(At this time, lightning damage will be applied and earthquakes will occur, so Priests should maintain Solid Riser, and Sarahs should attack with Haze if they don\'t have Pierce Step.)\nDestroy them all quickly and aim to knock them down. If you can\'t destroy them in time, almost everyone will be blown off the stage.\n\nA shockwave will come in a circle from Wilmia\'s center, so you can sometimes survive by calculating your knockback location and adjusting your position so that you are blown onto an island. It is also possible to withstand the attack inside HOG (Hands of God) or Barial.\n\n*Damage Rules:\n• Magic is effective against "Power Destruction Dragon Crystal"\n• Physical attacks are effective against "Demon Destruction Dragon Crystal"\n• High Scepter deals both types and can destroy either crystal freely!\n\nIf you can\'t defeat it, repeat the above steps. If things go smoothly, you\'ll have room for one more set plus a little extra.\nBe careful, as the number of dragon crystals increases the second time around. Priests should use Solid and Sages should use Burst to destroy the Power Annihilation.',
        keyTips: [
          'Magic is effective on Power Destruction Dragon Crystal.',
          'Physical attacks are effective on Demon Destruction Dragon Crystal.',
          'High Scepter can attack both physically and magically, bypassing the lock.',
          'Priest Solid Riser + Sage HOG protects against lightning/earthquakes.',
          'Lethal circular shockwave blows players off the arena if crystals aren\'t destroyed.'
        ]
      }
    ],
    referenceVideos: [
      {
        title: 'Awakened Dragon (覚醒せし竜) - Spirit Dragon Wilmia Walkthrough',
        perspective: '8-Player Raid Perspective',
        youtubeVideoId: 'Ppgoi8lwBUM',
        youtubeUrl: 'https://www.youtube.com/watch?v=Ppgoi8lwBUM'
      }
    ]
  }
];





