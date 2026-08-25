import { ItemCategory, ItemData } from './src/types';
import rawItems from './src/data/items.json';

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
