import { GuideSubPage } from '../types';

export const BUILTIN_GUIDES: GuideSubPage[] = [
  {
    id: 'guide-general-fighter-endgame-build',
    title: 'General Fighter Endgame Build',
    category: 'Combat & Classes',
    server: 'All',
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
    server: 'Rising',
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
  },
  {
    id: 'guide-pawn-build-goblin-killer',
    title: 'PAWN BUILD : GOBLIN KILLER (VERY BUDGET FRIENDLY)',
    category: 'Pawns',
    server: 'All',
    author: 'Dr. Aven',
    lastUpdated: 'Season 3.4',
    tags: ['Pawn Build', 'Budget Friendly', 'Goblin Killer', 'Leveling', 'Fighter', 'Pawns'],
    summary: 'PAWN BUILD : GOBLIN KILLER (VERY BUDGET FRIENDLY) - High efficiency leveling and boss farming pawn compendium.',
    isBuiltIn: true,
    content: `# PAWN BUILD : GOBLIN KILLER (VERY BUDGET FRIENDLY)

> **Author**: Dr. Aven  
> **Category**: Pawns / Leveling & Speed Farming  
> **Budget**: Very Budget Friendly (Early to Mid-Game Accessible)

---

## Vocation choice (fighter)

First the vocation choice. Most ppl tend to default to sorc or HS for goblin farm. It is true that Sorc does AOE damage and HS's dim slash is a real monster at multi target content.

But Sorc don't spam spells and are easily annoyed by hords and there is no bell setup that's gonna be able to make your HS pawn spam dim slash.

The best vocation we found was fighter, yes that forgotten vocation. With the correct bell setup and correct build, fighter is by far the best performing goblin farmer in the game. They are able to literally spam compass slash which is a decently wide AOE that does enough damage to one-skill any goblin relevent to farm.

Also the thing that's interestening is that it's also super easy to build as the damage required to kill goblins is pretty low (yes, the only win of fighter is when wwe don't care about damage ...).

Thus this is achievable even with gear that's not even IR105. (I'll show exemple of what type of gear i used in hardcore to illustrate my point).

---

## Custom Skills

Copy this setup:

* **Compass Slash**: Their bread and butter aoe goblin chopper. \`#spin2win\`
* **Brave's Raid**: To help on down dps in case you need to kill a big monster (can be swapped without much consequesnces in farming context).
* **Flowing Sword Slash**: Defensive option with counter attack, the pawn's aren't that bad at using it so it can be worth for managing some goblin aggression.
* **Skyward Lash**: The only skill able to reach high targets.

![Custom Skills Setup](https://i.imgur.com/BhZYkzR.png)

---

## Augments

All damage augments are from Fighter (no epitaph required) and all stamina augments come from Alchemist (no epitaph required either).

* **Demihuman Proficiency (Fighter)**: More damage on goblins and saurians.
* **Combat Momentum, Brave Effort & Onslaught (Fighter)**: More damage.
* **Soul Stealer (Alchemist)**: Stamina on kill.
* **Relaxness (Alchemist)**: Reduced stamina usage.

### Optional 11 points (not required for this to work):
* **New Attack (Secret Augment)**: Attack buff.
* **New Defense (Secret Augment)**: Defense buff.
* **Efficacy (Secret Augment)**: Can help with healing items in case your pawns lack defense and don't have 100 recovery limit + Self-Feedback.
* **Self-Feedback (Elemental Archer)**: If you have 100 recovery limit.

![Augments Setup](https://i.imgur.com/gsjrRIf.png)

---

## Bell setup

We want our pawns in the fight spamming Compass Slash on every small enemies. This is a very basic setup.

![Bell Setup Overview](https://i.imgur.com/66AWefH.png)

![Bell Priorities Detail](https://i.imgur.com/ojxcQ8j.png)

---

## Gear

Really, if you have a set of IR 90+ armor and weapons you should be fine. As an exemple here is my hardcore pawn gear state right now. She carried me through 930 lvls of farming without a single issue.

![Hardcore Pawn Gear State](https://i.imgur.com/Rn4wU18.png)

---

## Questions & FAQ

### Is it still the best build at higher investment?
You won't kill faster, it's mostly already the fastest. But higher investment can make it more comfortable (like not needing to use healing items ever). Other thatn that i haven't found any pawns that clear faster even with min-maxed endgame gear.

### Any suggestion on a green to buff & accompany them?
Any decent EA build. But honestly your pawns won't even need any help with stamina.`
  }
];

