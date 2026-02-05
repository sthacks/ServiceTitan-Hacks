# ServiceTitan Hacks - Replit Configuration

## Overview
ServiceTitan Hacks is a mobile-first marketing website for home service contractors, aiming to facilitate business growth through AI, automation, and ServiceTitan customizations. The platform offers vetted tools, educational content, and a community focus, featuring AI integrations like a pricebook optimizer, educational courses, and a resource library within a modern, conversion-optimized web experience. Its ambition is to empower contractors to leverage technology for business expansion and efficiency.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend is a React 18+ TypeScript Single Page Application (SPA) utilizing Vite, Wouter for routing, and a mobile-first, accessible design system. It is built with Shadcn/ui (Radix UI primitives) and Tailwind CSS, supporting light/dark modes with a custom color palette (Primary Red, Deep Red, Dark Gray) and specific typography (Oxygen, Inter). State management employs TanStack Query for server state and React hooks for local state, following an Atomic design pattern. SEO is optimized via meta tags, structured data, semantic HTML, and internal linking.

### Backend
The backend is an Express.js server on Node.js with TypeScript, providing a RESTful API. It includes public endpoints for subscriptions, contact forms, AI pricebook optimization, and resource lead capture. Authentication is handled by Replit Auth (OpenID Connect) with Passport.js and a PostgreSQL session store. Stripe is used for payment processing, with protected endpoints for payment intents and webhooks. Data validation is implemented using Zod schemas.

### AI Integration
The platform integrates live ChatGPT (GPT-4o) via Replit AI Integrations for features like the Pricebook Optimizer, transforming technical descriptions into homeowner-friendly language using custom prompts and HTML-formatted output.

### Data Storage
Drizzle ORM is used with PostgreSQL (via @neondatabase/serverless). The database schema includes tables for users, email subscribers, contact submissions, resource leads, pricebook optimizations, course purchases, and various demo/ROI calculator submissions (wink_demo, smartac_demo, smartac_roi, wink_roi, contractor_commerce_demo, liveswitch_demo), and podcast_episodes. Zod schemas validate data, and Drizzle Kit manages migrations.

### Demo Booking Systems & ROI Calculators
The platform features four distinct demo booking systems (Wink Toolbox, SmartAC, Contractor Commerce, LiveSwitch) with auto-save, abandoned form tracking, and specific post-submission behaviors (e.g., Calendly redirects, success toasts, LiveSwitch redirects). It also includes interactive ROI calculators for SmartAC and Wink, which provide personalized reports, email notifications, and lead capture. A private Sponsor ROI Calculator offers a transparent, data-backed tool for evaluating sponsor investments, accessible via direct URL only.

### Server-Side Meta Tags
A middleware injects page-specific meta tags for social media crawlers and static informational pages. Interactive calculator pages and dynamic content are excluded to ensure client-side rendering.

### Podcast RSS Feed Integration
An automated system synchronizes podcast episodes from servicetitanhacks.podbean.com daily using `node-cron`. Episodes are stored in a PostgreSQL database (podcast_episodes table), preventing duplicates via GUID, and are exposed via a public API endpoint for the frontend.

### Partner Portal System
A comprehensive partner portal enables partners to view campaign performance, content calendars, subscription details, and upload brand assets. The system uses a hierarchical user structure:
- **Master Admin** (Bill): Can see all partner companies, create new companies, invite account admins, and enter campaign metrics
- **Account Admin**: Can manage their company's users and upload brand assets
- **User**: Read-only access to their company's dashboard

**Database Tables**: partner_companies, partner_users, partner_invites, partner_campaign_metrics, partner_content_calendar, partner_brand_assets

**Routes**: `/partner-portal` (dashboard), `/partner-portal/admin` (master admin), `/partner-portal/accept-invite` (invite acceptance)

**API Endpoints**: 
- `/api/partner-portal/me` - Get current user's partner info
- `/api/partner-portal/companies` - CRUD for companies (master admin)
- `/api/partner-portal/invites` - Create invitations (master admin)
- `/api/partner-portal/metrics` - Campaign metrics
- `/api/partner-portal/calendar` - Content calendar
- `/api/partner-portal/brand-assets` - Brand asset management

Campaign metrics are entered manually initially, with future Mailchimp/Facebook/YouTube API integrations planned.

### Form Submission Emails
All form submissions send email notifications to bill@st-hacks.com with a standardized JSON format:
```json
{
  "site_source": "Replit-ServiceTitan-Hacks",
  "url_source": "FORM_IDENTIFIER",
  "formName": "Human Readable Form Name",
  "firstName": "...",
  "lastName": "...",
  "phoneNumber": "...",
  "email": "...",
  "submittedAt": "ISO timestamp",
  // ...additional form-specific fields
}
```
Forms that don't collect lastName or phoneNumber send empty strings for consistency. Abandoned form emails follow the same structure with `_ABANDONED` suffix on url_source.

## External Dependencies

### UI & Styling
- **Radix UI Primitives**: Component primitives.
- **Shadcn/ui**: Pre-built components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React & React Icons**: Icon libraries.

### Forms & Data
- **React Hook Form**: Form state management and validation.
- **Zod**: Schema validation.
- **TanStack Query**: Server state management.

### Database
- **Drizzle ORM**: Type-safe ORM for PostgreSQL.
- **@neondatabase/serverless**: Serverless PostgreSQL driver.

### Authentication & Payments
- **Replit Auth**: OAuth-based authentication.
- **Stripe**: Payment processing.
- **express-session & connect-pg-simple**: Session management.

### External Services
- **Resend**: Transactional email service.
- **OpenAI**: AI-powered content transformation (GPT-4o).
- **Google Analytics 4**: Web analytics.
- **Google Fonts**: "Oxygen" and "Inter" font families.
- **Podbean RSS Feed**: Podcast episode syndication.
- **node-cron**: Task scheduler.