export default function ServicesSection({ services = [] }) {
  const hasServices = services.length > 0;
  const renderServices = hasServices ? services.slice(0, 16) : [];
  const fallbackServices = [
    {
      title: "ม่านจีบ",
      summary: "ตกแต่งคลาสสิก เข้ากับทุกสไตล์ห้องนอนและห้องนั่งเล่น"
    },
    {
      title: "ม่านลอน",
      summary: "เส้นลอนเรียบหรู ให้บรรยากาศโมเดิร์นและนุ่มนวล"
    },
    {
      title: "ม่านปรับแสง",
      summary: "ควบคุมแสงเข้าได้ง่าย เหมาะกับพื้นที่ใช้งานจริงทุกวัน"
    },
    {
      title: "ม่านม้วน",
      summary: "ดีไซน์มินิมอล ประหยัดพื้นที่ ใช้งานสะดวก"
    },
    {
      title: "มู่ลี่",
      summary: "ปรับมุมรับแสงได้ละเอียด เหมาะกับห้องทำงาน"
    },
    {
      title: "ม่านตาไก่",
      summary: "ติดตั้งง่าย ดูโปร่งสบาย เหมาะกับบ้านสไตล์ร่วมสมัย"
    },
    {
      title: "วอลเปเปอร์",
      summary: "ลวดลายพรีเมียม ยกระดับผนังให้ดูโดดเด่น"
    },
    {
      title: "ฉากกั้นห้อง",
      summary: "แบ่งพื้นที่ให้เป็นสัดส่วน พร้อมดีไซน์ที่เข้ากับบ้าน"
    }
  ];

  return (
    <section id="services-section" data-nav-label="บริการของเรา" className="ds-section">
      <div className="ds-container">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="ds-title text-4xl lg:text-5xl mb-4">
              บริการของเรา
            </h2>
            <p className="ds-body text-lg leading-relaxed">
              ค้นพบบริการตกแต่งบ้านครบวงจรที่เราคัดสรรมาเพื่อคุณ ตั้งแต่ผ้าม่าน วอลเปเปอร์
              ไปจนถึงงานบิวท์อินและพื้นไม้ ด้วยทีมงานมืออาชีพที่พร้อมเนรมิตบ้านในฝันของคุณให้เป็นจริง
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
          {hasServices
            ? renderServices.map((service) => (
                <a
                  key={service.id}
                  href={`/services/${service.slug || service.id}`}
                  className="ds-card ds-card-hover group relative flex h-[400px] overflow-hidden"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="relative z-10 mt-auto w-full p-6 text-white">
                    <h3 className="text-xl font-bold">
                      {service.title || "บริการ"}
                    </h3>
                    <p className="mt-2 text-sm text-white/90 line-clamp-2">
                      {service.summary || "รายละเอียดบริการจะมาเร็วๆ นี้"}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                      ดูรายละเอียด
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </div>
                </a>
              ))
            : null}
          {!hasServices ? (
            <>
              {fallbackServices.map((service) => (
                <a
                  key={service.title}
                  href="/services"
                  className="ds-card ds-card-hover group relative flex h-[400px] overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-[#f4f2ee] bg-cover bg-center"
                    role="img"
                    aria-label={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="relative z-10 mt-auto w-full p-6 text-white">
                    <h3 className="text-xl font-bold">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/90 line-clamp-2">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                      ดูรายละเอียด
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </div>
                </a>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
