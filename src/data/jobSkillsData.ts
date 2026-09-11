import { getOfficialSkillDef, getOfficialAbilityDef } from './officialSkillProgressionData';

// ============================================================
// 1. TYPES
// ============================================================

export interface SkillParam {
  Lv: number;
  RequireJobLevel: number;
  RequireJobPoint: number;
}

export interface SkillData {
  SkillNo: number;
  Job: number;
  Params: SkillParam[];
}

export interface AbilityParam {
  Lv: number;
  RequireJobLevel: number;
  RequireJobPoint: number;
}

export interface AbilityData {
  AbilityNo: number;
  Job: number;
  Cost?: number;
  Params: AbilityParam[];
}

export interface SkillDataDef {
  skillNo: number;
  name: string;
  jpName?: string;
  element?: 'Slash' | 'Strike' | 'Shot' | 'Pierce' | 'Fire' | 'Ice' | 'Thunder' | 'Holy' | 'Dark' | 'None';
  staminaCost?: string;
  unlockLevel: number;
  maxRank: number;
  description: string;
  reqLevels: number[];
  jpCosts: number[];
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

// ============================================================
// 2. NAME MAPPINGS
// ============================================================

/**
 * Skill name mapping: key = `${job}_${skillNo}` -> name
 */
export const skillNameMap: Record<string, string> = {
  // Fighter (Job 1)
  "1_1": "BlinkStrike",
  "1_2": "CymbalAttack",
  "1_3": "SkywardLash",
  "1_4": "TuskToss",
  "1_5": "ShelteredSpike",
  "1_6": "CompassSlash",
  "1_7": "HindsightSlash",
  "1_8": "Downthrust",
  "1_9": "MovingCastle",
  "1_10": "IntimateStrike",
  "1_11": "BravesRaid",
  "1_12": "FlowingSwordFlash",
  "1_13": "PierceSlash",
  "1_14": "FlowingShieldSpiral",
  "1_102": "CymbalAttackP",
  "1_202": "CymbalAttackT",
  "1_103": "SkywardLashP",
  "1_203": "SkywardLashT",
  "1_104": "TuskTossP",
  "1_204": "TuskTossT",
  "1_108": "DownthrustP",
  "1_208": "DownthrustT",
  // Seeker (Job 2)
  "2_1": "BitingWind",
  "2_2": "TossAndTrigger",
  "2_3": "Ensnare",
  "2_4": "SteppingStone",
  "2_5": "BackKick",
  "2_6": "Reset",
  "2_7": "FalconKick",
  "2_8": "PowderCharge",
  "2_9": "WhirlwindBlade",
  "2_10": "SlidingRope",
  "2_11": "Backfire",
  "2_12": "EasyKill",
  "2_13": "ExplosiveFlameBlade",
  "2_14": "SoaringHawkSlash",
  "2_112": "TossAndTriggerP",
  "2_212": "TossAndTriggerT",
  "2_113": "SteppingStoneP",
  "2_213": "SteppingStoneT",
  "2_107": "EasyKillP",
  "2_207": "EasyKillT",
  "2_102": "ExplosiveFlameBladeP",
  "2_202": "ExplosiveFlameBladeT",
  // Hunter (Job 3)
  "3_1": "ThreefoldArrow",
  "3_2": "TriadShot",
  "3_3": "FullBend",
  "3_4": "FlyingDin",
  "3_5": "CloudburstVolley",
  "3_6": "PunctureDart",
  "3_7": "WhirlingArrow",
  "3_8": "CrimsonArrow",
  "3_9": "ExplosiveArrowVolley",
  "3_10": "StormArrow",
  "3_11": "BackwardRetreat",
  "3_12": "DemonArrow",
  "3_13": "SkyBurstShot",
  "3_14": "CombinedPierceShot",
  "3_101": "ThreefoldArrowP",
  "3_201": "ThreefoldArrowT",
  "3_106": "WhirlingArrowP",
  "3_206": "WhirlingArrowT",
  "3_108": "FullBendP",
  "3_208": "FullBendT",
  "3_110": "ExplosiveArrowVolleyP",
  "3_210": "ExplosiveArrowVolleyT",
  // Priest (Job 4)
  "4_1": "HealingSpot",
  "4_2": "CuringSpot",
  "4_3": "SeraphimFlap",
  "4_4": "SacredShine",
  "4_5": "AttackRiser",
  "4_6": "DefenseRiser",
  "4_7": "GuardBit",
  "4_8": "QuickCharge",
  "4_9": "EnergySpot",
  "4_10": "HolyGlare",
  "4_11": "SoulExplosion",
  "4_12": "SolidRiser",
  "4_13": "SolaceRiser",
  "4_14": "BlastAddition",
  "4_113": "SolaceRiserP",
  "4_213": "SolaceRiserT",
  "4_105": "SeraphimFlapP",
  "4_205": "SeraphimFlapT",
  "4_104": "CuringSpotP",
  "4_204": "CuringSpotT",
  "4_102": "DefenseRiserP",
  "4_202": "DefenseRiserT",
  // Shield Sage (Job 5)
  "5_1": "ForceShield",
  "5_2": "ElementGlow",
  "5_3": "SlowLight",
  "5_4": "HypnosLight",
  "5_5": "RampartRaid",
  "5_6": "EarthShake",
  "5_7": "HolyWall",
  "5_8": "BindingAnchor",
  "5_9": "HandsOfGod",
  "5_10": "ElementLight",
  "5_11": "StunBurst",
  "5_12": "ForceAnchor",
  "5_13": "StoneLight",
  "5_14": "ProtectionSwing",
  "5_113": "EarthShakeP",
  "5_213": "EarthShakeT",
  "5_105": "ForceShieldP",
  "5_205": "ForceShieldT",
  "5_104": "RampartRaidP",
  "5_204": "RampartRaidT",
  "5_102": "HolyWallP",
  "5_202": "HolyWallT",
  // Sorcerer (Job 6)
  "6_1": "Firestorm",
  "6_2": "Fulmination",
  "6_3": "BlackHaze",
  "6_4": "Comestion",
  "6_5": "Frigor",
  "6_6": "Bolide",
  "6_7": "CrescentBlade",
  "6_8": "Seism",
  "6_9": "Levin",
  "6_10": "Gicel",
  "6_11": "DarknessMist",
  "6_12": "ProminentSphere",
  "6_13": "IciclePierce",
  "6_14": "LightningStake",
  "6_110": "DarknessMistP",
  "6_210": "DarknessMistT",
  "6_102": "FulminationP",
  "6_202": "FulminationT",
  "6_104": "ComestionP",
  "6_204": "ComestionT",
  "6_105": "FrigorP",
  "6_205": "FrigorT",
  // Warrior (Job 7)
  "7_1": "UpwardStrike",
  "7_2": "SavageLunge",
  "7_3": "PommelStrike",
  "7_4": "EscapeSlash",
  "7_5": "SparkSlash",
  "7_6": "DevilBurst",
  "7_7": "HeavenThrust",
  "7_8": "Clarity",
  "7_9": "AnnihilatorsWindSlash",
  "7_10": "GreatWindmill",
  "7_11": "FlyingDragonCrash",
  "7_12": "DefensiveStance",
  "7_13": "GreatGougingFang",
  "7_14": "EarthquakeFang",
  "7_103": "SavageLungeP",
  "7_203": "SavageLungeT",
  "7_102": "PommelStrikeP",
  "7_202": "PommelStrikeT",
  "7_104": "EscapeSlashP",
  "7_204": "EscapeSlashT",
  "7_105": "SparkSlashP",
  "7_205": "SparkSlashT",
  // Element Archer (Job 8)
  "8_1": "HealingBolt",
  "8_2": "CuringBolt",
  "8_3": "FlamingBow",
  "8_4": "FourfoldBolt",
  "8_5": "RicochetSeeker",
  "8_6": "MagickalFlare",
  "8_7": "EnfeeblingBow",
  "8_8": "CripplingBow",
  "8_9": "EnergizingBolt",
  "8_10": "ExhaustingBow",
  "8_11": "WeakeningBow",
  "8_12": "GambleDraw",
  "8_13": "HealingFlash",
  "8_14": "TearingTentacleArrow",
  "8_105": "FlamingBowP",
  "8_205": "FlamingBowT",
  "8_110": "ExhaustingBowP",
  "8_210": "ExhaustingBowT",
  "8_113": "HealingFlashP",
  "8_213": "HealingFlashT",
  "8_108": "CripplingBowP",
  "8_208": "CripplingBowT",
  // Alchemist (Job 9)
  "9_1": "AlmaPillar",
  "9_2": "AlmaWave",
  "9_3": "PileBinder",
  "9_4": "AlmaWindust",
  "9_5": "RexElementa",
  "9_6": "RexCatapulta",
  "9_7": "DolusMorsus",
  "9_8": "GoldaAurum",
  "9_9": "AlchemicalBurst",
  "9_10": "DolusAeris",
  "9_11": "AlmaSector",
  "9_12": "RegalBarrier",
  "9_103": "PileBinderP",
  "9_203": "PileBinderT",
  "9_102": "AlmaPillarP",
  "9_202": "AlmaPillarT",
  "9_101": "AlmaWaveP",
  "9_201": "AlmaWaveT",
  "9_105": "RexElementaP",
  "9_205": "RexElementaT",
  // Spirit Lancer (Job 10)
  "10_1": "AuromFang",
  "10_2": "AuromSlay",
  "10_3": "CorrStorm",
  "10_4": "CorrSpike",
  "10_5": "ScriosBlast",
  "10_6": "ScriosGuard",
  "10_7": "WallGlasta",
  "10_8": "CureGlasta",
  "10_9": "CorrMeteor",
  "10_10": "EadromCounter",
  "10_107": "WallGlastaP",
  "10_207": "WallGlastaT",
  "10_101": "CureGlastaP",
  "10_201": "CureGlastaT",
  "10_104": "CorrSpikeP",
  "10_204": "CorrSpikeT",
  "10_108": "AuromFangP",
  "10_208": "AuromFangT",
  // High Scepter (Job 11)
  "11_1": "MirageShift",
  "11_2": "WallBarrier",
  "11_3": "FullMoonLight",
  "11_4": "PhantomEdge",
  "11_5": "BlackFlashFang",
  "11_6": "DimSlice",
  "11_7": "EclipseBright",
  "11_8": "TerrorBlast",
};

/**
 * Ability name mapping: abilityNo -> name
 */
export const abilityNameMap: Record<number, string> = {
  1: "AgileMotion",
  2: "DireGouge",
  3: "CrushReceive",
  4: "Counter0",
  5: "CounterExtension",
  6: "AdvantageousFeeling",
  7: "Onslaught",
  8: "CombatMomentum",
  9: "Exhilaration",
  10: "BraveEffort",
  11: "StrongShield",
  12: "HeavyShield",
  13: "TopplingShield",
  14: "Overpower",
  15: "Fitness",
  16: "Egression",
  17: "Obstinacy",
  18: "SteadfastStand",
  19: "NullifyingDefense",
  20: "Resilience",
  21: "Fortitude",
  22: "DemihumanProficiency",
  23: "DemihumanSafeguard",
  24: "SoftProficiency",
  25: "SoftSafeguard",
  26: "Damping",
  27: "Precision",
  28: "ReloadForce",
  29: "ArrowIncrease",
  30: "Concentration",
  31: "SkilledReload",
  32: "AggressionArrow",
  33: "PerfectReload",
  34: "DelayedExplosion",
  35: "MenacingForm",
  36: "SturdyForm",
  37: "AttackExpansion",
  38: "PleasantAttack",
  39: "HeartShot",
  40: "HerculeanStrength",
  41: "Enhancement",
  42: "HiddenPotential",
  43: "Hardy",
  44: "ToughSkin",
  45: "DecisiveShot",
  46: "ShadowAttack",
  47: "WingedSafeguard",
  48: "WingedProficiency",
  49: "OgreSafeguard",
  50: "OgreProficiency",
  51: "RelaxedCure",
  52: "SpiritOverflow",
  53: "Compassion",
  54: "LongExposure",
  55: "AttackAid",
  56: "MagickAid",
  57: "AssistDefense",
  58: "AssistMagick",
  59: "Encouragement",
  60: "DivineProtection",
  61: "Patience",
  62: "Fireproof",
  63: "Iceproof",
  64: "Thunderproof",
  65: "Holyproof",
  66: "Darkproof",
  67: "ReduceBurn",
  68: "ReduceFreeze0",
  69: "ReduceShock",
  70: "ReduceHolyDrain",
  71: "ReduceBlind0",
  72: "UndeadSafeguard",
  73: "UndeadProficiency",
  74: "SkeletonSafeguard",
  75: "SkeletonProficiency",
  76: "Absorption",
  77: "Trickle",
  78: "GreatAbsorption",
  79: "Prominence",
  80: "ViolentRelease",
  81: "Supercharge",
  82: "Counter1",
  83: "DividedStrength",
  84: "FrugalDefense",
  85: "Adamance",
  86: "Denial",
  87: "Prescience",
  88: "Solid",
  89: "VibrantDefense",
  90: "InstantRecovery0",
  91: "Robust",
  92: "FiredUp",
  93: "Sanctuary",
  94: "GreatVigor",
  95: "Dedication",
  96: "Perseverance",
  97: "HolyBody",
  98: "Invigorated",
  99: "Perky",
  100: "EasedBlade",
  101: "Longline",
  102: "RopeReversal",
  103: "SpinAvoid",
  104: "HighJump",
  105: "ArmStrength",
  106: "TremorProof",
  107: "FuriousGrip",
  108: "Quakemaker",
  109: "LeapGrip",
  110: "EnduringGrip",
  111: "Adhesion0",
  112: "Adhesion1",
  113: "FlyingEvasion",
  114: "SuperiorEvasion",
  115: "CalmEvasion",
  116: "ReverseStance",
  117: "SkyHammer",
  118: "DestructiveFall",
  119: "FlipResistance",
  120: "JumpProficiency",
  121: "LightRecoil",
  122: "SoundLanding",
  123: "AssistedHighJump",
  124: "GiantSafeguard",
  125: "GiantProficiency",
  126: "BreakFormation",
  127: "SpiritChant",
  128: "GracefulChant",
  129: "ContinuedChant",
  130: "FireAttack",
  131: "IceAttack",
  132: "ThunderAttack",
  133: "HolyAttack",
  134: "DarkAttack",
  135: "TwinMagick",
  136: "MagickBoost",
  137: "Equanimity",
  138: "Calmness",
  139: "CourageousCast",
  140: "PersistentCast",
  141: "MagickEnergy",
  142: "ComfortableLevitate",
  143: "ExtendedLevitate",
  144: "IgnoreIntimidation",
  145: "DemonSafeguard",
  146: "DemonProficiency",
  147: "CursedSafeguard",
  148: "CursedProficiency",
  149: "HumanSafeguard",
  150: "HumanoidProficiency",
  151: "UnitedEnergy",
  152: "LengthyAssistance",
  153: "QuickArrow",
  154: "AidExtension",
  155: "PersistentArrow",
  156: "HealExtension",
  157: "HealThyself",
  158: "QuickHealing0",
  159: "RecoveryBurst",
  160: "LifeEnergizer",
  161: "LifeSpark",
  162: "SelfFeedback",
  163: "Mending",
  164: "DeathlyDevour",
  165: "QuickHealing1",
  166: "VergeofDeath",
  167: "FireAffinity",
  168: "IceAffinity",
  169: "ThunderAffinity",
  170: "HolyAffinity",
  171: "DarkAffinity",
  172: "SpiritSafeguard",
  173: "SpiritProficiency",
  174: "ConstructSafeguard",
  175: "ConstructProficiency",
  176: "Aggression",
  177: "OverflowingHatred",
  178: "Malice",
  179: "ProlongedHatred",
  180: "Mangle",
  181: "FirstStrike",
  182: "Weighted",
  183: "Violence",
  184: "UndyingForce",
  185: "InnerStrength",
  186: "HeavyAttack",
  187: "BraveAttack",
  188: "ForcedAttack",
  189: "FightingSpirit",
  190: "UnyieldingPosture",
  191: "Ferocity",
  192: "ForcedEndure",
  193: "Resolute",
  194: "FullBodied",
  195: "HardBody",
  196: "Ambition",
  197: "HeavySteps",
  198: "DeftFooting",
  199: "BestialInstinct",
  200: "BeastProficiency",
  201: "Challenger",
  202: "AlchemicalInvasion",
  203: "ProlongedLure",
  204: "WellPracticed",
  205: "LivelyRomp",
  206: "ViciousVision",
  207: "FlourishingHealing",
  208: "CalmingVision",
  209: "DiscreetHealing",
  210: "TenderTouch",
  211: "Apparentness",
  212: "Diminishing",
  213: "VigorousVitality",
  214: "MajesticMight",
  215: "Relaxedness",
  216: "Encouraged",
  217: "CordialClimb",
  218: "InstantRecovery1",
  219: "SoulStealer",
  220: "HeroicSpirit",
  221: "PolishedPoise",
  222: "AlchemizedSafeguard",
  223: "AlchemizedProficiency",
  224: "DragonkinSafeguard",
  225: "DragonkinProficiency",
  226: "TreasureEye",
  227: "Willpower",
  228: "Gathering",
  229: "ExpertExcavator",
  230: "Flow",
  231: "SoftTouch",
  232: "ExtendedSprings",
  233: "Featherfoot",
  234: "SafeLanding",
  235: "Efficacy",
  236: "EnhancedThrow",
  237: "EffectExtension",
  238: "Rakshasa",
  239: "Yasha",
  240: "NewAttack",
  241: "NewDefense",
  242: "MoonlightAssault",
  243: "MoonlightDefense",
  244: "RainAttack",
  245: "RainDefense",
  246: "AMansHeart",
  247: "AWomansHeart",
  248: "ResistPoison",
  249: "Antislow",
  250: "Antisleep",
  251: "AntiStun",
  252: "AntiDrench",
  253: "AntiOil",
  254: "AntiSeal",
  255: "AntiSubdue",
  256: "AntiPetrify",
  257: "AntiGoldify",
  258: "ClosetoFire",
  259: "ClosetoIce",
  260: "ClosetoThunder",
  261: "ClosetoHoly",
  262: "ClosetoDark",
  263: "ControlPoison",
  264: "ControlSlow",
  265: "ControlSleep",
  266: "ControlStun",
  267: "QuickDrying",
  268: "QuickClean",
  269: "QuickSeal",
  270: "ReduceSubdue",
  271: "ReducePetrify",
  272: "ReduceGoldify",
  273: "ReduceTar",
  274: "ReduceFreeze1",
  275: "ReduceBlind1",
  276: "ReduceFire",
  277: "ReduceIce",
  278: "ReduceThunder",
  279: "ReduceHoly",
  280: "ReduceDark",
  281: "ReducePhysicalAttackDown",
  282: "ReduceDefenseDown",
  283: "ReduceMagickAttackDown",
  284: "ReduceMagickDefenseDown",
  285: "IncreasedHonor",
  286: "SpiritualOffering",
  287: "HonouringMasters",
  288: "Admired",
  289: "Prizewinner",
  290: "TeamPlayer",
  291: "MusicHunter",
  292: "MusicMayCry",
  293: "MusicFighter",
  294: "WilyMusic",
  295: "MusicnGoblins",
  296: "OnslaughtSlayer",
  297: "DemolishingStrikeSlayer",
  298: "CrushingBlow",
  299: "GougeEradicate",
  300: "DireOnslaughtSlayer",
  301: "FirmShield",
  302: "OnslaughtCrusher",
  303: "DemolishingStrikeExterminator",
  304: "Hardening",
  305: "GougeCrusher",
  306: "DireOnslaughtCrusher",
  307: "PleasantThrust",
  308: "ArcherySlayer",
  309: "ExplodingArrowFury",
  310: "RigidStance",
  311: "ArrowheadStrikeFury",
  312: "KeensightShotSlayer",
  313: "RescueAssistance",
  314: "ArcheryCrusher",
  315: "ExplodingArrowCrusher",
  316: "AugmentedSpirit",
  317: "ArrowheadStrikeCrusher",
  318: "KeensightCrusher",
  319: "ClimaxBow",
  320: "HealingChant",
  321: "BlastBitsSlayer",
  322: "AssistBoost",
  323: "SaintAuraSlayer",
  324: "ShockwaveSlayer",
  325: "Stagnation",
  326: "HealAuraEndurer",
  327: "BlastBitsCrusher",
  328: "MagickalRush",
  329: "HolyAuraSavage",
  330: "ShockwaveCrusher",
  331: "HardSpirit",
  332: "ShieldbashSlayer",
  333: "WeaklightFury",
  334: "ProtectedMend",
  335: "ShieldCounterSavage",
  336: "ForceBurstCrush",
  337: "Attention",
  338: "ShieldBlowCrusher",
  339: "WeakLightCrusher",
  340: "ShieldCollapse",
  341: "ShieldSequenceCrusher",
  342: "ForceBurstSlayer",
  343: "PleasantSight",
  344: "CarveSlayer",
  345: "ScarletKissesSlayer",
  346: "EnduringSprint",
  347: "RoundhouseKickSlayer",
  348: "ScarletSlashesCrush",
  349: "DeepAggression",
  350: "CarveCrusher",
  351: "ScarletKissesCrusher",
  352: "Stiffness",
  353: "RoundhouseKickCrusher",
  354: "ScarletSlashesExterminator",
  355: "PleasantRoll",
  356: "MagickBoltSlayer",
  357: "MagickTrapCrush",
  358: "EnduringLevitation",
  359: "MagickBoltsCrusher",
  360: "MagickCrackerSmasher",
  361: "CollapsingStrength",
  362: "MagickTrapDuration",
  363: "MagickCrackerSlayer",
  364: "Reduction",
  365: "MagickTrapSinger",
  366: "MagickCrackerSinger",
  367: "PleasantDrift",
  368: "SeekerSlayer",
  369: "AidArrowChant",
  370: "SteadyAdvance",
  371: "ForwardKickSlayer",
  372: "InvigoratingArrowsDuration",
  373: "DemonShield",
  374: "SeekerArrowsBlink",
  375: "AidArrowBlink",
  376: "SalvationalMagick",
  377: "FrontKickCrusher",
  378: "InvigorationArrowExpand",
  379: "CounterEye",
  380: "HackSlayer",
  381: "InverseSlashCrusher",
  382: "Brandish",
  383: "DevastateSlayer",
  384: "SavageLashEradicate",
  385: "AttackCover",
  386: "HackCrusher",
  387: "InverseSlashExterminator",
  388: "GreatGrasp",
  389: "DevastateCrusher",
  390: "SavageLashCrusher",
  391: "ExcessGrudge",
  392: "AlchemicStrikeSlayer",
  393: "AlchemicEvadeSlayer",
  394: "EnduringVision",
  395: "AlchemicalRadiusSlayer",
  396: "ElixerSlayer",
  397: "Stubborn",
  398: "AlchemyCrusher",
  399: "AlchemicEvadeCrusher",
  400: "SkyAnnihilation",
  401: "AlchemicalRadiusCrusher",
  402: "ElixirCrusher",
  403: "DefenseAlchemy",
  404: "ThreatenedSpirit",
  405: "ExtendedSpirit",
  406: "EvasiveShadow",
  407: "Extension",
  408: "Active",
  409: "Avoidance",
  410: "ExtendedHealing",
  411: "ForagingSpirit",
  412: "SproutSealing",
  413: "Critical",
  414: "EvasiveSpirit",
  415: "ForagingHeal",
  416: "AttackTouch",
  417: "ProtectiveTouch",
  418: "PleasantTouch",
  419: "GreatEnchantment",
  420: "Synergy",
  421: "Attribution",
  422: "Resistance",
  423: "Immovable",
  424: "RefreshingRescue",
  425: "ReducedCorruption",
  426: "InfectedDestroyer",
  427: "InfectedSafeguard",
  428: "InfectedProficiency",
  429: "RushingSpearSlayer",
  430: "RisingSpearSlayer",
  431: "SweepingSpearSlayer",
  432: "CrushingSpearSlayer",
  433: "AttackRescue",
  434: "EnhancedVitality",
  435: "RushingSpearDestroyer",
  436: "RisingSpearDestroyer",
  437: "SweepingSpearDestroyer",
  438: "CrushingSpearDestroyer",
  439: "ElementalDefense",
  440: "SpiritHoard",
  441: "CompanionHealth",
  442: "CompanionStamina",
  443: "CompanionAttack",
  444: "CompanionMagick",
  445: "CompanionDefense",
  446: "CompanionMagickDefense",
  447: "FollowUpAttack",
  448: "CompanionHealing",
  449: "HeavyStepsLight",
  450: "DeftFootingLight",
  451: "ExtendedSpringsLight",
  452: "GatheringLight",
  453: "EfficacyLight",
  454: "EffectExtensionLight",
  455: "ExpertExcavatorLight",
  456: "FlowLight",
  457: "TreasureEyeLight",
  458: "WillpowerLight",
  459: "SafeLandingLight",
  460: "EaseBurden",
  461: "Myrmidon",
  462: "Inquiry",
  463: "Purge",
  464: "NightEmperor",
  466: "MagickalCharge",
  467: "ExtendedGlyph",
  468: "PerilousAbsorption",
  469: "StrongShot",
  470: "AugmentedMagick",
  471: "AlteredMagick",
  472: "IncreasedAbsorption",
  473: "FierceFlight",
  474: "SoaringSword",
  475: "MagickalChant",
  477: "ComplementChant",
  478: "ProtectiveGlyph",
  479: "FortunesofWar",
  480: "SourceLuck",
  481: "Bombardment",
  482: "HeavyFoot",
  483: "ActiveSupression",
  484: "CourageousSupression",
  485: "ImperativeSupression",
  486: "VigorousSupression",
  487: "AntiReduction",
  488: "ArmorCrusher",
  489: "WarReadySafeguard",
  490: "WarReadyProficiency",
  493: "QuadrupleSlashAbsorption",
  494: "ArcSlashDestroyer",
  495: "SkySlashAbsorption",
  496: "FallingSlashAbsorption",
  497: "OrdinaryAttack",
  498: "RushAttack",
  499: "QuadrupleSlashSlayer",
  500: "ArcSlashSlayer",
  501: "FallingSlashSlayer",
  502: "SkySlashSlayer",
  503: "FlowAttack",
  504: "Respiration",
};

// ============================================================
// 3. RAW DATA
// ============================================================

export const skillData: SkillData[] = [
  // Fighter (Job 1)
  {
    "SkillNo": 1,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 0, "RequireJobPoint": 0 },
      { "Lv": 2, "RequireJobLevel": 3, "RequireJobPoint": 300 },
      { "Lv": 3, "RequireJobLevel": 6, "RequireJobPoint": 600 },
      { "Lv": 4, "RequireJobLevel": 9, "RequireJobPoint": 1000 },
      { "Lv": 5, "RequireJobLevel": 12, "RequireJobPoint": 1500 },
      { "Lv": 6, "RequireJobLevel": 15, "RequireJobPoint": 2300 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 3200 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 4200 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 5200 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 7200 }
    ]
  },
  {
    "SkillNo": 2,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 6, "RequireJobPoint": 500 },
      { "Lv": 2, "RequireJobLevel": 9, "RequireJobPoint": 800 },
      { "Lv": 3, "RequireJobLevel": 13, "RequireJobPoint": 1200 },
      { "Lv": 4, "RequireJobLevel": 16, "RequireJobPoint": 1600 },
      { "Lv": 5, "RequireJobLevel": 18, "RequireJobPoint": 2100 },
      { "Lv": 6, "RequireJobLevel": 20, "RequireJobPoint": 3000 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 4000 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 5200 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 6400 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 8400 }
    ]
  },
  {
    "SkillNo": 3,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 6, "RequireJobPoint": 500 },
      { "Lv": 2, "RequireJobLevel": 9, "RequireJobPoint": 800 },
      { "Lv": 3, "RequireJobLevel": 13, "RequireJobPoint": 1200 },
      { "Lv": 4, "RequireJobLevel": 16, "RequireJobPoint": 1600 },
      { "Lv": 5, "RequireJobLevel": 18, "RequireJobPoint": 2100 },
      { "Lv": 6, "RequireJobLevel": 20, "RequireJobPoint": 3000 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 4000 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 5200 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 6400 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 8400 }
    ]
  },
  {
    "SkillNo": 4,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 3, "RequireJobPoint": 300 },
      { "Lv": 2, "RequireJobLevel": 6, "RequireJobPoint": 600 },
      { "Lv": 3, "RequireJobLevel": 9, "RequireJobPoint": 900 },
      { "Lv": 4, "RequireJobLevel": 12, "RequireJobPoint": 1300 },
      { "Lv": 5, "RequireJobLevel": 15, "RequireJobPoint": 1800 },
      { "Lv": 6, "RequireJobLevel": 18, "RequireJobPoint": 2600 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 3500 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 4500 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 5500 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 7500 }
    ]
  },
  {
    "SkillNo": 5,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 20, "RequireJobPoint": 1200 },
      { "Lv": 2, "RequireJobLevel": 22, "RequireJobPoint": 1500 },
      { "Lv": 3, "RequireJobLevel": 25, "RequireJobPoint": 2000 },
      { "Lv": 4, "RequireJobLevel": 27, "RequireJobPoint": 2500 },
      { "Lv": 5, "RequireJobLevel": 30, "RequireJobPoint": 3000 },
      { "Lv": 6, "RequireJobLevel": 32, "RequireJobPoint": 3900 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 4800 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 5800 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 7000 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 9000 }
    ]
  },
  {
    "SkillNo": 6,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 25, "RequireJobPoint": 1500 },
      { "Lv": 2, "RequireJobLevel": 27, "RequireJobPoint": 1800 },
      { "Lv": 3, "RequireJobLevel": 30, "RequireJobPoint": 2400 },
      { "Lv": 4, "RequireJobLevel": 32, "RequireJobPoint": 3000 },
      { "Lv": 5, "RequireJobLevel": 35, "RequireJobPoint": 3600 },
      { "Lv": 6, "RequireJobLevel": 38, "RequireJobPoint": 4500 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 5400 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 6400 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 7500 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 9500 }
    ]
  },
  {
    "SkillNo": 7,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 13, "RequireJobPoint": 900 },
      { "Lv": 2, "RequireJobLevel": 15, "RequireJobPoint": 1200 },
      { "Lv": 3, "RequireJobLevel": 18, "RequireJobPoint": 1600 },
      { "Lv": 4, "RequireJobLevel": 20, "RequireJobPoint": 2000 },
      { "Lv": 5, "RequireJobLevel": 23, "RequireJobPoint": 2500 },
      { "Lv": 6, "RequireJobLevel": 27, "RequireJobPoint": 3400 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 4400 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 5600 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 6800 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 8800 }
    ]
  },
  {
    "SkillNo": 8,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 13, "RequireJobPoint": 900 },
      { "Lv": 2, "RequireJobLevel": 15, "RequireJobPoint": 1200 },
      { "Lv": 3, "RequireJobLevel": 18, "RequireJobPoint": 1600 },
      { "Lv": 4, "RequireJobLevel": 20, "RequireJobPoint": 2000 },
      { "Lv": 5, "RequireJobLevel": 23, "RequireJobPoint": 2500 },
      { "Lv": 6, "RequireJobLevel": 27, "RequireJobPoint": 3400 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 4400 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 5600 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 6800 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 8800 }
    ]
  },
  {
    "SkillNo": 9,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 30, "RequireJobPoint": 1800 },
      { "Lv": 2, "RequireJobLevel": 32, "RequireJobPoint": 2100 },
      { "Lv": 3, "RequireJobLevel": 35, "RequireJobPoint": 2700 },
      { "Lv": 4, "RequireJobLevel": 38, "RequireJobPoint": 3300 },
      { "Lv": 5, "RequireJobLevel": 40, "RequireJobPoint": 3900 },
      { "Lv": 6, "RequireJobLevel": 42, "RequireJobPoint": 4900 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 5900 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 6800 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 8000 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 10000 }
    ]
  },
  {
    "SkillNo": 10,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 30, "RequireJobPoint": 1800 },
      { "Lv": 2, "RequireJobLevel": 32, "RequireJobPoint": 2100 },
      { "Lv": 3, "RequireJobLevel": 35, "RequireJobPoint": 2700 },
      { "Lv": 4, "RequireJobLevel": 38, "RequireJobPoint": 3300 },
      { "Lv": 5, "RequireJobLevel": 40, "RequireJobPoint": 3900 },
      { "Lv": 6, "RequireJobLevel": 42, "RequireJobPoint": 4900 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 5900 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 6800 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 8000 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 10000 }
    ]
  },
  {
    "SkillNo": 11,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 35, "RequireJobPoint": 2100 },
      { "Lv": 2, "RequireJobLevel": 37, "RequireJobPoint": 2400 },
      { "Lv": 3, "RequireJobLevel": 39, "RequireJobPoint": 3000 },
      { "Lv": 4, "RequireJobLevel": 42, "RequireJobPoint": 3700 },
      { "Lv": 5, "RequireJobLevel": 44, "RequireJobPoint": 4500 },
      { "Lv": 6, "RequireJobLevel": 46, "RequireJobPoint": 5700 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 6900 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 8100 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 9500 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 11500 }
    ]
  },
  {
    "SkillNo": 12,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 40, "RequireJobPoint": 0 },
      { "Lv": 2, "RequireJobLevel": 43, "RequireJobPoint": 2800 },
      { "Lv": 3, "RequireJobLevel": 47, "RequireJobPoint": 3400 },
      { "Lv": 4, "RequireJobLevel": 50, "RequireJobPoint": 4200 },
      { "Lv": 5, "RequireJobLevel": 53, "RequireJobPoint": 5000 },
      { "Lv": 6, "RequireJobLevel": 56, "RequireJobPoint": 6500 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 8000 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 9500 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 11000 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 13500 }
    ]
  },
  {
    "SkillNo": 13,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 40, "RequireJobPoint": 0 },
      { "Lv": 2, "RequireJobLevel": 45, "RequireJobPoint": 3000 },
      { "Lv": 3, "RequireJobLevel": 50, "RequireJobPoint": 3600 },
      { "Lv": 4, "RequireJobLevel": 56, "RequireJobPoint": 4500 },
      { "Lv": 5, "RequireJobLevel": 62, "RequireJobPoint": 5500 },
      { "Lv": 6, "RequireJobLevel": 67, "RequireJobPoint": 7000 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 8500 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 10000 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 11500 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 14000 }
    ]
  },
  {
    "SkillNo": 14,
    "Job": 1,
    "Params": [
      { "Lv": 1, "RequireJobLevel": 60, "RequireJobPoint": 0 },
      { "Lv": 2, "RequireJobLevel": 62, "RequireJobPoint": 3300 },
      { "Lv": 3, "RequireJobLevel": 64, "RequireJobPoint": 3900 },
      { "Lv": 4, "RequireJobLevel": 68, "RequireJobPoint": 4800 },
      { "Lv": 5, "RequireJobLevel": 72, "RequireJobPoint": 6000 },
      { "Lv": 6, "RequireJobLevel": 75, "RequireJobPoint": 7500 },
      { "Lv": 7, "RequireJobLevel": 0, "RequireJobPoint": 9000 },
      { "Lv": 8, "RequireJobLevel": 0, "RequireJobPoint": 10500 },
      { "Lv": 9, "RequireJobLevel": 0, "RequireJobPoint": 12000 },
      { "Lv": 10, "RequireJobLevel": 0, "RequireJobPoint": 14500 }
    ]
  },
  {
    "SkillNo": 104,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 204,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 102,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 202,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 108,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 208,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 103,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  },
  {
    "SkillNo": 203,
    "Job": 1,
    "Params": [ { "Lv": 1, "RequireJobLevel": 1, "RequireJobPoint": 0 } ]
  }
];

