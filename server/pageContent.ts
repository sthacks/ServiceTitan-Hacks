/**
 * Server-side page content registry.
 *
 * Provides route-specific HTML body content that is injected into the initial
 * HTML response for all requests (not just crawler UAs). Because client/src/main.tsx
 * uses `createRoot` (not `hydrateRoot`), React fully replaces the #root element on
 * mount — so regular browser users experience seamless client-side rendering while
 * crawlers that don't execute JavaScript read real, route-specific page content.
 *
 * Content here should mirror the key headings, paragraphs, and link structure of
 * each public route. Update this file when pages are added or their copy changes.
 */

const SITE_HEADER = `
<header style="background:#1a1a1a;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;">
  <a href="/" style="color:#ED254E;font-weight:700;font-size:1.1rem;text-decoration:none;">ServiceTitan Hacks</a>
  <nav>
    <a href="/blog" style="color:#fff;margin-left:16px;text-decoration:none;">Blog</a>
    <a href="/apps" style="color:#fff;margin-left:16px;text-decoration:none;">Apps</a>
    <a href="/courses" style="color:#fff;margin-left:16px;text-decoration:none;">Courses</a>
    <a href="/resources" style="color:#fff;margin-left:16px;text-decoration:none;">Resources</a>
    <a href="/events" style="color:#fff;margin-left:16px;text-decoration:none;">Events</a>
    <a href="/podcast" style="color:#fff;margin-left:16px;text-decoration:none;">Podcast</a>
    <a href="/partners" style="color:#fff;margin-left:16px;text-decoration:none;">Partners</a>
  </nav>
</header>`;

const SITE_FOOTER = `
<footer style="background:#111;color:#aaa;padding:24px;margin-top:48px;text-align:center;">
  <p>&copy; 2025 ServiceTitan Hacks. AI tools and automation for home service contractors.</p>
  <nav style="margin-top:8px;">
    <a href="/about" style="color:#aaa;margin:0 8px;">About</a>
    <a href="/contact" style="color:#aaa;margin:0 8px;">Contact</a>
    <a href="/privacy-policy" style="color:#aaa;margin:0 8px;">Privacy</a>
    <a href="/blog" style="color:#aaa;margin:0 8px;">Blog</a>
    <a href="/courses" style="color:#aaa;margin:0 8px;">Courses</a>
    <a href="/partners" style="color:#aaa;margin:0 8px;">Partners</a>
  </nav>
</footer>`;

function wrap(content: string): string {
  return `${SITE_HEADER}<div style="max-width:860px;margin:0 auto;padding:32px 24px;font-family:Inter,system-ui,sans-serif;color:#111;line-height:1.7;">${content}</div>${SITE_FOOTER}`;
}

