/**
 * Per-route JSON-LD structured data for server-side injection.
 * These schemas are injected into the initial HTML response so crawlers
 * and AI agents see them without executing JavaScript.
 *
 * SEO.tsx manages a dedicated #route-schema element for client-side updates;
 * the shell Organization schema in index.html is never overwritten.
 */

import { db } from "./db";
import { podcastEpisodes } from "../shared/schema";
import { sql } from "drizzle-orm";

type SchemaObject = Record<string, unknown>;

const BASE_URL = "https://servicetitanhacks.com";
const ORGANIZER = {
  "@type": "Organization",
  "name": "ServiceTitan Hacks",
  "url": BASE_URL,
};
const AUTHOR = {
  "@type": "Person",
  "name": "Bill Brown",
  "jobTitle": "Founder, ServiceTitan Hacks",
  "url": `${BASE_URL}/bill`,
};
const VIRTUAL_ATTENDANCE = "https://schema.org/OnlineEventAttendanceMode";
const EVENT_SCHEDULED = "https://schema.org/EventScheduled";

function virtualLocation(url: string) {
  return { "@type": "VirtualLocation", url };
}

function event(opts: {
  name: string;
  description: string;
  startDate: string;
  url: string;
  image?: string;
  performers?: string[];
  status?: string;
}): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": opts.name,
    "description": opts.description,
    "startDate": opts.startDate,
    "eventStatus": opts.status ?? EVENT_SCHEDULED,
    "eventAttendanceMode": VIRTUAL_ATTENDANCE,
    "location": virtualLocation(opts.url),
    "url": opts.url,
    "organizer": ORGANIZER,
    ...(opts.performers && opts.performers.length > 0
      ? {
          "performer": opts.performers.map((name) => ({
            "@type": "Person",
            "name": name,
          })),
        }
      : {}),
    ...(opts.image ? { "image": opts.image } : {}),
  };
}

