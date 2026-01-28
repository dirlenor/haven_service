export default function ArticlesSection({ articles = [] }) {
  const hasArticles = articles.length > 0;
  const renderArticles = hasArticles ? articles.slice(0, 3) : [];
  const fallbackBadgeColor = "#d32f2f";
  const getBadges = (article) => {
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
    if (!categories.length) {
      return [{ label: "บทความ", color: fallbackBadgeColor }];
    }
    return categories.slice(0, 3).map((label, index) => ({
      label,
      color: colors[index] || fallbackBadgeColor
    }));
  };

  return (
    <section
      id="articles-section"
      data-nav-label="บทความและเคล็ดลับ"
      className="ds-section"
      style={{ backgroundColor: "#edecea" }}
    >
      <div className="ds-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="ds-title text-3xl mb-2 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">article</span>
              บทความและเคล็ดลับการแต่งบ้าน
            </h2>
            <p className="ds-muted">สาระน่ารู้และแรงบันดาลใจดีๆ สำหรับคนรักบ้าน</p>
          </div>
          <a
            href="/articles"
            className="ds-btn ds-btn-outline w-full sm:w-auto flex items-center gap-2 px-6 py-3"
          >
            ดูบทความทั้งหมด
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="ds-grid ds-grid-3">
          {hasArticles
            ? renderArticles.map((article) => (
                <a
                  key={article.id}
                  href={`/articles/${article.slug || article.id}`}
                  className="ds-card ds-card-hover group cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      alt={article.title || "บทความ"}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={article.hero_image || "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop"}
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {getBadges(article).map((badge) => (
                        <span
                          key={badge.label}
                          className="text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm"
                          style={{ backgroundColor: badge.color }}
                        >
                          {badge.label}
                        </span>
                      ))}
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
              ))
            : null}
          {!hasArticles ? (
            <>
              <a href="/article-detail" className="ds-card ds-card-hover group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    alt="Home Decor Color Trends"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5LbwLJC4JP2_I9XPdytLwy4gUXRd8OjvmHK0MiCPLTx9wIMMyK42a4QDt1TeKkGdFpCTiYCYxnARoi3k34pwtcEV4KYBFN2amkpR1yVUmn8cPaxuIwZvndC5aO0q1GQcWyG0qY9qmthd1x3__UOhKR1YHPJciq-npWbGLRbtgqg-lWTqOMl7SiRpzGJIUlS_NwpCRZ0XwxQDyoNa7j4dN8A_bwI8ZB9FaEbd1MB2YRrpCOkt5ZN8wMQPphDD8F2892Cy5DKsFn635"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    ไอเดียแต่งบ้าน
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> 12 ม.ค. 2024
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors"
                    style={{ color: "var(--ds-color-text)" }}
                  >
                    เทรนด์สีทาบ้านปี 2024 ที่จะทำให้บ้านของคุณดูอบอุ่น
                  </h3>
                  <p className="ds-muted text-sm mb-6 line-clamp-2 leading-relaxed">
                    ค้นพบพาเลตต์สีธรรมชาติที่จะเปลี่ยนบรรยากาศบ้านของคุณให้น่าอยู่ยิ่งขึ้น
                    พร้อมเทคนิคการจับคู่สีแบบมือโปร
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-bold hover:gap-2 transition-all"
                    style={{ color: "var(--ds-color-primary)" }}
                  >
                    อ่านเพิ่มเติม <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
              <a href="/article-detail" className="ds-card ds-card-hover group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    alt="Small Condo Decoration"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHCz_FbiYnr9ijyUE_DxBE0MEwAa3eWSbZvNIgrw2TIv3p4kPwCl8_qRNekKYmSaw77Pd0sL1ZnJ6csOsovZw6QYYzy7l9geUUUIl9v00IU23SSwWuvsWCv5ptRj6l0WukSXJPJr3Yglq2wu4GBaipRQQoA4rR2Ll0K0K6iuBOr_cPF4BYJ_bhHmOR-kiSNJP0asQydBYfmfMTVxj04siYh7wYq_wpWA6m9lnFfTrzZ3sEMyAN74wWKKjrNWHyC8mG9Ev4p-OHfRKI"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    คอนโดมิเนียม
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> 5 ม.ค. 2024
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors"
                    style={{ color: "var(--ds-color-text)" }}
                  >
                    5 ไอเดียแต่งคอนโดขนาดเล็กให้ดูกว้างขึ้น
                  </h3>
                  <p className="ds-muted text-sm mb-6 line-clamp-2 leading-relaxed">
                    พื้นที่จำกัดไม่ใช่ปัญหา
                    เรียนรู้วิธีการเลือกเฟอร์นิเจอร์และการจัดวางที่จะช่วยเพิ่มพื้นที่ใช้สอยให้คุ้มค่าที่สุด
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-bold hover:gap-2 transition-all"
                    style={{ color: "var(--ds-color-primary)" }}
                  >
                    อ่านเพิ่มเติม <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
              <a href="/article-detail" className="ds-card ds-card-hover group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    alt="Curtain Selection Guide"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FD7-rNpXQnaSNOq8YH5c-XJFo-z4xqZvDc9nw0XHtCDOmhQBAucDsRIm299bRI_dZhrqDGQlFBsR8JuvNEi_fdezYiH0nINBcQKCDII_lFho1bjzHjo8ojbaPm5NKNXcWKEErJPiDo2EsNrHgJWpMyIDbb40t2PDWuoprMT8nHa9M3HBG_4CwkakpLi9UzQUTu5TTLNJTgn_PpVnwq_6LE2ZmoogjSBnMWCxlnvU5xc7pyx0pAHX7biXWfzMuw74h2UYDqoa8PyZ"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    เคล็ดลับ
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> 28 ธ.ค. 2023
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors"
                    style={{ color: "var(--ds-color-text)" }}
                  >
                    วิธีเลือกผ้าม่านให้เหมาะกับแต่ละห้องในบ้าน
                  </h3>
                  <p className="ds-muted text-sm mb-6 line-clamp-2 leading-relaxed">
                    ผ้าม่านทึบแสงหรือโปร่งแสง? แบบจีบหรือแบบพับ?
                    คู่มือการเลือกผ้าม่านที่จะช่วยคุมโทนและฟังก์ชันการใช้งาน
                  </p>
                  <span
                    className="inline-flex items-center gap-1 font-bold hover:gap-2 transition-all"
                    style={{ color: "var(--ds-color-primary)" }}
                  >
                    อ่านเพิ่มเติม <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
