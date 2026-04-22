declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export const trackPixelEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
};

export const trackCustomPixelEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
};

export const trackPixelPageView = () => {
  trackPixelEvent("PageView");
};

export const trackViewContent = (params: {
  content_name: string;
  content_category: string;
  content_ids: string[];
  value: number;
  currency: string;
}) => {
  trackPixelEvent("ViewContent", params);
};

export const trackCTAClick = (placement: "hero" | "footer") => {
  trackPixelEvent("Lead", {
    content_name: "DIY ServiceTitan Dashboards",
    content_category: "Course",
    value: 97,
    currency: "USD",
    content_ids: ["dashboard-course-3344256"],
  });
  trackCustomPixelEvent("CheckoutButtonClick", {
    placement,
    content_name: "DIY ServiceTitan Dashboards",
  });
};

export const buildCheckoutUrl = (baseUrl: string): string => {
  try {
    const currentParams = new URLSearchParams(window.location.search);
    const url = new URL(baseUrl);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(
      (param) => {
        const value = currentParams.get(param);
        if (value) url.searchParams.set(param, value);
      }
    );
    return url.toString();
  } catch {
    return baseUrl;
  }
};
