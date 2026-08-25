const fs = require('fs');
const path = require('path');

// Locate files
const itemsDataPath = fs.existsSync('./src/data/ItemsData.txt') 
  ? './src/data/ItemsData.txt' 
  : './ItemsData.txt';

const itemsCompletePath = fs.existsSync('./src/data/items_complete.txt')
  ? './src/data/items_complete.txt'
  : (fs.existsSync('./items_complete.txt') ? './items_complete.txt' : './src/data/items_complete.txt');

console.log('Reading:', itemsDataPath, itemsCompletePath);

const itemsDataContent = fs.readFileSync(itemsDataPath, 'utf8');
const itemsCompleteContent = fs.readFileSync(itemsCompletePath, 'utf8');

// Extract categories
const categoryMap = {
  'EQUIP_CATEGORY_ACCESSORY': 'Accessory',
  'EQUIP_CATEGORY_ARMOR_ARM': 'Arm Armor',
  'EQUIP_CATEGORY_ARMOR_BODY': 'Body Armor',
  'EQUIP_CATEGORY_ARMOR_HELM': 'Helm',
  'EQUIP_CATEGORY_ARMOR_LEG': 'Leg Armor',
  'EQUIP_CATEGORY_WEAPON_MAIN': 'Main Weapon',
  'EQUIP_CATEGORY_WEAPON_OFF': 'Off Weapon',
  'EQUIP_CATEGORY_WEAR_BODY': 'Body Wear',
  'EQUIP_CATEGORY_WEAR_LEG': 'Leg Wear',
  'EQUIP_CATEGORY_LANTERN': 'Lantern',
  'EQUIP_CATEGORY_JEWELRY': 'Jewelry',
  'EQUIP_CATEGORY_JOBITEM': 'Job Item',
  'EQUIP_CATEGORY_KEYITEM': 'Key Item',
  'EQUIP_CATEGORY_MATERIAL': 'Material',
  'EQUIP_CATEGORY_CONSUMABLE': 'Consumable',
  'EQUIP_CATEGORY_SPECIAL': 'Special',
  // Non-equip category fallbacks
  'accessory': 'Accessory',
  'armor_arm': 'Arm Armor',
  'armor_body': 'Body Armor',
  'armor_helm': 'Helm',
  'armor_leg': 'Leg Armor',
  'weapon_main': 'Main Weapon',
  'weapon_off': 'Off Weapon',
  'wear_body': 'Body Wear',
  'wear_leg': 'Leg Wear',
  'lantern': 'Lantern',
  'jewelry': 'Jewelry',
  'jobitem': 'Job Item',
  'keyitem': 'Key Item',
  'material': 'Material',
  'consumable': 'Consumable',
  'special': 'Special'
};

function mapCategory(equipSlot, fallbackCategory) {
  if (equipSlot && categoryMap[equipSlot]) return categoryMap[equipSlot];
  if (fallbackCategory && categoryMap[fallbackCategory]) return categoryMap[fallbackCategory];
  if (equipSlot) {
    return equipSlot.replace('EQUIP_CATEGORY_', '').replace(/_/g, ' ');
  }
  return 'Material';
}

function mapJob(jobName) {
  return jobName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/ShieldSage/g, 'Shield Sage')
    .replace(/ElementArcher/g, 'Element Archer')
    .replace(/SpiritLancer/g, 'Spirit Lancer')
    .replace(/HighScepter/g, 'High Scepter');
}

// 1. Extract existing items & categories from ItemsData.txt
let categories = [];
let existingItems = [];

try {
  // Extract ITEM_CATEGORIES array
  const catMatch = itemsDataContent.match(/export const ITEM_CATEGORIES[^=]*=\s*(\[[\s\S]*?\]);/);
  if (catMatch) {
    categories = eval(catMatch[1]);
  }
} catch (e) {
  console.warn('Failed to eval categories:', e.message);
}