/** Blog post content keyed by slug */
const BLOG_POSTS: Record<string, { title: string; author: string; date: string; category: string; excerpt: string; readTime?: string; sections: string[] }> = {
  "why-phonetap-exists": {
    title: "Why PhoneTap Exists",
    author: "Bill Brown",
    date: "February 16, 2026",
    category: "Call Center",
    excerpt: "In 2020, I started running my HVAC company remotely. I had to rely on data. But when my co-founders and I dug into call center metrics, the numbers didn't match reality. Call classification accuracy was only 50 to 60 percent. That's why we built PhoneTap.",
    sections: [
      "Bad Data Is Worse Than No Data",
      "The Call Numbers Were Not Right",
      "Why AI Makes a Difference",
      "Understanding Lost Revenue",
      "Tracking Recovered Revenue",
      "The Real Why",
    ],
  },
  "why-i-stopped-caring-about-hvac-equipment-brands": {
    title: "Why I Stopped Caring So Much About HVAC Equipment Brands",
    author: "Bill Brown",
    date: "January 7, 2026",
    category: "Business Operations",
    excerpt: "After 25 years in HVAC—as a tech, installer, sales rep, business owner, and working manufacturer-side—I've seen how equipment is actually made. Most brands are more similar than different. Here's what really matters.",
    sections: [
      "Most HVAC Equipment Is More Similar Than Different",
      "So What Actually Differentiates One Brand From Another?",
      "Why I Ultimately Chose Goodman as a Private Label Dealer",
      "The Financial Side Contractors Rarely Talk About",
      "From Perspective to Action",
      "What the Purchasing Platform Actually Is",
    ],
  },
  "why-hvac-contractors-overvalue-new-customers": {
    title: "Why HVAC Contractors Overvalue New Customers and Undervalue Retention",
    author: "Bill Brown",
    date: "December 30, 2025",
    category: "Business Strategy",
    excerpt: "Attribution is useful, but incomplete. When contractors zoom in too far on lead sources and acquisition costs, they miss the bigger strategic question: where does revenue actually come from, and how do you keep it?",
    sections: [
      "Attribution Is Not the Same as Strategy",
      "Why Contractors Overvalue New Customers: The Reporting Problem",
      "Why Contractors Overvalue New Customers: The Dopamine Problem",
      "The Cost of Ignoring Retention",
      "The Bigger Year-End Question Contractors Should Ask",
      "How to Think About Future Customer Value",
      "Retention Is an Experience Problem",
      "Conclusion",
    ],
  },
  "diy-ai-sales-coach": {
    title: "How I Built a DIY 'Sales Coach' for $25/Month Using AI",
    author: "Bill Brown",
    date: "December 16, 2025",
    category: "Sales",
    excerpt: "I'll be honest: I am not a good salesperson. But I'm getting better—and the only reason is because I finally learned how to study my own mistakes using AI. Here's my $25/month hack.",
    sections: [
      "The Confession",
      "The Game Tape Concept",
      "The AI Unlock: From Note-Taker to Coach",
      "The Workflow: Your Step-by-Step Guide",
      "Why the Plaud Note Pin Works So Well",
      "You Don't Need Your Company to Buy This",
      "The Bottom Line",
    ],
  },
  "4-ways-top-companies-control-schedule": {
    title: "4 Surprising Ways Top Home Service Companies Actually Take Control of Their Schedule",
    author: "Bill Brown",
    date: "December 11, 2025",
    category: "Operational Strategy",
    excerpt: "Most companies on ServiceTitan think they have a scheduling problem. What they really have is a visibility problem. Here are four real strategies top operators use to take control instead of hoping the day works out.",
    sections: [
      "1. They Turn Scheduling Into a Team Sport",
      "2. They Stop Reacting and Start Planning",
      "3. They Make Hitting Targets Simple and Fun",
      "4. They Use Tools Built for ServiceTitan Instead of Fighting Generic Dashboards",
      "Are You Managing the Schedule, or Commanding It?",
    ],
  },
  "stop-treating-dashboard-like-spreadsheet": {
    title: "Stop Treating Your Dashboard Like a Spreadsheet (My Philosophy on Metrics)",
    author: "Bill Brown",
    date: "December 11, 2025",
    category: "Operational Strategy",
    excerpt: "Business analytics dashboards have gone off the rails. They look like 24-hour news channels with tickers and pop-ups everywhere. If you have to study it, it's not a dashboard—it's a report. Here's my philosophy on how dashboards should actually work.",
    sections: [
      "The \"Car Dashboard\" Philosophy",
      "Why I Scrapped the DIY Class (And Built an App)",
      "The Digital Whiteboard Concept",
      "Simplicity Wins",
    ],
  },
  "selling-hvac-systems-to-millennials-online-pricing": {
    title: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional",
    author: "Bill Brown",
    date: "November 14, 2025",
    category: "Marketing",
    excerpt: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory if you want to capture the next decade of HVAC replacement business.",
    sections: [
      "1. Millennials Expect Accessible Online Information, Not Phone-Call Gatekeeping",
      "2. Google and AI Results Reward Contractors Who Give People What They Want",
      "3. The \"Call for Price\" Model Will Quietly Shrink Your Market Share",
      "4. The Real Race to the Bottom Is Invisible",
      "5. Your Website Must Become a Transparent Digital Sales Experience",
      "6. The Anatomy of a High-Converting Pricing Page",
      "7. Online Pricing Will Become Universal. Early Adopters Win.",
      "Conclusion: Millennials Aren't the Future Buyer — They're the Current Buyer",
    ],
  },
  "how-to-sell-saas-to-home-service-contractors": {
    title: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors",
    author: "Bill Brown",
    date: "November 14, 2025",
    category: "Business Operations",
    excerpt: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company and implementing dozens of software solutions.",
    sections: [
      "1. Why Selling to Contractors Is Different",
      "2. Integration With the FSM Must Be Seamless",
      "3. Field Technicians Will Make or Break Your Product",
      "4. Offline Capability Is Not Optional",
      "5. Onboarding Must Be Absolutely Zero-Friction",
      "6. Visit Contractors and Watch Techs Use Your App",
      "7. Avoid Onboarding Fees Whenever Possible",
      "8. How Contractors Really Behave at Trade Shows",
      "9. Direct Mail Outperforms Digital Outreach",
      "10. Contractors Don't Buy on Your Timeline",
      "11. Final Recommendations for SaaS Teams",
    ],
  },
  "stop-selling-other-peoples-equipment-build-your-brand": {
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead",
    author: "Bill Brown",
    date: "January 22, 2025",
    category: "Business Operations",
    excerpt: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    sections: [
      "The Hard Truth",
      "The Wake-Up Call: All HVAC Equipment Is Basically the Same",
      "When I Woke Up",
      "The Truth Nobody Else Will Tell You",
    ],
  },
  "dmaic-process-improvement-framework": {
    title: "Stop Putting Out Fires: How DMAIC Permanently Fixes Broken Processes",
    author: "Bill Brown",
    date: "January 20, 2025",
    category: "Process Improvement",
    excerpt: "Most business coaches sell you their systems. But what happens when it doesn't fit your team? Learn the proven framework that helped GE and Motorola—and how to use it in your home service business.",
    sections: [
      "What Is DMAIC?",
      "Define: Identify the Problem Clearly",
      "Measure: Quantify the Problem",
      "Analyze: Find the Root Cause",
      "Improve: Test and Implement Solutions",
      "Control: Lock In the Gains",
    ],
  },
  "should-i-switch-to-servicetitan": {
    title: "Should I Switch to ServiceTitan? The Real Cost and Timeline",
    author: "Bill Brown",
    date: "May 7, 2025",
    category: "ServiceTitan Tips",
    excerpt: "Considering ServiceTitan for your home service business? Learn when it makes sense to switch, what it really costs ($10K-$30K in setup), and why full implementation takes six months.",
    sections: [
      "1. The Right Time to Switch",
      "2. What You'll Gain",
      "3. What You'll Need to Budget For",
      "4. What the Implementation Timeline Looks Like",
      "5. Is It Worth It?",
    ],
  },
  "ai-automation-contractors-where-to-start": {
    title: "AI for Contractors: Where to Start?",
    author: "Bill Brown",
    date: "2025",
    category: "AI & Automation",
    excerpt: "Overwhelmed by AI buzz? Here are the practical, first steps to actually using automation in your service business.",
    sections: [
      "Start with the Problems You Already Have",
      "The Easiest AI Wins for Contractors",
      "Tools Worth Trying",
      "What Not to Do",
    ],
  },
  "double-booking-rate-better-forms": {
    title: "Double Your Booking Rate with Better Forms",
    author: "Bill Brown",
    date: "2025",
    category: "Operations",
    excerpt: "Your intake forms might be killing your conversion rate. See how small tweaks can lead to massive booking improvements.",
    sections: [
      "Why Your Forms Are Losing You Jobs",
      "The Anatomy of a High-Converting Form",
      "Common Mistakes Contractors Make",
      "How to Fix It in ServiceTitan",
    ],
  },
  "servicetitan-dashboard-metrics": {
    title: "5 ServiceTitan Metrics You Can't Ignore",
    author: "Bill Brown",
    date: "2025",
    category: "ServiceTitan",
    excerpt: "Are you tracking the right numbers? Here are the essential dashboard metrics every owner needs to watch daily.",
    sections: [
      "Booking Rate",
      "Average Ticket Value",
      "Technician Efficiency",
      "Membership Retention",
      "Call Answer Rate",
    ],
  },
  "ultimate-guide-automating-follow-up-calls": {
    title: "The Ultimate Guide to Automating Follow-Ups",
    author: "Bill Brown",
    date: "2025",
    category: "Automation",
    excerpt: "The money is in the follow-up. Learn how to automate your calls so no unsold estimate ever slips through the cracks.",
    sections: [
      "Why Follow-Up Matters",
      "Setting Up Automated Follow-Ups in ServiceTitan",
      "The Right Cadence",
      "Scripts That Work",
    ],
  },
  "top-servicetitan-integrations-2025": {
    title: "Top ServiceTitan Integrations for 2025",
    author: "Bill Brown",
    date: "2025",
    category: "ServiceTitan",
    excerpt: "Upgrade your tech stack. We reviewed the top apps and integrations you need to be using this year.",
    sections: [
      "Call Intelligence Tools",
      "AI Customer Service",
      "Online Sales Platforms",
      "Performance Pay Software",
      "Remote Monitoring",
    ],
  },
  "convert-more-leads-better-website": {
    title: "How to Convert More Leads with Your Website",
    author: "Bill Brown",
    date: "2025",
    category: "Marketing",
    excerpt: "Is your website just a brochure or a lead machine? Simple changes to turn more visitors into booked ServiceTitan jobs.",
    sections: [
      "Why Most Contractor Websites Fail",
      "The Anatomy of a Lead-Converting Site",
      "Above the Fold: Make It Count",
      "Trust Signals That Work",
      "CTAs That Book Jobs",
    ],
  },
};

