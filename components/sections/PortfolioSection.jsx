export default function PortfolioSection() {
  return (
    <section className="ds-section" id="portfolio" data-nav-label="ผลงานล่าสุด">
      <div className="ds-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="ds-title text-3xl mb-2">แรงบันดาลใจ</h2>
            <p className="ds-muted">"เรามุ่งมั่นที่จะดูแลและออกแบบพื้นที่ของคุณให้สอดประสานกับไลฟ์สไตล์ที่เติมเต็มความสุขและสะดวกสบายกว่าที่เคย"</p>
          </div>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Cozy corner"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="/assets/images/inspire/1A6C1252-5BEF-45EF-A7A0-7A55F981175E.png"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <h4 className="font-bold text-lg">ห้องนั่งเล่นสไตล์นอร์ดิก</h4>
                <p className="text-sm text-gray-200">รัชดา, กรุงเทพฯ</p>
              </div>
            </div>
          </div>
          <div className="break-inside-avoid bg-primary/5  p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary text-5xl mb-4">format_quote</span>
            <p className="text-lg italic ds-muted mb-6">
              "ประทับใจการทำงานของทีมงานมากค่ะ ติดตั้งรวดเร็ว งานเรียบร้อย แนะนำเลยค่ะ"
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-300 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXWE0kEIRMYRBH8llvfe84nWq9tnpXvbU-sV7E64tt9MPh_Fk-j9T_iUBxXGVa62XkVXhNdXjyMV3zTifg0giqUZ3PgUz_rNHO5zrP-yiaFT-pCy9fm2Gc6_B6UOuf-2u1yEjOYwSFkYt_nHNTVJWcBxcjzGwAV1kugLD7hP0TEk02CWVLgnPKsDwOJA7scdCgBzkH0wZp92AcRzMyHL2AwfLS8DeOjAWbRFj5NN3SGVfomIwAX7SnMNUuT54FyNZ96530MZQKdn5w"
                  alt="คุณสมศรี"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">คุณสมศรี</div>
                <div className="text-xs text-gray-500">เจ้าของบ้าน</div>
              </div>
            </div>
          </div>
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Wallpaper texture"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="/assets/images/inspire/9DA57E07-160A-434B-B87A-34A078E88335.png"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <h4 className="font-bold text-lg">โครงการวอลเปเปอร์หรูหรา</h4>
                <p className="text-sm text-gray-200">ออฟฟิศสาทร</p>
              </div>
            </div>
          </div>
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Bedroom curtains"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="/assets/images/inspire/IMG_1311.JPG"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <h4 className="font-bold text-lg">ห้องนอนสไตล์โมเดิร์น</h4>
                <p className="text-sm text-gray-200">สุขุมวิท 49</p>
              </div>
            </div>
          </div>
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Kids room"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="/assets/images/inspire/IMG_1384.JPG"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <h4 className="font-bold text-lg">ห้องเด็กสุดน่ารัก</h4>
                <p className="text-sm text-gray-200">พระราม 9</p>
              </div>
            </div>
          </div>
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Kitchen details"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="/assets/images/inspire/IMG_1403.JPG"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="text-white">
                <h4 className="font-bold text-lg">ครัวบิวท์อินสั่งทำพิเศษ</h4>
                <p className="text-sm text-gray-200">บางนา</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
