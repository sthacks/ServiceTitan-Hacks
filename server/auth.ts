import { auth } from 'express-openid-connect';
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
  throw new Error("Auth0 environment variables (AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET) are required");
}

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const domains = process.env.REPLIT_DOMAINS.split(",");
const baseURL = `https://${domains[0]}`;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET!,
  baseURL: baseURL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
  session: {
    cookie: {
      httpOnly: true,
      secure: true,
    },
    rolling: true,
    rollingDuration: 7 * 24 * 60 * 60, // 1 week in seconds
  },
  routes: {
    login: '/api/login',
    logout: '/api/logout',
    callback: '/api/callback',
  },
};

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  
  app.use(auth(config));

  app.get("/api/auth/user", async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userClaims = req.oidc.user;
    
    try {
      await storage.upsertUser({
        id: userClaims!.sub!,
        email: userClaims!.email || '',
        firstName: userClaims!.given_name || userClaims!.name?.split(' ')[0] || '',
        lastName: userClaims!.family_name || userClaims!.name?.split(' ').slice(1).join(' ') || '',
        profileImageUrl: userClaims!.picture || null,
      });

      const user = await storage.getUser(userClaims!.sub!);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
