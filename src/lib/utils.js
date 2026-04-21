/**
 * Shared utility functions used across the application.
 */

/**
 * Extracts the first image src from HTML content.
 * @param {string} htmlContent
 * @returns {string|null}
 */
export function extractFirstImage(htmlContent) {
  if (!htmlContent) return null;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Strips HTML tags from a string.
 * @param {string} html
 * @returns {string}
 */
export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Decodes common HTML entities.
 * @param {string} text
 * @returns {string}
 */
export function decodeHtmlEntities(text = "") {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

/**
 * Combines stripHtml + decodeEntities for plain text extraction.
 * @param {string} html
 * @returns {string}
 */
export function toPlainText(html = "") {
  return decodeHtmlEntities(stripHtml(html));
}
