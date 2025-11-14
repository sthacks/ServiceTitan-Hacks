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
Drizzle ORM is used with PostgreSQL (via @neondatabase/serverless). The database schema includes tables for users, email subscribers, contact submissions, resource leads, pricebook optimizations, course purchases, wink_demo_submissions, smartac_demo_submissions, smartac_roi_submissions, wink_roi_submissions, contractor_commerce_demo_submissions, and liveswitch_demo_submissions. Zod schemas are used for validation, and Drizzle Kit for migrations.

### Demo Booking Systems
The platform features four comprehensive demo booking systems with auto-save and abandoned form tracking:

**Wink Toolbox Demo**: Basic 3-field form (first name, last name, email) available via dialog on partner page. Features auto-save when email is entered (stored with completed=false), abandoned form email notification when dialog closes without submission, and on successful submission: marks completed=true, sends JSON email to bill@st-hacks.com, and redirects to Calendly with prefilled parameters (firstName, lastName, email, a1="ServiceTitan Hacks").

**SmartAC Demo**: Comprehensive 13-field form displayed as dialog on partner page including:
- Basic contact info: first name, last name, email, phone
- Company details: company name, website URL, zip code
- Business profile: role (dropdown), licensed HVAC contractor status (dropdown), growth timeline (dropdown)
- Business metrics: membership agreements count (dropdown), annual revenue (radio buttons), service truck count (radio buttons)

**Contractor Commerce Demo**: 7-field form displayed as dialog on partner page and standalone booking page at /partners/contractor-commerce/book-demo including:
- Basic contact info: first name, last name, email, cell phone
- Company details: company name, website URL (optional), number of techs (dropdown: 1-5, 6-10, 11-25, 26-50, 51-100, 100+)

**LiveSwitch Demo**: Basic 3-field form (first name, last name, email) available via dialog on partner page. Features auto-save when email is entered (stored with completed=false), abandoned form email notification when dialog closes without submission, and on successful submission: marks completed=true, sends JSON email to bill@st-hacks.com, and redirects to LiveSwitch booking page (https://www.liveswitch.com/book-a-demo/) with prefilled email parameter.

All four forms implement:
- Auto-save: Partial data saved to database when email entered (1 second debounce, completed=false)
- Abandoned form tracking: If dialog closes without submission, sends JSON-formatted email to bill@st-hacks.com with partial data and "ABANDONED_FORM" type
- Complete submission: Marks completed=true and sends full submission email to bill@st-hacks.com for Zapier CRM integration

Form behavior patterns:
- Wink: Redirects to Calendly with prefilled parameters after submission
- SmartAC: Shows success toast and closes dialog after submission; standalone booking page at /partners/smartac/book-demo supports query parameter prefilling (firstName, email)
- Contractor Commerce: Shows success toast and closes dialog after submission
- LiveSwitch: Redirects to LiveSwitch booking page with prefilled email parameter after submission

### SmartAC ROI Calculator
Interactive tool at /smartac-roi-calculator that calculates 5-year membership growth projections. When users calculate ROI:
1. Dialog collects first name and email
2. Sends branded ROI report email to user with ServiceTitan Hacks colors (Primary Red #ED254E, Deep Red #C1121F, Dark Gray #2D3142)
3. Email includes personalized ROI metrics: 5-year net gain, ROI percentage, member growth, and incremental revenue
4. CTA button "Book Your SmartAC Demo" links to /partners/smartac/book-demo with prefilled firstName and email query parameters
5. Sends lead notification email to bill@st-hacks.com
6. Stores submission in smartac_roi_submissions table with all inputs and calculated results

### Wink ROI Calculator
Interactive tool at /wink-roi-calculator that calculates time savings and cost reduction from automated invoicing. When users calculate ROI:
1. Calculator accepts 8 inputs: invoices per month (50-1000), minutes per invoice (5-60), worker hourly pay ($10-50), mistake rate (1-20%), cost per mistake ($50-500), Wink monthly cost ($99-499), setup cost ($0-5000), and setup cost spread (6-24 months)
2. Calculates ROI metrics: 70% time savings on invoicing, labor cost savings, mistake reduction savings, Year 1 net savings, and 5-year cumulative net gain
3. Dialog collects first name and email before displaying results
4. Sends branded ROI report email to user with ServiceTitan Hacks colors (Primary Red #ED254E, Deep Red #C1121F, Dark Gray #2D3142)
5. Email includes personalized metrics: Year 1 net savings, 5-year cumulative, monthly time saved, and annual savings
6. CTA button "Book Your Wink Demo" links to /partners/wink-toolbox/book-demo with prefilled firstName and email query parameters
7. Sends lead notification email to bill@st-hacks.com
8. Stores submission in wink_roi_submissions table with all inputs and calculated results
9. Results page displays 4 summary cards, 5-year projection chart, and detailed breakdown of savings calculations

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