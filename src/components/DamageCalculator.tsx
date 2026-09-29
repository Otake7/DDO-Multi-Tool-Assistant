import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Swords,
  ShieldAlert,
  Info,
  RotateCcw,
  Target,
  Skull,
  TrendingUp,
  Percent,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sparkles,
  Shield,
  HelpCircle,
  FlaskConical
} from 'lucide-react';
import { SPECIFIC_ENEMIES } from '../data/bestiaryData';

export interface VocationModifierInfo {
  id: string;
  name: string;
  lv60: number;
  lv93: number;
}

// Unified canonical ordering so all 11 vocations occupy the EXACT SAME POSITIONS (0-10) in both Lv60 and Lv93
export const VOCATION_MODIFIERS: VocationModifierInfo[] = [
  { id: 'fighter', name: 'Fighter', lv60: 0, lv93: 0 },
  { id: 'seeker', name: 'Seeker', lv60: -135, lv93: 0 },
  { id: 'elemental_archer', name: 'Elemental Archer', lv60: -99, lv93: 0 },
  { id: 'shield_sage_rod', name: 'Shield Sage (Rod)', lv60: -99, lv93: -106 },
  { id: 'shield_sage_shield', name: 'Shield Sage (Greatshield)', lv60: 0, lv93: -106 },
  { id: 'spirit_lancer', name: 'Spirit Lancer', lv60: -83, lv93: -23 },
  { id: 'priest', name: 'Priest', lv60: -72, lv93: -106 },
  { id: 'hunter', name: 'Hunter', lv60: -31, lv93: -33 },
  { id: 'alchemist', name: 'Alchemist', lv60: -22, lv93: -77 },
  { id: 'sorcerer', name: 'Sorcerer', lv60: 108, lv93: 116 },
  { id: 'warrior', name: 'Warrior', lv60: 108, lv93: 116 },
];

// Required Attack Table Lookup (Standard DDON benchmarks for V2)
export const REQ_ATK_LOOKUP: Record<number, number> = {
  1: 1,
  10: 100,
  20: 300,
  30: 500,
  40: 650,
  50: 1034,
  55: 1272,
  58: 1415,
  60: 1511,
  65: 1749,
  70: 1987,
  75: 2225,
  80: 2464,
  83: 2607,
  85: 2702,
  88: 2845,
  90: 2940,
  93: 3083,
  95: 3178,
  96: 3226,
  100: 3417,
  105: 3655,
  110: 3893,
  115: 4131,
  120: 4370,
};

// All enemy kinds sourced comprehensively from the game's Bestiary
const ENEMY_KINDS: { label: string; value: string; description: string }[] = [
  { label: 'None', value: 'None', description: 'Neutral / uncategorized target' },
  { label: 'War-ready', value: 'War-ready', description: 'Armored Orcs, Dwarf Orcs & Season 3 frontline foes' },
  { label: 'Spirit', value: 'Spirit', description: 'Ghosts, Specters, Wights, Phantom Knights & Ents' },
  { label: 'Dragonkin', value: 'Dragonkin', description: 'Lesser & Grand Dragons, Drakes, Wyverns, Wilmia' },
  { label: 'Beast', value: 'Beast', description: 'Wolves, Grimwargs, Chimeras, Griffins, Behemoths' },
  { label: 'Demihuman', value: 'Demihuman', description: 'Goblins, Hobgoblins, Saurians, Pixies, Mandragoras' },
  { label: 'Human', value: 'Human', description: 'Bandits, Cultists, Rogue Pawns, Corrupted Arisen' },
  { label: 'Giant', value: 'Giant', description: 'Cyclops, Armored Cyclops, Colossus, Goliath' },
  { label: 'Undead', value: 'Undead', description: 'Zombies, Ghouls, Death, Living Dead' },
  { label: 'Skeleton / Skeletal', value: 'Skeleton / Skeletal', description: 'Skeleton Knights, Skeletal Sorcerers, Liches' },
  { label: 'Winged', value: 'Winged', description: 'Harpies, Sirens, Griffins, Cockatrices, Gargoyles' },
  { label: 'Magickal Construct / Golem', value: 'Magickal Construct / Golem', description: 'Living Armors, Golems, Craggers, Statues' },
  { label: 'Fiend / Demon', value: 'Fiend / Demon', description: 'Medusas, Gorgons, Manticores, Chaos Fiends' },
  { label: 'Ogre / Demonkin / Ogrekin', value: 'Ogre / Demonkin / Ogrekin', description: 'Orcs, Silver Roars, Spinebacks, Mogock' },
  { label: 'Cursed', value: 'Cursed', description: 'Cursed Dragon variants & dark blight monsters' },
  { label: 'Formless / Soft', value: 'Formless / Soft', description: 'Slimes, Oozes, Tentacles, Gelatinous cubes' },
  { label: 'Season 1 Alchemized', value: 'Season 1 Alchemized', description: 'Gold-coated beasts and alchemical aberrations' },
  { label: 'Season 2 Infected / Corrupted', value: 'Season 2 Infected / Corrupted', description: 'Black liquid spores & infected beasts' },
  { label: 'Other', value: 'Other', description: 'Miscellaneous or special raid bosses' },
];

