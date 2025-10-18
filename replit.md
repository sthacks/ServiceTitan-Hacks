# ServiceTitan Hacks - Replit Configuration

## Overview

ServiceTitan Hacks is a mobile-first marketing website for home service contractors focused on AI integrations, automations, and ServiceTitan customizations. The platform provides educational resources, courses, tools, and community access through a modern, conversion-optimized web experience.

**Core Purpose:** Help contractors leverage AI and automation to grow their businesses by providing vetted tools, educational content, and a supportive community.

**Target Audience:** Home service contractors (HVAC, plumbing, electrical) using ServiceTitan who want to automate workflows and integrate AI solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety and modern component development
- Vite as the build tool for fast development and optimized production builds
- Single Page Application (SPA) with client-side routing using Wouter (lightweight routing library)
- Server-side rendering is NOT used - pure client-side rendering approach

**Design System:**
- Shadcn/ui component library built on Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables-based theming system supporting light/dark modes
- Custom color palette: Primary Red (#ED254E), Deep Red (#C1124F), Dark Gray (#1F1F1F)
- Typography: "Oxygen" for headings, "Inter" for body text via Google Fonts
- Mobile-first responsive design with WCAG 2.1 AA accessibility compliance

**State Management:**
- TanStack Query (React Query) for server state management and data fetching
- Local component state using React hooks for UI-specific state
- Custom query client configuration with disabled refetching and infinite stale time

**Component Architecture:**
- Atomic design pattern with reusable components in `/client/src/components`
- Page-level components in `/client/src/pages`
- Shared UI components from Shadcn in `/client/src/components/ui`
- Component examples for development reference in `/client/src/components/examples`

**Routing Structure:**
- `/` - Home page with hero, pillars, testimonials, email capture
- `/partners` - Sponsor/partner showcase
- `/tools` - AI tools and product catalog
- `/pricebook-optimizer` - AI-powered pricebook description optimizer with live ChatGPT integration
- `/courses` - Educational course offerings
- `/all-access` - Subscription membership page
- `/podcast` - Podcast episode library
- `/resources` - Downloadable resources and templates
- `/about` - Company mission and founder bio
- `/contact` - Contact form

### Backend Architecture

**Server Framework:**
- Express.js as the HTTP server framework
- Node.js runtime with ES Modules (type: "module")
- TypeScript for type-safe server code
- Development mode uses `tsx` for TypeScript execution
- Production mode uses esbuild-bundled server code

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Error handling middleware for consistent error responses
- Request logging middleware for development debugging

**API Endpoints:**
- `POST /api/subscribe` - Email newsletter subscription
- `POST /api/contact` - Contact form submission
- `POST /api/pricebook-optimization` - AI-powered pricebook description optimization using ChatGPT
- `POST /api/resource-leads` - Resource download lead capture
- Form validation using Zod schemas with friendly error messages
- Duplicate email checking for subscriptions

**AI Integration:**
- **Pricebook Optimizer**: Live ChatGPT integration for transforming technical service descriptions into homeowner-friendly language
- Uses Replit AI Integrations (no API key management required, billed to Replit credits)
- Model: GPT-4o with temperature 0.7, max 500 tokens
- Custom prompt system that emphasizes quality, reliability, and value without describing work as "simple" or "easy"
- HTML-formatted output with <b> tags for headings, <ul>/<li> for lists, <br> for spacing
- Results displayed inline on the website with before/after comparison
- Copy-to-clipboard functionality strips HTML for clean ServiceTitan pasting

**Data Storage Strategy:**
- In-memory storage implementation (MemStorage class) for development
- Storage abstraction layer (IStorage interface) allows easy swapping to database implementation
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Three main data entities: users, email_subscribers, contact_submissions

**Session Management:**
- Session infrastructure present (connect-pg-simple package)
- User authentication schema defined but not actively implemented in routes
- Ready for future authentication features

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM as the database toolkit and query builder
- PostgreSQL as the target database (via @neondatabase/serverless)
- Schema-first approach with TypeScript types generated from schema
- Migration system configured with Drizzle Kit

**Schema Design:**
```
users:
  - id (UUID primary key)
  - username (unique text)
  - password (text)

email_subscribers:
  - id (UUID primary key)
  - email (unique text)
  - subscribedAt (timestamp)

contact_submissions:
  - id (UUID primary key)
  - name, email, company, role, message (text)
  - consent (text)
  - submittedAt (timestamp)
```

**Data Validation:**
- Zod schemas for runtime validation
- Drizzle-zod integration for generating schemas from database tables
- Custom validation rules (email format, required fields)
- Type-safe insert/select operations

### Development Workflow

**Build & Development:**
- `npm run dev` - Development server with hot module reload
- `npm run build` - Production build (client + server bundling)
- `npm run start` - Production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push schema changes to database

**Module Resolution:**
- Path aliases configured: `@/` for client, `@shared/` for shared code, `@assets/` for assets
- Shared schema between client and server via `/shared` directory
- Bundler module resolution for modern import patterns

**Development Environment:**
- Replit-specific plugins for error overlay, cartographer, dev banner
- Vite dev server with middleware mode for API integration
- HMR (Hot Module Replacement) over WebSocket connection
- Source maps enabled for debugging

## External Dependencies

### Third-Party UI Libraries
- **Radix UI Primitives** - Comprehensive suite of unstyled, accessible component primitives (accordion, dialog, dropdown, select, toast, tooltip, etc.)
- **Shadcn/ui** - Pre-built component library built on Radix UI with Tailwind styling
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icons (specifically SiYoutube, SiFacebook, SiLinkedin for social media)

### Form Management
- **React Hook Form** - Form state management and validation
- **@hookform/resolvers** - Validation resolver for Zod integration
- **Zod** - Schema validation for forms and API data
- **zod-validation-error** - User-friendly error message formatting

### Data Fetching & State
- **TanStack Query** (React Query) - Server state management, caching, and data fetching
- Custom fetch wrapper with credential support and error handling

### Database & ORM
- **Drizzle ORM** - Type-safe ORM for PostgreSQL
- **@neondatabase/serverless** - Serverless PostgreSQL driver
- **Drizzle Kit** - Schema migrations and management tools
- **Drizzle Zod** - Generate Zod schemas from Drizzle tables

### Styling & UI Utilities
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - CSS class variance management for component variants
- **clsx** & **tailwind-merge** - Conditional class name utilities
- **PostCSS** & **Autoprefixer** - CSS processing

### Date & Time
- **date-fns** - Modern date utility library

### Additional UI Components
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel/slider component
- **vaul** - Drawer component library

### Development Tools
- **Vite** - Fast build tool and dev server
- **@vitejs/plugin-react** - React support for Vite
- **esbuild** - Fast JavaScript bundler for production server
- **tsx** - TypeScript execution for development
- **TypeScript** - Type safety and developer experience

### Fonts & Assets
- **Google Fonts** - Oxygen (headings) and Inter (body) font families
- Preconnect optimization for font loading performance
- Font display swap for faster perceived loading

### Session Management (Ready but Not Active)
- **express-session** - Session middleware
- **connect-pg-simple** - PostgreSQL session store
- Infrastructure in place for future authentication features

### External Services Integration
- **Facebook Groups** - Primary CTA links to Facebook community
- **YouTube** - Video content embedding (planned)
- **Podcast platforms** - Episode distribution (planned)
- Design prepared for sponsor logo integrations