"use client";

import { useMemo } from "react";
import ServiceTemplate from "../services/ServiceTemplate";
import { parseServiceContent } from "../../lib/serviceContent";

const splitContent = (content) =>
  content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function MockCmsPreview({ item, type }) {
  const blocks = useMemo(() => splitContent(item?.content || ""), [item?.content]);
  const isArticle = type === "articles";
  const structuredContent = useMemo(
    () => (isArticle ? null : parseServiceContent(item?.content || "")),
    [isArticle, item?.content]
  );
  const keywords = useMemo(
    () =>
      String(item?.metaKeywords || "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    [item?.metaKeywords]
  );

  if (!isArticle && structuredContent) {
    return <ServiceTemplate service={item} content={structuredContent} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f7f6] text-[#181411]">
      <div className="ds-container py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#897261] font-semibold">
            {type === "services" ? "Service Preview" : "Article Preview"}
          </p>
          <h1 className="text-3xl md:text-4xl font-black mt-3">{item?.title}</h1>
          {item?.summary ? (
            <p className="text-base md:text-lg text-[#897261] mt-4 max-w-2xl">{item.summary}</p>
          ) : null}
          {isArticle ? (
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#897261]">
              {item?.date ? <span>{item.date}</span> : null}
              {item?.readTime ? <span>• {item.readTime}</span> : null}
            </div>
          ) : null}
          {isArticle && keywords.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 text-[#181411] bg-white"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {item?.heroImage ? (
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-10">
            <img src={item.heroImage} alt={item?.title} className="w-full h-80 object-cover" />
          </div>
        ) : null}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
          {isArticle ? (
            <div
              className="cms-content max-w-none text-[#4c3f35]"
              dangerouslySetInnerHTML={{ __html: item?.contentHtml || "" }}
            />
          ) : (
            <div className="space-y-4 text-base text-[#4c3f35]">
              {blocks.length
                ? blocks.map((line, index) => (
                    <p key={`${line}-${index}`} className="leading-relaxed">
                      {line}
                    </p>
                  ))
                : null}
            </div>
          )}
          <aside className="bg-white rounded-2xl border border-gray-100 p-5 h-fit shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-[#897261] font-semibold">
              {type === "services" ? "Service Info" : "Article Info"}
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="text-[#897261]">Slug:</span>{" "}
                <span className="font-semibold">/{item?.slug || "-"}</span>
              </div>
              <div>
                <span className="text-[#897261]">Status:</span>{" "}
                <span className="font-semibold">{item?.status || "draft"}</span>
              </div>
              {isArticle && item?.authorName ? (
                <div>
                  <span className="text-[#897261]">Author:</span>{" "}
                  <span className="font-semibold">{item.authorName}</span>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
        {isArticle && (item?.ctaTitle || item?.ctaBody) ? (
          <div className="mt-12 bg-[#d32f2f]/10 p-6 rounded-2xl border border-[#d32f2f]/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#181411]">
                {item?.ctaTitle || "สนใจปรับโฉมบ้านกับเรา?"}
              </h3>
              {item?.ctaBody ? (
                <p className="text-sm text-[#897261] mt-1">{item.ctaBody}</p>
              ) : null}
            </div>
            {item?.ctaButtonLabel ? (
              <a
                href={item?.ctaButtonHref || "/contact"}
                className="btn btn-primary px-5 py-2 text-sm w-fit"
              >
                {item.ctaButtonLabel}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
