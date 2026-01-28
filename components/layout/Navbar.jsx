"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LineCTA from "../ui/LineCTA";
import { supabase } from "../../lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [services, setServices] = useState([]);

  const activeKey = useMemo(() => {
    if (pathname === "/") {
      return "home";
    }
    if (pathname === "/services" || pathname.startsWith("/services/")) {
      return "services";
    }
    if (pathname === "/about") {
      return "about";
    }
    if (pathname === "/articles") {
      return "articles";
    }
    if (pathname === "/contact") {
      return "contact";
    }
    return "";
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    const loadServices = async () => {
      if (!supabase) {
        return;
      }
      const { data, error } = await supabase
        .from("services")
        .select("id, slug, title")
        .in("status", ["published", "Published"])
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (!mounted) {
        return;
      }
      if (error) {
        console.warn("Failed to load services for navbar:", error.message);
        return;
      }
      setServices(data || []);
    };
    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  const navLinkClass = (key) =>
    key === activeKey
      ? "text-sm font-bold text-primary"
      : "text-sm font-medium hover:text-primary transition-colors ds-muted";

  const mobileLinkClass = (key) =>
    key === activeKey
      ? "text-base font-bold text-primary py-2"
      : "text-base font-semibold ds-muted hover:text-primary transition-colors py-2";

  const activeStyle = { color: "var(--ds-color-primary)" };

  return (
    <header
      data-react-navbar
      className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md"
    >
      <div className="ds-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="size-8 text-primary" style={{ color: "var(--ds-color-primary)" }}>
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2
            className="text-xl font-bold leading-tight tracking-tight"
            style={{ color: "var(--ds-color-text)" }}
          >
            Thai Haven Service
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLinkClass("home")} style={activeKey === "home" ? activeStyle : undefined}>
            หน้าหลัก
          </Link>
          <div className="relative group">
            <Link
              href="/services"
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer ${
                activeKey === "services" ? "font-bold" : "ds-muted"
              }`}
              style={activeKey === "services" ? activeStyle : undefined}
            >
              บริการ
              <span className="material-symbols-outlined text-base transition-transform group-hover:rotate-180">
                expand_more
              </span>
            </Link>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-black rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {services.length ? (
                  services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug || service.id}`}
                      className="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-[#d32f2f] hover:text-white transition-colors"
                    >
                      <div className="font-medium">{service.title || "บริการ"}</div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-[#897261]">ยังไม่มีบริการที่เผยแพร่</div>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 mt-1"></div>
                <Link
                  href="/services"
                  className="block px-4 py-3 text-sm text-primary font-medium hover:bg-[#d32f2f] hover:text-white transition-colors"
                >
                  ดูบริการทั้งหมด →
                </Link>
              </div>
            </div>
          </div>
          <Link href="/about" className={navLinkClass("about")} style={activeKey === "about" ? activeStyle : undefined}>
            เกี่ยวกับเรา
          </Link>
          <Link
            href="/articles"
            className={navLinkClass("articles")}
            style={activeKey === "articles" ? activeStyle : undefined}
          >
            บทความ
          </Link>
          <Link
            href="/contact"
            className={navLinkClass("contact")}
            style={activeKey === "contact" ? activeStyle : undefined}
          >
            ติดต่อเรา
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center size-10 rounded-lg border border-[#ece7e2] dark:border-[#3d2b1d] text-[#181411] dark:text-white hover:bg-[#f6f2ee] dark:hover:bg-[#2b1f17] transition-colors"
            id="mobile-menu-toggle"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            aria-label="เปิดเมนู"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <LineCTA className="hidden md:inline-flex" />
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-[#f4f2f0] dark:border-[#3d2b1d] bg-white/95 dark:bg-background-dark/95 ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="ds-container py-4 flex flex-col gap-1">
          <Link href="/" className={mobileLinkClass("home")} onClick={() => setMobileOpen(false)}>
            หน้าหลัก
          </Link>
          <div className="mt-2 mb-1">
            <Link
              href="/services"
              className={`${mobileLinkClass("services")} block`}
              onClick={() => setMobileOpen(false)}
            >
              บริการ
            </Link>
            <div className="pl-4 mt-1 flex flex-col gap-0.5 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
              {services.length ? (
                services.map((service) => {
                  const href = `/services/${service.slug || service.id}`;
                  return (
                    <Link
                      key={service.id}
                      href={href}
                      className={`text-sm font-normal hover:text-primary transition-colors py-1.5 ${
                        pathname === href ? "text-primary font-medium" : "ds-muted"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.title || "บริการ"}
                    </Link>
                  );
                })
              ) : (
                <span className="text-xs text-[#897261] py-2">ยังไม่มีบริการที่เผยแพร่</span>
              )}
              <Link
                href="/services"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-1.5 mt-1"
                onClick={() => setMobileOpen(false)}
              >
                ดูบริการทั้งหมด →
              </Link>
            </div>
          </div>
          <Link href="/about" className={mobileLinkClass("about")} onClick={() => setMobileOpen(false)}>
            เกี่ยวกับเรา
          </Link>
          <Link href="/articles" className={mobileLinkClass("articles")} onClick={() => setMobileOpen(false)}>
            บทความ
          </Link>
          <Link href="/contact" className={mobileLinkClass("contact")} onClick={() => setMobileOpen(false)}>
            ติดต่อเรา
          </Link>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="btn btn-primary h-11 px-5 text-sm w-full">ขอใบเสนอราคา</button>
          </div>
        </div>
      </div>
    </header>
  );
}