export const abilityData: AbilityData[] = [];
export const secretAbilityData: AbilityData[] = [];

// ============================================================
// 4. VOCATION SKILL ARRAYS & OFFICIAL DATA
// ============================================================

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
    description: 'A dash forward that ends with a lunged stab to the enemy; damage is higher the further the dash distance.',
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
    description: 'Deals a barrage of blows on the enemy with the shield.',
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
    description: 'Unleashes a flurry of skyward slashes well-suited to bringing flying foes to the ground.',
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
    description: 'Traces a grand upward arc with the sword, sending lightweight enemies into the air.',
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
    description: 'Unleashes a flurry of stabbing attacks at the enemy while blocking with the shield.',
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
    description: 'Spins with blade extended, drawing a circular slash twice around you.',
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
    description: 'Ducks backward to evade attack before charging in to deliver a slashing blow. If timed correctly to evade an attack, this increases its power.',
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
    description: 'Fire multiple arrows in quick succession. Staggers large enemies.',
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
    description: 'Fires three arrow in a wedge pattern.',
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
    description: 'Sends a wall of arrows skyward to rain down on a broad area.',
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
    description: 'Fires a hot capable of piercing multiple targets.',
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
    description: 'Draws the bow with all the user’s might, then looses a shot straight ahead. Power greatly increases if released as maximum charge is reached.',
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
    description: 'Applies an explosive to stun effect all arrows loaded. Increase damage inflicted.',
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
    description: 'Creates a healing zone that rapidly restores HP. Only recovers grey health. Damages undead.',
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
    description: 'Creates 3 magick spheres that rapidly orbit around you. Nullifies one incoming attack per sphere.',
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
    description: 'Focus a prayer on nearby allies, hastening the charging of all their skills that display a charge gauge.',
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
    description: 'Emits an aura of Endurance. Applies a temporary increase to nearby allies. Can be used with Field Shift.',
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
    description: 'Emits an aura of Attack and Magick power. Applies a temporary increase to nearby allies. Can be used with Field Shift.',
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
    description: 'After charging, launch tracking projectiles. Fires magick spheres of Holy attribute.',
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
    description: 'Continuously shine rod’s radiance on foes to build Torpor status. When force gauge ↑1, consumes to enhance effect.',
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
    description: 'Fires magick arrows that create health-restoring fields on impact. Fields damage undead enemies in range.',
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
    description: 'Fires magick arrows that lodge in enemies. Attacking embedded arrows triggers explosions, knocking back nearby foes from the blast.',
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
    description: 'Fires multiple magick arrows with there Ice attribute at a single point.',
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
    description: 'Charges to slam foes with blade. High Stun potential. Perfect release timing maximises damage.',
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
    description: 'Launch enemies upward with a slash.',
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
    description: 'Swing the lance around and attack the surrounding area. Can be activated in air.',
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
    description: 'Gather energy and thrust forward, releasing a blast of energy. The first strike always chases an enemy.',
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
    description: 'Creates an energy pool that heals and grants Defense boost to allies who enter. Lasts a limited time.',
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
    description: 'Spin the lance all-around, continuously slashing forward. The last blow’s power changes according to the number of attacks made.',
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
    description: 'Creates an orb that emits shockwaves when struck. Absorbs spirit energy from attacks. Manual detonation available both on ground and in air.',
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
    description: 'Form spiritual spheres around yourself that recovers health and status abnormalities. The range grows depending on the charge time. The effectiveness rises upon a full charge.',
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
    description: 'Forms a protective barrier that blocks attacks. Striking enemies stores spirit energy, releasable with button input.',
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
    description: 'A high power skill that covers a wide area. If the first hit is successfully landed, it will become a full on combo attack.',
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
    description: 'Expands an area that boosts damage and knock back for nearby allies’ enchantments/crests. If used as a counter: Effect↑ + Size↑.',
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
    description: 'Creates a phantom and teleports forward. Contact during warp deals magick damage. Two aerial uses.',
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
export const VOCATION_JOB_NO_MAP: Record<string, number> = {
  fighter: 1,
  seeker: 2,
  hunter: 3,
  priest: 4,
  shield_sage: 5,
  sorcerer: 6,
  warrior: 7,
  element_archer: 8,
  alchemist: 9,
  spirit_lancer: 10,
  high_scepter: 11
};

