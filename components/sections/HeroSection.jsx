"use client";

import { useEffect, useState } from "react";
import LineCTA from "../ui/LineCTA";

const heroSlides = [
  {
    id: "hero-image-1",
    alt: "Havenworks Room Divider Installation",
    url:
      'url("/legacy/assets/images/S__5160978_0.jpg")'
  },
  {
    id: "hero-image-2",
    alt: "Havenworks Roller Blinds Installation",
    url:
      'url("/legacy/assets/images/S__5160976_0.jpg")'
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
