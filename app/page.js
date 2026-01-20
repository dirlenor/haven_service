import ArticlesSection from "../components/sections/ArticlesSection";
import FacebookSection from "../components/sections/FacebookSection";
import HeroSection from "../components/sections/HeroSection";
import PartnersSection from "../components/sections/PartnersSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import ProcessSection from "../components/sections/ProcessSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseSection from "../components/sections/WhyChooseSection";
import { readHtmlPageBody, replaceSectionById } from "../lib/html";
import { supabaseServer } from "../lib/supabaseServer";

const pageData = readHtmlPageBody("index.html");

export const metadata = {
  title: pageData.title
};

const loadCmsData = async () => {
  if (!supabaseServer) {
    return { services: [], articles: [] };
  }
  const [{ data: services }, { data: articles }] = await Promise.all([
    supabaseServer
      .from("services")
      .select("id, slug, title, summary, hero_image")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabaseServer
      .from("articles")
      .select("id, slug, title, summary, hero_image, category, category_color, date")
      .eq("status", "published")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false })
  ]);

  return {
    services: services || [],
    articles: articles || []
  };
};

export default async function HomePage() {
  const cmsData = await loadCmsData();
  const markers = {
    hero: "__HERO_SECTION__",
    services: "__SERVICES_SECTION__",
    whyChoose: "__WHY_CHOOSE_SECTION__",
    process: "__PROCESS_SECTION__",
    portfolio: "__PORTFOLIO_SECTION__",
    articles: "__ARTICLES_SECTION__",
    facebook: "__FACEBOOK_SECTION__",
    partners: "__PARTNERS_SECTION__"
  };
  const containerMarkers = {
    start: "<!-- HOME_CONTAINER_START -->",
    end: "<!-- HOME_CONTAINER_END -->"
  };

  const mainMatch = pageData.body.match(/<main([^>]*)>([\s\S]*?)<\/main>/i);
  const mainAttrs = mainMatch ? mainMatch[1] || "" : "";
  const mainClassMatch = mainAttrs.match(/class=("|')([^"']+)\1/i);
  const mainClassName = mainClassMatch ? mainClassMatch[2] : "";

  const beforeMain = mainMatch ? pageData.body.slice(0, mainMatch.index) : "";
  const afterMain = mainMatch
    ? pageData.body.slice(mainMatch.index + mainMatch[0].length)
    : "";

  let mainContent = mainMatch ? mainMatch[2] || "" : pageData.body;
  mainContent = replaceSectionById(mainContent, "hero-section", markers.hero);
  mainContent = replaceSectionById(mainContent, "services-section", markers.services);
  mainContent = replaceSectionById(mainContent, "why-choose-section", markers.whyChoose);
  mainContent = replaceSectionById(mainContent, "process-section", markers.process);
  mainContent = replaceSectionById(mainContent, "portfolio", markers.portfolio);
  mainContent = replaceSectionById(mainContent, "articles-section", markers.articles);
  mainContent = replaceSectionById(mainContent, "facebook-section", markers.facebook);
  mainContent = replaceSectionById(mainContent, "partners-section", markers.partners);

  const postMain = replaceSectionById(afterMain, "site-footer", "");

  const [mainBeforeContainer, containerBlockRaw, mainAfterContainer] =
    mainContent.includes(containerMarkers.start) && mainContent.includes(containerMarkers.end)
      ? (() => {
          const parts = mainContent.split(containerMarkers.start);
          const before = parts[0] || "";
          const remainder = parts.slice(1).join(containerMarkers.start);
          const afterParts = remainder.split(containerMarkers.end);
          return [before, afterParts[0] || "", afterParts.slice(1).join(containerMarkers.end)];
        })()
      : [mainContent, "", ""];

  let containerClassName = "";
  let containerInner = "";

  if (containerBlockRaw) {
    const openTagEnd = containerBlockRaw.indexOf(">");
    const closeTagIndex = containerBlockRaw.lastIndexOf("</div>");
    if (openTagEnd !== -1 && closeTagIndex !== -1) {
      const openTag = containerBlockRaw.slice(0, openTagEnd + 1);
      const classMatch = openTag.match(/class=("|')([^"']+)\1/i);
      containerClassName = classMatch ? classMatch[2] : "";
      containerInner = containerBlockRaw.slice(openTagEnd + 1, closeTagIndex);
    } else {
      containerInner = containerBlockRaw;
    }
  }

  const containerTokens = containerInner
    ? containerInner
        .split(
          new RegExp(
            `(${[
              markers.services,
              markers.whyChoose,
              markers.process,
              markers.portfolio,
              markers.articles,
              markers.facebook,
              markers.partners
            ].join("|")})`
          )
        )
        .filter((token) => token.trim() !== "")
    : [];

  const mainTokens = mainBeforeContainer
    .split(new RegExp(`(${[markers.hero].join("|")})`))
    .filter((token) => token.trim() !== "");

  return (
    <>
      {beforeMain ? (
        <div
          className="contents"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: beforeMain }}
        />
      ) : null}
      {mainMatch ? (
        <main className={mainClassName}>
          {mainTokens.map((token, index) => {
            if (token === markers.hero) {
              return <HeroSection key={`hero-${index}`} />;
            }

            return (
              <div
                key={`legacy-${index}`}
                className="contents"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: token }}
              />
            );
          })}
          {containerBlockRaw ? (
            <div className={containerClassName}>
              {containerTokens.map((token, index) => {
                if (token === markers.services) {
                  return (
                    <ServicesSection
                      key={`services-${index}`}
                      services={cmsData.services}
                    />
                  );
                }
                if (token === markers.whyChoose) {
                  return <WhyChooseSection key={`why-choose-${index}`} />;
                }
                if (token === markers.process) {
                  return <ProcessSection key={`process-${index}`} />;
                }
                if (token === markers.portfolio) {
                  return <PortfolioSection key={`portfolio-${index}`} />;
                }
                if (token === markers.articles) {
                  return (
                    <ArticlesSection
                      key={`articles-${index}`}
                      articles={cmsData.articles}
                    />
                  );
                }
                if (token === markers.facebook) {
                  return <FacebookSection key={`facebook-${index}`} />;
                }
                if (token === markers.partners) {
                  return <PartnersSection key={`partners-${index}`} />;
                }

                return (
                  <div
                    key={`container-legacy-${index}`}
                    className="contents"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: token }}
                  />
                );
              })}
            </div>
          ) : null}
          {mainAfterContainer ? (
            <div
              className="contents"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: mainAfterContainer }}
            />
          ) : null}
        </main>
      ) : (
        <div
          className="contents"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: pageData.body }}
        />
      )}
      {postMain ? (
        <div
          className="contents"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: postMain }}
        />
      ) : null}
    </>
  );
}
