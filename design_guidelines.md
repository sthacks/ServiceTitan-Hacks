# ServiceTitan Hacks Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from contractor-focused, no-nonsense SaaS platforms with emphasis on clarity, conversion, and mobile-first accessibility. The design prioritizes direct communication and rapid information access for busy home service contractors.

## Brand Identity

### Color Palette
**Primary Colors:**
- Primary Red: `#ED254E` (0 75% 56%) - CTAs, headings, interactive elements
- Deep Red: `#C1124F` (334 81% 42%) - Hover states, accents
- Black: `#000000` (0 0% 0%) - Primary text, high-contrast areas
- White: `#FFFFFF` (0 0% 100%) - Backgrounds, cards, negative space

**Secondary Colors:**
- Dark Gray: `#1F1F1F` (0 0% 12%) - Section backgrounds, footer
- Mid Gray: `#6B7280` (220 9% 46%) - Secondary text, borders

### Typography
**Font Families:**
- Headings: "Oxygen" - tight, high-contrast type scale
- Body: "Inter" - clean, readable, modern sans-serif
- Load via Google Fonts with `font-display: swap`

**Type Scale:**
- H1 Hero: 48-72px (mobile: 32-48px), font-weight: 700, tight line-height (1.1)
- H2 Section: 36-48px (mobile: 28-36px), font-weight: 600
- H3 Card/Component: 24-28px (mobile: 20-24px), font-weight: 600
- Body Large: 18-20px, font-weight: 400, line-height: 1.6
- Body Default: 16px, font-weight: 400, line-height: 1.5
- Small/Meta: 14px, font-weight: 400, color: Mid Gray

## Layout System

### Spacing Primitives
Use consistent spacing units: **4, 8, 16, 24, 32, 48, 64, 96px**
- Component padding: 16-24px
- Section vertical spacing: 64-96px (mobile: 48-64px)
- Card gaps: 24-32px
- Content max-width: 1280px with 24px horizontal padding

### Grid System
- Mobile: Single column, full-width stacked
- Tablet: 2-column for cards, features
- Desktop: 3-column for feature grids, 2-column for major content sections

## Component Library

### Navigation Header
- Sticky position with white background, subtle shadow on scroll
- Logo (text lockup): ServiceTitan Hacks in Oxygen, black with red accent
- Horizontal nav links on desktop, hamburger menu on mobile
- Link states: Mid Gray default, Primary Red on hover/active
- Height: 72px desktop, 64px mobile

