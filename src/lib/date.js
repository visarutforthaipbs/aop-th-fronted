/**
 * Date formatting utilities.
 */

/**
 * Formats a date string into a long localized date.
 * @param {string} dateString
 * @param {string} locale - e.g. "th-TH" or "en-US"
 * @returns {string}
 */
export function formatLongDate(dateString, locale = "th-TH") {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a date string into a short localized date.
 * @param {string} dateString
 * @param {string} locale
 * @returns {string}
 */
export function formatShortDate(dateString, locale = "th-TH") {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
