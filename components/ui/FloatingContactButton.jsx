"use client";

import { useEffect, useState } from "react";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setClosing(false);
      setAnimateIn(false);
      const frame = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(frame);
    }
    if (!open && closing) {
      return undefined;
    }
    if (!open) {
      setAnimateIn(false);
      return undefined;
    }
    return undefined;
  }, [open, closing]);

  useEffect(() => {
    if (!open && !closing) {
      setClosing(true);
      const timer = setTimeout(() => setClosing(false), 260);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, closing]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`absolute bottom-16 right-0 flex flex-col items-center gap-2 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <a
          href="https://www.facebook.com/havenworksthailand/"
          className={`floating-action inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg hover:scale-105 ${
            animateIn ? "floating-action--in" : closing ? "floating-action--out" : "floating-action--hidden"
          }`}
          style={{ backgroundColor: "var(--ds-color-primary)" }}
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M13 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h2v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
          </svg>
        </a>
        <a
          href="https://lin.ee/BCoNWSL"
          className={`floating-action inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg hover:scale-105 ${
            animateIn ? "floating-action--in" : closing ? "floating-action--out" : "floating-action--hidden"
          }`}
          style={{ backgroundColor: "var(--ds-color-primary)" }}
          aria-label="LINE"
        >
          <img
            src="https://api.iconify.design/simple-icons/line.svg?color=%23ffffff"
            alt=""
            className="h-6 w-6"
            loading="lazy"
          />
        </a>
        <a
          href="tel:+66957718825"
          className={`floating-action inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg hover:scale-105 ${
            animateIn ? "floating-action--in" : closing ? "floating-action--out" : "floating-action--hidden"
          }`}
          style={{ backgroundColor: "var(--ds-color-primary)" }}
          aria-label="โทรศัพท์"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8c1.2 2.3 3.1 4.2 5.4 5.4l1.8-1.8c.2-.2.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 1 .4 1 .9V19c0 .6-.4 1-1 1C10 20 4 14 4 6c0-.6.4-1 1-1h3.4c.5 0 .9.4.9 1 0 1.1.2 2.1.5 3.1.1.3 0 .7-.2.9l-2 1.8z" />
          </svg>
        </a>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="floating-contact-hint"
          aria-label="เปิดเมนูติดต่อ"
          aria-expanded={open}
        >
          ติดต่อเราที่นี่เลยค่ะ
        </button>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--ds-color-primary)" }}
          aria-label="ติดต่อสอบถาม"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M4 3h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4h12v2H6V7zm0 4h9v2H6v-2z" />
          </svg>
        </button>
      </div>
      <style>{`
        .floating-contact-hint {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          border-radius: 9999px;
          padding: 10px 16px;
          background: #edf1f5;
          color: #0f172a;
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.14);
          transition: transform 180ms ease;
        }
        .floating-contact-hint::after {
          content: "";
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid #edf1f5;
        }
        .floating-contact-hint:hover {
          transform: translateY(-1px);
        }
        .floating-action {
          transform: translateY(8px);
          opacity: 0;
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .floating-action--in {
          opacity: 1;
          transform: translateY(0);
        }
        .floating-action--out {
          animation: float-pop-out 240ms ease forwards;
        }
        .floating-action:nth-child(1) {
          transition-delay: 120ms;
          animation-delay: 0ms;
        }
        .floating-action:nth-child(2) {
          transition-delay: 60ms;
          animation-delay: 40ms;
        }
        .floating-action:nth-child(3) {
          transition-delay: 0ms;
          animation-delay: 80ms;
        }
        .floating-action--hidden {
          opacity: 0;
          transform: translateY(8px);
        }
        @keyframes float-pop-out {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          35% {
            opacity: 1;
            transform: translateY(-6px);
          }
          100% {
            opacity: 0;
            transform: translateY(6px);
          }
        }
      `}</style>
    </div>
  );
}
