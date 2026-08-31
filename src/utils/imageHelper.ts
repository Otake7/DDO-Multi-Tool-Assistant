// Utility to recognize and normalize image URLs (Imgur, direct JPG/PNG/BMP/WEBP/GIF/SVG/AVIF links)

export const IMAGE_EXTENSIONS_REGEX = /\.(jpeg|jpg|png|bmp|webp|gif|svg|avif)(\?.*)?$/i;
export const IMGUR_URL_REGEX = /^https?:\/\/(?:i\.|m\.)?imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?(\?.*)?$/i;
export const GENERAL_IMAGE_URL_REGEX = /(https?:\/\/[^\s<>"']+\.(?:jpeg|jpg|png|bmp|webp|gif|svg|avif)(?:\?[^\s<>"']*)?|https?:\/\/(?:i\.|m\.)?imgur\.com\/(?:a\/|gallery\/)?[a-zA-Z0-9]+(?:\.[a-zA-Z]+)?(?:\?[^\s<>"']*)?)/gi;

/**
 * Normalizes an imgur URL or general image URL to a direct image preview URL
 */
export function normalizeImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  
  // Imgur URL parsing
  const imgurMatch = trimmed.match(IMGUR_URL_REGEX);
  if (imgurMatch) {
    const id = imgurMatch[1];
    // If it's already an i.imgur.com direct link with an extension, return it
    if (trimmed.includes('i.imgur.com') && IMAGE_EXTENSIONS_REGEX.test(trimmed)) {
      return trimmed;
    }
    // Convert https://imgur.com/ID or https://imgur.com/a/ID to direct image link
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
