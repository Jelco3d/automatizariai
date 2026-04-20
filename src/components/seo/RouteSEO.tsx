import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  getPageSEO,
} from "@/data/seo-meta";

export function RouteSEO() {
  const { pathname } = useLocation();
  const seo = getPageSEO(pathname);

  if (!seo) return null;

  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;
  const ogType = seo.ogType ?? "website";

  const structuredArray = seo.structuredData
    ? Array.isArray(seo.structuredData)
      ? seo.structuredData
      : [seo.structuredData]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      {seo.noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ro_RO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />

      {structuredArray.map((data, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
