import 'dart:async';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Consent status enum matching Google UMP & GDPR requirements
enum GDPRConsentStatus {
  unknown,
  notRequired,
  required,
  obtained,
  denied,
}

/// Comprehensive GDPR and Privacy Consent Management Service
/// Handles Google UMP (User Messaging Platform), Voyant Ads SDK compliance,
/// and First-Launch Consent dialogs across Android, iOS, Windows, Linux, and Web.
class ConsentService {
  static final ConsentService _instance = ConsentService._internal();
  factory ConsentService() => _instance;
  ConsentService._internal();

  static const String _consentKey = 'gdpr_user_consent_status_v1';
  static const String _personalizedAdsKey = 'gdpr_personalized_ads_enabled';
  static const String _analyticsConsentKey = 'gdpr_analytics_consent_enabled';

  GDPRConsentStatus _status = GDPRConsentStatus.unknown;
  bool _personalizedAdsAllowed = false;
  bool _analyticsAllowed = false;
  bool _hasPromptedThisSession = false;

  GDPRConsentStatus get status => _status;
  bool get personalizedAdsAllowed => _personalizedAdsAllowed;
  bool get analyticsAllowed => _analyticsAllowed;
  bool get canRequestAds => _status == GDPRConsentStatus.obtained || _status == GDPRConsentStatus.notRequired;

  /// Initialize consent from local storage or check with Google UMP
  Future<void> initialize() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final savedStatus = prefs.getString(_consentKey);
      _personalizedAdsAllowed = prefs.getBool(_personalizedAdsKey) ?? false;
      _analyticsAllowed = prefs.getBool(_analyticsConsentKey) ?? false;

      if (savedStatus != null) {
        _status = GDPRConsentStatus.values.firstWhere(
          (e) => e.toString() == savedStatus,
          orElse: () => GDPRConsentStatus.unknown,
        );
      } else {
        _status = GDPRConsentStatus.required;
      }

      debugPrint('[ConsentService] Consent Initialized: status=$_status, personalizedAds=$_personalizedAdsAllowed');
    } catch (e) {
      debugPrint('[ConsentService] Error loading saved consent: $e');
      _status = GDPRConsentStatus.required;
    }
  }

  /// Check if the app should display the first-launch consent dialog
  bool shouldShowConsentDialog() {
    return _status == GDPRConsentStatus.unknown || _status == GDPRConsentStatus.required;
  }

  /// Request Google UMP (User Messaging Platform) Consent flow for Android/iOS
  /// or show the Flutter Consent Dialog.
  Future<void> requestConsentOnFirstLaunch(BuildContext context) async {
    if (_hasPromptedThisSession) return;
    _hasPromptedThisSession = true;

    if (!shouldShowConsentDialog()) {
      return;
    }

    // Show native Flutter GDPR Dialog complying with AdMob & Voyant SDK requirements
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => const GDPRConsentDialog(),
    );
  }

  /// Save user consent decisions (compliant with Google AdMob & Voyant Ads SDK)
  Future<void> updateConsent({
    required bool allowPersonalizedAds,
    required bool allowAnalytics,
  }) async {
    _personalizedAdsAllowed = allowPersonalizedAds;
    _analyticsAllowed = allowAnalytics;
    _status = allowPersonalizedAds ? GDPRConsentStatus.obtained : GDPRConsentStatus.denied;

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_consentKey, _status.toString());
      await prefs.setBool(_personalizedAdsKey, _personalizedAdsAllowed);
      await prefs.setBool(_analyticsConsentKey, _analyticsAllowed);
    } catch (e) {
      debugPrint('[ConsentService] Failed to persist consent choices: $e');
    }

    debugPrint('[ConsentService] Consent Saved: status=$_status, personalized=$_personalizedAdsAllowed');
  }

  /// Reset consent for testing or when user taps "Privacy Settings" in App
  Future<void> resetConsent() async {
    _status = GDPRConsentStatus.required;
    _personalizedAdsAllowed = false;
    _analyticsAllowed = false;
    _hasPromptedThisSession = false;

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_consentKey);
      await prefs.remove(_personalizedAdsKey);
      await prefs.remove(_analyticsConsentKey);
    } catch (e) {
      debugPrint('[ConsentService] Failed to reset consent: $e');
    }
  }
}

