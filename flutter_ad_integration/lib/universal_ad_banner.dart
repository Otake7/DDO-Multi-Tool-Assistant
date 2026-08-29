import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'ad_service.dart';
import 'consent_service.dart';
import 'models/ad_banner_item.dart';

/// UniversalAdBanner Widget
/// - Android / iOS: Renders compliant AdMob or Voyant Ads SDK banner based on user GDPR choice
/// - Windows / Linux / macOS / Web: Renders sleek dark-themed community sponsor banners
class UniversalAdBanner extends StatefulWidget {
  final EdgeInsetsGeometry padding;
  final bool showBorder;
  final bool preferVoyantAds;

  const UniversalAdBanner({
    Key? key,
    this.padding = const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    this.showBorder = true,
    this.preferVoyantAds = false,
  }) : super(key: key);

  @override
  State<UniversalAdBanner> createState() => _UniversalAdBannerState();
}

class _UniversalAdBannerState extends State<UniversalAdBanner> {
  int _currentDesktopIndex = 0;
  List<AdBannerItem> _sponsors = [];

  @override
  void initState() {
    super.initState();
    _sponsors = AdService().getDesktopSponsors();
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = !kIsWeb && (Platform.isAndroid || Platform.isIOS);

    if (isMobile) {
      final consent = ConsentService();
      final isPersonalized = consent.personalizedAdsAllowed;

      // Mobile View (Google AdMob / Voyant Ads SDK Container)
      return Container(
        padding: widget.padding,
        alignment: Alignment.center,
        child: Container(
          height: 50,
          width: 320,
          decoration: BoxDecoration(
            color: const Color(0xFF0F172A),
            borderRadius: BorderRadius.circular(8),
            border: widget.showBorder
                ? Border.all(color: const Color(0xFF334155), width: 1)
                : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                widget.preferVoyantAds ? Icons.bolt : Icons.ad_units,
                color: const Color(0xFFF59E0B),
                size: 16,
              ),
              const SizedBox(width: 8),
              Text(
                widget.preferVoyantAds
                    ? 'Voyant Ads Banner (${isPersonalized ? "Targeted" : "Non-Personalized"})'
                    : 'AdMob Banner (${isPersonalized ? "Personalized" : "NPA Mode"})',
                style: const TextStyle(
                  color: Color(0xFF94A3B8),
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      );
    }

    // Desktop Banner (Windows, Linux, macOS & Web)
    if (_sponsors.isEmpty) return const SizedBox.shrink();
    final ad = _sponsors[_currentDesktopIndex];

    return Container(
      padding: widget.padding,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(12),
          border: widget.showBorder
              ? Border.all(color: const Color(0xFFF59E0B).withOpacity(0.3), width: 1)
              : null,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFF59E0B).withOpacity(0.15),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(
                  color: const Color(0xFFF59E0B).withOpacity(0.4),
                  width: 1,
                ),
              ),
              child: Text(
                ad.badge,
                style: const TextStyle(
                  color: Color(0xFFFBBF24),
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.5,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    ad.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 2),
                  Text(
                    ad.subtitle,
                    style: const TextStyle(
                      color: Color(0xFF94A3B8),
                      fontSize: 11,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            ElevatedButton(
              onPressed: () => _launchUrl(ad.targetUrl),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFF59E0B),
                foregroundColor: const Color(0xFF0F172A),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                textStyle: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
              child: Text(ad.ctaText),
            ),
          ],
        ),
      ),
    );
  }
}