// If categories empty, provide standard defaults
if (!categories || categories.length === 0) {
  categories = [
    { id: 'Accessory', name: 'Accessory', url: 'https://reference.dd-on.com/build/items_accessory.html', description: 'Earrings, talismans, charms, and mantles boosting passive attributes and elemental resistances.' },
    { id: 'Arm Armor', name: 'Arm Armor', url: 'https://reference.dd-on.com/build/items_armor_arm.html', description: 'Gauntlets, bracers, vambraces, and armguards providing physical/magical defense and crest slots.' },
    { id: 'Body Armor', name: 'Body Armor', url: 'https://reference.dd-on.com/build/items_armor_body.html', description: 'Heavy plate armor, cuirasses, hauberks, coats, and robes granting core protection.' },
    { id: 'Helm', name: 'Helm', url: 'https://reference.dd-on.com/build/items_armor_helm.html', description: 'Helmets, armets, mitres, circlets, sallets, and hoods protecting the head.' },
    { id: 'Leg Armor', name: 'Leg Armor', url: 'https://reference.dd-on.com/build/items_armor_leg.html', description: 'Sabatons, greaves, boots, and sandals for mobility, defense, and stamina stability.' },
    { id: 'Consumable', name: 'Consumable', url: 'https://reference.dd-on.com/build/items_consumable.html', description: 'Potions, draughts, holy waters, elixirs, and curatives.' },
    { id: 'Jewelry', name: 'Jewelry', url: 'https://reference.dd-on.com/build/items_jewelry.html', description: 'Rings, beads, and enchanted bands granting offensive and defensive passives.' },
    { id: 'Job Item', name: 'Job Item', url: 'https://reference.dd-on.com/build/items_jobitem.html', description: 'Special arrows, job tools, skill awakening items, and hunter equipment.' },
    { id: 'Key Item', name: 'Key Item', url: 'https://reference.dd-on.com/build/items_keyitem.html', description: 'Relics, vessels of life, sanctum crest keys, and quest tokens.' },
    { id: 'Lantern', name: 'Lantern', url: 'https://reference.dd-on.com/build/items_lantern.html', description: 'Illumination lanterns, detection lanterns, and specialty oil lamps.' },
    { id: 'Material', name: 'Material', url: 'https://reference.dd-on.com/build/items_material.html', description: 'Ores, minerals, sand crafting materials, monster parts, and upgrade components.' },
    { id: 'Special', name: 'Special', url: 'https://reference.dd-on.com/build/items_special.html', description: 'Furniture recipes, blueprints, customization scrolls, and event rewards.' },
    { id: 'Main Weapon', name: 'Main Weapon', url: 'https://reference.dd-on.com/build/items_weapon_main.html', description: 'Primary weapons: swords, daggers, bows, staves, and spears.' },
    { id: 'Off Weapon', name: 'Off Weapon', url: 'https://reference.dd-on.com/build/items_weapon_off.html', description: 'Secondary weapons: shields, rods, and tactical accessories.' },
    { id: 'Body Wear', name: 'Body Wear', url: 'https://reference.dd-on.com/build/items_wear_body.html', description: 'Under-armor garments, inner shirts, and combat suits.' },
    { id: 'Leg Wear', name: 'Leg Wear', url: 'https://reference.dd-on.com/build/items_wear_leg.html', description: 'Undergarment hose, leggings, and mobility tights.' }
  ];
}

try {
  // Extract ALL_ITEMS
  const itemsMatch = itemsDataContent.match(/export const ALL_ITEMS:\s*ItemData\[\]\s*=\s*(\[[\s\S]*?\]);\s*export function/);
  if (itemsMatch) {
    existingItems = eval(itemsMatch[1]);
  }
} catch (e) {
  console.warn('Failed to eval existing items:', e.message);
}

console.log('Loaded existing items count:', existingItems.length);

// 2. Parse items_complete.txt
const blocks = itemsCompleteContent.split(/={50,}/).filter(b => b.trim() !== '');
console.log('Total blocks found in items_complete.txt:', blocks.length);

