export default function PortfolioSection() {
  return (
    <section className="ds-section" id="portfolio" data-nav-label="ผลงานล่าสุด">
      <div className="ds-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="ds-title text-3xl mb-2">แรงบันดาลใจ</h2>
            <p className="ds-muted">Inspiration</p>
          </div>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div className="break-inside-avoid rounded-2xl overflow-hidden group relative">
            <img
              alt="Cozy corner"
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5LbwLJC4JP2_I9XPdytLwy4gUXRd8OjvmHK0MiCPLTx9wIMMyK42a4QDt1TeKkGdFpCTiYCYxnARoi3k34pwtcEV4KYBFN2amkpR1yVUmn8cPaxuIwZvndC5aO0q1GQcWyG0qY9qmthd1x3__UOhKR1YHPJciq-npWbGLRbtgqg-lWTqOMl7SiRpzGJIUlS_NwpCRZ0XwxQDyoNa7j4dN8A_bwI8ZB9FaEbd1MB2YRrpCOkt5ZN8wMQPphDD8F2892Cy5DKsFn635"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbobEuYerVlSJ-DRDlw597E1iB6a_GD-Ug7pvsNTY8eioDdbdKrt2eAbSiX1xlibMxB6XYcmPVh3aG1L8CdYrssZs9ThI9pQBPvHbqvEvnY95p19qIEmpnoQZQ6q93pXoZAuJqigAxBsQEf9nSPcyzhhlmY-lD4MBoK4NWcYn6e-pSg7_hUQm6rWHzMJNzTB3fwj4IL_wJdXlLR6Zdd8A3c_kq5eQz7CeLjSlQCi-MyhWnLZqTfdHWNxlA1NYJymttb654gOnMTBwf"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHCz_FbiYnr9ijyUE_DxBE0MEwAa3eWSbZvNIgrw2TIv3p4kPwCl8_qRNekKYmSaw77Pd0sL1ZnJ6csOsovZw6QYYzy7l9geUUUIl9v00IU23SSwWuvsWCv5ptRj6l0WukSXJPJr3Yglq2wu4GBaipRQQoA4rR2Ll0K0K6iuBOr_cPF4BYJ_bhHmOR-kiSNJP0asQydBYfmfMTVxj04siYh7wYq_wpWA6m9lnFfTrzZ3sEMyAN74wWKKjrNWHyC8mG9Ev4p-OHfRKI"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBlhaSvT3K22sSh3C5iUr570Cf_nFpolu5GhzyxAxEMsC25ucbT661fTh4WU6N6try4R464hylU6a9KU2FuuVwhaUZvJg_3nTq7ivI90Ymm8IoKPdNSOWbD_983-BJZmNj7rXjIVw8PZee6b9YvBIH4uiBNJ410yZGAfdEZEbu92ur85MejHF8TiIUirbnyxte2QdFjSgsHdt14mSnZPq-hh45qel3Waj9gvrApdwpvn-Cxnd9cgTnNdtMigpA2Ph0AsiCN7ynicLv"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcoOOTzcsuunWt-fH0rdP8Zn71NR7G9GO_ooR5T2nbXsehhkOS4PrTSsdvX-ieTozCORcYMi6q904ig_DgL4bucJm04xpfQYWPhjPUqY1V_F4dVsnHKEiv1xY6vJoZdbCbLlW3JTJb4AO9ATCR_GFEdKW_T_9aacqMMvqTRnTFujaGVLZ0VDLozoMAcPOExB37Pu6jzBYhef22hsSNd59jzcRbUgL6zVl5FXl06Va_ej-5Xc4RohB5iTH0pJUWJezM8_pPmX5Cflv7"
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
