import { SpotSearchCategory, SpotSearchStageScope } from '../types';

export interface SpotSearchResult {
  id: string;
  name: string;
  jpName?: string;
  category: SpotSearchCategory;
  area: string;
  stageName: string;
  subLocation: string;
  coordinates?: string;
  details: string;
  dropRate?: string;
  typeBadge: string;
  relatedQuests?: string[];
  recommendedLevel?: number;
}

export const SPOT_SEARCH_DATABASE: SpotSearchResult[] = [
  // ==========================================
  // ITEMS CATEGORY
  // ==========================================
  {
    id: 'spot_item_001',
    name: 'Pure Dragon Scale',
    jpName: '純竜の鱗',
    category: 'ITEMS',
    area: 'Mergoda Palace Depths',
    stageName: 'Mergoda Ruins',
    subLocation: 'Royal Sanctum Boss Arena (Floor B3)',
    coordinates: 'X: 412, Y: 890 (Stage ID: st_mergoda_09)',
    details: 'Dropped by White Dragon Sovereign and Dread Dragon Vanguard. Required for Lv 85–100 equipment craft & reinforcement.',
    dropRate: '40% Drop / Break Horn',
    typeBadge: 'Dragonkin Boss Drop',
    relatedQuests: ['Grand Mission: Sovereign Dragon Trial', 'q00034010'],
    recommendedLevel: 90
  },
  {
    id: 'spot_item_002',
    name: 'Meteor Iron Ingot',
    jpName: 'メテオライトインゴット',
    category: 'ITEMS',
    area: 'Melgos Ruins / Volden Mines',
    stageName: 'Melgos Ruins',
    subLocation: 'Volcanic Core Crater Chasm',
    coordinates: 'X: 188, Y: 642 (Stage ID: st_volcano_03)',
    details: 'Mined from glowing celestial impact nodes and dropped by Magma Golems. Key ingredient for high-grade armors and weapons.',
    dropRate: 'Mining Node (45%) / Golem Drop (25%)',
    typeBadge: 'Refined Metal / Ore',
    relatedQuests: ['Volcano Material Expedition', 'wq_20_01'],
    recommendedLevel: 75
  },
  {
    id: 'spot_item_003',
    name: 'Dragon Knight Broadsword',
    jpName: 'ドラゴンナイトソード',
    category: 'ITEMS',
    area: 'Mergoda Palace Depths',
    stageName: 'Mergoda Ruins',
    subLocation: 'Sovereign Treasure Sarcophagus',
    coordinates: 'X: 410, Y: 895 (Stage ID: st_mergoda_09)',
    details: 'Direct craft via White Dragon Temple Smithy using Pure Dragon Scales & Meteor Iron. Also drops from Grand Sovereign Vault Chest.',
    dropRate: 'Craftable / 8% Vault Chest',
    typeBadge: 'Main Weapon (Sword)',
    relatedQuests: ['Season 3.4 Sovereign Finale'],
    recommendedLevel: 90
  },
  {
    id: 'spot_item_004',
    name: 'Wyrmfang Daggers',
    jpName: '竜牙のダガー',
    category: 'ITEMS',
    area: 'Volcanic Caldera / Melgos',
    stageName: 'Melgos Ruins',
    subLocation: 'Elder Drake Lair (North Cavern)',
    coordinates: 'X: 230, Y: 580 (Stage ID: st_melgos_02)',
    details: 'Harvested from Elder Drake fangs. High aerial damage daggers with persistent fire attribute.',
    dropRate: '12% Monster Drop / Craftable',
    typeBadge: 'Main Weapon (Daggers)',
    relatedQuests: ['Drake Extermination Order'],
    recommendedLevel: 85
  },
  {
    id: 'spot_item_005',
    name: 'Arch-Mage Scepter of Megado',
    jpName: 'メガドの大杖',
    category: 'ITEMS',
    area: 'Megadosys Plateau Spire',
    stageName: 'Megadosys Plateau',
    subLocation: 'Celestial Spire Apex Sanctuary',
    coordinates: 'X: 880, Y: 320 (Stage ID: st_megado_08)',
    details: 'Awarded upon conquering the Megado Ancient Trial Raid. Best-in-slot Dark/Thunder archstaff for Sorcerers.',
    dropRate: '100% Raid Token Exchange',
    typeBadge: 'Main Weapon (Archstaff)',
    relatedQuests: ['Megado Ancient Trial Raid', 'q00033010'],
    recommendedLevel: 93
  },
  {
    id: 'spot_item_006',
    name: 'Sovereign Dragon Cuirass',
    jpName: '白竜の重鎧',
    category: 'ITEMS',
    area: 'White Dragon Inner Chamber',
    stageName: 'WDT / High Citadel',
    subLocation: 'Grand Altar of the White Dragon',
    coordinates: 'X: 500, Y: 500 (Stage ID: st_wdt_sanctum)',
    details: 'Ultimate heavy plate armor crafted from pure White Dragon molten scales and Sovereign Ingots.',
    dropRate: 'Guaranteed Craft Token',
    typeBadge: 'Body Armor (Heavy Plate)',
    relatedQuests: ['Grand Mission: White Dragon Trial'],
    recommendedLevel: 93
  },
  {
    id: 'spot_item_007',
    name: 'Elixir of the White Dragon',
    jpName: '白竜の霊薬',
    category: 'ITEMS',
    area: 'Elan Water Grove',
    stageName: 'Elan Water Grove',
    subLocation: 'Sacred Wellspring of Rebirth',
    coordinates: 'X: 340, Y: 720 (Stage ID: st_elan_04)',
    details: 'Miraculous curative that fully replenishes HP and Stamina while clearing all status debuffs.',
    dropRate: 'Gathering Spot (20%) / Sovereign Drop (35%)',
    typeBadge: 'Consumable (Elixir)',
    relatedQuests: ['Water Grove Purification'],
    recommendedLevel: 70
  },
  {
    id: 'spot_item_008',
    name: 'Ring of the Dragon Slayer',
    jpName: '竜殺しの指輪',
    category: 'ITEMS',
    area: 'Bloodbane Isle Apex',
    stageName: 'Bloodbane Isle',
    subLocation: 'Ancient Dragonkin Sarcophagus',
    coordinates: 'X: 620, Y: 180 (Stage ID: st_bloodbane_06)',
    details: 'Ancient heirloom ring granting +20% damage vs dragonkin species and +10% critical rate.',
    dropRate: '8% Vault Chest / Craftable',
    typeBadge: 'Jewelry (Ring)',
    relatedQuests: ['Bloodbane Isle Expedition'],
    recommendedLevel: 85
  },
  {
    id: 'spot_item_009',
    name: 'Everburning Mystic Lantern',
    jpName: '常夜の神秘ランタン',
    category: 'ITEMS',
    area: 'Volden Mines Deep Chasm',
    stageName: 'Volden Mines',
    subLocation: 'Eternal Flame Chamber',
    coordinates: 'X: 190, Y: 430 (Stage ID: st_volden_deep)',
    details: 'Alchemical lantern that never runs dry of oil and illuminates even while fully submerged underwater.',
    dropRate: '10% Fire Elemental Lord Drop',
    typeBadge: 'Lantern',
    relatedQuests: ['Deep Mine Fire Anomaly'],
    recommendedLevel: 50
  },
  {
    id: 'spot_item_010',
    name: 'Dark Matter Crystal',
    jpName: 'ダークマター結晶',
    category: 'ITEMS',
    area: 'Megadosys Plateau Spire',
    stageName: 'Megadosys Plateau',
    subLocation: 'Abyssal Void Rift',
    coordinates: 'X: 790, Y: 410 (Stage ID: st_megado_void)',
    details: 'Alchemically refined crystal extracted from Dark Overlords. Used for Season 3.3 and 3.4 upgrades.',
    dropRate: '28% Archdemon Drop',
    typeBadge: 'Material (Alchemy Crystal)',
    relatedQuests: ['wq_21_01', 'wq_21_02'],
    recommendedLevel: 90
  },

  // ==========================================
  // ENEMIES CATEGORY
  // ==========================================
  {
    id: 'spot_enemy_001',
    name: 'White Dragon Sovereign',
    jpName: '白竜',
    category: 'ENEMIES',
    area: 'White Dragon Temple / Palace Depths',
    stageName: 'WDT / High Citadel',
    subLocation: 'Inner Sanctum of Lestania',
    coordinates: 'X: 500, Y: 500 (Stage ID: st_wdt_sanctum)',
    details: 'The supreme guardian entity of Lestania. Yields Pure Dragon Scales, White Dragon Horns, and sovereign crest tokens.',
    dropRate: 'Boss Drops (Pure Scale 40%, Horn 25%, Core 10%)',
    typeBadge: 'Sovereign Dragonkin (Lv 90–120)',
    relatedQuests: ['Grand Mission: Sovereign Dragon Trial', 'q00034010'],
    recommendedLevel: 90
  },
  {
    id: 'spot_enemy_002',
    name: 'Dark Overlord Archdemon',
    jpName: '冥府の大悪魔',
    category: 'ENEMIES',
    area: 'Megadosys Plateau Spire',
    stageName: 'Megadosys Plateau',
    subLocation: 'Celestial Apex Gate',
    coordinates: 'X: 880, Y: 320 (Stage ID: st_megado_08)',
    details: 'Enormous demon wielding catastrophic dark spells. Primary source of Megado Primordial Cores and Dark Matter Crystals.',
    dropRate: 'Core 18%, Dark Matter 28%',
    typeBadge: 'Demon Boss (Lv 93+)',
    relatedQuests: ['wq_21_01', 'Megado Ancient Trial Raid'],
    recommendedLevel: 93
  },
  {
    id: 'spot_enemy_003',
    name: 'Elder Drake',
    jpName: 'エルダーエント',
    category: 'ENEMIES',
    area: 'Volcanic Caldera / Melgos Ruins',
    stageName: 'Melgos Ruins',
    subLocation: 'Molten Core Crater',
    coordinates: 'X: 230, Y: 580 (Stage ID: st_melgos_02)',
    details: 'Fierce winged fire dragon. Weak to Ice. Drops Fire Drake Fangs, Dragon Bones, and Molten Core Shards.',
    dropRate: 'Drake Fang 35%, Molten Shard 20%',
    typeBadge: 'Dragonkin (Lv 60–85)',
    relatedQuests: ['Drake Extermination Order'],
    recommendedLevel: 65
  },
  {
    id: 'spot_enemy_004',
    name: 'Grand Gryphon',
    jpName: 'グランドグリフィン',
    category: 'ENEMIES',
    area: 'Misery Peak / Whispering Woods',
    stageName: 'Misery Forest',
    subLocation: 'High Cliff Roosting Ledge',
    coordinates: 'X: 670, Y: 220 (Stage ID: st_misery_05)',
    details: 'Storm-imbued aerial beast. Targets of numerous Hunter, Seeker, and Fighter job trials.',
    dropRate: 'Gryphon Talon 25%, Sinew String 30%',
    typeBadge: 'Flying Beast (Lv 35–60)',
    relatedQuests: ['Job Trial: Gryphon Hunt', 'wq_03_05'],
    recommendedLevel: 45
  },
  {
    id: 'spot_enemy_005',
    name: 'Armor Cyclops',
    jpName: 'アーマーサイクロプス',
    category: 'ENEMIES',
    area: 'Bettland Plains Fort / Dow Valley',
    stageName: 'Bettland Plains',
    subLocation: 'Ruined Fortress Courtyard',
    coordinates: 'X: 310, Y: 460 (Stage ID: st_bettland_02)',
    details: 'Armored giant with heavy plate legs and helmet. Climb to shatter helmet armor for massive headshot damage.',
    dropRate: 'Cyclops Eye 30%, Heavy Armor Scrap 40%',
    typeBadge: 'Giant (Lv 25–55)',
    relatedQuests: ['wq_07_01', 'Job Trial: Armor Breaker'],
    recommendedLevel: 30
  },

  // ==========================================
  // GATHERING CATEGORY
  // ==========================================
  {
    id: 'spot_gath_001',
    name: 'Meteor Ore Impact Mining Node',
    jpName: '隕鉄の採掘ポイント',
    category: 'GATHERING',
    area: 'Melgos Crater / Volden Deep',
    stageName: 'Melgos Ruins',
    subLocation: 'Impact Basin Rim',
    coordinates: 'X: 195, Y: 635 (Stage ID: st_volcano_03)',
    details: 'Rich celestial ore vein. Requires Pickaxe. Yields Meteor Ore, Volcanic Coal, and Lumina Ore.',
    dropRate: 'Pickaxe Gathering (3–5 yields per node)',
    typeBadge: 'Mining Spot (Rich Ore)',
    relatedQuests: ['Volcano Resource Run'],
    recommendedLevel: 65
  },
  {
    id: 'spot_gath_002',
    name: 'Lumina Moth Silk Cocoon Grove',
    jpName: 'ルミナ繭の採取ポイント',
    category: 'GATHERING',
    area: 'Morrow Forest / Deenan Woods',
    stageName: 'Morrow Forrest',
    subLocation: 'Bioluminescent Canopy Hollow',
    coordinates: 'X: 520, Y: 440 (Stage ID: st_morrow_03)',
    details: 'Shimmering wild cocoons hanging from ancient spirit trees. Used to weave Lumina Silk Cloth.',
    dropRate: 'Botanical Gathering (50% Silk Cocoon)',
    typeBadge: 'Harvesting Spot (Flora)',
    relatedQuests: ['Grove Restoration'],
    recommendedLevel: 70
  },
  {
    id: 'spot_gath_003',
    name: 'Sacred Wellspring of Elan',
    jpName: 'エランの聖なる泉',
    category: 'GATHERING',
    area: 'Elan Water Grove',
    stageName: 'Elan Water Grove',
    subLocation: 'Crystal Spring Basin',
    coordinates: 'X: 345, Y: 725 (Stage ID: st_elan_04)',
    details: 'Pure enchanted water spring. Supplies Holy Water Vials and Spirit Waters for elixir brewing.',
    dropRate: 'Liquid Gathering (100% Water extraction)',
    typeBadge: 'Spring Well (Liquid)',
    relatedQuests: ['Holy Water Collection'],
    recommendedLevel: 60
  }
];

