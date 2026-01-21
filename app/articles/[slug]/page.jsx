import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";

export const revalidate = 60;

const loadArticle = async (slug) => {
  if (!supabaseServer) {
    return null;
  }
  const decoded = decodeURIComponent(slug);
  const { data: bySlug } = await supabaseServer
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("slug", decoded)
    .maybeSingle();
  if (bySlug) {
    return bySlug;
  }
  const { data: byId } = await supabaseServer
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("id", decoded)
    .maybeSingle();
  return byId || null;
};

const collectCategoryTags = (article) => {
  if (!article) {
    return [];
  }
  if (Array.isArray(article.categories) && article.categories.length) {
    return article.categories;
  }
  if (article.category) {
    return [article.category];
  }
  return [];
};

const loadRelatedArticles = async (article, limit = 3) => {
  if (!supabaseServer || !article) {
    return [];
  }
  const categories = collectCategoryTags(article);
  const query = supabaseServer
    .from("articles")
    .select("id, slug, title, summary, hero_image, date")
    .eq("status", "published")
    .neq("id", article.id)
    .order("date", { ascending: false })
    .limit(limit);

  if (categories.length) {
    query.overlaps("categories", categories);
  }

  const { data } = await query;
  return data ?? [];
};

export const generateMetadata = async ({ params }) => {
  const article = await loadArticle(params.slug);
  if (!article) {
    return { title: "Thai Haven Service" };
  }
  return { title: article.title || "Thai Haven Service" };
};

export default async function ArticleDetailPage({ params }) {
  const article = await loadArticle(params.slug);
  if (!article) {
    notFound();
  }
  const fallbackBadgeColor = "#d46211";
  const categories = Array.isArray(article.categories) && article.categories.length
    ? article.categories
    : article.category
    ? [article.category]
    : [];
  const colors = Array.isArray(article.category_colors) && article.category_colors.length
    ? article.category_colors
    : article.categoryColor
    ? [article.categoryColor]
    : article.category_color
    ? [article.category_color]
    : [];
  const relatedArticles = await loadRelatedArticles(article);

  return (
    <section className="ds-section">
      <div className="ds-container">
        <div className="mb-10 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {(categories.length ? categories : ["บทความ"]).slice(0, 3).map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="inline-flex text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: colors[index] || fallbackBadgeColor }}
              >
                {label}
              </span>
            ))}
          </div>
          <h1 className="ds-title text-4xl lg:text-5xl mt-4">{article.title}</h1>
          {article.summary ? (
            <p className="ds-muted text-lg mt-4">{article.summary}</p>
          ) : null}
          <div className="text-xs text-gray-500 mt-4 flex flex-wrap items-center gap-3">
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
        </div>
        {article.hero_image ? (
          <div className="rounded-3xl overflow-hidden border border-gray-100 mb-10">
            <img
              src={article.hero_image}
              alt={article.title || "บทความ"}
              className="w-full h-80 object-cover"
            />
          </div>
        ) : null}
        <div
          className="cms-content max-w-none text-[#4c3f35]"
          dangerouslySetInnerHTML={{ __html: article.content_html || "" }}
        />
        {(article.cta_title || article.cta_body) ? (
          <div className="mt-12 bg-[#d46211]/10 p-6 rounded-2xl border border-[#d46211]/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#181411]">
                {article.cta_title || "สนใจปรับโฉมบ้านกับเรา?"}
              </h3>
              {article.cta_body ? (
                <p className="text-sm text-[#897261] mt-1">{article.cta_body}</p>
              ) : null}
            </div>
            {article.cta_button_label ? (
              <a
                href={article.cta_button_href || "/contact"}
                className="btn btn-primary px-5 py-2 text-sm w-fit"
              >
                {article.cta_button_label}
              </a>
            ) : null}
          </div>
        ) : null}
        {relatedArticles.length ? (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#181411] mb-6">
              บทความที่เกี่ยวข้อง
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.slug || related.id}`}
                  className="group block rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition hover:shadow-lg"
                >
                  {related.hero_image ? (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={related.hero_image}
                        alt={related.title || "บทความ"}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-40 w-full bg-gray-100" />
                  )}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      {related.date ? new Date(related.date).toLocaleDateString("th-TH") : ""}
                    </p>
                    <h3 className="text-lg font-semibold text-[#181411] mb-2">
                      {related.title}
                    </h3>
                    {related.summary ? (
                      <p className="text-sm text-[#4c3f35] line-clamp-3">
                        {related.summary}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
