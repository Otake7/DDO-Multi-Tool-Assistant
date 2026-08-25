export interface SkillDataDef {
  skillNo: number;
  name: string;
  jpName?: string;
  element?: 'Slash' | 'Strike' | 'Shot' | 'Pierce' | 'Fire' | 'Ice' | 'Thunder' | 'Holy' | 'Dark' | 'None';
  staminaCost?: string;
  unlockLevel: number;
  maxRank: number;
  description: string;
  reqLevels: number[]; // e.g. [0, 3, 6, 9, 12, 15, 0, 0, 0, 0]
  jpCosts: number[];   // e.g. [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
}

export interface AugmentDataDef {
  skillNo: number;
  name: string;
  jpName?: string;
  unlockLevel: number;
  maxRank: number;
  ppCost: number;
  description: string;
  effect: string;
  reqLevels: number[];
  jpCosts: number[];
}

export interface NormalSkillDataDef {
  skillNo: number;
  name: string;
  jpName?: string;
  unlockLevel: number;
  maxRank: number;
  description: string;
  reqLevels: number[];
  jpCosts: number[];
}

// 1. FIGHTER (片手剣・盾)
export const FIGHTER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Blink Strike',
    jpName: '一閃突き',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Lunges forward at high velocity, piercing through enemies in a straight line with knockdown.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Cymbal Attack',
    jpName: 'シンバルアタック',
    element: 'Strike',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Slams the shield against the sword or foe in a loud burst, staggering foes and shaving rage.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Skyward Lash',
    jpName: '天蓋斬り',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Leaps upward with a sweeping high-angle vertical slash aimed at airborne enemies and monster weak points.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Tusk Toss',
    jpName: '刀牙昇斬',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Ferocious rising upward strike launching lightweight foes into the air.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Sheltered Spike',
    jpName: 'シールドスパイク',
    element: 'Pierce',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Thrusts forward repeatedly from behind the safety of the shield, maintaining guard while attacking.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Compass Slash',
    jpName: '円月斬り',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Spins in a 360-degree whirlwind arc with extended invulnerability during the blade rotation.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Hindsight Slash',
    jpName: '受け流し斬り',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Evades backward before delivering a crushing counter-slash with high knockdown multiplier.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Gouging Slash',
    jpName: 'えぐり突き',
    element: 'Pierce',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Drives the blade deep into a mounted monster target and viciously gouges back and forth.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: "Dragon's Maw",
    jpName: 'センテンス / ドラゴンズモウ',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Unleashes a ferocious multi-hit sword combo ending with an explosive shockwave finisher.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Goring Sweep',
    jpName: '豪溜斬り',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Heavy charged great slash that slices through armored monster parts with massive break force.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Braver',
    jpName: 'ブレイバー',
    element: 'Slash',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Master combat art delivering a transcendent leap and devastating shockwave ground slam.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 2. HUNTER (弓・ダガー)
export const HUNTER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Direct Shot',
    jpName: '連なり射ち',
    element: 'Shot',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Rapid multi-arrow burst shot in rapid succession into a single point.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Spout Shot',
    jpName: '扇射ち',
    element: 'Shot',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Fires a wide fan of arrows covering a broad horizontal cone for crowd control.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Torrent Shot',
    jpName: '降らし射ち',
    element: 'Shot',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Lobs a shower of arrows into the air that rains continuously onto the target area.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Spiral Arrow',
    jpName: '渦巻き射ち',
    element: 'Shot',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Drilling spinning arrow that pierces multiple times through large monster hitboxes.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Exploding Arrow',
    jpName: '爆ぜ矢',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Attaches an explosive tip arrow that detonates on impact or when triggered.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Piercing Arrow',
    jpName: '貫き矢',
    element: 'Shot',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Charged high-penetration arrow that cuts cleanly through multiple enemies in line.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Bleed Arrow',
    jpName: '鬼寄せ / 剛力射ち',
    element: 'Shot',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Inflicts heavy bleeding and stamina exhaustion on monster joints.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Arrow Rain',
    jpName: '紅蓮爆矢',
    element: 'Fire',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Massive barrage of incendiary arrows blanketing an entire monster battlefield.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Swift Shot',
    jpName: '逆さ射ち',
    element: 'Shot',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Acrobatic backflip arrow release with instant repositioning and i-frames.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Arrow Storm',
    jpName: '矢嵐',
    element: 'Shot',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Maximum velocity continuous bow fire shredding through downed monster health bars.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Comet Shot',
    jpName: '天穹射ち',
    element: 'Shot',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Hyper-velocity sky arrow that accelerates with gravitational force to devastate the target.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 3. PRIEST (杖・聖杖)
