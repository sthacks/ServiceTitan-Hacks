import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { metaTagsMiddleware } from "./metaTagsMiddleware";
import cron from "node-cron";
import { syncPodcastEpisodes } from "./podcastSync";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    // Serve static files from public folder in development
    app.use(express.static("public"));
    // Add meta tags middleware for dev (after static files)
    app.use(metaTagsMiddleware);
    await setupVite(app, server);
  } else {
    // In production, serve static files first, then meta tags middleware
    // This ensures images and assets are served before HTML routes
    const express_static = require('express').static;
    const path = require('path');
    const distPath = path.resolve(import.meta.dirname, "public");
    app.use(express_static(distPath));
    
    // Add meta tags middleware for production (after static files)
    app.use(metaTagsMiddleware);
    
    // Finally, serve index.html for all remaining routes
    app.use("*", (_req, res) => {
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
