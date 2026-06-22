import { Request, Response, NextFunction } from "express";
import { getMetadata } from "./metadata";
import { getPageBodyHtml } from "./pageContent";
import { getRouteSchema, buildPodcastSchema } from "./schemaData";
import { isValidRoute } from "./validRoutes";
import fs from "fs/promises";
import path from "path";

const NOT_FOUND_METADATA = {
  title: "Page Not Found | ServiceTitan Hacks",
  description: "The page you are looking for does not exist.",
  ogImage: "https://servicetitanhacks.com/og-home.png",
  ogType: "website",
};

/**
 * Injects route-specific <head> metadata (title, description, OG, Twitter,
 * canonical) into an HTML template string.
 * @param schema Pre-resolved JSON-LD schema object (or null).
 */
function injectMetaTags(html: string, reqPath: string, valid: boolean, schema: Record<string, unknown> | null = null): string {
  if (!html || !html.includes('</head>')) return html;

  const metadata = valid ? getMetadata(reqPath) : NOT_FOUND_METADATA;
  const url = `https://servicetitanhacks.com${reqPath}`;

  let result = html
    .replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${metadata.description}" />`
    )
    .replace(
      /<meta name="title" content=".*?" \/>/,
      `<meta name="title" content="${metadata.title}" />`
    )
    .replace(
      /<meta property="og:type" content=".*?" \/>/,
      `<meta property="og:type" content="${metadata.ogType || 'website'}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${url}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${metadata.title}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${metadata.description}" />`
    )
    .replace(
      /<meta property="og:image" content=".*?" \/>/,
      `<meta property="og:image" content="${metadata.ogImage}" />`
    )
    .replace(
      /<meta name="twitter:card" content=".*?" \/>/,
      `<meta name="twitter:card" content="summary_large_image" />`
    )
    .replace(
      /<meta name="twitter:url" content=".*?" \/>/,
      `<meta name="twitter:url" content="${url}" />`
    )
    .replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${metadata.title}" />`
    )
    .replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${metadata.description}" />`
    )
    .replace(
      /<meta name="twitter:image" content=".*?" \/>/,
      `<meta name="twitter:image" content="${metadata.ogImage}" />`
    );

  if (valid) {
    result = result
      .replace(
        /<link rel="canonical" href=".*?" \/>/,
        `<link rel="canonical" href="${url}" />`
      )
      .replace(
        '</head>',
        (metadata as any).ogImageAlt
          ? `<meta property="og:image:alt" content="${(metadata as any).ogImageAlt}" />\n<meta name="twitter:image:alt" content="${(metadata as any).ogImageAlt}" />\n</head>`
          : '</head>'
      );
  } else {
    result = result
      .replace(/<link rel="canonical" href=".*?" \/>/, '')
      .replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>');
  }

  // Inject per-route JSON-LD schema before </head> when available.
  // Uses a dedicated id="route-schema" so it never overwrites the shell
  // Organization schema defined in index.html.
  if (valid && schema) {
    const scriptTag = `<script type="application/ld+json" id="route-schema">\n${JSON.stringify(schema, null, 2)}\n</script>\n`;
    result = result.replace('</head>', `${scriptTag}</head>`);
  }

  return result;
}

/**
 * Injects prerendered page body content into the HTML template.
 *
 * The content is placed inside <div id="root"> so that:
 * - Crawlers and AI agents that don't execute JavaScript see real, route-specific
 *   page content on the first response (headings, paragraphs, links).
 * - Regular browser users: React's createRoot() replaces #root content on mount,
 *   so they see the full interactive React app after JS loads. The initial
 *   server content acts as a meaningful loading state.
 *
 * This is route-based prerendering — every request to a known route with
 * registered content gets real HTML, regardless of user agent.
 */
function injectBodyContent(html: string, bodyHtml: string): string {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyHtml}</div>`
  );
}

/**
 * Major crawler and link-preview user agents.
 * Used as a FALLBACK gate for routes that don't have registered body content —
 * those routes still get proper <head> meta tags when accessed by known bots.
 * For routes WITH registered body content, HTML is served to ALL user agents
 * (route-based, not UA-based).
 */
const CRAWLER_RE =
  /facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|applebot|applebot-extended|discordbot|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|ia_archiver|rogerbot|showyoubot|outbrain|pinterest|vkShare|W3C_Validator|iframely|GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|YouBot|cohere-ai|meta-externalagent|Amazonbot|Bytespider|DuckAssistBot|BrightBot/i;

export async function metaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip API calls and static assets — these should never be intercepted.
  if (
    req.path.startsWith('/api') ||
    req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|txt|xml|webp|avif|map)$/i)
  ) {
    return next();
  }

  const valid = isValidRoute(req.path);
  const userAgent = req.get('user-agent') || '';
  const isCrawler = CRAWLER_RE.test(userAgent);

  // Check whether we have prerendered body content for this route.
  // getPageBodyHtml is route-based — it returns content for known public routes
  // (blog posts, partner pages, key marketing pages) regardless of user agent.
  const bodyHtml = valid ? getPageBodyHtml(req.path) : null;

  const isProduction = process.env.NODE_ENV === 'production';

  // In development, never intercept regular browser requests — Vite must handle
  // HTML serving so it can inject its HMR client and React Fast Refresh preamble.
  // Only intercept known crawlers in dev (they don't run JS anyway).
  if (!isProduction && !isCrawler) return next();

  // Decision:
  // 1. If we have body content → serve to everyone (route-based prerendering).
  // 2. If we have no body content but it's a crawler → serve head-only (fallback).
  // 3. Otherwise → let Vite / Express continue as normal.
  const shouldServe = !!bodyHtml || isCrawler;
  if (!shouldServe) return next();

  try {
    const templatePath = isProduction
      ? path.resolve(path.dirname(new URL(import.meta.url).pathname), 'public', 'index.html')
      : path.join(process.cwd(), 'client', 'index.html');

    let html = await fs.readFile(templatePath, 'utf-8');

    // Resolve per-route JSON-LD schema. /podcast uses an async function that
    // pulls recent episodes from the database; all other routes use the static map.
    let routeSchema: Record<string, unknown> | null = null;
    if (valid) {
      if (req.path === '/podcast') {
        routeSchema = await buildPodcastSchema();
      } else {
        routeSchema = getRouteSchema(req.path);
      }
    }

    // Always inject route-specific head metadata.
    html = injectMetaTags(html, req.path, valid, routeSchema);

    // Inject prerendered body content when available (route-based).
    if (bodyHtml) {
      html = injectBodyContent(html, bodyHtml);
    }

    const status = valid ? 200 : 404;
    res.status(status).setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('[metaTagsMiddleware] Error serving prerendered HTML:', error);
    next();
  }
}