export const PRIEST_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Healing Spot',
    jpName: 'ヒーリングスポット',
    element: 'Holy',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Generates a restorative holy zone on the ground that heals allies and cleanses debuffs.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Guard Bit',
    jpName: 'ガードビット',
    element: 'Holy',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Summons floating holy orbs around the caster that automatically absorb incoming attacks.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Holy Shield',
    jpName: 'セイントオーラ',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Envelops the target in a barrier of holy radiance reducing physical and magic damage.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Aura Field',
    jpName: 'オーラフィールド',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Expands a pulsating holy field granting continuous stamina regeneration to nearby party members.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Energy Burst',
    jpName: 'エナジーバースト',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Condenses holy spirit energy into an offensive beam that detonates on contact.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Zone Healing',
    jpName: 'クイックチャージ',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Chants a high-speed instant recovery sphere restoring massive HP in emergencies.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Sol Protection',
    jpName: 'ソリッドライザー',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Erects an unbreakable sacred ward protecting party members against stagger and blowback.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Holy Wall',
    jpName: 'アタックライザー',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Channels divine power into party weapons, granting massive physical and magick attack boost.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Divine Wave',
    jpName: 'ディバインプロテクション',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Emits a blinding holy shockwave that knocks down foes and grants invulnerability frames to allies.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Sacred Shine',
    jpName: 'セラフィムフラップ',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Calls down heavenly seraphic rays that continuously scorch enemy dark cores.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Holy Ray',
    jpName: 'ホーリーレイ',
    element: 'Holy',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Focuses holy light into a devastating solar pillar causing colossal holy damage.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 4. SHIELD SAGE (大盾・ロッド)
export const SHIELD_SAGE_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Stun Burst',
    jpName: 'フォースシールド',
    element: 'Strike',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Discharges stored shield force into an explosive shockwave that stuns surrounding enemies.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Shield Bash',
    jpName: 'シールドバッシュ',
    element: 'Strike',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Slams the colossal greatshield forward, inflicting massive impact stagger and drawing aggro.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Force Burst',
    jpName: 'フォースバースト',
    element: 'Strike',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Releases concentrated elemental force stored in the greatshield directly into the monster.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Guard Field',
    jpName: 'シールドガード',
    element: 'None',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Projects an expansive protective dome absorbing monster breath attacks and ranged projectiles.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Taunt / Attract',
    jpName: 'アトラクト',
    element: 'None',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Emits a resonant challenge wave drawing absolute monster hostility onto the Shield Sage.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Element Enchant',
    jpName: 'エンチャント',
    element: 'None',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Imbues the weapons of all party members with the element currently absorbed by the greatshield.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Element Trap',
    jpName: 'ヒートトラップ',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Places a volatile elemental glyph on the terrain that erupts when stepped on.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Slow Field',
    jpName: 'スローライト',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Projects a temporal deceleration beam drastically slowing target monster movement and attack speed.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Force Wall',
    jpName: 'フォースウォール',
    element: 'None',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Deploys an immovable wall of shield force deflecting boss rush charges.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Stun Roar',
    jpName: 'ストーンフォース',
    element: 'Strike',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Sonic ground pound unleashing subterranean petrification waves.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Giga Force',
    jpName: 'クエイク',
    element: 'Strike',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Channels maximum greatshield gauge into a colossal earth-shattering seismic eruption.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 5. SEEKER (ダガー・ロープ)
