export default function FacebookSection() {
  return (
    <section
      id="facebook-section"
      data-nav-label="Facebook"
      className="ds-section bg-white border-t border-gray-100"
    >
      <div className="ds-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="ds-title text-2xl flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#1877F2]">thumb_up</span>
              ติดตามเราบน Facebook
            </h2>
            <p className="ds-muted">เข้าร่วมชุมชนของเราเพื่อรับข่าวสารและแรงบันดาลใจ</p>
          </div>
          <a
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1877F2] text-white font-bold hover:bg-[#166fe5] transition-colors shadow-lg shadow-blue-500/20"
            href="#"
          >
            เยี่ยมชมเพจ Facebook ของเรา
          </a>
        </div>

        <div className="ds-grid ds-grid-3">
          <div className="ds-card p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full overflow-hidden border border-gray-200 ">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXWE0kEIRMYRBH8llvfe84nWq9tnpXvbU-sV7E64tt9MPh_Fk-j9T_iUBxXGVa62XkVXhNdXjyMV3zTifg0giqUZ3PgUz_rNHO5zrP-yiaFT-pCy9fm2Gc6_B6UOuf-2u1yEjOYwSFkYt_nHNTVJWcBxcjzGwAV1kugLD7hP0TEk02CWVLgnPKsDwOJA7scdCgBzkH0wZp92AcRzMyHL2AwfLS8DeOjAWbRFj5NN3SGVfomIwAX7SnMNUuT54FyNZ96530MZQKdn5w"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">Thai Haven Service</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  2 ชั่วโมงที่แล้ว · <span className="material-symbols-outlined text-[12px]">public</span>
                </p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <p className="text-sm ds-muted mb-4 leading-relaxed">
              เปลี่ยนโฉมห้องนั่งเล่นให้ดูอบอุ่นและทันสมัย ด้วยพื้นไม้ SPC
              และผ้าม่านโปร่งแสงที่ช่วยกรองแสงแดดยามเช้า 🏡✨
              สนใจสอบถามรายละเอียดเพิ่มเติมได้เลยครับ
            </p>
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-200">
              <img
                alt="Living room renovation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl5uTFJaAojEA8fxgh559xVltb6aWPnEg6OvkJDK7-9sRTM70LD9sOz070MLsUJGT5v_kXW75_V9AAGSB9jOrgfiEJWUMtoXcvfIZ30RicCC_vIXGwxmDhFNPlvCLYgXedy-C4poXFFvCqd20gsaQGzexl6NEIbm1m3xN16F0Iz0bOXboxFqY4W8w9u8g0VpvkRRmtTcjB5LRPpHrxjrllCa8eqvcqVakCDAzdvV0XWrGOkqxWrXF7hGAOl1reAoTDuh1bWtxUIKFg"
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 ">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="flex -space-x-1">
                  <div className="size-4 rounded-full bg-[#1877F2] flex items-center justify-center border border-white">
                    <span className="material-symbols-outlined text-[8px] text-white">thumb_up</span>
                  </div>
                  <div className="size-4 rounded-full bg-red-500 flex items-center justify-center border border-white">
                    <span className="material-symbols-outlined text-[8px] text-white">favorite</span>
                  </div>
                </div>
                <span className="ml-1">128</span>
              </div>
              <div className="text-xs text-gray-500">12 ความเห็น · 4 การแชร์</div>
            </div>
          </div>

          <div className="ds-card p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full overflow-hidden border border-gray-200 ">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXWE0kEIRMYRBH8llvfe84nWq9tnpXvbU-sV7E64tt9MPh_Fk-j9T_iUBxXGVa62XkVXhNdXjyMV3zTifg0giqUZ3PgUz_rNHO5zrP-yiaFT-pCy9fm2Gc6_B6UOuf-2u1yEjOYwSFkYt_nHNTVJWcBxcjzGwAV1kugLD7hP0TEk02CWVLgnPKsDwOJA7scdCgBzkH0wZp92AcRzMyHL2AwfLS8DeOjAWbRFj5NN3SGVfomIwAX7SnMNUuT54FyNZ96530MZQKdn5w"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">Thai Haven Service</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  เมื่อวานนี้ เวลา 9:30 น. · <span className="material-symbols-outlined text-[12px]">public</span>
                </p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <p className="text-sm ds-muted mb-4 leading-relaxed">
              🎉 โปรโมชั่นพิเศษเดือนนี้! ติดตั้งวอลเปเปอร์รับส่วนลดทันที 15%
              พร้อมฟรีค่าประเมินหน้างาน
              ทักแชทจองคิวได้เลยครับ
            </p>
            <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden mb-4 aspect-[4/3]">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbobEuYerVlSJ-DRDlw597E1iB6a_GD-Ug7pvsNTY8eioDdbdKrt2eAbSiX1xlibMxB6XYcmPVh3aG1L8CdYrssZs9ThI9pQBPvHbqvEvnY95p19qIEmpnoQZQ6q93pXoZAuJqigAxBsQEf9nSPcyzhhlmY-lD4MBoK4NWcYn6e-pSg7_hUQm6rWHzMJNzTB3fwj4IL_wJdXlLR6Zdd8A3c_kq5eQz7CeLjSlQCi-MyhWnLZqTfdHWNxlA1NYJymttb654gOnMTBwf"
                alt="โปรโมชั่นวอลเปเปอร์"
              />
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOLJrnVnub-GyxX8prYAwY57cdtZBLJAvVVs62WJ5eQykXAI5GzTU_LvACMN-17VB6pVNxrgvbX9Vr1WnmPIwOHb6CqLhZ8D4MiqfvZfh6TUrvpVWBTIxgA-x9-rv9ZA7WXMPy9iKETCZwdJNqg8rT8mme2bCmbejN7LAyjtrO0RuI2_EPTfPKcOnFfAFgkdKf52zy367yEr3cLIC08-Lhn5uYgXOF4y2zS7b4yCtaQ6cdHptJvr1yK6RQjMjVw6lQiDHRYpY0ElQx"
                alt="งานติดตั้ง"
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 ">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="flex -space-x-1">
                  <div className="size-4 rounded-full bg-[#1877F2] flex items-center justify-center border border-white">
                    <span className="material-symbols-outlined text-[8px] text-white">thumb_up</span>
                  </div>
                </div>
                <span className="ml-1">84</span>
              </div>
              <div className="text-xs text-gray-500">24 ความเห็น · 2 การแชร์</div>
            </div>
          </div>

          <div className="ds-card p-4 shadow-sm hover:shadow-md transition-shadow md:hidden lg:block">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full overflow-hidden border border-gray-200 ">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXWE0kEIRMYRBH8llvfe84nWq9tnpXvbU-sV7E64tt9MPh_Fk-j9T_iUBxXGVa62XkVXhNdXjyMV3zTifg0giqUZ3PgUz_rNHO5zrP-yiaFT-pCy9fm2Gc6_B6UOuf-2u1yEjOYwSFkYt_nHNTVJWcBxcjzGwAV1kugLD7hP0TEk02CWVLgnPKsDwOJA7scdCgBzkH0wZp92AcRzMyHL2AwfLS8DeOjAWbRFj5NN3SGVfomIwAX7SnMNUuT54FyNZ96530MZQKdn5w"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">Thai Haven Service</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  3 วันที่แล้ว · <span className="material-symbols-outlined text-[12px]">public</span>
                </p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <p className="text-sm ds-muted mb-4 leading-relaxed">
              ติดตั้งเฟอร์นิเจอร์บิวท์อินที่สุขุมวิท 39
              การใช้พื้นที่อย่างเหมาะสมเป็นสิ่งสำคัญสำหรับการใช้ชีวิตในเมือง! 🏙️
            </p>
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-200">
              <img
                alt="Built-in kitchen"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwwZQANjYHsqsNGZvUPPUmZL0Sw7BXmvXS7J28Klxyt1jk8Y_lIkNXrjlx74iLjQAdgnD1gxGqzxT_NyIdtLYUBKvnXb3-wvnxRSx2kJAAKarik2cRfFhIg4XYVejP8bdGpX3dshPRoKMbzEX06NTBLF3SMFNICVvOCISABvMsGWiH4ZJt5mGuoHWATaDwBys5qLFyCxNiesph0j3f1zS23HvaCc45zudSf99vCnqHqRe8rUSH_p6vY3DzthgVMgrNxxHIeGd8SQDd"
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 ">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="flex -space-x-1">
                  <div className="size-4 rounded-full bg-[#1877F2] flex items-center justify-center border border-white">
                    <span className="material-symbols-outlined text-[8px] text-white">thumb_up</span>
                  </div>
                  <div className="size-4 rounded-full bg-yellow-500 flex items-center justify-center border border-white">
                    <span className="material-symbols-outlined text-[8px] text-white">sentiment_satisfied</span>
                  </div>
                </div>
                <span className="ml-1">215</span>
              </div>
              <div className="text-xs text-gray-500">8 ความเห็น · 1 การแชร์</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1877F2] text-white font-bold w-full shadow-lg"
            href="#"
          >
            เยี่ยมชมเพจ Facebook ของเรา
          </a>
        </div>
      </div>
    </section>
  );
}
