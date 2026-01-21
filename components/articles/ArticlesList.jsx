"use client";

import Link from "next/link";

const formatDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

const badgeData = (article) => {
  const fallbackColor = "#d46211";
  const labels = Array.isArray(article.categories) && article.categories.length
    ? article.categories
    : article.category
      ? [article.category]
      : [];
  const colors = Array.isArray(article.category_colors) && article.category_colors.length
    ? article.category_colors
    : article.category_color
      ? [article.category_color]
      : [];
  if (!labels.length) {
    return [{ label: "บทความ", color: fallbackColor }];
  }
  return labels.slice(0, 3).map((label, index) => ({
    label,
    color: colors[index] || fallbackColor
  }));
};

export default function ArticlesList({ articles = [] }) {
  if (!articles.length) {
    return (
      <div className="text-center ds-muted">
        ยังไม่มีบทความในขณะนี้ ลองกลับมาทีหลังอีกครั้งครับ
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const slug = article.slug || article.id;
        return (
          <Link
            key={article.id || slug}
            href={`/articles/${slug}`}
            className="ds-card ds-card-hover group flex flex-col overflow-hidden"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={
                  article.hero_image ||
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop"
                }
                alt={article.title || "บทความ"}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {badgeData(article).map((badge) => (
                  <span
                    key={`${badge.label}-${badge.color}`}
                    className="text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="text-xs text-gray-500 mb-2 flex flex-wrap items-center gap-3">
                {article.date ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {formatDate(article.date)}
                  </span>
                ) : null}
              </div>
              <h3 className="text-xl font-bold leading-snug mb-3 transition-colors group-hover:text-primary text-[#181411]">
                {article.title || "บทความ"}
              </h3>
              <p className="text-sm ds-muted line-clamp-3 mb-6 flex-1">
                {article.summary || "อ่านบทความฉบับเต็มเพื่อรายละเอียดเพิ่มเติม"}
              </p>
              <span
                className="inline-flex items-center gap-1 font-bold text-[#d46211] hover:gap-2 transition-all"
              >
                อ่านเพิ่มเติม
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
