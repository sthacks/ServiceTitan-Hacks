import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  schemaData?: object;
  noindex?: boolean;
}

const SITE_NAME = "ServiceTitan Hacks";
const DEFAULT_TITLE = "ServiceTitan Hacks - AI and Automations for Home Service Contractors";
const DEFAULT_DESCRIPTION = "AI tools for contractors. Learn ServiceTitan automation for HVAC, plumbing businesses. Free courses, tools & community. Join 10,800+ contractors.";
const DEFAULT_IMAGE = "https://servicetitanhacks.com/og-default.png";
const DEFAULT_URL = "https://servicetitanhacks.com/";

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogImageAlt,
  ogType = "website",
  schemaData,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setCanonical = (href: string) => {
      let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const applyMeta = (
      t: string,
      desc: string,
      img: string,
      url: string,
      type: string,
    ) => {
      document.title = t;
      setMeta("name", "title", t);
      setMeta("name", "description", desc);
      setMeta("property", "og:type", type);
      setMeta("property", "og:url", url);
      setMeta("property", "og:title", t);
      setMeta("property", "og:description", desc);
      setMeta("property", "og:image", img);
      setMeta("property", "og:image:width", "1200");
      setMeta("property", "og:image:height", "630");
      setMeta("property", "og:site_name", SITE_NAME);
      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:url", url);
      setMeta("name", "twitter:title", t);
      setMeta("name", "twitter:description", desc);
      setMeta("name", "twitter:image", img);
      setCanonical(url);
    };

    const pageUrl = canonicalUrl || `https://servicetitanhacks.com${window.location.pathname}`;

    applyMeta(title, description, ogImage, pageUrl, ogType);

    if (ogImageAlt) {
      setMeta("property", "og:image:alt", ogImageAlt);
      setMeta("name", "twitter:image:alt", ogImageAlt);
    }

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }

    if (schemaData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }

    return () => {
      applyMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_URL, "website");
      document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaData, noindex]);

  return null;
}
