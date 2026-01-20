export default function ServicesSection({ services = [] }) {
  const hasServices = services.length > 0;
  const renderServices = hasServices ? services.slice(0, 8) : [];

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
                  className="ds-card ds-card-hover p-5 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-lg font-bold group-hover:text-primary transition-colors"
                      style={{ color: "var(--ds-color-text)" }}
                    >
                      {service.title || "บริการ"}
                    </h3>
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: "var(--ds-color-text)" }}
                    >
                      arrow_forward
                    </span>
                  </div>
                  <p className="ds-muted text-sm mt-2">
                    {service.summary || "รายละเอียดบริการจะมาเร็วๆ นี้"}
                  </p>
                </a>
              ))
            : null}
          {!hasServices ? (
            <>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ม่านจีบ
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ตกแต่งคลาสสิก เข้ากับทุกสไตล์ห้องนอนและห้องนั่งเล่น</p>
              </a>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ม่านลอน
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">เส้นลอนเรียบหรู ให้บรรยากาศโมเดิร์นและนุ่มนวล</p>
              </a>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ม่านปรับแสง
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ควบคุมแสงเข้าได้ง่าย เหมาะกับพื้นที่ใช้งานจริงทุกวัน</p>
              </a>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ม่านม้วน
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ดีไซน์มินิมอล ประหยัดพื้นที่ ใช้งานสะดวก</p>
              </a>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  มู่ลี่
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ปรับมุมรับแสงได้ละเอียด เหมาะกับห้องทำงาน</p>
              </a>
              <a href="/allservices#curtains" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ม่านตาไก่
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ติดตั้งง่าย ดูโปร่งสบาย เหมาะกับบ้านสไตล์ร่วมสมัย</p>
              </a>
              <a href="/allservices#wallpapers" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  วอลเปเปอร์
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">ลวดลายพรีเมียม ยกระดับผนังให้ดูโดดเด่น</p>
              </a>
              <a href="/allservices#partition" className="ds-card ds-card-hover p-5 group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors" style={{ color: "var(--ds-color-text)" }}>
                  ฉากกั้นห้อง
                  </h3>
                  <span className="material-symbols-outlined text-xl" style={{ color: "var(--ds-color-text)" }}>
                    arrow_forward
                  </span>
                </div>
                <p className="ds-muted text-sm mt-2">แบ่งพื้นที่ให้เป็นสัดส่วน พร้อมดีไซน์ที่เข้ากับบ้าน</p>
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
