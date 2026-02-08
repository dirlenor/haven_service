"use client";

import { useEffect, useMemo, useState } from "react";
import WysiwygEditor from "./WysiwygEditor";
import { supabase } from "../../lib/supabaseClient";
import {
  buildServiceContentTemplate,
  parseServiceContent,
  stringifyServiceContent
} from "../../lib/serviceContent";

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

const emptyItem = (type) => {
  const base = {
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
    categoryColor: "#d32f2f",
    categories: [],
    categoryColors: [],
    ctaTitle: "",
    ctaBody: "",
    ctaButtonLabel: "",
    ctaButtonHref: "",
    metaKeywords: ""
  };
  if (type === "services") {
    base.content = stringifyServiceContent(buildServiceContentTemplate());
  }
  return base;
};

const ensureSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ก-๙]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeCategoryList = (labels, colors, fallbackColor = "#d32f2f") => {
  const map = new Map();
  labels.forEach((label, index) => {
    const cleanLabel = String(label || "").trim();
    if (!cleanLabel || map.has(cleanLabel)) {
      return;
    }
    map.set(cleanLabel, colors[index] || fallbackColor);
  });
  return {
    categories: Array.from(map.keys()),
    categoryColors: Array.from(map.values())
  };
};

const cloneContent = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const sameId = (a, b) => String(a ?? "") === String(b ?? "");

const mapArticleFromRow = (row) => {
  const rawCategories = Array.isArray(row.categories) ? row.categories : [];
  const rawColors = Array.isArray(row.category_colors) ? row.category_colors : [];
  const legacyCategory = row.category || "";
  const legacyColor = row.category_color || "#d32f2f";
  const categories = rawCategories.length ? rawCategories : legacyCategory ? [legacyCategory] : [];
  const categoryColors = rawColors.length ? rawColors : categories.length ? [legacyColor] : [];
  const normalized = normalizeCategoryList(categories, categoryColors, legacyColor);

  return {
    id: row.id,
    slug: row.slug || "",
    title: row.title || "",
    summary: row.summary || "",
    heroImage: row.hero_image || "",
    category: normalized.categories[0] || "",
    date: row.date || "",
    categoryColor: normalized.categoryColors[0] || "#d32f2f",
    categories: normalized.categories,
    categoryColors: normalized.categoryColors,
    contentHtml: row.content_html || "",
    ctaTitle: row.cta_title || "",
    ctaBody: row.cta_body || "",
    ctaButtonLabel: row.cta_button_label || "",
    ctaButtonHref: row.cta_button_href || "",
    metaKeywords: row.meta_keywords || "",
    status: row.status || "draft"
  };
};

const mapServiceFromRow = (row) => ({
  id: row.id,
  slug: row.slug || "",
  title: row.title || "",
  summary: row.summary || "",
  heroImage: row.hero_image || "",
  content: row.content || "",
  status: row.status || "draft",
  sortOrder: typeof row.sort_order === "number" ? row.sort_order : null
});

const buildArticleRow = (item) => {
  const normalized = normalizeCategoryList(
    item.categories || [],
    item.categoryColors || [],
    item.categoryColor || "#d32f2f"
  );
  const row = {
    id: item.id || undefined,
    slug: item.slug?.trim() || null,
    title: item.title || "",
    summary: item.summary || "",
    hero_image: item.heroImage || "",
    category: normalized.categories[0] || "",
    date: item.date || null,
    category_color: normalized.categoryColors[0] || "#d32f2f",
    categories: normalized.categories,
    category_colors: normalized.categoryColors,
    content_html: item.contentHtml || "",
    cta_title: item.ctaTitle || "",
    cta_body: item.ctaBody || "",
    cta_button_label: item.ctaButtonLabel || "",
    cta_button_href: item.ctaButtonHref || "",
    meta_keywords: item.metaKeywords || "",
    status: item.status || "draft"
  };
  if (!item.id) {
    delete row.id;
  }
  return row;
};

const buildServiceRow = (item) => {
  const parsed = parseServiceContent(item.content || "");
  const contentLabel = parsed?.serviceLabel || "";
  const fallbackSlug = ensureSlug(contentLabel || item.title || "");
  const heroFromContent = parsed?.hero?.image?.url || "";
  const summaryFromContent = parsed?.hero?.subtitle || "";
  const row = {
    id: item.id || undefined,
    slug: item.slug?.trim() || fallbackSlug || null,
    title: item.title || "",
    summary: item.summary || summaryFromContent || "",
    hero_image: item.heroImage || heroFromContent || "",
    content: item.content || "",
    status: item.status || "draft"
  };
  if (!item.id) {
    delete row.id;
  }
  return row;
};

const compressImage = (file, options = {}) =>
  new Promise((resolve) => {
    const { maxWidth = 1600, quality = 0.8 } = options;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
              type: "image/jpeg"
            });
            resolve(compressed);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = reader.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });

export default function MockCmsApp() {
  const editorStateKey = "cms_editor_state";
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ services: [], articles: [] });
  const [persistedIdsByType, setPersistedIdsByType] = useState({ services: [], articles: [] });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");
  const [activeId, setActiveId] = useState("");
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dirtyById, setDirtyById] = useState({});
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#d32f2f");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [serviceEditorTab, setServiceEditorTab] = useState("hero");
  const [articleEditorTab, setArticleEditorTab] = useState("content");
  const [articleSearch, setArticleSearch] = useState("");
  const [draggingServiceId, setDraggingServiceId] = useState("");
  const [siteScripts, setSiteScripts] = useState({
    id: "",
    head_scripts: "",
    body_scripts: ""
  });
  const [siteSettings, setSiteSettings] = useState({
    id: "",
    contact_form_endpoint: "",
    contact_form_success_message: ""
  });
  const [scriptsDirty, setScriptsDirty] = useState(false);
  const [settingsDirty, setSettingsDirty] = useState(false);
  const [showFormGuide, setShowFormGuide] = useState(false);
  const [orderNotice, setOrderNotice] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const items = data[activeTab] || [];
  const isScriptsTab = activeTab === "scripts";
  const isSettingsTab = activeTab === "settings";
  const activeItem = items.find((item) => item.id === activeId);
  const isArticle = activeTab === "articles";
  const isAdmin = Boolean(session?.user);
  const serviceContent = useMemo(() => {
    if (isArticle || !activeItem) {
      return null;
    }
    return (
      parseServiceContent(activeItem.content || "") ||
      buildServiceContentTemplate({
        serviceLabel: activeItem.title || "",
        heroImageUrl: activeItem.heroImage || "",
        heroImageAlt: activeItem.title || ""
      })
    );
  }, [activeItem, isArticle]);
  const articleCounts = useMemo(() => {
    const articleList = data.articles || [];
    const total = articleList.length;
    const online = articleList.filter((article) => article.status === "published").length;
    return {
      total,
      online,
      offline: total - online
    };
  }, [data.articles]);

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
    if (activeTab === "services") {
      setServiceEditorTab("hero");
      setArticleSearch("");
    }
    if (activeTab === "articles") {
      setArticleEditorTab("content");
    }
  }, [activeTab, activeId]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError("");
      const [
        { data: articleRows, error: articleError },
        { data: serviceRows, error: serviceError },
        { data: categoryRows, error: categoryError },
        { data: scriptsRow, error: scriptsError },
        { data: settingsRow, error: settingsError }
      ] = await Promise.all([
        supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("article_categories")
          .select("*")
          .order("name", { ascending: true }),
        supabase
          .from("site_scripts")
          .select("id, head_scripts, body_scripts, updated_at")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("site_settings")
          .select("id, contact_form_endpoint, contact_form_success_message, updated_at")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      ]);

      if (articleError || serviceError || categoryError || scriptsError || settingsError) {
        setError(
          articleError?.message ||
            serviceError?.message ||
            categoryError?.message ||
            scriptsError?.message ||
            settingsError?.message ||
            "โหลดข้อมูลไม่สำเร็จ"
        );
      }

      const mappedArticles = (articleRows || []).map(mapArticleFromRow);
      const mappedServices = (serviceRows || []).map(mapServiceFromRow);

      setData({ services: mappedServices, articles: mappedArticles });
      setPersistedIdsByType({
        services: mappedServices.map((item) => item.id),
        articles: mappedArticles.map((item) => item.id)
      });
      const categoryPool = mappedArticles.flatMap((article) => article.categories || []);
      const mappedOptions = Array.isArray(categoryRows)
        ? categoryRows.map((row) => ({
            id: row.id,
            name: row.name,
            color: row.color || "#d32f2f"
          }))
        : [];
      const fallbackOptions = normalizeCategoryList(categoryPool, [], "#d32f2f").categories.map(
        (label) => ({
          id: label,
          name: label,
          color: "#d32f2f"
        })
      );
      setCategoryOptions(
        mappedOptions.length ? mappedOptions : fallbackOptions
      );
      if (scriptsRow) {
        setSiteScripts({
          id: scriptsRow.id || "",
          head_scripts: scriptsRow.head_scripts || "",
          body_scripts: scriptsRow.body_scripts || ""
        });
      }
      if (settingsRow) {
        setSiteSettings({
          id: settingsRow.id || "",
          contact_form_endpoint: settingsRow.contact_form_endpoint || "",
          contact_form_success_message: settingsRow.contact_form_success_message || ""
        });
      }
      setScriptsDirty(false);
      setSettingsDirty(false);
      setLoading(false);
      setDirtyById({});
    };

    loadData();
  }, [session]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!isEditorOpen || !activeId) {
      window.sessionStorage.removeItem(editorStateKey);
      return;
    }
    const payload = {
      activeTab,
      activeId,
      serviceEditorTab,
      articleEditorTab
    };
    window.sessionStorage.setItem(editorStateKey, JSON.stringify(payload));
  }, [isEditorOpen, activeId, activeTab, serviceEditorTab, articleEditorTab]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!session || loading) {
      return;
    }
    if (isEditorOpen) {
      return;
    }
    const raw = window.sessionStorage.getItem(editorStateKey);
    if (!raw) {
      return;
    }
    try {
      const saved = JSON.parse(raw);
      if (!saved?.activeTab || !saved?.activeId) {
        return;
      }
      if (!data[saved.activeTab]?.find((item) => item.id === saved.activeId)) {
        return;
      }
      setActiveTab(saved.activeTab);
      setActiveId(saved.activeId);
      if (saved.serviceEditorTab) {
        setServiceEditorTab(saved.serviceEditorTab);
      }
      if (saved.articleEditorTab) {
        setArticleEditorTab(saved.articleEditorTab);
      }
      setIsEditorOpen(true);
    } catch (error) {
      window.sessionStorage.removeItem(editorStateKey);
    }
  }, [session, loading, data, isEditorOpen]);

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
    if (!activeId) {
      return;
    }
    setNewCategoryName("");
    setNewCategoryColor("#d32f2f");
  }, [activeId]);

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
      setError("ยังไม่ได้ตั้งค่า Supabase (ตรวจสอบ NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)");
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
      setError("ยังไม่ได้ตั้งค่า Supabase (ตรวจสอบ NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)");
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
    const persistedIds = persistedIdsByType[type] || [];
    const isExisting = persistedIds.some((id) => sameId(id, item.id));
    const table = supabase.from(type);
    const request = isExisting
      ? table
          .update(row)
          .eq("id", item.id)
          .select("*")
          .single()
      : (() => {
          const insertRow = { ...row };
          delete insertRow.id;
          return table.insert(insertRow).select("*").single();
        })();
    const { data: saved, error: saveError } = await request;
    if (saveError) {
      setError(saveError.message);
    } else if (saved) {
      const mappedSaved = type === "articles" ? mapArticleFromRow(saved) : mapServiceFromRow(saved);
      setData((prev) => {
        let updatedList = [];
        if (isExisting) {
          updatedList = prev[type].map((entry) => (sameId(entry.id, saved.id) ? mappedSaved : entry));
        } else if (item.id) {
          const hasTemp = prev[type].some((entry) => sameId(entry.id, item.id));
          updatedList = hasTemp
            ? prev[type].map((entry) => (sameId(entry.id, item.id) ? mappedSaved : entry))
            : [mappedSaved, ...prev[type]];
        } else {
          updatedList = [mappedSaved, ...prev[type]];
        }
        return { ...prev, [type]: updatedList };
      });
      setPersistedIdsByType((prev) => ({
        ...prev,
        [type]: Array.from(new Set([...(prev[type] || []), saved.id]))
      }));
      setDirtyById((prev) => {
        const next = { ...prev, [saved.id]: false };
        if (item.id && !sameId(item.id, saved.id)) {
          delete next[item.id];
        }
        return next;
      });
      if (item.id && activeId && sameId(activeId, item.id) && !sameId(activeId, saved.id)) {
        setActiveId(saved.id);
      }
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
    if (activeTab === "articles" || activeTab === "services") {
      setPersistedIdsByType((prev) => ({
        ...prev,
        [activeTab]: (prev[activeTab] || []).filter((id) => !sameId(id, itemId))
      }));
    }
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

  const handleScriptsChange = (field, value) => {
    setSiteScripts((prev) => ({ ...prev, [field]: value }));
    setScriptsDirty(true);
  };

  const handleSettingsChange = (field, value) => {
    setSiteSettings((prev) => ({ ...prev, [field]: value }));
    setSettingsDirty(true);
  };

  const saveSiteScripts = async () => {
    if (!supabase || !isAdmin) {
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      id: siteScripts.id || undefined,
      head_scripts: siteScripts.head_scripts || null,
      body_scripts: siteScripts.body_scripts || null,
      updated_at: new Date().toISOString()
    };
    const { data: saved, error: saveError } = await supabase
      .from("site_scripts")
      .upsert(payload, { onConflict: "id" })
      .select("id, head_scripts, body_scripts")
      .single();
    if (saveError) {
      setError(saveError.message);
    } else if (saved) {
      setSiteScripts({
        id: saved.id,
        head_scripts: saved.head_scripts || "",
        body_scripts: saved.body_scripts || ""
      });
      setScriptsDirty(false);
      setLastSavedAt(new Date().toLocaleString("th-TH"));
      alert("บันทึกเรียบร้อย");
    }
    setSaving(false);
  };

  const saveSiteSettings = async () => {
    if (!supabase || !isAdmin) {
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      id: siteSettings.id || undefined,
      contact_form_endpoint: siteSettings.contact_form_endpoint || null,
      contact_form_success_message: siteSettings.contact_form_success_message || null,
      updated_at: new Date().toISOString()
    };
    const { data: saved, error: saveError } = await supabase
      .from("site_settings")
      .upsert(payload, { onConflict: "id" })
      .select("id, contact_form_endpoint, contact_form_success_message")
      .single();
    if (saveError) {
      setError(saveError.message);
    } else if (saved) {
      setSiteSettings({
        id: saved.id,
        contact_form_endpoint: saved.contact_form_endpoint || "",
        contact_form_success_message: saved.contact_form_success_message || ""
      });
      setSettingsDirty(false);
      setLastSavedAt(new Date().toLocaleString("th-TH"));
      alert("บันทึกเรียบร้อย");
    }
    setSaving(false);
  };

  const saveServiceOrder = async (list) => {
    if (!supabase || !list.length) {
      return;
    }
    setSaving(true);
    setError("");
    const updates = list.map((item, index) => ({
      id: item.id,
      sort_order: index + 1
    }));
    const results = await Promise.all(
      updates.map(({ id, sort_order }) =>
        supabase
          .from("services")
          .update({ sort_order })
          .eq("id", id)
      )
    );
    const updateError = results.find((result) => result.error)?.error;
    if (updateError) {
      setError(updateError.message);
      setOrderNotice("ไม่สามารถบันทึกลำดับได้ (ฐานข้อมูลยังไม่รองรับ sort_order)");
    }
    setSaving(false);
    if (!updateError) {
      setLastSavedAt(new Date().toLocaleString("th-TH"));
      setOrderNotice("บันทึกลำดับแล้ว");
      setTimeout(() => setOrderNotice(""), 3000);
    }
  };

  const reorderServices = (fromId, toId) => {
    if (!fromId || !toId || fromId === toId) {
      return;
    }
    const current = data.services || [];
    const fromIndex = current.findIndex((item) => item.id === fromId);
    const toIndex = current.findIndex((item) => item.id === toId);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }
    const next = [...current];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const normalized = next.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }));
    setData((prev) => ({ ...prev, services: normalized }));
    saveServiceOrder(normalized);
  };

  const handleRefreshSite = async () => {
    if (!session?.access_token) {
      setError("ไม่พบสิทธิ์การใช้งาน กรุณาเข้าสู่ระบบใหม่");
      return;
    }
    setRefreshing(true);
    setError("");
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          paths: ["/", "/services"]
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "รีเฟรชไม่สำเร็จ");
      }
      setOrderNotice("รีเฟรชหน้าเว็บแล้ว");
      setTimeout(() => setOrderNotice(""), 3000);
    } catch (err) {
      setError(err.message || "รีเฟรชไม่สำเร็จ");
    } finally {
      setRefreshing(false);
    }
  };

  const updateServiceContent = (updater) => {
    if (!serviceContent) {
      return;
    }
    const next = cloneContent(serviceContent);
    updater(next);
    handleChange("content", stringifyServiceContent(next));
  };

  const readLines = (value) =>
    String(value || "")
      .split("\n")
      .map((line) => line.trim());

  const handleAutoSlug = () => {
    if (!activeItem?.title) {
      return;
    }
    handleChange("slug", ensureSlug(activeItem.title));
  };

  const getTypeCompletion = (item) => {
    const checks = [
      Boolean(item?.title?.trim()),
      Boolean(item?.description?.trim()),
      Boolean(item?.image?.url?.trim()),
      (item?.fitList || []).some((line) => String(line).trim()),
      (item?.highlightList || []).some((line) => String(line).trim())
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  const handleAddCategory = async () => {
    if (!activeItem) {
      return;
    }
    const nextLabel = newCategoryName.trim();
    if (!nextLabel) {
      return;
    }
    const currentCategories = activeItem.categories || [];
    const currentColors = activeItem.categoryColors || [];
    if (currentCategories.length >= 3) {
      alert("กำหนดหมวดหมู่ได้ไม่เกิน 3 รายการ");
      return;
    }
    if (currentCategories.includes(nextLabel)) {
      return;
    }
    const existing = categoryOptions.find((option) => option.name === nextLabel);
    let color = newCategoryColor;
    if (!existing && supabase) {
      const { data, error: insertError } = await supabase
        .from("article_categories")
        .insert({ name: nextLabel, color: newCategoryColor })
        .select("*")
        .single();
      if (insertError) {
        setError(insertError.message);
        return;
      }
      color = data?.color || newCategoryColor;
      setCategoryOptions((prev) => [
        ...prev,
        { id: data?.id || nextLabel, name: nextLabel, color }
      ]);
    } else if (existing) {
      color = existing.color || newCategoryColor;
    }
    handleChange("categories", [...currentCategories, nextLabel]);
    handleChange("categoryColors", [...currentColors, color]);
    setNewCategoryName("");
  };

  const handleRemoveCategory = (name, index) => {
    if (!activeItem) {
      return;
    }
    const currentCategories = activeItem.categories || [];
    const currentColors = activeItem.categoryColors || [];
    const removeIndex =
      typeof index === "number" && index >= 0
        ? index
        : currentCategories.findIndex((cat) => cat === name);
    if (removeIndex < 0) {
      return;
    }
    const nextCategories = currentCategories.filter((_, i) => i !== removeIndex);
    const nextColors = currentColors.filter((_, i) => i !== removeIndex);
    handleChange("categories", nextCategories);
    handleChange("categoryColors", nextColors);
  };

  const handleDeleteCategoryOption = async (option) => {
    if (!option?.name) {
      return;
    }
    const shouldDelete = window.confirm(`ลบหมวดหมู่ \"${option.name}\" ออกจากรายการหรือไม่?`);
    if (!shouldDelete) {
      return;
    }

    setError("");
    if (supabase) {
      const { error: deleteError } = await supabase
        .from("article_categories")
        .delete()
        .eq("name", option.name);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }
    }

    setCategoryOptions((prev) => prev.filter((entry) => entry.name !== option.name));
    const index = (activeItem?.categories || []).findIndex((cat) => cat === option.name);
    if (index >= 0) {
      handleRemoveCategory(option.name, index);
    }
  };

  const handleUpload = async (file) => {
    if (!supabase || !activeItem?.id) {
      return;
    }
    setUploading(true);
    setError("");
    const compressedFile = await compressImage(file);
    const sanitizedName = compressedFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${activeTab}/${activeItem.id}/${Date.now()}-${sanitizedName}`;
    const { error: uploadError } = await supabase
      .storage
      .from("cms-public")
      .upload(path, compressedFile, { upsert: true });
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

  const handleContentUpload = async (file, onUploaded) => {
    if (!supabase || !activeItem?.id) {
      return;
    }
    setUploading(true);
    setError("");
    const compressedFile = await compressImage(file);
    const sanitizedName = compressedFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${activeTab}/${activeItem.id}/content-${Date.now()}-${sanitizedName}`;
    const { error: uploadError } = await supabase
      .storage
      .from("cms-public")
      .upload(path, compressedFile, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("cms-public").getPublicUrl(path);
    if (urlData?.publicUrl && typeof onUploaded === "function") {
      onUploaded(urlData.publicUrl);
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
                  ? "bg-[#d32f2f] text-white"
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
                  ? "bg-[#d32f2f] text-white"
                  : "bg-transparent text-[#181411] hover:bg-[#f8f7f6]"
              }`}
              onClick={() => {
                setActiveTab("services");
                setIsEditorOpen(false);
              }}
            >
              บริการ
            </button>
            <button
              type="button"
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === "scripts"
                  ? "bg-[#d32f2f] text-white"
                  : "bg-transparent text-[#181411] hover:bg-[#f8f7f6]"
              }`}
              onClick={() => {
                setActiveTab("scripts");
                setIsEditorOpen(false);
              }}
            >
              สคริปต์ไซต์
            </button>
            <button
              type="button"
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === "settings"
                  ? "bg-[#d32f2f] text-white"
                  : "bg-transparent text-[#181411] hover:bg-[#f8f7f6]"
              }`}
              onClick={() => {
                setActiveTab("settings");
                setIsEditorOpen(false);
              }}
            >
              ตั้งค่าแบบฟอร์ม
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
                {activeTab === "articles"
                  ? "Articles"
                  : activeTab === "services"
                  ? "Services"
                  : activeTab === "scripts"
                  ? "Site Scripts"
                  : "Form Settings"}
              </p>
              <h2 className="text-3xl font-black mt-2">
                {activeTab === "articles"
                  ? "รายการบทความ"
                  : activeTab === "services"
                  ? "รายการบริการ"
                  : activeTab === "scripts"
                  ? "สคริปต์ของเว็บไซต์"
                  : "ตั้งค่าแบบฟอร์มติดต่อ"}
              </h2>
              <p className="text-xs text-[#897261] mt-2">
                {activeTab === "articles"
                  ? "คลิกบทความเพื่อแก้ไขในหน้าต่างแบบป๊อปอัป"
                  : activeTab === "services"
                  ? "คลิกบริการเพื่อแก้ไขในหน้าต่างแบบป๊อปอัป"
                  : activeTab === "scripts"
                  ? "ใช้สำหรับใส่สคริปต์/แท็กที่ต้องแทรกใน <head> และ <body>"
                  : "ตั้งค่า Apps Script เพื่อบันทึกข้อมูลฟอร์มลง Google Sheet"}
              </p>
              {activeTab === "articles" ? (
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#897261]">
                  <span>
                    บทความทั้งหมด{" "}
                    <span className="text-[#181411] font-semibold">{articleCounts.total}</span>
                  </span>
                  <span>
                    ออนไลน์{" "}
                    <span className="text-[#181411] font-semibold">{articleCounts.online}</span>
                  </span>
                  <span>
                    ออฟไลน์{" "}
                    <span className="text-[#181411] font-semibold">{articleCounts.offline}</span>
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              {activeTab === "services" ? (
                <button
                  type="button"
                  className={`px-5 py-2 rounded-full text-sm font-bold border ${
                    refreshing ? "border-gray-200 text-gray-400" : "border-[#181411] text-[#181411]"
                  }`}
                  onClick={handleRefreshSite}
                  disabled={refreshing}
                >
                  {refreshing ? "กำลังรีเฟรช..." : "รีเฟรชหน้าเว็บ"}
                </button>
              ) : null}
              {!isScriptsTab && !isSettingsTab ? (
                <button
                  type="button"
                  className="px-5 py-2 rounded-full text-sm font-bold bg-[#d32f2f] text-white"
                  onClick={handleNew}
                >
                  เพิ่มรายการ
                </button>
              ) : null}
            </div>
          </div>

          {loading ? (
            <div className="text-sm text-[#897261] mt-6">กำลังโหลดข้อมูล...</div>
          ) : null}
          {error ? (
            <div className="mt-4 text-xs text-red-500">{error}</div>
          ) : null}
          {orderNotice ? (
            <div className="mt-3 text-xs text-[#2e7d32]">{orderNotice}</div>
          ) : null}

          {isScriptsTab ? (
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
                <strong>สำหรับผู้ดูแลเท่านั้น:</strong> ช่องนี้รองรับโค้ด HTML/สคริปต์แบบ raw
                ระบบจะไม่ทำการ escape กรุณาตรวจสอบความถูกต้องก่อนบันทึก
              </div>
              {!isAdmin ? (
                <div className="text-xs text-red-500">
                  บัญชีนี้ไม่ได้รับสิทธิ์ admin จึงไม่สามารถแก้ไขสคริปต์ได้
                </div>
              ) : null}
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Head Scripts (ก่อนปิด &lt;/head&gt;)
                <textarea
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[160px]"
                  value={siteScripts.head_scripts}
                  onChange={(event) => handleScriptsChange("head_scripts", event.target.value)}
                  disabled={!isAdmin}
                  placeholder="<script>...</script>"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Body Scripts (หลังเปิด &lt;body&gt;)
                <textarea
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[160px]"
                  value={siteScripts.body_scripts}
                  onChange={(event) => handleScriptsChange("body_scripts", event.target.value)}
                  disabled={!isAdmin}
                  placeholder="<noscript>...</noscript>"
                />
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`px-5 py-2 rounded-full text-sm font-bold border ${
                    scriptsDirty && isAdmin ? "border-[#181411] text-[#181411]" : "border-gray-200 text-gray-400"
                  }`}
                  disabled={!scriptsDirty || !isAdmin || saving}
                  onClick={saveSiteScripts}
                >
                  บันทึกสคริปต์
                </button>
                {saving ? <span className="text-xs text-[#897261]">กำลังบันทึก...</span> : null}
              </div>
            </div>
          ) : isSettingsTab ? (
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-900">
                ตั้งค่า URL ของ Apps Script Web App เพื่อรับข้อมูลจากฟอร์มติดต่อและบันทึกลง Google Sheet
              </div>
              <button
                type="button"
                className="w-fit px-4 py-2 rounded-full text-xs font-bold border border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-white transition-colors"
                onClick={() => setShowFormGuide((prev) => !prev)}
              >
                วิธีใช้งานโดยละเอียด
              </button>
              {showFormGuide ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-4 text-xs text-[#4c3f35] space-y-3">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>สร้าง Google Sheet ใหม่ แล้วเปิด Apps Script (Extensions → Apps Script)</li>
                    <li>วางโค้ดด้านล่างลงในไฟล์ `Code.gs` แล้วกด Save</li>
                    <li>กด Deploy → New deployment → Web app</li>
                    <li>ตั้งค่า Execute as: Me และ Who has access: Anyone</li>
                    <li>คัดลอก URL ที่ได้ แล้ววางในช่อง Apps Script Web App URL ด้านล่าง</li>
                  </ol>
                  <div className="rounded-xl border border-gray-200 bg-[#f8f7f6] p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
{`function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = e.parameter || {};
  const row = [
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.service_type || "",
    data.message || ""
  ];
  sheet.appendRow(row);
  return ContentService.createTextOutput("OK");
}`}
                  </div>
                  <p className="text-[11px] text-[#897261]">
                    หมายเหตุ: คอลัมน์จะเรียงตามลำดับ วันเวลา, ชื่อ, อีเมล, โทร, ประเภทบริการ, ข้อความ
                  </p>
                </div>
              ) : null}
              {!isAdmin ? (
                <div className="text-xs text-red-500">
                  บัญชีนี้ไม่ได้รับสิทธิ์ admin จึงไม่สามารถแก้ไขการตั้งค่าได้
                </div>
              ) : null}
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Apps Script Web App URL
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  value={siteSettings.contact_form_endpoint}
                  onChange={(event) => handleSettingsChange("contact_form_endpoint", event.target.value)}
                  disabled={!isAdmin}
                  placeholder="https://script.google.com/macros/s/...../exec"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                ข้อความหลังส่งสำเร็จ
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  value={siteSettings.contact_form_success_message}
                  onChange={(event) => handleSettingsChange("contact_form_success_message", event.target.value)}
                  disabled={!isAdmin}
                  placeholder="ส่งข้อมูลเรียบร้อยแล้ว"
                />
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`px-5 py-2 rounded-full text-sm font-bold border ${
                    settingsDirty && isAdmin ? "border-[#181411] text-[#181411]" : "border-gray-200 text-gray-400"
                  }`}
                  disabled={!settingsDirty || !isAdmin || saving}
                  onClick={saveSiteSettings}
                >
                  บันทึกการตั้งค่า
                </button>
                {saving ? <span className="text-xs text-[#897261]">กำลังบันทึก...</span> : null}
              </div>
            </div>
          ) : (
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className={`hidden md:grid gap-3 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#897261] border-b border-gray-100 ${
                activeTab === "services"
                  ? "grid-cols-[140px_minmax(0,1fr)_140px_160px_120px]"
                  : "grid-cols-[88px_minmax(0,1fr)_140px_160px_120px]"
              }`}
            >
              <span>{activeTab === "services" ? "เรียงลำดับ" : "รูป"}</span>
              <span>ชื่อ</span>
              <span>หมวดหมู่</span>
              <span>วันที่</span>
              <span>สถานะ</span>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const previewBase =
                  activeTab === "services"
                    ? `/preview/services/${item.slug || "preview"}`
                    : `/preview/articles/${item.slug || "preview"}`;
                const previewHref = item.id ? `${previewBase}?id=${item.id}` : previewBase;
                const heroImage =
                  activeTab === "services"
                    ? item.heroImage || parseServiceContent(item.content || "")?.hero?.image?.url
                    : item.heroImage;
                return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className={`w-full text-left px-5 py-4 grid grid-cols-1 gap-3 items-center transition-colors ${
                    activeTab === "services"
                      ? "md:grid-cols-[140px_minmax(0,1fr)_140px_160px_120px]"
                      : "md:grid-cols-[88px_minmax(0,1fr)_140px_160px_120px]"
                  } ${item.id === activeId ? "bg-[#f4f2f0]" : "hover:bg-[#f8f7f6]"} ${
                    draggingServiceId === item.id ? "ring-2 ring-[#d32f2f] ring-inset" : ""
                  }`}
                  onClick={() => handleSelect(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(item.id);
                    }
                  }}
                  onDragOver={(event) => {
                    if (activeTab === "services" && draggingServiceId) {
                      event.preventDefault();
                    }
                  }}
                  onDrop={(event) => {
                    if (activeTab !== "services") {
                      return;
                    }
                    event.preventDefault();
                    const sourceId = event.dataTransfer.getData("text/plain");
                    reorderServices(sourceId, item.id);
                    setDraggingServiceId("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    {activeTab === "services" ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-[#897261] hover:bg-[#f8f7f6] cursor-grab"
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData("text/plain", item.id);
                          event.dataTransfer.effectAllowed = "move";
                          setDraggingServiceId(item.id);
                        }}
                        onDragEnd={() => setDraggingServiceId("")}
                        onClick={(event) => event.stopPropagation()}
                        title="ลากเพื่อเรียงลำดับ"
                      >
                        <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
                      </button>
                    ) : (
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {heroImage ? (
                          <img
                            src={heroImage}
                            alt={item.title || "thumbnail"}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                    )}
                    {activeTab === "services" ? (
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {heroImage ? (
                          <img
                            src={heroImage}
                            alt={item.title || "thumbnail"}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                    ) : null}
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
                      <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#d32f2f]">
                        ยังไม่บันทึก
                      </div>
                    ) : null}
                  </div>
                  <div className="text-sm text-[#4c3f35]">
                    {isArticle && item.categories?.length
                      ? item.categories.slice(0, 3).join(", ")
                      : isArticle && item.category
                      ? item.category
                      : "-"}
                  </div>
                  <div className="text-sm text-[#4c3f35]">
                    {isArticle ? item.date || "-" : "-"}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={previewHref}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-[#181411] hover:bg-[#f4f2f0]"
                      title="ดู preview"
                      onClick={(event) => event.stopPropagation()}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </a>
                    <button
                      type="button"
                      className={`relative inline-flex h-7 w-14 items-center rounded-full p-1 transition-colors border ${
                        item.status === "published"
                          ? "bg-[#d32f2f] border-[#d32f2f]"
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
                </div>
              );
              })}
              {!items.length && !loading ? (
                <div className="text-sm text-[#897261] px-5 py-6">ยังไม่มีรายการ</div>
              ) : null}
            </div>
          </div>
          )}
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
              {isArticle ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "content", label: "Content" },
                      { key: "meta", label: "Meta keyword" }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                          articleEditorTab === tab.key
                            ? "bg-[#d32f2f] text-white border-[#d32f2f]"
                            : "border-gray-200 text-[#181411] hover:bg-[#f4f2f0]"
                        }`}
                        onClick={() => setArticleEditorTab(tab.key)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  {articleEditorTab === "content" ? (
                    <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      ชื่อเรื่อง
                      <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.title}
                        onChange={(event) => handleChange("title", event.target.value)}
                        placeholder="เช่น เทคนิคแต่งบ้าน"
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
                    </>
                  ) : null}
                  {articleEditorTab === "meta" ? (
                    <div className="rounded-2xl border border-gray-100 p-4">
                      <input
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                        value={activeItem.metaKeywords}
                        onChange={(event) => handleChange("metaKeywords", event.target.value)}
                        placeholder="Keyword (เช่น ตกแต่งบ้าน, ม่าน, วอลเปเปอร์)"
                      />
                    </div>
                  ) : null}
                </>
              ) : null}

              {!isArticle && serviceContent ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">ข้อมูลหน้า Service (แยกเป็น Section)</p>
                      <p className="text-xs text-[#897261]">
                        แก้ไขแต่ละ section ได้โดยไม่ต้องเขียนโค้ด
                      </p>
                    </div>
                  </div>

                  <div className="sticky top-[72px] z-10 -mx-6 bg-white px-6 py-3 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "hero", label: "Hero" },
                        { key: "intro", label: "Intro" },
                        { key: "types", label: "ประเภทบริการ" },
                        { key: "specs", label: "วัสดุ/สี/ขนาด" },
                        { key: "gallery", label: "แกลเลอรี" },
                        { key: "articles", label: "บทความ" },
                      { key: "faq", label: "FAQ" }
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            serviceEditorTab === tab.key
                              ? "bg-[#d32f2f] text-white border-[#d32f2f]"
                              : "border-gray-200 text-[#181411] hover:bg-[#f4f2f0]"
                          }`}
                          onClick={() => setServiceEditorTab(tab.key)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {serviceEditorTab === "hero" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">Hero</h4>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          คำเรียกบริการ (service label)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.serviceLabel}
                          onChange={(event) => {
                            const nextLabel = event.target.value;
                            updateServiceContent((draft) => {
                              draft.serviceLabel = nextLabel;
                            });
                            handleChange("title", nextLabel);
                            if (!activeItem.slug) {
                              handleChange("slug", ensureSlug(nextLabel));
                            }
                          }}
                            placeholder="เช่น ฉากกั้นห้อง"
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          Slug
                          <div className="flex gap-2">
                            <input
                              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                              value={activeItem.slug}
                              onChange={(event) => handleChange("slug", event.target.value)}
                              placeholder="เช่น room-partition"
                            />
                            <button
                              type="button"
                              className="px-3 py-2 text-xs rounded-lg border border-gray-200"
                              onClick={() => {
                                const nextSlug = ensureSlug(serviceContent.serviceLabel || "");
                                handleChange("slug", nextSlug);
                              }}
                            >
                              Auto
                            </button>
                          </div>
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          หัวข้อหลัก
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.hero.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.hero.title = event.target.value;
                              })
                            }
                            placeholder="เช่น บริการติดตั้งฉากกั้นห้อง"
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                          คำอธิบาย
                          <textarea
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[90px]"
                            value={serviceContent.hero.subtitle}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.hero.subtitle = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          รูปภาพหลัก (alt)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.hero.image.alt}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.hero.image.alt = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                          รูปภาพหลัก (อัปโหลด)
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
                              handleContentUpload(file, (url) =>
                                updateServiceContent((draft) => {
                                  draft.hero.image.url = url;
                                })
                              );
                            }}
                          />
                        </label>
                        {uploading ? (
                          <div className="text-xs text-[#897261] md:col-span-2">กำลังอัปโหลดรูป...</div>
                        ) : null}
                        {serviceContent.hero.image.url ? (
                          <div className="rounded-2xl overflow-hidden border border-gray-100 md:col-span-2">
                            <img
                              src={serviceContent.hero.image.url}
                              alt={serviceContent.hero.image.alt || "preview"}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {serviceEditorTab === "intro" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">Intro</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          หัวข้อ
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.intro.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.intro.title = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          รูปภาพประกอบ (alt)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.intro.image.alt}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.intro.image.alt = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
                          รูปภาพประกอบ (อัปโหลด)
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
                              handleContentUpload(file, (url) =>
                                updateServiceContent((draft) => {
                                  draft.intro.image.url = url;
                                })
                              );
                            }}
                          />
                        </label>
                        {uploading ? (
                          <div className="text-xs text-[#897261] md:col-span-2">กำลังอัปโหลดรูป...</div>
                        ) : null}
                        {serviceContent.intro.image.url ? (
                          <div className="rounded-2xl overflow-hidden border border-gray-100 md:col-span-2">
                            <img
                              src={serviceContent.intro.image.url}
                              alt={serviceContent.intro.image.alt || "preview"}
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#897261]">รายการคำอธิบาย</p>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#d32f2f]"
                            onClick={() =>
                              updateServiceContent((draft) => {
                                draft.intro.items.push({ heading: "", body: "" });
                              })
                            }
                          >
                            เพิ่มรายการ
                          </button>
                        </div>
                        {serviceContent.intro.items.map((item, index) => (
                          <div
                            key={`intro-${index}`}
                            className="rounded-xl border border-gray-200 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold">หัวข้อ #{index + 1}</p>
                              <button
                                type="button"
                                className="text-xs text-red-500"
                                onClick={() =>
                                  updateServiceContent((draft) => {
                                    draft.intro.items.splice(index, 1);
                                  })
                                }
                              >
                                ลบ
                              </button>
                            </div>
                            <input
                              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-full"
                              value={item.heading}
                              onChange={(event) =>
                                updateServiceContent((draft) => {
                                  draft.intro.items[index].heading = event.target.value;
                                })
                              }
                              placeholder="หัวข้อ"
                            />
                            <textarea
                              className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[80px] w-full"
                              value={item.body}
                              onChange={(event) =>
                                updateServiceContent((draft) => {
                                  draft.intro.items[index].body = event.target.value;
                                })
                              }
                              placeholder="รายละเอียด"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {serviceEditorTab === "types" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">ประเภทสินค้า/บริการ</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-1">
                          หัวข้อหลัก
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.types.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.types.title = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-2">
                          หัวข้อเล็ก (eyebrow)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.types.eyebrow}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.types.eyebrow = event.target.value;
                              })
                            }
                          />
                        </label>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#897261]">รายการประเภท</p>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#d32f2f]"
                            onClick={() =>
                              updateServiceContent((draft) => {
                                draft.types.items.push({
                                  title: "",
                                  description: "",
                                  fitTitle: "",
                                  fitList: [],
                                  highlightTitle: "",
                                  highlightList: [],
                                  image: { url: "", alt: "" }
                                });
                              })
                            }
                          >
                            เพิ่มรายการ
                          </button>
                        </div>
                        {serviceContent.types.items.map((item, index) => {
                          const completion = getTypeCompletion(item);
                          return (
                            <details
                              key={`types-${index}`}
                              className="rounded-xl border border-gray-200 bg-white"
                              open={index === 0}
                            >
                              <summary className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2">
                                <div>
                                  <p className="text-xs font-semibold">
                                    ประเภท #{index + 1} {item.title ? `· ${item.title}` : ""}
                                  </p>
                                  <p className="text-[11px] text-[#897261]">
                                    กรอกครบ {completion}%
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  className="text-xs text-red-500"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    updateServiceContent((draft) => {
                                      draft.types.items.splice(index, 1);
                                    });
                                  }}
                                >
                                  ลบ
                                </button>
                              </summary>
                              <div className="px-3 pb-3 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <input
                                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                    value={item.title}
                                    onChange={(event) =>
                                      updateServiceContent((draft) => {
                                        draft.types.items[index].title = event.target.value;
                                      })
                                    }
                                    placeholder="ชื่อประเภท"
                                  />
                                  <input
                                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                    value={item.image.alt}
                                    onChange={(event) =>
                                      updateServiceContent((draft) => {
                                        draft.types.items[index].image.alt = event.target.value;
                                      })
                                    }
                                    placeholder="รูปภาพ (alt)"
                                  />
                                  <label className="flex flex-col gap-2 text-xs font-semibold md:col-span-2">
                                    อัปโหลดรูปภาพ
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
                                        handleContentUpload(file, (url) =>
                                          updateServiceContent((draft) => {
                                            draft.types.items[index].image.url = url;
                                          })
                                        );
                                      }}
                                    />
                                  </label>
                                  <div className="text-xs text-[#897261] self-center">
                                    หัวข้อย่อยใช้ค่าคงที่ในหน้าแสดงผล
                                  </div>
                                </div>
                                {uploading ? (
                                  <div className="text-xs text-[#897261]">กำลังอัปโหลดรูป...</div>
                                ) : null}
                                {item.image.url ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                      <img
                                        src={item.image.url}
                                        alt={item.image.alt || "preview"}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <p className="text-xs text-[#897261]">พรีวิวภาพ</p>
                                  </div>
                                ) : null}
                                <textarea
                                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[80px] w-full"
                                  value={item.description}
                                  onChange={(event) =>
                                    updateServiceContent((draft) => {
                                      draft.types.items[index].description = event.target.value;
                                    })
                                  }
                                  placeholder="คำอธิบาย"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <label className="flex flex-col gap-2 text-xs font-semibold">
                                    รายการเหมาะกับ (ใส่ทีละบรรทัด)
                                    <textarea
                                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
                                      value={(item.fitList || []).join("\n")}
                                      onChange={(event) =>
                                        updateServiceContent((draft) => {
                                          draft.types.items[index].fitList = readLines(event.target.value);
                                        })
                                      }
                                    />
                                  </label>
                                  <label className="flex flex-col gap-2 text-xs font-semibold">
                                    รายการจุดเด่น (ใส่ทีละบรรทัด)
                                    <textarea
                                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
                                      value={(item.highlightList || []).join("\n")}
                                      onChange={(event) =>
                                        updateServiceContent((draft) => {
                                          draft.types.items[index].highlightList = readLines(event.target.value);
                                        })
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            </details>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {serviceEditorTab === "specs" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">วัสดุ / สี / ขนาด</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-1">
                          หัวข้อหลัก
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.specs.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.specs.title = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-2">
                          หัวข้อเล็ก (eyebrow)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.specs.eyebrow}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.specs.eyebrow = event.target.value;
                              })
                            }
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold">
                          รูปภาพ (alt)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.specs.image?.alt || ""}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.specs.image = draft.specs.image || { url: "", alt: "" };
                                draft.specs.image.alt = event.target.value;
                              })
                            }
                          />
                        </label>
                      </div>
                      <label className="flex flex-col gap-2 text-sm font-semibold">
                        รูปภาพ (อัปโหลด) <span className="text-xs font-normal text-[#897261]">แนะนำสูง 350px (ปรับตามหน้าจอ)</span>
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
                            handleContentUpload(file, (url) =>
                              updateServiceContent((draft) => {
                                draft.specs.image = draft.specs.image || { url: "", alt: "" };
                                draft.specs.image.url = url;
                              })
                            );
                          }}
                        />
                      </label>
                      {uploading ? (
                        <div className="text-xs text-[#897261]">กำลังอัปโหลดรูป...</div>
                      ) : null}
                      {serviceContent.specs.image?.url ? (
                        <div className="rounded-2xl overflow-hidden border border-gray-100">
                          <img
                            src={serviceContent.specs.image.url}
                            alt={serviceContent.specs.image.alt || "preview"}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-xs font-semibold">
                          วัสดุ (ใส่ทีละบรรทัด)
                          <textarea
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[120px]"
                            value={(serviceContent.specs.materials || []).join("\n")}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.specs.materials = readLines(event.target.value);
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-xs font-semibold">
                          สี (ใส่ทีละบรรทัด)
                          <textarea
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[120px]"
                            value={(serviceContent.specs.colors || []).join("\n")}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.specs.colors = readLines(event.target.value);
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {serviceEditorTab === "gallery" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">แกลเลอรีภาพ</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-1">
                          หัวข้อหลัก
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.gallery.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.gallery.title = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-2">
                          หัวข้อเล็ก (eyebrow)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.gallery.eyebrow}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.gallery.eyebrow = event.target.value;
                              })
                            }
                          />
                        </label>
                      </div>
                      <label className="flex flex-col gap-2 text-sm font-semibold">
                        คำอธิบาย
                        <textarea
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[80px]"
                          value={serviceContent.gallery.subtitle}
                          onChange={(event) =>
                            updateServiceContent((draft) => {
                              draft.gallery.subtitle = event.target.value;
                            })
                          }
                        />
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#897261]">รายการภาพ</p>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#d32f2f]"
                            onClick={() =>
                              updateServiceContent((draft) => {
                                draft.gallery.images.push({ url: "", alt: "" });
                              })
                            }
                          >
                            เพิ่มภาพ
                          </button>
                        </div>
                        {serviceContent.gallery.images.map((image, index) => (
                          <div
                            key={`gallery-${index}`}
                            className="rounded-xl border border-gray-200 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold">ภาพ #{index + 1}</p>
                              <button
                                type="button"
                                className="text-xs text-red-500"
                                onClick={() =>
                                  updateServiceContent((draft) => {
                                    draft.gallery.images.splice(index, 1);
                                  })
                                }
                              >
                                ลบ
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                value={image.alt}
                                onChange={(event) =>
                                  updateServiceContent((draft) => {
                                    draft.gallery.images[index].alt = event.target.value;
                                  })
                                }
                                placeholder="รูป (alt)"
                              />
                              <label className="flex flex-col gap-2 text-xs font-semibold md:col-span-2">
                                อัปโหลดรูปภาพ
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
                                    handleContentUpload(file, (url) =>
                                      updateServiceContent((draft) => {
                                        draft.gallery.images[index].url = url;
                                      })
                                    );
                                  }}
                                />
                              </label>
                            </div>
                            {uploading ? (
                              <div className="text-xs text-[#897261]">กำลังอัปโหลดรูป...</div>
                            ) : null}
                            {image.url ? (
                              <div className="flex items-center gap-3">
                                <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                  <img
                                    src={image.url}
                                    alt={image.alt || "preview"}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-xs text-[#897261]">พรีวิวภาพ</p>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {serviceEditorTab === "articles" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">บทความที่เกี่ยวข้อง</h4>
                      <p className="text-xs text-[#897261]">
                        เลือกบทความได้สูงสุด 3 รายการ (ข้อมูลส่วนหัวใช้แบบคงที่)
                      </p>
                      {(() => {
                        const articleContent =
                          parseServiceContent(activeItem.content || "") ||
                          buildServiceContentTemplate({
                            serviceLabel: activeItem.title || "",
                            heroImageUrl: activeItem.heroImage || "",
                            heroImageAlt: activeItem.title || ""
                          });
                        const availableArticles = data.articles || [];
                        const availableIds = new Set(
                          availableArticles.map((article) => article.id).filter(Boolean)
                        );
                        const selectedIds = new Set(
                          (articleContent.articles.items || [])
                            .map((item) => item.id)
                            .filter((id) => id && availableIds.has(id))
                        );
                        return (
                          <>
                      <label className="flex flex-col gap-2 text-sm font-semibold">
                        ค้นหาบทความ
                        <input
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                          value={articleSearch}
                          onChange={(event) => setArticleSearch(event.target.value)}
                          placeholder="พิมพ์ชื่อบทความ..."
                        />
                      </label>
                      <div className="space-y-2">
                        {availableArticles
                          .filter((article) => {
                            const keyword = articleSearch.trim().toLowerCase();
                            if (!keyword) {
                              return true;
                            }
                            return String(article.title || "").toLowerCase().includes(keyword);
                          })
                           .map((article) => {
                           const isSelected = selectedIds.has(article.id);
                           return (
                             <label
                               key={article.id}
                               className="flex items-center gap-3 rounded-xl border border-gray-200 p-3"
                             >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    const currentIds = Array.from(selectedIds);
                                    let nextIds = currentIds;
                                    if (isSelected) {
                                      nextIds = currentIds.filter((id) => id !== article.id);
                                    } else if (currentIds.length < 3) {
                                      nextIds = [...currentIds, article.id];
                                   } else {
                                     alert("เลือกบทความได้สูงสุด 3 รายการ");
                                     return;
                                   }
                                    const nextItems = nextIds
                                      .map((id) => availableArticles.find((entry) => entry.id === id))
                                      .filter(Boolean)
                                      .map((entry) => ({
                                       id: entry.id,
                                       image: {
                                         url: entry.heroImage || "",
                                         alt: entry.title || ""
                                       },
                                       categoryLabel:
                                         entry.category ||
                                         (entry.categories || [])[0] ||
                                         "บทความ",
                                        title: entry.title || "",
                                        href: `/articles/${entry.slug || entry.id}`
                                      }));
                                    const nextContent = cloneContent(articleContent);
                                    nextContent.articles.items = nextItems;
                                    handleChange("content", stringifyServiceContent(nextContent));
                                  }}
                                />
                              <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                {article.heroImage ? (
                                  <img
                                    src={article.heroImage}
                                    alt={article.title || "article"}
                                    className="w-full h-full object-cover"
                                  />
                                ) : null}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{article.title || "ไม่มีชื่อ"}</p>
                                <p className="text-xs text-[#897261]">
                                  {article.category || (article.categories || [])[0] || "บทความ"}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : null}

                  {serviceEditorTab === "faq" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <h4 className="text-sm font-bold">คำถามที่พบบ่อย (FAQ)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-1">
                          หัวข้อหลัก
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.faq.title}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.faq.title = event.target.value;
                              })
                            }
                          />
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-semibold md:order-2">
                          หัวข้อเล็ก (eyebrow)
                          <input
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                            value={serviceContent.faq.eyebrow}
                            onChange={(event) =>
                              updateServiceContent((draft) => {
                                draft.faq.eyebrow = event.target.value;
                              })
                            }
                          />
                        </label>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#897261]">รายการคำถาม</p>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#d32f2f]"
                            onClick={() =>
                              updateServiceContent((draft) => {
                                draft.faq.items.push({ question: "", answer: "" });
                              })
                            }
                          >
                            เพิ่มคำถาม
                          </button>
                        </div>
                        {serviceContent.faq.items.map((item, index) => (
                          <div
                            key={`faq-${index}`}
                            className="rounded-xl border border-gray-200 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold">คำถาม #{index + 1}</p>
                              <button
                                type="button"
                                className="text-xs text-red-500"
                                onClick={() =>
                                  updateServiceContent((draft) => {
                                    draft.faq.items.splice(index, 1);
                                  })
                                }
                              >
                                ลบ
                              </button>
                            </div>
                            <input
                              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-full"
                              value={item.question}
                              onChange={(event) =>
                                updateServiceContent((draft) => {
                                  draft.faq.items[index].question = event.target.value;
                                })
                              }
                              placeholder="คำถาม"
                            />
                            <textarea
                              className="rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[70px] w-full"
                              value={item.answer}
                              onChange={(event) =>
                                updateServiceContent((draft) => {
                                  draft.faq.items[index].answer = event.target.value;
                                })
                              }
                              placeholder="คำตอบ"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                </div>
              ) : null}

              {isArticle ? (
                articleEditorTab === "content" ? (
                  <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold">
                      หมวดหมู่ (สูงสุด 3)
                      <div className="flex flex-wrap gap-2">
                        {(activeItem.categories || []).map((cat, index) => (
                          <span
                            key={`${cat}-${index}`}
                            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full text-white"
                            style={{ backgroundColor: activeItem.categoryColors?.[index] || "#d32f2f" }}
                          >
                            {cat}
                            <button
                              type="button"
                              className="text-[10px] font-bold text-white/80"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                handleRemoveCategory(cat, index);
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categoryOptions.length ? (
                          categoryOptions.map((option) => {
                            const selected = (activeItem.categories || []).includes(option.name);
                            return (
                              <div key={option.id} className="inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                                    selected ? "text-white border-transparent" : "border-gray-200 text-[#181411]"
                                  }`}
                                  style={selected ? { backgroundColor: option.color } : undefined}
                                  onClick={() => {
                                    if (selected) {
                                      const index = activeItem.categories.indexOf(option.name);
                                      handleRemoveCategory(option.name, index);
                                      return;
                                    }
                                    const currentCategories = activeItem.categories || [];
                                    const currentColors = activeItem.categoryColors || [];
                                    if (currentCategories.length >= 3) {
                                      alert("กำหนดหมวดหมู่ได้ไม่เกิน 3 รายการ");
                                      return;
                                    }
                                    handleChange("categories", [...currentCategories, option.name]);
                                    handleChange("categoryColors", [...currentColors, option.color || "#d32f2f"]);
                                  }}
                                >
                                  {option.name}
                                </button>
                                <button
                                  type="button"
                                  className="h-6 w-6 rounded-full border border-gray-200 text-[11px] font-bold text-[#897261] hover:text-red-600 hover:border-red-200"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    handleDeleteCategoryOption(option);
                                  }}
                                  title={`ลบหมวดหมู่ ${option.name}`}
                                  aria-label={`ลบหมวดหมู่ ${option.name}`}
                                >
                                  x
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-xs text-[#897261]">ยังไม่มีหมวดหมู่</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                          value={newCategoryName}
                          onChange={(event) => setNewCategoryName(event.target.value)}
                          placeholder="เพิ่มหมวดหมู่ใหม่"
                        />
                        <input
                          className="h-10 w-10 rounded-lg border border-gray-200 p-1 bg-white"
                          type="color"
                          value={newCategoryColor}
                          onChange={(event) => setNewCategoryColor(event.target.value)}
                          title="สีหมวดหมู่"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 text-xs rounded-lg border border-gray-200"
                          onClick={handleAddCategory}
                        >
                          เพิ่ม
                        </button>
                      </div>
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
                    <WysiwygEditor
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
                ) : null
              ) : serviceContent ? null : (
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