const rawItems = [];

for (const block of blocks) {
  // Look for Category: xxx
  const catHeaderMatch = block.match(/Category:\s*([^\r\n]+)/i);
  const blockCategory = catHeaderMatch ? catHeaderMatch[1].trim() : '';

  const jsonMatch = block.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const obj = JSON.parse(jsonMatch[0]);
      if (blockCategory && !obj.category_header) {
        obj.category_header = blockCategory;
      }
      rawItems.push(obj);
    } catch (e) {
      // skip invalid JSON
    }
  }
}

console.log('Parsed raw JSON items count:', rawItems.length);

function convertItem(raw) {
  const {
    item_id,
    name,
    info,
    jobs = [],
    sell_price,
    weight,
    item_level,
    crest_slots,
    quality,
    can_bazaar,
    equip_slot,
    category_header,
    level,
    stats = {},
    params = [],
    craft_recipe = [],
    gradeup_recipe = [],
  } = raw;

  const category = mapCategory(equip_slot, category_header);
  const subType = equip_slot 
    ? equip_slot.replace('EQUIP_CATEGORY_', '').replace(/_/g, ' ') 
    : (category_header || category);

  // Build params map
  const paramsMap = {};
  if (Array.isArray(params)) {
    for (const p of params) {
      if (p && p.name) {
        // Format parameter name cleanly
        const cleanName = p.name
          .toLowerCase()
          .split('_')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        paramsMap[cleanName] = p.value;
      }
    }
  }

  const item = {
    id: `item_${item_id}`,
    itemId: item_id,
    name: name || `Item #${item_id}`,
    jpName: info || '',
    category: category,
    subType: subType,
    stars: quality || 0,
    ir: item_level || 0,
    reqLevel: level || 1,
    equipJobs: Array.isArray(jobs) ? jobs.map(mapJob) : [],
    physAtk: stats.attack || 0,
    magAtk: stats.magic_attack || 0,
    physDef: stats.defense || 0,
    magDef: stats.magic_defense || 0,
    crestSlots: (stats.crest_slot !== undefined ? stats.crest_slot : crest_slots) || 0,
    weight: weight || 0,
    params: Object.keys(paramsMap).length > 0 ? paramsMap : undefined,
    bazaar: !!can_bazaar,
    sellPrice: sell_price || 0,
    description: info || name || '',
    craftable: Array.isArray(craft_recipe) && craft_recipe.length > 0,
    upgradable: Array.isArray(gradeup_recipe) && gradeup_recipe.length > 0,
    maxGrade: quality || 0
  };

  if (item.craftable) {
    item.craftLevelReq = level || 1;
    item.craftFee = Math.round((sell_price || 100) * 0.5);
    item.craftMaterials = craft_recipe.map(r => ({
      name: `item_ref_${r.item_id}`,
      id: r.item_id,
      quantity: r.amount
    }));
  }

  return item;
}

// 4. Convert all raw items
const convertedItems = rawItems.map(convertItem);

// Build map for material ID resolution
const allItemsMap = {};
convertedItems.forEach(item => { allItemsMap[item.itemId] = item; });
existingItems.forEach(item => { allItemsMap[item.itemId] = item; });

// Resolve craft material names
convertedItems.forEach(item => {
  if (item.craftMaterials) {
    item.craftMaterials = item.craftMaterials.map(m => {
      const found = allItemsMap[m.id];
      return {
        name: found ? found.name : `Item #${m.id}`,
        quantity: m.quantity
      };
    });
  }
});

// 5. Merge with existing items (preserving rich existing screenshots/guides details)
const mergedMap = {};

// Add converted items first
convertedItems.forEach(item => {
  mergedMap[item.itemId] = item;
});