/** Partner content keyed by slug */
const PARTNERS: Record<string, { name: string; headline: string; description: string; features: string[]; url: string }> = {
  "wink-toolbox": {
    name: "Wink Toolbox",
    headline: "Automate Your Back Office — Stop Drowning in Data Entry",
    description: "Wink Toolbox connects your tech stack, automates your reporting and back-office workflows, and gives home-service companies the clarity they need to scale. It is a ServiceTitan Certified Provider.",
    features: [
      "AI-powered invoicing and job summary automation",
      "Real-time reporting dashboards synced with ServiceTitan",
      "Eliminate manual data re-entry across your tech stack",
      "Automated accounts receivable follow-up",
      "Custom workflows for HVAC, plumbing, and electrical contractors",
    ],
    url: "/partners/wink-toolbox",
  },
  "smartac": {
    name: "SmartAC",
    headline: "Reduce Truck Rolls. Grow Memberships. Monitor Every System Remotely.",
    description: "SmartAC provides remote HVAC monitoring that reduces truck rolls and increases membership retention. Smart sensors alert contractors before equipment fails, so you can deliver proactive service and comfort without concern.",
    features: [
      "Remote HVAC system monitoring via smart sensors",
      "Homeowner app for real-time equipment status",
      "Proactive alerts before equipment failure",
      "Membership revenue growth through enhanced service",
      "Reduced unnecessary truck rolls and callbacks",
      "Full integration with ServiceTitan",
    ],
    url: "/partners/smartac",
  },
  "contractor-commerce": {
    name: "Contractor Commerce",
    headline: "Sell HVAC Systems Online — Let Homeowners Buy on Their Terms",
    description: "Built by contractors, for contractors. Contractor Commerce provides online HVAC system pricing and sales tools that let homeowners shop and buy replacement systems on their own timeline, 24/7.",
    features: [
      "Online HVAC system configurator and pricing",
      "Homeowner self-service purchasing experience",
      "Integrates with ServiceTitan for seamless job creation",
      "Transparent pricing that builds trust",
      "Capture after-hours and weekend replacement leads",
    ],
    url: "/partners/contractor-commerce",
  },
  "broccoli-ai": {
    name: "Broccoli AI",
    headline: "Your Phones, Covered 24/7 — AI CSR for ServiceTitan Contractors",
    description: "Broccoli AI is an AI voice agent built for home service contractors using ServiceTitan. It answers calls, books jobs, handles overflow, and follows up on leads — so your team stops losing appointments.",
    features: [
      "AI-powered call answering and job booking",
      "24/7 availability including after-hours and weekends",
      "Handles overflow calls so you never miss a lead",
      "Automated lead follow-up and appointment setting",
      "Deep ServiceTitan integration for real-time scheduling",
    ],
    url: "/partners/broccoli-ai",
  },
  "phonetap": {
    name: "PhoneTap",
    headline: "Know What Your Calls Are Really Costing You",
    description: "PhoneTap helps ServiceTitan contractors analyze calls, find missed revenue, fix bad call data, and give CSR managers clearer daily insights. AI call intelligence built specifically for the trades.",
    features: [
      "AI-powered call classification and scoring",
      "Missed revenue identification from unbooked calls",
      "CSR performance coaching and analysis",
      "Real-time call data correction for ServiceTitan",
      "Daily manager dashboards and reporting",
    ],
    url: "/partners/phonetap",
  },
  "sharewillow": {
    name: "ShareWillow",
    headline: "Performance Pay That Actually Works — Tied to Real ServiceTitan Numbers",
    description: "ShareWillow is performance pay software for ServiceTitan teams. It helps contractors design, launch, and manage incentive plans tied to real numbers — so technicians earn more when the company wins more.",
    features: [
      "Custom incentive plan design for HVAC and plumbing teams",
      "Performance pay calculations tied to ServiceTitan data",
      "Technician-facing dashboards showing earning potential",
      "Payroll-ready reports and automated calculations",
      "Replace fragile commission spreadsheets with consistent rules",
    ],
    url: "/partners/sharewillow",
  },
  "liveswitch": {
    name: "LiveSwitch",
    headline: "Professional Virtual Phone Solutions for Home Service Companies",
    description: "LiveSwitch provides professional virtual phone solutions designed to streamline communication and enhance customer service for home service businesses integrated with ServiceTitan.",
    features: [
      "Virtual phone system built for service companies",
      "ServiceTitan integration for seamless call routing",
      "Call recording and quality monitoring",
      "Mobile-friendly for field and office teams",
      "Improve customer service and communication workflows",
    ],
    url: "/partners/liveswitch",
  },
  "polycam": {
    name: "Polycam",
    headline: "Accurate 3D Property Scans for Home Service Contractors",
    description: "Polycam provides advanced 3D scanning and modeling solutions for home service contractors to capture accurate property measurements and documentation.",
    features: [
      "3D scanning for accurate property measurements",
      "LiDAR and photogrammetry capture on mobile devices",
      "Detailed floor plans and property documentation",
      "Share scans with clients and team members instantly",
      "Reduce return visits with accurate first-visit measurements",
    ],
    url: "/partners/polycam",
  },
  "service-crucible": {
    name: "Service Crucible",
    headline: "Business Systems That Run Without Daily Chaos",
    description: "Service Crucible helps HVAC, plumbing, and electrical companies grow, boost profits, and build systems that run without daily chaos. A comprehensive audit and execution system for home service businesses.",
    features: [
      "Business audit to identify growth opportunities",
      "Financial tools and profitability analysis",
      "Operations systems and process documentation",
      "Revenue growth strategies specific to the trades",
      "Execution hub for accountability and implementation",
    ],
    url: "/partners/service-crucible",
  },
  "dataturk": {
    name: "DataTurk",
    headline: "AI Funnel Analytics — From First Call to Closed Job",
    description: "DataTurk provides AI-powered funnel analytics that grades your ServiceTitan performance from call center to close, with actionable insights to boost bookings, conversions, and revenue.",
    features: [
      "Full-funnel analytics from call to closed sale",
      "AI grading of ServiceTitan performance metrics",
      "Booking rate, conversion, and revenue optimization insights",
      "Identify leaks in your sales and service funnel",
      "Actionable weekly recommendations for improvement",
    ],
    url: "/partners/dataturk",
  },
};

