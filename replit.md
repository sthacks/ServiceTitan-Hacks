# ServiceTitan Hacks - Replit Configuration

## Overview
ServiceTitan Hacks is a mobile-first marketing website designed for home service contractors. Its primary purpose is to help contractors leverage AI, automation, and ServiceTitan customizations to grow their businesses. The platform offers vetted tools, educational content, and a community, focusing on AI integrations like a pricebook optimizer, educational courses, and a resource library, all presented through a modern, conversion-optimized web experience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend is a React 18+ TypeScript Single Page Application (SPA) using Vite, Wouter for routing, and a mobile-first, accessible design system. It is built with Shadcn/ui (Radix UI primitives) and Tailwind CSS, supporting light/dark modes with a custom color palette (Primary Red, Deep Red, Dark Gray) and specific typography (Oxygen, Inter). State management uses TanStack Query for server state and React hooks for local state. The component architecture follows an Atomic design pattern, with SEO optimized through meta tags, structured data, semantic HTML, and internal linking.

### Backend
The backend is an Express.js server on Node.js with TypeScript, providing a RESTful API. It includes public endpoints for subscriptions, contact forms, AI pricebook optimization, and resource lead capture. Authentication is handled by Replit Auth (OpenID Connect) with Passport.js and a PostgreSQL session store. Stripe is used for payment processing, with protected endpoints for payment intents and webhooks. Data validation is implemented using Zod schemas.

### AI Integration
The platform integrates live ChatGPT (GPT-4o) via Replit AI Integrations for the Pricebook Optimizer, transforming technical service descriptions into homeowner-friendly language using custom prompts and HTML-formatted output.

### Data Storage
Drizzle ORM is used with PostgreSQL (via @neondatabase/serverless). The database schema includes tables for users, email subscribers, contact submissions, resource leads, pricebook optimizations, and course purchases. Zod schemas are used for validation, and Drizzle Kit for migrations.

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
- **Stripe**: Payment processing (Payment Intents API, Elements, webhooks).
- **express-session & connect-pg-simple**: Session management with PostgreSQL store.

### External Services
- **Resend**: Transactional email service.
- **OpenAI**: AI-powered content transformation via Replit AI Integrations (GPT-4o).
- **Google Analytics 4**: Web analytics.
- **Google Fonts**: "Oxygen" and "Inter" font families.
- **Facebook Groups, YouTube, Podcast platforms**: Community and content distribution.