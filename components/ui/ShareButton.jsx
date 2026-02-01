"use client";

import { useState } from "react";

export default function ShareButton({ title = "", className = "" }) {
  const [status, setStatus] = useState("");

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("คัดลอกลิงก์แล้ว");
        setTimeout(() => setStatus(""), 2000);
        return;
      }
    } catch (error) {
      // Fall through to prompt if share/copy fails.
    }

    window.prompt("คัดลอกลิงก์นี้เพื่อแชร์:", url);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className}
      aria-label="แชร์บทความ"
    >
      <span className="material-symbols-outlined text-[16px]">share</span>
      <span>{status || "แชร์บทความ"}</span>
    </button>
  );
}
