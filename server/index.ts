import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { metaTagsMiddleware } from "./metaTagsMiddleware";
import cron from "node-cron";
import { syncPodcastEpisodes } from "./podcastSync";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Redirect www to non-www
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://servicetitanhacks.com${req.url}`);
  }
  next();
});

// Prevent caching issues with Facebook's in-app browser
// This middleware adds headers that help with WebView browsers
app.use((req, res, next) => {
  // Detect Facebook's in-app browser via fbclid parameter or user agent
  const isFacebookBrowser = req.query.fbclid || 
    (req.headers['user-agent'] && req.headers['user-agent'].includes('FBAN'));
  
  if (isFacebookBrowser && !req.path.startsWith('/api') && !req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)) {
    // Disable caching for Facebook browser to prevent blank page issues
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    // Serve static files from public folder in development with caching
    app.use(express.static("public", {
      maxAge: '1d',
      etag: true,
      lastModified: true
    }));
    // Add meta tags middleware after static files
    app.use(metaTagsMiddleware);
    await setupVite(app, server);
  } else {
    // In production: serve static files first, then meta tags, then catch-all
    const distPath = path.resolve(import.meta.dirname, "public");

    if (!fs.existsSync(distPath)) {
      throw new Error(
        `Could not find the build directory: ${distPath}, make sure to build the client first`,
      );
    }

    // 1. Serve static files (images, CSS, JS) with aggressive caching
    app.use(express.static(distPath, {
      maxAge: '1y', // Cache for 1 year for production
      immutable: true, // Assets are immutable (Vite adds hashes to filenames)
      etag: true,
      lastModified: true,
      setHeaders: (res, path) => {
        // Different caching strategies for different file types
        if (path.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (path.match(/\.(js|css)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));

    // 2. Apply meta tags middleware (for HTML routes)
    app.use(metaTagsMiddleware);

    // 3. Fall through to index.html if file doesn't exist
    app.use("*", (_req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });

  // Set up daily podcast sync cron job (runs at 2 AM daily)
  cron.schedule('0 2 * * *', async () => {
    log('[Cron] Running daily podcast sync...');
    const result = await syncPodcastEpisodes();
    if (result.success) {
      log(`[Cron] Podcast sync completed. Added ${result.episodesAdded} new episodes.`);
    } else {
      log(`[Cron] Podcast sync failed: ${result.error}`);
    }
  });

  // Run initial podcast sync on server start
  log('[Init] Running initial podcast sync...');
  const initialSync = await syncPodcastEpisodes();
  if (initialSync.success) {
    log(`[Init] Initial podcast sync completed. Added ${initialSync.episodesAdded} new episodes.`);
  } else {
    log(`[Init] Initial podcast sync failed: ${initialSync.error}`);
  }
})();
