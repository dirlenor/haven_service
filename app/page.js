import ArticlesSection from "../components/sections/ArticlesSection";
import FacebookSection from "../components/sections/FacebookSection";
import HeroSection from "../components/sections/HeroSection";
import PartnersSection from "../components/sections/PartnersSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import ProcessSection from "../components/sections/ProcessSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseSection from "../components/sections/WhyChooseSection";
import { parseServiceContent } from "../lib/serviceContent";
import { supabaseServer } from "../lib/supabaseServer";

export const metadata = {
  title: "Havenworks - หน้าหลัก"
};

const loadCmsData = async () => {
  if (!supabaseServer) {
    return { services: [], articles: [] };
  }
  const [{ data: services }, { data: articles }] = await Promise.all([
    supabaseServer
      .from("services")
      .select("id, slug, title, summary, hero_image, content")
      .in("status", ["published", "Published"])
      .order("created_at", { ascending: false }),
    supabaseServer
      .from("articles")
      .select("id, slug, title, summary, hero_image, category, category_color, categories, category_colors, date")
      .eq("status", "published")
      .order("created_at", { ascending: false })
  ]);

  const normalizedServices = (services || []).map((service) => ({
    ...service,
    summary:
      service.summary ||
      parseServiceContent(service.content || "")?.hero?.subtitle ||
      ""
  }));

  return {
    services: normalizedServices,
    articles: articles || []
  };
};

export default async function HomePage() {
  const cmsData = await loadCmsData();

  return (
    <main className="w-full pt-0">
      <HeroSection />
      <div className="max-w-[1280px] mx-auto">
        <ServicesSection services={cmsData.services} />
        <WhyChooseSection />
        <ProcessSection />
        <PortfolioSection />
        <ArticlesSection articles={cmsData.articles} />
        <FacebookSection />
        <PartnersSection />
      </div>
    </main>
  );
}
