export default function WhyChooseSection() {
  return (
    <section id="why-choose-section" data-nav-label="ทำไมต้องเลือกเรา" className="ds-section">
      <div className="ds-container">
        <div className="ds-stack gap-24 lg:gap-32">
          <div className="text-center mb-0 lg:mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="ds-eyebrow">ทำไมต้องเลือกเรา</span>
            </div>
            <h2 className="ds-title text-4xl lg:text-5xl mb-6">คุณภาพและฝีมือระดับมืออาชีพ</h2>
            <p className="ds-body text-lg leading-relaxed max-w-2xl mx-auto">
            มากกว่า 10 ปีที่เรามุ่งมั่นสร้างสรรค์ผลงานคุณภาพ ด้วยทีมงานมืออาชีพและวัสดุที่ดีที่สุด รับประกันความพึ่งพอใจ มีบริการหลังการขายที่พร้อมดูแลคุณ
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                <img
                  src="/assets/images/why-expert.png"
                  alt="Expert Installation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="size-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-4xl">engineering</span>
              </div>
            <h3 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--ds-color-text)" }}>
              ติดตั้งโดยผู้เชี่ยวชาญ
            </h3>
              <p className="ds-body text-lg leading-relaxed">
              ทีมช่างของเราผ่านการฝึกอบรมเฉพาะทางและมีประสบการณ์ยาวนาน มั่นใจได้ในความประณีตของการติดตั้งทุกจุด เก็บงานเรียบร้อย ไม่ทิ้งร่องรอยความเสียหาย
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 ds-muted">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>ทีมงานมืออาชีพ ประสบการณ์สูง</span>
                </li>
                <li className="flex items-center gap-3 ds-muted">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>เครื่องมือทันสมัย ติดตั้งแม่นยำ</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20 bg-[#d32f2f0a] rounded-[2rem] p-6">
          <div className="w-full lg:w-1/2 relative group">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="/assets/images/why-material.png"
                alt="Premium Materials"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:items-end lg:text-right">
            <div className="size-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-4xl">diamond</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--ds-color-text)" }}>
              วัสดุเกรดพรีเมียม
            </h3>
            <p className="ds-body text-lg leading-relaxed">
            เราคัดสรรเฉพาะวัสดุคุณภาพสูงจากแหล่งผลิตชั้นนำ เพื่อให้ได้ความสวยงาม ทนทาน และอายุการใช้งานที่ยาวนาน เพื่อให้งานออกมาคุณภาพดีที่สุด
            </p>
            <ul className="flex flex-col gap-3 mt-2 lg:items-end">
              <li className="flex items-center gap-3 ds-muted flex-row-reverse">
                <span className="material-symbols-outlined text-blue-500">check_circle</span>
                <span>หลากหลายดีไซน์ให้เลือกสรรค์</span>
              </li>
              <li className="flex items-center gap-3 ds-muted flex-row-reverse">
                <span className="material-symbols-outlined text-blue-500">check_circle</span>
                <span>วัสดุคุณภาพสูง</span>
              </li>
            </ul>
          </div>
        </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="w-full lg:w-1/2 relative group">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="/assets/images/why-quality.png"
                alt="Quality Checklist"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="size-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined text-4xl">fact_check</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--ds-color-text)" }}>
            ราคาโปร่งใส
            </h3>
            <p className="ds-body text-lg leading-relaxed">
            มีตัวอย่างให้คุณเลือกมากมาย มีบริการวัดพื้นที่หน้างาน  เพื่อให้คุณทราบงบประมาณก่อนตัดสินใจ
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 ds-muted">
                <span className="material-symbols-outlined text-purple-500">check_circle</span>
                <span>ประเมินราคาก่อนเริ่มงาน </span>
              </li>
              <li className="flex items-center gap-3 ds-muted">
                <span className="material-symbols-outlined text-purple-500">check_circle</span>
                <span>ไม่มีค่าธรรมเนียมแอบแฝง</span>
              </li>
            </ul>
          </div>
        </div>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20 bg-[#d32f2f0a] rounded-[2rem] p-6">
          <div className="w-full lg:w-1/2 relative group">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="/assets/images/why-time.png"
                alt="On-time Delivery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:items-end lg:text-right">
            <div className="size-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-4xl">schedule</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold" style={{ color: "var(--ds-color-text)" }}>
            รับประกันงาน
            </h3>
            <p className="ds-body text-lg leading-relaxed">
            ทุกขั้นตอนการทำงานมีการควบคุมและตรวจสอบคุณภาพ ตั้งแต่ก่อนส่งมอบงาน เพื่อให้มั่นใจว่าคุณจะได้รับสิ่งที่ดีที่สุด
            </p>
            <ul className="flex flex-col gap-3 mt-2 lg:items-end">
              <li className="flex items-center gap-3 ds-muted flex-row-reverse">
                <span className="material-symbols-outlined text-orange-500">check_circle</span>
                <span>Double Check ทุกจุด</span>
              </li>
              <li className="flex items-center gap-3 ds-muted flex-row-reverse">
                <span className="material-symbols-outlined text-orange-500">check_circle</span>
                <span>รับประกันความพึงพอใจ</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
