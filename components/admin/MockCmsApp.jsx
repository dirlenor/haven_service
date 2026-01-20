"use client";

import { useEffect, useMemo, useState } from "react";
import QuillEditor from "./QuillEditor";
import { supabase } from "../../lib/supabaseClient";

const createId = () => {
  if (typeof crypto === "undefined") {
    return null;
  }
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;
  const hex = Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const emptyItem = (type) => ({
  id: createId(),
  slug: "",
  title: "",
  summary: "",
  heroImage: "",
  status: "draft",
  content: "",
  contentHtml: "",
  category: "",
  date: "",
  categoryColor: "#d46211",
  ctaTitle: "",
  ctaBody: "",
  ctaButtonLabel: "",
  ctaButtonHref: ""
});

const ensureSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ก-๙]+/g, "-")
    .replace(/^-+|-+$/g, "");

const mapArticleFromRow = (row) => ({
  id: row.id,
  slug: row.slug || "",
  title: row.title || "",
  summary: row.summary || "",
  heroImage: row.hero_image || "",
  category: row.category || "",
  date: row.date || "",
  categoryColor: row.category_color || "#d46211",
  contentHtml: row.content_html || "",
  ctaTitle: row.cta_title || "",
  ctaBody: row.cta_body || "",
  ctaButtonLabel: row.cta_button_label || "",
  ctaButtonHref: row.cta_button_href || "",
  status: row.status || "draft"
});

const mapServiceFromRow = (row) => ({
  id: row.id,
  slug: row.slug || "",
  title: row.title || "",
  summary: row.summary || "",
  heroImage: row.hero_image || "",
  content: row.content || "",
  status: row.status || "draft"
});

const buildArticleRow = (item) => {
  const row = {
    id: item.id || undefined,
    slug: item.slug?.trim() || null,
    title: item.title || "",
    summary: item.summary || "",
    hero_image: item.heroImage || "",
    category: item.category || "",
    date: item.date || null,
    category_color: item.categoryColor || "#d46211",
    content_html: item.contentHtml || "",
    cta_title: item.ctaTitle || "",
    cta_body: item.ctaBody || "",
    cta_button_label: item.ctaButtonLabel || "",
    cta_button_href: item.ctaButtonHref || "",
    status: item.status || "draft"
  };
  if (!item.id) {
    delete row.id;
  }
  return row;
};

const buildServiceRow = (item) => {
  const row = {
    id: item.id || undefined,
    slug: item.slug?.trim() || null,
    title: item.title || "",
    summary: item.summary || "",
    hero_image: item.heroImage || "",
    content: item.content || "",
    status: item.status || "draft"
  };
  if (!item.id) {
    delete row.id;
  }
  return row;
};

