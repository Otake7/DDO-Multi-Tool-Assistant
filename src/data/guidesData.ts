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
  },
  {
    id: 'guide-hunter-endgame-build-lea-decelle',
    title: 'HUNTER BUILD',
    category: 'Combat & Classes',
    server: 'All',
    author: 'Lea Decelle (Formatting @Dr. Aven)',
    lastUpdated: 'Season 3.4',
    tags: ['Hunter', 'Endgame', 'IR 105', 'Augments', 'Custom Skills', 'Main Palette', 'Secondary Palette', 'Triflip', 'Emblem'],
    summary: 'Comprehensive endgame Hunter build by Lea Decelle with formatting by Dr. Aven. Covers build augments, core damage splits, crested augments, main and secondary skill palettes, backwards retreat mechanics, and accessories/emblems.',
    isBuiltIn: true,
    content: `# HUNTER BUILD

This assumes full IR 105 armor as described in 📣ddon-guidesGeneral Late Game Gear Guide (3….

### Credits
* **Guide by**: @Lea Decelle
* **Formatting**: @Dr. Aven

Thanks to everyone producing/sharing information on this topic, this base knowledge formed by small individual action in the community did help a lot in getting started to work on this guide.

For any detailed skill/augment description see The Knowledge Libary.

---

### Index
* **Augments**
  * Build Augments
  * Core Damage Augments
  * Crested Augments
* **Custom Skills**
  * Main Palette
  * Secondary Palette + honorable mentions
  * A Note on Backwards Retreat
* **Accessories**
  * Emblem
  * Other
* **Arrow type**

======================================================================

## Augments

### Build Augments
* **Attack Expansion(Hunter)** significantly eases the rather strict positioning requirements of the class by giving you far more range to deal full damage.
* **Arrow Increase(Hunter)** is absolutely required as it extends the time between reloads with 13 more arrows per quiver.
* **Decisive Shot(Hunter)** is roughly equivalent to +32 Strength when hitting weakpoints rather than the 30% damage it lists. Due to it lowering damage to non-weakpoints, consider swapping it out for a Proficiency augment whenever possible.
* **Pleasant Attack(Hunter)** increases damage by 10% at perfect range. Does not affect arc fired shots such as Cloudburst Volley.
* **Fire Attack(Sorcerer)** increases all damage when using a Burning crested weapon. While it’s still beneficial to make the other elemental weapons for enemy weaknesses, note that Crimson Arrow and any Explosive skills are always Fire damage.
* **Relaxedness(Alchemist)** is used at lv6 due to the very high stamina costs of the class.

Hunter is brutally tight on augment space leaving little room for Chance/Exhaust Attack augments, with only **Deep Aggression(Seeker:S3 HO tree)** as the cheapest source.

Hunter will also seriously struggle to maintain high stamina without support from **Wall Glasta (T)** or critical hp augments, which has those otherwise staple augments lose a lot of value.

![Hunter Build Augments](/images/guides/hunter-build-augments.png)
[View Build Augments Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494111164433694831/image.png?ex=6ab06674&is=6aaf14f4&hm=c9a2eb60cc858f7493de2ed77f00f5b6f90f6a573668430b36966ed18c5fe374&)

--------------------------------------------------------------------------------------------------------------------

### Core Damage Augments
Depending on if you face Chance Core or Elemental Core monsters you want to slot for Chance attack or Exhaust attack.

Those core types are mutually exclusive mechanics, so unless you fight multiple types of monsters, only slot the one relevant type.

#### Chance Core (Chance Atk)
* **Deep Aggression**(Seeker:S2 BO tree)
* **Brave Attack**(Warrior)
* **Fighting Spirit**(Warrior)

#### Elemental Core (Exhaust Atk)
* **Courageous Suppression**(High Scepter)
* **Vigorous Suppression**(High Scepter)

--------------------------------------------------------------------------------------------------------------------

### Crested Augments
* **Inquiry** to increase stamina potion recovery. You’re going to need to drink these a lot, might as well make them count.
* **Perfect Reload** is a purely comfort augment to ease the timing requirement of Perfect Reloads. If you prefer something like Self Feedback feel free to swap this out.
* **Precision** lowers the crosshair bloom when moving.
* The rest are standard crests as described in 📣ddon-guidesGeneral Late Game Gear Guide (3….
* For more info on how to get such crests, see nieznane.

![Hunter Crested Augments](/images/guides/hunter-crested-augments.png)
[View Crested Augments Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494111487877451876/image.png?ex=6ab066c1&is=6aaf1541&hm=e3aaa00aed1b0f35b383fa2a2af9aa6974d078960d9d1d09ab54903a8a10b4ec&)

TO THE TOP
======================================================================

## Custom Skills

### Main Palette
* **Backwards Retreat** has good iframes to avoid enemy attacks and can animation cancel most other skills resulting in dps gains, with the notable exceptions of Crimson Arrow and Reload.
* **Cloudburst Volley** does good damage in a wide aoe. Semi-smart targeting means it consistently hits any weakpoints exposed to the sky. Is also your best damage skill in any situations where it’s impossible to maintain perfect range. Unfortunately struggles to target Golem weakpoints. Can cancel both the pre-cast and the firing animation for significantly more dps.
* **Whirling Arrow (T)** does good damage to boss cores. Its damage and debilitation buildup are otherwise underwhelming. Can cancel the firing animation.
* **Triad Shot** is your best down dps option in most situations. Can be instantly cancelled with Backwards Retreat on firing, commonly called a “triflip”. Can also cancel the initial pre-cast.

* Consider using **Threefold Arrow** when the enemy weakpoint is too small to effectively land triflips.
* Consider using **Demon Arrow** when the enemy is overleveled enough where the 9999 cap will not significantly reduce its damage.
* Consider using **Cloudburst Volley** when the enemy is positioned in a way where you cannot maintain perfect range on weakpoints.

![Hunter Main Palette](/images/guides/hunter-main-palette.png)
[View Main Palette Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494111631935017000/image.png?ex=6ab066e4&is=6aaf1564&hm=16e4ba75bc6ca15890ed66522a96843bfbf82a79e94b47c44172eab87956c3cb&)

--------------------------------------------------------------------------------------------------------------------

### Secondary Palette & Honorable Mentions
* **Threefold Arrow (P)** is your best damage source for enemies who are too difficult or have weakpoints too small to hit with triflips. Despite the EX skill doubling Crimson Arrow damage, it’s still a slight damage loss to apply due to how quickly this skill depletes your quiver. Can cancel the initial pre-cast, but attempting to cancel the firing animation will interrupt the arrows being fired.
* **Demon Arrow** is a very high burst damage skill, especially effective when fired with perfect timing. Can be difficult to land effectively as you cannot move while casting, and the 9999 cap means it's not good on downs. Can cancel the firing animation.

#### Other Notable Options:
* **Crimson Arrow** adds an additional Fire damage hit to each arrow fired and is applied to the entire current quiver. Takes around 3s to activate and generally does not boost damage enough to be worth using for dps. The main benefit to this skill is its ability to automatically detonate Explosive Arrow Volley, and should always be carried when using that skill. Is also a notable gain to apply in situations where you can’t attack anything.
* **Explosive Arrow Volley** does good damage to War Ready armor when fired at the first charge level. Second charge doesn’t increase damage, instead only adds the two outside arrows which are usually way too far apart to land effectively. Will be far more widely useful once we get access to the (T) EX version, which turns it into a strong DoT effect and removes the need for Crimson Arrow. Can cancel the firing animation.
* **Whirling Arrow (P)** has good debilitation buildup and good damage, but is quite weak against boss cores.
* **Full Bend** can function as an easier to use alternative to Demon Arrow, but has significantly less damage potential. Can cancel the firing animation.

![Hunter Secondary Palette & Honorable Mentions](/images/guides/hunter-secondary-palette.png)
[View Secondary Palette Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494111696875290645/image.png?ex=6ab066f3&is=6aaf1573&hm=e549dcd7369981edd340e6de2162d7ee6f007a60860620f1ef76457c7a614ec5&)

--------------------------------------------------------------------------------------------------------------------

### A Note on Backwards Retreat
> **Credit**: Credit here goes to @MadMax. Thanks for bringing this to my attention.

There is evidence to suggest the lv5 and below back hop version of Backwards Retreat has slightly less animation frames than the lv6 flip. Considering how often skills are animation cancelled this could result in noticeably higher dps output. The lv6 version still has more iframes and less stamina cost. Consider this tradeoff when leveling the skill, if you have not already leveled it to lv6.

⚠️ **It is not possible to lower a skill’s level.**

TO THE TOP
======================================================================

## Accessories

### Emblem
#### Upgrades
For a more complete explanation go check Knowledge Libary.

As most current endgame encounter have chance cores, the prefered split is:
* **Chance attack**: 40
* **Exhaust Attack**: 18
* **Phys. Attack**: 5

#### Slots
Two viable strategies here:
* **4x 13% Pierce Earrings**
* **4x 30 Physical Attack Bracelets**

Note that Explosive Arrow Volley and Crimson Arrow are always Fire damage. Explosive Arrow Volley (T) unlock is still a long ways away, but can become a significant part of Hunter’s damage once we get there.

See Draven’s fantastic Attack Values & Damage guide for the tradeoffs of each.

These can be farmed in BBM, % Damage earrings from Abyss and Phys./Magick bracelets from Normal.

![Hunter Emblem Upgrades](/images/guides/hunter-emblem-upgrades.png)
[View Emblem Upgrades Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494111981131534346/image.png?ex=6ab06737&is=6aaf15b7&hm=f09bd7cfd5b70478f9a8eed52a6642e98eae4ff559d9db9ef29e025d42f89395&)

![Hunter Accessories Slots](/images/guides/hunter-accessories-slots.png)
[View Accessories Slots Screenshot](https://cdn.discordapp.com/attachments/1494111050541568235/1494112004456321166/image.png?ex=6ab0673d&is=6aaf15bd&hm=7c9b70bee6adae51bc82c6a5c65ea2f86dc4231eaaf4393d1d66adcd4d3b9f5b&)

--------------------------------------------------------------------------------------------------------------------

### Other Accessories
* **2x 13% Pierce Earrings**
* **2x 30 Physical Attack Bracelets**

These can be farmed in BBM, % Damage earrings from Abyss and Phys./Magick bracelets from Normal.

TO THE TOP
======================================================================

## Arrow Type
* **Poison Arrows** can be useful for some extra damage, especially on bosses with large health pools.
* **Oil Arrows** can be useful when you need your lantern for Slayer damage and are running a fire bow.
* **Asinity Arrows** can apply Slow. I’m not normally a fan of this debilitation, but Hunter uses it quite well to maneuver around enemy attacks and maintain perfect distance longer than other debilitations might allow.
* **Sleep Arrows** can also create long openings on bosses.

All of these arrows have low debilitation buildup on their own. Several skills will also burn through arrows at an absurd rate, make sure to keep a large stockpile if you want to use these anyways.
`
  }
];