/** Static page content registry */
const STATIC_PAGES: Record<string, string> = {
  "/": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;color:#111;margin-bottom:12px;">AI and Automations for ServiceTitan Contractors</h1>
    <p style="font-size:1.2rem;color:#444;margin-bottom:32px;">Grow smarter, automate faster, win more jobs. Join 10,000+ home service contractors mastering ServiceTitan.</p>
    <section style="margin-bottom:40px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What We Offer</h2>
      <ul style="margin:16px 0;padding-left:24px;">
        <li style="margin-bottom:8px;"><a href="/all-access" style="color:#ED254E;">All-Access Pass</a> — Unlimited access to automation courses, AI tools, and premium resources.</li>
        <li style="margin-bottom:8px;"><a href="/pricebook-overhaul" style="color:#ED254E;">Pricebook Overhaul</a> — AI rewrites your ServiceTitan pricebook in homeowner-friendly language. Flat $395, 72-hour delivery.</li>
        <li style="margin-bottom:8px;"><a href="/partners" style="color:#ED254E;">Partners</a> — Vetted tools and services built for ServiceTitan contractors.</li>
        <li style="margin-bottom:8px;"><a href="/courses" style="color:#ED254E;">Courses</a> — Practical hands-on training for automation, dashboards, and AI.</li>
        <li style="margin-bottom:8px;"><a href="/resources" style="color:#ED254E;">Free Resources</a> — Templates, calculators, and guides. No signup required.</li>
        <li style="margin-bottom:8px;"><a href="/podcast" style="color:#ED254E;">Podcast</a> — Hosted by Bill Brown, featuring software founders and contractors.</li>
        <li style="margin-bottom:8px;"><a href="/blog" style="color:#ED254E;">Blog</a> — Expert insights on automation and AI tools for the trades.</li>
      </ul>
    </section>
    <section style="margin-bottom:40px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Join the Community</h2>
      <p>ServiceTitan Hacks is the largest community of ServiceTitan contractors online. Get access to free tools, exclusive training, and a network of operators who share what actually works.</p>
    </section>
  `),

  "/blog": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Hacks Blog</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Contractor insights on ServiceTitan, AI, automation, hiring, and business growth. Written by operators for operators.</p>
    <section>
      <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:16px;">Recent Articles</h2>
      <ul style="padding-left:0;list-style:none;">
        ${Object.entries(BLOG_POSTS).slice(0, 10).map(([slug, post]) => `
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/blog/${slug}" style="color:#ED254E;font-size:1.1rem;font-weight:600;text-decoration:none;">${post.title}</a>
          <p style="color:#555;margin:4px 0 0;">${post.excerpt}</p>
          <span style="color:#888;font-size:0.85rem;">${post.author} &middot; ${post.date} &middot; ${post.category}</span>
        </li>`).join('')}
      </ul>
    </section>
  `),

  "/apps": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Apps &amp; Products for ServiceTitan</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Purpose-built solutions that integrate seamlessly with ServiceTitan. Boost efficiency, close more jobs, and deliver better service.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Featured: ServiceTitan Pricebook Overhaul</h2>
      <p>We rewrite every item in your pricebook so descriptions sound like a homeowner wrote them — not a tech. Done in 72 hours. Flat $395.</p>
      <ul style="margin:12px 0;padding-left:24px;">
        <li>AI rewrites every description in plain English</li>
        <li>Homeowners understand what they're buying</li>
        <li>Higher average ticket value through clearer communication</li>
        <li>Flat $395 — no ongoing fees</li>
      </ul>
      <a href="/pricebook-overhaul" style="color:#ED254E;">Learn more about the Pricebook Overhaul &rarr;</a>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Free Tool: Pricebook Rewriter</h2>
      <p>Pick your trade, paste a description, and AI rewrites it in homeowner language. Takes 10 seconds. No signup, no credit card.</p>
      <a href="/pricebook-overhaul-tool" style="color:#ED254E;">Try the free pricebook tool &rarr;</a>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">Need Something Custom?</h2>
      <p>We build tailored automations and integrations for ServiceTitan. Zapier, Make.com, Google Sheets, AI-powered workflows — done for you.</p>
      <a href="/servicetitan-automation-services" style="color:#ED254E;">Explore automation services &rarr;</a>
    </section>
  `),

  "/courses": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Hacks Courses</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Learn to automate, optimize, and scale your home service business with practical, hands-on courses.</p>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">Course Catalog</h2>
      <ul style="padding-left:0;list-style:none;">
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/company-app-course" style="color:#ED254E;font-weight:600;">Create Your Own Company App with Jotform</a> — $97
          <p style="color:#555;margin:4px 0 0;">Build a custom mobile app for your ServiceTitan team without code.</p>
        </li>
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/dashboard-course" style="color:#ED254E;font-weight:600;">DIY ServiceTitan TV Dashboard</a> — $97
          <p style="color:#555;margin:4px 0 0;">Data drives revenue. Learn to build dashboards that tell you exactly how your business performs.</p>
        </li>
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/make-integration-course" style="color:#ED254E;font-weight:600;">Integrate ServiceTitan with Make.com</a> — $69
          <p style="color:#555;margin:4px 0 0;">Master Make.com to build powerful ServiceTitan automations and connect your entire tech stack.</p>
        </li>
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/zapier-integration-course" style="color:#ED254E;font-weight:600;">Connect ServiceTitan to Zapier</a> — Free
          <p style="color:#555;margin:4px 0 0;">Connect ServiceTitan to 5,000+ apps. Automate workflows and sync data effortlessly.</p>
        </li>
        <li style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;">
          <a href="/fix-ugly-forms-course" style="color:#ED254E;font-weight:600;">Fix Ugly Forms: Auto-Clean Job Notes with AI</a> — $49
          <p style="color:#555;margin:4px 0 0;">Ugly forms lose customers. Learn to design forms that convert leads into booked jobs.</p>
        </li>
        <li style="margin-bottom:20px;">
          <a href="/job-summary-course" style="color:#ED254E;font-weight:600;">Automate Job Summaries with AI in ServiceTitan</a> — $39
          <p style="color:#555;margin:4px 0 0;">Use AI to automatically clean and format job summaries, saving technician time.</p>
        </li>
      </ul>
    </section>
    <section style="margin-top:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Unlimited Access</h2>
      <p>Get every course plus exclusive live Q&amp;A sessions with the All-Access Pass.</p>
      <a href="/all-access" style="color:#ED254E;">Get the All-Access Pass &rarr;</a>
    </section>
  `),

  "/resources": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Free ServiceTitan Resources</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Free tools, templates, and guides tailored for ServiceTitan users. No strings attached.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Calculators</h2>
      <ul style="padding-left:0;list-style:none;">
        <li style="margin-bottom:12px;"><a href="/hiring-roi-calculator" style="color:#ED254E;font-weight:600;">Hiring ROI Calculator</a> — Calculate the true cost of leaving a technician role unfilled.</li>
        <li style="margin-bottom:12px;"><a href="/smartac-roi-calculator" style="color:#ED254E;font-weight:600;">SmartAC ROI Calculator</a> — Estimate truck roll savings and membership revenue growth.</li>
        <li style="margin-bottom:12px;"><a href="/truck-roll-calculator" style="color:#ED254E;font-weight:600;">Cost Per Truck Roll Calculator</a> — Know the true cost of every dispatch.</li>
        <li style="margin-bottom:12px;"><a href="/wink-roi-calculator" style="color:#ED254E;font-weight:600;">Wink ROI Calculator</a> — Calculate invoicing automation savings.</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Digital Downloads</h2>
      <ul style="padding-left:0;list-style:none;">
        <li style="margin-bottom:12px;"><a href="/pricing-objections-landing" style="color:#ED254E;font-weight:600;">Master Your Pricing Objections</a> — Scripts for handling price shoppers.</li>
        <li style="margin-bottom:12px;"><a href="/swimlane-charts-landing" style="color:#ED254E;font-weight:600;">Streamline Your Business with Swimlane Charts</a> — Free process mapping templates.</li>
        <li style="margin-bottom:12px;"><a href="/servicetitan-metrics-landing" style="color:#ED254E;font-weight:600;">ServiceTitan Metrics Guide</a> — The KPIs every contractor needs to track.</li>
        <li style="margin-bottom:12px;"><a href="/automation-playbook-landing" style="color:#ED254E;font-weight:600;">Automation Playbook: Zapier + Wink</a> — Proven automation workflows for contractors.</li>
      </ul>
    </section>
  `),

  "/events": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Events &amp; Webinars</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Live training sessions to help you grow your home service business with AI, automation, and proven strategies.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Upcoming Events</h2>
      <ul style="padding-left:0;list-style:none;">
        <li style="margin-bottom:16px;"><a href="/webinars/stop-buying-hours" style="color:#ED254E;font-weight:600;">Stop Buying Hours: How Contractors Are Switching to Performance Pay</a> — Free live webinar on performance-based compensation for home service teams.</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Past Webinar Replays</h2>
      <ul style="padding-left:0;list-style:none;">
        <li style="margin-bottom:12px;"><a href="/webinar/stop-spreadsheet-payroll" style="color:#ED254E;">Stop the Spreadsheet Payroll Nightmare</a> — Replace fragile commission spreadsheets with consistent payroll-ready reports.</li>
        <li style="margin-bottom:12px;"><a href="/webinar/ai-csr" style="color:#ED254E;">How Contractors Are Handling More Calls Without Hiring More CSRs</a> — AI in real service businesses.</li>
        <li style="margin-bottom:12px;"><a href="/webinar/phonetap" style="color:#ED254E;">What Your Missed Calls Are Actually Costing You</a> — PhoneTap live demo and contractor discussion.</li>
        <li style="margin-bottom:12px;"><a href="/webinar/referral-gap" style="color:#ED254E;">The 83% Referral Gap</a> — Why referrals fall through the cracks and what to do about it.</li>
        <li style="margin-bottom:12px;"><a href="/webinar/incentive-plan-problem" style="color:#ED254E;">The Incentive Plan Problem</a> — Technician incentives and performance pay in real contractor businesses.</li>
      </ul>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">Never Miss a Session</h2>
      <p>Join the <a href="https://www.facebook.com/groups/servicetitanhacks" style="color:#ED254E;">ServiceTitan Hacks Facebook Group</a> to get notified about upcoming events or <a href="/contact" style="color:#ED254E;">contact us</a> directly.</p>
    </section>
  `),

  "/podcast": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">The ServiceTitan Hacks Podcast</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Candid conversations on innovation in the trades. Hosted by Bill Brown. Hear from contractors and founders changing the game.</p>
    <section style="margin-bottom:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">About the Podcast</h2>
      <p>ServiceTitan Hacks is the podcast for contractors who want to grow smarter. Each episode features conversations with software founders, industry operators, and contractors who have used technology to transform their businesses.</p>
      <p style="margin-top:12px;">Topics include: ServiceTitan tips, AI and automation, hiring and retention, performance pay, operational efficiency, and the future of the home service industry.</p>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">Listen &amp; Subscribe</h2>
      <p>New episodes drop regularly. Subscribe on your favorite podcast platform to stay up to date.</p>
    </section>
  `),

  "/partners": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Our Trusted Technology Partners</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Best-in-class integration partners vetted to help you automate and optimize your ServiceTitan workflow.</p>
    <section>
      <ul style="padding-left:0;list-style:none;">
        ${Object.entries(PARTNERS).map(([slug, p]) => `
        <li style="margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #eee;">
          <a href="/partners/${slug}" style="color:#ED254E;font-size:1.1rem;font-weight:600;">${p.name}</a>
          <p style="color:#555;margin:4px 0 0;">${p.description}</p>
        </li>`).join('')}
      </ul>
    </section>
  `),

  "/about": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">About ServiceTitan Hacks</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">We help contractors scale by mastering the tools they already use.</p>
    <section style="margin-bottom:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Our Mission</h2>
      <p>ServiceTitan Hacks exists to give home service contractors the tools, knowledge, and community they need to compete with the biggest players in their market — using the technology they already pay for.</p>
    </section>
    <section style="margin-bottom:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Who We Are</h2>
      <p>Founded by Bill Brown, a former Inc. 5000 HVAC company owner who spent years mastering ServiceTitan and helping other contractors do the same. Today, ServiceTitan Hacks is the largest verified community of ServiceTitan users — with over 10,000 contractors actively sharing what works.</p>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">What We Build</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Free tools and calculators</li>
        <li>Step-by-step automation courses</li>
        <li>Vetted partner integrations</li>
        <li>Live webinars and training events</li>
        <li>The ServiceTitan Hacks Podcast</li>
      </ul>
    </section>
  `),

  "/contact": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Contact ServiceTitan Hacks</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Have a question about our courses, automation tools, or partnership opportunities? Reach out to our team.</p>
    <section>
      <p>Email: <a href="mailto:bill@st-hacks.com" style="color:#ED254E;">bill@st-hacks.com</a></p>
      <p style="margin-top:16px;">Or use the contact form on this page to send us a message directly.</p>
    </section>
  `),

  "/servicetitan-automation-services": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Custom ServiceTitan Automations for Your Shop</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Done-for-you Zapier, Make.com, Google Sheets, Forms, and AI automations built specifically for ServiceTitan contractors.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What We Do</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Custom Zapier workflows connecting ServiceTitan to your CRM, accounting, and marketing tools</li>
        <li>Make.com automations for complex multi-step workflows</li>
        <li>AI-powered job summary cleaning and documentation</li>
        <li>Custom Google Sheets dashboards and reporting tools</li>
        <li>ServiceTitan form optimization and automation</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Who This Is For</h2>
      <p>HVAC, plumbing, and electrical contractors running ServiceTitan who want to eliminate manual data entry, automate follow-ups, and build better reporting — without hiring a developer.</p>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">How It Works</h2>
      <ol style="padding-left:24px;margin-top:8px;">
        <li>Book a free strategy call</li>
        <li>We map your workflow and identify automation opportunities</li>
        <li>We build and test the automations in your account</li>
        <li>You get a fully documented, working system</li>
      </ol>
    </section>
  `),

  "/pricebook-overhaul": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Pricebook Overhaul</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">We AI-rewrite every item in your ServiceTitan pricebook so every word sounds like a homeowner wrote it, not a tech. Flat $395. 72-hour delivery.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Included</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>AI rewrite of every pricebook description in plain English</li>
        <li>Homeowner-friendly language that builds trust and increases acceptance</li>
        <li>72-hour turnaround from upload to delivery</li>
        <li>Flat $395 — no hidden fees, no ongoing subscription</li>
        <li>Ready to import back into ServiceTitan</li>
      </ul>
    </section>
    <section>
      <h2 style="font-size:1.5rem;font-weight:700;">Why It Matters</h2>
      <p>Most pricebooks read like a parts list written for other technicians. When a homeowner sees "R410A refrigerant charge — 1 lb," they have no idea what they're paying for. We translate every description into language that explains value, builds confidence, and gets more approvals.</p>
    </section>
  `),

  "/all-access": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Get the All-Access Pass</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Unlock every course, every tool, and exclusive live Q&amp;A sessions. The ultimate membership for ServiceTitan power users.</p>
    <section style="margin-bottom:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Included</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>All current and future ServiceTitan Hacks courses</li>
        <li>Exclusive live Q&amp;A sessions with Bill Brown</li>
        <li>Priority access to new tools and resources</li>
        <li>Community access and peer networking</li>
      </ul>
    </section>
  `),

  "/sponsor": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Partnership — ServiceTitan Hacks</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Direct partnership access to 10,800+ ServiceTitan contractors. Webinars, podcast, email, and retargeting across the largest verified ServiceTitan community.</p>
    <section style="margin-bottom:32px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Partnership Opportunities</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Webinar sponsorships and co-hosted events</li>
        <li>Podcast episode sponsorships</li>
        <li>Email newsletter placements to 10,000+ contractors</li>
        <li>Partner page listing and content integration</li>
        <li>Retargeting audiences of verified ServiceTitan users</li>
      </ul>
    </section>
  `),

  // ─── Calculators ─────────────────────────────────────────────────────────

  "/smartac-roi-calculator": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">SmartAC ROI Calculator for HVAC Contractors</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Calculate potential profit growth, truck roll savings, and membership revenue improvements using SmartAC for your HVAC business. Free ROI tool.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What the Calculator Measures</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Annual truck roll cost savings from remote HVAC monitoring</li>
        <li>Membership revenue growth from SmartAC-enabled retention</li>
        <li>Profit improvement from proactive service vs. reactive repairs</li>
        <li>5-year ROI projection for your specific business size</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">How SmartAC Works</h2>
      <p>SmartAC installs smart sensors on HVAC equipment that monitor system health 24/7. When an issue is detected, the contractor is alerted before the homeowner calls — reducing emergency truck rolls and increasing membership value.</p>
    </section>
    <section>
      <p><a href="/partners/smartac" style="color:#ED254E;">Learn more about SmartAC &rarr;</a></p>
    </section>
  `),

  "/wink-roi-calculator": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Wink Toolbox ROI Calculator — AI Invoicing Savings</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Calculate how much time and money you can save by automating your invoicing with Wink Toolbox. Get instant ROI analysis with time savings, mistake reduction, and 5-year projections.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What the Calculator Shows</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Hours saved per month on manual invoicing and data entry</li>
        <li>Dollar value of time recovered for billable work</li>
        <li>Error reduction from automated workflows</li>
        <li>5-year cumulative savings projection</li>
      </ul>
    </section>
    <section>
      <p><a href="/partners/wink-toolbox" style="color:#ED254E;">Learn more about Wink Toolbox &rarr;</a></p>
    </section>
  `),

  "/hiring-roi-calculator": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Hiring ROI Calculator for Home Service Contractors</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Calculate the true cost of leaving a technician role unfilled. Estimate lost revenue, hidden labor costs, and ramp-up drag with this free calculator.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What Gets Calculated</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Lost revenue from unfilled technician capacity</li>
        <li>Overtime costs and burnout risk for existing team</li>
        <li>Ramp-up time and productivity drag for new hires</li>
        <li>True cost-per-day of delayed hiring decisions</li>
      </ul>
    </section>
    <section>
      <p><a href="/resources" style="color:#ED254E;">See all free resources &rarr;</a></p>
    </section>
  `),

  "/truck-roll-calculator": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">HVAC Truck Roll Cost Calculator</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Calculate the true cost of every truck roll for your HVAC business. Factor in labor, overhead, vehicle costs, and opportunity costs.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Why This Matters</h2>
      <p>Most HVAC contractors underestimate the true cost of a truck roll by 40–60%. When you include fully-loaded labor, fuel, vehicle depreciation, dispatch time, and lost opportunity, each unnecessary roll costs far more than it appears on paper.</p>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Included in the Calculation</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Fully-loaded technician labor cost per hour</li>
        <li>Vehicle overhead (fuel, maintenance, insurance, depreciation)</li>
        <li>Dispatch and administrative overhead</li>
        <li>Opportunity cost of unavailable capacity</li>
      </ul>
    </section>
    <section>
      <p><a href="/smartac-roi-calculator" style="color:#ED254E;">See the SmartAC ROI Calculator to reduce truck rolls &rarr;</a></p>
    </section>
  `),

  "/wink-roi-saver": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Wink ROI Saver Calculator</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">See how much your home service company can save by automating back-office tasks with Wink Toolbox. Calculate your ROI in seconds.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Automation Areas Covered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Invoice processing and accounts receivable automation</li>
        <li>Reporting and dashboard automation</li>
        <li>Data sync between ServiceTitan and other tools</li>
        <li>Time savings across office staff roles</li>
      </ul>
    </section>
    <section>
      <p><a href="/partners/wink-toolbox" style="color:#ED254E;">Learn more about Wink Toolbox &rarr;</a></p>
    </section>
  `),

  // ─── Pricebook ────────────────────────────────────────────────────────────

  "/pricebook-overhaul-tool": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Free Tool: Rewrite Your Pricebook in Homeowner Language</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Pick your trade, pick a sample or paste your own, and AI rewrites your ServiceTitan pricebook description in homeowner language. Takes 10 seconds. No signup, no credit card.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">How It Works</h2>
      <ol style="padding-left:24px;margin-top:8px;">
        <li>Select your trade (HVAC, plumbing, electrical)</li>
        <li>Choose a sample description or paste your own</li>
        <li>AI rewrites it in plain, homeowner-friendly language</li>
        <li>Copy and paste directly into ServiceTitan</li>
      </ol>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Why Homeowner Language Matters</h2>
      <p>Most pricebook descriptions are written for technicians, not homeowners. When customers don't understand what they're buying, they hesitate, object on price, or decline altogether. Clear descriptions build trust and increase acceptance rates.</p>
    </section>
    <section>
      <p><a href="/pricebook-overhaul" style="color:#ED254E;">Get your entire pricebook rewritten for $395 &rarr;</a></p>
    </section>
  `),

  "/pricebook-optimizer": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">The Pricebook Optimizer Tool</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Fix your margins and save time. The easiest way to clean up and optimize your ServiceTitan pricebook.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What It Does</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Identifies pricebook items with thin or incorrect margins</li>
        <li>AI-powered description improvement suggestions</li>
        <li>Flags duplicates and inconsistent naming conventions</li>
        <li>Exportable report for your ServiceTitan admin</li>
      </ul>
    </section>
    <section>
      <p><a href="/pricebook-overhaul" style="color:#ED254E;">See the full Pricebook Overhaul service &rarr;</a></p>
    </section>
  `),

  "/pricebook-overhaul/security": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Pricebook Overhaul: Security and Privacy</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">How we protect your ServiceTitan pricebook during the overhaul process. Encryption, access controls, AI data policy, file retention, and NDA availability.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">How We Protect Your Data</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Encrypted file transfer and storage throughout the process</li>
        <li>Pricebook files are deleted after delivery — not retained</li>
        <li>AI processing uses OpenAI with no training on your data</li>
        <li>NDA available upon request for enterprise customers</li>
        <li>Access limited to the team member processing your file</li>
      </ul>
    </section>
    <section>
      <p><a href="/pricebook-overhaul" style="color:#ED254E;">&larr; Back to Pricebook Overhaul</a></p>
    </section>
  `),

  // ─── Webinar Pages ────────────────────────────────────────────────────────

  "/webinar/stop-spreadsheet-payroll": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Stop the Spreadsheet Payroll Nightmare</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>ServiceTitan Hacks Webinar</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">Leave with a clear, auditable way to replace fragile commission spreadsheets with consistent rules and payroll-ready reports — without ripping out your current payroll system.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Learn</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Why spreadsheet-based commission tracking breaks down at scale</li>
        <li>How to design consistent, auditable incentive rules</li>
        <li>Tools that generate payroll-ready reports from ServiceTitan data</li>
        <li>How to transition your team without disruption</li>
      </ul>
    </section>
    <section>
      <p>Featuring <a href="/partners/sharewillow" style="color:#ED254E;">ShareWillow</a> — performance pay software built for ServiceTitan contractors.</p>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  "/webinar/ai-csr": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">How Contractors Are Handling More Calls Without Hiring More CSRs</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>ServiceTitan Hacks Webinar</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses. Free live webinar.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Topics Covered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>How AI CSR tools handle overflow and after-hours calls</li>
        <li>Real contractor results from AI-assisted booking</li>
        <li>When AI works — and when to keep a human on the phone</li>
        <li>Cost comparison: AI vs. additional CSR headcount</li>
      </ul>
    </section>
    <section>
      <p>Featuring <a href="/partners/broccoli-ai" style="color:#ED254E;">Broccoli AI</a> — AI voice agents for ServiceTitan contractors.</p>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  "/webinar/phonetap": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">What Your Missed Calls Are Actually Costing You</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>PhoneTap Live Webinar</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">Most contractors track booked jobs. Very few know how much revenue they lose from inbound calls that never turn into appointments.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Discover</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>How to calculate true missed revenue from unbooked calls</li>
        <li>Why call classification in ServiceTitan is often 50–60% accurate</li>
        <li>How AI call intelligence identifies the gaps</li>
        <li>Live PhoneTap demo with real contractor call data</li>
      </ul>
    </section>
    <section>
      <p>Featuring <a href="/partners/phonetap" style="color:#ED254E;">PhoneTap</a> — AI call intelligence for ServiceTitan contractors.</p>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  "/webinar/referral-gap": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">The 83% Referral Gap</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>Free Live Fireside Chat</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">A live conversation with a ServiceTitan contractor about why referrals often fall through the cracks and what contractors can do about it.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Key Questions Answered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Why do 83% of satisfied customers never refer anyone?</li>
        <li>What systems top contractors use to capture referrals systematically</li>
        <li>How to make referral requests feel natural, not pushy</li>
        <li>ServiceTitan workflows that automate referral follow-up</li>
      </ul>
    </section>
    <section>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  "/webinar/incentive-plan-problem": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">The Incentive Plan Problem</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>ServiceTitan Hacks Webinar</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">A practical conversation about technician incentives, performance pay, and what actually works inside a real contractor business.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Covered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Why most incentive plans backfire and what to do instead</li>
        <li>The difference between commission and performance pay</li>
        <li>How to get technician buy-in before rolling out a new plan</li>
        <li>Real examples from contractors who made the switch</li>
      </ul>
    </section>
    <section>
      <p>Related: <a href="/partners/sharewillow" style="color:#ED254E;">ShareWillow performance pay software</a></p>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  "/webinars/stop-buying-hours": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Stop Buying Hours: How Contractors Are Switching to Performance Pay</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>Free Live Webinar</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">How contractors switch to performance pay, sell it to their techs, and what happened when a $5M shop did it. Free live webinar.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Walk Away With</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>A clear framework for transitioning from hourly to performance pay</li>
        <li>Scripts for explaining the change to your technician team</li>
        <li>Real numbers from a $5M contractor who made the switch</li>
        <li>Tools for calculating performance pay tied to ServiceTitan metrics</li>
      </ul>
    </section>
    <section>
      <p><a href="/events" style="color:#ED254E;">See all events and webinars &rarr;</a></p>
    </section>
  `),

  // ─── Course Pages ─────────────────────────────────────────────────────────

  "/dashboard-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Master Your ServiceTitan Dashboard</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Data drives revenue. Learn how to build and read dashboards that actually tell you how your business is performing. $97 one-time.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Learn</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>The 5 dashboard metrics every ServiceTitan owner must track daily</li>
        <li>How to build a TV dashboard for your dispatch board or office</li>
        <li>Why simpler dashboards outperform complex ones</li>
        <li>Step-by-step tutorial for creating your first real-time dashboard</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Who It's For</h2>
      <p>ServiceTitan owners and managers who want to stop guessing and start running their business on real data. No coding required.</p>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a> &nbsp;|&nbsp; <a href="/all-access" style="color:#ED254E;">Get All-Access for unlimited courses &rarr;</a></p>
    </section>
  `),

  "/dashboard-course-landing": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Dashboard Course</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">A DIY course for home service pros who want visibility — without expensive software. Go at your own pace with this step-by-step tutorial.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Inside</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Video tutorials: building dashboards inside ServiceTitan</li>
        <li>The philosophy behind metrics that drive action</li>
        <li>Template library: pre-built views you can use immediately</li>
        <li>Lifetime access — learn on your own schedule</li>
      </ul>
    </section>
    <section>
      <p><a href="/dashboard-course" style="color:#ED254E;">Get the Dashboard Course &rarr;</a></p>
    </section>
  `),

  "/fix-ugly-forms-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Fix Ugly Forms &amp; Book More Jobs</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Ugly forms lose customers. Learn to design professional ServiceTitan forms that convert leads into booked jobs. $49 one-time.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Build</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Customer-facing forms that look professional and build trust</li>
        <li>Job intake forms that capture everything your dispatch team needs</li>
        <li>AI-powered auto-cleaning of messy job notes in ServiceTitan</li>
        <li>Pre/post-job forms that reduce callbacks and disputes</li>
      </ul>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a></p>
    </section>
  `),

  "/company-app-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Company App Course</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Learn how to build custom mobile apps for your team using ServiceTitan's Company App feature. Step-by-step tutorials and best practices. $97 one-time.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Build</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Custom mobile app for your technicians using Jotform</li>
        <li>Inspection checklists, install records, and photo documentation</li>
        <li>Forms that sync data back into ServiceTitan automatically</li>
        <li>Apps your team will actually use — no developer required</li>
      </ul>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a></p>
    </section>
  `),

  "/make-integration-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Make Integration Course for ServiceTitan</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Master Make (formerly Integromat) to build powerful ServiceTitan automations. Connect your tech stack and automate workflows. $69 one-time.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Learn</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Make.com fundamentals for ServiceTitan contractors</li>
        <li>Connecting ServiceTitan to Google Sheets, Slack, email, and more</li>
        <li>Building multi-step automations that run 24/7</li>
        <li>Real workflows used by contractors to save 5–10 hours per week</li>
      </ul>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a></p>
    </section>
  `),

  "/zapier-integration-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Zapier Integration Course for ServiceTitan</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Learn how to connect ServiceTitan with 5,000+ apps using Zapier. Automate workflows, sync data, and save time. Free.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Covered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Setting up Zapier with your ServiceTitan account</li>
        <li>Most valuable Zapier triggers and actions for contractors</li>
        <li>Automating follow-up emails, CRM updates, and reporting</li>
        <li>Free Zap templates you can use immediately</li>
      </ul>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a></p>
    </section>
  `),

  "/job-summary-course": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Job Summary Cleaner Course for ServiceTitan</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Use AI to automatically clean and format job summaries in ServiceTitan. Improve documentation quality and save technician time. $39 one-time.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">The Problem It Solves</h2>
      <p>Messy job notes create problems downstream — bad invoices, warranty disputes, and customer complaints. This course shows you how to use AI to clean up job summaries automatically, so your records are always clear and professional.</p>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What You'll Build</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Automated workflow that cleans job notes as technicians submit them</li>
        <li>AI prompts tuned for HVAC, plumbing, and electrical documentation</li>
        <li>Integration with ServiceTitan via Zapier or Make.com</li>
      </ul>
    </section>
    <section>
      <p><a href="/courses" style="color:#ED254E;">&larr; See all courses</a></p>
    </section>
  `),

  // ─── Landing Pages ────────────────────────────────────────────────────────

  "/automation-playbook-landing": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Automation Playbook for HVAC and ServiceTitan</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Download the complete automation playbook with proven workflows, templates, and strategies for ServiceTitan contractors.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">What's Inside the Playbook</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Step-by-step automation workflows for Zapier and Make.com</li>
        <li>Ready-to-use templates for follow-up, invoicing, and reporting</li>
        <li>The 10 most impactful automations for HVAC contractors</li>
        <li>Integration maps showing how your tools should connect</li>
      </ul>
    </section>
    <section>
      <p><a href="/resources" style="color:#ED254E;">&larr; See all free resources</a></p>
    </section>
  `),

  "/servicetitan-metrics-landing": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Key ServiceTitan Metrics Every Contractor Needs</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Learn which KPIs and metrics to track in ServiceTitan to measure business health, technician performance, and customer satisfaction.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">The Metrics That Actually Matter</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Booking rate — are you converting calls to appointments?</li>
        <li>Average ticket value — are technicians capturing full value?</li>
        <li>Technician efficiency — billable hours vs. total hours</li>
        <li>Membership retention rate — are customers renewing?</li>
        <li>Estimate conversion rate — are unsold estimates followed up?</li>
      </ul>
    </section>
    <section>
      <p><a href="/blog/servicetitan-dashboard-metrics" style="color:#ED254E;">Read the full article on ServiceTitan metrics &rarr;</a></p>
    </section>
  `),

  "/swimlane-charts-landing": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Swimlane Chart Templates for Contractors</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Download free swimlane chart templates to map out business processes, workflows, and customer journeys for your home service company.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Why Swimlane Charts Help Contractors</h2>
      <p>Swimlane charts show who does what and when in a process — making it easy to spot bottlenecks, duplicated effort, and handoff failures. They're especially powerful for documenting customer journeys and training new team members.</p>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Templates Included</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Customer service call-to-dispatch swimlane</li>
        <li>Estimate and close workflow map</li>
        <li>Membership enrollment process diagram</li>
        <li>New technician onboarding swimlane</li>
      </ul>
    </section>
    <section>
      <p><a href="/resources" style="color:#ED254E;">&larr; See all free resources</a></p>
    </section>
  `),

  "/pricing-objections-landing": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">HVAC Pricing Objections Script and Guide</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Get the complete script for handling pricing objections. Turn price shoppers into paying customers with proven techniques.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Common Objections Covered</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>"That's more than I expected" — reframe value without discounting</li>
        <li>"I need to get another quote" — how to handle without desperation</li>
        <li>"Can you do any better on the price?" — holding your rate confidently</li>
        <li>"I found it cheaper online" — competing on value, not price</li>
      </ul>
    </section>
    <section>
      <p><a href="/resources" style="color:#ED254E;">&larr; See all free resources</a></p>
    </section>
  `),

  // ─── Other Public Pages ───────────────────────────────────────────────────

  "/purchasing-platform": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Join the HVAC Equipment Purchasing Platform</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Stop overpaying for equipment. Access big-player pricing on HVAC and plumbing supplies through our platform.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">How the Purchasing Platform Works</h2>
      <p>We aggregate purchasing power across thousands of ServiceTitan contractors to negotiate pricing that small and mid-size shops can't get on their own. Members get access to wholesale equipment pricing that was previously only available to large national companies.</p>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Who It's For</h2>
      <p>HVAC and plumbing contractors who are tired of paying retail prices for equipment they buy every week. Members of the ServiceTitan Hacks Facebook Group get access first.</p>
    </section>
    <section>
      <p><a href="/contact" style="color:#ED254E;">Contact us to learn more &rarr;</a></p>
    </section>
  `),

  "/bill": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Meet Bill Brown</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:8px;"><strong>Founder of ServiceTitan Hacks</strong></p>
    <p style="font-size:1rem;color:#555;margin-bottom:32px;">Bill Brown grew an Inc. 5000 HVAC company, mastered ServiceTitan inside and out, and built the largest community of ServiceTitan contractors. Learn his story.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Background</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Former owner of an Inc. 5000 ranked HVAC company</li>
        <li>25+ years in the home service industry</li>
        <li>Deep ServiceTitan expertise — implemented and optimized for hundreds of contractors</li>
        <li>Host of the ServiceTitan Hacks Podcast</li>
        <li>Founder of the largest verified ServiceTitan contractor community (10,000+ members)</li>
      </ul>
    </section>
    <section>
      <p><a href="/about" style="color:#ED254E;">About ServiceTitan Hacks &rarr;</a> &nbsp;|&nbsp; <a href="/podcast" style="color:#ED254E;">Listen to the Podcast &rarr;</a></p>
    </section>
  `),

  "/sponsors": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">Sponsor ServiceTitan Hacks</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Reach over 10,000 verified ServiceTitan contractors. Explore webinar, podcast, email, and retargeting sponsorship opportunities.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">The Audience</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>10,000+ verified ServiceTitan users</li>
        <li>HVAC, plumbing, and electrical company owners and operators</li>
        <li>Decision-makers who buy technology, equipment, and services</li>
        <li>Engaged community with active Facebook group, email list, and podcast</li>
      </ul>
    </section>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Sponsorship Options</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Live webinar co-hosting and sponsorship</li>
        <li>Podcast episode sponsorship</li>
        <li>Email newsletter placement</li>
        <li>Partner page feature and content integration</li>
        <li>Retargeting audiences of verified ServiceTitan contractors</li>
      </ul>
    </section>
    <section>
      <p><a href="/contact" style="color:#ED254E;">Contact us about partnership &rarr;</a></p>
    </section>
  `),

  "/giveaway": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Hacks Newsletter Giveaway</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Sign up for the newsletter and help unlock four major prize tiers. Join now and be part of the momentum.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Prize Tiers</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>Tier 1: AirPods 4</li>
        <li>Tier 2: YETI Cooler</li>
        <li>Tier 3: Solo Stove Fire Pit</li>
        <li>Tier 4: MacBook Air</li>
      </ul>
      <p style="margin-top:12px;">One winner per unlocked tier. The more subscribers, the more tiers unlock.</p>
    </section>
    <section>
      <p><a href="/" style="color:#ED254E;">Join the ServiceTitan Hacks community &rarr;</a></p>
    </section>
  `),

  "/servicetitan-automation-services/zapier": wrap(`
    <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">ServiceTitan Zapier Automations</h1>
    <p style="font-size:1.1rem;color:#444;margin-bottom:32px;">Connect ServiceTitan to 5,000+ apps with custom Zapier automations. Eliminate data re-entry, auto-trigger follow-ups, and sync your tools — done for you.</p>
    <section style="margin-bottom:36px;">
      <h2 style="font-size:1.5rem;font-weight:700;">Popular Zapier Automations for ServiceTitan</h2>
      <ul style="padding-left:24px;margin-top:8px;">
        <li>ServiceTitan → CRM sync (HubSpot, Salesforce, etc.)</li>
        <li>New job created → send Slack notification to dispatcher</li>
        <li>Invoice sent → trigger follow-up sequence in email platform</li>
        <li>Membership expired → alert CSR team for renewal call</li>
        <li>Job completed → send review request to customer</li>
      </ul>
    </section>
    <section>
      <p><a href="/servicetitan-automation-services" style="color:#ED254E;">&larr; All ServiceTitan Automation Services</a></p>
    </section>
  `),
};

