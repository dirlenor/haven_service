"use client";

import { normalizeServiceContent } from "../../lib/serviceContent";

const renderIcon = (name) => (
  <span className="material-symbols-outlined">{name || "check_circle"}</span>
);

export default function ServiceTemplate({ service, content }) {
  const normalized = normalizeServiceContent(content);
  const serviceLabel = normalized.serviceLabel || service?.title || "";
  const heroTitle = normalized.hero.title || (serviceLabel ? `บริการติดตั้ง${serviceLabel}` : service?.title);
  const heroSubtitle = normalized.hero.subtitle || service?.summary || "";
  const heroImage = normalized.hero.image.url || service?.hero_image || service?.heroImage || "";
  const heroAlt = normalized.hero.image.alt || service?.title || "บริการ";

  const introTitle = normalized.intro.title || serviceLabel;
  const typesEyebrow = normalized.types.eyebrow || (serviceLabel ? `ประเภทของ${serviceLabel}` : "");
  const typesTitle =
    normalized.types.title ||
    (serviceLabel ? `เลือก${serviceLabel}ที่ตอบโจทย์พื้นที่ของคุณ` : "");
  const specsTitle =
    normalized.specs.title ||
    (serviceLabel ? `วัสดุ สี และขนาด เพื่อให้${serviceLabel}เข้ากับบ้านของคุณ` : "");
  const galleryTitle =
    normalized.gallery.title || (serviceLabel ? `ภาพตัวอย่าง${serviceLabel}` : "");
  const faqTitle =
    normalized.faq.title || (serviceLabel ? `คำถามที่พบบ่อยเกี่ยวกับ${serviceLabel}` : "");
  const staticArticles = {
    eyebrow: "บทความที่เกี่ยวข้อง",
    title: "แรงบันดาลใจและเคล็ดลับล่าสุด",
    subtitle: serviceLabel
      ? `รวมบทความด้านการออกแบบ วัสดุ และการดูแล${serviceLabel}`
      : "รวมบทความด้านการออกแบบ วัสดุ และการดูแลเพื่อให้ทุกโครงการของคุณเนี้ยบตั้งแต่เริ่มต้น"
  };

  const hasIntro =
    introTitle || normalized.intro.items.length || normalized.intro.image.url;
  const hasTypes = normalized.types.items.length;
  const hasSpecs =
    normalized.specs.title ||
    normalized.specs.eyebrow ||
    normalized.specs.materials.length ||
    normalized.specs.colors.length;
  const hasGallery = normalized.gallery.images.length;
  const hasArticles = normalized.articles.items.length;
  const hasFaq = normalized.faq.items.length;

  const staticProcess = {
    eyebrow: "ขั้นตอนการทำงาน",
    title: "กระบวนการทำงานของเรา",
    subtitle:
      "ทุกขั้นตอนมุ่งเน้นความละเอียด นำเสนอข้อมูลก่อนตัดสินใจ และติดตั้งโดยทีมงานมืออาชีพ",
    steps: [
      {
        number: "01",
        icon: "chat_bubble",
        title: "ปรึกษาและประเมินงาน",
        body: "พูดคุยกับดีไซเนอร์เพื่อสรุปความต้องการและงบประมาณพร้อมแนวทางที่เหมาะสม"
      },
      {
        number: "02",
        icon: "straighten",
        title: "วัดพื้นที่จริง",
        body: "เข้าวัดพื้นที่หน้างานด้วยเครื่องมือเลเซอร์ เพื่อความแม่นยำระดับ 100%"
      },
      {
        number: "03",
        icon: "palette",
        title: "เลือกวัสดุและสรุปแบบ",
        body: "ชมตัวอย่างวัสดุจริงหลายเกรด พร้อมนำเสนอแบบ 3D Final ก่อนลงมือผลิต"
      },
      {
        number: "04",
        icon: "home_work",
        title: "ติดตั้งและส่งมอบงาน",
        body: "ช่างมืออาชีพติดตั้งอย่างรวดเร็ว พร้อมตรวจสอบคุณภาพก่อนส่งมอบบ้านในฝันให้กับคุณ"
      }
    ]
  };

  const staticCta = {
    eyebrow: "สนใจบริการ",
    title: "สนใจบริการหรือปรึกษาเราได้ทุกเวลา",
    body: "ทีมงาน Thai Haven Service พร้อมให้คำปรึกษา ออกแบบ และติดตั้งผลงานที่ตอบโจทย์พื้นที่ของคุณทุกโครงการ",
    button: {
      label: "ติดต่อเราได้ทันที",
      href: "https://lin.ee/BCoNWSL"
    }
  };

  const galleryImages = normalized.gallery.images;
  const carouselImages = hasGallery ? [...galleryImages, ...galleryImages] : [];
  const slideCount = galleryImages.length || 1;
  const slideWidth = "clamp(220px, 26vw, 320px)";
  const slideGap = "24px";
  const slideDuration = "90s";
  const specsMaterials = normalized.specs.materials.length
    ? normalized.specs.materials
    : ["ผ้า", "PVC"];
  const specsColors = normalized.specs.colors.length
    ? normalized.specs.colors
    : ["ขาว", "เทา"];
  const formatSpecsList = (items) => items.filter(Boolean).join(" / ");

  return (
    <div className="legacy-page min-h-screen w-full bg-background-light  font-display text-[#181411] ">
      <main className="w-full">
        <section className="relative w-full py-8 lg:py-12 bg-white">
          <div className="w-full">
            <div className="relative min-h-[350px] lg:min-h-[350px] flex items-end">
              {heroImage ? (
                <img
                  alt={heroAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={heroImage}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10 p-8 lg:p-12 w-full max-w-4xl">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                  {heroTitle || service?.title}
                </h1>
                {heroSubtitle ? (
                  <p className="text-white/90 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
                    {heroSubtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {hasIntro ? (
          <section className="py-12 lg:py-20 bg-white ">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  {introTitle ? (
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">{introTitle}</h2>
                  ) : null}
                  <div className="space-y-6 text-sm text-[#4c3f35] ">
                    {normalized.intro.items.map((item, index) => (
                      <div key={`${item.heading}-${index}`}>
                        {item.heading ? (
                          <h4 className="text-lg font-semibold mb-2 text-[#d32f2f]">
                            {item.heading}
                          </h4>
                        ) : null}
                        {item.body ? <p className="text-[#181411]">{item.body}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
                {normalized.intro.image.url ? (
                  <div>
                    <img
                      alt={normalized.intro.image.alt || heroAlt}
                      className="w-full max-h-[500px] rounded-[32px] object-cover shadow-xl"
                      src={normalized.intro.image.url}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {hasTypes ? (
          <section className="py-12 lg:py-20" style={{ backgroundColor: "var(--ds-color-cream)" }}>
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                {typesEyebrow ? (
                  <p className="text-xs uppercase tracking-[0.4em] text-[#897261]">
                    {typesEyebrow}
                  </p>
                ) : null}
                {typesTitle ? (
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c] ">
                    {typesTitle}
                  </h2>
                ) : null}
              </div>
              <div className="grid gap-8">
                {normalized.types.items.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="bg-white rounded-3xl overflow-hidden border border-[#f0ebe4] md:min-h-[280px] md:max-h-[365px]"
                  >
                    <div className="flex flex-col md:flex-row md:items-stretch h-full">
                      {item.image.url ? (
                        <div className="md:w-[30%] h-56 md:h-auto">
                          <img
                            src={item.image.url}
                            alt={item.image.alt || item.title || heroAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="md:w-[70%] p-6 md:p-8 flex flex-col gap-4 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-[#d32f2f] text-2xl font-black leading-none">•</span>
                          <h3 className="text-2xl font-bold text-[#1a1a1a]">
                            {item.title || serviceLabel}
                          </h3>
                        </div>
                        {item.description ? (
                          <p className="text-[#4c3f35] leading-relaxed">{item.description}</p>
                        ) : null}
                        {item.fitList.length ? (
                          <div className="space-y-2 text-sm text-[#4c3f35]">
                            <p className="font-semibold text-[#d32f2f]">เหมาะกับ</p>
                            <ul className="list-disc list-inside space-y-1">
                              {item.fitList
                                .map((line) => line.trim())
                                .filter(Boolean)
                                .map((line, listIndex) => (
                                  <li key={`${line}-${listIndex}`}>{line}</li>
                                ))}
                            </ul>
                          </div>
                        ) : null}
                        {item.highlightList.length ? (
                          <div className="space-y-2 text-sm text-[#4c3f35]">
                            <p className="font-semibold text-[#d32f2f]">จุดเด่น</p>
                            <ul className="list-disc list-inside space-y-1">
                              {item.highlightList
                                .map((line) => line.trim())
                                .filter(Boolean)
                                .map((line, listIndex) => (
                                  <li key={`${line}-${listIndex}`}>{line}</li>
                                ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {hasSpecs ? (
          <section className="py-12 lg:py-20 bg-white">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                {normalized.specs.eyebrow ? (
                  <p className="text-xs uppercase tracking-[0.4em] text-[#897261]">
                    {normalized.specs.eyebrow}
                  </p>
                ) : null}
                {specsTitle ? (
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c] ">
                    {specsTitle}
                  </h2>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 text-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#d32f2f]">วัสดุ :</span>
                  <span className="text-[#4c3f35]">{formatSpecsList(specsMaterials)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#d32f2f]">สี :</span>
                  <span className="text-[#4c3f35]">{formatSpecsList(specsColors)}</span>
                </div>
              </div>
              {normalized.specs.image.url ? (
                <div className="mt-8">
                  <img
                    src={normalized.specs.image.url}
                    alt={normalized.specs.image.alt || specsTitle || heroAlt}
                    className="w-full h-[260px] sm:h-[300px] lg:h-[350px] object-cover rounded-[32px]"
                  />
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {hasFaq ? (
          <section className="py-16 bg-white">
            <div className="mx-auto w-full max-w-6xl px-6 space-y-8">
              <div className="text-center space-y-3">
                {normalized.faq.eyebrow ? (
                  <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
                    {normalized.faq.eyebrow}
                  </p>
                ) : null}
                {faqTitle ? (
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">{faqTitle}</h2>
                ) : null}
              </div>
              <div className="ds-section max-w-5xl mx-auto">
                <div className="space-y-4">
                  {normalized.faq.items.map((item, index) => (
                    <details
                      key={`${item.question}-${index}`}
                      className="group bg-[#f8f7f6] rounded-3xl border border-[#ebe5dc] p-5 shadow-sm"
                      open={index === 0}
                    >
                      <summary className="cursor-pointer text-lg font-semibold text-[#18120c] list-none flex items-center justify-between gap-4">
                        <span>{item.question}</span>
                        <span className="material-symbols-outlined text-xl transition-transform duration-300 group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      {item.answer ? (
                        <p className="mt-3 text-sm text-[#4c3f35] leading-relaxed">{item.answer}</p>
                      ) : null}
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {hasGallery ? (
          <section className="py-16 bg-white">
            <div className="mx-auto w-full max-w-6xl px-6 space-y-6">
              <div className="text-center space-y-3">
                {normalized.gallery.eyebrow ? (
                  <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
                    {normalized.gallery.eyebrow}
                  </p>
                ) : null}
                {galleryTitle ? (
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">
                    {galleryTitle}
                  </h2>
                ) : null}
                {normalized.gallery.subtitle ? (
                  <p className="text-sm text-[#4c3f35]">{normalized.gallery.subtitle}</p>
                ) : null}
              </div>
            </div>
            <div className="relative overflow-hidden w-full mt-16">
              <div
                className="flex carousel-track"
                style={{
                  "--slide-width": slideWidth,
                  "--slide-gap": slideGap,
                  "--slide-count": slideCount,
                  "--animation-duration": slideDuration
                }}
              >
                {carouselImages.map((image, index) => (
                  <figure
                    key={`${image.url}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: slideWidth, minWidth: slideWidth, maxWidth: slideWidth }}
                  >
                    <div className="bg-white rounded-3xl border border-[#ebe5dc] shadow-sm">
                      <img
                        src={image.url}
                        alt={image.alt || `ภาพ${serviceLabel} ${index + 1}`}
                        className="w-full h-[250px] object-cover rounded-3xl"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="process-section" data-nav-label="ขั้นตอนการทำงาน" className="ds-section">
          <div className="ds-container">
            <div id="process-header" className="ds-stack gap-8 mb-16 text-center">
              <h2 className="ds-title text-3xl lg:text-4xl">{staticProcess.title}</h2>
              <p className="ds-body text-lg max-w-2xl mx-auto">
                {staticProcess.subtitle}
              </p>
            </div>

            <div
              id="process-cards"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto"
            >
              {staticProcess.steps.map((step, index) => {
                const isHighlighted = index === 1 || index === 3;
                return (
                  <div
                    key={`${step.title}-${index}`}
                    className={`rounded-[2rem] p-5 shadow-lg flex flex-col gap-5${
                      isHighlighted ? " bg-[#d32f2f0a]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center font-black text-4xl flex-shrink-0">
                      {step.number || String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: "#d32f2f" }}>
                          {step.icon || "check_circle"}
                        </span>
                        {step.title}
                      </h3>
                      <p className="ds-muted text-sm line-clamp-2">
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {hasArticles ? (
          <section className="py-16 bg-[#f8f7f6]">
            <div className="mx-auto w-full max-w-6xl px-6 space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
                  {staticArticles.eyebrow}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">
                  {staticArticles.title}
                </h2>
                <p className="text-sm text-[#4c3f35]">{staticArticles.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {normalized.articles.items.map((item, index) => {
                  const CardTag = item.href ? "a" : "div";
                  const cardProps = item.href ? { href: item.href } : {};
                  return (
                    <CardTag
                      key={`${item.title}-${index}`}
                      {...cardProps}
                      className="group bg-white rounded-3xl border border-[#ebe5dc] overflow-hidden shadow-sm flex flex-col transition hover:shadow-lg"
                    >
                      {item.image.url ? (
                        <img
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : null}
                      <div className="p-6 space-y-3 flex-1 flex flex-col">
                        {item.categoryLabel ? (
                          <p className="text-xs uppercase tracking-[0.5em] text-[#d32f2f]">
                            {item.categoryLabel}
                          </p>
                        ) : null}
                        <h3 className="text-xl font-bold text-[#18120c] flex-1">{item.title}</h3>
                        {item.href ? (
                          <span className="text-sm font-semibold text-[#d32f2f] group-hover:underline">
                            อ่านบทความ
                          </span>
                        ) : null}
                      </div>
                    </CardTag>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-16" style={{ backgroundColor: "var(--ds-color-cream)" }}>
          <div className="mx-auto w-full max-w-3xl px-6 text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
              {staticCta.eyebrow}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">
              {staticCta.title}
            </h2>
            <p className="text-sm text-[#4c3f35] leading-relaxed">{staticCta.body}</p>
            <a
              href={staticCta.button.href}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#00c300] text-white text-base font-bold hover:bg-[#00a500] transition"
            >
              <span className="text-lg">LINE</span>
              <span>{staticCta.button.label}</span>
            </a>
          </div>
        </section>
      </main>
      <style>{`
        .carousel-track {
          animation: carousel-scroll var(--animation-duration) linear infinite;
          gap: var(--slide-gap);
        }

        .carousel-track figure {
          flex-shrink: 0;
        }

        @keyframes carousel-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * (var(--slide-width) + var(--slide-gap)) * var(--slide-count)));
          }
        }
      `}</style>
    </div>
  );
}
