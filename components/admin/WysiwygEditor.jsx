"use client";

import { useEffect, useRef } from "react";

const commands = [
  { label: "B", title: "Bold", command: "bold" },
  { label: "I", title: "Italic", command: "italic" },
  { label: "U", title: "Underline", command: "underline" },
  { label: "H2", title: "Heading", command: "formatBlock", value: "h2" },
  { label: "UL", title: "List", command: "insertUnorderedList" },
  { label: "OL", title: "Ordered", command: "insertOrderedList" }
];

const fontSizes = [
  { label: "เล็ก", value: "2" },
  { label: "ปกติ", value: "3" },
  { label: "ใหญ่", value: "4" },
  { label: "ใหญ่มาก", value: "5" }
];

export default function WysiwygEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleCommand = (command, commandValue) => {
    document.execCommand(command, false, commandValue);
    editorRef.current?.focus();
    onChange?.(editorRef.current?.innerHTML || "");
  };

  const handleInput = () => {
    onChange?.(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 px-3 py-2">
        {commands.map((item) => (
          <button
            key={item.command + item.label}
            type="button"
            title={item.title}
            className="px-2 py-1 text-xs font-bold rounded border border-gray-200 hover:bg-[#f4f2f0]"
            onClick={() => handleCommand(item.command, item.value)}
          >
            {item.label}
          </button>
        ))}
        <select
          className="ml-auto rounded border border-gray-200 text-xs font-bold px-2 py-1 bg-white"
          onChange={(event) => handleCommand("fontSize", event.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            ขนาดตัวอักษร
          </option>
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={editorRef}
        className="min-h-[220px] px-4 py-3 text-sm leading-relaxed outline-none cms-content max-w-none"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      />
    </div>
  );
}
