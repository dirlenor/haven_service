export default function FooterSection() {
  return (
    <footer
      id="site-footer"
      className="bg-white  mt-0"
    >
      <div className="ds-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <img src="/assets/images/logo.png" alt="Havenworksthailand" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--ds-color-text)" }}>
                Haven<span className="text-[#d32f2f]">works</span>thailand
              </h2>
            </div>
            <p className="ds-muted text-sm leading-relaxed">
              เราพร้อมที่จะดูแลบ้านของคุณด้วยหัวใจ มอบบริการที่เหนือระดับและผลลัพธ์ที่น่าประทับใจ
            </p>
            <a
              href="/admin"
              className="text-xs uppercase tracking-[0.3em] text-[#d32f2f] hover:text-[#b71c1c] transition-colors"
              aria-label="เข้าสู่ระบบแอดมิน"
            >
              เข้าสู่ระบบadmin
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg" style={{ color: "var(--ds-color-text)" }}>
              บริการ
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/services"
              >
                ผ้าม่านและมู่ลี่
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/services"
              >
                ติดตั้งวอลเปเปอร์
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/services"
              >
                โซลูชันพื้น
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/services"
              >
                เฟอร์นิเจอร์บิวท์อิน
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg" style={{ color: "var(--ds-color-text)" }}>
              ลิงก์ด่วน
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/about"
              >
                เกี่ยวกับเรา
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/#portfolio"
              >
                ผลงาน
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/articles"
              >
                บทความ
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/contact"
              >
                ติดต่อ
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg" style={{ color: "var(--ds-color-text)" }}>
              ติดต่อเรา
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--ds-color-primary)" }}
                >
                  location_on
                </span>
                <p className="text-sm ds-muted" data-location="Bangkok, Thailand">
                  123 ถนนตกแต่ง, ห้วยขวาง, กรุงเทพฯ 10310
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--ds-color-primary)" }}
                >
                  phone
                </span>
                <p className="text-sm ds-muted">02-123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#d32f2f" }}>
        <div className="ds-container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white">
          <p>© 2026 Havenworksthailand. สงวนลิขสิทธิ์</p>
          <div className="flex gap-6">
            <a className="hover:underline" href="#">
              นโยบายความเป็นส่วนตัว
            </a>
            <a className="hover:underline" href="#">
              เงื่อนไขการบริการ
            </a>
          </div>
          <div>Design by 6CAT</div>
        </div>
      </div>
    </footer>
  );
}
