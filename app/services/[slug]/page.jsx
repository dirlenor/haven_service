import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";
import ServiceTemplate from "../../../components/services/ServiceTemplate";
import { parseServiceContent } from "../../../lib/serviceContent";

export const revalidate = 60;

const splitContent = (content) =>
  content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const isUuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const loadService = async (slug) => {
  if (!supabaseServer || !slug) {
    return null;
  }
  const decoded = decodeURIComponent(slug);
  const { data: bySlug, error: slugError } = await supabaseServer
    .from("services")
    .select("*")
    .in("status", ["published", "Published"])
    .eq("slug", decoded)
    .maybeSingle();
  if (slugError) {
    console.warn("Failed to load service by slug:", slugError.message);
  }
  if (bySlug) {
    return bySlug;
  }
  if (!isUuid(decoded)) {
    return null;
  }
  const { data: byId, error: idError } = await supabaseServer
    .from("services")
    .select("*")
    .in("status", ["published", "Published"])
    .eq("id", decoded)
    .maybeSingle();
  if (idError) {
    console.warn("Failed to load service by id:", idError.message);
  }
  return byId || null;
};

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const service = await loadService(resolvedParams?.slug);
  if (!service) {
    return { title: "Thai Haven Service" };
  }
  return { title: service.title || "Thai Haven Service" };
};

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = await loadService(resolvedParams?.slug);

  if (!service) {
    notFound();
  }

  const structuredContent = parseServiceContent(service.content || "");
  if (structuredContent) {
    return <ServiceTemplate service={service} content={structuredContent} />;
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
