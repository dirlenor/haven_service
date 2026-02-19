"use client";

import { useState } from "react";

export default function ContactForm({ endpoint = "", successMessage = "" }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!endpoint) {
      setStatus("ยังไม่ได้ตั้งค่าการเชื่อมต่อ Google Sheet");
      return;
    }
    setSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      setStatus(successMessage || "ส่งข้อมูลเรียบร้อยแล้ว");
      form.reset();
    } catch (error) {
      setStatus("ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#181411]">ชื่อ-นามสกุล</span>
          <input
            className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
            placeholder="ชื่อ-นามสกุล"
            type="text"
            name="name"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#181411]">อีเมล</span>
          <input
            className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
            placeholder="email@example.com"
            type="email"
            name="email"
            required
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#181411]">เบอร์โทรศัพท์</span>
          <input
            className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
            placeholder="08x-xxx-xxxx"
            type="tel"
            name="phone"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#181411]">ประเภทบริการ</span>
          <input
            className="w-full rounded-lg border-[#e6e0db] h-12 focus:ring-primary focus:border-primary"
            placeholder="เช่น ฉากกั้นห้อง, มูลี่, ผ้าม่าน"
            type="text"
            name="service_type"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold text-[#181411]">ข้อความ</span>
        <textarea
          className="w-full rounded-lg border-[#e6e0db] focus:ring-primary focus:border-primary"
          placeholder="อธิบายโครงการในฝันของคุณโดยย่อ..."
          rows={4}
          name="message"
          required
        />
      </label>
      <button
        className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        type="submit"
        disabled={submitting}
      >
        <span>{submitting ? "กำลังส่ง..." : "ส่งข้อความ"}</span>
        <span className="material-symbols-outlined">send</span>
      </button>
      {!endpoint ? (
        <p className="text-xs text-[#b71c1c] text-center mt-4 italic">
          ยังไม่ได้ตั้งค่า Apps Script ใน CMS
        </p>
      ) : null}
      {status ? (
        <p className="text-xs text-[#2e7d32] text-center mt-4 italic" aria-live="polite">
          {status}
        </p>
      ) : null}
      <p className="text-xs text-[#897261] text-center mt-4 italic">
        การส่งแบบฟอร์มนี้แสดงว่าคุณยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขการบริการของเรา
      </p>
    </form>
  );
}
