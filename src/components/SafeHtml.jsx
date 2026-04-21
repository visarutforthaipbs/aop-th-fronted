"use client";

import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br", "strong", "b", "em", "i", "u", "a", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "blockquote", "img", "figure", "figcaption", "span", "div",
  "table", "thead", "tbody", "tr", "td", "th", "dl", "dt", "dd", "hr", "sub", "sup",
];

const ALLOWED_ATTR = [
  "href", "title", "alt", "src", "class", "target", "rel", "width", "height",
  "style", "id",
];

/**
 * Renders sanitized HTML safely.
 * All WordPress / ACF content should go through this component.
 */
export default function SafeHtml({ html, className = "", as: Tag = "div" }) {
  const clean = DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
