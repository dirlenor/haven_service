import LineCTA from "../ui/LineCTA";

export default function FooterSection() {
  return (
    <footer
      id="site-footer"
      className="bg-white dark:bg-background-dark mt-20"
    >
      <div className="ds-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8" style={{ color: "var(--ds-color-primary)" }}>
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--ds-color-text)" }}>
                Thai Haven Service
              </h2>
            </div>
            <p className="ds-muted text-sm leading-relaxed">
              เราพร้อมที่จะดูแลบ้านของคุณด้วยหัวใจ มอบบริการที่เหนือระดับและผลลัพธ์ที่น่าประทับใจ
            </p>
            <LineCTA className="w-fit" />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg" style={{ color: "var(--ds-color-text)" }}>
              บริการ
            </h4>
            <nav className="flex flex-col gap-2">
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/allservices#curtains"
              >
                ผ้าม่านและมู่ลี่
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/allservices#wallpapers"
              >
                ติดตั้งวอลเปเปอร์
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/allservices#flooring"
              >
                โซลูชันพื้น
              </a>
              <a
                className="text-sm ds-muted hover:text-primary transition-colors"
                href="/allservices#builtin"
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
      <div style={{ backgroundColor: "#d46311" }}>
        <div className="ds-container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white">
          <p>© 2024 Thai Haven Service. สงวนลิขสิทธิ์</p>
          <div className="flex gap-6">
            <a className="hover:underline" href="#">
              นโยบายความเป็นส่วนตัว
            </a>
            <a className="hover:underline" href="#">
              เงื่อนไขการบริการ
            </a>
          </div>
          <a
            href="/admin"
            className="opacity-0 hover:opacity-80 transition-opacity text-[10px] uppercase tracking-[0.3em]"
            aria-label="Admin"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
