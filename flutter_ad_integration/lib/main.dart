import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'ad_service.dart';
import 'consent_service.dart';
import 'models/quest_data.dart';
import 'universal_ad_banner.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AdService().initialize();
  runApp(const DragonDogmaCompanionApp());
}

class DragonDogmaCompanionApp extends StatelessWidget {
  const DragonDogmaCompanionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Dragon's Dogma Online Companion",
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFF59E0B),
          secondary: Color(0xFFD97706),
          surface: Color(0xFF0F172A),
        ),
        cardColor: const Color(0xFF0F172A),
      ),
      home: const AdaptiveMainScreen(),
    );
  }
}

class AdaptiveMainScreen extends StatefulWidget {
  const AdaptiveMainScreen({super.key});

  @override
  State<AdaptiveMainScreen> createState() => _AdaptiveMainScreenState();
}

class _AdaptiveMainScreenState extends State<AdaptiveMainScreen> {
  int _selectedTabIndex = 0;

  // Shared State
  int _currentLevel = 1;
  int _targetLevel = 15;
  bool _useXpRing = true; // +50% Ring
  bool _useServerBooster = true; // +100% Server Boost
  bool _useSupportPassport = false; // +100% Passport
  String? _selectedPresetId = 'preset_beginner';
  final List<String> _plannedQuestIds = ['q_tinder_goblins', 'q_orc_clearing'];

