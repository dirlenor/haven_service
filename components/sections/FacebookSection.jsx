export default function FacebookSection() {
  const shouldRenderSocialEmbeds =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_SOCIAL_EMBEDS === "true";

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
              ติดตามช่องทางออนไลน์ของเรา
            </h2>
            <p className="ds-muted">เข้าร่วมชุมชนของเราเพื่อรับข่าวสารและแรงบันดาลใจ</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1877F2] text-white font-bold hover:bg-[#166fe5] transition-colors shadow-lg shadow-blue-500/20"
              href="https://www.facebook.com/haven86/"
              target="_blank"
              rel="noreferrer"
            >
              เยี่ยมชมเพจ Facebook ของเรา
            </a>
            <a
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF0000] text-white font-bold hover:bg-[#e60000] transition-colors shadow-lg shadow-red-500/20"
              href="https://www.youtube.com/@HavenService-m1i"
              target="_blank"
              rel="noreferrer"
            >
              เยี่ยมชม YouTube
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {shouldRenderSocialEmbeds ? (
            <>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full md:col-span-2">
                <div className="w-full overflow-hidden rounded-xl">
                  <iframe
                    title="Havenworks Facebook Page"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhaven86%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                    width="100%"
                    height="500"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[500px]">
                  <div className="w-full overflow-hidden rounded-xl bg-black">
                    <div className="w-full h-[360px] md:h-[500px]">
                      <iframe
                        title="Havenworks YouTube Shorts 1"
                        src="https://www.youtube.com/embed/wMWZB_4xlHU"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-hidden rounded-xl bg-black">
                    <div className="w-full h-[360px] md:h-[500px]">
                      <iframe
                        title="Havenworks YouTube Shorts 2"
                        src="https://www.youtube.com/embed/bXKZGjcyj_Q"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm w-full md:col-span-5">
              <p className="text-sm text-[#6b584a]">
                ซ่อน Social Embed ระหว่างพัฒนาเพื่อลด console noise จากสคริปต์ third-party
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col md:hidden gap-3">
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1877F2] text-white font-bold w-full shadow-lg"
            href="https://www.facebook.com/haven86/"
            target="_blank"
            rel="noreferrer"
          >
            เยี่ยมชมเพจ Facebook ของเรา
          </a>
          <a
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FF0000] text-white font-bold w-full shadow-lg"
            href="https://www.youtube.com/@HavenService-m1i"
            target="_blank"
            rel="noreferrer"
          >
            เยี่ยมชม YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
