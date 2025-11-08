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

### Individual Partner Pages (November 2025)
- Created dedicated pages for all 7 partners at `/partners/:slug` with dynamic routing
- Each partner page displays: large logo, partner name (H1), description (from card text as subtitle), and "Learn More" external link button
- Partner slugs: volca-ai, wink-toolbox, smartac, contractor-commerce, liveswitch, polycam, service-crucible
- Updated Partners.tsx to link partner cards to internal detail pages instead of external URLs
- Added "Back to Partners" button on each partner detail page for easy navigation
- All 7 partner pages added to sitemap.xml with priority 0.6
- Navigation flow: Partners page → Partner detail page → External partner website (via "Learn More" button)

#### Wink Toolbox Enhanced Partner Page
- Upgraded Wink Toolbox partner page (`/partners/wink-toolbox`) with comprehensive content layout
- Hero section with headline "Transform your numbers into actionable insights — without adding another system"
- Six main sections: Hero, What Wink Toolbox Does (3 feature cards), Why It Matters (4 benefits), Features Spotlight (5 features, black background), Who It's For, and Final CTA (red background)
- Feature cards showcase data consolidation, automation tools, and ServiceTitan integration capabilities
- Benefits highlight time savings, real-time visibility, automation, and single source of truth
- Features include unlimited dashboards, Excel-style formulas, automation rules, 25+ integrations, and scalable pricing
- All CTAs link to affiliate URL (https://go.st-hacks.cc/wink) for demo booking



### Comprehensive SEO Implementation (November 2025)
- Created reusable SEO component (client/src/components/SEO.tsx) with meta tags, Open Graph, Twitter Cards, and schema markup support
- Added SEO meta tags to ALL 17+ pages with unique titles, descriptions under 160 characters, keywords, and canonical URLs
- Implemented structured data (schema.org) across the site:
  - Organization schema on homepage and index.html
  - Course schema on all 6 course landing pages with pricing and provider information
- Created comprehensive robots.txt with sitemap reference, admin exclusions, and crawl directives
- Generated complete sitemap.xml with all 20+ public pages, proper priorities, and change frequencies
- All pages now have proper heading hierarchy (H1 → H2 → H3)
- Enhanced image ALT text with descriptive, keyword-rich descriptions
- Added internal linking between related pages
- Configured Google Analytics 4 tracking framework (awaiting VITE_GA_MEASUREMENT_ID configuration)
- Generated SEO_Implementation_Report.csv with detailed improvements and recommendations for all pages

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

### Design Consistency Updates (November 2025)
- Fixed Resources page hero background to match consistent styling across all pages
- Removed AI Call Recording Analysis from Courses page (user preference)

### SmartAC ROI Calculator (November 2025)
- Created comprehensive ROI calculator at `/smartac-roi-calculator` for HVAC contractors to calculate profit growth with SmartAC platform
- Features 8 customizable input fields with tooltips (Active Memberships, Annual Cost, Close Rate, Retention Rate, Truck Rolls, etc.)
- Real-time client-side calculations showing before/after comparison for revenue, profit, and truck roll costs
- Displays Net Annual Savings, Annual ROI percentage, Truck Roll Savings, and Revenue Increase in visual cards
- Interactive 5-year revenue growth projection using Recharts bar chart
- SmartAC Improvement Factors card showing: Conversion (20% → 40%), Retention (70% → 90%), Truck Rolls (2 → 1), Virtual Savings ($300/home/year)
- Mobile-responsive design with gradient hero section and CTA buttons to /contact and /resources
- Added SmartAC ROI Calculator card to Resources page as internal tool (first card in grid)
- Updated sitemap.xml with new calculator page (priority 0.8)

### Cost Per Truck Roll Calculator (November 2025)
- Created comprehensive truck roll cost calculator at `/truck-roll-calculator` with 9 customizable input fields
- Real-time calculations for labor burden, vehicle costs, overhead allocation, truck/tool expenses
- Displays 6 cost breakdowns: Fully Burdened Labor Rate, Labor Cost Per Call, Vehicle Cost Per Call, Truck/Tool Cost Per Call, Overhead Cost Per Call, and Total Cost
- Defaults based on BLS median HVAC wage ($28/hr) and AAA vehicle costs ($0.85/mile)
- Added source references section citing BLS HVAC wage data and AAA "Your Driving Costs" report
- Implemented social preview metadata with custom HVAC van/calculator image, title "Know Your True Cost Per Service Call", and descriptive text
- Added to Resources page navigation and sitemap.xml
- 301 redirect configured: `/users/sign_in` → `https://servicetitanhacks.thinkific.com/users/sign_in` for course platform login

### Resource Landing Pages with Email Delivery (November 2025)
- Created email-gated landing pages for downloadable resources to ensure valid email collection and enable lead nurturing
- All resource landing pages use consistent design pattern: hero section with image, benefit cards, email capture form, and CTA section
- Resources are delivered via Resend email with attachments instead of direct downloads

#### Automation Playbook Landing Page
- Created dedicated landing page at `/automation-playbook-landing` for the Automation Playbook: Zapier + Wink resource
- Features hero image, title, description, and email capture form for PDF delivery
- Landing page showcases 4 key benefits: When to Use Zapier vs Wink, Build Hybrid Workflows, Setup Tips & Best Practices, Real-World Examples
- Email includes personalized greeting, learning outcomes, links to resources/community, and PDF attachment (automation-playbook-zapier-wink.pdf)

#### ServiceTitan Metrics Guide Landing Page
- Created dedicated landing page at `/servicetitan-metrics-landing` for the ServiceTitan Metrics Guide: 112 Essential KPIs
- Excel file (servicetitan-metrics-guide.xlsx) contains 112 metrics organized by department (Sales, Operations, Marketing, Finance, Customer Service)
- Landing page highlights: Metric definitions, formulas/calculations, and ServiceTitan-compatible structure
- Email delivers Excel spreadsheet attachment with personalized greeting and links to community

#### Swimlane Charts Landing Page
- Created dedicated landing page at `/swimlane-charts-landing` for the Streamline Your Business with Swimlane Charts template
- PDF file (tech-turnover-swimlane.pdf) shows process mapping for technician hiring and onboarding
- Landing page highlights: Clear role definition, workflow visualization, streamlined handoffs, and scalable operations
- Email delivers PDF attachment with benefits explanation and community links

#### Pricing Objections Landing Page
- Created dedicated landing page at `/pricing-objections-landing` for the Master Your Pricing Objections resource
- PDF file (pricing-objections-iceberg.pdf) contains the "Why It Costs What It Costs" iceberg graphic
- Landing page highlights: Defend your value, communicate with confidence, close more sales, and train your team
- Email delivers PDF attachment showing visible costs (technician, time, parts) vs. hidden business expenses
- Helps contractors explain pricing objections without sounding defensive

#### Technical Implementation
- Backend route `/api/resource-leads` handles email delivery for all four resources based on resourceName match:
  - "Automation Playbook: Zapier + Wink" → automation-playbook-zapier-wink.pdf
  - "ServiceTitan Metrics Guide" → servicetitan-metrics-guide.xlsx
  - "Streamline Your Business with Swimlane Charts" → tech-turnover-swimlane.pdf
  - "Master Your Pricing Objections" → pricing-objections-iceberg.pdf
- All resources trigger admin notification email to bill@st-hacks.com with download details
- Response includes `shouldCheckEmail: true` for email-gated resources to show appropriate success message
- Resources page updated to link to landing pages (isInternalTool: true) instead of direct downloads or external Thinkific URLs
- All landing pages added to sitemap.xml with priority 0.8