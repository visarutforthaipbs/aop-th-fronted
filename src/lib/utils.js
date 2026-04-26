/**
 * Shared utility functions used across the application.
 */

/**
 * Extracts the first image src from HTML content.
 * @param {string} htmlContent
 * @returns {string|null}
 */
export function extractFirstImage(htmlContent) {
  if (!htmlContent || typeof htmlContent !== "string") return null;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Safely removes HTML tags from a string or WordPress object.
 * @param {any} html
 * @returns {string}
 */
export function stripHtml(html) {
  if (!html) return "";
  
  // Handle WordPress title/content objects
  if (typeof html !== "string") {
    if (html.rendered) return stripHtml(html.rendered);
    return String(html);
  }

  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Decodes common HTML entities.
 * @param {string} text
 * @returns {string}
 */
export function decodeHtmlEntities(text = "") {
  if (typeof text !== "string") return "";
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