  @override
  void initState() {
    super.initState();
    // Prompt GDPR on first launch
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ConsentService().requestConsentOnFirstLaunch(context);
    });
  }

  // --- XP Calculator Multiplier Math ---
  double get totalXpMultiplier {
    double mult = 1.0;
    if (_useXpRing) mult += 0.50;
    if (_useServerBooster) mult += 1.00;
    if (_useSupportPassport) mult += 1.00;
    return mult;
  }

  int calculateTotalPlannedXp() {
    int sum = 0;
    for (final qId in _plannedQuestIds) {
      final q = SAMPLE_QUESTS.firstWhere((item) => item.id == qId, orElse: () => SAMPLE_QUESTS.first);
      sum += (q.baseExp * totalXpMultiplier).round();
    }
    return sum;
  }

  @override
  Widget build(BuildContext context) {
    // Determine screen layout dynamically (Mobile vs Desktop)
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = (!kIsWeb && (Platform.isAndroid || Platform.isIOS)) || screenWidth < 768;

    return isMobile ? _buildMobileTouchLayout() : _buildDesktopWideLayout();
  }

  // =========================================================================
  // 📱 1. MOBILE TOUCH LAYOUT (ANDROID & iOS)
  // =========================================================================
  Widget _buildMobileTouchLayout() {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFFF59E0B).withOpacity(0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.shield, color: Color(0xFFFBBF24), size: 18),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('DDON Mobile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                Text('Touch Edition', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.privacy_tip_outlined, color: Color(0xFF94A3B8)),
            onPressed: () => showDialog(context: context, builder: (ctx) => const GDPRConsentDialog()),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          child: _buildMobileContentBody(),
        ),
      ),
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const UniversalAdBanner(), // Google AdMob Banner on Android
          BottomNavigationBar(
            currentIndex: _selectedTabIndex,
            onTap: (i) => setState(() => _selectedTabIndex = i),
            backgroundColor: const Color(0xFF0B1120),
            selectedItemColor: const Color(0xFFF59E0B),
            unselectedItemColor: const Color(0xFF64748B),
            type: BottomNavigationBarType.fixed,
            items: const [
              BottomNavigationBarItem(icon: Icon(Icons.calculate_outlined), activeIcon: Icon(Icons.calculate), label: 'Planner'),
              BottomNavigationBarItem(icon: Icon(Icons.menu_book_outlined), activeIcon: Icon(Icons.menu_book), label: 'Quests'),
              BottomNavigationBarItem(icon: Icon(Icons.bolt_outlined), activeIcon: Icon(Icons.bolt), label: 'Boosters'),
              BottomNavigationBarItem(icon: Icon(Icons.settings_outlined), activeIcon: Icon(Icons.settings), label: 'Consent'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMobileContentBody() {
    if (_selectedTabIndex == 0) {
      // Mobile Leveling Planner Tab
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildMobileStatsCard(),
          const SizedBox(height: 14),
          _buildLevelRangeSelector(isMobile: true),
          const SizedBox(height: 14),
          _buildBoosterToggles(isMobile: true),
          const SizedBox(height: 14),
          _buildPlannedQuestsSection(isMobile: true),
        ],
      );
    } else if (_selectedTabIndex == 1) {
      // Mobile Quest Library Tab
      return _buildQuestLibraryList(isMobile: true);
    } else if (_selectedTabIndex == 2) {
      // Mobile Boosters Tab
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildBoosterToggles(isMobile: true),
          const SizedBox(height: 16),
          _buildPresetsPicker(isMobile: true),
        ],
      );
    } else {
      // Mobile Settings / GDPR Tab
      return _buildSettingsAndGDPRPanel(isMobile: true);
    }
  }

  // =========================================================================
  // 🖥️ 2. DESKTOP WIDESCREEN LAYOUT (WINDOWS & LINUX)
  // =========================================================================
  Widget _buildDesktopWideLayout() {
    return Scaffold(
      body: Row(
        children: [
          // Desktop Left Sidebar / Navigation Rail
          NavigationRail(
            selectedIndex: _selectedTabIndex,
            onDestinationSelected: (i) => setState(() => _selectedTabIndex = i),
            backgroundColor: const Color(0xFF0B1120),
            selectedIconTheme: const IconThemeData(color: Color(0xFFF59E0B)),
            unselectedIconTheme: const IconThemeData(color: Color(0xFF64748B)),
            selectedLabelTextStyle: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 11),
            unselectedLabelTextStyle: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
            labelType: NavigationRailLabelType.all,
            leading: Padding(
              padding: const EdgeInsets.symmetric(vertical: 20.0),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF59E0B).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.4)),
                    ),
                    child: const Icon(Icons.shield, color: Color(0xFFFBBF24), size: 28),
                  ),
                  const SizedBox(height: 6),
                  const Text('DDON', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, letterSpacing: 1)),
                  const Text('DESKTOP', style: TextStyle(color: Color(0xFF64748B), fontSize: 9)),
                ],
              ),
            ),
            trailing: Expanded(
              child: Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: IconButton(
                    icon: const Icon(Icons.privacy_tip_outlined, color: Color(0xFF64748B)),
                    tooltip: 'GDPR & Privacy Consent',
                    onPressed: () => showDialog(context: context, builder: (ctx) => const GDPRConsentDialog()),
                  ),
                ),
              ),
            ),
            destinations: const [
              NavigationRailDestination(icon: Icon(Icons.calculate_outlined), selectedIcon: Icon(Icons.calculate), label: Text('Planner')),
              NavigationRailDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: Text('Quests')),
              NavigationRailDestination(icon: Icon(Icons.bolt_outlined), selectedIcon: Icon(Icons.bolt), label: Text('Presets')),
              NavigationRailDestination(icon: Icon(Icons.settings_outlined), selectedIcon: Icon(Icons.settings), label: Text('Privacy')),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1, color: Color(0xFF1E293B)),

          // Desktop Main Workspace
          Expanded(
            child: Column(
              children: [
                // Top Header Bar
                _buildDesktopHeader(),

                // Desktop 2-Column Split Workspace
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: _buildDesktopWorkspace(),
                  ),
                ),

                // Bottom Desktop Sponsor Banner
                const UniversalAdBanner(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
      decoration: const BoxDecoration(
        color: Color(0xFF0F172A),
        border: Border(bottom: BorderSide(color: Color(0xFF1E293B))),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Text(
                'Arisen XP Leveling Planner',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              const SizedBox(width: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.15),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                ),
                child: const Text('DESKTOP EDITION (WIN/LINUX)', style: TextStyle(color: Color(0xFF34D399), fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0xFF334155)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.bolt, color: Color(0xFFFBBF24), size: 16),
                    const SizedBox(width: 6),
                    Text(
                      'Rate: ${(totalXpMultiplier * 100).toInt()}% XP',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFFFBBF24)),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopWorkspace() {
    if (_selectedTabIndex == 0) {
      // 2-Column Split: Left = Planner Controls & Boosters; Right = Planned Steps & Quest Picker
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Left Column
          Expanded(
            flex: 5,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildDesktopSummaryBanner(),
                  const SizedBox(height: 16),
                  _buildLevelRangeSelector(isMobile: false),
                  const SizedBox(height: 16),
                  _buildBoosterToggles(isMobile: false),
                  const SizedBox(height: 16),
                  _buildPresetsPicker(isMobile: false),
                ],
              ),
            ),
          ),
          const SizedBox(width: 20),
          // Right Column: Planned Queue & Quick Quest Adder
          Expanded(
            flex: 6,
            child: _buildPlannedQuestsSection(isMobile: false),
          ),
        ],
      );
    } else if (_selectedTabIndex == 1) {
      return _buildQuestLibraryList(isMobile: false);
    } else if (_selectedTabIndex == 2) {
      return _buildPresetsPicker(isMobile: false);
    } else {
      return _buildSettingsAndGDPRPanel(isMobile: false);
    }
  }

  // =========================================================================
  // 🧩 REUSABLE ADAPTIVE UI SUB-COMPONENTS
  // =========================================================================

  Widget _buildMobileStatsCard() {
    final totalXp = calculateTotalPlannedXp();
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Active Plan Overview', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFF59E0B).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text('${(totalXpMultiplier * 100).toInt()}% XP', style: const TextStyle(color: Color(0xFFFBBF24), fontSize: 11, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Lv. $_currentLevel ➔ Lv. $_targetLevel',
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 6),
          Text(
            'Estimated Total Yield: $totalXp XP across ${_plannedQuestIds.length} steps',
            style: const TextStyle(fontSize: 12, color: Color(0xFFCBD5E1)),
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopSummaryBanner() {
    final totalXp = calculateTotalPlannedXp();
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Target Progression', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
              const SizedBox(height: 4),
              Text('Lv. $_currentLevel  ➔  Lv. $_targetLevel', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              const Text('Total Plan XP Yield', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
              const SizedBox(height: 4),
              Text('$totalXp XP', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFFFBBF24))),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLevelRangeSelector({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Target Level Range', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Current: Lv. $_currentLevel', style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                    Slider(
                      value: _currentLevel.toDouble(),
                      min: 1,
                      max: 90,
                      divisions: 89,
                      activeColor: const Color(0xFFF59E0B),
                      onChanged: (val) {
                        setState(() {
                          _currentLevel = val.round();
                          if (_targetLevel < _currentLevel) _targetLevel = _currentLevel + 1;
                        });
                      },
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Target: Lv. $_targetLevel', style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                    Slider(
                      value: _targetLevel.toDouble(),
                      min: 1,
                      max: 90,
                      divisions: 89,
                      activeColor: const Color(0xFF10B981),
                      onChanged: (val) {
                        setState(() {
                          _targetLevel = val.round();
                          if (_targetLevel < _currentLevel) _currentLevel = _targetLevel;
                        });
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBoosterToggles({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Active XP Boosters', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
          const SizedBox(height: 8),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            dense: true,
            title: const Text('XP Ring (+50%)', style: TextStyle(fontSize: 12, color: Colors.white)),
            subtitle: const Text('Standard craftable accessory boost', style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
            value: _useXpRing,
            activeColor: const Color(0xFFF59E0B),
            onChanged: (v) => setState(() => _useXpRing = v),
          ),
          const Divider(color: Color(0xFF1E293B)),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            dense: true,
            title: const Text('Server 2x Weekend Event (+100%)', style: TextStyle(fontSize: 12, color: Colors.white)),
            subtitle: const Text('Community revival private server rate', style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
            value: _useServerBooster,
            activeColor: const Color(0xFFF59E0B),
            onChanged: (v) => setState(() => _useServerBooster = v),
          ),
          const Divider(color: Color(0xFF1E293B)),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            dense: true,
            title: const Text('Support Passport Course (+100%)', style: TextStyle(fontSize: 12, color: Colors.white)),
            subtitle: const Text('Premium Adventure Pass buff', style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
            value: _useSupportPassport,
            activeColor: const Color(0xFFF59E0B),
            onChanged: (v) => setState(() => _useSupportPassport = v),
          ),
        ],
      ),
    );
  }

  Widget _buildPlannedQuestsSection({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Planned Quest Steps (${_plannedQuestIds.length})', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
              TextButton.icon(
                onPressed: () => _showAddQuestPickerModal(),
                icon: const Icon(Icons.add, size: 14),
                label: const Text('Add Step', style: TextStyle(fontSize: 11)),
                style: TextButton.styleFrom(foregroundColor: const Color(0xFFF59E0B)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (_plannedQuestIds.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 24.0),
              child: Center(
                child: Text('No quests added to the plan. Tap "+ Add Step" to build your route.', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
              ),
            )
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _plannedQuestIds.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (ctx, i) {
                final qId = _plannedQuestIds[i];
                final quest = SAMPLE_QUESTS.firstWhere((item) => item.id == qId, orElse: () => SAMPLE_QUESTS.first);
                final boostedXp = (quest.baseExp * totalXpMultiplier).round();

                return Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF334155)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text('${i + 1}', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFF59E0B))),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(quest.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                            const SizedBox(height: 2),
                            Text('${quest.zone} • ${quest.targetEnemy}', style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                          ],
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('+$boostedXp XP', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF34D399))),
                          const SizedBox(height: 2),
                          Text('${quest.gold} Gold', style: const TextStyle(fontSize: 10, color: Color(0xFFFBBF24))),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, size: 16, color: Color(0xFF64748B)),
                        onPressed: () {
                          setState(() {
                            _plannedQuestIds.removeAt(i);
                          });
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
        ],
      ),
    );
  }

  Widget _buildPresetsPicker({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Recommended Leveling Presets', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
          const SizedBox(height: 8),
          ...SAMPLE_PRESETS.map((preset) {
            final isSelected = _selectedPresetId == preset.id;
            return InkWell(
              onTap: () {
                setState(() {
                  _selectedPresetId = preset.id;
                  _plannedQuestIds.clear();
                  _plannedQuestIds.addAll(preset.questIds);
                });
              },
              borderRadius: BorderRadius.circular(10),
              child: Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isSelected ? const Color(0xFFF59E0B).withOpacity(0.12) : const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: isSelected ? const Color(0xFFF59E0B) : const Color(0xFF334155)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(preset.name, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: isSelected ? const Color(0xFFFBBF24) : Colors.white)),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF334155),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(preset.levelRange, style: const TextStyle(fontSize: 10, color: Color(0xFFCBD5E1))),
                              ),
                            ],
                          ),
                          const SizedBox(height: 3),
                          Text(preset.description, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                        ],
                      ),
                    ),
                    Icon(isSelected ? Icons.check_circle : Icons.arrow_forward_ios, size: 16, color: isSelected ? const Color(0xFFF59E0B) : const Color(0xFF64748B)),
                  ],
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget _buildQuestLibraryList({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Notice Board & World Quest Database', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.white)),
          const SizedBox(height: 12),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: SAMPLE_QUESTS.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (ctx, i) {
              final q = SAMPLE_QUESTS[i];
              return Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFF334155)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(q.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                          const SizedBox(height: 2),
                          Text('${q.zone} • Min Lv. ${q.minLevel}', style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                          Text('Objective: ${q.targetEnemy}', style: const TextStyle(fontSize: 11, color: Color(0xFFCBD5E1))),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _plannedQuestIds.add(q.id);
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Added ${q.name} to planner!'), duration: const Duration(seconds: 1)),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFF59E0B),
                        foregroundColor: const Color(0xFF0F172A),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      ),
                      child: const Text('Add to Plan', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsAndGDPRPanel({required bool isMobile}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Privacy & Settings', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
          const SizedBox(height: 12),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.privacy_tip_outlined, color: Color(0xFFFBBF24)),
            title: const Text('Manage GDPR / Ad Consent', style: TextStyle(color: Colors.white, fontSize: 14)),
            subtitle: const Text('Review or change personalized ad tracking choices', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
            trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF64748B)),
            onTap: () => showDialog(context: context, builder: (ctx) => const GDPRConsentDialog()),
          ),
        ],
      ),
    );
  }

  void _showAddQuestPickerModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF0B1120),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Select Quest to Add', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
              const SizedBox(height: 12),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: SAMPLE_QUESTS.length,
                  itemBuilder: (_, i) {
                    final q = SAMPLE_QUESTS[i];
                    return ListTile(
                      title: Text(q.name, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                      subtitle: Text('${q.zone} • ${q.baseExp} Base XP', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                      trailing: const Icon(Icons.add_circle, color: Color(0xFFF59E0B)),
                      onTap: () {
                        setState(() {
                          _plannedQuestIds.add(q.id);
                        });
                        Navigator.of(ctx).pop();
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
