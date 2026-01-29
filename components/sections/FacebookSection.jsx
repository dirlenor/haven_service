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
            href="https://www.facebook.com/haven86/"
            target="_blank"
            rel="noreferrer"
          >
            เยี่ยมชมเพจ Facebook ของเรา
          </a>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full md:max-w-[50%] md:mx-auto">
          <div className="w-full overflow-hidden rounded-xl">
            <iframe
              title="Havenworks Thailand Facebook Page"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhaven86%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="100%"
              height="500"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1877F2] text-white font-bold w-full shadow-lg"
            href="https://www.facebook.com/haven86/"
            target="_blank"
            rel="noreferrer"
          >
            เยี่ยมชมเพจ Facebook ของเรา
          </a>
        </div>
      </div>
    </section>
  );
}
