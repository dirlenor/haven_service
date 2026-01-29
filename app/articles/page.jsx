import Link from "next/link";
import ArticlesList from "../../components/articles/ArticlesList";
import { supabaseServer } from "../../lib/supabaseServer";

export const revalidate = 60;

const ARTICLES_PER_PAGE = 9;

const loadCategoryOptions = async () => {
  if (!supabaseServer) {
    return [];
  }
  const [{ data: categories }, { data: legacyCategories }] = await Promise.all([
    supabaseServer
      .from("article_categories")
      .select("name, color")
      .order("name", { ascending: true }),
    supabaseServer
    .from("articles")
    .select("category, category_color, categories, category_colors")
    .order("category", { ascending: true })
    .limit(400)
  ]);
  const fallbackColor = "#d32f2f";
  const colorMap = new Map();
  (categories || []).forEach((category) => {
    const name = String(category?.name || "").trim();
    if (!name) {
      return;
    }
    colorMap.set(name, category.color || fallbackColor);
  });
  (legacyCategories || []).forEach((row) => {
    const singleCategory = String(row.category || "").trim();
    if (singleCategory) {
      if (!colorMap.has(singleCategory)) {
        colorMap.set(singleCategory, row.category_color || fallbackColor);
      }
    }
    const categories = Array.isArray(row.categories) ? row.categories : [];
    const colors = Array.isArray(row.category_colors) ? row.category_colors : [];
    categories.forEach((category, index) => {
      const name = String(category || "").trim();
      if (!name) {
        return;
      }
      if (!colorMap.has(name)) {
        colorMap.set(name, colors[index] || fallbackColor);
      }
    });
  });
  return Array.from(colorMap.entries())
    .map(([name, color]) => ({ name, color: color || fallbackColor }))
    .sort((a, b) => a.name.localeCompare(b.name, "th"));
};

const loadArticles = async (page = 1, categoryFilter) => {
  if (!supabaseServer) {
    return { articles: [], totalCount: 0 };
  }
  const pageNumber = Math.max(1, Math.floor(page));
  const offset = (pageNumber - 1) * ARTICLES_PER_PAGE;
  const query = supabaseServer
    .from("articles")
    .select("id, slug, title, summary, hero_image, category, category_color, categories, category_colors, date", { count: "exact" })
    .eq("status", "published")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + ARTICLES_PER_PAGE - 1);

  if (categoryFilter) {
    const escapePostgrestText = (value) =>
      value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const safeCategory = escapePostgrestText(categoryFilter.trim());
    const quotedCategory = `"${safeCategory}"`;
    const arrayLiteral = `{${quotedCategory}}`;
    query.or(`category.eq.${quotedCategory},categories.cs.${arrayLiteral}`);
  }

  const { data, count } = await query;
  const items = data || [];
  return {
    articles: items,
    totalCount: typeof count === "number" ? count : 0
  };
};

export default async function ArticlesPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const requestedPage = Number(resolvedParams?.page ?? 1);
  const page = Number.isFinite(requestedPage) && requestedPage >= 1
    ? Math.floor(requestedPage)
    : 1;
  const activeCategory = String(resolvedParams?.category ?? "").trim();
  const [{ articles, totalCount }, categoryOptions] = await Promise.all([
    loadArticles(page, activeCategory || undefined),
    loadCategoryOptions()
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / ARTICLES_PER_PAGE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, safePage - half);
  let endPage = Math.min(totalPages, safePage + half);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
    endPage = Math.min(totalPages, startPage + maxButtons - 1);
  }
  const buildArticlesHref = (targetPage, categoryOverride) => {
    const params = new URLSearchParams();
    params.set("page", targetPage);
    const categoryValue = categoryOverride ?? (activeCategory || "");
    if (categoryValue) {
      params.set("category", categoryValue);
    }
    const query = params.toString();
    return `/articles${query ? `?${query}` : ""}`;
  };
  const categoryFilters = [
    { title: "ทั้งหมด", value: "" },
    ...categoryOptions.map((option) => ({
      title: option.name,
      value: option.name,
      color: option.color || "#d32f2f"
    }))
  ];
  const activeFilterTitle =
    categoryFilters.find((filter) => filter.value === activeCategory)?.title ||
    "ทั้งหมด";
  return (
    <section className="ds-section">
      <div className="ds-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4 md:mb-10">
          <div>
            <p className="ds-eyebrow text-sm">บทความทั้งหมด</p>
            <h1 className="ds-title text-4xl lg:text-5xl mt-2">แรงบันดาลใจแต่งบ้าน</h1>
            <p className="ds-muted mt-3 max-w-2xl">
              รวมบทความและเคล็ดลับสำหรับคนรักบ้าน อัปเดตจากทีม Thai Haven Service
            </p>
          </div>
        </div>
        {categoryFilters.length ? (
          <>
            <div className="mb-6 md:hidden">
              <details className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#181411] cursor-pointer">
                  หมวดหมู่: {activeFilterTitle}
                  <span className="material-symbols-outlined text-base transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="flex flex-col border-t border-gray-100">
                  {categoryFilters.map((filter) => {
                    const isActive = filter.value === activeCategory;
                    return (
                      <Link
                        key={`${filter.value || "all"}-filter-mobile`}
                        href={buildArticlesHref(1, filter.value)}
                        className={`px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? "text-white bg-[#d32f2f]"
                            : "text-[#181411] hover:bg-[#d32f2f] hover:text-white"
                        }`}
                        style={isActive && filter.color ? { backgroundColor: filter.color } : undefined}
                      >
                        {filter.title}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </div>
            <div className="mb-8 hidden md:flex flex-wrap gap-3">
              {categoryFilters.map((filter) => {
                const isActive = filter.value === activeCategory;
                return (
                  <Link
                    key={`${filter.value || "all"}-filter`}
                    href={buildArticlesHref(1, filter.value)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-[#d32f2f] bg-[#d32f2f] text-white"
                        : "border-gray-200 text-[#181411] hover:border-[#d32f2f] hover:text-[#d32f2f]"
                    }`}
                    style={isActive && filter.color ? { backgroundColor: filter.color, borderColor: filter.color } : undefined}
                  >
                    {filter.title}
                  </Link>
                );
              })}
            </div>
          </>
        ) : null}
        <ArticlesList articles={articles} />
        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>หน้า {safePage} / {totalPages}</span>
            <div className="flex flex-wrap items-center gap-2">
              {startPage > 1 && (
                <>
                  <Link
                    href={buildArticlesHref(1)}
                    className="inline-flex items-center justify-center rounded-full border border-[#d32f2f] px-4 py-2 font-semibold text-[#d32f2f] transition hover:bg-[#d32f2f] hover:text-white"
                  >
                    1
                  </Link>
                  {startPage > 2 && <span className="text-[#897261]">…</span>}
                </>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const pageNumber = startPage + index;
                return (
                  <Link
                    key={pageNumber}
                    href={buildArticlesHref(pageNumber)}
                    className={`inline-flex items-center justify-center rounded-full border px-4 py-2 font-semibold transition ${
                      pageNumber === safePage
                        ? "border-[#d32f2f] bg-[#d32f2f] text-white"
                        : "border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <span className="text-[#897261]">…</span>}
                  <Link
                    href={buildArticlesHref(totalPages)}
                    className="inline-flex items-center justify-center rounded-full border border-[#d32f2f] px-4 py-2 font-semibold text-[#d32f2f] transition hover:bg-[#d32f2f] hover:text-white"
                  >
                    {totalPages}
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