// Overlay/preserve existing curated items which have complete manual stats, drops, and upgrade tiers
existingItems.forEach(item => {
  const existingKey = item.itemId;
  if (existingKey && mergedMap[existingKey]) {
    // Merge, keeping rich fields like dropSources, gatheringLocations, upgradeTiers from existing
    mergedMap[existingKey] = {
      ...mergedMap[existingKey],
      ...item
    };
  } else if (existingKey) {
    mergedMap[existingKey] = item;
  }
});

const mergedItems = Object.values(mergedMap);

// Sort by itemId ascending
mergedItems.sort((a, b) => {
  const idA = typeof a.itemId === 'number' ? a.itemId : parseInt(a.itemId || '0');
  const idB = typeof b.itemId === 'number' ? b.itemId : parseInt(b.itemId || '0');
  return idA - idB;
});

console.log('Total merged items count:', mergedItems.length);

// 6. Generate output files
const jsonPath = './src/data/items.json';
fs.writeFileSync(jsonPath, JSON.stringify(mergedItems), 'utf8');

const categoryExport = `export const ITEM_CATEGORIES: { id: ItemCategory; name: string; url: string; description: string }[] = ${JSON.stringify(categories, null, 2)};`;

const tsContent = `import { ItemCategory, ItemData } from '../types';
import rawItems from './items.json';

${categoryExport}

export const ALL_ITEMS: ItemData[] = rawItems as unknown as ItemData[];

export function searchItems(query: string, category?: ItemCategory | 'ALL'): ItemData[] {
  let result = ALL_ITEMS;

  if (category && category !== 'ALL') {
    result = result.filter(item => item.category === category);
  }

  if (!query.trim()) {
    return result;
  }

  const q = query.toLowerCase().trim();

  return result.filter(item => {
    const matchName = item.name.toLowerCase().includes(q);
    const matchJp = item.jpName ? item.jpName.toLowerCase().includes(q) : false;
    const matchCategory = item.category.toLowerCase().includes(q);
    const matchSubType = (item.subType || '').toLowerCase().includes(q);
    const matchDesc = (item.description || '').toLowerCase().includes(q);
    const matchId = item.itemId ? item.itemId.toString().includes(q) : false;
    const matchIr = item.ir ? item.ir.toString().toLowerCase().includes(q) : false;

    // Check craft materials
    const matchMaterials = item.craftMaterials?.some(m => m.name.toLowerCase().includes(q));

    // Check drops
    const matchDrops = item.dropSources?.some(d => d.name.toLowerCase().includes(q) || d.area.toLowerCase().includes(q));

    // Check gathering
    const matchGathering = item.gatheringLocations?.some(g => g.toLowerCase().includes(q));

    // Check gradeup recipes
    const matchGradeup = item.gradeupRecipes?.some(gr => gr.toLowerCase().includes(q));

    // Check quest rewards
    const matchQuests = item.questRewards?.some(qr => qr.toLowerCase().includes(q));

    return matchName || matchJp || matchCategory || matchSubType || matchDesc || matchId || matchIr || matchMaterials || matchDrops || matchGathering || matchGradeup || matchQuests;
  });
}
`;

const rootTsContent = `import { ItemCategory, ItemData } from './src/types';
import rawItems from './src/data/items.json';

${categoryExport}

export const ALL_ITEMS: ItemData[] = rawItems as unknown as ItemData[];
`;

// Write to files
fs.writeFileSync('./ItemsData_merged.ts', rootTsContent, 'utf8');
fs.writeFileSync('./ItemsData_merged.txt', tsContent, 'utf8');
fs.writeFileSync('./src/data/ItemsData_merged.ts', tsContent, 'utf8');
fs.writeFileSync('./src/data/ItemsData_merged.txt', tsContent, 'utf8');
fs.writeFileSync('./src/data/itemsData.ts', tsContent, 'utf8');
fs.writeFileSync('./src/data/ItemsData.txt', tsContent, 'utf8');

console.log('Successfully written items.json, ItemsData_merged.ts, ItemsData_merged.txt and updated src/data/itemsData.ts!');