export default function MockCmsApp() {
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ services: [], articles: [] });
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");
  const [activeId, setActiveId] = useState("");
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dirtyById, setDirtyById] = useState({});
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const items = data[activeTab] || [];
  const activeItem = items.find((item) => item.id === activeId);
  const isArticle = activeTab === "articles";

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    const initAuth = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session || null);
      setAuthLoading(false);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError("");
      const [{ data: articleRows, error: articleError }, { data: serviceRows, error: serviceError }] =
        await Promise.all([
          supabase
            .from("articles")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("services")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false })
        ]);

      if (articleError || serviceError) {
        setError(articleError?.message || serviceError?.message || "โหลดข้อมูลไม่สำเร็จ");
      }

      const mappedArticles = (articleRows || []).map(mapArticleFromRow);
      const mappedServices = (serviceRows || []).map(mapServiceFromRow);

      setData({ services: mappedServices, articles: mappedArticles });
      setCategories(
        Array.from(
          new Set(
            mappedArticles
              .map((article) => article.category)
              .filter(Boolean)
          )
        )
      );
      setLoading(false);
      setDirtyById({});
    };

    loadData();
  }, [session]);

  useEffect(() => {
    const list = data[activeTab] || [];
    if (!list.length) {
      setActiveId("");
      return;
    }
    if (!list.find((item) => item.id === activeId)) {
      setActiveId(list[0].id);
    }
  }, [data, activeTab, activeId]);

  useEffect(() => {
    if (!isArticle || !activeItem?.id || activeItem.date) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    handleChange("date", today);
  }, [activeItem?.id, activeItem?.date, activeTab, isArticle]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!supabase) {
      return;
    }
    setError("");
    setAuthLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      setError(signInError.message);
    }
    setAuthLoading(false);
  };

  const handleSignUp = async () => {
    if (!supabase) {
      return;
    }
    setError("");
    setAuthLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setError("สมัครสมาชิกสำเร็จ กรุณายืนยันอีเมลแล้วเข้าสู่ระบบ");
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
  };

  const saveItem = async (type, item, options = {}) => {
    if (!supabase) {
      return;
    }
    const { silent = false, closeEditor = true } = options;
    setSaving(true);
    setError("");
    const row = type === "articles" ? buildArticleRow(item) : buildServiceRow(item);
    const { data: saved, error: saveError } = await supabase
      .from(type)
      .upsert(row, { onConflict: "id" })
      .select("*")
      .single();
    if (saveError) {
      setError(saveError.message);
    } else if (saved) {
      setData((prev) => {
        const updatedList = prev[type].map((entry) =>
          entry.id === saved.id
            ? type === "articles"
              ? mapArticleFromRow(saved)
              : mapServiceFromRow(saved)
            : entry
        );
        return { ...prev, [type]: updatedList };
      });
      setDirtyById((prev) => ({ ...prev, [saved.id]: false }));
      setLastSavedAt(new Date().toLocaleString("th-TH"));
      if (!silent) {
        alert("บันทึกเรียบร้อย");
      }
      if (closeEditor) {
        setIsEditorOpen(false);
      }
    }
    setSaving(false);
  };

  const handleSelect = (itemId) => {
    setActiveId(itemId);
    setIsEditorOpen(true);
  };

  const handleNew = () => {
    const next = emptyItem(activeTab);
    setData((prev) => {
      const updated = { ...prev, [activeTab]: [next, ...prev[activeTab]] };
      return updated;
    });
    setActiveId(next.id || "");
    setDirtyById((prev) => ({ ...prev, [next.id]: true }));
    setIsEditorOpen(true);
  };

  const handleDelete = async (itemId) => {
    if (!supabase) {
      return;
    }
    setSaving(true);
    setError("");
    const { error: deleteError } = await supabase.from(activeTab).delete().eq("id", itemId);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    setData((prev) => {
      const updatedList = prev[activeTab].filter((item) => item.id !== itemId);
      return { ...prev, [activeTab]: updatedList };
    });
    if (activeId === itemId) {
      setActiveId(items.find((item) => item.id !== itemId)?.id || "");
      setIsEditorOpen(false);
    }
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setData((prev) => {
      const updatedList = prev[activeTab].map((item) =>
        item.id === activeId ? { ...item, [field]: value } : item
      );
      return { ...prev, [activeTab]: updatedList };
    });
    if (activeId) {
      setDirtyById((prev) => ({ ...prev, [activeId]: true }));
    }
  };

  const handleAutoSlug = () => {
    if (!activeItem?.title) {
      return;
    }
    handleChange("slug", ensureSlug(activeItem.title));
  };

  const handleUpload = async (file) => {
    if (!supabase || !activeItem?.id) {
      return;
    }
    setUploading(true);
    setError("");
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${activeTab}/${activeItem.id}/${Date.now()}-${sanitizedName}`;
    const { error: uploadError } = await supabase
      .storage
      .from("cms-public")
      .upload(path, file, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("cms-public").getPublicUrl(path);
    if (urlData?.publicUrl) {
      handleChange("heroImage", urlData.publicUrl);
    }
    setUploading(false);
  };

  const handleToggleStatus = (event, item) => {
    event.stopPropagation();
    const nextStatus = item.status === "published" ? "draft" : "published";
    setData((prev) => {
      const updatedList = prev[activeTab].map((entry) =>
        entry.id === item.id ? { ...entry, status: nextStatus } : entry
      );
      return { ...prev, [activeTab]: updatedList };
    });
    saveItem(activeTab, { ...item, status: nextStatus }, { silent: true, closeEditor: false });
  };

  const closeEditor = () => {
    if (activeItem?.id && dirtyById[activeItem.id]) {
      const shouldClose = window.confirm("มีการแก้ไขที่ยังไม่บันทึก ต้องการปิดหน้าต่างหรือไม่?");
      if (!shouldClose) {
        return;
      }
    }
    setIsEditorOpen(false);
  };

  const previewUrl = useMemo(() => {
    if (!activeItem?.slug && !activeItem?.id) {
      return "";
    }
    const base =
      activeTab === "services"
        ? `/preview/services/${activeItem.slug || "preview"}`
        : `/preview/articles/${activeItem.slug || "preview"}`;
    return `${base}?id=${activeItem.id}`;
  }, [activeItem, activeTab]);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f6] text-[#181411]">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-sm">
          <h1 className="text-xl font-bold mb-3">Supabase ยังไม่ถูกตั้งค่า</h1>
          <p className="text-[#897261]">
            กรุณาตั้งค่า `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` ในไฟล์ `.env.local`
            ก่อนเข้าสู่ระบบ CMS
          </p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#897261]">
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f8f7f6] flex items-center justify-center px-6">
        <form
          className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
          onSubmit={handleSignIn}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#897261] font-semibold">Admin Login</p>
          <h1 className="text-2xl font-black mt-2 mb-6 text-[#181411]">เข้าสู่ระบบ CMS</h1>
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              <span className="text-[#181411]">อีเมล</span>
              <input
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#181411] placeholder:text-[#b9a99e]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="name@email.com"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              <span className="text-[#181411]">รหัสผ่าน</span>
              <input
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#181411] placeholder:text-[#b9a99e]"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="รหัสผ่าน"
                required
              />
            </label>
            {error ? <div className="text-xs text-red-500">{error}</div> : null}
            <button
              type="submit"
              className="w-full bg-white border border-gray-200 text-[#181411] rounded-full py-2 text-sm font-bold hover:bg-[#f4f2f0] transition-colors"
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className="w-full border border-gray-200 rounded-full py-2 text-sm font-bold text-[#181411] hover:bg-[#f4f2f0] transition-colors"
              onClick={handleSignUp}
            >
              สมัครบัญชี (ครั้งแรก)
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f6] text-[#181411]">
      <div className="flex min-h-screen">
        <aside className="w-full max-w-[260px] bg-white border-r border-gray-100 px-6 py-8 flex flex-col">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#897261] font-semibold">Supabase CMS</p>
            <h1 className="text-2xl font-black mt-2">แดชบอร์ด</h1>
            <p className="text-xs text-[#897261] mt-2">
              {saving ? "กำลังบันทึก..." : "กดบันทึกเมื่อแก้ไขเสร็จ"}
              {lastSavedAt ? ` · บันทึกล่าสุด ${lastSavedAt}` : ""}
            </p>
          </div>
          <div className="mt-10 space-y-2">
            <button
              type="button"
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === "articles"
                  ? "bg-[#d46211] text-white"
                  : "bg-transparent text-[#181411] hover:bg-[#f8f7f6]"
              }`}
              onClick={() => {
                setActiveTab("articles");
                setIsEditorOpen(false);
              }}
            >
              บทความ
            </button>
            <button
              type="button"
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === "services"
                  ? "bg-[#d46211] text-white"
                  : "bg-transparent text-[#181411] hover:bg-[#f8f7f6]"
              }`}
              onClick={() => {
                setActiveTab("services");
                setIsEditorOpen(false);
              }}
            >
              บริการ
            </button>
          </div>
          <div className="mt-auto pt-6">
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full text-sm font-bold border border-gray-200"
              onClick={handleSignOut}
            >
              ออกจากระบบ
            </button>
          </div>
        </aside>

        <main className="flex-1 px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#897261] font-semibold">
                {activeTab === "articles" ? "Articles" : "Services"}
              </p>
              <h2 className="text-3xl font-black mt-2">
                {activeTab === "articles" ? "รายการบทความ" : "รายการบริการ"}
              </h2>
              <p className="text-xs text-[#897261] mt-2">
                {activeTab === "articles"
                  ? "คลิกบทความเพื่อแก้ไขในหน้าต่างแบบป๊อปอัป"
                  : "คลิกบริการเพื่อแก้ไขในหน้าต่างแบบป๊อปอัป"}
              </p>
            </div>
            <button
              type="button"
              className="px-5 py-2 rounded-full text-sm font-bold bg-[#d46211] text-white"
              onClick={handleNew}
            >
              เพิ่มรายการ
            </button>
          </div>

          {loading ? (
            <div className="text-sm text-[#897261] mt-6">กำลังโหลดข้อมูล...</div>
          ) : null}
          {error ? (
            <div className="mt-4 text-xs text-red-500">{error}</div>
          ) : null}

          <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[88px_minmax(0,1fr)_140px_160px_120px] gap-3 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#897261] border-b border-gray-100">
              <span>รูป</span>
              <span>ชื่อ</span>
              <span>หมวดหมู่</span>
              <span>วันที่</span>
              <span>สถานะ</span>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`w-full text-left px-5 py-4 grid grid-cols-1 md:grid-cols-[88px_minmax(0,1fr)_140px_160px_120px] gap-3 items-center transition-colors ${
                    item.id === activeId ? "bg-[#f4f2f0]" : "hover:bg-[#f8f7f6]"
                  }`}
                  onClick={() => handleSelect(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                      {item.heroImage ? (
                        <img
                          src={item.heroImage}
                          alt={item.title || "thumbnail"}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="md:hidden text-xs text-[#897261]">
                      {item.status || "draft"}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.title || "ยังไม่มีชื่อ"}</div>
                    <div className="text-xs text-[#897261] mt-1">
                      {item.slug ? `/${item.slug}` : "ยังไม่มี slug"}
                    </div>
                    {dirtyById[item.id] ? (
                      <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#d46211]">
                        ยังไม่บันทึก
                      </div>
                    ) : null}
                  </div>
                  <div className="text-sm text-[#4c3f35]">
                    {isArticle ? item.category || "-" : "-"}
                  </div>
                  <div className="text-sm text-[#4c3f35]">
                    {isArticle ? item.date || "-" : "-"}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`relative inline-flex h-7 w-14 items-center rounded-full p-1 transition-colors border ${
                        item.status === "published"
                          ? "bg-[#d46211] border-[#d46211]"
                          : "bg-gray-200 border-gray-200"
                      }`}
                      onClick={(event) => handleToggleStatus(event, item)}
                      aria-pressed={item.status === "published"}
                      title={item.status === "published" ? "แสดงบนเว็บไซต์" : "ซ่อนจากเว็บไซต์"}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                          item.status === "published" ? "translate-x-7" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </button>
              ))}
              {!items.length && !loading ? (
                <div className="text-sm text-[#897261] px-5 py-6">ยังไม่มีรายการ</div>
              ) : null}
            </div>
          </div>
        </main>
      </div>

      {isEditorOpen && activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4 sticky top-0 bg-white">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#897261] font-semibold">
                  {isArticle ? "Article Editor" : "Service Editor"}
                </p>
                <h3 className="text-xl font-bold">{activeItem.title || "แก้ไขรายการ"}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs font-bold border ${
                    dirtyById[activeItem.id]
                      ? "border-[#181411] text-[#181411]"
                      : "border-gray-200 text-gray-400"
                  }`}
                  onClick={() => saveItem(activeTab, activeItem)}
                  disabled={!dirtyById[activeItem.id] || saving}
                >
                  บันทึก
                </button>
                {previewUrl ? (
                  <a
                    href={previewUrl}
                    className="px-4 py-2 rounded-full text-xs font-bold border border-[#181411] text-[#181411]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ดู preview
                  </a>
                ) : null}
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs font-bold border border-red-400 text-red-600"
                  onClick={() => handleDelete(activeItem.id)}
                >
                  ลบรายการ
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs font-bold border border-gray-200"
                  onClick={closeEditor}
                >
                  ปิด
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  ชื่อเรื่อง
                  <input
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    value={activeItem.title}
                    onChange={(event) => handleChange("title", event.target.value)}
                    placeholder={isArticle ? "เช่น เทคนิคแต่งบ้าน" : "เช่น ผ้าม่านและมู่ลี่"}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Slug
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                      value={activeItem.slug}
                      onChange={(event) => handleChange("slug", event.target.value)}
                      placeholder="เช่น curtains"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 text-xs rounded-lg border border-gray-200"
                      onClick={handleAutoSlug}
                    >
                      Auto
                    </button>
                  </div>
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-semibold">
                สถานะ
                <select
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                  value={activeItem.status}
                  onChange={(event) => handleChange("status", event.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold">
                รูปหลัก (อัปโหลด)
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      return;
                    }
                    handleUpload(file);
                  }}
                />
              </label>
              {dirtyById[activeItem.id] ? (
                <div className="text-xs text-[#897261]">มีการแก้ไขที่ยังไม่บันทึก</div>
              ) : null}
              {uploading ? (
                <div className="text-xs text-[#897261]">กำลังอัปโหลดรูป...</div>
              ) : null}
              {activeItem.heroImage ? (
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <img
                    src={activeItem.heroImage}
                    alt={activeItem.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ) : null}

              <label className="flex flex-col gap-2 text-sm font-semibold">
                คำโปรย
                <textarea
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[90px]"
                  value={activeItem.summary}
                  onChange={(event) => handleChange("summary", event.target.value)}
                  placeholder="สรุปสั้นๆ ให้ลูกค้าเข้าใจบริการ/บทความนี้"
                />
              </label>

              {isArticle ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      หมวดหมู่
                      <div className="flex gap-2">
                        <input
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                          list="article-categories"
                          value={activeItem.category}
                          onChange={(event) => handleChange("category", event.target.value)}
                          placeholder="เช่น ไอเดียแต่งบ้าน"
                        />
                        <input
                          className="h-10 w-10 rounded-lg border border-gray-200 p-1 bg-white"
                          type="color"
                          value={activeItem.categoryColor || "#d46211"}
                          onChange={(event) => handleChange("categoryColor", event.target.value)}
                          title="สีหมวดหมู่"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 text-xs rounded-lg border border-gray-200"
                          onClick={() => {
                            if (!activeItem.category) {
                              return;
                            }
                            setCategories((prev) =>
                              Array.from(new Set([...(prev || []), activeItem.category]))
                            );
                          }}
                        >
                          เพิ่ม
                        </button>
                      </div>
                      <datalist id="article-categories">
                        {(categories || []).map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      วันที่
                      <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.date}
                        onChange={(event) => handleChange("date", event.target.value)}
                        type="date"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2 text-sm font-semibold">
                    เนื้อหา (Rich Text)
                    <QuillEditor
                      value={activeItem.contentHtml}
                      onChange={(next) => handleChange("contentHtml", next)}
                    />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      CTA หัวข้อ
                      <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.ctaTitle}
                        onChange={(event) => handleChange("ctaTitle", event.target.value)}
                        placeholder="สนใจปรับโฉมบ้านกับเรา?"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      CTA ปุ่ม (ข้อความ)
                      <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.ctaButtonLabel}
                        onChange={(event) => handleChange("ctaButtonLabel", event.target.value)}
                        placeholder="ติดต่อเราเลย"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                      CTA คำอธิบาย
                      <textarea
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[90px]"
                        value={activeItem.ctaBody}
                        onChange={(event) => handleChange("ctaBody", event.target.value)}
                        placeholder="ปรึกษาฟรี สอบถามราคา หรือนัดหมายวัดหน้างานได้ทันที"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                      CTA ลิงก์
                      <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.ctaButtonHref}
                        onChange={(event) => handleChange("ctaButtonHref", event.target.value)}
                        placeholder="/contact"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  เนื้อหา (ย่อหน้า/หัวข้อ)
                  <textarea
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[180px]"
                    value={activeItem.content}
                    onChange={(event) => handleChange("content", event.target.value)}
                    placeholder="ใส่เนื้อหาเป็นย่อหน้าๆ"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
