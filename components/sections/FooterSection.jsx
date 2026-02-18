import { supabaseServer } from "../../lib/supabaseServer";

const pickRandomServices = (list, count) => {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
};

const loadFooterServices = async () => {
  if (!supabaseServer) {
    return [];
  }
  const { data, error } = await supabaseServer
    .from("services")
    .select("id, slug, title")
    .in("status", ["published", "Published"])
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Footer services load failed:", error.message);
  }

  return data || [];
};

export default async function FooterSection() {
  const services = await loadFooterServices();
  const serviceLinks = services.length
    ? pickRandomServices(services, 4)
    : [
        { title: "ผ้าม่านและมู่ลี่", href: "/services" },
        { title: "ติดตั้งวอลเปเปอร์", href: "/services" },
        { title: "โซลูชันพื้น", href: "/services" },
        { title: "เฟอร์นิเจอร์บิวท์อิน", href: "/services" }
      ];
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
                <img src="/assets/images/logo.png" alt="Havenworks" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--ds-color-text)" }}>
                Haven<span className="text-[#d32f2f]">works</span>
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
              {serviceLinks.map((service) => (
                <a
                  key={service.id || service.title}
                  className="text-sm ds-muted hover:text-primary transition-colors"
                  href={service.href || `/services/${service.slug || service.id}`}
                >
                  {service.title || "บริการ"}
                </a>
              ))}
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
                href="/services"
              >
                บริการทั้งหมด
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
                ติดต่อเรา
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
                  99/13 อ่อนนุช 74/3-1 ประเวศ เขตประเวศ กรุงเทพมหานคร 10250
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--ds-color-primary)" }}
                >
                  phone
                </span>
                <p className="text-sm ds-muted">+66 (0) 95-771-8825</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/havenworksthailand/"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f2ee] transition hover:bg-[#e9e4df]"
              >
                <img
                  src="https://api.iconify.design/simple-icons/facebook.svg?color=%231877F2"
                  alt="Facebook"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://www.youtube.com/@HavenService-m1i"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f2ee] transition hover:bg-[#e9e4df]"
              >
                <img
                  src="https://api.iconify.design/simple-icons/youtube.svg?color=%23FF0000"
                  alt="YouTube"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#d32f2f" }}>
        <div className="ds-container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white">
          <p>© 2026 Havenworks. สงวนลิขสิทธิ์</p>
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
