import { supabaseServer } from "../../lib/supabaseServer";

export const revalidate = 60;

const loadArticles = async () => {
  if (!supabaseServer) {
    return [];
  }
  const { data } = await supabaseServer
    .from("articles")
    .select("id, slug, title, summary, hero_image, category, category_color, date")
    .eq("status", "published")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  return data || [];
};

export default async function ArticlesPage() {
  const articles = await loadArticles();
  const fallbackBadgeColor = "#d46211";

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
        {articles.length ? (
          <div className="ds-grid ds-grid-3">
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/articles/${article.slug || article.id}`}
                className="ds-card ds-card-hover group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    alt={article.title || "บทความ"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={
                      article.hero_image ||
                      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop"
                    }
                  />
                  <div
                    className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{ backgroundColor: article.category_color || fallbackBadgeColor }}
                  >
                    {article.category || "บทความ"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-3 flex flex-wrap items-center gap-2">
                    {article.date ? (
                      <>
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>{" "}
                        {article.date}
                      </>
                    ) : null}
                    {article.category ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">label</span>
                        {article.category}
                      </span>
                    ) : null}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors"
                    style={{ color: "var(--ds-color-text)" }}
                  >
                    {article.title || "บทความ"}
                  </h3>
                  <p className="ds-muted text-sm mb-6 line-clamp-2 leading-relaxed">
                    {article.summary || "อ่านบทความฉบับเต็มเพื่อรายละเอียดเพิ่มเติม"}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-bold hover:gap-2 transition-all"
                    style={{ color: "var(--ds-color-primary)" }}
                  >
                    อ่านเพิ่มเติม <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-sm text-[#897261]">ยังไม่มีบทความที่เผยแพร่</div>
        )}
      </div>
    </section>
  );
}