function article(opts: {
  headline: string;
  description: string;
  slug: string;
  image: string;
}): SchemaObject {
  const url = `${BASE_URL}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": opts.headline,
    "description": opts.description,
    "url": url,
    "image": opts.image,
    "author": AUTHOR,
    "publisher": ORGANIZER,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "inLanguage": "en-US",
  };
}

function course(opts: { name: string; description: string; path: string }): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": opts.name,
    "description": opts.description,
    "url": `${BASE_URL}${opts.path}`,
    "provider": ORGANIZER,
    "inLanguage": "en-US",
  };
}

export const routeSchemas: Record<string, SchemaObject> = {
  // ── Events hub ─────────────────────────────────────────────────────────────
  "/events": {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ServiceTitan Hacks Events & Webinars",
    "description":
      "Live webinars and training events for home service contractors covering AI, automation, hiring, and ServiceTitan strategies.",
    "url": `${BASE_URL}/events`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": event({
          name: "Stop Buying Hours: How Contractors Are Switching to Performance Pay",
          description:
            "A practical conversation about switching your techs from hourly pay to performance-based pay.",
          startDate: "2026-07-15T17:00:00Z",
          url: `${BASE_URL}/webinars/stop-buying-hours`,
          performers: ["Bill Brown", "Ryan Shank"],
          image: `${BASE_URL}/og-incentive-plan-webinar.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": event({
          name: "How Contractors Are Handling More Calls Without Hiring More CSRs",
          description:
            "A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses.",
          startDate: "2026-05-19T18:00:00Z",
          url: `${BASE_URL}/webinar/ai-csr`,
          performers: ["Bill Brown", "Quinn Litherland", "Britiny Leung"],
          image: `${BASE_URL}/og-ai-csr-webinar.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": event({
          name: "The Incentive Plan Problem: Why Most Contractor Bonus Plans Fail",
          description:
            "A practical conversation about technician incentives, performance pay, and what actually works inside a real contractor business.",
          startDate: "2026-04-21T18:00:00Z",
          url: `${BASE_URL}/webinar/incentive-plan-problem`,
          performers: ["Bill Brown", "Ryan Shank", "Ron Williams"],
          image: `${BASE_URL}/og-incentive-plan-webinar.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": event({
          name: "The 83% Referral Gap: Why Most Contractors Leave Referral Revenue on the Table",
          description:
            "A live conversation about why referrals don't happen automatically and how to build a system that consistently turns satisfied customers into new business.",
          startDate: "2026-03-31T18:00:00Z",
          url: `${BASE_URL}/webinar/referral-gap`,
          performers: ["Bill Brown", "Murphy Nadauld", "Jonathan Brewster"],
          image: `${BASE_URL}/og-referral-gap-webinar.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": event({
          name: "Stop the Spreadsheet Payroll Nightmare",
          description:
            "Leave with a clear, auditable way to replace fragile commission spreadsheets with consistent rules and payroll-ready reports.",
          startDate: "2026-03-11T19:00:00Z",
          url: `${BASE_URL}/webinar/stop-spreadsheet-payroll`,
          performers: ["Bill Brown", "Wink Toolbox"],
          image: `${BASE_URL}/og-incentive-plan-webinar.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": event({
          name: "What Your Missed Calls Are Actually Costing You",
          description:
            "Most contractors track booked jobs. Very few know how much revenue they lose from inbound calls that never turn into appointments.",
          startDate: "2026-04-08T18:00:00Z",
          url: `${BASE_URL}/webinar/phonetap`,
          performers: ["Bill Brown"],
          image: `${BASE_URL}/og-phonetap-csrs.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": event({
          name: "How Contractors Buy Equipment Like Private Equity",
          description:
            "Learn how private equity gets better equipment pricing and how independent contractors can access the same economics.",
          startDate: "2026-02-04T19:00:00Z",
          url: `${BASE_URL}/webinar/equipment-pricing`,
          performers: ["Bill Brown", "Norris Ayvazian"],
          image: `${BASE_URL}/og-home.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": event({
          name: "Stop Rebuying Your Own Customers",
          description:
            "How one HVAC contractor grew from 500 to 2,000 memberships in 18 months by changing how and when memberships are sold.",
          startDate: "2026-02-11T19:00:00Z",
          url: `${BASE_URL}/webinar/membership-retention`,
          performers: ["Bill Brown", "David Hargrove Jr"],
          image: `${BASE_URL}/og-home.png`,
        }),
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": event({
          name: "Should Contractors Put Pricing Online in 2026?",
          description:
            "A candid fireside chat on whether pricing belongs online and how to stay in control without commoditizing your business.",
          startDate: "2026-02-24T19:00:00Z",
          url: `${BASE_URL}/webinar/price-conversation`,
          performers: ["Bill Brown"],
          image: `${BASE_URL}/og-home.png`,
        }),
      },
    ],
  },

  // ── Individual webinar pages ────────────────────────────────────────────────
  "/webinar/membership-retention": event({
    name: "Stop Rebuying Your Own Customers",
    description:
      "A candid operator-to-operator conversation about how one HVAC contractor grew from 500 to 2,000 memberships in 18 months by changing how and when memberships are sold.",
    startDate: "2026-02-11T19:00:00Z",
    url: `${BASE_URL}/webinar/membership-retention`,
    performers: ["Bill Brown", "David Hargrove Jr"],
    image: `${BASE_URL}/og-home.png`,
  }),

  "/webinar/equipment-pricing": event({
    name: "How Contractors Buy Equipment Like Private Equity",
    description:
      "Independent contractors are paying more for equipment than they should. Learn how private equity-backed companies negotiate national pricing and how you can access the same economics.",
    startDate: "2026-02-04T19:00:00Z",
    url: `${BASE_URL}/webinar/equipment-pricing`,
    performers: ["Bill Brown", "Norris Ayvazian"],
    image: `${BASE_URL}/og-home.png`,
  }),

  "/webinar/stop-spreadsheet-payroll": event({
    name: "Stop the Spreadsheet Payroll Nightmare",
    description:
      "Leave with a clear, auditable way to replace fragile commission spreadsheets with consistent rules and payroll-ready reports—without ripping out your current payroll system.",
    startDate: "2026-03-11T19:00:00Z",
    url: `${BASE_URL}/webinar/stop-spreadsheet-payroll`,
    performers: ["Bill Brown", "Wink Toolbox Experts"],
    image: `${BASE_URL}/og-incentive-plan-webinar.png`,
  }),

  "/webinar/ai-csr": event({
    name: "How Contractors Are Handling More Calls Without Hiring More CSRs",
    description:
      "A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses.",
    startDate: "2026-05-19T18:00:00Z",
    url: `${BASE_URL}/webinar/ai-csr`,
    performers: ["Bill Brown", "Quinn Litherland", "Britiny Leung"],
    image: `${BASE_URL}/og-ai-csr-webinar.png`,
  }),

  "/webinar/incentive-plan-problem": event({
    name: "The Incentive Plan Problem: Why Most Contractor Bonus Plans Fail",
    description:
      "A practical conversation about technician incentives, performance pay, and what actually works inside a real contractor business. Featuring Bill Brown, Ryan Shank, and Ron Williams.",
    startDate: "2026-04-21T18:00:00Z",
    url: `${BASE_URL}/webinar/incentive-plan-problem`,
    performers: ["Bill Brown", "Ryan Shank", "Ron Williams"],
    image: `${BASE_URL}/og-incentive-plan-webinar.png`,
  }),

  "/webinar/phonetap": event({
    name: "What Your Missed Calls Are Actually Costing You",
    description:
      "Most contractors track booked jobs. Very few know how much revenue they lose from inbound calls that never turn into appointments. Live demo and analysis with PhoneTap.",
    startDate: "2026-04-08T18:00:00Z",
    url: `${BASE_URL}/webinar/phonetap`,
    performers: ["Bill Brown"],
    image: `${BASE_URL}/og-phonetap-csrs.png`,
  }),

  "/webinar/referral-gap": event({
    name: "The 83% Referral Gap: Why Most Contractors Leave Referral Revenue on the Table",
    description:
      "A live conversation with a ServiceTitan contractor about why referrals often fall through the cracks and what contractors can do about it.",
    startDate: "2026-03-31T18:00:00Z",
    url: `${BASE_URL}/webinar/referral-gap`,
    performers: ["Bill Brown", "Jonathan Brewster", "Murphy Nadauld"],
    image: `${BASE_URL}/og-referral-gap-webinar.png`,
  }),

  "/webinar/price-conversation": event({
    name: "Should Contractors Put Pricing Online in 2026?",
    description:
      "Customers are asking AI what HVAC systems cost before they ever call. A candid fireside chat on whether pricing belongs online and how to stay in control without commoditizing your business.",
    startDate: "2026-02-24T19:00:00Z",
    url: `${BASE_URL}/webinar/price-conversation`,
    performers: ["Bill Brown"],
    image: `${BASE_URL}/og-home.png`,
  }),

  "/webinars/stop-buying-hours": event({
    name: "Stop Buying Hours: How Contractors Are Switching to Performance Pay",
    description:
      "A practical conversation about switching techs from hourly pay to performance-based pay. Bill Brown, Ryan Shank, and a contractor who recently made the switch share what works.",
    startDate: "2026-07-15T17:00:00Z",
    url: `${BASE_URL}/webinars/stop-buying-hours`,
    performers: ["Bill Brown", "Ryan Shank"],
    image: `${BASE_URL}/og-incentive-plan-webinar.png`,
  }),

  // ── Blog posts (Article) ────────────────────────────────────────────────────
  "/blog/diy-ai-sales-coach": article({
    headline: "How I Built a DIY 'Sales Coach' for $25/Month Using AI",
    description: "I'll be honest: I am not a good salesperson. But I'm getting better—and the only reason is because I finally learned how to study my own mistakes using AI. Here's my $25/month hack.",
    slug: "diy-ai-sales-coach",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/4-ways-top-companies-control-schedule": article({
    headline: "4 Surprising Ways Top Home Service Companies Take Control of Their Schedule",
    description: "Most companies think they have a scheduling problem. What they really have is a visibility problem. Learn four real strategies top operators use to take control of capacity.",
    slug: "4-ways-top-companies-control-schedule",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/stop-treating-dashboard-like-spreadsheet": article({
    headline: "Dashboard Philosophy for Contractors: Why Simple Beats Complex",
    description: "Your call center dashboard should be as simple as your truck's gas gauge. Learn the 5-second rule for contractor dashboards and why I built the Titan Call Board.",
    slug: "stop-treating-dashboard-like-spreadsheet",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/why-i-stopped-caring-about-hvac-equipment-brands": article({
    headline: "Why I Stopped Caring So Much About HVAC Equipment Brands",
    description: "After 25 years in HVAC I've seen how equipment is actually made. Most brands are more similar than different. Here's what really matters.",
    slug: "why-i-stopped-caring-about-hvac-equipment-brands",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/why-hvac-contractors-overvalue-new-customers": article({
    headline: "Why HVAC Contractors Overvalue New Customers and Undervalue Retention",
    description: "Attribution is useful, but incomplete. When contractors zoom in too far on lead sources and acquisition costs, they miss the bigger strategic question.",
    slug: "why-hvac-contractors-overvalue-new-customers",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/selling-hvac-systems-to-millennials-online-pricing": article({
    headline: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional",
    description: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory.",
    slug: "selling-hvac-systems-to-millennials-online-pricing",
    image: `${BASE_URL}/og-millennials-blog.png`,
  }),
  "/blog/how-to-sell-saas-to-home-service-contractors": article({
    headline: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors",
    description: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company.",
    slug: "how-to-sell-saas-to-home-service-contractors",
    image: `${BASE_URL}/og-saas-blog.png`,
  }),
  "/blog/stop-selling-other-peoples-equipment-build-your-brand": article({
    headline: "Stop Selling Their Brand. Build Yours.",
    description: "Why are you paying to advertise for manufacturers? Learn the strategy behind private labeling your equipment.",
    slug: "stop-selling-other-peoples-equipment-build-your-brand",
    image: `${BASE_URL}/og-stop-selling-equipment.png`,
  }),
  "/blog/dmaic-process-improvement-framework": article({
    headline: "The DMAIC Framework for Contractors",
    description: "Define. Measure. Analyze. Improve. Control. A proven framework to fix broken processes in your HVAC business.",
    slug: "dmaic-process-improvement-framework",
    image: `${BASE_URL}/og-dmaic-methodology-blog.png`,
  }),
  "/blog/should-i-switch-to-servicetitan": article({
    headline: "Should You Switch to ServiceTitan? (Honest Review)",
    description: "Thinking about taking the plunge? We break down the real pros, cons, and ROI of switching to ServiceTitan.",
    slug: "should-i-switch-to-servicetitan",
    image: `${BASE_URL}/og-should-i-switch.png`,
  }),
  "/blog/ai-automation-contractors-where-to-start": article({
    headline: "AI for Contractors: Where to Start?",
    description: "Overwhelmed by AI buzz? Here are the practical, first steps to actually using automation in your service business.",
    slug: "ai-automation-contractors-where-to-start",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/double-booking-rate-better-forms": article({
    headline: "Double Your Booking Rate with Better Forms",
    description: "Your intake forms might be killing your conversion rate. See how small tweaks can lead to massive booking improvements.",
    slug: "double-booking-rate-better-forms",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/servicetitan-dashboard-metrics": article({
    headline: "5 ServiceTitan Metrics You Can't Ignore",
    description: "Are you tracking the right numbers? Here are the essential dashboard metrics every owner needs to watch daily.",
    slug: "servicetitan-dashboard-metrics",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/ultimate-guide-automating-follow-up-calls": article({
    headline: "The Ultimate Guide to Automating Follow-Ups",
    description: "The money is in the follow-up. Learn how to automate your calls so no unsold estimate ever slips through the cracks.",
    slug: "ultimate-guide-automating-follow-up-calls",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/top-servicetitan-integrations-2025": article({
    headline: "Top ServiceTitan Integrations for 2025",
    description: "Upgrade your tech stack. We reviewed the top apps and integrations you need to be using this year.",
    slug: "top-servicetitan-integrations-2025",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/convert-more-leads-better-website": article({
    headline: "How to Convert More Leads with Your Website",
    description: "Is your website just a brochure or a lead machine? Simple changes to turn more visitors into booked ServiceTitan jobs.",
    slug: "convert-more-leads-better-website",
    image: `${BASE_URL}/og-blog.png`,
  }),
  "/blog/why-phonetap-exists": article({
    headline: "Why PhoneTap Exists",
    description: "In 2020, I started running my HVAC company remotely. I had to rely on data. But when my co-founders and I dug into call center metrics, the numbers didn't match reality.",
    slug: "why-phonetap-exists",
    image: `${BASE_URL}/og-phonetap-csrs.png`,
  }),

  // ── Courses ────────────────────────────────────────────────────────────────
  "/dashboard-course": course({
    name: "Master Your ServiceTitan Dashboard",
    description: "Data drives revenue. Learn how to build and read dashboards that actually tell you how your business is performing.",
    path: "/dashboard-course",
  }),
  "/dashboard-course-landing": course({
    name: "ServiceTitan Dashboard Course",
    description: "A DIY course for home service pros who want visibility—without expensive software. Go at your own pace with step-by-step tutorials.",
    path: "/dashboard-course-landing",
  }),
  "/fix-ugly-forms-course": course({
    name: "Fix Ugly Forms & Book More Jobs",
    description: "Learn to design professional ServiceTitan forms that convert leads into booked jobs.",
    path: "/fix-ugly-forms-course",
  }),
  "/fix-ugly-forms-course-landing": course({
    name: "Fix Ugly Forms Course",
    description: "Ugly forms lose customers. Learn to design professional ServiceTitan forms that convert leads into booked jobs.",
    path: "/fix-ugly-forms-course-landing",
  }),
  "/job-summary-course": course({
    name: "Job Summary Cleaner Course for ServiceTitan",
    description: "Use AI to automatically clean and format job summaries in ServiceTitan. Improve documentation quality and save technician time.",
    path: "/job-summary-course",
  }),
  "/company-app-course": course({
    name: "ServiceTitan Company App Course",
    description: "Learn how to build custom mobile apps for your team using ServiceTitan's Company App feature.",
    path: "/company-app-course",
  }),
  "/make-integration-course": course({
    name: "Make Integration Course for ServiceTitan",
    description: "Master Make (formerly Integromat) to build powerful ServiceTitan automations. Connect your tech stack and automate workflows.",
    path: "/make-integration-course",
  }),
  "/zapier-integration-course": course({
    name: "Zapier Integration Course for ServiceTitan",
    description: "Learn how to connect ServiceTitan with 5,000+ apps using Zapier. Automate workflows, sync data, and save time.",
    path: "/zapier-integration-course",
  }),

  // ── Tools ──────────────────────────────────────────────────────────────────
  "/pricebook-optimizer": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ServiceTitan Pricebook Optimizer",
    "description":
      "AI-powered tool to optimize ServiceTitan pricebook descriptions—rewriting technical jargon into homeowner-friendly language.",
    "url": `${BASE_URL}/pricebook-optimizer`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "provider": ORGANIZER,
  },

  "/pricebook-overhaul-tool": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Pricebook Rewrite Tool",
    "description":
      "Pick your trade and AI rewrites your ServiceTitan pricebook description in homeowner language. Takes 10 seconds. No signup required.",
    "url": `${BASE_URL}/pricebook-overhaul-tool`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "provider": ORGANIZER,
  },
};