function buildBlogPostHtml(slug: string): string | null {
  const post = BLOG_POSTS[slug];
  if (!post) return null;

  const sectionsHtml = post.sections.map(s =>
    `<h2 style="font-size:1.4rem;font-weight:700;margin-top:32px;margin-bottom:8px;">${s}</h2>`
  ).join('\n');

  return wrap(`
    <article>
      <p style="margin-bottom:8px;"><a href="/blog" style="color:#ED254E;text-decoration:none;">&larr; Back to Blog</a></p>
      <span style="display:inline-block;background:#ED254E;color:#fff;font-size:0.75rem;font-weight:700;padding:2px 10px;border-radius:4px;margin-bottom:12px;">${post.category}</span>
      <h1 style="font-size:2rem;font-weight:800;line-height:1.3;margin-bottom:12px;">${post.title}</h1>
      <p style="color:#666;margin-bottom:24px;">${post.author} &middot; ${post.date} &middot; ${post.readTime || '5 min read'}</p>
      <p style="font-size:1.15rem;font-style:italic;color:#333;margin-bottom:32px;padding-left:16px;border-left:4px solid #ED254E;">${post.excerpt}</p>
      ${sectionsHtml}
      <hr style="margin:40px 0;border:none;border-top:1px solid #eee;" />
      <section style="background:#f8f8f8;padding:24px;border-radius:8px;">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">Want more insights like this?</h2>
        <p>Join 10,000+ ServiceTitan contractors at <a href="/" style="color:#ED254E;">ServiceTitan Hacks</a>. Get free tools, courses, and weekly tips.</p>
      </section>
    </article>
  `);
}

