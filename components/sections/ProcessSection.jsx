export default function ProcessSection() {
  return (
    <section
      id="process-section"
      data-nav-label="ขั้นตอนการทำงาน"
      className="ds-section"
    >
      <div className="ds-container">
        <div id="process-header" className="ds-stack gap-8 mb-16 text-center">
          <h2 className="ds-title text-4xl lg:text-5xl">ขั้นตอนการทำงานของเรา</h2>
          <p className="ds-body text-lg max-w-2xl mx-auto">
            ประสบการณ์การตกแต่งบ้านที่ราบรื่น เป็นขั้นตอน ง่ายและชัดเจน
          </p>
        </div>

        <div
          id="process-cards"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto"
        >
          <div
            id="process-step-1"
            className="rounded-[2rem] p-5 shadow-lg flex flex-col gap-5"
          >
            <div className="flex items-center justify-center font-black text-4xl flex-shrink-0" style={{ color: "var(--ds-color-text)" }}>
              01
            </div>
            <div className="flex flex-col justify-center">
              <h3
                className="text-xl font-bold mb-1 flex items-center gap-2"
                style={{ color: "var(--ds-color-text)" }}
              >
                <span className="material-symbols-outlined" style={{ color: "var(--ds-color-text)" }}>
                  chat_bubble
                </span>
                ปรึกษาและประเมินงาน
              </h3>
              <p className="ds-muted text-sm line-clamp-2">
                พูดคุยกับดีไซเนอร์เพื่อสรุปความต้องการและงบประมาณ
              </p>
            </div>
          </div>

          <div
            id="process-step-2"
            className="rounded-[2rem] p-5 shadow-lg flex flex-col gap-5 bg-white/5 dark:bg-[#1f1610]/5"
          >
            <div className="flex items-center justify-center font-black text-4xl flex-shrink-0" style={{ color: "var(--ds-color-text)" }}>
              02
            </div>
            <div className="flex flex-col justify-center">
              <h3
                className="text-xl font-bold mb-1 flex items-center gap-2"
                style={{ color: "var(--ds-color-text)" }}
              >
                <span className="material-symbols-outlined" style={{ color: "var(--ds-color-text)" }}>
                  straighten
                </span>
                วัดพื้นที่จริง
              </h3>
              <p className="ds-muted text-sm line-clamp-2">
                เข้าวัดพื้นที่หน้างานอย่างละเอียดด้วยเครื่องมือเลเซอร์ เพื่อความแม่นยำ 100%
              </p>
            </div>
          </div>

          <div
            id="process-step-3"
            className="rounded-[2rem] p-5 shadow-lg flex flex-col gap-5"
          >
            <div className="flex items-center justify-center font-black text-4xl flex-shrink-0" style={{ color: "var(--ds-color-text)" }}>
              03
            </div>
            <div className="flex flex-col justify-center">
              <h3
                className="text-xl font-bold mb-1 flex items-center gap-2"
                style={{ color: "var(--ds-color-text)" }}
              >
                <span className="material-symbols-outlined" style={{ color: "var(--ds-color-text)" }}>
                  palette
                </span>
                เลือกวัสดุและสรุปแบบ
              </h3>
              <p className="ds-muted text-sm line-clamp-2">
                ชมตัวอย่างวัสดุจริงหลากหลายเกรด พร้อมสรุปแบบ 3D Final ก่อนสั่งผลิตจริง
              </p>
            </div>
          </div>

          <div
            id="process-step-4"
            className="rounded-[2rem] p-5 shadow-lg flex flex-col gap-5 bg-white/5 dark:bg-[#1f1610]/5"
          >
            <div className="flex items-center justify-center font-black text-4xl flex-shrink-0" style={{ color: "var(--ds-color-text)" }}>
              04
            </div>
            <div className="flex flex-col justify-center">
              <h3
                className="text-xl font-bold mb-1 flex items-center gap-2"
                style={{ color: "var(--ds-color-text)" }}
              >
                <span className="material-symbols-outlined" style={{ color: "var(--ds-color-text)" }}>
                  home_work
                </span>
                ติดตั้งและส่งมอบงาน
              </h3>
              <p className="ds-muted text-sm line-clamp-2">
                ติดตั้งรวดเร็วโดยทีมช่างมืออาชีพ ตรวจสอบความเรียบร้อย และส่งมอบบ้านในฝันให้กับคุณ
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
