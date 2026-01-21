import ArticlesList from "../../components/articles/ArticlesList";
import { supabaseServer } from "../../lib/supabaseServer";

export const revalidate = 60;

const loadArticles = async () => {
  if (!supabaseServer) {
    return [];
  }
  const { data } = await supabaseServer
    .from("articles")
    .select("id, slug, title, summary, hero_image, category, category_color, categories, category_colors, date")
    .eq("status", "published")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  return data || [];
};

export default async function ArticlesPage() {
  const articles = await loadArticles();

  return (
    <section className="ds-section">
      <div className="ds-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="ds-eyebrow text-sm">บทความทั้งหมด</p>
            <h1 className="ds-title text-4xl lg:text-5xl mt-2">แรงบันดาลใจแต่งบ้าน</h1>
            <p className="ds-muted mt-3 max-w-2xl">
              รวมบทความและเคล็ดลับสำหรับคนรักบ้าน อัปเดตจากทีม Thai Haven Service
            </p>
          </div>
        </div>
        <ArticlesList articles={articles} />
      </div>
    </section>
  );
}
