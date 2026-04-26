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
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return "";
  }
}

/**
 * Formats a date string into a short localized date.
 * @param {string} dateString
 * @param {string} locale
 * @returns {string}
 */
export function formatShortDate(dateString, locale = "th-TH") {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "";
  }
}
