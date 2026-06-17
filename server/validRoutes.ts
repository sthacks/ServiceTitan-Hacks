/**
 * Canonical list of all valid public routes served by the SPA.
 * Used to:
 *  1. Return real HTTP 404 for unknown URLs (instead of soft 200 + SPA fallback)
 *  2. Avoid injecting self-canonical metadata for pages that don't exist
 *
 * Keep this in sync with client/src/App.tsx and the sitemap in server/routes.ts
 * whenever new routes, blog posts, or partner pages are added.
 */

const STATIC_ROUTES = new Set<string>([
  "/",
  "/partners",
  "/sponsors",
  "/apps",
  "/courses",
  "/all-access",
  "/podcast",
  "/resources",
  "/blog",
  "/about",
  "/contact",
  "/events",
  "/giveaway",
  "/sponsor",
  "/privacy-policy",
  "/sms-privacy-policy",
  "/sms-terms-conditions",
  "/bill",

  // Pricebook
  "/pricebook-overhaul-tool",
  "/pricebook-optimizer",
  "/pricebook-overhaul/security",
  "/pricebook-overhaul",
  "/overhaul-upload",
  "/overhaul-status",

  // ROI / calculators
  "/smartac-roi-calculator-test",
  "/smartac-roi-calculator",
  "/wink-roi-calculator",
  "/wink-roi-saver",
  "/hiring-roi-calculator",
  "/truck-roll-calculator",

  // Courses
  "/dashboard-course",
  "/dashboard-course-landing",
  "/dashboard-preview",
  "/dashboard-course/content",
  "/dashboard-course/checkout",
  "/fix-ugly-forms-course",
  "/fix-ugly-forms-course-landing",
  "/job-summary-course",
  "/company-app-course",
  "/make-integration-course",
  "/zapier-integration-course",

  // Landing pages
  "/automation-playbook-landing",
  "/servicetitan-metrics-landing",
  "/swimlane-charts-landing",
  "/pricing-objections-landing",

  // Purchasing
  "/purchasing-platform",

  // Partner demo booking (specific sub-routes before the dynamic slug)
  "/partners/wink-toolbox/book-demo",
  "/partners/smartac/book-demo",
  "/partners/contractor-commerce/book-demo",

  // Webinars
  "/webinar/stop-spreadsheet-payroll",
  "/webinar/referral-gap",
  "/webinar/incentive-plan-problem",
  "/webinar/phonetap",
  "/webinar/ai-csr",
  "/webinar/membership-retention",
  "/webinar/equipment-pricing",
  "/webinar/price-conversation",
  "/webinars/stop-buying-hours",

  // Automation services
  "/servicetitan-automation-services",
  "/servicetitan-automation-services/zapier",

  // Private / partner portal (valid routes, should still 200)
  "/private/sponsor-summary-finturf",
  "/private/sponsor-summary/aclarify",
  "/private/sponsor-summary-referpro",
  "/private/sponsor-roi-calculator",
  "/private/proposal/property-com",
  "/admin",
  "/admin/overhaul-orders",
  "/admin/pricebook-tool",
  "/partner-portal",
  "/partner-portal/admin",
  "/partner-portal/accept-invite",
]);

/**
 * All known blog post slugs. Add new posts here when they are published.
 * Sourced from the sitemap in server/routes.ts.
 */
const VALID_BLOG_SLUGS = new Set<string>([
  "why-phonetap-exists",
  "why-i-stopped-caring-about-hvac-equipment-brands",
  "why-hvac-contractors-overvalue-new-customers",
  "diy-ai-sales-coach",
  "4-ways-top-companies-control-schedule",
  "stop-treating-dashboard-like-spreadsheet",
  "selling-hvac-systems-to-millennials-online-pricing",
  "how-to-sell-saas-to-home-service-contractors",
  "stop-selling-other-peoples-equipment-build-your-brand",
  "dmaic-process-improvement-framework",
  "should-i-switch-to-servicetitan",
  "ai-automation-contractors-where-to-start",
  "double-booking-rate-better-forms",
  "servicetitan-dashboard-metrics",
  "ultimate-guide-automating-follow-up-calls",
  "top-servicetitan-integrations-2025",
  "convert-more-leads-better-website",
]);

/**
 * All known partner slugs. Sourced from PartnerDetail.tsx.
 */
const VALID_PARTNER_SLUGS = new Set<string>([
  "wink-toolbox",
  "smartac",
  "contractor-commerce",
  "broccoli-ai",
  "sharewillow",
  "phonetap",
  "liveswitch",
  "polycam",
  "service-crucible",
  "dataturk",
]);

/**
 * Returns true if the given pathname corresponds to a known, valid route.
 * Strips query strings and fragments before checking.
 */
export function isValidRoute(pathname: string): boolean {
  const clean = pathname.split("?")[0].split("#")[0];

  if (STATIC_ROUTES.has(clean)) return true;

  // /blog/:slug
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return VALID_BLOG_SLUGS.has(blogMatch[1]);

  // /partners/:slug (but not /partners/:slug/book-demo which is handled above)
  const partnerMatch = clean.match(/^\/partners\/([^/]+)$/);
  if (partnerMatch) return VALID_PARTNER_SLUGS.has(partnerMatch[1]);

  return false;
}