function buildPartnerHtml(slug: string): string | null {
  const partner = PARTNERS[slug];
  if (!partner) return null;

  const featuresHtml = partner.features.map(f =>
    `<li style="margin-bottom:10px;padding-left:4px;">${f}</li>`
  ).join('\n');

  return wrap(`
    <article>
      <p style="margin-bottom:8px;"><a href="/partners" style="color:#ED254E;text-decoration:none;">&larr; Back to Partners</a></p>
      <h1 style="font-size:2rem;font-weight:800;line-height:1.3;margin-bottom:8px;">${partner.name}</h1>
      <p style="font-size:1.2rem;color:#444;font-weight:600;margin-bottom:16px;">${partner.headline}</p>
      <p style="font-size:1rem;color:#555;margin-bottom:32px;">${partner.description}</p>
      <section style="margin-bottom:32px;">
        <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:12px;">Key Features</h2>
        <ul style="padding-left:24px;">
          ${featuresHtml}
        </ul>
      </section>
      <section style="background:#f8f8f8;padding:24px;border-radius:8px;">
        <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">Vetted by ServiceTitan Hacks</h2>
        <p>This partner has been reviewed and vetted by our team. <a href="/partners" style="color:#ED254E;">See all partners &rarr;</a></p>
      </section>
    </article>
  `);
}

/**
 * Returns a full HTML body (header + content + footer) for the given route path,
 * or null if no server-side content is registered for that path.
 */
export function getPageBodyHtml(reqPath: string): string | null {
  const clean = reqPath.split('?')[0].replace(/\/$/, '') || '/';

  // Static pages
  if (STATIC_PAGES[clean]) return STATIC_PAGES[clean];

  // Blog posts
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return buildBlogPostHtml(blogMatch[1]);

  // Partner pages
  const partnerMatch = clean.match(/^\/partners\/([^/]+)$/);
  if (partnerMatch && !clean.endsWith('/book-demo')) return buildPartnerHtml(partnerMatch[1]);

  return null;
}
