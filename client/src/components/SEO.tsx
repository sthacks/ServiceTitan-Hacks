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

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://servicetitanhacks.com/og-image.png",
  ogType = "website",
  schemaData,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateOrCreateMeta = (name: string, content: string, property?: boolean) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    updateOrCreateMeta("description", description);
    
    if (keywords) {
      updateOrCreateMeta("keywords", keywords);
    }

    if (noindex) {
      updateOrCreateMeta("robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }

    updateOrCreateMeta("og:title", title, true);
    updateOrCreateMeta("og:description", description, true);
    updateOrCreateMeta("og:type", ogType, true);
    updateOrCreateMeta("og:image", ogImage, true);
    
    if (canonicalUrl) {
      updateOrCreateMeta("og:url", canonicalUrl, true);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", title);
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", ogImage);

    if (schemaData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaData]);

  return null;
}
