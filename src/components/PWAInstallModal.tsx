import React from 'react';
import { Download, Monitor, CheckCircle, ExternalLink, X, Laptop } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isWindows, isLinux, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl shadow-amber-500/10 text-slate-200 animate-in fade-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-5 border-b border-slate-800">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl shadow-amber-500/20 shrink-0 border border-amber-500/30 bg-slate-950 p-1">
            <img
              src="/icon-512.png"
              alt="DDO Multi Tool Assistant App Icon"
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>DDO Multi Tool Assistant</span>
            </h2>
            <p className="text-xs text-amber-400 font-medium mt-0.5">
              Windows & Linux Desktop App
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Install the app directly to your desktop, taskbar, and application menu with this flame icon.
            </p>
          </div>
        </div>

        {/* Installation Status / Actions */}
        <div className="py-5 space-y-4">
          {isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <div>
                <div className="font-bold text-sm">Already Installed</div>
                <div className="text-xs text-emerald-400/80">
                  You are currently running DDO Multi Tool Assistant as a standalone desktop app!
                </div>
              </div>
            </div>
          ) : isInstallable ? (
            <div className="space-y-3">
              <button
                onClick={handleInstallClick}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>1-Click Install to {isWindows ? 'Windows' : isLinux ? 'Linux' : 'Desktop'}</span>
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Installs a standalone desktop app with offline support and the custom flame icon.
              </p>
            </div>
          ) : null}

          {/* OS-Specific Guided Instructions */}
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-semibold text-slate-100 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-amber-400" />
                <span>Windows (Chrome / Edge / Brave):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Look for the <strong className="text-slate-200">Install icon</strong> (a computer monitor with an arrow) in the right side of your address bar.</li>
                <li>Or click browser <strong className="text-slate-200">Menu (⋮) → Save and share → Install DDO Multi Tool Assistant</strong>.</li>
                <li>Windows will place the application shortcut on your <strong className="text-amber-400">Desktop</strong> and in your <strong className="text-amber-400">Start Menu</strong> with the custom icon.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-semibold text-slate-100 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-amber-400" />
                <span>Linux (Chromium / Chrome):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Click the browser menu <strong className="text-slate-200">(⋮) → Install DDO Multi Tool Assistant</strong>.</li>
                <li>Your desktop environment (GNOME, KDE, XFCE) will create a <strong className="text-amber-400">.desktop launcher</strong> with the flame icon in your Application Launcher and Dock.</li>
              </ul>
            </div>

            {isIOS && (
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-[11px] text-slate-400">
                <div className="font-semibold text-slate-200">iOS (Safari):</div>
                <div>Tap the <strong className="text-white">Share</strong> button at the bottom of Safari, then tap <strong className="text-amber-400">Add to Home Screen</strong>.</div>
              </div>
            )}
          </div>

          {/* Download Raw Icon Assets for Custom Shortcuts */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 mb-2 font-medium">
              Want the raw icon files for custom shortcuts, Steam, or taskbars?
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/icon-512.png"
                download="ddo-assistant-icon-512.png"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>PNG (512x512)</span>
              </a>
              <a
                href="/favicon.ico"
                download="ddo-assistant-icon.ico"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Windows ICO</span>
              </a>
              <a
                href="/icon.svg"
                download="ddo-assistant-icon.svg"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Vector SVG</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-3 border-t border-slate-800/80 text-center">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            This app is an unofficial, fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by Capcom Co., Ltd. All game assets, trademarks, and copyright material belong to Capcom.
          </p>
        </div>
      </div>
    </div>
  );
};