export const SEEKER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Spinning Slash',
    jpName: '回転斬り',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Rapid whirlwind twin-blade spin slicing surrounding enemies in tight range.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Grappling Hook',
    jpName: 'ロープ投げ',
    element: 'Pierce',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Fires a rope grapple to latch onto giant monsters or pull lightweight enemies.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Phantom Step',
    jpName: '影分身',
    element: 'None',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Creates shadow clones to confuse enemy targeting while dashing behind foes.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Scarlet Blade',
    jpName: '朱雀翼',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Imbues daggers with flame and launches into an aerial spinning blaze dive.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Vortex Slash',
    jpName: '旋風刃',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Acrobatic vertical rising whirlwind blade attack catching foes in an upward spiral.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Explosive Mine',
    jpName: '爆炎線',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Plants tripwire explosives on the terrain or mounted onto monster body parts.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Shadow Stitch',
    jpName: '影縫い',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Pins enemy shadows to the earth, immobilizing targets in place.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Death Blossom',
    jpName: '乱れ咲き',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'High-speed flurry of hundred-cut dagger slashes shredding down stunned enemies.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Gale Step',
    jpName: '風刃',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Super-speed instantaneous dash cutting through enemy lines leaving sonic shockwaves.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Rising Dragon',
    jpName: '昇龍脚',
    element: 'Strike',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Martial aerial ascension kick launching Arisen high above boss weak points.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Abyssal Drive',
    jpName: '流星蹴り',
    element: 'Slash',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Meteor dive bomb from supreme heights dealing catastrophic kinetic impact.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 6. SORCERER (大杖)
export const SORCERER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Fireball',
    jpName: 'ファイアボール',
    element: 'Fire',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Hurls a blazing sphere of fire that explodes into a fiery blast upon impact.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Thunder Rain',
    jpName: 'サンダーレイン',
    element: 'Thunder',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Calls down precision lightning bolts repeatedly upon the targeted foe.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Ice Spike',
    jpName: 'フロストスパイク',
    element: 'Ice',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Erupts jagged glacial pillars from beneath enemies freezing target monsters.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Rock Fall',
    jpName: 'ロッククラッシュ',
    element: 'Strike',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Drops heavy arcane boulders smashing monster posture and breaking guards.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Dark Mist',
    jpName: 'ダークミスト',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Envelops the zone in a corrosive miasma dealing continuous dark damage and blindness.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Meteor Fall',
    jpName: 'メテオフォール',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Summons blazing meteors from the heavens to pulverize large monsters in catastrophic firestorms.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Blizzard',
    jpName: 'ブリザード',
    element: 'Ice',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Creates a sub-zero arctic vortex freezing vast swarms of enemies solid.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Thunder Storm',
    jpName: 'サンダーストーム',
    element: 'Thunder',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Unleashes a raging tempest of lightning strikes devastating multiple targets.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Holy Light / Black Hole',
    jpName: 'ブラックホール',
    element: 'Dark',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Forms a gravitational singularity sucking in all surrounding enemies with crushing force.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Gravity Zone',
    jpName: 'カースドストーン',
    element: 'Dark',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Distorts localized spacetime creating high gravity zones that pin monster limbs.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Cataclysm',
    jpName: 'カタストロフィ',
    element: 'Dark',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'The ultimate arcane spell releasing world-ending elemental annihilation.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 7. ELEMENT ARCHER (魔道弓)
export const ELEMENT_ARCHER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Healing Arrow',
    jpName: '癒しの矢',
    element: 'Holy',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Fires tracking magick arrows that seek out wounded allies and restore HP.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Flame Arrow',
    jpName: '炎魔弓',
    element: 'Fire',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Shoots fiery homing magick darts igniting monster weak points.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Frost Arrow',
    jpName: '氷魔弓',
    element: 'Ice',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Chilled magick arrows that freeze and slow target monster movement.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Thunder Arrow',
    jpName: '雷魔弓',
    element: 'Thunder',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Electric charged arrows shocking enemies and chaining to adjacent targets.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Flare Arrow',
    jpName: '閃光矢',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Emits a blinding burst of flash energy disorienting monsters.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Scatter Shot',
    jpName: '連魔弾',
    element: 'Shot',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Locks on to up to 8 targets firing a swarm of homing energy spheres simultaneously.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Holy Arrow',
    jpName: '聖魔弓',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Sacred energy darts dealing massive extra damage to undead and demonic fiends.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Dark Arrow',
    jpName: '闇魔弓',
    element: 'Dark',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Corrupting dark arrows afflicting targets with heavy defense debuffs.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Target Lock / Weak Spot',
    jpName: '弱点付与',
    element: 'None',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Applies an elemental weak point onto the monster increasing party damage.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Spirit Burst',
    jpName: '精霊の矢',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Releases a spirit nova cleansing party ailments while punishing foes.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Starfall Arrow',
    jpName: '流星雨',
    element: 'Holy',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Rains down dozens of celestial shooting stars over the entire combat area.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 8. WARRIOR (大剣)
