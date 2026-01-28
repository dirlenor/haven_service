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
  const hasSpecs = normalized.specs.cards.length;
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
      href: "https://line.me/R/ti/p/%40tha"
    }
  };

  const galleryImages = normalized.gallery.images;
  const carouselImages = hasGallery ? [...galleryImages, ...galleryImages] : [];
  const slideCount = galleryImages.length || 1;
  const slideWidth = "100vw";
  const slideDuration = "90s";

  return (
    <div className="legacy-page min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-white">
      <main className="w-full">
        <section className="relative w-full py-8 lg:py-12 bg-white">
          <div className="w-full">
            <div className="relative min-h-[420px] lg:min-h-[520px] flex items-end">
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
          <section className="py-12 lg:py-20 bg-white dark:bg-background-dark">
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  {introTitle ? (
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">{introTitle}</h2>
                  ) : null}
                  <div className="space-y-6 text-sm text-[#4c3f35] dark:text-[#d8c5b7]">
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
                      className="w-full rounded-[32px] object-cover shadow-xl"
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
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c] dark:text-white">
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
                    <div className="md:flex md:items-stretch h-full">
                      {item.image.url ? (
                        <div className="md:w-[30%] h-full">
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
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c] dark:text-white">
                    {specsTitle}
                  </h2>
                ) : null}
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {normalized.specs.cards.map((card, cardIndex) => (
                  <article
                    key={`${card.title}-${cardIndex}`}
                    className="bg-white rounded-3xl border border-[#f0ebe4] p-8 text-[#4c3f35]"
                  >
                    <h3 className="text-xl font-bold mb-4 text-[#18120c]">{card.title}</h3>
                    <ul className="space-y-3 text-sm leading-relaxed">
                      {card.items.map((item, itemIndex) => (
                        <li key={`${item.text}-${itemIndex}`} className="flex items-start gap-3">
                          {item.image.url ? (
                            <img
                              src={item.image.url}
                              alt={item.image.alt || item.text}
                              className="w-12 h-12 rounded-xl object-cover border border-[#d32f2f]"
                            />
                          ) : (
                            <span className="text-[#d32f2f] mt-1">{renderIcon("check")}</span>
                          )}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
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
                    <img
                      src={image.url}
                      alt={image.alt || `ภาพ${serviceLabel} ${index + 1}`}
                      className="w-full h-[420px] object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-12" id="process-section" style={{ backgroundColor: "#ffffff" }}>
          <div className="mx-auto w-full max-w-6xl px-6 space-y-10 text-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
                {staticProcess.eyebrow}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">
                {staticProcess.title}
              </h2>
              <p className="text-sm text-[#4c3f35] max-w-3xl mx-auto">{staticProcess.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {staticProcess.steps.map((step, index) => (
                <article key={`${step.title}-${index}`} className="rounded-[2rem] p-5 shadow-lg">
                  <div className="flex items-center justify-center font-black text-4xl mb-4 text-[#18120c]">
                    {step.number || String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#18120c] flex items-center justify-center gap-2">
                    {renderIcon(step.icon)}
                    {step.title}
                  </h3>
                  <p className="text-[#4c3f35] text-sm">{step.body}</p>
                </article>
              ))}
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
                {normalized.articles.items.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="bg-white rounded-3xl border border-[#ebe5dc] overflow-hidden shadow-sm flex flex-col"
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
                        <a href={item.href} className="text-sm font-semibold text-[#d32f2f] hover:underline">
                          อ่านบทความ
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
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
                      className="bg-[#f8f7f6] rounded-3xl border border-[#ebe5dc] p-5 shadow-sm"
                      open={index === 0}
                    >
                      <summary className="cursor-pointer text-lg font-semibold text-[#18120c] list-none">
                        {item.question}
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
        }

        .carousel-track figure {
          flex-shrink: 0;
        }

        @keyframes carousel-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--slide-width) * var(--slide-count)));
          }
        }
      `}</style>
    </div>
  );
}
