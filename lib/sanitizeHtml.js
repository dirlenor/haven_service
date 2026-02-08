import sanitizeHtml from "sanitize-html";

const richContentOptions = {
  allowedTags: [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "b",
    "blockquote",
    "br",
    "caption",
    "code",
    "col",
    "colgroup",
    "dd",
    "del",
    "details",
    "div",
    "dl",
    "dt",
    "em",
    "figcaption",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "ins",
    "li",
    "mark",
    "ol",
    "p",
    "picture",
    "pre",
    "section",
    "small",
    "source",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
    "u",
    "ul",
    "svg",
    "path",
    "g",
    "circle",
    "rect",
    "line",
    "polyline",
    "polygon",
    "ellipse"
  ],
  allowedAttributes: {
    "*": ["class", "style", "id", "title", "role", "aria-*", "data-*"],
    a: ["href", "name", "target", "rel"],
    img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
    source: ["src", "srcset", "sizes", "type", "media"],
    svg: ["viewBox", "width", "height", "fill", "stroke", "stroke-width", "xmlns", "aria-hidden"],
    path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"],
    circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
    rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke", "stroke-width"],
    line: ["x1", "x2", "y1", "y2", "stroke", "stroke-width"],
    polyline: ["points", "fill", "stroke", "stroke-width"],
    polygon: ["points", "fill", "stroke", "stroke-width"],
    ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width"]
  },
  allowedSchemes: ["http", "https", "mailto", "tel", "data"],
  allowedSchemesByTag: {
    img: ["http", "https", "data"],
    source: ["http", "https", "data"]
  },
  allowProtocolRelative: true
};

const siteSnippetOptions = {
  allowVulnerableTags: true,
  allowedTags: ["script", "noscript", "iframe", "img", "link", "meta", "style", "div", "span"],
  allowedAttributes: {
    "*": ["class", "style", "id", "title", "data-*", "aria-*"],
    script: [
      "src",
      "type",
      "id",
      "async",
      "defer",
      "crossorigin",
      "integrity",
      "referrerpolicy",
      "nonce"
    ],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "loading",
      "referrerpolicy",
      "frameborder"
    ],
    img: ["src", "alt", "width", "height", "loading", "decoding"],
    link: ["href", "rel", "as", "type", "media", "crossorigin", "referrerpolicy", "sizes"],
    meta: ["name", "content", "property", "http-equiv", "charset"]
  },
  allowedSchemes: ["http", "https", "data"],
  allowProtocolRelative: true
};

const toString = (value) => String(value || "");

export const sanitizeRenderedHtml = (value) =>
  sanitizeHtml(toString(value), richContentOptions);

export const sanitizeSiteSnippet = (value) =>
  sanitizeHtml(toString(value), siteSnippetOptions);
