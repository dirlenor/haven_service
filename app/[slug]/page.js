import { notFound } from "next/navigation";
import { getHtmlPageSlugs, readHtmlPage } from "../../lib/html";

export const generateStaticParams = () =>
  getHtmlPageSlugs().map((slug) => ({ slug }));

export const generateMetadata = ({ params }) => {
  try {
    const pageData = readHtmlPage(`${params.slug}.html`);
    return { title: pageData.title };
  } catch (error) {
    return { title: "Thai Haven Service" };
  }
};

export default function HtmlPage({ params }) {
  try {
    const pageData = readHtmlPage(`${params.slug}.html`);
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: pageData.body
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}
