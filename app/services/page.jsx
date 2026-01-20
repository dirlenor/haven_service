import { supabaseServer } from "../../lib/supabaseServer";

export const revalidate = 60;

const loadServices = async () => {
  if (!supabaseServer) {
    return [];
  }
  const { data } = await supabaseServer
    .from("services")
    .select("id, slug, title, summary, hero_image")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return data || [];
};

export default async function ServicesPage() {
  const services = await loadServices();

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
        {services.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <a
                key={service.id}
                href={`/services/${service.slug || service.id}`}
                className="ds-card ds-card-hover p-6 group"
              >
                {service.hero_image ? (
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <img
                      src={service.hero_image}
                      alt={service.title || "บริการ"}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ) : null}
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  {service.title || "บริการ"}
                </h3>
                <p className="ds-muted text-sm mt-2">
                  {service.summary || "รายละเอียดบริการจะมาเร็วๆ นี้"}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-bold mt-4">
                  ดูรายละเอียด <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-sm text-[#897261]">ยังไม่มีบริการที่เผยแพร่</div>
        )}
      </div>
    </section>
  );
}
