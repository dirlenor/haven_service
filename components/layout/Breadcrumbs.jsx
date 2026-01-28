"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const STATIC_LABELS = {
  articles: "บทความ",
  services: "บริการ",
  preview: "Preview",
  admin: "Admin"
};

const formatSegmentLabel = (segment) => {
  if (!segment) {
    return "";
  }
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = segment;
  }
  if (STATIC_LABELS[decoded]) {
    return STATIC_LABELS[decoded];
  }
  const parts = decoded.split("-").filter(Boolean);
  if (!parts.length) {
    return decoded;
  }
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = useMemo(() => {
    if (!pathname || pathname === "/") {
      return [];
    }
    const segments = pathname.split("/").filter(Boolean);
    if (!segments.length) {
      return [];
    }
    const items = [{ label: "หน้าแรก", href: "/" }];
    let accumulated = "";
    segments.forEach((segment) => {
      accumulated += `/${segment}`;
      items.push({
        label: formatSegmentLabel(segment),
        href: accumulated
      });
    });
    return items;
  }, [pathname]);

  if (!crumbs.length) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white/70 border-b border-gray-100 text-xs text-[#897261]"
    >
      <div className="ds-container flex flex-wrap items-center gap-2 md:text-sm py-3">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-2 whitespace-nowrap">
              {index > 0 ? <span className="text-[#c7b8a5]">/</span> : null}
              {isLast ? (
                <span className="text-[#181411] font-semibold">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-[#d32f2f]">
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
