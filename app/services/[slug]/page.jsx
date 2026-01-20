import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";

export const revalidate = 60;

const splitContent = (content) =>
  content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const loadService = async (slug) => {
  if (!supabaseServer) {
    return null;
  }
  const decoded = decodeURIComponent(slug);
  const { data: bySlug } = await supabaseServer
    .from("services")
    .select("*")
    .eq("status", "published")
    .eq("slug", decoded)
    .maybeSingle();
  if (bySlug) {
    return bySlug;
  }
  const { data: byId } = await supabaseServer
    .from("services")
    .select("*")
    .eq("status", "published")
    .eq("id", decoded)
    .maybeSingle();
  return byId || null;
};

export const generateMetadata = async ({ params }) => {
  const service = await loadService(params.slug);
  if (!service) {
    return { title: "Thai Haven Service" };
  }
  return { title: service.title || "Thai Haven Service" };
};

export default async function ServiceDetailPage({ params }) {
  const service = await loadService(params.slug);

  if (!service) {
    notFound();
  }

  const blocks = splitContent(service.content || "");

  return (
    <section className="ds-section">
      <div className="ds-container">
        <div className="mb-10 max-w-3xl">
          <h1 className="ds-title text-4xl lg:text-5xl">{service.title}</h1>
          {service.summary ? (
            <p className="ds-muted text-lg mt-4">{service.summary}</p>
          ) : null}
        </div>
        {service.hero_image ? (
          <div className="rounded-3xl overflow-hidden border border-gray-100 mb-10">
            <img
              src={service.hero_image}
              alt={service.title || "บริการ"}
              className="w-full h-80 object-cover"
            />
          </div>
        ) : null}
        <div className="space-y-4 text-base text-[#4c3f35] max-w-3xl">
          {blocks.length ? (
            blocks.map((line, index) => (
              <p key={`${line}-${index}`} className="leading-relaxed">
                {line}
              </p>
            ))
          ) : (
            <p className="text-sm text-[#897261]">รายละเอียดบริการจะมาเร็วๆ นี้</p>
          )}
        </div>
      </div>
    </section>
  );
}
