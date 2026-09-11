import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Image as ImageIcon, ZoomIn, AlertCircle } from 'lucide-react';
import { isImgurAlbum, getImgurAlbumId, normalizeImageUrl } from '../utils/imageHelper';

interface GuideImageRendererProps {
  url: string;
  altText?: string;
  onPreview?: (url: string) => void;
}

declare global {
  interface Window {
    imgurEmbed?: {
      createIframe: () => void;
    };
  }
}

export const GuideImageRenderer: React.FC<GuideImageRendererProps> = ({ url, altText, onPreview }) => {
  const [loadError, setLoadError] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const isAlbum = isImgurAlbum(url);
  const albumId = isAlbum ? getImgurAlbumId(url) : null;
  const directUrl = isAlbum ? url : normalizeImageUrl(url);

  // Dynamically load Imgur embed script for album links
  useEffect(() => {
    if (!isAlbum || !albumId) return;

    const scriptId = 'imgur-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s.imgur.com/min/embed.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    } else if (window.imgurEmbed) {
      window.imgurEmbed.createIframe();
    }
  }, [isAlbum, albumId]);

  if (isAlbum && albumId) {
    return (
      <figure className="my-5 group">
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-xl max-w-2xl mx-auto p-4 transition-all hover:border-amber-500/40">
          {/* Header bar */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 font-mono text-[11px]">
                Imgur Album
              </span>
              <span className="truncate max-w-[280px] sm:max-w-md text-slate-200">
                {altText || `Album #${albumId}`}
              </span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>View on Imgur</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Imgur native embed container */}
          <div ref={embedRef} className="flex justify-center overflow-x-auto min-h-[140px] items-center">
            <blockquote
              className="imgur-embed-pub"
              lang="en"
              data-id={`a/${albumId}`}
              data-context="false"
            >
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline text-xs">
                Loading Imgur album preview: {altText || url}
              </a>
            </blockquote>
          </div>

          {/* Guide hint explaining why direct images differ from album links */}
          <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-start gap-2 text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-xl">
            <span className="text-amber-400 font-bold">Tip:</span>
            <span>
              To display an image permanently without relying on Imgur's script widget, right-click the picture on Imgur and select{' '}
              <strong className="text-slate-200">"Copy image address"</strong> (which gives a direct{' '}
              <code className="text-amber-300">https://i.imgur.com/...png</code> link).
            </span>
          </div>
        </div>

        {altText && (
          <figcaption className="text-center text-xs text-slate-400 mt-2 font-medium">
            {altText}
          </figcaption>
        )}
      </figure>
    );
  }

  // Fallback if direct image fails to load
  if (loadError) {
    return (
      <figure className="my-4 group">
        <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 max-w-2xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>Image could not be loaded directly ({altText || 'Screenshot'})</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        {altText && (
          <figcaption className="text-center text-xs text-slate-400 mt-2 font-medium">
            {altText}
          </figcaption>
        )}
      </figure>
    );
  }

  // Standard Direct Image rendering
  return (
    <figure className="my-4 group">
      <div
        onClick={() => onPreview && onPreview(directUrl)}
        className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-xl cursor-zoom-in hover:border-amber-500/50 transition-all max-w-2xl mx-auto"
      >
        <img
          src={directUrl}
          alt={altText || 'Guide Illustration'}
          referrerPolicy="no-referrer"
          className="w-full max-h-96 object-contain bg-slate-950"
          loading="lazy"
          onError={() => setLoadError(true)}
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] text-amber-300 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" />
          <span>Enlarge</span>
        </div>
      </div>
      {altText && (
        <figcaption className="text-center text-xs text-slate-400 mt-2 font-medium">
          {altText}
        </figcaption>
      )}
    </figure>
  );
};
