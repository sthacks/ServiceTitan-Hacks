import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: object;
  noindex?: boolean;
}

const DEFAULT_IMAGE = "https://servicetitanhacks.com/og-default.png";
const SITE_NAME = "ServiceTitan Hacks";

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schemaData,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const pageUrl = canonicalUrl || `https://servicetitanhacks.com${window.location.pathname}`;

    setMeta("name", "title", title);
    setMeta("name", "description", description);

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }

    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:url", pageUrl);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    if (schemaData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaData, noindex]);

  return null;
}
