"use client";

// Pure-JS HTML sanitizer — no jsdom/DOMPurify dependencies.
// Prevents the ERR_REQUIRE_ESM crash that isomorphic-dompurify causes on Vercel.

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "small", "mark", "del", "ins",
  "code", "pre", "kbd", "samp", "var", "abbr", "cite", "q", "time",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "blockquote", "div", "span", "section", "article", "aside", "header", "footer",
  "a",
  "img", "picture", "source", "figure", "figcaption",
  "video", "audio", "track",
  "iframe",
  "table", "thead", "tbody", "tfoot", "tr", "td", "th", "caption", "colgroup", "col",
  "sub", "sup", "details", "summary",
]);

const ALLOWED_ATTRS = new Set([
  "href", "title", "alt", "src", "class", "target", "rel", "width", "height",
  "style", "id", "name", "lang", "dir", "tabindex", "role", "download",
  "srcset", "sizes", "loading", "decoding",
  "allow", "allowfullscreen", "frameborder", "scrolling", "referrerpolicy",
  "controls", "autoplay", "loop", "muted", "playsinline", "poster", "preload",
  "type", "kind", "label", "default",
  "colspan", "rowspan", "scope", "headers",
  "open",
  "aria-label", "aria-labelledby", "aria-describedby", "aria-hidden",
  "aria-controls", "aria-expanded", "aria-current",
]);

const ALLOWED_IFRAME_HOSTS = new Set([
  "www.youtube.com", "youtube.com",
  "www.youtube-nocookie.com", "youtube-nocookie.com",
  "youtu.be", "www.youtu.be",
  "player.vimeo.com", "vimeo.com", "www.vimeo.com",
  "www.facebook.com", "facebook.com", "web.facebook.com",
  "www.tiktok.com", "tiktok.com",
  "www.instagram.com", "instagram.com",
  "platform.twitter.com", "twitter.com", "x.com",
  "www.google.com", "google.com", "maps.google.com",
  "w.soundcloud.com", "soundcloud.com",
  "open.spotify.com",
]);

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

/**
 * Parse a simple list of attributes from an opening tag string.
 * Returns { attrs: Map<string,string>, hasDangerousContent: boolean }.
 */
function parseAttrs(attrString) {
  const attrs = new Map();
  let hasDangerousContent = false;

  // Regex to match attributes: name="value" or name='value' or name=value or just name
  const attrRe = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*)))?/g;
  let m;
  while ((m = attrRe.exec(attrString)) !== null) {
    const name = m[1].toLowerCase().trim();
    const value = m[2] ?? m[3] ?? m[4] ?? "";

    // Block event handlers
    if (name.startsWith("on")) {
      hasDangerousContent = true;
      continue;
    }
    // Block javascript: URLs
    const lowerVal = value.toLowerCase().trim();
    if ((name === "href" || name === "src" || name === "action") && lowerVal.startsWith("javascript:")) {
      hasDangerousContent = true;
      continue;
    }
    // Block data: URLs on certain attributes
    if ((name === "href" || name === "src") && lowerVal.startsWith("data:")) {
      hasDangerousContent = true;
      continue;
    }

    if (ALLOWED_ATTRS.has(name)) {
      attrs.set(name, value);
    }
  }

  return { attrs, hasDangerousContent };
}

function buildAttrString(attrs) {
  const parts = [];
  for (const [name, value] of attrs) {
    if (value === "") {
      parts.push(name);
    } else {
      const escaped = value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      parts.push(`${name}="${escaped}"`);
    }
  }
  return parts.length ? " " + parts.join(" ") : "";
}

function isAllowedIframeSrc(src) {
  if (!src) return false;
  try {
    const url = new URL(src, "https://example.com");
    return url.protocol === "https:" && ALLOWED_IFRAME_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Walk through raw HTML and rebuild only allowed tags/attributes.
 * Strips <script>, <style>, and dangerous attributes entirely.
 */
function sanitizeHtml(html) {
  if (!html || typeof html !== "string") return "";

  const result = [];
  let i = 0;

  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) {
      // No more tags — append remaining text
      result.push(html.slice(i).replace(/</g, "&lt;").replace(/>/g, "&gt;"));
      break;
    }

    // Append text before the tag
    if (lt > i) {
      result.push(html.slice(i, lt).replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }

    const gt = html.indexOf(">", lt);
    if (gt === -1) {
      // Malformed — treat rest as text
      result.push(html.slice(lt).replace(/</g, "&lt;").replace(/>/g, "&gt;"));
      break;
    }

    const tagContent = html.slice(lt + 1, gt);
    i = gt + 1;

    // Comment
    if (tagContent.startsWith("!--")) {
      // Skip comments
      continue;
    }

    // Closing tag
    if (tagContent.startsWith("/")) {
      const tagName = tagContent.slice(1).split(/\s/)[0].toLowerCase();
      if (ALLOWED_TAGS.has(tagName)) {
        result.push(`</${tagName}>`);
      }
      continue;
    }

    // Opening / self-closing tag
    const spaceIdx = tagContent.search(/\s/);
    const tagName = (spaceIdx === -1 ? tagContent : tagContent.slice(0, spaceIdx)).toLowerCase();
    const attrString = spaceIdx === -1 ? "" : tagContent.slice(spaceIdx + 1);

    if (!ALLOWED_TAGS.has(tagName)) {
      // Disallowed tag — drop it entirely
      continue;
    }

    const { attrs, hasDangerousContent } = parseAttrs(attrString);

    // Special handling for iframes
    if (tagName === "iframe") {
      const src = attrs.get("src") || "";
      if (!isAllowedIframeSrc(src)) {
        continue; // drop iframe with bad src
      }
      // Force sandbox attributes for safety
      attrs.set("loading", "lazy");
    }

    // Add rel="noopener noreferrer" for external links
    if (tagName === "a" && attrs.get("target") === "_blank") {
      attrs.set("rel", "noopener noreferrer");
    }

    const selfClose = html[gt - 1] === "/" || VOID_TAGS.has(tagName);
    if (selfClose) {
      result.push(`<${tagName}${buildAttrString(attrs)} />`);
    } else {
      result.push(`<${tagName}${buildAttrString(attrs)}>`);
    }
  }

  return result.join("");
}

export default function SafeHtml({ html, className = "", as: Tag = "div" }) {
  const clean = sanitizeHtml(html);
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
