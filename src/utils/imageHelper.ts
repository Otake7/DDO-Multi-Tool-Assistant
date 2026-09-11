// Utility to recognize and normalize image URLs (Imgur, direct JPG/PNG/BMP/WEBP/GIF/SVG/AVIF links)

export const IMAGE_EXTENSIONS_REGEX = /\.(jpeg|jpg|png|bmp|webp|gif|svg|avif)(\?.*)?$/i;
export const IMGUR_ALBUM_REGEX = /^https?:\/\/(?:i\.|m\.)?imgur\.com\/(?:a|gallery)\/([a-zA-Z0-9]+)(?:\/.*)?$/i;
export const IMGUR_SINGLE_POST_REGEX = /^https?:\/\/(?:i\.|m\.)?imgur\.com\/([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?(?:\?.*)?$/i;
export const IMGUR_URL_REGEX = /^https?:\/\/(?:i\.|m\.)?imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?(\?.*)?$/i;
export const GENERAL_IMAGE_URL_REGEX = /(https?:\/\/[^\s<>"']+\.(?:jpeg|jpg|png|bmp|webp|gif|svg|avif)(?:\?[^\s<>"']*)?|https?:\/\/(?:i\.|m\.)?imgur\.com\/(?:a\/|gallery\/)?[a-zA-Z0-9]+(?:\.[a-zA-Z]+)?(?:\?[^\s<>"']*)?)/gi;

/**
 * Checks if a URL is an Imgur album/gallery link (which cannot be treated as a raw image file directly)
 */
export function isImgurAlbum(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return IMGUR_ALBUM_REGEX.test(url.trim());
}

/**
 * Extracts the album ID from an Imgur album URL
 */
export function getImgurAlbumId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(IMGUR_ALBUM_REGEX);
  return match ? match[1] : null;
}

/**
 * Normalizes an imgur URL or general image URL to a direct image preview URL
 */
export function normalizeImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  
  // If it's an Imgur album or gallery, do NOT convert to fake i.imgur.com/<albumId>.png
  // Imgur album IDs do not match the underlying file IDs, causing 404/placeholder graphics
  if (isImgurAlbum(trimmed)) {
    return trimmed;
  }

  // If it's already an i.imgur.com direct link with an extension, return it
  if (trimmed.includes('i.imgur.com') && IMAGE_EXTENSIONS_REGEX.test(trimmed)) {
    return trimmed;
  }

  // Imgur single image post URL parsing (e.g. imgur.com/XYZ123)
  const singleMatch = trimmed.match(IMGUR_SINGLE_POST_REGEX);
  if (singleMatch && !trimmed.includes('/a/') && !trimmed.includes('/gallery/')) {
    const id = singleMatch[1];
    return `https://i.imgur.com/${id}.png`;
  }

  return trimmed;
}

/**
 * Checks whether a given string is a valid image URL (Imgur or ends in standard image extension)
 */
export function isImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (IMGUR_URL_REGEX.test(trimmed)) return true;
  return IMAGE_EXTENSIONS_REGEX.test(trimmed);
}
