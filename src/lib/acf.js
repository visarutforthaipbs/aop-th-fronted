import { stripHtml } from "@/lib/utils";

/**
 * ACF bilingual field helpers.
 *
 * WordPress ACF exposes custom fields under `post.acf`.
 * After setting up the "English Translation" field group with
 * fields: title_en, excerpt_en, content_en
 * these helpers pick the right language value with a Thai fallback.
 */

/**
 * Returns the title in the requested language.
 * Falls back to the Thai WP title if no English ACF field is set.
 */
export function getTitle(post, lang) {
    if (lang === "en" && post?.acf?.title_en) {
        return post.acf.title_en;
    }
    return post?.title?.rendered || post?.title || "";
}

/**
 * Returns the plain text title (no HTML).
 */
export function getPlainTitle(post, lang) {
    return stripHtml(getTitle(post, lang));
}

/**
 * Returns the excerpt/short description in the requested language.
 * Falls back to the Thai WP excerpt if no English ACF field is set.
 */
export function getExcerpt(post, lang) {
    if (lang === "en" && post?.acf?.excerpt_en) {
        return post.acf.excerpt_en;
    }
    // Strip HTML tags from the WP excerpt
    const raw = post?.excerpt?.rendered || post?.excerpt || "";
    return raw.replace(/<[^>]+>/g, "");
}

/**
 * Returns the full body content (HTML string) in the requested language.
 * Falls back to the Thai WP content if no English ACF field is set.
 */
export function getContent(post, lang) {
    if (lang === "en" && post?.acf?.content_en) {
        return post.acf.content_en;
    }
    return post?.content?.rendered || post?.content || "";
}

/**
 * Returns true if the post has at least one English ACF translation set.
 * Useful for showing a "EN available" badge.
 */
export function hasEnglishTranslation(post) {
    return !!(post?.acf?.title_en || post?.acf?.content_en);
}
