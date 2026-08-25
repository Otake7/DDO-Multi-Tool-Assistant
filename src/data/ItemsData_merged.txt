import { ItemCategory, ItemData } from '../types';
import rawItems from './items.json';

export const ITEM_CATEGORIES: { id: ItemCategory; name: string; url: string; description: string }[] = [
  {
    "id": "Accessory",
    "name": "Accessory",
    "url": "https://reference.dd-on.com/build/items_accessory.html",
    "description": "Earrings, talismans, charms, and mantles boosting passive attributes and elemental resistances."
  },
  {
    "id": "Arm Armor",
    "name": "Arm Armor",
    "url": "https://reference.dd-on.com/build/items_armor_arm.html",
    "description": "Gauntlets, bracers, vambraces, and armguards providing physical/magical defense and crest slots."
  },
  {
    "id": "Body Armor",
    "name": "Body Armor",
    "url": "https://reference.dd-on.com/build/items_armor_body.html",
    "description": "Heavy plate armor, cuirasses, hauberks, coats, and robes granting core protection."
  },
  {
    "id": "Helm",
    "name": "Helm",
    "url": "https://reference.dd-on.com/build/items_armor_helm.html",
    "description": "Helmets, armets, mitres, circlets, sallets, and hoods protecting the head."
  },
  {
    "id": "Leg Armor",
    "name": "Leg Armor",
    "url": "https://reference.dd-on.com/build/items_armor_leg.html",
    "description": "Sabatons, greaves, boots, and sandals for mobility, defense, and stamina stability."
  },
  {
    "id": "Consumable",
    "name": "Consumable",
    "url": "https://reference.dd-on.com/build/items_consumable.html",
    "description": "Potions, draughts, holy waters, elixirs, and curatives."
  },
  {
    "id": "Jewelry",
    "name": "Jewelry",
    "url": "https://reference.dd-on.com/build/items_jewelry.html",
    "description": "Rings, beads, and enchanted bands granting offensive and defensive passives."
  },
  {
    "id": "Job Item",
    "name": "Job Item",
    "url": "https://reference.dd-on.com/build/items_jobitem.html",
    "description": "Special arrows, job tools, skill awakening items, and hunter equipment."
  },
  {
    "id": "Key Item",
    "name": "Key Item",
    "url": "https://reference.dd-on.com/build/items_keyitem.html",
    "description": "Relics, vessels of life, sanctum crest keys, and quest tokens."
  },
  {
    "id": "Lantern",
    "name": "Lantern",
    "url": "https://reference.dd-on.com/build/items_lantern.html",
    "description": "Illumination lanterns, detection lanterns, and specialty oil lamps."
  },
  {
    "id": "Material",
    "name": "Material",
    "url": "https://reference.dd-on.com/build/items_material.html",
    "description": "Ores, minerals, sand crafting materials, monster parts, and upgrade components."
  },
  {
    "id": "Special",
    "name": "Special",
    "url": "https://reference.dd-on.com/build/items_special.html",
    "description": "Furniture recipes, blueprints, customization scrolls, and event rewards."
  },
  {
    "id": "Main Weapon",
    "name": "Main Weapon",
    "url": "https://reference.dd-on.com/build/items_weapon_main.html",
    "description": "Primary weapons: swords, daggers, bows, staves, and spears."
  },
  {
    "id": "Off Weapon",
    "name": "Off Weapon",
    "url": "https://reference.dd-on.com/build/items_weapon_off.html",
    "description": "Secondary weapons: shields, rods, and tactical accessories."
  },
  {
    "id": "Body Wear",
    "name": "Body Wear",
    "url": "https://reference.dd-on.com/build/items_wear_body.html",
    "description": "Under-armor garments, inner shirts, and combat suits."
  },
  {
    "id": "Leg Wear",
    "name": "Leg Wear",
    "url": "https://reference.dd-on.com/build/items_wear_leg.html",
    "description": "Undergarment hose, leggings, and mobility tights."
  }
];

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
