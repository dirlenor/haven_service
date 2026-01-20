import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const LEGACY_HTML_DIR = path.join(ROOT_DIR, "legacy", "html");

const isExternalHref = (href) =>
  href.startsWith("http") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#");

const normalizeInternalHref = (href) => {
  if (isExternalHref(href)) {
    return href;
  }

  const [pathPart, hash] = href.split("#");
  if (!pathPart.endsWith(".html")) {
    return href;
  }

  const slug = pathPart.replace(/\.html$/i, "");
  const base = slug === "index" ? "/" : `/${slug}`;
  return hash ? `${base}#${hash}` : base;
};

const rewriteInternalLinks = (html) =>
  html.replace(/href=("|')([^"']+)(\1)/gi, (match, quote, href) => {
    const normalized = normalizeInternalHref(href);
    return `href=${quote}${normalized}${quote}`;
  });

const rewriteAssetLinks = (html) => {
  let updated = html.replace(
    /(href|src)=("|')assets\//gi,
    "$1=$2/assets/"
  );

  updated = updated.replace(/url\(("|')?assets\//gi, "url($1/assets/");

  return updated;
};

const stripBodyScripts = (html) =>
  html.replace(/<script[^>]*src=("|')assets\/js\/[^"']+(\1)[^>]*>\s*<\/script>/gi, "");

const extractBodyClass = (bodyAttrs) => {
  const classMatch = bodyAttrs.match(/class=("|')([^"']+)(\1)/i);
  return classMatch ? classMatch[2] : "";
};

const readHtmlPageSource = (fileName) => {
  const filePath = path.join(LEGACY_HTML_DIR, fileName);
  const html = fs.readFileSync(filePath, "utf8");

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "Thai Haven Service";

  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    throw new Error(`Missing body tag in ${fileName}`);
  }

  const bodyAttrs = bodyMatch[1] || "";
  const bodyContentRaw = bodyMatch[2] || "";
  const bodyClass = extractBodyClass(bodyAttrs);

  let bodyContent = stripBodyScripts(bodyContentRaw);
  bodyContent = rewriteAssetLinks(bodyContent);
  bodyContent = rewriteInternalLinks(bodyContent);

  return { title, body: bodyContent, bodyClass };
};

export const getHtmlPageSlugs = () => {
  const files = fs.readdirSync(LEGACY_HTML_DIR);
  return files
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replace(/\.html$/i, ""))
    .filter((slug) => slug !== "index");
};

export const readHtmlPage = (fileName) => {
  const { title, body, bodyClass } = readHtmlPageSource(fileName);
  const wrappedBody = bodyClass ? `<div class="${bodyClass}">${body}</div>` : body;
  return { title, body: wrappedBody };
};

export const readHtmlPageBody = (fileName) => readHtmlPageSource(fileName);

export const replaceSectionById = (html, id, marker) => {
  const sectionPattern = new RegExp(
    `<section[^>]*id=["']${id}["'][\\s\\S]*?<\\/section>`,
    "i"
  );
  const footerPattern = new RegExp(
    `<footer[^>]*id=["']${id}["'][\\s\\S]*?<\\/footer>`,
    "i"
  );

  let updated = html.replace(sectionPattern, marker);
  updated = updated.replace(footerPattern, marker);
  return updated;
};
