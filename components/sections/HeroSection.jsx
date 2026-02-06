"use client";

import { useEffect, useState } from "react";
import LineCTA from "../ui/LineCTA";

const heroSlides = [
  {
    id: "hero-image-1",
    alt: "Modern minimal living room with warm wood accents",
    url:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDl5uTFJaAojEA8fxgh559xVltb6aWPnEg6OvkJDK7-9sRTM70LD9sOz070MLsUJGT5v_kXW75_V9AAGSB9jOrgfiEJWUMtoXcvfIZ30RicCC_vIXGwxmDhFNPlvCLYgXedy-C4poXFFvCqd20gsaQGzexl6NEIbm1m3xN16F0Iz0bOXboxFqY4W8w9u8g0VpvkRRmtTcjB5LRPpHrxjrllCa8eqvcqVakCDAzdvV0XWrGOkqxWrXF7hGAOl1reAoTDuh1bWtxUIKFg")'
  },
  {
    id: "hero-image-2",
    alt: "Elegant bedroom with soft lighting",
    url:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoogdFXoQOg9w_XWRhRJBcm9Klp6Kzr2fDLowP2Bm4925Ls-Fnvm4BC5sQk7e6mc0PDvan6rRLcRu0ikNY4_HRYE0tiH0rhpdAlh__nnuf4jMfkW34ZeRWakeo00uOJzfGENpZ3tZOIBA_2NXnGdV8u7_bky5nRhD_gtc5LHQy5bl_8XJWEwItmuQwt6hhkekrWD1Z9Iz_QGiYN95OdN2Z1SWIVzIlZRDLn86DxPdehtva5tKzaV6fD0adiZBvr0f8MznG8E13cnXI")'
  },
  {
    id: "hero-image-3",
    alt: "Stylish kitchen with built-in features",
    url:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwwZQANjYHsqsNGZvUPPUmZL0Sw7BXmvXS7J28Klxyt1jk8Y_lIkNXrjlx74iLjQAdgnD1gxGqzxT_NyIdtLYUBKvnXb3-wvnxRSx2kJAAKarik2cRfFhIg4XYVejP8bdGpX3dshPRoKMbzEX06NTBLF3SMFNICVvOCISABvMsGWiH4ZJt5mGuoHWATaDwBys5qLFyCxNiesph0j3f1zS23HvaCc45zudSf99vCnqHqRe8rUSH_p6vY3DzthgVMgrNxxHIeGd8SQDd")'
  }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSetIndex = (index) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="hero-section"
      data-nav-label="หน้าแรก"
      data-hero-react="true"
      className="relative w-full h-auto lg:h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-background-light  mt-0 pt-0"
    >
      <div
        id="hero-image-container"
        className="w-full lg:w-1/2 h-[45vh] sm:h-[50vh] lg:h-full relative overflow-hidden group"
      >
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              data-alt={slide.alt}
              id={slide.id}
              style={{ backgroundImage: slide.url }}
            />
          );
        })}

        <div id="hero-slider-controls" className="absolute bottom-6 left-6 flex gap-2 z-10">
          <button
            type="button"
            className={`size-3 rounded-full transition-colors cursor-pointer ${
              activeIndex === 0 ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
            aria-label="ดูภาพตัวอย่าง 1"
            data-hero-index="0"
            onClick={() => handleSetIndex(0)}
          />
          <button
            type="button"
            className={`size-3 rounded-full transition-colors cursor-pointer ${
              activeIndex === 1 ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
            aria-label="ดูภาพตัวอย่าง 2"
            data-hero-index="1"
            onClick={() => handleSetIndex(1)}
          />
          <button
            type="button"
            className={`size-3 rounded-full transition-colors cursor-pointer ${
              activeIndex === 2 ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
            aria-label="ดูภาพตัวอย่าง 3"
            data-hero-index="2"
            onClick={() => handleSetIndex(2)}
          />
        </div>

        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between z-10">
          <button
            type="button"
            data-hero-control="prev"
            aria-label="ภาพก่อนหน้า"
            className="size-10 rounded-full bg-white/80 hover:bg-white text-[#181411] shadow-md flex items-center justify-center transition-colors"
            onClick={() => handleSetIndex(activeIndex - 1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            data-hero-control="next"
            aria-label="ภาพถัดไป"
            className="size-10 rounded-full bg-white/80 hover:bg-white text-[#181411] shadow-md flex items-center justify-center transition-colors"
            onClick={() => handleSetIndex(activeIndex + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        id="hero-text-container"
        className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-6 lg:px-20 py-10 overflow-visible lg:overflow-y-auto"
      >
        <div id="hero-text-content" className="flex flex-col gap-6 max-w-xl">
          <span className="ds-eyebrow">
            พร้อมตกแต่งพื้นที่ในฝันของคุณแล้วหรือยัง
          </span>
          <h1 className="ds-title text-3xl lg:text-5xl tracking-[-0.033em] leading-[1.25] lg:leading-[1.2]">
            HavenWorks บริการติดตั้ง ฉากกั้นห้อง ผ้าม่านและต่อเติมแบบครบวงจร
          </h1>
          <p className="ds-body text-lg leading-relaxed">
            ทีมงานประสบการณ์สูง การันตีผลงาน พร้อมให้คำแนะนำ เพื่อสร้างสถานที่ ที่ใช่สำหรับคุณ
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <LineCTA
              className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary/20"
              color="#dc2626"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
