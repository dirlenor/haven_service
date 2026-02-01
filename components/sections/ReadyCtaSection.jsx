export default function ReadyCtaSection({
  title = "พร้อมที่จะเปลี่ยนพื้นที่ของคุณหรือยัง?",
  body = "เข้าร่วมกับครอบครัวนับร้อยที่ไว้วางใจให้เราสร้างบ้านในฝัน",
  buttonLabel = "ปรึกษาผู้เชี่ยวชาญ",
  href = "/contact"
}) {
  return (
    <section
      id="ready-cta-section"
      className="w-full text-white py-16 md:py-24 px-6 lg:px-10"
      style={{ backgroundColor: "#d32f2f" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="text-white/90 text-lg">{body}</p>
        </div>
        <a
          href={href}
          className="w-full sm:w-auto bg-white hover:bg-gray-100 transition-colors px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-2 whitespace-nowrap"
          style={{ color: "#d32f2f" }}
        >
          <span>{buttonLabel}</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