### Hero Sections
**Home Page Hero:**
- Full-width background: Dark Gray (#1F1F1F) with subtle texture or gradient
- H1 white text, centered, max-width 800px
- Subhead in white with Mid Gray tint (80% opacity)
- Two-button CTA layout: Primary Red solid button + outline white button with blur backdrop
- Height: 80vh minimum, vertically centered content
- NO hero image - pure typographic impact with strong color contrast

**Interior Page Heroes:**
- Shorter height (40-50vh), left-aligned content
- White background with bold red accent line or geometric element
- Black text with red H1 or red accent elements

### Cards
**Feature/Pillar Cards:**
- White background, subtle shadow (`0 2px 8px rgba(0,0,0,0.08)`)
- 24px padding, border-radius: 8px
- Icon or badge at top (60-80px size) in Primary Red
- H3 title in black
- Body text in Mid Gray
- CTA link in Primary Red with arrow icon
- Hover state: lift shadow (`0 4px 16px rgba(0,0,0,0.12)`)

**Episode/Content Cards:**
- Horizontal layout on desktop, vertical on mobile
- Thumbnail area (200x200px) on left
- Date badge in top-right corner (Primary Red background, white text)
- Title, description, meta info stack
- "Listen" or "Read More" CTA button

### Buttons
**Primary CTA:**
- Background: Primary Red, white text
- Padding: 16px 32px, border-radius: 8px
- Font: 16px bold, letter-spacing: 0.5px
- Hover: Deep Red background, slight lift
- Active: Darker shade, pressed effect

**Secondary/Outline:**
- Border: 2px solid (white on dark, Primary Red on light)
- Background: Transparent with blur backdrop (backdrop-filter: blur(8px))
- Hover: Fill with Primary Red, white text
- NO additional hover states - relies on built-in Button component states

**Ghost/Text Link:**
- Primary Red text, no background
- Underline on hover
- Arrow or chevron icon

### Forms
**Input Fields:**
- White background, 1px Mid Gray border
- Padding: 12px 16px, border-radius: 6px
- Focus: Primary Red border, subtle red shadow
- Error: Red border with error message below in red
- Labels: 14px Mid Gray above input, required asterisk in red

**Email Capture Blocks:**
- Compact inline form with email input + submit button
- Privacy note below in 12px Mid Gray text
- Honeypot field hidden with CSS

### Sections

**Trust Strip:**
- Light gray background (#F9FAFB)
- Horizontal scroll on mobile, centered grid on desktop
- Logo placeholders with grayscale filter, color on hover
- Height: 120px, logos max 80px height

**Testimonial Cards:**
- Quote in 18px italic, Mid Gray
- Contractor name in bold black, company in Mid Gray below
- Photo placeholder: 60px circle, grayscale
- Three-column grid on desktop, single column on mobile

**Comparison Table:**
- Sticky header row with Primary Red background, white text
- Alternating row backgrounds (white/very light gray)
- Checkmarks in Primary Red, X marks in Mid Gray
- Mobile: Card-based stacked layout

**FAQ Accordion:**
- Question: bold 18px black with chevron icon
- Answer: hidden, expands with smooth animation
- Border-bottom separator between items
- Active state: Primary Red chevron, slight background tint

### Footer
- Dark Gray (#1F1F1F) background, white/light gray text
- Three-column layout: Quick Links, Social Links, Legal
- Logo/lockup at top
- Social icons: 40px circles, white borders, Primary Red on hover
- Copyright in 14px Mid Gray (lightened for dark background)
- Spacing: 64px top/bottom padding

## Images

### Image Strategy
**NO large hero images** - ServiceTitan Hacks uses bold typography and color blocking for hero sections to load instantly and communicate directly.

**Supporting Images:**
1. **Sponsor Logos** - Grayscale placeholders, 200x100px, left-aligned in grid
2. **Podcast Episode Thumbnails** - Square 400x400px, consistent aspect ratio
3. **Founder Bio Photo** - 300x300px circle crop, professional headshot on About page
4. **Tool Screenshots** - 800x600px browser window mockups showing product interfaces
5. **Course Preview Images** - 16:9 ratio, 600x338px, representing course content

All images: `loading="lazy"`, proper `width` and `height` attributes, descriptive alt text.

## Accessibility & Performance
- WCAG 2.1 AA contrast ratios (Primary Red passes on white, white passes on Dark Gray)
- Keyboard navigation with visible focus states (Primary Red outline)
- Semantic HTML with proper heading hierarchy
- Skip-to-content link for screen readers
- Touch targets minimum 44x44px
- Fast load: inline critical CSS, defer non-critical JS, optimized images

## Page-Specific Layouts

**Home:** Hero → Trust Strip → Three Pillar Cards (3-col) → Featured Content (mixed 2-col/1-col) → Email Capture → Testimonials (3-col) → CTA Band

**Partners:** Short intro → Sponsor Grid (3-4 col) → Explainer bullets → Contact CTA

**Tools:** Feature Cards (3-col) → Comparison Table → Secondary CTA

**Courses:** Course Cards (2-3 col) with level badges → All-Access CTA

**All-Access:** Key icon hero → Benefits list (2-col) → Pricing Panel → FAQ Accordion

**Podcast:** Latest Episode Hero (left content, right audio embed) → Episode List (cards)

**Contact:** Form (centered, max-width 600px) with inline validation states