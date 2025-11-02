# ServiceTitan Hacks - Replit Configuration

## Overview
ServiceTitan Hacks is a mobile-first marketing website for home service contractors, focusing on AI integrations, automations, and ServiceTitan customizations. The platform aims to help contractors leverage AI and automation to grow their businesses by providing vetted tools, educational content, and a supportive community. Key capabilities include AI-powered tools like a pricebook optimizer, educational courses with internal landing pages, and a resource library, all delivered through a modern, conversion-optimized web experience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is a React 18+ TypeScript Single Page Application (SPA) utilizing Vite for builds and Wouter for client-side routing. It features a mobile-first, accessible design system built with Shadcn/ui (Radix UI primitives) and Tailwind CSS, supporting light/dark modes with a custom color palette (Primary Red, Deep Red, Dark Gray) and specific typography (Oxygen, Inter). State management is handled by TanStack Query for server state and React hooks for local component state. The component architecture follows an Atomic design pattern. SEO is optimized with meta tags, structured data, semantic HTML, and an internal linking strategy.

### Backend Architecture
The backend is an Express.js server on Node.js with TypeScript. It provides a RESTful API with JSON request/response formats, including public endpoints for subscriptions, contact forms, AI pricebook optimization, and resource lead capture. Authentication is managed via Replit Auth (OpenID Connect) with Passport.js and a PostgreSQL session store. Payment processing uses Stripe, with protected endpoints for creating payment intents and handling webhooks. Data validation is implemented using Zod schemas.

### AI Integration
The platform integrates live ChatGPT (GPT-4o model) via Replit AI Integrations for the Pricebook Optimizer, transforming technical service descriptions into homeowner-friendly language using custom prompts and HTML-formatted output.

### Data Storage Solutions
Drizzle ORM is used with PostgreSQL (via @neondatabase/serverless) for database management. The schema includes tables for users, email subscribers, contact submissions, resource leads, pricebook optimizations, and course purchases, with Zod schemas for validation and Drizzle Kit for migrations.

## External Dependencies

### UI & Styling
- **Radix UI Primitives**: Accessible component primitives.
- **Shadcn/ui**: Pre-built components based on Radix UI and Tailwind CSS.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React & React Icons**: Icon libraries.

### Forms & Data
- **React Hook Form**: Form state management and validation.
- **Zod**: Schema validation.
- **TanStack Query**: Server state management and data fetching.

### Database
- **Drizzle ORM**: Type-safe ORM for PostgreSQL.
- **@neondatabase/serverless**: Serverless PostgreSQL driver.

### Authentication & Payments
- **Replit Auth**: OAuth-based authentication (Google, GitHub, email/password).
- **Stripe**: Payment processing for course purchases (Payment Intents API, Elements, webhooks).
- **express-session & connect-pg-simple**: Session management with PostgreSQL store.

### External Services Integration
- **Resend**: Transactional email service for notifications.
- **OpenAI**: AI-powered content transformation via Replit AI Integrations (GPT-4o).
- **Google Analytics 4**: Web analytics and conversion tracking.
- **Google Fonts**: "Oxygen" and "Inter" font families.
- **Facebook Groups, YouTube, Podcast platforms**: Community and content distribution channels.

## Recent Changes

### Homepage SEO Optimization (November 2025)
- Added comprehensive meta tags including title, description, keywords, author, and viewport settings
- Implemented Open Graph tags for social media sharing (og:title, og:description, og:type, og:url, og:image)
- Added Twitter Card meta tags for enhanced Twitter previews
- Integrated structured data (JSON-LD) for Organization schema to improve search engine understanding
- Configured Google Analytics 4 tracking with pageview events
- Set up VITE_GA_MEASUREMENT_ID environment variable for analytics configuration

### Course Landing Pages (November 2025)
- Created internal landing page for Company App Course at `/company-app-course` with complete feature showcase, instructor bio, and dual CTAs (3 chapters, 13 lessons, $97)
- Created internal landing page for DIY Dashboard Course at `/dashboard-course-landing` with matching design and structure (2 chapters, 15 lessons, $97)
- Created internal landing page for ServiceTitan to Make Integration Course at `/make-integration-course` with same consistent format (4 chapters, 10 lessons, $69)
- Created internal landing page for ServiceTitan to Zapier Integration Course at `/zapier-integration-course` (FREE course, 1 chapter, 3 lessons)
- Created internal landing page for Fix Ugly Forms Course at `/fix-ugly-forms-course-landing` (6 chapters, 19 lessons, $49)
- Created internal landing page for Automate Job Summaries Course at `/job-summary-course` (1 chapter, 7 lessons, $39)
- Updated Courses.tsx to link all six course cards to internal landing pages instead of direct external enrollment URLs
- Established consistent design pattern: black backgrounds for feature/instructor sections, red background for "About" section
- Feature cards use black backgrounds (`bg-black`), no borders (`border-0`), and centered text (`text-center`) for clean, modern appearance
- Navigation flow: Courses page → Internal landing page → External Thinkific enrollment