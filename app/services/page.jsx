import { supabaseServer } from "../../lib/supabaseServer";

export const revalidate = 60;

const FEATURED_SERVICE_SLUG = "service-curtains";

const loadFeaturedService = async () => {
  if (!supabaseServer) {
    return null;
  }
  const { data: featured } = await supabaseServer
    .from("services")
    .select("id, slug, title, summary, hero_image")
    .eq("status", "published")
    .eq("slug", FEATURED_SERVICE_SLUG)
    .maybeSingle();
  if (featured) {
    return featured;
  }
  const { data: fallback } = await supabaseServer
    .from("services")
    .select("id, slug, title, summary, hero_image")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(1);
  return (fallback && fallback.length ? fallback[0] : null) ?? null;
};

export default async function ServicesPage() {
  const service = await loadFeaturedService();

  return (
    <section className="ds-section">
      <div className="ds-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="ds-eyebrow text-sm">บริการทั้งหมด</p>
            <h1 className="ds-title text-4xl lg:text-5xl mt-2">บริการของเรา</h1>
            <p className="ds-muted mt-3 max-w-2xl">
              ครบทุกงานตกแต่งและรีโนเวทที่คัดสรรมาเพื่อบ้านของคุณ
            </p>
          </div>
        </div>
        {service ? (
          <div className="ds-card ds-card-hover p-6 max-w-3xl">
            {service.hero_image ? (
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src={service.hero_image}
                  alt={service.title || "บริการ"}
                  className="w-full h-60 object-cover"
                />
              </div>
            ) : null}
            <h3 className="text-2xl font-bold mb-2">{service.title || "บริการ"}</h3>
            <p className="ds-muted text-sm mb-4">
              {service.summary || "รายละเอียดบริการจะมาเร็วๆ นี้"}
            </p>
            <a
              href={`/services/${service.slug || service.id}`}
              className="inline-flex items-center gap-1 font-bold text-[#d46211]"
            >
              ดูรายละเอียด <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ) : (
          <div className="text-sm text-[#897261] max-w-3xl">
            ยังไม่มีบริการที่เผยแพร่ในขณะนี้ ลองกลับมาทีหลังอีกครั้งครับ
          </div>
        )}
      </div>
    </section>
  );
}
