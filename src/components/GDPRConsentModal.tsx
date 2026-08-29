import React, { useState, useEffect } from 'react';
import { Shield, Check, Lock, Cookie, ExternalLink, Settings, X } from 'lucide-react';

interface GDPRConsentModalProps {
  onAcceptAll?: () => void;
  onRejectNonEssential?: () => void;
}

export const GDPRConsentModal: React.FC<GDPRConsentModalProps> = ({
  onAcceptAll,
  onRejectNonEssential,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [personalizedAds, setPersonalizedAds] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<boolean>(true);

  useEffect(() => {
    // Check if GDPR consent was already answered
    const consentGiven = localStorage.getItem('ddon_gdpr_consent_status');
    if (!consentGiven) {
      setIsOpen(true);
    }
  }, []);

  const handleSaveConsent = (allowAds: boolean, allowAnalytics: boolean) => {
    localStorage.setItem(
      'ddon_gdpr_consent_status',
      JSON.stringify({
        status: allowAds ? 'obtained' : 'denied',
        personalizedAds: allowAds,
        analytics: allowAnalytics,
        timestamp: new Date().toISOString(),
      })
    );
    setIsOpen(false);
    if (allowAds && onAcceptAll) onAcceptAll();
    if (!allowAds && onRejectNonEssential) onRejectNonEssential();
  };

  if (!isOpen) return null;

  return (
    <div
      id="gdpr-consent-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="gdpr-consent-modal"
        className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Privacy & Advertising Consent
            </h3>
            <p className="text-xs text-slate-400">
              Dragon's Dogma Online: Companion & Leveling Tool
            </p>
          </div>
        </div>

        {/* Body Description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          We respect your data privacy. In compliance with European GDPR, Google AdMob, and
          advertising partner regulations (including Voyant Ads SDK), we require your consent to use
          device identifiers and local storage to personalize advertisements and measure app performance.
        </p>

        {/* Detailed Preferences Accordion */}
        {showPreferences && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div>
                <strong className="text-slate-200 font-semibold block">Personalized Ads (AdMob & Voyant)</strong>
                <span className="text-[11px] text-slate-400">
                  Enables relevant advertising and supports the app community.
                </span>
              </div>
              <input
                type="checkbox"
                checked={personalizedAds}
                onChange={(e) => setPersonalizedAds(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="border-t border-slate-800 pt-2.5 flex items-center justify-between gap-2">
              <div>
                <strong className="text-slate-200 font-semibold block">Usage & Analytics</strong>
                <span className="text-[11px] text-slate-400">
                  Helps analyze high-traffic quest planner routes and fix runtime issues.
                </span>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Manage Preferences Toggle */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
          >
            {showPreferences ? 'Hide Preferences' : 'Manage Preferences'}
          </button>
          <span className="text-[10px] text-slate-500 font-mono">
            GDPR / AdMob / Voyant Compliant
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          {showPreferences ? (
            <button
              onClick={() => handleSaveConsent(personalizedAds, analytics)}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Save My Preferences
            </button>
          ) : (
            <button
              onClick={() => handleSaveConsent(false, false)}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Reject Non-Essential
            </button>
          )}

          <button
            onClick={() => handleSaveConsent(true, true)}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            Accept All & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