export const WARRIOR_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Slash Strike',
    jpName: '魔人斬り',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Charged overhead greatsword swing crushing through monster defense.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Upper Slash',
    jpName: '昇竜斬',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Upward greatsword scoop launching smaller foes high into the sky.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Great Spin',
    jpName: '大回転斬り',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Massive continuous greatsword spin clearing surrounding swarms.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Heavy Thrust',
    jpName: '突き刺し',
    element: 'Pierce',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Full-body greatsword thrust impaling deep into monster weak spots.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Earth Smash',
    jpName: '地割れ',
    element: 'Strike',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Slams greatsword into the earth creating a fissure shockwave.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Battle Cry',
    jpName: 'ウォークライ',
    element: 'None',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Roars fiercely, boosting physical defense and gaining hyper-armor against stagger.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Savage Strike',
    jpName: '退魔の構え',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Steels resolve in parry stance to counter incoming hits with immense poise.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Whirlwind',
    jpName: '狂戦士の咆哮',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Enters a berserker frenzy trading HP for overwhelming attack power.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Rampage',
    jpName: '大噴火',
    element: 'Strike',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Unleashes devastating seismic volcano slams rattling boss poise.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Cataclysm Slash',
    jpName: '天崩斬',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Massive sky-splitting overhead cleavage dealing peak physical DPS.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Calamity Blade',
    jpName: '破滅の刃',
    element: 'Slash',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Supreme greatsword combat art obliterating everything within range.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 9. ALCHEMIST (魔導ガントレット)
export const ALCHEMIST_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Solid Form',
    jpName: 'エリクシル注入',
    element: 'Strike',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Transmutes alchemical matter into hardened spikes embedded into monster skin.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Alchemia Crash',
    jpName: 'アルケミア・バースト',
    element: 'Strike',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Detonates all implanted alchemical markers on the enemy in a chain reaction.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Gold Transformation',
    jpName: '黄金化',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Transmutes monster armor into brittle gold inflicting extreme status vulnerability.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Poison Mist',
    jpName: 'ポイズン・バースト',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Emits a toxic caustic vapor continuously melting enemy stamina.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Acid Wall',
    jpName: 'アシッド・ウォール',
    element: 'Strike',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Erects an acidic barrier deflecting attacks while dissolving attacker durability.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Ignite Bomb',
    jpName: 'エレメンタル・ボム',
    element: 'Fire',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Attaches a high-explosive alchemical flask detonating on command.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Spike Trap',
    jpName: 'クレイモア',
    element: 'Pierce',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Transmutes floor crystals into sharp metallic spear traps.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Transmute Spike',
    jpName: 'ピラー・オブ・ゴールド',
    element: 'Strike',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Shoots colossal transmutation pillars through monster cores.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Magnum Opus',
    jpName: 'マグナム・オプス',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'The great alchemical transmutation releasing supreme elemental reactions.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Philosopher Gate',
    jpName: '賢者の扉',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Opens a doorway to pure creation, transmuting all enemy aggression into shields.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Quintessence',
    jpName: 'クインテッセンス',
    element: 'Holy',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Fifth element ultimate alchemy unleashing devastating molecular disintegration.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 10. SPIRIT LANCER (精霊槍)
