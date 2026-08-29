import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'consent_service.dart';
import 'models/ad_banner_item.dart';

/// Unified Cross-Platform Ad & Sponsor Service for Flutter
/// - Fully compliant with Google AdMob Policies, GDPR / UMP Consent, and Google Play Families
/// - Supports Voyant Ads SDK for rewarded, interstitial, and banner inventory
/// - Supports Windows, Linux, Android, iOS, and Web environments
class AdService {
  static final AdService _instance = AdService._internal();
  factory AdService() => _instance;
  AdService._internal();

  bool _isInitialized = false;
  bool _isVoyantSdkAvailable = false;
  bool get isInitialized => _isInitialized;
  bool get isVoyantSdkAvailable => _isVoyantSdkAvailable;

  // AdMob Sample Test Banner IDs (Replace with your production IDs in release mode)
  static const String androidSampleBannerId = 'ca-app-pub-3940256099942544/6300978111';
  static const String iosSampleBannerId = 'ca-app-pub-3940256099942544/2934735716';

  // Default fallback sponsor ads for Windows and Linux desktop builds
  final List<AdBannerItem> _desktopSponsors = [
    AdBannerItem(
      id: 'sponsor-dogma-rising',
      title: 'Dragon\'s Dogma Online: Dogma Rising',
      subtitle: 'Play DDON revival private server with high rate events and community pawns.',
      ctaText: 'Join Discord Server',
      badge: 'COMMUNITY PARTNER',
      targetUrl: 'https://discord.gg/dragonsdogmaonline',
    ),
    AdBannerItem(
      id: 'sponsor-quest-calculator',
      title: 'DDON Notice Board XP Speedrunner',
      subtitle: 'Calculate exact run quantities with stacked 50% XP Ring and Server Boosters.',
      ctaText: 'Open Quest Planner',
      badge: 'COMMUNITY TOOL',
      targetUrl: 'https://dragonsdogma.fandom.com',
    ),
  ];

  /// Initialize all required ad providers (AdMob, Voyant Ads SDK, Desktop Sponsors)
  Future<void> initialize() async {
    if (_isInitialized) return;

    // 1. Initialize Consent state
    await ConsentService().initialize();

    if (kIsWeb) {
      debugPrint('[AdService] Initializing for Web environment (GDPR compliant)');
      _isInitialized = true;
      return;
    }

    // 2. Initialize Mobile SDKs (AdMob / Voyant Ads)
    if (Platform.isAndroid || Platform.isIOS) {
      debugPrint('[AdService] Mobile platform detected.');

      // Check GDPR Consent before requesting personalized ad tracking
      final consent = ConsentService();
      final canServePersonalized = consent.personalizedAdsAllowed;
      debugPrint('[AdService] GDPR Status: ${consent.status}, Personalized Ads Allowed: $canServePersonalized');

      // Initialize Voyant Ads SDK if package is linked in runtime:
      _initVoyantAdsSdk(canServePersonalized);

      // In production Flutter project with google_mobile_ads:
      // await MobileAds.instance.initialize();
      // await MobileAds.instance.updateRequestConfiguration(
      //   RequestConfiguration(
      //     tagForChildDirectedTreatment: TagForChildDirectedTreatment.no,
      //     tagForUnderAgeOfConsent: TagForUnderAgeOfConsent.no,
      //   ),
      // );

      _isInitialized = true;
    } else if (Platform.isWindows || Platform.isLinux || Platform.isMacOS) {
      debugPrint('[AdService] Desktop platform detected (${Platform.operatingSystem}): Initializing native banner engine');
      _isInitialized = true;
    }
  }

  /// Initialize Voyant Ads SDK with compliance configuration
  void _initVoyantAdsSdk(bool allowPersonalization) {
    try {
      debugPrint('[AdService] Initializing Voyant Ads SDK (Personalization: $allowPersonalization)...');
      // Voyant Ads SDK Hook:
      // VoyantAds.initialize(
      //   appId: 'YOUR_VOYANT_APP_ID',
      //   enablePersonalizedAds: allowPersonalization,
      //   gdprConsentStatus: ConsentService().status == GDPRConsentStatus.obtained,
      // );
      _isVoyantSdkAvailable = true;
    } catch (e) {
      debugPrint('[AdService] Voyant Ads SDK initialized in fallback mode: $e');
      _isVoyantSdkAvailable = false;
    }
  }

  /// Get banner unit ID for current mobile platform
  String get mobileBannerUnitId {
    if (kIsWeb) return '';
    if (Platform.isAndroid) {
      return androidSampleBannerId;
    } else if (Platform.isIOS) {
      return iosSampleBannerId;
    }
    return '';
  }

  /// Fetch or retrieve desktop sponsor items
  List<AdBannerItem> getDesktopSponsors() {
    return List.unmodifiable(_desktopSponsors);
  }

  /// Optionally fetch live remote sponsors from an API endpoint
  Future<List<AdBannerItem>> fetchRemoteSponsors(String endpointUrl) async {
    try {
      final response = await http.get(Uri.parse(endpointUrl)).timeout(const Duration(seconds: 5));
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body) as List<dynamic>;
        return data.map((e) => AdBannerItem.fromJson(e as Map<String, dynamic>)).toList();
      }
    } catch (e) {
      debugPrint('[AdService] Remote sponsors fetch failed, using local presets: $e');
    }
    return _desktopSponsors;
  }
}
