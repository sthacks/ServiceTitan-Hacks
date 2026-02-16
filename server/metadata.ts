// Metadata configuration for server-side rendering of OG tags
export interface PageMetadata {
  title: string;
  description: string;
  ogImage: string;
  ogType?: string;
}

export const metadata: Record<string, PageMetadata> = {
  // Blog Posts
  "/blog/diy-ai-sales-coach": {
    title: "How I Built a DIY 'Sales Coach' for $25/Month Using AI | ServiceTitan Hacks Blog",
    description: "I'll be honest: I am not a good salesperson. But I'm getting better—and the only reason is because I finally learned how to study my own mistakes using AI. Here's my $25/month hack.",
    ogImage: "https://servicetitanhacks.com/og-ai-sales-coach.png",
    ogType: "article",
  },
  "/blog/4-ways-top-companies-control-schedule": {
    title: "4 Surprising Ways Top Home Service Companies Take Control of Their Schedule | ServiceTitan Hacks",
    description: "Most companies think they have a scheduling problem. What they really have is a visibility problem. Learn four real strategies top operators use to take control of capacity.",
    ogImage: "https://servicetitanhacks.com/3-day-call-board-blog.png",
    ogType: "article",
  },
  "/blog/stop-treating-dashboard-like-spreadsheet": {
    title: "Dashboard Philosophy for Contractors: Why Simple Beats Complex | ServiceTitan Hacks",
    description: "Your call center dashboard should be as simple as your truck's gas gauge. Learn the 5-second rule for contractor dashboards and why I built the Titan Call Board to replace noisy spreadsheets.",
    ogImage: "https://servicetitanhacks.com/titan-dashboards-blog.png",
    ogType: "article",
  },
  "/blog/selling-hvac-systems-to-millennials-online-pricing": {
    title: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional | ServiceTitan Hacks Blog",
    description: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory if you want to capture the next decade of HVAC replacement business.",
    ogImage: "https://servicetitanhacks.com/og-millennials-blog.png",
    ogType: "article",
  },
  "/blog/how-to-sell-saas-to-home-service-contractors": {
    title: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors | ServiceTitan Hacks Blog",
    description: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company and implementing dozens of software solutions.",
    ogImage: "https://servicetitanhacks.com/og-saas-blog.png",
    ogType: "article",
  },
  "/blog/stop-selling-other-peoples-equipment-build-your-brand": {
    title: "Stop Selling Their Brand. Build Yours.",
    description: "Why are you paying to advertise for manufacturers? Learn the strategy behind private labeling your equipment.",
    ogImage: "https://servicetitanhacks.com/og-stop-selling-equipment.png",
    ogType: "article",
  },
  "/blog/dmaic-process-improvement-framework": {
    title: "The DMAIC Framework for Contractors",
    description: "Define. Measure. Analyze. Improve. Control. A proven framework to fix broken processes in your HVAC business.",
    ogImage: "https://servicetitanhacks.com/og-dmaic-methodology-blog.png",
    ogType: "article",
  },
  "/blog/should-i-switch-to-servicetitan": {
    title: "Should You Switch to ServiceTitan? (Honest Review)",
    description: "Thinking about taking the plunge? We break down the real pros, cons, and ROI of switching to ServiceTitan.",
    ogImage: "https://servicetitanhacks.com/og-should-i-switch.png",
    ogType: "article",
  },
  "/blog/ai-automation-contractors-where-to-start": {
    title: "AI for Contractors: Where to Start?",
    description: "Overwhelmed by AI buzz? Here are the practical, first steps to actually using automation in your service business.",
    ogImage: "https://servicetitanhacks.com/og-ai-automation.png",
    ogType: "article",
  },
  "/blog/double-booking-rate-better-forms": {
    title: "Double Your Booking Rate with Better Forms",
    description: "Your intake forms might be killing your conversion rate. See how small tweaks can lead to massive booking improvements.",
    ogImage: "https://servicetitanhacks.com/og-double-booking.png",
    ogType: "article",
  },
  "/blog/servicetitan-dashboard-metrics": {
    title: "5 ServiceTitan Metrics You Can't Ignore",
    description: "Are you tracking the right numbers? Here are the essential dashboard metrics every owner needs to watch daily.",
    ogImage: "https://servicetitanhacks.com/og-dashboard-metrics.png",
    ogType: "article",
  },
  "/blog/ultimate-guide-automating-follow-up-calls": {
    title: "The Ultimate Guide to Automating Follow-Ups",
    description: "The money is in the follow-up. Learn how to automate your calls so no unsold estimate ever slips through the cracks.",
    ogImage: "https://servicetitanhacks.com/og-automating-followups.png",
    ogType: "article",
  },
  "/blog/top-servicetitan-integrations-2025": {
    title: "Top ServiceTitan Integrations for 2025",
    description: "Upgrade your tech stack. We reviewed the top apps and integrations you need to be using this year.",
    ogImage: "https://servicetitanhacks.com/og-top-integrations-2025.png",
    ogType: "article",
  },
  "/blog/convert-more-leads-better-website": {
    title: "How to Convert More Leads with Your Website",
    description: "Is your website just a brochure or a lead machine? Simple changes to turn more visitors into booked ServiceTitan jobs.",
    ogImage: "https://servicetitanhacks.com/og-convert-leads-website.png",
    ogType: "article",
  },
  
  // Main Pages
  "/about": {
    title: "About Us | The Mission Behind ServiceTitan Hacks",
    description: "We help contractors scale by mastering the tools they already use. Learn about our story and mission to revolutionize the trades.",
    ogImage: "https://servicetitanhacks.com/og-about.png",
  },
  "/contact": {
    title: "Contact ServiceTitan Hacks",
    description: "Have a question about our courses or automation tools? Let's connect. Reach out to our team today.",
    ogImage: "https://servicetitanhacks.com/og-contact.png",
  },
  "/purchasing-platform": {
    title: "Join the HVAC Equipment Purchasing Platform",
    description: "Stop overpaying for equipment. Access big-player pricing on HVAC and plumbing supplies through our platform.",
    ogImage: "https://servicetitanhacks.com/og-purchasing-platform.png",
  },
  "/apps": {
    title: "Essential Tools for ServiceTitan Users",
    description: "Don't just use ServiceTitan—supercharge it. Explore our curated list of apps and automations designed for contractors.",
    ogImage: "https://servicetitanhacks.com/og-tools.png",
  },
  "/courses": {
    title: "ServiceTitan Automation Courses",
    description: "From dashboards to forms—master the technical side of your business with our step-by-step video training courses.",
    ogImage: "https://servicetitanhacks.com/og-courses.png",
  },
  "/resources": {
    title: "Free Resources & Templates for Contractors",
    description: "Download free calculators, SOPs, and guides to help you run a better service business. No strings attached.",
    ogImage: "https://servicetitanhacks.com/og-resources.png",
  },
  "/podcast": {
    title: "The ServiceTitan Hacks Podcast",
    description: "Candid conversations on innovation in the trades. Hear from contractors and founders changing the game.",
    ogImage: "https://servicetitanhacks.com/og-podcast.png",
  },
  "/blog": {
    title: "ServiceTitan Hacks Blog | Contractor Insights",
    description: "Your go-to source for ServiceTitan tips, AI strategies, and growth hacks. Read the latest from industry experts.",
    ogImage: "https://servicetitanhacks.com/og-blog.png",
  },
  "/partners": {
    title: "Our Trusted Technology Partners",
    description: "Meet the best-in-class integration partners we trust to help you automate and optimize your ServiceTitan workflow.",
    ogImage: "https://servicetitanhacks.com/og-partners.png",
  },
  "/partners/smartac": {
    title: "SmartAC | ServiceTitan Hacks Partner",
    description: "SmartAC provides remote HVAC monitoring that reduces truck rolls and increases membership retention. Comfort without concern.",
    ogImage: "https://servicetitanhacks.com/og-smartac-partner.png",
  },
  "/partners/wink-toolbox": {
    title: "Wink Toolbox | ServiceTitan Hacks Partner",
    description: "Back-office AI automation that delivers immediate, measurable returns. Stop buying hype—start building your profitability engine.",
    ogImage: "https://servicetitanhacks.com/og-wink-partner.png",
  },
  "/partners/contractor-commerce": {
    title: "Contractor Commerce | ServiceTitan Hacks Partner",
    description: "Built by contractors, for contractors. Online HVAC system pricing and sales tools that let homeowners shop on their terms.",
    ogImage: "https://servicetitanhacks.com/og-contractor-commerce-partner.jpg",
  },
  "/all-access": {
    title: "Get the All-Access Pass | Unlimited Growth",
    description: "Unlock every course, every tool, and exclusive live Q&A sessions. The ultimate membership for ServiceTitan power users.",
    ogImage: "https://servicetitanhacks.com/og-all-access.png",
  },
  
  // Tool Pages
  "/pricebook-optimizer": {
    title: "The Pricebook Optimizer Tool",
    description: "Fix your margins and save time. The easiest way to clean up and optimize your ServiceTitan pricebook.",
    ogImage: "https://servicetitanhacks.com/og-pricebook-optimizer.png",
  },
  "/smartac-roi-calculator": {
    title: "SmartAC ROI Calculator for HVAC Contractors",
    description: "Calculate potential profit growth, truck roll savings and membership revenue improvements using SmartAC for your HVAC business. Free ROI tool.",
    ogImage: "https://servicetitanhacks.com/og-smartac-calculator.png",
  },
  "/truck-roll-calculator": {
    title: "HVAC Truck Roll Cost Calculator",
    description: "Calculate the true cost of every truck roll for your HVAC business. Factor in labor, overhead, vehicle costs, and opportunity costs.",
    ogImage: "https://servicetitanhacks.com/og-truck-roll-calculator.png",
  },
  
  // Course Pages
  "/dashboard-course": {
    title: "Master Your ServiceTitan Dashboard",
    description: "Data drives revenue. Learn how to build and read dashboards that actually tell you how your business is performing.",
    ogImage: "https://servicetitanhacks.com/og-dashboard-course.png",
  },
  "/fix-ugly-forms-course": {
    title: "Fix Ugly Forms & Book More Jobs",
    description: "Ugly forms lose customers. Learn to design professional ServiceTitan forms that convert leads into booked jobs.",
    ogImage: "https://servicetitanhacks.com/og-fix-ugly-forms.png",
  },
  "/company-app-course": {
    title: "ServiceTitan Company App Course",
    description: "Learn how to build custom mobile apps for your team using ServiceTitan's Company App feature. Step-by-step tutorials and best practices.",
    ogImage: "https://servicetitanhacks.com/og-company-app-course.png",
  },
  "/make-integration-course": {
    title: "Make Integration Course for ServiceTitan",
    description: "Master Make (formerly Integromat) to build powerful ServiceTitan automations. Connect your tech stack and automate workflows.",
    ogImage: "https://servicetitanhacks.com/og-make-integration-course.png",
  },
  "/zapier-integration-course": {
    title: "Zapier Integration Course for ServiceTitan",
    description: "Learn how to connect ServiceTitan with 5,000+ apps using Zapier. Automate workflows, sync data, and save time.",
    ogImage: "https://servicetitanhacks.com/og-zapier-integration-course.png",
  },
  "/job-summary-course": {
    title: "Job Summary Cleaner Course for ServiceTitan",
    description: "Use AI to automatically clean and format job summaries in ServiceTitan. Improve documentation quality and save technician time.",
    ogImage: "https://servicetitanhacks.com/og-job-summary-course.png",
  },
  
  // Giveaway Page
  "/giveaway": {
    title: "ServiceTitan Hacks Newsletter Giveaway",
    description: "Sign up for the newsletter and help unlock four major prize tiers, including AirPods 4, a YETI cooler, a Solo Stove fire pit, and a MacBook Air. One winner per unlocked tier. Join now and be part of the momentum.",
    ogImage: "https://servicetitanhacks.com/og-giveaway.png",
  },
  
  // Landing Pages
  "/automation-playbook-landing": {
    title: "Automation Playbook for HVAC and ServiceTitan",
    description: "Download the complete automation playbook with proven workflows, templates, and strategies for ServiceTitan contractors.",
    ogImage: "https://servicetitanhacks.com/og-automation-playbook.png",
  },
  "/pricing-objections-landing": {
    title: "HVAC Pricing Objections Script and Guide",
    description: "Get the complete script for handling pricing objections. Turn price shoppers into paying customers with proven techniques.",
    ogImage: "https://servicetitanhacks.com/og-pricing-objections.png",
  },
  "/swimlane-charts-landing": {
    title: "Swimlane Chart Templates for Contractors",
    description: "Download free swimlane chart templates to map out business processes, workflows, and customer journeys for your home service company.",
    ogImage: "https://servicetitanhacks.com/og-swimlane-charts.png",
  },
  "/servicetitan-metrics-landing": {
    title: "Key ServiceTitan Metrics Every Contractor Needs",
    description: "Learn which KPIs and metrics to track in ServiceTitan to measure business health, technician performance, and customer satisfaction.",
    ogImage: "https://servicetitanhacks.com/og-servicetitan-metrics.png",
  },
  "/dashboard-course-landing": {
    title: "ServiceTitan Dashboard Course",
    description: "A DIY course for home service pros who want visibility — without expensive software. Go at your own pace with this step-by-step tutorial.",
    ogImage: "https://servicetitanhacks.com/og-dashboard-course.png",
  },
  
  // Webinar Pages
  "/webinar/membership-retention": {
    title: "Stop Rebuying Your Own Customers | Replay Available | ServiceTitan Hacks",
    description: "Watch the replay: David Hargrove grew from 500 to 2,000 memberships in 18 months at Kali Refrigeration. Learn the CSR scripts, tiered plans with PolyCredits, and SmartAC retention strategies he used.",
    ogImage: "https://servicetitanhacks.com/og-membership-retention-webinar.png",
  },
  "/webinar/price-conversation": {
    title: "The Price Conversation That Happens Before They Call You | ServiceTitan Hacks",
    description: "A candid fireside chat about homeowner psychology, trust, and how contractors can stay in consideration without losing control of the conversation, their margins, or their reputation.",
    ogImage: "https://servicetitanhacks.com/og-upfront-pricing-webinar.png",
  },
  "/webinar/stop-spreadsheet-payroll": {
    title: "Stop the Spreadsheet Payroll Nightmare | ServiceTitan Hacks Webinar",
    description: "Leave with a clear, auditable way to replace fragile commission spreadsheets with consistent rules and payroll-ready reports—without ripping out your current payroll system.",
    ogImage: "https://servicetitanhacks.com/og-spreadsheet-payroll-webinar.png",
  },
  "/webinar/equipment-pricing": {
    title: "How Contractors Buy Equipment Like Private Equity | ServiceTitan Hacks Webinar",
    description: "Learn how private equity gets better equipment pricing and how independent contractors can now access national-level purchasing economics. Free live webinar.",
    ogImage: "https://servicetitanhacks.com/og-equipment-pricing-webinar.png",
  },
  "/webinar/equipment-pricing-replay": {
    title: "How Contractors Buy Equipment Like Private Equity | Replay",
    description: "Watch the replay: Learn how private equity gets better equipment pricing and how independent contractors can now access national-level purchasing economics.",
    ogImage: "https://servicetitanhacks.com/og-equipment-pricing-webinar.png",
  },
  "/webinar/invisible-labor-market": {
    title: "How to Find and Recruit A-Player Technicians Not On Job Boards | ServiceTitan Hacks Webinar",
    description: "Live training showing actionable methods any service business can implement this week to find top technicians outside traditional job boards.",
    ogImage: "https://servicetitanhacks.com/og-recruiting-webinar.png",
  },
  "/webinar/membership-retention-replay": {
    title: "Stop Rebuying Your Own Customers | Replay",
    description: "Watch the replay: Membership retention strategies that keep members renewing, booking, and referring - without rebuilding your ServiceTitan setup.",
    ogImage: "https://servicetitanhacks.com/og-membership-retention-webinar.png",
  },
  "/webinar/recruiting-replay": {
    title: "How to Find and Recruit A-Player Technicians Not On Job Boards | Replay",
    description: "Watch the replay: Actionable methods any service business can implement to find top technicians outside traditional job boards.",
    ogImage: "https://servicetitanhacks.com/og-recruiting-webinar.png",
  },
  
  // Blog Posts - Additional
  "/blog/why-phonetap-exists": {
    title: "Why PhoneTap Exists",
    description: "In 2020, I started running my HVAC company remotely. I had to rely on data. But when my co-founders and I dug into call center metrics, the numbers didn't match reality. Call classification accuracy was only 50 to 60 percent. That's why we built PhoneTap.",
    ogImage: "https://servicetitanhacks.com/og-phonetap-csrs.png",
    ogType: "article",
  },
};

// Get metadata for a given URL path
export function getMetadata(path: string): PageMetadata {
  // Default homepage metadata
  const defaultMetadata: PageMetadata = {
    title: "ServiceTitan Hacks | AI & Automation for Contractors",
    description: "Join the community of contractors mastering ServiceTitan. Get free tools, automation courses, and exclusive resources to grow your business.",
    ogImage: "https://servicetitanhacks.com/og-home.png",
  };

  // Strip query params and trailing slash
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';
  
  return metadata[cleanPath] || defaultMetadata;
}
