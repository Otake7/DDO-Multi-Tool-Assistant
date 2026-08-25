import { GuideSubPage } from '../types';

export const BUILTIN_GUIDES: GuideSubPage[] = [
  {
    id: 'guide-general-fighter-endgame-build',
    title: 'General Fighter Endgame Build',
    category: 'Combat & Classes',
    author: 'Lea Decelle (Formatting by Dr. Aven)',
    lastUpdated: '18.04.2026',
    tags: ['Fighter', 'Endgame', 'BBM', 'Pierce Slash', 'Augments', 'Custom Skills', 'Brave\'s Raid', 'Builds'],
    summary: 'Complete Endgame Fighter compendium by Lea Decelle & Dr. Aven focusing on the Pierce Slash climbing meta, Chance/Elemental Core augments, Emblem allocation, and BBM skill palettes.',
    isBuiltIn: true,
    content: `# General Fighter Endgame Build

> **Author**: Lea Decelle (Scribe) — 16.04.2026  
> **Formatting & BBM Guide**: Dr. Aven [DDO] (Scribe) — 18.04.2026  
> **Vocation**: Fighter (片手剣 / Shield & Sword)  
> **Gear Requirement**: Assumes full IR 105 armor.

---

## Overview & Philosophy
This guide may be a bit unconventional for some, as it focuses on using **Pierce Slash** as much as possible outside downs. Fighter skill multipliers are famously underwhelming across the entire skill set, but **climbing damage is the one area it excels**. It's also been the area most enjoyed, as other vocations largely ignore the climbing mechanic entirely.

* **Credits**: Guide by @Lea Decelle • Formatting & BBM additions by @Dr. Aven
* **Community Appreciation**: Thanks to everyone producing and sharing information on this topic. This base knowledge formed by small individual actions in the community helped immensely in getting started to work on this guide.
* **Detailed Values**: For detailed skill and augment mathematical descriptions, check *The Codex™*.

---

## Index
1. **Augments**: Build Augments, Core Damage Augments, Crested Augments
2. **Custom Skills**: Main Palette, Secondary Palette & Honorable Mentions
3. **Accessories & Emblem**: Upgrades, Slots, Other Accessories
4. **BBM Fighter Guide**: BBM Mechanics, Main Palette & Secondary Palette for BK

---

## Augments

### 1. Build Augments
* **Furious Grip** *(Seeker)* and **Great Grasp** *(Warrior: S2 BO tree)*: Mandatory to maximize Pierce Slash climbing damage.
* **Ice Attack** *(Sorcerer)*: Should be replaced to match your active weapon element. It is well worth crafting 5 weapons to match enemy weaknesses across encounters.

---

### 2. Core Damage Augments
Depending on whether you face **Chance Core** or **Elemental Core** monsters, slot specifically for Chance Attack or Exhaust Attack.
> **Mechanic Note**: Chance Core and Elemental Core are mutually exclusive mechanics. Unless fighting multiple mixed monster types, only slot the relevant type.

#### Chance Core (Chance Atk)
* **Deep Aggression** *(Seeker: S2 BO tree)*
* **Brave Attack** *(Warrior)*
* **Fighting Spirit** *(Warrior)*

#### Elemental Core (Exhaust Atk)
* **Courageous Suppression** *(High Scepter)*
* **Vigorous Suppression** *(High Scepter)*

---

### 3. Crested Augments
* **Inquiry**: Recommended as a comfort armor augment. Fighter gets little benefit from most other armor crest augment options.
* **Purge**: If *Purge* could be slotted in armor it would be a noticeable upgrade, but it is not worth sacrificing an accessory slot for.
* **Standard Crests**: Fill remaining slots with standard endgame crests matching IR 105 armor.

---

## Custom Skills

### Main Palette
* **Brave's Raid**: Your best down DPS skill in almost all situations.
* **Blink Strike**: Strong mobility option that deals respectable engagement damage.
* **Flowing Sword Flash**: Relatively strong counterattack that can animation-cancel other skills, notably Brave's Raid. Especially effective if timed as a perfect block.
* **Pierce Slash**: Your main damage source outside downs. Fighter normally struggles to effectively reach weakpoints or deal with flying bosses; Pierce Slash solves both while outputting surprisingly good DPS and debilitation buildup. Uniquely allows Fighter to totally ignore **Yellow Shake-off Signal** enemy attacks (must still jump off for anything **Red**).  
  * *Tip*: Set up a macro or turbo function to save your fingers from repetitive strain injury with how much button mashing this requires.  
  * *Limitation*: Ineffective against anything that cannot be grabbed and falls behind Brave's Raid for down DPS.

---

### Secondary Palette & Honorable Mentions
* **Tusk Toss (P)**: Solid fast damage option with a small amount of vertical reach and low animation commit.
* **Skyward Slash**: Deals okay boss core damage and can occasionally hit harpies or high boss weakpoints. Quite underpowered without access to its (T) EX variant.
* **Compass Slash**: Efficiently deals with small enemy groups in crowded rooms and cancels some forms of stagger on being hit.
* **Cymbal Attack (T)**: Deals solid damage to boss cores within reach. Can technically carry a different element than your sword using a permanently enchanted shield.
* **Sheltered Spike**: Has okay debilitation buildup despite low DPS. Devours stamina if anything is blocked while casting.

---

## Accessories & Emblem

### Emblem Upgrades
For complete mechanics, check *The Codex™*. Since most current endgame encounters feature Chance Cores, the preferred emblem stat allocation is:
* **Chance Attack**: 40
* **Exhaust Attack**: 18
* **Physical Attack**: 5

### Accessory Slot Strategies (Two Viable Approaches)
* **Strategy A**: 4x **20% Slash Earrings**
* **Strategy B**: 4x **30 Physical Attack Bracelets**
* *Tradeoffs*: See Draven's Attack Values & Damage guide for detailed damage calculation tradeoffs. Farmed in BBM: % Damage earrings drop from **Abyss**, and Physical/Magick bracelets drop from **Normal**.

### Other Viable Combinations
* 2x **20% Slash Earrings** + 2x **30 Physical Attack Bracelets**

---

## BBM Fighter Guide
> **Authors**: @Lea Decelle & @Dr. Aven (Scribe — 18.04.2026)

### BBM Overview
Builds in BBM (Bloodborne Maze) are distinct as gear is acquired randomly along the run and you cannot equip standard augments. Therefore this section focuses on the recommended skill palettes for Fighter in BBM.

Fighter is a rather underwhelming class for BBM due to lower comparative damage and weapon drops split between swords and shields. However, it benefits from access to select new EX skills that mitigate reach problems against flying creatures.

---

### BBM Main Palette
* **Brave's Raid**: Down DPS (keep in mind you will not have Flowing Counter to cancel if an emergency arrives).
* **Tusk Toss (P)**: Fast damage option with lower animation commitment.
* **Skyward Slash (T)**: High vertical reach DPS against bosses and aerial mobs.
* **Compass Slash**: Used to cleave small creatures in the numerous crowded rooms of BBM.
* **Pierce Slash**: DPS climbable creatures while they move around (ignores Yellow shake attacks). On down, swap to Tusk Toss (P) or Brave's Raid. Macro/turbo controller recommended to prevent finger fatigue.
* **Blink Strike**: Essential for fast room mobility and closing gaps.

---

### BBM Secondary Palette (Specialized for Black Knight / BK)
* **Brave's Raid**: Max burst on BK down phases.
* **Blink Strike**: Essential mobility as BK moves around constantly.
* **Flowing Sword Slash**: Dual offensive and defensive counter during BK's dangerous melee strikes.
* **Tusk Toss (P)**: Fast poke damage during tight openings.`
  },
  {
    id: 'guide-rising-server-rules',
    title: 'Dogma Rising Server: Leveling, 21+ Level Gap & XP Multipliers',
    category: 'Server Rules',
    author: 'Rising Veteran Arisen',
    lastUpdated: 'Season 3.4',
    tags: ['Server Rules', 'Leveling', 'XP Penalty', '50% Ring', 'Pawns'],
    summary: 'Crucial server-specific rules on Dogma Rising, including the 21+ level difference penalty, booster stacking, and optimal leveling pace.',
    isBuiltIn: true,
    content: `# Dogma Rising Server Mechanics & Leveling Guide

Welcome to the **Dogma Rising** private server compendium. Dogma Rising brings authentic Season 3.1 to 3.4 content with custom stability, enhanced board quest rates, and specific team balance rules.

---

## 1. The 21+ Level Difference Pawn/Party Penalty (CRITICAL)
On the Dogma Rising server, there is a hard level gap restriction designed to prevent low-level characters from receiving non-participatory power-boosts:
* **The Rule**: If any party member or **Support Pawn** has **21 or more levels** higher than the lowest-level character in your active party, **you will receive 0 (ZERO) XP** from monster defeats and quest clears!
* **Example**: If your Arisen is Level 15, your maximum allowed pawn or party member level is **Level 35**. If you recruit a Level 36+ pawn, all party XP is suppressed to 0.
* **Pro-Tip**: When hiring support pawns from the Rift, filter pawns by maximum level = (Your Level + 20) to ensure continuous, maximum XP progression.

---

## 2. 50% Level Up Speed XP Ring Mechanics
* **Equip Immediately**: Every new character should keep the 50% Level Up Speed Booster Ring equipped on their accessory slot from **Level 1 to Level 89**.
* **Multiplier**: Provides an un-diluted **+50% multiplier** on all monster experience and quest turn-in rewards.
* **Cap Cutoff**: The ring effect naturally expires once your vocation hits **Level 90**. For Levels 90 to 120, progress through High-Rank Notice Boards, Grand Missions, and Extreme Dungeons.

---

## 3. High-Efficiency Notice Board Loop Strategy
1. **Batch Pickup**: Take all available Notice Board kill quests in an outpost area (e.g. Tel Outpost, Misriu Coastal Shrine, Volden Mines).
2. **Fast Clears**: Use fast AOE pawn setups (Sorcerer, Alchemist, High Scepter, Elemental Archer) to wipe mob clusters in under 60 seconds.
3. **Turn In & Reset**: Return to the Notice Board, claim gold and XP, and re-trigger the route.
4. **Use the Planner**: Use our **Quest Planner** tab to calculate the exact number of runs required to hit your target level.`
  }
];

