import { notFound } from "next/navigation";
import { getHtmlPageSlugs, readHtmlPage, readHtmlPageBody } from "../../lib/html";

export const generateStaticParams = () =>
  getHtmlPageSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  try {
    const pageData = readHtmlPage(`${slug}.html`);
    return { title: pageData.title };
  } catch (error) {
    return { title: "Thai Haven Service" };
  }
};

export default async function HtmlPage({ params }) {
  const { slug } = await params;
  try {
    const pageData = readHtmlPageBody(`${slug}.html`);
    let bodyHtml = pageData.body;
    if (slug === "contact") {
      bodyHtml = bodyHtml
        .replace(/<footer[\s\S]*?<\/footer>/i, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/class=\"w-full h-full bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-lg border border-\\[#e6e0db\\] dark:border-\\[#3d2e23\\] overflow-hidden\"/g, 'class=\"w-full h-full min-h-[260px] bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-lg border border-[#e6e0db] dark:border-[#3d2e23] overflow-hidden\"');
    }
    const wrapperClassName = [
      "legacy-page",
      "min-h-screen",
      "w-full",
      pageData.bodyClass || "",
      slug === "contact" ? "legacy-contact" : ""
    ]
      .join(" ")
      .trim();
    return (
      <div
        className={wrapperClassName}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    );
  } catch (error) {
    notFound();
  }
}
