import { Request, Response, NextFunction } from "express";
import { getMetadata } from "./metadata";
import { isValidRoute } from "./validRoutes";
import fs from "fs/promises";
import path from "path";

const NOT_FOUND_METADATA = {
  title: "Page Not Found | ServiceTitan Hacks",
  description: "The page you are looking for does not exist.",
  ogImage: "https://servicetitanhacks.com/og-default.png",
  ogType: "website",
};

/**
 * Middleware to inject page-specific meta tags into HTML responses.
 * Runs for all social/link-preview crawlers so they see correct OG tags
 * even though this is a client-side React SPA.
 */
function injectMetaTags(html: string, reqPath: string, valid: boolean): string {
  if (!html || !html.includes('</head>')) {
    return html;
  }

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
    // Twitter tags use name= attribute (not property=)
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
    // Known routes: inject canonical + optional image alt tags
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
    // Unknown routes: remove canonical tag and add noindex so crawlers don't
    // index or consolidate the unknown URL.
    result = result
      .replace(/<link rel="canonical" href=".*?" \/>/, '')
      .replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>');
  }

  return result;
}

// Crawler / link-preview user agents that do not execute JavaScript.
// These need server-side OG tags; regular browsers get the client-side SEO component.
const CRAWLER_RE =
  /facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|applebot|discordbot|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|ia_archiver|rogerbot|showyoubot|outbrain|pinterest|vkShare|W3C_Validator|iframely/i;

export async function metaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip API calls and static assets
  if (
    req.path.startsWith('/api') ||
    req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|txt|xml|webp|avif|map)$/i)
  ) {
    return next();
  }

  const userAgent = req.get('user-agent') || '';
  if (!CRAWLER_RE.test(userAgent)) {
    return next();
  }

  try {
    // In production the built index.html lives next to the compiled server;
    // in development use the source file.
    const isProduction = process.env.NODE_ENV === 'production';
    const templatePath = isProduction
      ? path.resolve(path.dirname(new URL(import.meta.url).pathname), 'public', 'index.html')
      : path.join(process.cwd(), 'client', 'index.html');

    const valid = isValidRoute(req.path);
    let html = await fs.readFile(templatePath, 'utf-8');
    html = injectMetaTags(html, req.path, valid);

    // Unknown routes return 404 so crawlers treat them as true not-found pages.
    const status = valid ? 200 : 404;
    res.status(status).setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('[metaTagsMiddleware] Error serving crawler HTML:', error);
    next();
  }
}