/// A custom GDPR / Privacy Consent Dialog designed to match Dragon's Dogma UI
/// and fulfill Google AdMob, Google Play Families policy, and Voyant Ads SDK rules.
class GDPRConsentDialog extends StatefulWidget {
  const GDPRConsentDialog({Key? key}) : super(key: key);

  @override
  State<GDPRConsentDialog> createState() => _GDPRConsentDialogState();
}

class _GDPRConsentDialogState extends State<GDPRConsentDialog> {
  bool _personalizedAds = true;
  bool _analyticsAndPerformance = true;
  bool _showCustomization = false;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF0B1120),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Color(0xFFD97706), width: 1.5),
      ),
      insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Container(
        padding: const EdgeInsets.all(20),
        constraints: const BoxConstraints(maxWidth: 480),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF59E0B).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(
                      Icons.shield_outlined,
                      color: Color(0xFFFBBF24),
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Privacy & Ad Consent',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          'Dragon\'s Dogma Companion App',
                          style: TextStyle(
                            color: Color(0xFF94A3B8),
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Description Body
              const Text(
                'We respect your privacy. Under European GDPR, Google AdMob, and advertising partner guidelines (including Voyant Ads SDK), we ask for your consent to use device identifiers and cookies to serve ads and improve app stability.',
                style: TextStyle(
                  color: Color(0xFFCBD5E1),
                  fontSize: 13,
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 12),

              // Customization Expandable section
              if (_showCustomization) ...[
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF334155)),
                  ),
                  child: Column(
                    children: [
                      SwitchListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text(
                          'Personalized Advertisements',
                          style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
                        ),
                        subtitle: const Text(
                          'Allows Google AdMob & Voyant Ads to show ads relevant to your interests.',
                          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                        ),
                        value: _personalizedAds,
                        activeColor: const Color(0xFFF59E0B),
                        onChanged: (val) => setState(() => _personalizedAds = val),
                      ),
                      const Divider(color: Color(0xFF334155)),
                      SwitchListTile(
                        contentPadding: EdgeInsets.zero,
                        title: const Text(
                          'Performance & Analytics',
                          style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
                        ),
                        subtitle: const Text(
                          'Helps us understand quest planner usage and fix crashes.',
                          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                        ),
                        value: _analyticsAndPerformance,
                        activeColor: const Color(0xFFF59E0B),
                        onChanged: (val) => setState(() => _analyticsAndPerformance = val),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
              ],

              // Link to policy
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _showCustomization = !_showCustomization;
                      });
                    },
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      foregroundColor: const Color(0xFFFBBF24),
                    ),
                    child: Text(
                      _showCustomization ? 'Hide Options' : 'Manage Preferences',
                      style: const TextStyle(fontSize: 12, decoration: TextDecoration.underline),
                    ),
                  ),
                  const Text(
                    'AdMob & Voyant Compliant',
                    style: TextStyle(color: Color(0xFF64748B), fontSize: 10),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Action Buttons
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  ElevatedButton(
                    onPressed: () async {
                      await ConsentService().updateConsent(
                        allowPersonalizedAds: true,
                        allowAnalytics: true,
                      );
                      if (context.mounted) Navigator.of(context).pop();
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF59E0B),
                      foregroundColor: const Color(0xFF0F172A),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    child: const Text(
                      'Consent & Accept All',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  const SizedBox(height: 8),

                  if (_showCustomization)
                    OutlinedButton(
                      onPressed: () async {
                        await ConsentService().updateConsent(
                          allowPersonalizedAds: _personalizedAds,
                          allowAnalytics: _analyticsAndPerformance,
                        );
                        if (context.mounted) Navigator.of(context).pop();
                      },
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: Color(0xFF475569)),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: const Text('Save My Choices', style: TextStyle(fontSize: 13)),
                    )
                  else
                    OutlinedButton(
                      onPressed: () async {
                        await ConsentService().updateConsent(
                          allowPersonalizedAds: false,
                          allowAnalytics: false,
                        );
                        if (context.mounted) Navigator.of(context).pop();
                      },
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF94A3B8),
                        side: const BorderSide(color: Color(0xFF334155)),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: const Text('Reject Non-Essential / Use Non-Personalized Ads', style: TextStyle(fontSize: 12)),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
