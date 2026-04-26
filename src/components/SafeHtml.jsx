"use client";

import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
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
];

const ALLOWED_ATTR = [
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
];

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

let hooksInstalled = false;
function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName !== "iframe") return;
    const src = node.getAttribute("src") || "";
    try {
      const url = new URL(src);
      if (url.protocol !== "https:" || !ALLOWED_IFRAME_HOSTS.has(url.hostname)) {
        node.parentNode?.removeChild(node);
      }
    } catch {
      node.parentNode?.removeChild(node);
    }
  });

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

installHooks();

export default function SafeHtml({ html, className = "", as: Tag = "div" }) {
  const clean = DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: true,
    ADD_TAGS: ["iframe"],
  });
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
