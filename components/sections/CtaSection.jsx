export default function CtaSection() {
  return (
    <section id="cta-section" data-nav-label="โปรโมชั่น" className="my-16">
      <div className="ds-container">
        <div className="relative w-full min-h-[500px] lg:h-[550px] rounded-[3rem] overflow-hidden bg-white  shadow-2xl flex flex-col lg:flex-row border border-gray-100 ">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%] h-64 lg:h-full order-1 lg:order-2">
            <img
              src="/assets/images/special-offer.jpg"
              alt="Luxury Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="hidden lg:block absolute inset-y-0 right-[50%] w-[20%] z-10 text-white  h-full pointer-events-none translate-x-[50%]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
              <path d="M0 0 C 40 0 60 100 100 100 L 0 100 Z" />
            </svg>
          </div>

          <div className="lg:hidden absolute top-56 left-0 right-0 h-12 z-10 text-white ">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
              <path d="M0 100 C 20 0 80 0 100 100 Z" />
            </svg>
          </div>

          <div className="relative z-20 w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center bg-white  lg:bg-transparent order-2 lg:order-1">
            <div className="max-w-md">
              <span className="ds-chip mb-6">
                Special Offer
              </span>
              <h2 className="ds-title text-4xl lg:text-6xl leading-[1.1] mb-6">
                MODERN<br />
                <span className="ds-muted">DESIGN</span> FOR<br />
                YOUR LIFE
              </h2>
              <p className="ds-body text-lg leading-relaxed mb-10">
                เปลี่ยนพื้นที่ธรรมดาให้กลายเป็นความพิเศษ กับข้อเสนอสุด Exclusive
                สำหรับการตกแต่งภายในครบวงจร
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="#"
                  className="ds-btn ds-btn-primary w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/30 flex items-center gap-3"
                >
                  <span className="material-symbols-outlined">chat</span>
                  สอบถามโปรโมชั่น
                </a>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">ราคาเริ่มต้น</span>
                  <span className="text-xl font-bold">฿590,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
