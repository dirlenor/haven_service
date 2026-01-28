"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MockCmsPreview from "../../../../components/admin/MockCmsPreview";
import { supabase } from "../../../../lib/supabaseClient";

export default function ServicePreviewPage({ params }) {
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
      let query = supabase.from("services").select("*");
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
          content: data.content || "",
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

  return <MockCmsPreview item={item} type="services" />;
}
