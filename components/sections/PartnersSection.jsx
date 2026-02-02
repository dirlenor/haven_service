export default function PartnersSection() {
  return (
    <section
      id="partners-section"
      data-nav-label="สนใจบริการ"
      className="py-16"
    >
      <div className="ds-container">
        <div className="rounded-[32px] border border-[#ebe5dc] bg-[#f8f3ed] px-6 py-10 text-center sm:px-10">
          <p className="text-xs uppercase tracking-[0.5em] text-[#897261]">
            สนใจบริการ
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#18120c] sm:text-4xl">
            สนใจบริการหรือปรึกษาเราได้ทุกเวลา
          </h2>
          <p className="mt-4 text-sm text-[#4c3f35] leading-relaxed max-w-2xl mx-auto">
            ทีมงาน Thai Haven Service พร้อมให้คำปรึกษา ออกแบบ และติดตั้งผลงานที่ตอบโจทย์พื้นที่ของคุณทุกโครงการ
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://lin.ee/BCoNWSL"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00c300] px-8 py-3 text-base font-bold text-white transition hover:bg-[#00a500]"
            >
              <span className="text-lg">LINE</span>
              ติดต่อเราได้ทันที
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
