const SCRIPT_TAG_REGEX = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const ATTR_REGEX = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

const BOOLEAN_ATTRIBUTES = new Set(["async", "defer"]);

const ATTRIBUTE_NAME_MAP = {
  crossorigin: "crossOrigin",
  referrerpolicy: "referrerPolicy"
};

const ALLOWED_ATTRIBUTES = new Set([
  "id",
  "type",
  "src",
  "async",
  "defer",
  "crossOrigin",
  "integrity",
  "referrerPolicy",
  "nonce"
]);

const normalizeAttributeName = (name) => ATTRIBUTE_NAME_MAP[name] || name;

const parseScriptAttributes = (raw) => {
  const parsed = {};
  let match;

  while ((match = ATTR_REGEX.exec(raw)) !== null) {
    const rawName = String(match[1] || "").toLowerCase();
    const name = normalizeAttributeName(rawName);
    if (!ALLOWED_ATTRIBUTES.has(name)) {
      continue;
    }

    if (BOOLEAN_ATTRIBUTES.has(rawName)) {
      parsed[name] = true;
      continue;
    }

    const value = match[2] ?? match[3] ?? match[4] ?? "";
    parsed[name] = value;
  }

  return parsed;
};

export const parseSiteHeadScripts = (snippet) => {
  const source = String(snippet || "");
  const blocks = [];

  if (!/<script\b/i.test(source)) {
    const inlineCode = source.trim();
    if (inlineCode) {
      blocks.push({
        key: "site-head-inline-0",
        attrs: {},
        inlineCode
      });
    }
    return blocks;
  }

  let match;
  let index = 0;
  while ((match = SCRIPT_TAG_REGEX.exec(source)) !== null) {
    const attrs = parseScriptAttributes(match[1] || "");
    const inlineCode = String(match[2] || "").trim();
    const hasSrc = Boolean(attrs.src);

    if (!hasSrc && !inlineCode) {
      continue;
    }

    blocks.push({
      key: `site-head-script-${index}`,
      attrs: { id: attrs.id || `site-head-script-${index}`, ...attrs },
      inlineCode: hasSrc ? "" : inlineCode
    });
    index += 1;
  }

  return blocks;
};