/**
 * Podcast base schema (PodcastSeries). Used as the static fallback when DB
 * query fails, and extended with episode data by buildPodcastSchema().
 */
const PODCAST_BASE: SchemaObject = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "ServiceTitan Hacks Podcast",
  "description":
    "Candid conversations on innovation in the trades. Host Bill Brown interviews forward-thinking contractors and software founders revolutionizing home services with AI, automation, and smart solutions.",
  "url": `${BASE_URL}/podcast`,
  "webFeed": "https://servicetitanhacks.podbean.com/feed.xml",
  "image": `${BASE_URL}/og-podcast.png`,
  "author": AUTHOR,
  "publisher": ORGANIZER,
  "inLanguage": "en-US",
};

/**
 * Builds the podcast JSON-LD schema, including up to 10 recent episodes
 * fetched from the database. Falls back to the base PodcastSeries schema
 * without episodes if the DB query fails.
 */
export async function buildPodcastSchema(): Promise<SchemaObject> {
  try {
    const episodes = await db
      .select()
      .from(podcastEpisodes)
      .orderBy(sql`${podcastEpisodes.pubDate} DESC`)
      .limit(10);

    if (episodes.length === 0) return PODCAST_BASE;

    return {
      ...PODCAST_BASE,
      "episode": episodes.map((ep, i) => ({
        "@type": "PodcastEpisode",
        "position": i + 1,
        "name": ep.title,
        "description": ep.description ?? undefined,
        "datePublished": ep.pubDate
          ? new Date(ep.pubDate).toISOString().split("T")[0]
          : undefined,
        "url": ep.link ?? ep.audioUrl ?? undefined,
        "associatedMedia": ep.audioUrl
          ? { "@type": "AudioObject", "contentUrl": ep.audioUrl }
          : undefined,
        ...(ep.imageUrl ? { "image": ep.imageUrl } : {}),
        "partOfSeries": { "@type": "PodcastSeries", "name": "ServiceTitan Hacks Podcast", "url": `${BASE_URL}/podcast` },
      })),
    };
  } catch {
    return PODCAST_BASE;
  }
}

/**
 * Returns the static per-route JSON-LD schema for the given path.
 * Returns null when no schema is registered for that path.
 * For /podcast use buildPodcastSchema() to get episode data.
 */
export function getRouteSchema(path: string): SchemaObject | null {
  return routeSchemas[path] ?? null;
}
