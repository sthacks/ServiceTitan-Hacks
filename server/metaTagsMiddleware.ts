import { Request, Response, NextFunction } from "express";
import { getMetadata } from "./metadata";
import fs from "fs/promises";
import path from "path";

/**
 * Middleware to inject page-specific meta tags into HTML responses
 * This ensures Facebook and other crawlers see the correct OG tags
 */
function injectMetaTags(html: string, reqPath: string): string {
  if (!html || !html.includes('</head>')) {
    return html;
  }
  
  const metadata = getMetadata(reqPath);
  const url = `https://servicetitanhacks.com${reqPath}`;
  
  // Replace the default meta tags with page-specific ones
  return html
        // Update title
        .replace(
          /<title>.*?<\/title>/,
          `<title>${metadata.title}</title>`
        )
        // Update meta description
        .replace(
          /<meta name="description" content=".*?" \/>/,
          `<meta name="description" content="${metadata.description}" />`
        )
        .replace(
          /<meta name="title" content=".*?" \/>/,
          `<meta name="title" content="${metadata.title}" />`
        )
        // Update canonical URL
        .replace(
          /<link rel="canonical" href=".*?" \/>/,
          `<link rel="canonical" href="${url}" />`
        )
        // Update OG tags
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
        // Update Twitter tags
        .replace(
          /<meta property="twitter:url" content=".*?" \/>/,
          `<meta property="twitter:url" content="${url}" />`
        )
        .replace(
          /<meta property="twitter:title" content=".*?" \/>/,
          `<meta property="twitter:title" content="${metadata.title}" />`
        )
        .replace(
          /<meta property="twitter:description" content=".*?" \/>/,
          `<meta property="twitter:description" content="${metadata.description}" />`
        )
        .replace(
          /<meta property="twitter:image" content=".*?" \/>/,
          `<meta property="twitter:image" content="${metadata.ogImage}" />`
        );
}

export async function metaTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip API calls and static assets (including images)
  if (req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|txt|xml|webp|avif)$/i)) {
    return next();
  }

  // Check if this is a request from a crawler (Facebook, Twitter, LinkedIn, etc.)
  const userAgent = req.get('user-agent') || '';
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot/i.test(userAgent);
  
  // Only serve custom meta tags for crawlers - regular users should get the Vite-processed HTML
  // This ensures client-side routing works properly for all pages
  if (!isCrawler) {
    return next();
  }

  try {
    // Read the template HTML
    const templatePath = path.join(process.cwd(), 'client', 'index.html');
    let html = await fs.readFile(templatePath, 'utf-8');
    
    // Inject meta tags
    html = injectMetaTags(html, req.path);
    
    // Send the modified HTML
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error serving custom HTML:', error);
    next();
  }
}
