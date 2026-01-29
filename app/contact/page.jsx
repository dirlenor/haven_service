export const metadata = {
  title: "Thai Haven Service - Contact Us"
};

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-10">
        <div className="mb-10">
          <p className="text-[#181411] text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            ติดต่อเรา
          </p>
          <p className="text-[#897261] text-lg max-w-2xl font-normal">
            เปลี่ยนพื้นที่ของคุณให้สวยงามด้วยผู้เชี่ยวชาญ ติดต่อ Thai Haven Service
            เพื่อรับคำปรึกษาด้านการปรับปรุงบ้าน
            ออกแบบภายใน และรีโนเวท
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
          <div
            className="w-full h-full min-h-[260px] sm:min-h-[320px] bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-lg border border-[#e6e0db] overflow-hidden"
            data-alt="Google Map showing Thai Haven Service office location in Bangkok"
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
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                ที่อยู่สำนักงาน
              </h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-[#e6e0db]">
                  <p className="text-lg font-medium leading-relaxed text-[#181411]">
                    123 ถนนสุขุมวิท, คลองเตย,<br />
                    กรุงเทพฯ 10110
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#897261] uppercase tracking-wider mb-2">โทรหาเรา</p>
                    <p className="text-base font-medium text-[#181411]">+66 (0) 2 123 4567</p>
                    <p className="text-base font-medium text-[#181411]">+66 (0) 81 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#897261] uppercase tracking-wider mb-2">ช่องทางโซเชียล</p>
                    <p className="text-base font-medium text-[#181411]">LINE ID: @thaihaven</p>
                    <p className="text-base font-medium text-[#181411]">FB: Thai Haven Service</p>
                    <p className="text-base font-medium text-[#181411]">IG: @thaihavendesign</p>
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
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#181411]">ชื่อ-นามสกุล</span>
                  <input
                    className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
                    placeholder="ชื่อ-นามสกุล"
                    type="text"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#181411]">อีเมล</span>
                  <input
                    className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
                    placeholder="email@example.com"
                    type="email"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#181411]">เบอร์โทรศัพท์</span>
                  <input
                    className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
                    placeholder="08x-xxx-xxxx"
                    type="tel"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#181411]">ประเภทบริการ</span>
                  <select className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary">
                    <option>ออกแบบตกแต่งภายใน</option>
                    <option>รีโนเวทบ้าน</option>
                    <option>เฟอร์นิเจอร์สั่งทำ</option>
                    <option>พื้นที่เชิงพาณิชย์</option>
                    <option>ปรึกษาเบื้องต้น</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#181411]">ข้อความ</span>
                <textarea
                  className="w-full rounded-lg border-[#e6e0db] focus:ring-primary focus:border-primary"
                  placeholder="อธิบายโครงการในฝันของคุณโดยย่อ..."
                  rows={4}
                />
              </label>
              <button
                className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <span>ส่งข้อความ</span>
                <span className="material-symbols-outlined">send</span>
              </button>
              <p className="text-xs text-[#897261] text-center mt-4 italic">
                การส่งแบบฟอร์มนี้แสดงว่าคุณยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขการบริการของเรา
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
