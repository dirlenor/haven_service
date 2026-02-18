import ContactForm from "../../components/ui/ContactForm";
import { supabaseServer } from "../../lib/supabaseServer";

export const metadata = {
  title: "Havenworks - Contact Us"
};

const loadContactSettings = async () => {
  if (!supabaseServer) {
    return { endpoint: "", successMessage: "" };
  }
  const { data, error } = await supabaseServer
    .from("site_settings")
    .select("contact_form_endpoint, contact_form_success_message, updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.warn("Failed to load contact settings:", error.message);
  }
  return {
    endpoint: data?.contact_form_endpoint || "",
    successMessage: data?.contact_form_success_message || ""
  };
};

export default async function ContactPage() {
  const settings = await loadContactSettings();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-10">
        <div className="mb-10">
          <p className="text-[#181411] text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            ติดต่อเรา
          </p>
          <p className="text-[#897261] text-lg max-w-2xl font-normal">
            เปลี่ยนพื้นที่ของคุณให้สวยงามด้วยผู้เชี่ยวชาญ ติดต่อ Havenworks
            เพื่อรับคำปรึกษาด้านการปรับปรุงบ้าน
            ออกแบบภายใน และรีโนเวท
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
          <div
            className="w-full h-full min-h-[260px] sm:min-h-[320px] bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-lg border border-[#e6e0db] overflow-hidden"
            data-alt="Google Map showing Havenworks office location in Bangkok"
            data-location="Bangkok, Thailand"
            style={{
              backgroundImage:
                "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDunwYv0aAbJ9rM39XVpJHS3dyCRWTXI3bGcnzWBeq2DfL35UUq4KtWSoeOnVuTxpDoc2r_2rYiCoG-qVNZTWVoTkTdXyOk82DpX6ylKSh2laBat51nRXbyzlWQtUXb_mGcFZ0yWf2oFpzx9pakWC1yb_gWfWGezKB5HvNTAsR8bMrWpVpvx1upe4iGBysJw_Po1WYH9MxePfYfoLdGpSYCICCbW4mXXJSDvR338utWkrlDgpGo91zqZf4eoMMIM03dovkB6DE0uCL1\")",
              minHeight: "320px"
            }}
          />

          <div className="flex flex-col h-full">
            <div className="bg-white p-8 rounded-xl border border-[#e6e0db] shadow-lg h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#181411]">
                <span className="material-symbols-outlined text-3xl" style={{ color: "#d32f2f" }}>location_on</span>
                ที่อยู่สำนักงาน
              </h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-[#e6e0db]">
                  <p className="text-lg font-medium leading-relaxed text-[#181411]">
                    99/13 อ่อนนุช 74/3-1 ประเวศ เขตประเวศ กรุงเทพมหานคร 10250
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0" style={{ color: "#d32f2f" }}>
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#897261] uppercase tracking-wider mb-2">โทรหาเรา</p>
                    <p className="text-base font-medium text-[#181411]">+66 (0) 95-771-8825</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0" style={{ color: "#d32f2f" }}>
                    <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#897261] uppercase tracking-wider mb-2">ช่องทางโซเชียล</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://lin.ee/BCoNWSL"
                        className="inline-flex h-[50px] w-[120px] items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-sm transition hover:opacity-90"
                        style={{ backgroundColor: "#00C300" }}
                      >
                        <img
                          src="https://api.iconify.design/simple-icons/line.svg?color=%23ffffff"
                          alt="LINE"
                          className="h-5 w-5 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                        LINE
                      </a>
                      <a
                        href="https://www.facebook.com/havenworksthailand/"
                        className="inline-flex h-[50px] w-[120px] items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-sm transition hover:opacity-90"
                        style={{ backgroundColor: "#1877F2" }}
                      >
                        <img
                          src="https://api.iconify.design/simple-icons/facebook.svg?color=%23ffffff"
                          alt="Facebook"
                          className="h-5 w-5 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                        Facebook
                      </a>
                      <a
                        href="https://www.youtube.com/@HavenService-m1i"
                        className="inline-flex h-[50px] w-[120px] items-center justify-center gap-2 rounded-xl font-semibold text-white shadow-sm transition hover:opacity-90"
                        style={{ backgroundColor: "#FF0000" }}
                      >
                        <img
                          src="https://api.iconify.design/simple-icons/youtube.svg?color=%23ffffff"
                          alt="YouTube"
                          className="h-5 w-5 object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-8 rounded-2xl border border-[#e6e0db] shadow-lg">
            <h3 className="text-2xl font-bold mb-2">บอกรายละเอียดโครงการของคุณ</h3>
            <p className="text-[#897261] mb-8">
              ส่งข้อความหาเรา ทีมงานผู้เชี่ยวชาญจะติดต่อกลับภายใน 24 ชั่วโมง
            </p>
            <ContactForm
              endpoint={settings.endpoint}
              successMessage={settings.successMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
