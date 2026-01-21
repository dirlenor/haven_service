"use client";

import { useEffect, useState } from "react";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

export default function SectionIndicator() {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [copiedClassId, setCopiedClassId] = useState("");
  const [pickedColor, setPickedColor] = useState("");
  const [colorCopied, setColorCopied] = useState(false);
  const [canEyeDropper, setCanEyeDropper] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 12 });

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("main section"));
    const usedIds = new Set();

    const items = nodes
      .filter((section) => section)
      .map((section, index) => {
        let id = section.id;
        if (!id) {
          const firstClass = section.classList[0] || `section-${index + 1}`;
          const base = slugify(firstClass);
          id = base;
          let counter = 1;
          while (usedIds.has(id)) {
            counter += 1;
            id = `${base}-${counter}`;
          }
          section.id = id;
        }
        usedIds.add(id);
        return { id, label: id, className: section.className || "" };
      });

    setSections(items);

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1]
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("section-indicator-position");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.x === "number" && typeof parsed?.y === "number") {
          setPosition({ x: parsed.x, y: parsed.y });
        }
      } catch {
        // ignore malformed storage
      }
    }
  }, []);

  useEffect(() => {
    setCanEyeDropper(Boolean(window.EyeDropper));
  }, []);

  const updatePosition = (next) => {
    setPosition(next);
    window.localStorage.setItem("section-indicator-position", JSON.stringify(next));
  };

  const handleDragStart = (event) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMove = (moveEvent) => {
      const next = {
        x: Math.max(12, Math.min(window.innerWidth - 260, moveEvent.clientX - startX)),
        y: Math.max(12, Math.min(window.innerHeight - 80, moveEvent.clientY - startY))
      };
      updatePosition(next);
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      return;
    }
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        setPickedColor(result.sRGBHex);
      }
    } catch {
      // ignore cancellation or permission errors
    }
  };

  if (!sections.length) {
    return null;
  }

  return (
    <div
      className="fixed z-[70] hidden lg:block"
      style={{ left: position.x, top: position.y }}
    >
      <div className="rounded-2xl border border-gray-100 dark:border-[#3d2b1d] bg-white/65 dark:bg-[#1f1610]/70 backdrop-blur-md shadow-lg min-w-[220px]">
        <div
          className="flex items-center justify-between gap-2 px-3 py-2 cursor-move select-none border-b border-gray-100 dark:border-[#3d2b1d]"
          onMouseDown={handleDragStart}
        >
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Sections</div>
          <button
            type="button"
            className="text-[11px] uppercase tracking-[0.08em] font-bold text-primary/80 hover:text-primary transition-colors"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        {!collapsed ? (
          <div className="px-3 py-2">
            <ul className="flex flex-col gap-2">
              {sections.map((section) => {
                const isActive = section.id === activeId;
                return (
                  <li key={section.id}>
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const target = document.getElementById(section.id);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`text-left text-sm transition-colors ${
                          isActive ? "font-bold" : "font-medium"
                        }`}
                        style={{
                          color: isActive ? "var(--ds-color-primary)" : "var(--ds-color-muted)"
                        }}
                      >
                        {section.label}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="text-[11px] uppercase tracking-[0.08em] font-bold text-primary/80 hover:text-primary transition-colors"
                          onClick={() => {
                            if (navigator?.clipboard?.writeText) {
                              navigator.clipboard.writeText(section.id);
                              setCopiedId(section.id);
                              window.clearTimeout(window.__copyTimeout);
                              window.__copyTimeout = window.setTimeout(() => setCopiedId(""), 1200);
                            }
                          }}
                          aria-label={`Copy ${section.id}`}
                        >
                          {copiedId === section.id ? "Copied" : "Copy"}
                        </button>
                        <button
                          type="button"
                          disabled={!section.className}
                          className="text-[11px] uppercase tracking-[0.08em] font-bold text-primary/80 hover:text-primary transition-colors disabled:opacity-50"
                          onClick={() => {
                            if (!section.className || !navigator?.clipboard?.writeText) {
                              return;
                            }
                            navigator.clipboard.writeText(section.className);
                            setCopiedClassId(section.id);
                            window.clearTimeout(window.__copyClassTimeout);
                            window.__copyClassTimeout = window.setTimeout(() => setCopiedClassId(""), 1200);
                          }}
                          aria-label={`Copy classes for ${section.id}`}
                        >
                          {copiedClassId === section.id ? "Copied class" : "Copy class"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#3d2b1d]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary">
                  Color
                </span>
                {canEyeDropper ? (
                  <button
                    type="button"
                    className="text-[11px] uppercase tracking-[0.08em] font-bold text-primary/80 hover:text-primary transition-colors"
                    onClick={handlePickColor}
                  >
                    Pick
                  </button>
                ) : null}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="h-7 w-7 rounded-lg border border-gray-200 dark:border-[#3d2b1d]"
                  style={{ backgroundColor: pickedColor || "#ffffff" }}
                />
                <input
                  type="color"
                  className="h-7 w-10 cursor-pointer rounded border border-gray-200 dark:border-[#3d2b1d] bg-transparent"
                  value={pickedColor || "#ffffff"}
                  onChange={(event) => setPickedColor(event.target.value)}
                  aria-label="Pick color"
                />
                <span className="text-xs font-semibold text-[#181411] dark:text-white">
                  {pickedColor || "#FFFFFF"}
                </span>
                <button
                  type="button"
                  className="ml-auto text-[11px] uppercase tracking-[0.08em] font-bold text-primary/80 hover:text-primary transition-colors"
                  onClick={() => {
                    if (!pickedColor || !navigator?.clipboard?.writeText) {
                      return;
                    }
                    navigator.clipboard.writeText(pickedColor);
                    setColorCopied(true);
                    window.clearTimeout(window.__colorTimeout);
                    window.__colorTimeout = window.setTimeout(() => setColorCopied(false), 1200);
                  }}
                  aria-label="Copy color"
                >
                  {colorCopied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
