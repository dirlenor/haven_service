"use client";

import { useEffect, useState } from "react";

const SCRIPT_ID = "google-translate-script";
const WIDGET_ID = "google_translate_element";

const readActiveLanguage = () => {
  if (typeof document === "undefined") {
    return "th";
  }
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) {
    return "th";
  }
  const value = decodeURIComponent(match[1] || "");
  return value.endsWith("/en") ? "en" : "th";
};

const writeTranslateCookie = (lang) => {
  const value = `/th/${lang}`;
  document.cookie = `googtrans=${value};path=/`;
  if (window.location.hostname !== "localhost") {
    document.cookie = `googtrans=${value};path=/;domain=.${window.location.hostname}`;
  }
};

export default function QuickTranslateToggle({ fullWidth = false, mountWidget = false }) {
  const [activeLang, setActiveLang] = useState("th");

  useEffect(() => {
    setActiveLang(readActiveLanguage());

    if (!mountWidget) {
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }
      const container = document.getElementById(WIDGET_ID);
      if (container && !container.childNodes.length) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "th",
            includedLanguages: "th,en",
            autoDisplay: false
          },
          WIDGET_ID
        );
      }
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, [mountWidget]);

  const changeLanguage = (lang) => {
    setActiveLang(lang);
    writeTranslateCookie(lang);

    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
      return;
    }

    window.location.reload();
  };

  const baseButtonClass =
    "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      <div className={`inline-flex items-center gap-1 rounded-lg bg-[#f5f5f5] p-1 ${fullWidth ? "w-full" : ""}`}>
        <button
          type="button"
          className={`${baseButtonClass} ${
            activeLang === "th"
              ? "bg-white text-[#181411] border-gray-200"
              : "bg-transparent text-[#6b584a] border-transparent hover:text-[#181411]"
          } ${fullWidth ? "flex-1" : ""}`}
          onClick={() => changeLanguage("th")}
          aria-pressed={activeLang === "th"}
        >
          ไทย
        </button>
        <button
          type="button"
          className={`${baseButtonClass} ${
            activeLang === "en"
              ? "bg-white text-[#181411] border-gray-200"
              : "bg-transparent text-[#6b584a] border-transparent hover:text-[#181411]"
          } ${fullWidth ? "flex-1" : ""}`}
          onClick={() => changeLanguage("en")}
          aria-pressed={activeLang === "en"}
        >
          EN
        </button>
      </div>
      {mountWidget ? <div id={WIDGET_ID} style={{ display: "none" }} aria-hidden="true" /> : null}
    </div>
  );
}