export function querySpotSearch(
  query: string,
  category: SpotSearchCategory,
  stageScope: SpotSearchStageScope,
  currentStageFilter?: string
): SpotSearchResult[] {
  const cleanQ = query.trim().toLowerCase();
  
  return SPOT_SEARCH_DATABASE.filter(item => {
    // 1. Check Category
    if (category !== item.category) {
      // If query specifically matches the name, allow matching even if cross-category unless strict
      const nameMatches = cleanQ && item.name.toLowerCase().includes(cleanQ);
      if (!nameMatches) return false;
    }

    // 2. Check Stage Scope
    if (stageScope === 'THIS STAGE' && currentStageFilter) {
      if (!item.stageName.toLowerCase().includes(currentStageFilter.toLowerCase()) &&
          !item.area.toLowerCase().includes(currentStageFilter.toLowerCase())) {
        return false;
      }
    }

    // 3. Check Query
    if (!cleanQ) return true;

    return (
      item.name.toLowerCase().includes(cleanQ) ||
      (item.jpName && item.jpName.toLowerCase().includes(cleanQ)) ||
      item.area.toLowerCase().includes(cleanQ) ||
      item.stageName.toLowerCase().includes(cleanQ) ||
      item.subLocation.toLowerCase().includes(cleanQ) ||
      item.details.toLowerCase().includes(cleanQ) ||
      item.typeBadge.toLowerCase().includes(cleanQ)
    );
  });
}