export const DamageCalculator: React.FC = () => {
  // Calculator Version State: V2 is DEFAULT per user request
  const [calcVersion, setCalcVersion] = useState<'v1' | 'v2'>('v2');

  // Form State
  const [enemyLevel, setEnemyLevel] = useState<number>(96);
  const [enemyKind, setEnemyKind] = useState<string>('None');
  const [attackType, setAttackType] = useState<'Physical' | 'Magick'>('Physical');

  // Modifier Version: 'lv60' | 'lv93'
  const [modVersion, setModVersion] = useState<'lv60' | 'lv93'>('lv93');
  // Track selected job by unique ID so swapping versions never shifts or resets the chosen vocation
  const [selectedJobId, setSelectedJobId] = useState<string>('fighter');

  const [baseAtk, setBaseAtk] = useState<number>(3000);
  const [flatAtk, setFlatAtk] = useState<number>(0);
  const [flatSlayer, setFlatSlayer] = useState<number>(0);
  const [baseSkill, setBaseSkill] = useState<number>(100);

  // V2 Specific: Manual Overrides (Leave blank to use formulas)
  const [manualDiv, setManualDiv] = useState<string>('');
  const [manualReqAtk, setManualReqAtk] = useState<string>('');
  const [manualJobMod, setManualJobMod] = useState<string>('');

  // Enemy Modifiers & Debuffs
  const [priestStaffPenalty, setPriestStaffPenalty] = useState<boolean>(true);
  const [priestPenaltyValue, setPriestPenaltyValue] = useState<number>(74);

  const [magicWeak, setMagicWeak] = useState<boolean>(false);
  const [magicWeakValue, setMagicWeakValue] = useState<number>(1.3);

  const [debuffPercent, setDebuffPercent] = useState<number>(0);
  const [elementalWeaknessValue, setElementalWeaknessValue] = useState<number>(1.1);

  // % Damage bonuses
  const [slash, setSlash] = useState<number>(0);
  const [ice, setIce] = useState<number>(0);
  const [fire, setFire] = useState<number>(0);
  const [dark, setDark] = useState<number>(0);
  const [lightning, setLightning] = useState<number>(0);
  const [nullElem, setNullElem] = useState<number>(0);
  const [holy, setHoly] = useState<number>(0);
  const [impact, setImpact] = useState<number>(0);
  const [other, setOther] = useState<number>(0);

  // Quick preset filter for Bestiary enemies
  const [selectedPresetMonster, setSelectedPresetMonster] = useState<string>('');

  // Find active job definition
  const selectedJob = useMemo(
    () => VOCATION_MODIFIERS.find((j) => j.id === selectedJobId) || VOCATION_MODIFIERS[0],
    [selectedJobId]
  );

  // Default weapon modifier from table based on version
  const tableJobMod = modVersion === 'lv60' ? selectedJob.lv60 : selectedJob.lv93;

  // Active weapon modifier (manual override if provided in V2, else table value)
  const isJobModOverridden = calcVersion === 'v2' && manualJobMod.trim() !== '' && !isNaN(Number(manualJobMod));
  const activeJobMod = isJobModOverridden ? Number(manualJobMod) : tableJobMod;

  // Calculation Logic (Supports both V1 and V2)
  const calcResult = useMemo(() => {
    const level = Number(enemyLevel) || 1;

    // Sum all % damage fields
    const totalPercent =
      (Number(slash) || 0) +
      (Number(ice) || 0) +
      (Number(fire) || 0) +
      (Number(dark) || 0) +
      (Number(lightning) || 0) +
      (Number(nullElem) || 0) +
      (Number(holy) || 0) +
      (Number(impact) || 0) +
      (Number(other) || 0);

    // Effective ATK after job bloat correction
    // If JobMod is negative, subtracting it adds the correction (e.g. - (-135) = +135).
    const effectiveAtk =
      (Number(baseAtk) || 0) +
      (Number(flatAtk) || 0) +
      (Number(flatSlayer) || 0) -
      activeJobMod;

    if (calcVersion === 'v1') {
      // ==================== V1 (Classic Wiki Formula) ====================
      let baseReqAtk = 47.65 * level - 1348.25;
      let reqAtk = baseReqAtk;
      const priestPenaltyAdded = priestStaffPenalty ? 74 : 0;
      reqAtk += priestPenaltyAdded;

      const div = 149;
      const exponent = (effectiveAtk - reqAtk) / div;
      let penRate = Math.pow(2, exponent);
      penRate = Math.min(1, Math.max(0.03125, penRate));

      const wasMagicWeakBoosted = attackType === 'Magick' && magicWeak;
      if (wasMagicWeakBoosted) {
        penRate = Math.min(1, penRate * 1.3);
      }

      const percentMultiplier = 1 + totalPercent / 100;
      const damageMultiplier = penRate * percentMultiplier;
      const finalDamage = (Number(baseSkill) || 0) * damageMultiplier;
      const atkDiff = effectiveAtk - reqAtk;

      return {
        enemyLevel: level,
        enemyKind,
        attackType,
        selectedJob,
        modVersion,
        tableJobMod,
        activeJobMod,
        isJobModOverridden: false,
        baseAtk: Number(baseAtk) || 0,
        flatAtk: Number(flatAtk) || 0,
        flatSlayer: Number(flatSlayer) || 0,
        baseSkill: Number(baseSkill) || 0,
        totalPercent,
        effectiveAtk,
        baseReqAtk,
        priestPenaltyAdded,
        reqAtk,
        isReqAtkOverridden: false,
        div,
        autoDiv: 149,
        isDivOverridden: false,
        exponent,
        penRate,
        wasMagicWeakBoosted,
        magicWeakValue: 1.3,
        debuffPercent: 0,
        debuffMultiplier: 1,
        elemMultiplier: 1,
        percentMultiplier,
        damageMultiplier,
        finalDamage,
        atkDiff,
      };
    }

    // ==================== V2 (Experimental Dynamic Divisor & Overrides) ====================
    const isReqAtkOverridden = manualReqAtk.trim() !== '' && !isNaN(Number(manualReqAtk));
    let baseReqAtk = 0;
    if (isReqAtkOverridden) {
      baseReqAtk = Number(manualReqAtk);
    } else if (REQ_ATK_LOOKUP[level] !== undefined) {
      baseReqAtk = REQ_ATK_LOOKUP[level];
    } else {
      baseReqAtk = Math.max(1, Math.round(47.65 * level - 1348.25));
    }

    let reqAtk = baseReqAtk;
    const priestPenaltyAdded = priestStaffPenalty ? (Number(priestPenaltyValue) || 74) : 0;
    reqAtk += priestPenaltyAdded;

    const isDivOverridden = manualDiv.trim() !== '' && !isNaN(Number(manualDiv));
    const autoDiv = 0.763 * level + 75.8;
    const div = isDivOverridden ? Math.max(0.1, Number(manualDiv)) : Math.max(0.1, autoDiv);

    const exponent = (effectiveAtk - reqAtk) / div;
    let penRate = Math.pow(2, exponent);
    penRate = Math.min(1, Math.max(0.03125, penRate));

    const wasMagicWeakBoosted = attackType === 'Magick' && magicWeak;
    if (wasMagicWeakBoosted) {
      penRate = Math.min(1, penRate * (Number(magicWeakValue) || 1.3));
    }

    const percentMultiplier = 1 + totalPercent / 100;
    const debuffMultiplier = 1 + Math.max(0, Number(debuffPercent) || 0) / 100;
    const elemMultiplier = Math.max(1.0, Number(elementalWeaknessValue) || 1.0);
    const damageMultiplier = penRate * percentMultiplier * debuffMultiplier * elemMultiplier;
    const finalDamage = (Number(baseSkill) || 0) * damageMultiplier;
    const atkDiff = effectiveAtk - reqAtk;

    return {
      enemyLevel: level,
      enemyKind,
      attackType,
      selectedJob,
      modVersion,
      tableJobMod,
      activeJobMod,
      isJobModOverridden,
      baseAtk: Number(baseAtk) || 0,
      flatAtk: Number(flatAtk) || 0,
      flatSlayer: Number(flatSlayer) || 0,
      baseSkill: Number(baseSkill) || 0,
      totalPercent,
      effectiveAtk,
      baseReqAtk,
      priestPenaltyAdded,
      reqAtk,
      isReqAtkOverridden,
      div,
      autoDiv,
      isDivOverridden,
      exponent,
      penRate,
      wasMagicWeakBoosted,
      magicWeakValue: Number(magicWeakValue) || 1.3,
      debuffPercent: Number(debuffPercent) || 0,
      debuffMultiplier,
      elemMultiplier,
      percentMultiplier,
      damageMultiplier,
      finalDamage,
      atkDiff,
    };
  }, [
    calcVersion,
    enemyLevel,
    enemyKind,
    attackType,
    selectedJob,
    modVersion,
    tableJobMod,
    activeJobMod,
    manualReqAtk,
    manualDiv,
    priestStaffPenalty,
    priestPenaltyValue,
    baseAtk,
    flatAtk,
    flatSlayer,
    baseSkill,
    magicWeak,
    magicWeakValue,
    debuffPercent,
    elementalWeaknessValue,
    slash,
    ice,
    fire,
    dark,
    lightning,
    nullElem,
    holy,
    impact,
    other,
  ]);

  const handleCalculateClick = () => {
    const el = document.getElementById('calc-output-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleReset = () => {
    if (calcVersion === 'v1') {
      setEnemyLevel(85);
      setEnemyKind('None');
      setAttackType('Physical');
      setModVersion('lv60');
      setSelectedJobId('fighter');
      setBaseAtk(2000);
      setFlatAtk(0);
      setFlatSlayer(0);
      setBaseSkill(100);
      setPriestStaffPenalty(false);
      setMagicWeak(false);
    } else {
      setEnemyLevel(96);
      setEnemyKind('None');
      setAttackType('Physical');
      setModVersion('lv93');
      setSelectedJobId('fighter');
      setBaseAtk(3000);
      setFlatAtk(0);
      setFlatSlayer(0);
      setBaseSkill(100);
      setManualDiv('');
      setManualReqAtk('');
      setManualJobMod('');
      setPriestStaffPenalty(true);
      setPriestPenaltyValue(74);
      setMagicWeak(false);
      setMagicWeakValue(1.3);
      setDebuffPercent(0);
      setElementalWeaknessValue(1.1);
    }
    setSlash(0);
    setIce(0);
    setFire(0);
    setDark(0);
    setLightning(0);
    setNullElem(0);
    setHoly(0);
    setImpact(0);
    setOther(0);
    setSelectedPresetMonster('');
  };

  const handleApplyPresetMonster = (monsterName: string) => {
    setSelectedPresetMonster(monsterName);
    const found = SPECIFIC_ENEMIES.find((m) => m.name === monsterName);
    if (found) {
      let targetKind = 'Other';
      const specLower = found.speciesName.toLowerCase();
      if (specLower.includes('war-ready')) targetKind = 'War-ready';
      else if (specLower.includes('spirit')) targetKind = 'Spirit';
      else if (specLower.includes('dragon')) targetKind = 'Dragonkin';
      else if (specLower.includes('beast')) targetKind = 'Beast';
      else if (specLower.includes('demihuman')) targetKind = 'Demihuman';
      else if (specLower.includes('human')) targetKind = 'Human';
      else if (specLower.includes('giant')) targetKind = 'Giant';
      else if (specLower.includes('skeleton')) targetKind = 'Skeleton / Skeletal';
      else if (specLower.includes('undead')) targetKind = 'Undead';
      else if (specLower.includes('winged')) targetKind = 'Winged';
      else if (specLower.includes('construct') || specLower.includes('golem')) targetKind = 'Magickal Construct / Golem';
      else if (specLower.includes('fiend') || specLower.includes('demon')) targetKind = 'Fiend / Demon';
      else if (specLower.includes('ogre') || specLower.includes('ogrekin')) targetKind = 'Ogre / Demonkin / Ogrekin';
      else if (specLower.includes('cursed')) targetKind = 'Cursed';
      else if (specLower.includes('formless')) targetKind = 'Formless / Soft';
      else if (specLower.includes('alchemized')) targetKind = 'Season 1 Alchemized';
      else if (specLower.includes('infected')) targetKind = 'Season 2 Infected / Corrupted';

      setEnemyKind(targetKind);

      // If Spirit Dragon Wilmia is chosen, note Fire weakness
      if (monsterName.includes('Wilmia')) {
        setFire(26);
      }
    }
  };

  const handleApplyEarringsPreset = (percentValue: number) => {
    setSlash(percentValue);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-start sm:items-center gap-3 flex-wrap">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Damage Calculator
                  </h1>

                  {/* Interactive Version Swapper in place of the screenshot badge */}
                  <div
                    className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-amber-500/40 shadow-inner"
                    title="Swap Calculator Version: V1 (Classic Wiki) or V2 (Experimental Dynamic Divisor)"
                  >
                    <button
                      type="button"
                      onClick={() => setCalcVersion('v1')}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                        calcVersion === 'v1'
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      aria-pressed={calcVersion === 'v1'}
                    >
                      V1
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcVersion('v2')}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                        calcVersion === 'v2'
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      aria-pressed={calcVersion === 'v2'}
                    >
                      V2
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400">
                  {calcVersion === 'v2'
                    ? 'Penetration Rate Damage Calculator V2 with scaling divisors (0.763×Lv+75.8), manual overrides, defense reduction debuffs, and elemental multipliers.'
                    : 'Penetration Rate Damage Calculator V1 with classic Wiki values (fixed 149 divisor baseline).'}
                </p>

                {/* Requested V2 Annotation: Underneath on V2 page */}
                {calcVersion === 'v2' && (
                  <div className="pt-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium shadow-sm">
                      <FlaskConical className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Experimental, should be more accurate, but require deeper testing to be 100% sure</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Reset all inputs to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              id="btn-damage-calc-calculate"
              onClick={handleCalculateClick}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate</span>
            </button>
          </div>
        </div>

        {/* Quick Bestiary Monster Loader Pill Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-400/90 flex items-center gap-1.5 shrink-0">
            <Skull className="w-3.5 h-3.5 text-amber-400" />
            <span>Bestiary Quick Load:</span>
          </span>
          <div className="flex-1 w-full flex items-center gap-2">
            <select
              value={selectedPresetMonster}
              onChange={(e) => handleApplyPresetMonster(e.target.value)}
              className="w-full sm:w-auto flex-1 bg-slate-950 border border-slate-700 hover:border-amber-500/50 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="">-- Choose a Bestiary Monster to auto-fill Kind --</option>
              {SPECIFIC_ENEMIES.map((m, idx) => (
                <option key={idx} value={m.name}>
                  {m.name} ({m.speciesName}) - Weak: {m.elementalWeakness}
                </option>
              ))}
            </select>
            {selectedPresetMonster && (
              <button
                onClick={() => setSelectedPresetMonster('')}
                className="text-[11px] text-slate-400 hover:text-amber-300 px-2 py-1 bg-slate-800 rounded-lg border border-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Combat Parameters & Attack Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Enemy & Target Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Target & Combat Profile</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Enemy Level */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Enemy Level</span>
                  <span className="text-[11px] text-slate-500 font-normal">Level of target monster</span>
                </label>
                <div className="relative">
                  <input
                    id="enemyLevel"
                    type="number"
                    min="1"
                    max="150"
                    step="1"
                    value={enemyLevel}
                    onChange={(e) => setEnemyLevel(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold focus:outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">Lv</span>
                </div>
              </div>

              {/* Enemy Kind */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Enemy Kind</span>
                  <span className="text-[11px] text-slate-500 font-normal">Target species for Slayer bonuses</span>
                </label>
                <select
                  id="enemyKind"
                  value={enemyKind}
                  onChange={(e) => setEnemyKind(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-amber-300 font-semibold focus:outline-none transition-all cursor-pointer"
                >
                  {ENEMY_KINDS.map((kind) => (
                    <option key={kind.value} value={kind.value} className="bg-slate-900 text-slate-200">
                      {kind.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Attack Type */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Attack Type</span>
                  <span className="text-[11px] text-slate-500 font-normal">Physical or Magick attack</span>
                </label>
                <select
                  id="attackType"
                  value={attackType}
                  onChange={(e) => setAttackType(e.target.value as 'Physical' | 'Magick')}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-semibold focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Physical">Physical</option>
                  <option value="Magick">Magick</option>
                </select>
              </div>

              {/* Modifier Version Selector with Quick Switch Tabs */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Modifier Version</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {calcVersion === 'v2' ? 'Wiki values vs Season 3 ir105' : 'Level 60 Wiki vs Level 93 Estimated'}
                  </span>
                </label>

                {/* Instant Tab Switcher Buttons */}
                <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-700 mb-1.5">
                  <button
                    type="button"
                    onClick={() => setModVersion('lv60')}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      modVersion === 'lv60'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Level 60 (Wiki)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModVersion('lv93')}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      modVersion === 'lv93'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {calcVersion === 'v2' ? 'Level 93 (ir105)' : 'Level 93 (Est.)'}
                  </button>
                </div>

                <select
                  id="modVersion"
                  value={modVersion}
                  onChange={(e) => setModVersion(e.target.value as 'lv60' | 'lv93')}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-1.5 text-xs text-slate-300 font-semibold focus:outline-none transition-all cursor-pointer"
                >
                  <option value="lv60">Level 60 (Wiki Values)</option>
                  <option value="lv93">
                    {calcVersion === 'v2' ? 'Level 93 (ir105)' : 'Level 93 (Estimated)'}
                  </option>
                </select>
              </div>

              {/* Job Weapon Modifier */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="flex flex-col text-xs font-semibold text-slate-300">
                    <span>Job Weapon Modifier</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Vocation order is locked identical in both tabs (swap freely without losing your choice)
                    </span>
                  </label>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    Active Mod: {activeJobMod > 0 ? `+${activeJobMod}` : `${activeJobMod}`}
                    {isJobModOverridden && <span className="ml-1 text-amber-400 font-bold">(Override)</span>}
                  </span>
                </div>
                <select
                  id="jobMod"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none transition-all cursor-pointer"
                >
                  {VOCATION_MODIFIERS.map((job) => {
                    const val = modVersion === 'lv60' ? job.lv60 : job.lv93;
                    const displayValue = val > 0 ? `+${val}` : `${val}`;
                    return (
                      <option key={job.id} value={job.id} className="bg-slate-900 text-slate-200">
                        {job.name} ({displayValue})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Base Attack (displayed) */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Base Attack (displayed)</span>
                  <span className="text-[11px] text-slate-500 font-normal">Shown in character status window</span>
                </label>
                <div className="relative">
                  <input
                    id="baseAtk"
                    type="number"
                    min="0"
                    step="1"
                    value={baseAtk}
                    onChange={(e) => setBaseAtk(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold focus:outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">ATK</span>
                </div>
              </div>

              {/* Flat Attack Increase */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Flat Attack Increase</span>
                  <span className="text-[11px] text-slate-500 font-normal">Bracelets (+30), Augments, Crests</span>
                </label>
                <div className="relative">
                  <input
                    id="flatAtk"
                    type="number"
                    step="1"
                    value={flatAtk}
                    onChange={(e) => setFlatAtk(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold focus:outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">+Flat</span>
                </div>
              </div>

              {/* Flat Slayer vs selected kind */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Flat Slayer vs Selected Kind</span>
                  <span className="text-[11px] text-slate-500 font-normal">e.g. Dragon Slayer, Beast Slayer</span>
                </label>
                <div className="relative">
                  <input
                    id="flatSlayer"
                    type="number"
                    step="1"
                    value={flatSlayer}
                    onChange={(e) => setFlatSlayer(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold focus:outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">+Slayer</span>
                </div>
              </div>

              {/* Base Skill Power */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Base Skill Power</span>
                  <span className="text-[11px] text-slate-500 font-normal">Standard baseline is 100</span>
                </label>
                <div className="relative">
                  <input
                    id="baseSkill"
                    type="number"
                    min="1"
                    step="1"
                    value={baseSkill}
                    onChange={(e) => setBaseSkill(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono font-bold focus:outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">Power</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Manual Overrides (V2 Exclusive) */}
          {calcVersion === 'v2' && (
            <div className="bg-slate-900 border-l-4 border-amber-500 border-y border-r border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Manual Overrides (Optional - leave blank for auto formulas)</span>
                </h2>
                {(manualDiv || manualReqAtk || manualJobMod) && (
                  <button
                    type="button"
                    onClick={() => {
                      setManualDiv('');
                      setManualReqAtk('');
                      setManualJobMod('');
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-mono cursor-pointer"
                  >
                    Clear Overrides
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Manual Div */}
                <div>
                  <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                    <span>Manual Div</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Default: 0.763×Lv+75.8 ({calcResult.autoDiv.toFixed(1)})
                    </span>
                  </label>
                  <input
                    id="manualDiv"
                    type="number"
                    placeholder="Leave blank for auto"
                    step="0.1"
                    value={manualDiv}
                    onChange={(e) => setManualDiv(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none placeholder:text-slate-600"
                  />
                </div>

                {/* Manual Req ATK */}
                <div>
                  <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                    <span>Manual Req ATK</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Default: table lookup ({calcResult.baseReqAtk})
                    </span>
                  </label>
                  <input
                    id="manualReqAtk"
                    type="number"
                    placeholder="Leave blank for auto"
                    step="1"
                    value={manualReqAtk}
                    onChange={(e) => setManualReqAtk(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none placeholder:text-slate-600"
                  />
                </div>

                {/* Manual Job Mod */}
                <div>
                  <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                    <span>Manual Job Mod</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Overrides dropdown (e.g. -135)
                    </span>
                  </label>
                  <input
                    id="manualJobMod"
                    type="number"
                    placeholder="e.g. -135"
                    step="1"
                    value={manualJobMod}
                    onChange={(e) => setManualJobMod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Enemy Modifiers & Debuffs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Enemy Modifiers & Debuffs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Priest Staff Penalty Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <input
                  id="priestStaffPenalty"
                  type="checkbox"
                  checked={priestStaffPenalty}
                  onChange={(e) => setPriestStaffPenalty(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                />
                <label htmlFor="priestStaffPenalty" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Apply Priest Staff Penalty
                  <span className="block text-[11px] text-slate-500 font-normal">
                    Adds required attack threshold (+74)
                  </span>
                </label>
              </div>

              {/* Priest Penalty Value (V2 customizable input, V1 fixed note) */}
              <div>
                <label className="flex flex-col text-xs font-semibold text-slate-300 mb-1">
                  <span>Penalty Amount (default 74)</span>
                  <span className="text-[11px] text-slate-500 font-normal">Added to required ATK</span>
                </label>
                <input
                  id="priestPenaltyValue"
                  type="number"
                  step="1"
                  disabled={!priestStaffPenalty || calcVersion === 'v1'}
                  value={calcVersion === 'v1' ? 74 : priestPenaltyValue}
                  onChange={(e) => setPriestPenaltyValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white font-mono focus:outline-none disabled:opacity-40"
                />
              </div>

              {/* Enemy is magic-weak Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <input
                  id="magicWeak"
                  type="checkbox"
                  checked={magicWeak}
                  onChange={(e) => setMagicWeak(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                />
                <label htmlFor="magicWeak" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Enemy is magic-weak (Magick only)
                  <span className="block text-[11px] text-slate-500 font-normal">
                    Boosts penetration rate for Magick attacks
                  </span>
                </label>
              </div>

              {/* Magic Weak Multiplier (Slider in V2, fixed 1.3x in V1) */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Magic Weak Multiplier:</span>
                  <span id="magicWeakDisplay" className="text-amber-400 font-mono font-bold">
                    {calcVersion === 'v1' ? '1.30x' : `${magicWeakValue.toFixed(2)}x`}
                  </span>
                </div>
                {calcVersion === 'v2' ? (
                  <>
                    <input
                      id="magicWeakValue"
                      type="range"
                      min="1.0"
                      max="1.5"
                      step="0.05"
                      value={magicWeakValue}
                      onChange={(e) => setMagicWeakValue(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>1.0x</span>
                      <span>1.3x (Default)</span>
                      <span>1.5x</span>
                    </div>
                  </>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    V1 uses standard fixed 1.30× multiplier when magic-weak is checked.
                  </p>
                )}
              </div>

              {/* V2 Exclusive Sliders: Defense Debuff & Elemental Weakness */}
              {calcVersion === 'v2' && (
                <>
                  {/* Debuff (Defense Reduction) Slider */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300">Debuff (Defense Reduction):</span>
                      <span id="debuffDisplay" className="text-amber-400 font-mono font-bold">
                        {debuffPercent}%
                      </span>
                    </div>
                    <input
                      id="debuffSlider"
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={debuffPercent}
                      onChange={(e) => setDebuffPercent(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Elemental Weakness Slider */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300">Elemental Weakness:</span>
                      <span id="elementalWeaknessDisplay" className="text-amber-400 font-mono font-bold">
                        {elementalWeaknessValue.toFixed(2)}x
                      </span>
                    </div>
                    <input
                      id="elementalWeaknessValue"
                      type="range"
                      min="1.0"
                      max="1.3"
                      step="0.05"
                      value={elementalWeaknessValue}
                      onChange={(e) => setElementalWeaknessValue(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>1.0x</span>
                      <span>1.1x (Default)</span>
                      <span>1.3x</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 4: % Damage Bonuses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-400" />
                <span>% Damage Bonuses</span>
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setSlash(0);
                    setIce(0);
                    setFire(0);
                    setDark(0);
                    setLightning(0);
                    setNullElem(0);
                    setHoly(0);
                    setImpact(0);
                    setOther(0);
                  }}
                  className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                >
                  Clear %
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyEarringsPreset(26)}
                  className="text-[11px] text-amber-300 hover:text-amber-200 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
                >
                  2x 13% Earrings (+26%)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyEarringsPreset(52)}
                  className="text-[11px] text-amber-300 hover:text-amber-200 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
                >
                  4x 13% Earrings (+52%)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Slash % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Slash %</label>
                <input
                  id="slash"
                  type="number"
                  value={slash}
                  onChange={(e) => setSlash(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Ice % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Ice %</label>
                <input
                  id="ice"
                  type="number"
                  value={ice}
                  onChange={(e) => setIce(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Fire % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Fire %</label>
                <input
                  id="fire"
                  type="number"
                  value={fire}
                  onChange={(e) => setFire(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Dark % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Dark %</label>
                <input
                  id="dark"
                  type="number"
                  value={dark}
                  onChange={(e) => setDark(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Lightning % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Lightning %</label>
                <input
                  id="lightning"
                  type="number"
                  value={lightning}
                  onChange={(e) => setLightning(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Null % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Null %</label>
                <input
                  id="null"
                  type="number"
                  value={nullElem}
                  onChange={(e) => setNullElem(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Holy % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Holy %</label>
                <input
                  id="holy"
                  type="number"
                  value={holy}
                  onChange={(e) => setHoly(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Impact % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Impact %</label>
                <input
                  id="impact"
                  type="number"
                  value={impact}
                  onChange={(e) => setImpact(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>

              {/* Other % */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Other %</label>
                <input
                  id="other"
                  type="number"
                  value={other}
                  onChange={(e) => setOther(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <p className="note text-[11px] sm:text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> This treats all % damage fields as additive into one multiplier.
                If your game multiplies elemental/type categories separately, multiply each category manually.
              </span>
            </p>
          </div>
        </div>

        {/* Right Column: Output & Calculation Results (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div
            id="calc-output-section"
            className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-20"
          >
            {/* Header / Results title */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                    Calculation Results
                    <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 uppercase">
                      {calcVersion}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Penetration rate & multiplier breakdown
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                LIVE
              </span>
            </div>

            {/* Visual Penetration Rate Meter */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Penetration Rate</span>
                <span className={`text-base font-mono font-black ${
                  calcResult.penRate >= 1
                    ? 'text-emerald-400'
                    : calcResult.penRate >= 0.8
                    ? 'text-amber-300'
                    : 'text-rose-400'
                }`}>
                  {(calcResult.penRate * 100).toFixed(2)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    calcResult.penRate >= 1
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                      : calcResult.penRate >= 0.8
                      ? 'bg-gradient-to-r from-orange-500 to-amber-400'
                      : 'bg-gradient-to-r from-red-600 to-orange-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(3.125, calcResult.penRate * 100))}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Min: 3.125%</span>
                <span>Softcap: 80%</span>
                <span>Cap: 100.00%</span>
              </div>
            </div>

            {/* Threshold Status Banner */}
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
              calcResult.penRate >= 1
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              {calcResult.penRate >= 1 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                {calcResult.penRate >= 1 ? (
                  <>
                    <strong>100% Penetration Cap Achieved!</strong> You have{' '}
                    <span className="font-mono font-bold text-emerald-200">
                      +{calcResult.atkDiff.toFixed(1)}
                    </span>{' '}
                    surplus Effective Attack above the penetration threshold.
                  </>
                ) : (
                  <>
                    <strong>Under 100% Penetration Cap.</strong> You need{' '}
                    <span className="font-mono font-bold text-amber-200">
                      +{Math.abs(calcResult.atkDiff).toFixed(1)}
                    </span>{' '}
                    more Effective ATK or Slayer to reach full 100% penetration rate.
                  </>
                )}
              </div>
            </div>

            {/* Detailed Results */}
            <div id="output" className="space-y-3 text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-sans">
              <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Target Profile:</span>
                <span className="text-white font-semibold">
                  Lv {calcResult.enemyLevel} ({calcResult.enemyKind}) | {calcResult.attackType}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Vocation & Version:</span>
                  <span className="font-semibold text-amber-300">
                    {calcResult.selectedJob.name}{' '}
                    <span className="text-slate-400 font-normal">
                      ({calcResult.modVersion === 'lv60' ? 'Lv 60 Wiki' : calcVersion === 'v2' ? 'Lv 93 ir105' : 'Lv 93 Estimated'})
                    </span>
                  </span>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-400">Effective ATK:</span>
                  <div className="text-right">
                    <span className="text-amber-300 font-mono font-bold text-sm">
                      {calcResult.effectiveAtk.toFixed(1)}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono">
                      (Base {calcResult.baseAtk} + Flat {calcResult.flatAtk} + Slayer {calcResult.flatSlayer} − JobMod {calcResult.activeJobMod})
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Required ATK for 100% Pen:</span>
                  <div className="text-right">
                    <span className="text-white font-mono font-bold">
                      {calcResult.reqAtk.toFixed(1)}
                    </span>
                    {calcResult.priestPenaltyAdded > 0 && (
                      <div className="text-[10px] text-amber-400/80 font-mono">
                        (Base {calcResult.baseReqAtk.toFixed(1)} + Priest Staff +{calcResult.priestPenaltyAdded})
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Divisor (Formula / Manual):</span>
                  <span className="text-slate-200 font-mono">
                    {calcResult.div.toFixed(2)}
                    {calcResult.isDivOverridden && (
                      <span className="text-amber-400 ml-1 text-[10px]">(Manual)</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Penetration Rate:</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {(calcResult.penRate * 100).toFixed(2)}%
                    {calcResult.wasMagicWeakBoosted && (
                      <span className="text-[10px] text-indigo-400 ml-1 font-sans">
                        (magic-weak ×{calcResult.magicWeakValue} applied)
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total % Damage Bonus:</span>
                  <span className="text-white font-mono">
                    {calcResult.totalPercent}% → multiplier{' '}
                    <strong className="text-amber-300">{calcResult.percentMultiplier.toFixed(3)}</strong>
                  </span>
                </div>

                {calcVersion === 'v2' && calcResult.debuffPercent > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Debuff (Defense Reduction):</span>
                    <span className="text-emerald-400 font-mono">
                      -{calcResult.debuffPercent}% → ×{calcResult.debuffMultiplier.toFixed(3)}
                    </span>
                  </div>
                )}

                {calcVersion === 'v2' && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Elemental Weakness:</span>
                    <span className="text-indigo-300 font-mono">
                      ×{calcResult.elemMultiplier.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Relative Damage Multiplier:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {calcResult.damageMultiplier.toFixed(3)}×
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center bg-amber-500/10 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div>
                    <span className="text-xs font-bold text-white block">Final Damage Output</span>
                    <span className="text-[10px] text-slate-400 font-mono">Base Skill: {calcResult.baseSkill}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-amber-300">
                    {calcResult.finalDamage.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Formula Reference Explainer */}
            <div className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-slate-800">
              <p className="font-bold text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                Penetration Math Rules ({calcVersion.toUpperCase()}):
              </p>
              {calcVersion === 'v2' ? (
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                  <li><code className="text-slate-300">Divisor = 0.763 × Lv + 75.8</code> (or manual override)</li>
                  <li><code className="text-slate-300">Req ATK = Table Lookup (or 47.65 × Lv − 1348.25) + Priest Staff Penalty</code></li>
                  <li><code className="text-slate-300">Effective ATK = Base + Flat + Slayer − JobMod</code></li>
                  <li><code className="text-slate-300">Penetration Rate = 2^((Effective ATK − Req ATK) / Divisor)</code> (Clamped 3.125% to 100%)</li>
                  <li><code className="text-slate-300">Final Damage = Skill × PenRate × %Bonus × Debuff × ElemWeakness</code></li>
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                  <li><code className="text-slate-300">Divisor = Fixed 149</code></li>
                  <li><code className="text-slate-300">Req ATK = 47.65 × EnemyLv − 1348.25 (+74 Priest Penalty)</code></li>
                  <li><code className="text-slate-300">Effective ATK = Base + Flat + Slayer − JobMod</code></li>
                  <li><code className="text-slate-300">Penetration Rate = 2^((Effective − Req) / 149)</code> (Clamped 3.125% to 100%)</li>
                  <li><code className="text-slate-300">Final Damage = Base Skill × PenRate × (1 + Total% / 100)</code></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
