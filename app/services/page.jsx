import Link from "next/link";
import { supabaseServer } from "../../lib/supabaseServer";
import { parseServiceContent } from "../../lib/serviceContent";

export const revalidate = 60;

const loadServices = async () => {
  if (!supabaseServer) {
    return [];
  }
  const { data: services, error } = await supabaseServer
    .from("services")
    .select("id, slug, title, summary, hero_image, content")
    .in("status", ["published", "Published"])
    .order("created_at", { ascending: false })
    .limit(60);
  if (error) {
    console.warn("Failed to load services:", error.message);
  }
  return (services || []).map((service) => {
    const parsed = parseServiceContent(service.content || "");
    return {
      ...service,
      summary: service.summary || parsed?.hero?.subtitle || "",
      hero_image: parsed?.hero?.image?.url || service.hero_image || ""
    };
  });
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug || service.id}`}
                className="ds-card ds-card-hover p-6 block"
              >
                {service.hero_image ? (
                  <div className="rounded-2xl overflow-hidden mb-6">
                    <img
                      src={service.hero_image}
                      alt={service.title || "บริการ"}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ) : null}
                <h3 className="text-xl font-bold mb-2 text-[#181411]">
                  {service.title || "บริการ"}
                </h3>
                <p className="ds-muted text-sm mb-4">
                  {service.summary || "รายละเอียดบริการจะมาเร็วๆ นี้"}
                </p>
                <span className="inline-flex items-center gap-1 font-bold text-[#d32f2f]">
                  ดูรายละเอียด <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-sm text-[#897261] max-w-3xl">
            ยังไม่มีบริการที่เผยแพร่ในขณะนี้ ลองกลับมาทีหลังอีกครั้งครับ
          </div>
        )}
      </div>
      <section className="py-16" style={{ backgroundColor: "var(--ds-color-cream)" }}>
        <div className="mx-auto w-full max-w-3xl px-6 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
            สนใจบริการ
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#18120c]">
            ปรึกษาฟรีกับทีมงานมืออาชีพ
          </h2>
          <p className="text-sm text-[#4c3f35] leading-relaxed">
            ติดต่อเราเพื่อรับคำแนะนำที่เหมาะสมกับพื้นที่ของคุณ พร้อมประเมินราคาเบื้องต้น
          </p>
          <a
            href="https://lin.ee/BCoNWSL"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#00c300] text-white text-base font-bold hover:bg-[#00a500] transition"
          >
            <span className="text-lg">LINE</span>
            <span>ทักไลน์ปรึกษาฟรี</span>
          </a>
        </div>
      </section>
    </section>
  );
}
