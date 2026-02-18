export const metadata = {
  title: "Havenworks - บริการทั้งหมด"
};

export default function AllServicesPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              บริการครบวงจร
            </span>
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-industrial-black leading-tight">
              บริการของเรา
            </h2>
            <div className="font-display text-2xl text-gray-400 font-medium">All Services</div>
          </div>
          <div className="max-w-xl pb-2">
            <p className="text-gray-500 text-lg leading-relaxed">
              การผสมผสานระหว่างความแม่นยำทางวิศวกรรมและความงามทางสุนทรียศาสตร์ เปลี่ยนวัสดุคุณภาพให้เป็นงานศิลปะที่ใช้งานได้จริงสำหรับการตกแต่งภายในยุคใหม่ที่ลงตัว
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 mb-24">
        <div className="grid grid-cols-1 gap-8">
          <a
            className="group flex flex-col rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            href="/service-curtains"
          >
            <img
              alt="Curtains & Blinds"
              className="h-64 w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApi2CxZcES08srhoQL-lOpvfNWrWS0vN1GOM9uhRSTRUZyxmBAzTdtx3BM_87IOBKUjGpqcRKuYqeqKJHS9X848cZq8viVwq_dGXqKgwt8mwdBcB0lb6OnUBSiMvOEikfh8IX7zdPe59IHhEL3gDFa-rg7nBm0gdUw87KQPG8oc9G5pdEHzVgm-w5b_2lSywyesmZqD8RkBCPI6MyxWrbvg2AQuF_HMLkrDkcr0sdXuWmumnjbFKfekbyB5vDkKo00scaSJWtp3gxv"
            />
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-3 text-industrial-black">ผ้าม่านและมู่ลี่</h3>
              <p className="text-base text-gray-600 leading-relaxed">Curtains & Blinds</p>
              <p className="text-sm text-[#897261] mt-3">
                ระบบควบคุมแสงที่ออกแบบมาอย่างปราณีต เพื่อความสวยงามและใช้งานง่ายสำหรับบ้านทันสมัย
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
