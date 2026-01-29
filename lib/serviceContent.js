const ensureString = (value) => (typeof value === "string" ? value : "");
const ensureArray = (value) => (Array.isArray(value) ? value : []);

const normalizeImage = (input) => {
  if (!input || typeof input !== "object") {
    return { url: "", alt: "" };
  }
  const url = ensureString(input.url || input.imageUrl || input.src);
  const alt = ensureString(input.alt || input.imageAlt);
  return { url, alt };
};

const normalizeList = (value) => ensureArray(value).map((item) => ensureString(item));

const normalizeIntroItem = (item) => ({
  heading: ensureString(item?.heading),
  body: ensureString(item?.body)
});

const normalizeTypesItem = (item) => ({
  title: ensureString(item?.title),
  description: ensureString(item?.description),
  fitTitle: ensureString(item?.fitTitle),
  fitList: normalizeList(item?.fitList),
  highlightTitle: ensureString(item?.highlightTitle),
  highlightList: normalizeList(item?.highlightList),
  image: normalizeImage(item?.image || item)
});

const normalizeSpecsItem = (item) => ({
  text: ensureString(item?.text),
  image: normalizeImage(item?.image || item)
});

const normalizeSpecsCard = (card) => ({
  title: ensureString(card?.title),
  items: ensureArray(card?.items).map(normalizeSpecsItem)
});

const normalizeGalleryImage = (item) => ({
  url: ensureString(item?.url || item?.imageUrl || item?.src),
  alt: ensureString(item?.alt || item?.imageAlt)
});

const normalizeProcessStep = (item) => ({
  number: ensureString(item?.number || item?.stepNumber),
  icon: ensureString(item?.icon),
  title: ensureString(item?.title),
  body: ensureString(item?.body)
});

const normalizeArticleItem = (item) => ({
  id: ensureString(item?.id),
  image: normalizeImage(item?.image || item),
  categoryLabel: ensureString(item?.categoryLabel),
  title: ensureString(item?.title),
  href: ensureString(item?.href)
});

const normalizeFaqItem = (item) => ({
  question: ensureString(item?.question),
  answer: ensureString(item?.answer)
});

export const normalizeServiceContent = (raw = {}) => ({
  templateVersion: Number(raw?.templateVersion) || 1,
  serviceLabel: ensureString(raw?.serviceLabel),
  hero: {
    title: ensureString(raw?.hero?.title),
    subtitle: ensureString(raw?.hero?.subtitle),
    image: normalizeImage(raw?.hero?.image || raw?.hero)
  },
  intro: {
    title: ensureString(raw?.intro?.title),
    items: ensureArray(raw?.intro?.items).map(normalizeIntroItem),
    image: normalizeImage(raw?.intro?.image || raw?.intro)
  },
  types: {
    eyebrow: ensureString(raw?.types?.eyebrow),
    title: ensureString(raw?.types?.title),
    items: ensureArray(raw?.types?.items).map(normalizeTypesItem)
  },
  specs: {
    eyebrow: ensureString(raw?.specs?.eyebrow),
    title: ensureString(raw?.specs?.title),
    materials: normalizeList(raw?.specs?.materials),
    colors: normalizeList(raw?.specs?.colors),
    image: normalizeImage(raw?.specs?.image || raw?.specs?.hero || raw?.specs?.banner),
    cards: ensureArray(raw?.specs?.cards).map(normalizeSpecsCard)
  },
  gallery: {
    eyebrow: ensureString(raw?.gallery?.eyebrow),
    title: ensureString(raw?.gallery?.title),
    subtitle: ensureString(raw?.gallery?.subtitle),
    images: ensureArray(raw?.gallery?.images).map(normalizeGalleryImage)
  },
  process: {
    eyebrow: ensureString(raw?.process?.eyebrow),
    title: ensureString(raw?.process?.title),
    subtitle: ensureString(raw?.process?.subtitle),
    steps: ensureArray(raw?.process?.steps).map(normalizeProcessStep)
  },
  articles: {
    eyebrow: ensureString(raw?.articles?.eyebrow),
    title: ensureString(raw?.articles?.title),
    subtitle: ensureString(raw?.articles?.subtitle),
    items: ensureArray(raw?.articles?.items).map(normalizeArticleItem)
  },
  faq: {
    eyebrow: ensureString(raw?.faq?.eyebrow),
    title: ensureString(raw?.faq?.title),
    items: ensureArray(raw?.faq?.items).map(normalizeFaqItem)
  },
  cta: {
    eyebrow: ensureString(raw?.cta?.eyebrow),
    title: ensureString(raw?.cta?.title),
    body: ensureString(raw?.cta?.body),
    button: {
      label: ensureString(raw?.cta?.button?.label),
      href: ensureString(raw?.cta?.button?.href)
    }
  },
  ctaSecondary: {
    enabled: Boolean(raw?.ctaSecondary?.enabled),
    eyebrow: ensureString(raw?.ctaSecondary?.eyebrow),
    title: ensureString(raw?.ctaSecondary?.title),
    body: ensureString(raw?.ctaSecondary?.body),
    button: {
      label: ensureString(raw?.ctaSecondary?.button?.label),
      href: ensureString(raw?.ctaSecondary?.button?.href)
    }
  }
});

