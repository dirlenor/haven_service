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
  return (
    <main className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8">
      <section className="mb-12">
        <h1 className="text-[#181411] text-4xl md:text-5xl font-black mb-4 tracking-tight">
          บทความและรีวิว
        </h1>
        <p className="text-[#897261] text-lg max-w-2xl font-normal">
          รวมเคล็ดลับการแต่งบ้านจากผู้เชี่ยวชาญ
          และเสียงตอบรับจากลูกค้าตัวจริงเพื่อความมั่นใจในคุณภาพบริการของเรา
        </p>
      </section>

      {categoryFilters.length ? (
        <section className="mb-8 border-b border-[#e6e0db]">
          <div className="flex gap-10 overflow-x-auto no-scrollbar">
            {categoryFilters.map((filter) => {
              const isActive = filter.value === activeCategory;
              return (
                <Link
                  key={`${filter.value || "all"}-filter`}
                  href={buildArticlesHref(1, filter.value)}
                  className={`flex flex-col items-center border-b-[3px] pb-3 px-2 ${
                    isActive ? "border-[#d32f2f]" : "border-transparent hover:border-[#e6e0db]"
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${isActive ? "text-[#d32f2f]" : "text-[#897261]"}`}
                    style={isActive && filter.color ? { color: filter.color } : undefined}
                  >
                    {filter.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mb-12">
        <ArticlesList articles={articles} />
      </section>

      {totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2 pb-16">
          {safePage > 1 ? (
            <Link
              href={buildArticlesHref(safePage - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[#181411]">chevron_left</span>
            </Link>
          ) : (
            <span className="w-10 h-10 flex items-center justify-center rounded-lg text-[#b9a99e]">
              <span className="material-symbols-outlined">chevron_left</span>
            </span>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            const isActive = pageNumber === safePage;
            return (
              <Link
                key={pageNumber}
                href={buildArticlesHref(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center text-sm ${
                  isActive
                    ? "font-bold bg-[#d32f2f] text-white rounded-lg"
                    : "font-normal text-[#181411] hover:bg-gray-100 rounded-lg"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
          {safePage < totalPages ? (
            <Link
              href={buildArticlesHref(safePage + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[#181411]">chevron_right</span>
            </Link>
          ) : (
            <span className="w-10 h-10 flex items-center justify-center rounded-lg text-[#b9a99e]">
              <span className="material-symbols-outlined">chevron_right</span>
            </span>
          )}
        </nav>
      ) : null}
    </main>
  );
}
