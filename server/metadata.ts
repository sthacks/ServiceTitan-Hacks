// Metadata configuration for server-side rendering of OG tags
export interface PageMetadata {
  title: string;
  description: string;
  ogImage: string;
  ogType?: string;
}

export const metadata: Record<string, PageMetadata> = {
  // Blog Posts
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
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead | ServiceTitan Hacks Blog",
    description: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    ogImage: "https://servicetitanhacks.com/og-stop-selling-equipment.png",
    ogType: "article",
  },
  "/blog/dmaic-process-improvement-framework": {
    title: "Stop Putting Out Fires: How DMAIC Permanently Fixes Broken Processes | ServiceTitan Hacks Blog",
    description: "Most business coaches sell you their systems. But what happens when it doesn't fit your team? Learn the proven framework that helped GE and Motorola—and how to use it in your home service business.",
    ogImage: "https://servicetitanhacks.com/og-dmaic-methodology-blog.png",
    ogType: "article",
  },
  "/blog/should-i-switch-to-servicetitan": {
    title: "Should I Switch to ServiceTitan? The Real Cost and Timeline | ServiceTitan Hacks Blog",
    description: "Considering ServiceTitan for your home service business? Learn when it makes sense to switch, what it really costs ($10K-$30K in setup), and why full implementation takes six months.",
    ogImage: "https://servicetitanhacks.com/og-should-i-switch.png",
    ogType: "article",
  },
  
  // Main Pages
  "/about": {
    title: "About ServiceTitan Hacks and Bill Brown",
    description: "Learn about ServiceTitan Hacks, founded by Bill Brown, an Inc. 5000 HVAC contractor sharing AI tools, automation strategies, and ServiceTitan workflows for home service businesses.",
    ogImage: "https://servicetitanhacks.com/og-about.png",
  },
  "/contact": {
    title: "Contact ServiceTitan Hacks",
    description: "Get in touch with ServiceTitan Hacks for questions about courses, tools, partnerships, or automation strategies for your home service business.",
    ogImage: "https://servicetitanhacks.com/og-contact.png",
  },
  "/purchasing-platform": {
    title: "Contractor Purchasing Platform",
    description: "Discover vetted software, AI tools and services for HVAC, plumbing and electrical contractors looking to scale.",
    ogImage: "https://servicetitanhacks.com/og-purchasing-platform.png",
  },
  "/tools": {
    title: "Contractor Tools and Automations for ServiceTitan",
    description: "Free tools, calculators, and automation templates for ServiceTitan users. Optimize your pricebook, calculate ROI, and streamline your HVAC or plumbing business.",
    ogImage: "https://servicetitanhacks.com/og-tools.png",
  },
  "/courses": {
    title: "Courses for ServiceTitan, AI and Automation",
    description: "Learn ServiceTitan workflows, AI integrations, and automation strategies through hands-on courses designed for HVAC, plumbing, and electrical contractors.",
    ogImage: "https://servicetitanhacks.com/og-courses.png",
  },
  "/resources": {
    title: "Free HVAC and Contractor Resources",
    description: "Download free templates, guides, and resources for home service contractors. Get access to swimlane charts, scripts, playbooks, and more.",
    ogImage: "https://servicetitanhacks.com/og-resources.png",
  },
  "/podcast": {
    title: "Home Service Business Hacks Podcast",
    description: "Listen to the Home Service Business Hacks podcast featuring interviews with contractors, software founders, and industry experts on AI, automation, and growth strategies.",
    ogImage: "https://servicetitanhacks.com/og-podcast.png",
  },
  "/blog": {
    title: "ServiceTitan Hacks Blog",
    description: "Articles on AI, automation, ServiceTitan workflows, processes, pricebook strategy and contractor growth.",
    ogImage: "https://servicetitanhacks.com/og-blog.png",
  },
  "/partners": {
    title: "ServiceTitan Hacks Sponsors and Partners",
    description: "Discover vetted software partners and sponsors that help home service contractors grow. Tools for AI, automation, memberships, and business operations.",
    ogImage: "https://servicetitanhacks.com/og-partners.png",
  },
  "/all-access": {
    title: "ServiceTitan Hacks All-Access Membership",
    description: "Get unlimited access to all ServiceTitan Hacks courses, tools, and resources. Join a community of contractors leveraging AI and automation to scale.",
    ogImage: "https://servicetitanhacks.com/og-all-access.png",
  },
  
  // Tool Pages
  "/pricebook-optimizer": {
    title: "Pricebook Optimizer for ServiceTitan",
    description: "Transform technical service descriptions into customer-friendly language using AI. Optimize your ServiceTitan pricebook for better conversion and clarity.",
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
    title: "ServiceTitan Dashboard Course",
    description: "A DIY course for home service pros who want visibility — without expensive software. Go at your own pace with this step-by-step tutorial.",
    ogImage: "https://servicetitanhacks.com/og-dashboard-course.png",
  },
  "/fix-ugly-forms-course": {
    title: "Fix Your Ugly Forms Course",
    description: "Transform messy form submissions into polished job notes using ChatGPT and Zapier. Streamline your documentation process and save time.",
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
};

// Get metadata for a given URL path
export function getMetadata(path: string): PageMetadata {
  // Default homepage metadata
  const defaultMetadata: PageMetadata = {
    title: "ServiceTitan Hacks - AI and Automations for Home Service Contractors",
    description: "AI tools for contractors. Learn ServiceTitan automation for HVAC, plumbing businesses. Free courses, tools & community. Join 9,500+ contractors.",
    ogImage: "https://servicetitanhacks.com/og-home.png",
  };

  // Strip query params and trailing slash
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';
  
  return metadata[cleanPath] || defaultMetadata;
}
