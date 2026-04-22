declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

const currentPageUrl = () =>
  typeof window !== "undefined" ? window.location.href : undefined;

export const trackPixelEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
};

export const trackCustomPixelEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
};

// PageView is fired once by the base pixel snippet in index.html (fbq 'track' 'PageView').
// GTM does not fire PageView. Do not call this from app code to avoid duplicates.
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
  trackPixelEvent("ViewContent", {
    ...params,
    page_url: currentPageUrl(),
  });
};

// On CTA click: fires one custom CheckoutButtonClick event only.
// Lead and InitiateCheckout are NOT fired from website code.
// If GTM fires InitiateCheckout via an outbound-link trigger, disable that trigger in GTM.
export const trackCTAClick = (placement: "hero" | "footer") => {
  trackCustomPixelEvent("CheckoutButtonClick", {
    placement,
    content_name: "DIY ServiceTitan Dashboards",
    value: 97,
    currency: "USD",
    content_ids: ["dashboard-course-3344256"],
    page_url: currentPageUrl(),
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
