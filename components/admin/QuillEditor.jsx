"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const sizeOptions = ["small", false, "large", "huge"];

const toolbarOptions = [
  [{ size: sizeOptions }],
  ["bold", "italic", "underline"],
  [{ header: 2 }, { header: 3 }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
  ["clean"]
];

const modules = {
  toolbar: toolbarOptions
};

const formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "header",
  "list",
  "bullet",
  "link",
  "image"
];

export default function QuillEditor({ value, onChange }) {
  const quillRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    const configureSize = async () => {
      try {
        const module = await import("react-quill");
        const Quill = module?.Quill;
        if (!Quill || !isActive || Quill.__sizeConfigured) {
          return;
        }
        const Size = Quill.import("formats/size");
        Size.whitelist = ["small", "large", "huge"];
        Quill.register(Size, true);
        Quill.__sizeConfigured = true;
      } catch {
        // ignore missing quill module
      }
    };

    configureSize();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (quillRef.current?.getEditor) {
      const editor = quillRef.current.getEditor();
      if (editor?.options?.modules?.toolbar?.container) {
        editor.options.modules.toolbar.container = toolbarOptions;
      }
    }
  }, []);

  return (
    <div className="cms-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
