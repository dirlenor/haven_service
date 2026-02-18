"use client";

import LineCTA from "../ui/LineCTA";

const heroImages = [
  {
    id: "hero-image-1",
    alt: "Havenworks interior inspiration 1",
    url: "/assets/images/hero_img/hero-marquee-1.jpg"
  },
  {
    id: "hero-image-2",
    alt: "Havenworks interior inspiration 2",
    url: "/assets/images/hero_img/hero-marquee-2.jpg"
  },
  {
    id: "hero-image-3",
    alt: "Havenworks interior inspiration 3",
    url: "/assets/images/hero_img/hero-marquee-3.jpg"
  },
  {
    id: "hero-image-4",
    alt: "Havenworks interior inspiration 4",
    url: "/assets/images/hero_img/hero-marquee-4.jpg"
  },
  {
    id: "hero-image-5",
    alt: "Havenworks interior inspiration 5",
    url: "/assets/images/hero_img/hero-marquee-5.jpg"
  },
  {
    id: "hero-image-6",
    alt: "Havenworks interior inspiration 6",
    url: "/assets/images/hero_img/hero-marquee-6.jpg"
  },
  {
    id: "hero-image-7",
    alt: "Havenworks interior inspiration 7",
    url: "/assets/images/hero_img/hero-marquee-7.jpg"
  }
];

const marqueeImages = heroImages.map((image, index) => ({
  id: `${image.id}-marquee-${index}`,
  alt: image.alt,
  url: image.url
}));

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      data-nav-label="หน้าแรก"
      className="relative h-auto w-full overflow-hidden bg-background-light pb-[60px]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-8 md:py-4">
        <div className="mt-12 flex flex-col items-center text-center">
          <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary md:text-xs">
            พร้อมตกแต่งพื้นที่ในฝันของคุณแล้วหรือยัง
          </span>

          <h1 className="font-thai text-[2rem] font-bold leading-[1.3] tracking-tight text-industrial-black sm:text-[2.15rem] md:text-[3rem] md:leading-[1.24]">
            HavenWorks บริการติดตั้ง
            <br className="hidden md:block" />
            ฉากกั้นห้อง ผ้าม่านและต่อเติมแบบครบวงจร
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:mt-5 md:text-base">
            ทีมงานประสบการณ์สูง การันตีผลงาน พร้อมให้คำแนะนำ
            <br className="hidden md:block" />
            เพื่อสร้างสถานที่ ที่ใช่สำหรับคุณ
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <LineCTA
              className="h-12 w-full px-8 text-base shadow-lg shadow-red-600/20 sm:w-auto"
              color="#dc2626"
            />
          </div>
        </div>

        <div className="hero-marquee-mask relative left-1/2 mt-[64px] w-screen -translate-x-1/2 overflow-hidden md:mt-[64px]">
          <div className="hero-marquee-track">
            {[0, 1].map((setIndex) => (
              <div
                key={`hero-set-${setIndex}`}
                className="hero-marquee-set"
                aria-hidden={setIndex === 1}
              >
                {marqueeImages.map((image) => (
                  <div
                    key={`${image.id}-${setIndex}`}
                    className="hero-marquee-card aspect-square w-[52vw] max-w-[340px] min-w-[210px] shrink-0 overflow-hidden rounded-2xl shadow-md sm:w-[40vw] md:w-[28vw] lg:w-[22vw]"
                  >
                    <img
                      src={image.url}
                      alt={setIndex === 0 ? image.alt : ""}
                      loading="eager"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-marquee-loop {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .hero-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation: hero-marquee-loop 36s linear infinite;
        }

        .hero-marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 10%,
            #000 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 10%,
            #000 90%,
            transparent 100%
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
        }

        .hero-marquee-set {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-right: 14px;
        }

        @media (min-width: 768px) {
          .hero-marquee-set {
            gap: 22px;
            padding-right: 22px;
          }
        }
      `}</style>
    </section>
  );
}
