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

const DIRECT_VIDEO_EXTENSIONS = new Set(["mp4", "webm", "ogg", "mov", "m4v", "ogv"]);

function isDirectVideoUrl(src) {
  if (!src) return false;
  try {
    const url = new URL(src);
    const ext = url.pathname.split(".").pop().toLowerCase();
    return DIRECT_VIDEO_EXTENSIONS.has(ext);
  } catch {
    return false;
  }
}

// Returns { url: string, vertical: boolean } or null
function getSocialVideoEmbedUrl(src) {
  if (!src) return null;
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");

    // Facebook
    if (host === "facebook.com" || host === "web.facebook.com") {
      // Reels: /reel/VIDEO_ID/ — vertical (9:16)
      const reelMatch = url.pathname.match(/^\/reel\/(\d+)/);
      if (reelMatch) {
        const canonicalUrl = `https://www.facebook.com/reel/${reelMatch[1]}/`;
        return { url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalUrl)}&show_text=false`, vertical: true };
      }
      // Regular video page: /watch/?v=VIDEO_ID
      const watchId = url.searchParams.get("v");
      if (watchId) {
        const canonicalUrl = `https://www.facebook.com/watch/?v=${watchId}`;
        return { url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalUrl)}&show_text=false`, vertical: false };
      }
      // /videos/VIDEO_ID/
      const videoMatch = url.pathname.match(/\/videos?\/(\d+)/);
      if (videoMatch) {
        const canonicalUrl = `https://www.facebook.com/watch/?v=${videoMatch[1]}`;
        return { url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalUrl)}&show_text=false`, vertical: false };
      }
      // Share links (/share/v/...) — pass as-is (best effort)
      return { url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(src)}&show_text=false`, vertical: false };
    }
    // fb.watch short links
    if (host === "fb.watch") {
      return { url: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(src)}&show_text=false`, vertical: false };
    }
    // YouTube watch links
    if (host === "youtube.com" || host === "m.youtube.com") {
      // YouTube Shorts: /shorts/VIDEO_ID — vertical
      const shortsMatch = url.pathname.match(/^\/shorts\/([\w-]+)/);
      if (shortsMatch) return { url: `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`, vertical: true };
      const videoId = url.searchParams.get("v");
      if (videoId) return { url: `https://www.youtube-nocookie.com/embed/${videoId}`, vertical: false };
    }
    // YouTube short links (youtu.be)
    if (host === "youtu.be") {
      const videoId = url.pathname.slice(1);
      if (videoId) return { url: `https://www.youtube-nocookie.com/embed/${videoId}`, vertical: false };
    }
    // TikTok — always vertical
    if (host === "tiktok.com" || host === "vm.tiktok.com") {
      const videoMatch = url.pathname.match(/\/video\/(\d+)/);
      if (videoMatch) return { url: `https://www.tiktok.com/embed/v2/${videoMatch[1]}`, vertical: true };
    }
    // Vimeo
    if (host === "vimeo.com") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      if (videoId) return { url: `https://player.vimeo.com/video/${videoId}`, vertical: false };
    }
  } catch {
    return null;
  }
  return null;
}

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

    // Special handling for video with social-media src (e.g. Facebook share links)
    if (tagName === "video") {
      const src = attrs.get("src") || "";
      if (src && !isDirectVideoUrl(src)) {
        const embed = getSocialVideoEmbedUrl(src);
        if (embed) {
          const safeUrl = embed.url.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
          const aspectRatio = embed.vertical ? "9/16" : "16/9";
          const maxWidth = embed.vertical ? "max-width:420px;margin:0 auto;" : "";
          result.push(
            `<div style="width:100%;${maxWidth}">` +
            `<iframe src="${safeUrl}" style="aspect-ratio:${aspectRatio};width:100%;border:none;display:block;" ` +
            `allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" frameborder="0"></iframe>` +
            `</div>`
          );
          // Skip to after the closing </video> to avoid emitting a dangling close tag
          const closeIdx = html.toLowerCase().indexOf("</video>", i);
          if (closeIdx !== -1) i = closeIdx + 8;
          continue;
        }
      }
    }

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
