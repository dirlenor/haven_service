export default function ServicesSection({ services = [] }) {
  const maxCards = 8;
  const serviceSlots = maxCards - 1;
  const serviceItems = (services || []).slice(0, serviceSlots);

  return (
    <section id="services-section" data-nav-label="บริการของเรา" className="ds-section">
      <div className="ds-container">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="ds-title text-4xl lg:text-5xl mb-4">
              บริการของเรา
            </h2>
            <p className="ds-body text-lg leading-relaxed">
            ค้นพบบริการตกแต่งบ้านครบวงจรที่เราคัดสรรมาเพื่อคุณ ตั้งแต่ ฉากกั้นห้อง ผ้าม่าน และอื่นๆ ด้วยทีมงานมืออาชีพที่พร้อมสร้างพื้นที่ในฝันของคุณให้เป็นจริง
            </p>
          </div>
          <a
            href="/services"
            className="ds-eyebrow hover:underline flex items-center gap-1 flex-shrink-0 mb-2"
          >
            ดูทั้งหมด
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
      <div className="ds-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((service) => (
            <a
              key={service.id || service.title}
              href={`/services/${service.slug || service.id}`}
              className="ds-card ds-card-hover group relative flex h-[320px] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-[#f4f2ee] bg-cover bg-center"
                style={{
                  backgroundImage: service.hero_image
                    ? `url(${service.hero_image})`
                    : "none"
                }}
                role="img"
                aria-label={service.title || "บริการ"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
              <div className="relative z-10 mt-auto w-full p-6 text-white">
                <h3 className="text-xl font-bold">
                  {service.title || "บริการ"}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                  ดูรายละเอียด
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </a>
          ))}
          <a
            href="/services"
            className="ds-card ds-card-hover group relative flex h-[320px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#d32f2f]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#d32f2f] via-[#b71c1c] to-[#7f1414]" />
            <div className="relative z-10 mt-auto w-full p-6 text-white">
              <h3 className="text-2xl font-bold">
                ไปหน้ารวมบริการ
              </h3>
              <p className="mt-2 text-sm text-white/80">
                ดูบริการทั้งหมดและรายละเอียดเพิ่มเติม
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                ดูทั้งหมด
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