export const parseServiceContent = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed.startsWith("{")) {
    return null;
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const normalized = normalizeServiceContent(parsed);
    const hasStructuredContent =
      normalized.hero.title ||
      normalized.intro.title ||
      normalized.types.items.length ||
      normalized.specs.cards.length ||
      normalized.specs.materials.length ||
      normalized.specs.colors.length ||
      normalized.specs.image.url ||
      normalized.gallery.images.length ||
      normalized.process.steps.length ||
      normalized.faq.items.length ||
      normalized.cta.title;
    return hasStructuredContent ? normalized : null;
  } catch {
    return null;
  }
};

export const stringifyServiceContent = (content) =>
  JSON.stringify(content, null, 2);

export const buildServiceContentTemplate = ({
  serviceLabel = "",
  heroImageUrl = "",
  heroImageAlt = ""
} = {}) => ({
  templateVersion: 1,
  serviceLabel,
  hero: {
    title: serviceLabel ? `บริการติดตั้ง${serviceLabel}` : "",
    subtitle: "",
    image: {
      url: heroImageUrl,
      alt: heroImageAlt
    }
  },
  intro: {
    title: serviceLabel || "",
    items: [],
    image: {
      url: "",
      alt: ""
    }
  },
  types: {
    eyebrow: serviceLabel ? `ประเภทของ${serviceLabel}` : "",
    title: serviceLabel ? `เลือก${serviceLabel}ที่ตอบโจทย์พื้นที่ของคุณ` : "",
    items: []
  },
  specs: {
    eyebrow: "วัสดุ สี ขนาด",
    title: serviceLabel ? `วัสดุ สี และขนาด เพื่อให้${serviceLabel}เข้ากับบ้านของคุณ` : "",
    materials: [],
    colors: [],
    image: {
      url: "",
      alt: ""
    },
    cards: []
  },
  gallery: {
    eyebrow: "บริการภาพจริง",
    title: serviceLabel ? `ภาพตัวอย่าง${serviceLabel}` : "",
    subtitle: "เลือกชมภาพที่ไหลต่อเนื่อง พร้อมแสดงจำนวนภาพให้รับทราบ",
    images: []
  },
  process: {
    eyebrow: "ขั้นตอนการทำงาน",
    title: "กระบวนการทำงานของเรา",
    subtitle:
      "ทุกขั้นตอนมุ่งเน้นความละเอียด นำเสนอข้อมูลก่อนตัดสินใจ และติดตั้งโดยทีมงานมืออาชีพ",
    steps: []
  },
  articles: {
    eyebrow: "บทความที่เกี่ยวข้อง",
    title: "แรงบันดาลใจและเคล็ดลับล่าสุด",
    subtitle: serviceLabel ? `รวมบทความด้านการออกแบบ วัสดุ และการดูแล${serviceLabel}` : "",
    items: []
  },
  faq: {
    eyebrow: "FAQ",
    title: serviceLabel ? `คำถามที่พบบ่อยเกี่ยวกับ${serviceLabel}` : "",
    items: []
  },
  cta: {
    eyebrow: "สนใจบริการ",
    title: "สนใจบริการหรือปรึกษาเราได้ทุกเวลา",
    body: "ทีมงาน Thai Haven Service พร้อมให้คำปรึกษา ออกแบบ และติดตั้งผลงานที่ตอบโจทย์พื้นที่ของคุณทุกโครงการ",
    button: {
      label: "ติดต่อเราได้ทันที",
      href: "https://line.me/R/ti/p/%40tha"
    }
  },
  ctaSecondary: {
    enabled: false,
    eyebrow: "สนใจบริการ",
    title: "สนใจบริการหรือปรึกษาเราได้ทุกเวลา",
    body: "ทีมงาน Thai Haven Service พร้อมให้คำปรึกษา ออกแบบ และติดตั้งผลงานที่ตอบโจทย์พื้นที่ของคุณทุกโครงการ",
    button: {
      label: "ติดต่อเราได้ทันที",
      href: "https://line.me/R/ti/p/%40tha"
    }
  }
});