export const VOCATION_ABILITY_START_NO: Record<string, number> = {
  fighter: 1,
  hunter: 26,
  priest: 51,
  shield_sage: 76,
  seeker: 101,
  sorcerer: 126,
  element_archer: 151,
  warrior: 176,
  alchemist: 201,
  spirit_lancer: 404,
  high_scepter: 461
};

export const SLOT_PROGRESSIONS: Record<number, { unlockLevel: number; reqLevels: number[]; jpCosts: number[] }> = {
  1: {
    unlockLevel: 1,
    reqLevels: [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
    jpCosts: [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
  },
  2: {
    unlockLevel: 6,
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  3: {
    unlockLevel: 6,
    reqLevels: [6, 9, 13, 16, 18, 20, 0, 0, 0, 0],
    jpCosts: [500, 800, 1200, 1600, 2100, 3000, 4000, 5200, 6400, 8400]
  },
  4: {
    unlockLevel: 3,
    reqLevels: [3, 6, 9, 12, 15, 18, 0, 0, 0, 0],
    jpCosts: [300, 600, 900, 1300, 1800, 2600, 3500, 4500, 5500, 7500]
  },
  5: {
    unlockLevel: 20,
    reqLevels: [20, 22, 25, 27, 30, 32, 0, 0, 0, 0],
    jpCosts: [1200, 1500, 2000, 2500, 3000, 3900, 4800, 5800, 7000, 9000]
  },
  6: {
    unlockLevel: 25,
    reqLevels: [25, 27, 30, 32, 35, 38, 0, 0, 0, 0],
    jpCosts: [1500, 1800, 2400, 3000, 3600, 4500, 5400, 6400, 7500, 9500]
  },
  7: {
    unlockLevel: 13,
    reqLevels: [13, 15, 18, 20, 23, 27, 0, 0, 0, 0],
    jpCosts: [900, 1200, 1600, 2000, 2500, 3400, 4400, 5600, 6800, 8800]
  },
  8: {
    unlockLevel: 13,
    reqLevels: [13, 15, 18, 20, 23, 27, 0, 0, 0, 0],
    jpCosts: [900, 1200, 1600, 2000, 2500, 3400, 4400, 5600, 6800, 8800]
  },
  9: {
    unlockLevel: 30,
    reqLevels: [30, 32, 35, 38, 40, 42, 0, 0, 0, 0],
    jpCosts: [1800, 2100, 2700, 3300, 3900, 4900, 5900, 6800, 8000, 10000]
  },
  10: {
    unlockLevel: 30,
    reqLevels: [30, 32, 35, 38, 40, 42, 0, 0, 0, 0],
    jpCosts: [1800, 2100, 2700, 3300, 3900, 4900, 5900, 6800, 8000, 10000]
  },
  11: {
    unlockLevel: 35,
    reqLevels: [35, 37, 39, 42, 44, 46, 0, 0, 0, 0],
    jpCosts: [2100, 2400, 3000, 3700, 4500, 5700, 6900, 8100, 9500, 11500]
  },
  12: {
    unlockLevel: 40,
    reqLevels: [40, 43, 47, 50, 53, 56, 0, 0, 0, 0],
    jpCosts: [0, 2800, 3400, 4200, 5000, 6500, 8000, 9500, 11000, 13500]
  },
  13: {
    unlockLevel: 40,
    reqLevels: [40, 45, 50, 56, 62, 67, 0, 0, 0, 0],
    jpCosts: [0, 3000, 3600, 4500, 5500, 7000, 8500, 10000, 11500, 14000]
  },
  14: {
    unlockLevel: 60,
    reqLevels: [60, 62, 64, 68, 72, 75, 0, 0, 0, 0],
    jpCosts: [0, 3300, 3900, 4800, 6000, 7500, 9000, 10500, 12000, 14500]
  }
};

export function formatSkillName(rawName: string): string {
  if (!rawName) return '';
  const spaced = rawName
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim();
  
  return spaced
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bOf\b/g, 'of')
    .replace(/\bThe\b/g, 'the');
}

// Helper to calculate custom skill total JP
export function getSkillTotalJp(jpCosts: number[]): number {
  return jpCosts.reduce((a, b) => a + b, 0);
}

/**
 * Enriches a vocation with the official Skill No, reqLevelPerRank, jpCostPerRank, names, and totalJpToMax
 * while preserving all custom Job Training (修練) trials.
 */
export function enrichVocationWithJobSkillData(voc: any): any {
  const jobNo = VOCATION_JOB_NO_MAP[voc.id];
  const startAbilityNo = VOCATION_ABILITY_START_NO[voc.id] || 1;

  // Enrich Custom Skills
  const customSkills = (voc.customSkills || []).map((skill: any, idx: number) => {
    const skillNo = skill.skillNo || (idx + 1);
    const key = `${jobNo}_${skillNo}`;
    const mappedRawName = skillNameMap[key];
    const formattedName = mappedRawName ? formatSkillName(mappedRawName) : skill.name;
    const officialSkill = getOfficialSkillDef(jobNo, skillNo);

    let jpCostPerRank: number[];
    let reqLevelPerRank: number[];
    let unlockLevel: number;

    if (officialSkill && officialSkill.Params && officialSkill.Params.length > 0) {
      jpCostPerRank = officialSkill.Params.map(p => p.RequireJobPoint);
      reqLevelPerRank = officialSkill.Params.map(p => p.RequireJobLevel);
      unlockLevel = officialSkill.Params[0].RequireJobLevel || (skillNo === 1 ? 1 : (skill.unlockLevel || 1));
    } else {
      const slotDef = SLOT_PROGRESSIONS[skillNo] || {
        unlockLevel: skill.unlockLevel || 1,
        reqLevels: skill.reqLevelPerRank || [0, 3, 6, 9, 12, 15, 0, 0, 0, 0],
        jpCosts: skill.jpCostPerRank || [0, 300, 600, 1000, 1500, 2300, 3200, 4200, 5200, 7200]
      };
      jpCostPerRank = slotDef.jpCosts;
      reqLevelPerRank = slotDef.reqLevels;
      unlockLevel = slotDef.unlockLevel;
    }

    const totalJpToMax = jpCostPerRank.reduce((a: number, b: number) => a + b, 0);

    return {
      ...skill,
      id: skill.id || `${voc.id}_skill_${skillNo}`,
      skillNo,
      name: formattedName,
      jpName: skill.jpName || mappedRawName,
      type: 'custom' as const,
      unlockLevel,
      maxRank: 10,
      reqLevelPerRank,
      jpCostPerRank,
      totalJpToMax,
      jobTraining: skill.jobTraining || []
    };
  });

  // Enrich Augments (Abilities)
  const augments = (voc.augments || []).map((aug: any, idx: number) => {
    const abilityNo = aug.abilityNo || (startAbilityNo + idx);
    const rawAbilityName = abilityNameMap[abilityNo];
    const formattedName = rawAbilityName ? formatSkillName(rawAbilityName) : aug.name;
    const officialAbility = getOfficialAbilityDef(abilityNo);

    let ppCost = aug.ppCost || 4;
    let jpCostPerRank = aug.jpCostPerRank || [300, 400, 500, 800, 1000, 2000];
    let reqLevelPerRank = aug.reqLevelPerRank || [1, 5, 10, 20, 30, 40];
    let unlockLevel = aug.unlockLevel || 1;

    if (officialAbility && officialAbility.Params && officialAbility.Params.length > 0) {
      ppCost = officialAbility.Cost !== undefined ? officialAbility.Cost : ppCost;
      jpCostPerRank = officialAbility.Params.map(p => p.RequireJobPoint);
      reqLevelPerRank = officialAbility.Params.map(p => p.RequireJobLevel);
      unlockLevel = officialAbility.Params[0].RequireJobLevel || unlockLevel;
    }

    const totalJpToMax = jpCostPerRank.reduce((a: number, b: number) => a + b, 0);

    return {
      ...aug,
      abilityNo,
      name: formattedName,
      jpName: aug.jpName || rawAbilityName,
      ppCost,
      unlockLevel,
      maxRank: jpCostPerRank.length,
      reqLevelPerRank,
      jpCostPerRank,
      totalJpToMax,
      jobTraining: aug.jobTraining || []
    };
  });

  return {
    ...voc,
    customSkills,
    augments
  };
}


