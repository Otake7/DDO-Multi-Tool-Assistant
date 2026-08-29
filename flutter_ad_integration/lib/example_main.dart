import 'package:flutter/material.dart';
import 'package:flutter_ad_integration/ad_service.dart';
import 'package:flutter_ad_integration/consent_service.dart';
import 'package:flutter_ad_integration/universal_ad_banner.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 1. Initialize Ad and Consent services
  await AdService().initialize();

  runApp(const DragonDogmaCompanionApp());
}

class DragonDogmaCompanionApp extends StatelessWidget {
  const DragonDogmaCompanionApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DDON Leveling & Strategy Companion',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFF59E0B),
          secondary: Color(0xFFD97706),
          surface: Color(0xFF0F172A),
        ),
      ),
      home: const MainHomeScreen(),
    );
  }
}

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({Key? key}) : super(key: key);

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  @override
  void initState() {
    super.initState();
    // 2. Trigger GDPR / Privacy Consent Dialog on First App Launch after frame renders
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ConsentService().requestConsentOnFirstLaunch(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Row(
          children: [
            Icon(Icons.shield, color: Color(0xFFFBBF24), size: 20),
            SizedBox(width: 8),
            Text('DDON Companion', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.privacy_tip_outlined, color: Color(0xFF94A3B8)),
            tooltip: 'Privacy & GDPR Consent Preferences',
            onPressed: () {
              showDialog(
                context: context,
                builder: (ctx) => const GDPRConsentDialog(),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF334155)),
                ),
                child: Column(
                  children: [
                    const Text(
                      'Arisen Leveling Planner & Compendium',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Cross-platform companion running seamlessly on Android, iOS, Windows, and Linux.',
                      style: TextStyle(fontSize: 13, color: Color(0xFF94A3B8)),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: () {
                        // Open consent settings or quest planner
                        showDialog(
                          context: context,
                          builder: (ctx) => const GDPRConsentDialog(),
                        );
                      },
                      icon: const Icon(Icons.settings),
                      label: const Text('Review GDPR & Ad Consent'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFF59E0B),
                        foregroundColor: const Color(0xFF0F172A),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      // 3. Mount Universal Ad Banner at the bottom
      bottomNavigationBar: const UniversalAdBanner(),
    );
  }
}
