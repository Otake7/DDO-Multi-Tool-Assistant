# Cross-Platform Flutter Ads & GDPR Consent Integration (Android, Windows, Linux & Web)

This package and architecture provides full compliance with:
- **European GDPR & ePrivacy Directive** (First-Launch User Consent Dialog & Persistent Preferences)
- **Google AdMob Policies & Google User Messaging Platform (UMP)**
- **Google Play Families & Children's Online Privacy Protection Act (COPPA)**
- **Voyant Ads SDK** (Personalized & Non-Personalized Ad inventory routing)
- **Cross-Platform fallback for Windows, Linux, Android, iOS, and Web**

---

## 1. How the First Launch GDPR Consent Works

1. When the user launches the app for the very first time, `ConsentService().requestConsentOnFirstLaunch(context)` triggers automatically after the initial widget frame is rendered.
2. The user is presented with the **GDPR Consent Dialog**:
   - **Consent & Accept All**: Enables personalized ads for Google AdMob and Voyant Ads SDK.
   - **Reject Non-Essential**: Restricts ad delivery to Non-Personalized Ads (NPA mode) and disables tracking identifiers.
   - **Manage Preferences**: Allows fine-grained control over Personalized Advertising and Diagnostic Telemetry.
3. The choice is securely saved in `SharedPreferences` (`gdpr_user_consent_status_v1`) so the prompt is not repeated unless explicitly reset by the user in app settings.

---

## 2. Configuration & Compliance Checklist

### Android (`android/app/src/main/AndroidManifest.xml`)
Inside the `<application>` element, define your AdMob App ID:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3940256099942544~3347511713"/>
```

### Voyant Ads SDK Compliance
When initializing the Voyant Ads SDK in `AdService`:
- If `allowPersonalizedAds == true`: Sends consent flags to provide targeted ad fills.
- If `allowPersonalizedAds == false`: Enforces Non-Personalized mode (`gdpr_consent = false`) ensuring compliance with EU regulations.

---

## 3. How to Use in Your Flutter App

### In `main.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter_ad_integration/ad_service.dart';
import 'package:flutter_ad_integration/consent_service.dart';
import 'package:flutter_ad_integration/universal_ad_banner.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AdService().initialize();
  runApp(const MyApp());
}

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Prompts user for GDPR Consent on first launch
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ConsentService().requestConsentOnFirstLaunch(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('DDON Leveling Companion')),
      body: const Center(child: Text('Quest Planner & Database')),
      bottomNavigationBar: const UniversalAdBanner(),
    );
  }
}
```
