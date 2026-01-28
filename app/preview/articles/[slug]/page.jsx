"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MockCmsPreview from "../../../../components/admin/MockCmsPreview";
import { supabase } from "../../../../lib/supabaseClient";

export default function ArticlePreviewPage({ params }) {
  const resolvedParams = use(params);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadPreview = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const decodedSlug = decodeURIComponent(resolvedParams.slug);
      const id = searchParams.get("id");
      let query = supabase.from("articles").select("*");
      query = id ? query.eq("id", id) : query.eq("slug", decodedSlug);
      const { data, error } = await query.maybeSingle();
      if (error) {
        setItem(null);
        setLoading(false);
        return;
      }
      if (data) {
        setItem({
          id: data.id,
          slug: data.slug || "",
          title: data.title || "",
          summary: data.summary || "",
          heroImage: data.hero_image || "",
          category: data.category || "",
          date: data.date || "",
          readTime: data.read_time || "",
          authorName: data.author_name || "",
          authorRole: data.author_role || "",
          authorAvatar: data.author_avatar || "",
          contentHtml: data.content_html || "",
          ctaTitle: data.cta_title || "",
          ctaBody: data.cta_body || "",
          ctaButtonLabel: data.cta_button_label || "",
          ctaButtonHref: data.cta_button_href || "",
          status: data.status || "draft"
        });
      } else {
        setItem(null);
      }
      setLoading(false);
    };

    loadPreview();
  }, [resolvedParams.slug, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#897261]">
        กำลังโหลดข้อมูล preview...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#897261]">
        ไม่พบข้อมูลสำหรับ preview
      </div>
    );
  }

  return <MockCmsPreview item={item} type="articles" />;
}