export const SPIRIT_LANCER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Aram Fang',
    jpName: 'アラム・ファング',
    element: 'Pierce',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Rapid spirit spear thrusts ending in a high-velocity forward piercing strike.',
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  {
    skillNo: 2,
    name: 'Alam Slay',
    jpName: 'アラム・スレイ',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Sweeping wide-arc spirit lance slash with heavy knockdown and crowd control.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Col Spike',
    jpName: 'コル・スパイク',
    element: 'Pierce',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Leaps into the air and plunges the spirit lance straight down into the foe.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Wall Grasta',
    jpName: 'ウォール・グラスタ',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Places a spiritual barrier that absorbs damage and grants continuous healing.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Kol Strum',
    jpName: 'コル・ストルム',
    element: 'Pierce',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Whirlwind aerial spear dive generating spirit spirals around the Arisen.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Shukris Blast',
    jpName: 'シュクリス・ブラスト',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Channels accumulated spirit gauge into a high-powered radiant energy spear.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Cure Grasta',
    jpName: 'キュア・グラスタ',
    element: 'Holy',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Erects an extensive restorative sanctuary restoring massive HP and curing ailments.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Shurix Garder',
    jpName: 'シュリクス・ガーダー',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'Deploys rotating spirit shields deflecting attacks and reflecting damage.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Col Meteor',
    jpName: 'コル・メテオ',
    element: 'Fire',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Calls down blazing spirit spears from the sky onto the designated zone.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Edram Counter',
    jpName: 'エドラム・カウンター',
    element: 'Holy',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Spiritual parry stance countering any attack with an explosive spirit lance thrust.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Spirit Burst',
    jpName: 'スピリットバースト',
    element: 'Holy',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Releases pure transcendental spirit essence causing colossal multi-hit holy damage.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// 11. HIGH SCEPTER (魔剣)
export const HIGH_SCEPTER_SKILLS: SkillDataDef[] = [
  {
    skillNo: 1,
    name: 'Mirage Shift',
    jpName: 'ミラージュ・シフト',
    element: 'Dark',
    staminaCost: 'Low',
    unlockLevel: 1,
    maxRank: 10,
    description: 'Instant teleportation dash through space bypassing attacks with i-frames.',
    reqLevels: [0, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [0, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 2,
    name: 'Solid Razer',
    jpName: 'ソリッド・レイザー',
    element: 'Slash',
    staminaCost: 'Low',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Rapid physical-magick hybrid sword slashes generating magick gauge.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 3,
    name: 'Black Smash',
    jpName: 'ブラックスマッシュ',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 6,
    maxRank: 10,
    description: 'Channels dark magick into the blade unleashing a heavy vertical cleave.',
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  {
    skillNo: 4,
    name: 'Ruin Drive',
    jpName: 'ルインド・ドライブ',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 3,
    maxRank: 10,
    description: 'Fires high-velocity magick energy darts homing onto enemy weak points.',
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  {
    skillNo: 5,
    name: 'Dark Pulse',
    jpName: 'ダーク・パルス',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Emits a pulsating wave of dark force staggering monsters in 360 degrees.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 6,
    name: 'Arcana Blade',
    jpName: 'アルカナ・ブレード',
    element: 'Slash',
    staminaCost: 'Medium',
    unlockLevel: 13,
    maxRank: 10,
    description: 'Empowers magick blade with explosive elemental resonance.',
    reqLevels: [13, 16, 18, 20, 23, 25, 0, 0, 0, 0],
    jpCosts: [800, 1100, 1500, 1900, 2400, 3300, 4300, 5500, 6700, 8700]
  },
  {
    skillNo: 7,
    name: 'Phantom Cutter',
    jpName: 'ファントム・カッター',
    element: 'Dark',
    staminaCost: 'Medium',
    unlockLevel: 20,
    maxRank: 10,
    description: 'Projects flying dark energy crescent waves slicing through distant lines.',
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  {
    skillNo: 8,
    name: 'Sword Dance',
    jpName: 'ブレードダンス',
    element: 'Slash',
    staminaCost: 'High',
    unlockLevel: 28,
    maxRank: 10,
    description: 'High-speed fluid sword choreography weaving strikes and teleports together.',
    reqLevels: [28, 30, 33, 35, 38, 40, 0, 0, 0, 0],
    jpCosts: [1800, 2200, 2700, 3200, 3800, 4800, 5800, 6900, 8200, 10500]
  },
  {
    skillNo: 9,
    name: 'Dimensional Shift',
    jpName: 'ディメンション・シフト',
    element: 'Dark',
    staminaCost: 'High',
    unlockLevel: 35,
    maxRank: 10,
    description: 'Rips through dimensions to reappear above the target with an aerial plunge.',
    reqLevels: [35, 38, 40, 43, 45, 48, 0, 0, 0, 0],
    jpCosts: [2500, 3000, 3600, 4200, 4900, 6000, 7200, 8500, 10000, 12500]
  },
  {
    skillNo: 10,
    name: 'Abyss Gate',
    jpName: 'アビス・ゲート',
    element: 'Dark',
    staminaCost: 'High',
    unlockLevel: 45,
    maxRank: 10,
    description: 'Opens a nether portal releasing void swords to impale the foe.',
    reqLevels: [45, 47, 50, 52, 55, 58, 0, 0, 0, 0],
    jpCosts: [3500, 4000, 4700, 5400, 6200, 7500, 8800, 10300, 12000, 15000]
  },
  {
    skillNo: 11,
    name: 'Eclipse Edge',
    jpName: 'エクリプス・エッジ',
    element: 'Dark',
    staminaCost: 'Very High',
    unlockLevel: 55,
    maxRank: 10,
    description: 'Transcendent high scepter ultimate releasing catastrophic void obliteration.',
    reqLevels: [55, 57, 60, 62, 65, 68, 0, 0, 0, 0],
    jpCosts: [4500, 5200, 6000, 6900, 7900, 9300, 10800, 12500, 14500, 18000]
  }
];

// Helper map
export const VOCATION_SKILLS_BY_ID: Record<string, SkillDataDef[]> = {
  fighter: FIGHTER_SKILLS,
  hunter: HUNTER_SKILLS,
  priest: PRIEST_SKILLS,
  shield_sage: SHIELD_SAGE_SKILLS,
  seeker: SEEKER_SKILLS,
  sorcerer: SORCERER_SKILLS,
  element_archer: ELEMENT_ARCHER_SKILLS,
  warrior: WARRIOR_SKILLS,
  alchemist: ALCHEMIST_SKILLS,
  spirit_lancer: SPIRIT_LANCER_SKILLS,
  high_scepter: HIGH_SCEPTER_SKILLS
};

export const VOCATION_JOB_NO_MAP: Record<number, string> = {
  1: 'fighter',
  2: 'hunter',
  3: 'priest',
  4: 'shield_sage',
  5: 'seeker',
  6: 'sorcerer',
  7: 'element_archer',
  8: 'warrior',
  9: 'alchemist',
  10: 'spirit_lancer',
  11: 'high_scepter'
};

// Helper to calculate custom skill total JP
export function getSkillTotalJp(jpCosts: number[]): number {
  return jpCosts.reduce((a, b) => a + b, 0);
}

/**
 * Enriches a vocation with the official Skill No, reqLevelPerRank, jpCostPerRank, and totalJpToMax
 * while preserving all custom Job Training (修練) trials.
 */
export function enrichVocationWithJobSkillData(voc: any): any {
  const skillDefs = VOCATION_SKILLS_BY_ID[voc.id];
  if (!skillDefs) return voc;

  const enrichedCustomSkills = skillDefs.map((def, idx) => {
    const existing =
      voc.customSkills.find((s: any) => s.skillNo === def.skillNo) ||
      voc.customSkills.find(
        (s: any) => s.jpName && def.jpName && s.jpName.includes(def.jpName.slice(0, 3))
      ) ||
      voc.customSkills[idx];

    const totalJpToMax = getSkillTotalJp(def.jpCosts);

    return {
      id: existing?.id || `${voc.id}_skill_${def.skillNo}`,
      skillNo: def.skillNo,
      name: def.name,
      jpName: def.jpName || existing?.jpName,
      type: 'custom' as const,
      unlockLevel: def.unlockLevel,
      maxRank: def.maxRank,
      element: def.element || existing?.element,
      staminaCost: def.staminaCost || existing?.staminaCost,
      description: def.description || existing?.description || '',
      levelingNotes: 'Ranks 1–5: Unlock with Job Points. Ranks 6–10: Requires Job Training Trials.',
      reqLevelPerRank: def.reqLevels,
      jpCostPerRank: def.jpCosts,
      totalJpToMax,
      jobTraining: existing?.jobTraining || []
    };
  });

  return {
    ...voc,
    customSkills: enrichedCustomSkills
  };
}


