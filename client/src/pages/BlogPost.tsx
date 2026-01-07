import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import serviceTitanDashboardImage from "@assets/32492017-1_1762522874097.jpg";
import billBrownProfile from "@assets/red shirt round_1763150613592.png";
import titanDashboardsImage from "@assets/Untitled_design_(2)_1765462149620.png";
import callBoardHeroImage from "@assets/Hero_image_-_desktop_(2)_1765483039610.png";
import aiSalesCoachImage from "@assets/34047466-3_1765897680481.jpg";
import retentionStrategyImage from "@assets/switchy_images_(3)_1767106347930.png";
import hvacEquipmentBrandsImage from "@assets/ChatGPT_Image_Jan_7,_2026,_10_49_50_AM_1767801011737.png";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  ogImage?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "10",
    title: "Why I Stopped Caring So Much About HVAC Equipment Brands",
    excerpt: "After 25 years in HVAC—as a tech, installer, sales rep, business owner, and working manufacturer-side—I've seen how equipment is actually made. Most brands are more similar than different. Here's what really matters.",
    author: "Bill Brown",
    date: "January 7, 2026",
    readTime: "6 min read",
    category: "Business Operations",
    image: hvacEquipmentBrandsImage,
    slug: "why-i-stopped-caring-about-hvac-equipment-brands",
    ogImage: "https://servicetitanhacks.com/og-hvac-equipment-brands.png"
  },
  {
    id: "9",
    title: "Why HVAC Contractors Overvalue New Customers and Undervalue Retention",
    excerpt: "Attribution is useful, but incomplete. When contractors zoom in too far on lead sources and acquisition costs, they miss the bigger strategic question: where does revenue actually come from, and how do you keep it?",
    author: "Bill Brown",
    date: "December 30, 2025",
    readTime: "8 min read",
    category: "Business Strategy",
    image: retentionStrategyImage,
    slug: "why-hvac-contractors-overvalue-new-customers",
    ogImage: "https://servicetitanhacks.com/assets/switchy_images_(3)_1767106347930.png"
  },
  {
    id: "8",
    title: "How I Built a DIY 'Sales Coach' for $25/Month Using AI",
    excerpt: "I'll be honest: I am not a good salesperson. But I'm getting better—and the only reason is because I finally learned how to study my own mistakes using AI. Here's my $25/month hack.",
    author: "Bill Brown",
    date: "December 16, 2025",
    readTime: "5 min read",
    category: "Sales",
    image: aiSalesCoachImage,
    slug: "diy-ai-sales-coach",
    ogImage: "https://servicetitanhacks.com/og-ai-sales-coach.png"
  },
  {
    id: "7",
    title: "4 Surprising Ways Top Home Service Companies Actually Take Control of Their Schedule",
    excerpt: "Most companies on ServiceTitan think they have a scheduling problem. What they really have is a visibility problem. Here are four real strategies top operators use to take control instead of hoping the day works out.",
    author: "Bill Brown",
    date: "December 11, 2025",
    readTime: "5 min read",
    category: "Operational Strategy",
    image: callBoardHeroImage,
    slug: "4-ways-top-companies-control-schedule",
    ogImage: "https://servicetitanhacks.com/3-day-call-board-blog.png"
  },
  {
    id: "6",
    title: "Stop Treating Your Dashboard Like a Spreadsheet (My Philosophy on Metrics)",
    excerpt: "Business analytics dashboards have gone off the rails. They look like 24-hour news channels with tickers and pop-ups everywhere. If you have to study it, it's not a dashboard—it's a report. Here's my philosophy on how dashboards should actually work.",
    author: "Bill Brown",
    date: "December 11, 2025",
    readTime: "6 min read",
    category: "Operational Strategy",
    image: titanDashboardsImage,
    slug: "stop-treating-dashboard-like-spreadsheet",
    ogImage: "https://servicetitanhacks.com/titan-dashboards-blog.png"
  },
  {
    id: "5",
    title: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional",
    excerpt: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory if you want to capture the next decade of HVAC replacement business.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "11 min read",
    category: "Marketing",
    image: "/blog-millennials-pricing.png",
    slug: "selling-hvac-systems-to-millennials-online-pricing",
    ogImage: "https://servicetitanhacks.com/og-millennials-blog.png"
  },
  {
    id: "4",
    title: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors",
    excerpt: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company and implementing dozens of software solutions.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "12 min read",
    category: "Business Operations",
    image: "/blog-saas-contractors.png",
    slug: "how-to-sell-saas-to-home-service-contractors",
    ogImage: "https://servicetitanhacks.com/og-saas-blog.png"
  },
  {
    id: "1",
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead",
    excerpt: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    author: "Bill Brown",
    date: "January 22, 2025",
    readTime: "8 min read",
    category: "Business Operations",
    image: "/blog-build-your-brand.jpg",
    slug: "stop-selling-other-peoples-equipment-build-your-brand",
    ogImage: "https://servicetitanhacks.com/og-stop-selling-equipment.png"
  },
  {
    id: "2",
    title: "Stop Putting Out Fires: How DMAIC Permanently Fixes Broken Processes",
    excerpt: "Most business coaches sell you their systems. But what happens when it doesn't fit your team? Learn the proven framework that helped GE and Motorola—and how to use it in your home service business.",
    author: "Bill Brown",
    date: "January 20, 2025",
    readTime: "4 min read",
    category: "Process Improvement",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    slug: "dmaic-process-improvement-framework",
    ogImage: "https://servicetitanhacks.com/og-dmaic-methodology-blog.png"
  },
  {
    id: "3",
    title: "Should I Switch to ServiceTitan? The Real Cost and Timeline",
    excerpt: "Considering ServiceTitan for your home service business? Learn when it makes sense to switch, what it really costs ($10K-$30K in setup), and why full implementation takes six months.",
    author: "Bill Brown",
    date: "May 7, 2025",
    readTime: "5 min read",
    category: "ServiceTitan Tips",
    image: serviceTitanDashboardImage,
    slug: "should-i-switch-to-servicetitan",
    ogImage: "https://servicetitanhacks.com/og-should-i-switch.png"
  }
];

const SALES_COACH_PROMPT = `Role: You are a world-class Sales Coach and Revenue Intelligence expert specializing in in-home services. You have trained top closers in trades like HVAC, roofing, plumbing, and solar. I am uploading transcripts from my recent in-home sales appointments.

Goal: I need you to brutally analyze my performance. Do not be polite; be objective and critical. My goal is to identify my blind spots so I can increase my closing rate in the home.

Please analyze the attached transcripts for the following 4 specific areas:

1. The Monologue Detector (Talk-to-Listen Ratio)
- Identify sections where I speak for too long without asking a checking question.
- Estimate my talk time vs. the homeowner's talk time.
- Highlight any specific moments where I interrupted the homeowner.

2. The "Trade Talk" Trap
- Identify moments where I used technical industry language (specs, code requirements, complex mechanics) that might confuse a homeowner.
- Action: Rewrite one of those technical explanations into a simple, kitchen-table analogy I could use instead.

3. Missed Buying Signals & The Close
- Did the homeowner ask a question or make a statement that showed interest (a buying signal) that I ignored or talked over?
- Did I clearly ask for the sale? If not, identify the exact moment in the conversation where I should have asked for the business, and write out exactly what I should have said.

4. Discovery & Comfort
- Am I asking "Yes/No" questions or "Open-Ended" questions to understand their needs?
- List 3 questions I should have asked to better understand their pain points or budget, but didn't.

Output format:
Please give me a bulleted Executive Summary of my top 3 weaknesses across these appointments, followed by specific "Before and After" examples using quotes from the transcripts.`;

function SalesCoachPromptBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SALES_COACH_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 my-6 relative">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-700 font-semibold">The "In-Home Sales" Analysis Prompt:</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#ED254E] hover:bg-[#C1121F] text-white text-sm font-medium rounded-md transition-colors"
          data-testid="button-copy-prompt"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono overflow-x-auto bg-gray-50 p-4 rounded border border-gray-200">{SALES_COACH_PROMPT}</pre>
    </div>
  );
}

// Full article content
const blogPostContent: Record<string, JSX.Element> = {
  "why-i-stopped-caring-about-hvac-equipment-brands": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        This is something I have been thinking about for a long time.
      </p>

      <p>
        I have been in the HVAC industry for about 25 years. Technician. Installer. Sales. Business owner. Manufacturer side.
      </p>

      <p>
        I have sat on both sides of the table.
      </p>

      <p>
        At one point in my career, I worked in supplier quality for a manufacturer that built air conditioning systems for data centers. Part of my job was auditing manufacturing facilities to determine whether components were actually being built to specification.
      </p>

      <p>
        That meant visiting suppliers and OEMs directly.
      </p>

      <p>
        Copeland. Carrier. Goodman. Rheem. Trane. And others.
      </p>

      <p>
        Seeing how equipment is actually made changes your perspective.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">Most HVAC Equipment Is More Similar Than Different</h2>

      <p>
        Once you have been inside enough manufacturing lines, a pattern becomes obvious.
      </p>

      <p>
        Most HVAC equipment is far more similar than most contractors want to admit.
      </p>

      <p>
        The majority of components are outsourced. Controls. Motors. Compressors. Valves.
      </p>

      <p>
        Often from the same suppliers.
      </p>

      <p>
        Honeywell. White-Rodgers. Emerson. Danfoss. Fasco. Lau.
      </p>

      <p>
        Every manufacturer follows AHRI standards. Every manufacturer follows UL requirements. Every manufacturer operates at high volume.
      </p>

      <p>
        High volume typically means more automation, not less. And more automation generally means more consistency.
      </p>

      <p>
        What actually changes over time is not the brand name on the cabinet.
      </p>

      <p>
        It is specific components. Specific product revisions. Specific support and distribution issues.
      </p>

      <p>
        Every manufacturer will experience a wave of problems at some point. Guaranteed.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">So What Actually Differentiates One Brand From Another?</h2>

      <p>
        If it is not pure equipment quality, what is it?
      </p>

      <p>
        In practice, the difference usually comes down to three things:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Brand perception</li>
        <li>Local distributor support</li>
        <li>How confident the contractor feels standing behind what they sell</li>
      </ul>

      <p>
        I have personally installed and serviced Carrier, Bryant, Trane, Lennox, Rheem, Ruud, and Goodman.
      </p>

      <p>
        The confidence contractors feel in a brand is often less about objective data and more about confirmation bias. We tend to justify the choice we already made.
      </p>

      <p>
        Sometimes we confuse faith in a manufacturer with faith in ourselves.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">Why I Ultimately Chose Goodman as a Private Label Dealer</h2>

      <p>
        The reason I chose Goodman was not because I believe it is magically better equipment.
      </p>

      <p>
        It was because of a few practical realities.
      </p>

      <p>
        <strong>First, the 10-year parts and labor warranty.</strong>
      </p>

      <p>
        If I were a homeowner, that matters more to me than a logo.
      </p>

      <p>
        <strong>Second, accountability.</strong>
      </p>

      <p>
        When equipment fails during the warranty period, the customer does not stay with the manufacturer. They come back to the contractor.
      </p>

      <p>
        If a customer calls the manufacturer, they are almost always sent back to the installing contractor anyway.
      </p>

      <p>
        So if I am 100 percent responsible for the equipment in someone's home, the branding should be mine.
      </p>

      <p>
        I do not believe any manufacturer cares more about my customers than I do.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">The Financial Side Contractors Rarely Talk About</h2>

      <p>
        There is also the margin reality.
      </p>

      <p>
        Goodman equipment is typically lower cost than many other brands, especially as features increase.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Two-stage systems</li>
        <li>Variable speed</li>
        <li>Higher-end configurations</li>
      </ul>

      <p>
        Lower equipment cost creates margin flexibility.
      </p>

      <p>
        When times are good, you keep more profit. When times slow down, you can stay competitive without destroying your numbers.
      </p>

      <p>
        That flexibility matters more than most contractors realize.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">From Perspective to Action</h2>

      <p>
        After sharing this perspective with contractors, I kept getting the same follow-up questions.
      </p>

      <p>
        "How are you actually buying it?"
      </p>

      <p>
        "Is there a way to see pricing without committing?"
      </p>

      <p>
        That is why we built the ServiceTitan Hacks purchasing platform.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 font-heading">What the Purchasing Platform Actually Is</h2>

      <p>
        The platform exists for one reason: visibility.
      </p>

      <p>
        It allows contractors to register and see what Goodman pricing looks like through our group purchasing setup.
      </p>

      <p>
        That is it.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>No contracts</li>
        <li>No minimums</li>
        <li>No requirement to switch brands</li>
        <li>No obligation to buy</li>
      </ul>

      <p>
        It is not a sales call. It is not a commitment.
      </p>

      <p>
        It is simply access to real numbers.
      </p>

      <p>
        If you have ever wondered whether your current equipment cost structure is helping you or quietly working against you, this gives you clarity without pressure.
      </p>

      <p>
        You can learn more here: <a href="https://servicetitanhacks.com/purchasing-platform" className="text-primary hover:underline">servicetitanhacks.com/purchasing-platform</a>
      </p>

      <p>
        You do not have to change anything.
      </p>

      <p>
        But having the information tends to change how you think.
      </p>
    </div>
  ),
  "why-hvac-contractors-overvalue-new-customers": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        Every contractor I know cares about attribution. Where did the lead come from? Which campaign drove the call? What is our cost per acquired customer?
      </p>

      <p>
        These are good questions. Tracking where revenue originates is useful. It helps you understand what is working and what is not.
      </p>

      <p>
        But attribution is incomplete. It tells you where a customer came from. It does not tell you how your business actually grows.
      </p>

      <p>
        When you zoom in too far on lead sources and campaign performance, you can miss the bigger strategic question: what percentage of your revenue comes from customers you already have versus customers you are paying to acquire?
      </p>

      <p>
        That question matters more than any individual channel report when you are planning for 2026.
      </p>

      <h2>Attribution Is Not the Same as Strategy</h2>

      <p>
        Most contractors track lead sources carefully. They know which campaigns are running, which channels are producing calls, and roughly what they are spending to acquire new customers.
      </p>

      <p>
        This feels productive. You can point to numbers and say whether something is working or not. You can compare cost per lead across different sources. You can see which campaigns produced booked calls and which did not.
      </p>

      <p>
        But granular attribution can become a distraction if it is not connected to the bigger picture. Knowing that Google Ads produced 47 leads last month does not tell you whether your business is actually growing or just replacing customers you are losing.
      </p>

      <p>
        Attribution is a tool. It is not the end goal. The end goal is a business that grows predictably without requiring you to constantly chase new customers to replace the ones who forgot about you.
      </p>

      <h2>Why Contractors Overvalue New Customers: The Reporting Problem</h2>

      <p>
        Most digital marketing agencies are built around new customer acquisition. That is what they sell, so that is what they report on.
      </p>

      <p>
        The metrics you typically see from an agency include cost per lead, cost per booked call, and cost per acquired customer. These are useful numbers, and good agencies track them well.
      </p>

      <p>
        But what agencies rarely report on includes revenue from existing customers, membership retention rates, renewal percentages, and long-term customer value.
      </p>

      <p>
        This is not malicious. Agencies report on what they control. They control ad spend and campaign performance. They do not control what happens after the customer is acquired.
      </p>

      <p>
        The problem is that over time, this reporting shapes contractor behavior. When the only numbers you review every month are acquisition metrics, you start to believe that acquisition is the only thing that matters.
      </p>

      <h2>Why Contractors Overvalue New Customers: The Dopamine Problem</h2>

      <p>
        Beyond reporting, there is a psychological component.
      </p>

      <p>
        Picture the scenario: a new customer calls. They need a system replacement. Your tech goes out, runs a comfort assessment, presents options, and closes the deal that same day. Twenty to thirty thousand dollars in revenue. Money in the bank before the week is over.
      </p>

      <p>
        That feels good. It is immediate, tangible, and exciting. You can tell your team about the win. You can see the revenue hit your account.
      </p>

      <p>
        Now contrast that with existing customer revenue. A membership renewal here. A maintenance visit there. A small repair from someone who has been a customer for years. It is slower, less dramatic, and harder to celebrate.
      </p>

      <p>
        Over time, this trains owners to chase the short-term wins. The big installation feels like growth. The quiet, consistent revenue from retained customers feels like background noise.
      </p>

      <p>
        But background noise compounds. Big one-time wins do not.
      </p>

      <h2>The Cost of Ignoring Retention</h2>

      <p>
        When you ignore retention, you end up on a treadmill. You lose customers through churn, and you replace them with constant acquisition. The business feels busy, but it is not actually growing.
      </p>

      <p>
        This affects more than just revenue. It affects marketing spend, because you are always paying to refill a leaky bucket. It affects capacity planning, because your job volume is unpredictable. It affects technician utilization, because you are constantly ramping to handle inconsistent demand. It affects your stress level, because every slow week feels like a crisis.
      </p>

      <p>
        A business built on retention is calmer. Revenue becomes more predictable. You spend less on acquisition because existing customers keep coming back. You plan capacity with more confidence because you know what to expect.
      </p>

      <h2>The Bigger Year-End Question Contractors Should Ask</h2>

      <p>
        If you are planning for 2026, two questions matter more than individual campaign performance.
      </p>

      <p>
        First: what percentage of 2025 revenue came from existing customers versus new customers?
      </p>

      <p>
        If you do not know this number, you do not really understand how your business works. Most contractors assume new customers drive most of their revenue. Many are surprised to learn that existing customers often account for half or more.
      </p>

      <p>
        Second: for a customer acquired in 2025, if they are retained, what revenue should you expect in 2026?
      </p>

      <p>
        This question forces you to think about customer value over time instead of just acquisition cost. A customer who stays with you for five years is worth far more than the initial sale. But only if you keep them.
      </p>

      <h2>How to Think About Future Customer Value</h2>

      <p>
        You do not need complicated formulas to understand HVAC customer lifetime value. The concept is straightforward.
      </p>

      <p>
        A retained customer generates revenue in multiple ways. Membership fees, if they are on a maintenance plan. Ongoing service and repair work as issues arise. And eventually, replacement revenue when their system reaches end of life.
      </p>

      <p>
        The longer a customer stays with you, the more of this revenue you capture. If they leave after one year, someone else gets the replacement sale. If they stay for ten years, you get everything.
      </p>

      <p>
        This is why retention matters. It is not just about the next membership renewal. It is about capturing the full lifetime value of every customer you acquire.
      </p>

      <h2>Retention Is an Experience Problem</h2>

      <p>
        Customers do not leave because they are angry. Most leave because they forget you exist.
      </p>

      <p>
        Think about it from their perspective. You install a system or perform a service visit. Maybe you sign them up for a membership. Then they do not hear from you for months. When their system has a problem or their membership is up for renewal, they cannot remember who you are. They search online and call whoever shows up first.
      </p>

      <p>
        This is not a marketing problem. It is an engagement problem. The silence between visits is what kills home service customer retention.
      </p>

      <p>
        Engagement builds trust. When customers hear from you regularly, they remember you. When they feel connected to your company, they renew their membership. When something goes wrong, they call you instead of searching for someone new.
      </p>

      <h2>Where SmartAC Fits</h2>

      <p>
        SmartAC is not a lead source. It is not a sales script. It is a customer engagement layer that keeps your customers connected year round.
      </p>

      <p>
        The system provides visibility into customer equipment through connected sensors. When something is off, customers get notified. When maintenance is due, they are reminded. When seasonal changes affect their system, they see it.
      </p>

      <p>
        This does a few things. It keeps your company in front of customers between visits. It reduces the burden on technicians to drive every conversation about system health. It gives customers a reason to stay engaged with you even when nothing is wrong.
      </p>

      <p>
        Most importantly, it supports HVAC membership programs naturally. Customers who feel connected to their system and to your company are more likely to renew. They are more likely to call you when they need service. They are more likely to trust your recommendations when it is time to replace.
      </p>

      <p>
        SmartAC does not replace your marketing or your sales process. It fills the gap between customer visits that causes so many contractors to lose customers they already paid to acquire.
      </p>

      <h2>Conclusion</h2>

      <p>
        New customers matter. Every HVAC business growth strategy needs acquisition.
      </p>

      <p>
        But retention compounds. A customer you keep for a decade is worth far more than a customer you replace every two years. The math is simple. The execution is what most contractors miss.
      </p>

      <p>
        As you plan for 2026, take time to review where your revenue actually came from in 2025. Look at your existing versus new customer split. Look at your membership retention rate. Look at the gaps in engagement between visits.
      </p>

      <p>
        The contractors who build predictable, calm businesses are the ones who stop treating every week like a hunt for new customers and start treating their existing customers like the asset they are.
      </p>

      <div className="bg-gradient-to-br from-[#ED254E]/10 to-[#C1121F]/10 border-l-4 border-[#ED254E] rounded-lg p-8 my-12">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Keep Your Customers Connected Year-Round
        </h3>
        <p className="text-lg mb-6">
          SmartAC helps HVAC contractors improve retention by keeping customers engaged between service visits. See how it works for your business.
        </p>
        <a 
          href="/partners/smartac" 
          className="inline-block bg-[#ED254E] hover:bg-[#C1121F] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          data-testid="link-smartac-cta"
        >
          Learn More About SmartAC
        </a>
      </div>
    </div>
  ),
  "diy-ai-sales-coach": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <h2>The Confession</h2>
      
      <p>
        I'll be honest with you: <strong>I am not a good salesperson.</strong>
      </p>
      
      <ul>
        <li>I have trouble listening</li>
        <li>I monologue over people instead of asking questions</li>
        <li>I talk too fast</li>
        <li>I get too technical</li>
        <li>I don't ask for the sale often enough</li>
      </ul>
      
      <p>
        I'm pretty sure I check every box on the list of things you can do wrong in sales.
      </p>
      
      <p>
        <strong>But I'm getting better.</strong> And the only reason I'm getting better is because I finally learned how to study my own mistakes—something that, before AI, was nearly impossible to do in sales. Here's how I do it for about $25 a month.
      </p>
      
      <h2>The Game Tape Concept</h2>
      
      <p>
        The only way to get better is to know exactly what happened.
      </p>
      
      <p>
        The best football players watch game tape. The best golfers analyze their swing frame by frame. The best baseball players break down every at-bat and practice relentlessly.
      </p>
      
      <p>
        <strong>The problem with sales is this:</strong> when you mess up a call, you don't really know exactly where you messed up. The conversation moves too fast. You're in the moment. And by the time it's over, you only remember the general feeling—not the specific words, pauses, or missed opportunities.
      </p>
      
      <p>
        Unlike athletes, salespeople don't have a natural way to rewind and study their performance. At least, we didn't—until now.
      </p>
      
      <h2>The AI Unlock: From Note-Taker to Coach</h2>
      
      <p>
        During Covid, I started recording all of my Zoom calls and using AI note-takers during conversations.
      </p>
      
      <p>
        Initially, the note-takers were great because they would compile a list of action items, allowing me to focus on the call rather than scribbling notes. (Honestly, I'm a horrible note-taker anyway. I'd walk away from 45-minute calls with maybe three weak bullet points.)
      </p>
      
      <p>
        But here's the key insight: <strong>Note-takers are for memory. ChatGPT is for coaching.</strong>
      </p>
      
      <p>
        When I started doing more sales calls, I continued recording the conversations. But when ChatGPT came out, I realized I could take those transcripts and analyze them on a much deeper level.
      </p>
      
      <h2>The Workflow: Your Step-by-Step Guide</h2>
      
      <p>
        Here's exactly how I built my $25/month AI sales coach:
      </p>
      
      <p>
        <strong>Step 1: Record Your Customer Conversations</strong><br />
        Get yourself a <strong>Plaud Note Pin</strong> or similar recording device. It's a small pin you can clip to your shirt or wear on your wrist. It records your conversations with customers—whether you're in their kitchen presenting options, on a service call, or meeting face-to-face anywhere. It automatically transcribes everything.
      </p>
      
      <p>
        <strong>Step 2: Export Transcripts to PDF</strong><br />
        After each conversation, export the transcript. I save them in a folder organized by week or type of call (service calls, sales presentations, follow-ups).
      </p>
      
      <p>
        <strong>Step 3: Batch Upload 10 Conversations to ChatGPT</strong><br />
        Once I have about 10 similar conversations, I upload all the PDFs into ChatGPT.
      </p>
      
      <p>
        <strong>Step 4: Use This Prompt</strong><br />
        Copy the prompt below and paste it into ChatGPT along with your transcripts. This is the "Master Sales Coach" prompt I use—it works whether you're selling HVAC systems, roofing, plumbing, solar, or any in-home service:
      </p>
      
      <SalesCoachPromptBox />
      
      <p>
        <strong>The possibilities for feedback are endless.</strong> This prompt covers the big four areas: talk-to-listen ratio, technical jargon, missed buying signals, and discovery questions. The AI will find patterns you'd never catch on your own—and give you specific "before and after" examples from your actual conversations.
      </p>
      
      <h2>Why the Plaud Note Pin Works So Well</h2>
      
      <p>
        If you're a technician or in-home salesperson, you're not sitting at a desk on Zoom calls. You're in customers' homes, in their garages, in their basements. You need something that works in the field.
      </p>
      
      <p>
        The <strong>Plaud Note Pin</strong> is small, unobtrusive, and records hours of conversation. It transcribes automatically and even has built-in AI feedback within the app. You can review your conversations on the drive to your next call.
      </p>
      
      <p>
        It's the missing piece for anyone doing face-to-face customer interactions.
      </p>
      
      <h2>You Don't Need Your Company to Buy This</h2>
      
      <p>
        Here's the thing: you don't need to wait for your company to champion this or approve a budget. This is a personal development tool. I pay for ChatGPT myself. I bought my own Plaud Note Pin. It costs me about $25 a month total.
      </p>
      
      <p>
        Think about it—if this helps you close even one more job per month, you've paid for years of the subscription in a single commission check. This is an investment in yourself, not a company expense request.
      </p>
      
      <h2>The Bottom Line</h2>
      
      <p>
        Honestly, I haven't figured out any other way to improve at sales than to <strong>know exactly what the number one thing you need to work on is.</strong>
      </p>
      
      <p>
        You can read all the books. You can attend all the workshops. But until you see your own patterns—the way you interrupt, the questions you dodge, the pauses you fill with rambling—you're just guessing at what to fix.
      </p>
      
      <p>
        <strong>Record. Transcribe. Analyze. Repeat.</strong>
      </p>
      
      <p>
        That's the hack. Hope it helps.
      </p>
    </div>
  ),
  "4-ways-top-companies-control-schedule": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        Most companies on ServiceTitan think they have a scheduling problem. What they really have is a visibility problem.
      </p>

      <p>
        The schedule is the heartbeat of the business, but most teams can't see capacity at a glance. Dispatchers dig through the board manually. CSRs guess. Managers ask the same questions every morning. Every empty slot is lost revenue, and nobody knows it until it is too late.
      </p>

      <p>
        The companies that grow the fastest are not just reacting to the chaos. They change how their teams see the schedule in the first place. They make capacity visible, simple, and measurable. Here are four real strategies top operators use to take control instead of hoping the day works out.
      </p>

      <h2>1. They Turn Scheduling Into a Team Sport</h2>

      <p>
        The old world keeps scheduling locked inside dispatch. The new world puts capacity in front of the entire company.
      </p>

      <p>
        Top operators put a 3 day capacity board on a TV in the office. One secure link or QR code, and everyone sees the exact same thing in real time. CSRs know the openings without asking. Dispatch knows the targets. Managers know where the day is headed before it starts.
      </p>

      <p>
        This eliminates the constant back and forth and the daily "How are we looking" conversations that waste time and create misalignment. When the whole team sees the targets, the whole team owns the targets.
      </p>

      <h2>2. They Stop Reacting and Start Planning</h2>

      <p>
        Most companies wake up every morning and try to fix today. Elite operators look three days ahead.
      </p>

      <p>
        A simple three day forward view changes everything. Today, tomorrow, and the next business day are shown side by side with actual capacity numbers. Add a three day weather forecast and now you know when outdoor jobs need to move, when to expect spikes, and when you need to fill holes before they become a problem.
      </p>

      <p>
        If tomorrow is light on maintenance calls, they fix it today. No scrambling. No surprises. Just proactive planning that protects revenue before it slips away.
      </p>

      <h2>3. They Make Hitting Targets Simple and Fun</h2>

      <p className="font-bold text-xl my-6">
        You get what you measure, but you keep what you celebrate.
      </p>

      <p>
        Top teams set clear capacity targets. For example: today at 90 percent, tomorrow at 80 percent, and day three at 70 percent. When those targets hit, the dashboard celebrates it. Streak counter. Fireball. Confetti. It sounds small, but it works.
      </p>

      <p>
        Gamification takes a stressful daily chore and turns it into something the entire team participates in. They want to keep the streak alive. They want to win the day. And every time they do, the board is full and revenue goes up.
      </p>

      <p>
        This is not about gimmicks. It is about reinforcing the behaviors that build consistent, predictable results.
      </p>

      <h2>4. They Use Tools Built for ServiceTitan Instead of Fighting Generic Dashboards</h2>

      <p>
        Generic dashboards are expensive, complicated, and never quite match the ServiceTitan workflow. Top companies skip all of that and use tools built specifically for the ServiceTitan API.
      </p>

      <p>
        A native integration means setup is easy, there is nothing to configure, and no sensitive customer data is ever required. It works the way ServiceTitan users already think.
      </p>

      <p>
        Flat rate pricing keeps it simple. Two hundred forty nine a month for unlimited users and unlimited screens. No hidden fees. No per seat math. Just plug it in and give the entire team what they need.
      </p>

      <p>
        The result is faster adoption, lower cost, and a measurable improvement in scheduling efficiency from day one.
      </p>

      <h2>Are You Managing the Schedule, or Commanding It?</h2>

      <p>
        The difference is visibility and alignment. When the whole team sees capacity in real time, when you plan three days ahead instead of fighting the day you are in, when targets are clear and celebrated, and when your tools actually work with ServiceTitan instead of against it, everything gets easier.
      </p>

      <p className="font-bold text-xl my-6">
        This is how top companies turn their schedule into an advantage instead of a daily firefight.
      </p>

      <p>
        If your team could see the same goals all day, every day, how much more would you book?
      </p>

      <div className="bg-gradient-to-br from-[#ED254E]/10 to-[#C1121F]/10 border-l-4 border-[#ED254E] rounded-lg p-8 my-12">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Ready to Take Control of Your Schedule?
        </h3>
        <p className="text-lg mb-6">
          Titan Dashboards gives you a simple, beautiful 3-day capacity view—synced directly with ServiceTitan. No spreadsheets. No noise. Just clarity.
        </p>
        <a 
          href="https://titandashboards.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#ED254E] hover:bg-[#C1121F] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          data-testid="link-titan-dashboards-cta"
        >
          Visit TitanDashboards.com
        </a>
      </div>
    </div>
  ),
  "stop-treating-dashboard-like-spreadsheet": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        Business analytics dashboards have gone off the rails.
      </p>
      
      <p>
        Over the last few years, they have started to look like 24-hour news channels. You know what I mean—tickers rolling across the bottom, pop-ups on the side, and noise everywhere. They are crammed with so much data that you have to stand there and study them to understand what is going on.
      </p>

      <p className="font-bold text-xl my-6">
        If you have to study it, it's not a dashboard. It's a report.
      </p>

      <p>
        I've built countless dashboards over the years, and I've developed a specific philosophy on how they should work in a trade business. It comes down to the difference between a spreadsheet and the dashboard in your truck.
      </p>

      <h2>The "Car Dashboard" Philosophy</h2>

      <p>Your truck's dashboard has a lot of information wired into it, but it only shows you what matters right now.</p>

      <ul>
        <li>The speedometer is large because you need to glance at it constantly.</li>
        <li>The gas gauge is simple: E to F.</li>
        <li>The "Check Engine" light only comes on when you have a problem.</li>
      </ul>

      <p>
        It doesn't give you a spreadsheet analysis of your fuel injection ratios. It just tells you if you have enough gas to get where you're going.
      </p>

      <p>
        Business dashboards need to be the same. They should be quick indicators of something very specific. They shouldn't try to shove the entire organization's data onto one screen.
      </p>

      <p className="font-bold text-xl my-6">
        When I put a dashboard up on a TV in a call center, I know it's a winner if every employee knows exactly how to read it within 5 seconds, without me explaining it.
      </p>

      <h2>Why I Scrapped the DIY Class (And Built an App)</h2>

      <p>
        I recently planned to launch a class on ServiceTitanHacks showing you how to build a custom "3-Day Call Board."
      </p>

      <p>
        But as I was building it, I realized I was violating my own rule. The DIY version was becoming "noisy." It required too much setup, too many broken formulas, and too much maintenance.
      </p>

      <p>
        So, I pivoted. I built a standalone software app—The Titan Call Board—that strips away the noise and focuses strictly on the "Gas Gauge" of your business: Capacity.
      </p>

      <h2>The Digital Whiteboard Concept</h2>

      <p>
        The Titan Call Board is designed to be the simplest tool in your stack. It functions like a beautiful digital whiteboard, but with data synced directly from ServiceTitan.
      </p>

      <p>Here is how it works, and more importantly, why it works that way:</p>

      <h3>1. The "Red to Green" Dial</h3>

      <p>
        We look at the next three business days. Each day has a simple dial indicator. It calculates a simple fraction: (Current Jobs / Jobs Needed).
      </p>

      <ul>
        <li><strong>Current Jobs:</strong> This pulls automatically from ServiceTitan. You can filter by Business Unit or Job Type.</li>
        <li><strong>Jobs Needed:</strong> This is set manually by you.</li>
      </ul>

      <h3>2. The "Hack": You Don't Need Perfect Data</h3>

      <p>
        This is the part ServiceTitan users will appreciate. Usually, to get a good capacity report, you need to have ServiceTitan's "Adjustable Capacity Planning" set up perfectly, and your technician schedules need to be immaculate.
      </p>

      <p className="font-bold">This dashboard bypasses that.</p>

      <p>
        You don't need perfect schedules. You just need to know, "I need 10 installs on Tuesday, and I currently have 6." The dashboard flashes red. The team knows the goal. Action is taken.
      </p>

      <h3>3. Why It Isn't Fully Automated (The Human Element)</h3>

      <p>
        I made a conscious decision not to use AI or algorithms to set the daily targets.
      </p>

      <p>
        If a dashboard is 100% automatic, it runs in the background and people stop looking at it. It becomes wallpaper.
      </p>

      <p>
        By making the "Jobs Needed" target manual, it forces the Call Center Manager or Owner to take ownership. You look at the weather (which is built into the dashboard), you look at the team availability, and you set the target.
      </p>

      <ul>
        <li>You set the goal.</li>
        <li>ServiceTitan provides the actuals.</li>
        <li>The team chases the green light.</li>
      </ul>

      <h2>Simplicity Wins</h2>

      <p>
        The goal of a dashboard isn't to allow you to drill down into ten layers of data on a giant screen. The goal is to tell you if you are winning or losing, right now, at a glance.
      </p>

      <p>
        If you are tired of "News Ticker" dashboards and want a clean, actionable view of your 3-day capacity, check out the new tool I just launched.
      </p>

      <div className="bg-gradient-to-br from-[#ED254E]/10 to-[#C1121F]/10 border-l-4 border-[#ED254E] rounded-lg p-8 my-12">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Ready to See Your Capacity at a Glance?
        </h3>
        <p className="text-lg mb-6">
          The Titan Call Board gives you a simple, beautiful view of your next 3 days—synced directly with ServiceTitan. No spreadsheets. No noise. Just clarity.
        </p>
        <a 
          href="https://titandashboards.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          data-testid="link-titan-dashboards-cta"
        >
          Get the Titan Call Board
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  ),
  "selling-hvac-systems-to-millennials-online-pricing": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        For the past 20 years, most residential HVAC replacements have been purchased by Baby Boomers and Gen X homeowners. These generations bought HVAC systems long before online research became the norm, so traditional "call for price" or "schedule an estimate first" sales processes worked effectively.
      </p>
      
      <p>
        But the next decade will not look like the last one.
      </p>

      <p>
        Millennials are now the largest adult generation in the U.S. Although their homeownership rate initially lagged behind Boomers, they now represent a rapidly rising share of first-time buyers. As this demographic becomes a larger percentage of your customer base, their digital expectations will determine who wins HVAC replacement business.
      </p>

      <p>
        This article explains why offering transparent online pricing—at least in the form of credible price ranges—is becoming mandatory if you want to win the Millennial homeowner.
      </p>

      <h2>1. Millennials Expect Accessible Online Information, Not Phone-Call Gatekeeping</h2>

      <p>The shift in buyer expectations is measurable.</p>

      <p className="font-semibold">Fact:</p>
      <p>
        A 2023 Statista survey reported that 84% of U.S. consumers research products online before making a purchase, even for high-ticket categories like home improvement and automobiles.
      </p>

      <p className="font-semibold">Fact:</p>
      <p>
        A report by Salesforce found that Millennials are significantly more likely than older generations to prefer digital self-service during the buying process, including online research and price discovery.
      </p>

      <p>
        If a potential customer has spent their entire adult life purchasing goods via the Internet, a "Call for Price" tab creates friction. The immediate reaction is often, "I'm not going to call you."
      </p>

      <p>
        This is not theory; it is demonstrated behavior in every major consumer category. When a younger homeowner lands on a contractor's website and cannot find even a ballpark price range, the emotional response is frustration, not curiosity. Frustrated buyers do not pick up the phone; they simply click the back button.
      </p>

      <h2>2. Google and AI Results Reward Contractors Who Give People What They Want</h2>

      <p>
        Future buyers will not sift through a mountain of blue links to find a phone number. They want direct answers. Today, Google's search algorithm—and increasingly, AI-driven search tools—heavily favors pages that provide:
      </p>
      <ul>
        <li>Clear answers</li>
        <li>Transparent information</li>
        <li>Pricing guidance</li>
        <li>High-intent user experiences</li>
      </ul>

      <p>This reward system is not going away.</p>

      <p className="font-semibold">Fact:</p>
      <p>
        Google confirms in its Search Quality Evaluator Guidelines that websites demonstrating high "E-E-A-T" (Experience, Expertise, Authoritativeness, Trustworthiness) are favored in search rankings. Pricing transparency is directly tied to "trustworthiness" in these guidelines.
      </p>

      <p>
        When your website refuses to answer the very question customers most want answered — "How much does it cost?" — Google has little incentive to rank you. It is about earning the recommendation of both Google and the new wave of AI search assistants.
      </p>

      <h2>3. The "Call for Price" Model Will Quietly Shrink Your Market Share</h2>

      <p>
        If you believe that younger buyers will tolerate hidden pricing, you risk losing market share to competitors who adapt faster.
      </p>

      <p>
        To maintain visibility, your content must address the five topics buyers inevitably research before spending money:
      </p>
      <ul>
        <li><strong>Cost:</strong> How much is this going to set me back?</li>
        <li><strong>Problems:</strong> What could go wrong?</li>
        <li><strong>Comparisons:</strong> How does Brand A compare to Brand B?</li>
        <li><strong>Reviews:</strong> What do others think?</li>
        <li><strong>Best in Class:</strong> What is the top-rated option?</li>
      </ul>

      <p>
        Every industry that embraces these five topics online gains trust and market exposure. The industries that avoid them lose visibility. Companies in similar high-ticket verticals (like swimming pools or roofing) that have published detailed pricing guides have historically seen massive increases in revenue because they capture early-stage research traffic that competitors ignore.
      </p>

      <h2>4. The Real Race to the Bottom Is Invisible</h2>

      <p>A common objection HVAC companies raise is: "If I post pricing online, won't it turn into a race to the bottom?"</p>

      <p>The reality is that "the bottom" is not low pricing. The bottom is:</p>
      <ul>
        <li>Not getting the click.</li>
        <li>Not getting the phone call.</li>
        <li>Not getting the booking.</li>
        <li>Not even knowing the customer existed.</li>
      </ul>

      <p>
        Low pricing is not the enemy; invisibility is. If Millennials never see your estimate page because you hide pricing, you lose the sale before the race even begins.
      </p>

      <h2>5. Your Website Must Become a Transparent Digital Sales Experience</h2>

      <p>To build a trusted brand in the digital age, you must adopt two key principles:</p>

      <p className="font-semibold">Address what others ignore:</p>
      <p>
        Most contractors do not talk directly about cost, problems, comparisons, or alternatives. The ones who do become trusted authorities.
      </p>

      <p className="font-semibold">Sell the way buyers want to buy:</p>
      <p>
        The trend is clear—buyers want to self-educate, maintain control, and make progress online without a salesperson hovering over them.
      </p>

      <p>What this means for HVAC companies: You must consider adding tools that facilitate this self-service journey:</p>
      <ul>
        <li>Online pricing ranges</li>
        <li>System-level configurators</li>
        <li>"Which system is right for me?" quizzes</li>
        <li>Instant estimate tools</li>
        <li>Self-schedulers</li>
      </ul>

      <p>
        These tools increase trust and dramatically improve lead volume. Platforms like <a href="https://go.st-hacks.cc/contractor-commerce" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" data-testid="link-contractor-commerce-1">Contractor Commerce</a> enable HVAC contractors to offer instant online pricing for system replacements, allowing homeowners to configure and price their system without requiring a phone call.
      </p>

      <p className="font-semibold">Fact:</p>
      <p>
        Salesforce reports that 66% of customers prefer brands that offer self-service tools, and this preference is even stronger among Millennials.
      </p>

      <h2>6. The Anatomy of a High-Converting Pricing Page</h2>

      <p>
        You already explain pricing dynamics in the home every day. The most successful contractors are now mirroring that real-world expertise online.
      </p>

      <p>A complete, high-converting pricing page should include:</p>
      <ul>
        <li><strong>Factors that increase price:</strong> (e.g., ductwork modifications, high-efficiency units).</li>
        <li><strong>Factors that decrease price:</strong> (e.g., rebates, tax credits, standard efficiency).</li>
        <li><strong>Why rates vary:</strong> Explain why you might charge more than the "truck and a ladder" guy.</li>
        <li><strong>Ballpark ranges:</strong> Where your pricing generally falls.</li>
        <li><strong>Package explanations:</strong> Good, Better, Best.</li>
        <li><strong>Upgrades and add-ons:</strong> Thermostats, zoning, air purifiers.</li>
        <li><strong>Hidden or unexpected costs:</strong> Be transparent about permit fees or electrical upgrades.</li>
        <li><strong>Financing options:</strong> Show monthly payments, not just total cost.</li>
      </ul>

      <p>
        This approach guides homeowners through the full decision-making process digitally, filtering out low-quality leads and warming up serious buyers.
      </p>

      <h2>7. Online Pricing Will Become Universal. Early Adopters Win.</h2>

      <p>
        Within five years, it is highly likely that the majority of your competitors will have a pricing estimator on their site. This trajectory has played out in dozens of other industries:
      </p>
      <ul>
        <li><strong>Boating:</strong> Went from zero to 70% adoption of online "Build & Price" tools.</li>
        <li><strong>Automotive:</strong> Universal adoption of online configurators.</li>
        <li><strong>Solar & Roofing:</strong> Rapidly moving toward instant online quotes.</li>
      </ul>

      <p>
        The HVAC industry will follow. The only question is who secures the early-adopter advantage. Forward-thinking contractors are already deploying online pricing systems that let homeowners configure, compare, and price HVAC systems on their own terms—building trust before the first phone call ever happens.
      </p>

      <h2>Conclusion: Millennials Aren't the Future Buyer — They're the Current Buyer</h2>

      <p>If you want to capture the next decade of HVAC system replacements:</p>
      <ul>
        <li>Build trust.</li>
        <li>Provide transparent information.</li>
        <li>Offer price ranges.</li>
        <li>Add self-service tools.</li>
        <li>Remove friction.</li>
      </ul>

      <p>
        Millennial homeowners do not want sales pressure. They want clarity, control, and trust. The contractors who deliver that trust online will dominate the next era of residential HVAC.
      </p>

      <div className="bg-gradient-to-br from-[#ED254E]/10 to-[#C1121F]/10 border-l-4 border-[#ED254E] rounded-lg p-8 my-12">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Ready to Add Online Pricing to Your HVAC Business?
        </h3>
        <p className="text-lg mb-6">
          Learn how Contractor Commerce enables HVAC contractors to offer transparent online pricing that builds trust with Millennial homeowners, increases lead volume, and gives you the early-adopter advantage.
        </p>
        <a 
          href="https://go.st-hacks.cc/contractor-commerce" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          data-testid="link-contractor-commerce-cta"
        >
          Learn More About Online Pricing
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <h2>External Sources</h2>
      <ul>
        <li>Statista: "Online research before purchase among U.S. consumers." <a href="https://www.statista.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.statista.com</a></li>
        <li>Salesforce: "State of the Connected Customer." <a href="https://www.salesforce.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.salesforce.com</a></li>
        <li>Google: "Search Quality Evaluator Guidelines." <a href="https://developers.google.com/search" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://developers.google.com/search</a></li>
      </ul>
    </div>
  ),
  "how-to-sell-saas-to-home-service-contractors": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        Selling software to residential home-service companies is fundamentally different from selling to typical SMBs or agencies. HVAC, plumbing, electrical, roofing, pest control, and garage door contractors operate in a real-time, pressure-driven environment where every workflow must be fast, simple, and reliable.
      </p>
      
      <p>
        I spent more than a decade operating a residential HVAC company that earned a spot on the Inc. 5000 list. During that time, I personally developed my own internal applications (front-end and backend), integrated with countless APIs, and tested nearly every field-service management platform and third-party app on the market: ServiceTitan, Housecall Pro, Jobber, ServiceM8, FieldEdge, Workiz, and dozens more.
      </p>

      <p>
        I've lived through the adoption challenges, the failed implementations, the churn triggers, and the small handful of products that actually delivered value.
      </p>

      <p>
        This guide is designed for SaaS companies, integration partners, and third-party providers who want to build and sell successfully into the home-service vertical.
      </p>

      <h2>1. Why Selling to Contractors Is Different</h2>

      <p>
        Residential contractors are extremely busy, constantly interrupted, and rarely operating in controlled environments. Even if they use ServiceTitan or other FSM platforms, their daily workflow is chaotic.
      </p>

      <p>Most contractors and their staff:</p>
      <ul>
        <li>are non-technical</li>
        <li>struggle with learning new software</li>
        <li>have zero tolerance for complex workflows</li>
        <li>rely heavily on field technicians who dislike extra steps</li>
        <li>prefer tools that "just work" without training</li>
      </ul>

      <p>
        If your product requires extra attention or extra steps, adoption will suffer.
      </p>

      <h2>2. Integration With the FSM Must Be Seamless</h2>

      <p>
        If your product claims to integrate with ServiceTitan, Housecall Pro, Jobber, ServiceM8, Workiz, FieldEdge, or any other FSM system, then it must integrate deeply and invisibly.
      </p>

      <p>Contractors will not tolerate:</p>
      <ul>
        <li>duplicate entry</li>
        <li>switching between apps</li>
        <li>manual syncing</li>
        <li>field logins to a separate system</li>
      </ul>

      <p>
        Your goal is to eliminate friction, not reintroduce it.
      </p>

      <p className="font-bold text-xl my-6">
        The golden rule: If a contractor has to "open your app," you will lose adoption.
      </p>

      <p>
        The strongest integrations feel like native functionality.
      </p>

      <h2>3. Field Technicians Will Make or Break Your Product</h2>

      <p>
        Most SaaS vendors underestimate how difficult it is to get field technicians to adopt new tech.
      </p>

      <p>Techs often:</p>
      <ul>
        <li>work in basements and crawlspaces</li>
        <li>deal with poor cell signal</li>
        <li>wear gloves</li>
        <li>hold tools</li>
        <li>rush between jobs</li>
        <li>have little patience for complexity</li>
        <li>did not sign up to be trained on software</li>
      </ul>

      <p>
        Even when I built internal tools for my own company, I saw several fail because field techs didn't accept them. And I was the owner, developer, and decision-maker.
      </p>

      <p>If your product touches the field, it must:</p>
      <ul>
        <li>require little or no training</li>
        <li>support offline use</li>
        <li>load instantly</li>
        <li>mirror their real-world workflow</li>
        <li>remove steps, not add them</li>
      </ul>

      <p>
        If techs dislike the workflow, the entire company will churn.
      </p>

      <h2>4. Offline Capability Is Not Optional</h2>

      <p>Contractors work in environments with unreliable or nonexistent connectivity:</p>
      <ul>
        <li>metal buildings</li>
        <li>basements</li>
        <li>mechanical rooms</li>
        <li>rural areas</li>
        <li>commercial spaces with concrete walls</li>
      </ul>

      <p>
        If your solution breaks without a strong signal, it breaks in the exact moment it's needed most.
      </p>

      <p className="font-bold">
        Build offline-first for any field workflow.
      </p>

      <h2>5. Onboarding Must Be Absolutely Zero-Friction</h2>

      <p>
        Contractors hate onboarding friction more than almost anything else.
      </p>

      <p>
        Avoid asking for logos, business information, hours of operation, service area, or license numbers.
      </p>

      <p>
        Instead, pull all of it automatically from the contractor's website or public data sources.
      </p>

      <p>
        Reduce questions. Remove decisions. Shorten steps.
      </p>

      <p className="font-bold text-xl my-6">
        The onboarding mindset: You can never make onboarding too easy. If you can eliminate a step, eliminate it.
      </p>

      <h2>6. Visit Contractors and Watch Techs Use Your App</h2>

      <p>
        Hands down, the fastest way to improve product-market fit is to:
      </p>
      <ul>
        <li>visit contractors</li>
        <li>observe office workflows</li>
        <li>ride along with techs</li>
        <li>watch them tap through your tool</li>
        <li>identify bottlenecks in real time</li>
        <li>collect honest feedback</li>
      </ul>

      <p>
        Field feedback is brutally honest, which is exactly what you need.
      </p>

      <p>
        If field techs can't use your solution easily, the product will fail no matter how good it looks on paper.
      </p>

      <h2>7. Avoid Onboarding Fees Whenever Possible</h2>

      <p>
        Contractors strongly dislike setup fees, and they will use them as a reason to avoid adopting a new solution.
      </p>

      <p>If you need to cover onboarding labor:</p>
      <ul>
        <li>consider a term commitment</li>
        <li>include a 90-day right to cancel</li>
        <li>align onboarding timing with shoulder seasons</li>
      </ul>

      <p>
        Most contractors will accept a term; they will not accept a large up-front fee.
      </p>

      <h2>8. How Contractors Really Behave at Trade Shows</h2>

      <p>
        Shows like Pantheon, AHR, Service World, and regional expos are packed with vendors. Contractors walk the floor and get bombarded with sales pitches.
      </p>

      <p>They often:</p>
      <ul>
        <li>book 10 to 20 demos</li>
        <li>attend the first half</li>
        <li>hit demo fatigue</li>
        <li>cancel the rest</li>
      </ul>

      <p className="font-bold">Avoid immediate demo pushes.</p>

      <p>Instead:</p>
      <ul>
        <li>ask whether they are evaluating competitors</li>
        <li>ask how far they are into a decision</li>
        <li>nurture slowly after the event</li>
        <li>send value, not pressure</li>
      </ul>

      <p>
        Contractors rarely mean "No." They usually mean "Not right now."
      </p>

      <h2>9. Direct Mail Outperforms Digital Outreach</h2>

      <p>
        Cold emails, cold calls, and LinkedIn messages are rarely effective with contractors.
      </p>

      <p>
        But direct mail works.
      </p>

      <p>
        Every owner checks their physical mail, and high-impact packages stand out. One of the most memorable marketing pieces I ever received was a video mailer, even though it cost ~$50 per unit.
      </p>

      <p>
        If your ACV or LTV justifies it, direct mail can outperform every digital channel.
      </p>

      <h2>10. Contractors Don't Buy on Your Timeline</h2>

      <p>
        Seasonality dictates everything.
      </p>

      <p>Contractors' buying behavior depends on:</p>
      <ul>
        <li>weather</li>
        <li>staffing</li>
        <li>emergencies</li>
        <li>revenue cycles</li>
        <li>busy season</li>
        <li>equipment availability</li>
      </ul>

      <p>
        Pushing during peak season is a guaranteed way to lose deals.
      </p>

      <p>
        Your goal is to stay top-of-mind until timing aligns naturally.
      </p>

      <h2>11. Final Recommendations for SaaS Teams</h2>

      <p>If you want to succeed in the home-service market:</p>
      <ul>
        <li>integrate deeply with the FSM</li>
        <li>eliminate friction everywhere</li>
        <li>avoid complexity in the field</li>
        <li>support offline usage</li>
        <li>remove onboarding burden</li>
        <li>use trade shows strategically</li>
        <li>consider direct mail</li>
        <li>respect seasonal buying cycles</li>
      </ul>

      <p>
        Contractors stay loyal to tools that save time, reduce steps, and make life easier. They churn quickly from tools that add friction or create new work.
      </p>

      <p className="font-bold text-xl my-6">
        Build for their reality, not for your assumptions.
      </p>
    </div>
  ),
  "stop-selling-other-peoples-equipment-build-your-brand": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        The HVAC industry has a problem no one talks about: contractors are defending the reputation of manufacturers that don't care about them, their employees, or their customers.
      </p>
      
      <p>
        Carrier. Lennox. Trane. Rheem. York.<br />
        Big names, shiny logos—and none of them show up when your customer's system fails.
      </p>

      <p>
        When a compressor dies six months after install, who answers the call?<br />
        Not the manufacturer. You do.
      </p>

      <p>
        They'll ship a replacement part, maybe. But that doesn't cover your labor, your overhead, or the hit to your reputation.
        And that "labor warranty" you paid hundreds for? You'll be lucky to recover a fraction of what the job actually costs.
      </p>

      <h2>The Hard Truth</h2>
      
      <p>
        If you don't believe your brand is stronger than theirs, you're burning money every day.
      </p>

      <p>
        It's your responsibility—not an option—to grow your business ethically and maximize profit. You owe that to your team, your customers, and your family.
      </p>

      <p>
        Profit isn't greed. It's fuel. It's how you pay people well, serve customers better, and build a company that's worth buying one day.
      </p>

      <p>
        Every buyer who evaluates your business looks at two things: steady growth and strong margins.<br />
        You can't have either while paying premium prices for someone else's logo.
      </p>

      <h2>The Wake-Up Call: All HVAC Equipment Is Basically the Same</h2>

      <p>
        I've been in this trade for 25 years—residential, commercial, and engineering.<br />
        I hold a degree in HVAC and worked in quality engineering at Liebert (now Vertiv), the world leader in precision cooling for data centers.
      </p>

      <p>
        Liebert systems often cost six figures each and cool server racks worth millions, inside data centers larger than football fields.
        When a system goes down there, it's not "Mrs. Jones calling because she's hot." It's a data center manager panicking over millions in uptime.
        That world taught me that quality and support aren't optional—they're everything.
      </p>

      <p>
        I've also audited the assembly lines at Carrier, Copeland, Rheem, Trane, and Goodman.<br />
        Here's what I found: every major manufacturer must pass third-party UL and AHRI testing in psychrometric chambers.
        That means their equipment is independently verified for performance and safety—not marketing fluff.
      </p>

      <p>
        These factories run world-class quality systems—ISO-certified, automated, and precise. They track tolerances, measure airflow and efficiency, and maintain tight control over process quality.
      </p>

      <p>
        In other words, they're all building to the same standards.
      </p>

      <p>
        Most manufacturers only make the cabinets, coils, heat exchangers, and sometimes their own thermostats.<br />
        Everything else comes from the same suppliers:
      </p>

      <ul>
        <li><strong>Pressure switches:</strong> Honeywell, White-Rodgers</li>
        <li><strong>Motors:</strong> GE, Emerson</li>
        <li><strong>Circuit boards:</strong> Honeywell, White-Rodgers</li>
        <li><strong>Fan blades:</strong> Lau, Dayton</li>
        <li><strong>Flame sensors:</strong> Honeywell, Robertshaw</li>
        <li><strong>Inducer motors:</strong> Fasco</li>
        <li><strong>Compressors:</strong> Copeland</li>
        <li><strong>Contactors:</strong> White-Rodgers, Packard, Eaton</li>
        <li><strong>Capacitors:</strong> Titan, AmRad</li>
      </ul>

      <p>
        Procurement departments constantly push for lower-cost parts—and they always win.<br />
        So why are the "name brands" more expensive?<br />
        Because you're paying for their marketing, not their materials.<br />
        Some even charge you to sell their logo.
      </p>

      <h2>When I Woke Up</h2>

      <p>
        Early in my career, I sold Carrier, Lennox, and Trane—because I thought I needed their brand to close sales.<br />
        But every time those systems failed, I was the one showing up to fix them.
      </p>

      <p>
        Let's be honest: they all fail at about the same rate. I've installed thousands.
      </p>

      <p>
        So I stopped selling their brand and started selling mine.<br />
        We even designed custom nameplates to fit perfectly in the blank spaces.
      </p>

      <p>
        Then I joined Goodman's private-label program for three specific reasons:
      </p>

      <ol>
        <li>They were 100% on board with me putting my brand on everything and even provided blanks for labeling.</li>
        <li>Their equipment cost roughly 20% less than other brands, allowing us to keep significantly more profit per install.</li>
        <li>Every system came with a 10-year parts and labor warranty backed by Goodman, proving they stood behind their product.</li>
      </ol>

      <p>
        We didn't lose sales. We gained them.<br />
        Customers trusted our brand, not a corporate logo.<br />
        Even as one of the highest-priced companies in town, we still won—because confidence sells.
      </p>

      <h2>The Truth Nobody Else Will Tell You</h2>

      <p>
        You'll never hear this at a dealer meeting or read it in a manufacturer brochure.<br />
        If you want a company that lasts, stop building someone else's brand.
      </p>

      <p>
        Buy the best-value equipment.<br />
        Put your name on it.<br />
        Stand behind it.
      </p>

      <p>
        Because the only logo your customer truly cares about is the one on the truck that shows up when their system breaks.
      </p>

      <p className="font-bold text-lg">
        That logo should be yours.
      </p>
    </div>
  ),
  "should-i-switch-to-servicetitan": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        If your home-service business is doing $5M+ in annual revenue and you're prepared to invest six months and $10K–$30K in expert implementation support, ServiceTitan can transform how you operate. If you're smaller or still building basic processes, wait until your systems are mature enough to handle the transition.
      </p>

      <h2>1. The Right Time to Switch</h2>
      
      <p>
        ServiceTitan is built for growing contractors with strong operations—typically $5M or more in annual revenue. At that size, manual processes create bottlenecks and blind spots. ServiceTitan replaces scattered systems with one platform that controls dispatch, sales, and reporting.
      </p>

      <h2>2. What You'll Gain</h2>
      
      <ul>
        <li><strong>Operational Control:</strong> One source of truth for every department.</li>
        <li><strong>Real-Time Data:</strong> Live dashboards showing KPIs, booking rates, and revenue trends.</li>
        <li><strong>Automation:</strong> Fewer manual tasks through built-in integrations and APIs.</li>
        <li><strong>Scalability:</strong> Perfect for multi-location or departmental expansion.</li>
      </ul>

      <h2>3. What You'll Need to Budget For</h2>

      <p>
        ServiceTitan's monthly fee is only part of the investment. Plan for third-party implementation and optimization—experts who customize automations, dashboards, and reporting.
      </p>
      
      <p>
        <strong>Expect $10K–$30K in additional setup costs during the first six months.</strong>
      </p>

      <h2>4. The Realistic Timeline</h2>

      <p>
        While initial setup may happen in 60–90 days, full implementation takes about six months. That's the time required for process alignment, user adoption, and reliable data output.
      </p>

      <h2>5. Who Should Wait</h2>

      <p>
        If your company is below $3–5M, lacks documented processes, or doesn't consistently track KPIs, hold off. ServiceTitan multiplies existing structure—it doesn't build it for you.
      </p>

      <h2>6. Bottom Line</h2>

      <p>
        ServiceTitan becomes the backbone of a data-driven company when paired with mature systems and outside expertise. For contractors ready to scale, it delivers clarity, control, and growth. For those still building foundations, it's better to wait and prepare.
      </p>
    </div>
  ),
  "dmaic-process-improvement-framework": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black">
      <p className="lead">
        Most business coaches talk about systems and processes—and they're not wrong.
        You can't scale chaos. You need structure.
      </p>

      <p>
        A lot of them will sell you their own systems, and that's totally fine.
        Starting with a pre-built process gives you a solid foundation.
      </p>

      <p>
        But let me ask you this:<br />
        What happens when that process doesn't fully fit your team?<br />
        What do you do when something keeps breaking, and you're tired of putting out fires?<br />
        How do you improve it without rebuilding everything from scratch?
      </p>

      <p>
        That's where DMAIC comes in.<br />
        It's a structured process improvement framework that's been around for decades.
      </p>

      <p>
        DMAIC was developed as part of the Six Sigma movement in the 1980s.
      </p>

      <p>
        Companies like Motorola and GE used it on the manufacturing floor to eliminate waste, reduce defects, and drive consistency.
        It gave them a way to fix broken processes—permanently—and measure the impact over time.
      </p>

      <h2>The DMAIC Framework</h2>

      <p>It stands for:</p>

      <ul>
        <li><strong>Define</strong></li>
        <li><strong>Measure</strong></li>
        <li><strong>Analyze</strong></li>
        <li><strong>Improve</strong></li>
        <li><strong>Control</strong></li>
      </ul>

      <p>
        I learned DMAIC while working at Vertiv, where we manufactured precision A/C systems for data centers.
        I was a field quality engineer helping contractors across the country improve installation and service processes.
        When something went wrong, we didn't guess.
        We followed DMAIC to identify what broke and why—then built in controls to make sure it didn't happen again.
      </p>

      <h2>When to Use DMAIC in Your Business</h2>

      <p>It works the same way in a home service business. Use it when:</p>

      <ul>
        <li>Your CSRs are inconsistent</li>
        <li>Your installs are sloppy or unpredictable</li>
        <li>You're getting callbacks</li>
        <li>Or things feel inefficient but no one's sure where the bottleneck is</li>
      </ul>

      <h2>How I Used It in My Own Company</h2>

      <p>
        In my own HVAC company, I mapped out our entire install process using a swim lane chart.
        Every role. Every step. Sales. Warehouse. Install crew. Quality control.
      </p>

      <p>
        I printed it out and hung it in the warehouse so the whole team could see it.
        We used it for training. And anytime something went wrong on a job, we marked it directly on the chart with a red pen.
        Once enough marks showed up in one area, we revised that section of the process, reprinted the chart, and improved it.
      </p>

      <p className="font-bold text-lg">
        That wall became our feedback loop.<br />
        The process didn't live in a binder. It lived where everyone could see it, follow it, and make it better over time.
      </p>
    </div>
  ),
  "ai-automation-contractors-where-to-start": (
    <div className="prose prose-lg max-w-none text-black [&_p]:text-black [&_li]:text-black [&_h2]:text-black [&_h3]:text-black [&_table]:text-black [&_th]:text-black [&_td]:text-black">
      <p className="lead">
        Everyone's talking about AI. Every podcast, every conference, every sales pitch.
      </p>

      <p>
        You've probably tried ChatGPT. Maybe you asked it to write an email or come up with a slogan. It worked. Sort of.
      </p>

      <p>
        But when you think about using AI or automation in your actual business—the one with technicians, customers, and chaos—it feels overwhelming. Where do you even start?
      </p>

      <p>
        Let me break it down the way I wish someone had explained it to me.
      </p>

      <h2>Automation vs AI: What's the Difference?</h2>

      <p>
        Let's get clear on what we're talking about. These terms get thrown around like they mean the same thing. They don't.
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Automation</th>
            <th>AI (Artificial Intelligence)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>What it does</strong></td>
            <td>Follows rules you set</td>
            <td>Makes decisions based on patterns</td>
          </tr>
          <tr>
            <td><strong>Example</strong></td>
            <td>Send a text confirmation 24 hours before every job</td>
            <td>Summarize a 15-minute service call into 3 bullet points</td>
          </tr>
          <tr>
            <td><strong>When to use it</strong></td>
            <td>Repetitive tasks you do the same way every time</td>
            <td>Tasks that require reading, writing, or understanding context</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Bottom line:</strong> Automation handles the boring stuff. AI handles the thinking stuff.
      </p>

      <h2>You Can't Automate Chaos</h2>

      <p>
        Here's the mistake I see contractors make over and over: they try to automate before they have a process.
      </p>

      <p>
        If your team doesn't follow the same steps twice, automation won't fix that. It'll just scale the chaos faster.
      </p>

      <p>
        Before you automate anything, ask yourself:
      </p>

      <ul>
        <li>Do we have a clear process for this?</li>
        <li>Does everyone on the team follow it the same way?</li>
        <li>Can I write down the steps in order?</li>
      </ul>

      <p>
        If the answer is no, fix your process first. Then automate it.
      </p>

      <h2>Map Before You Automate</h2>

      <p>
        The best way to find what's worth automating? Map your workflow using a Swim Lane Chart.
      </p>

      <p>
        A swim lane chart shows every step in a process—and who's responsible for it.
      </p>

      <p>
        In my HVAC company, I mapped our install process. Sales. Dispatch. Warehouse. Install crew. Quality check.
      </p>

      <p>
        I printed it poster-size and hung it in the warehouse. Anytime something went wrong on a job, we marked it with a red pen.
      </p>

      <p>
        After a month, the red marks showed us exactly where the bottlenecks were. Those were the areas we automated first.
      </p>

      <p>
        Once you can see the whole workflow, you'll notice patterns:
      </p>

      <ul>
        <li>Handoffs between people that always cause delays</li>
        <li>Repetitive tasks that waste time</li>
        <li>Steps that get skipped because no one owns them</li>
      </ul>

      <p>
        Those are your automation targets.
      </p>

      <h2>Simple Automation Wins</h2>

      <p>
        Start with the stuff that doesn't require AI. Just automate the repetitive tasks your team already does.
      </p>

      <h3>1. Appointment Confirmations</h3>
      <p>
        Set up automated text confirmations 24 hours before every job. Include the tech's name, arrival window, and a link to reschedule.
      </p>
      <p>
        <strong>Why it works:</strong> Reduces no-shows. Saves your CSRs from making confirmation calls.
      </p>

      <h3>2. Task Creation After a Sale</h3>
      <p>
        When a job is sold, automatically create tasks in ServiceTitan: order permits, schedule install date, assign warehouse prep.
      </p>
      <p>
        <strong>Why it works:</strong> Nothing falls through the cracks. No one forgets to pull permits.
      </p>

      <h3>3. Follow-Up Sequences</h3>
      <p>
        After an install, trigger an automated sequence: send a satisfaction survey on day 3, request a review on day 7, offer a maintenance plan on day 30.
      </p>
      <p>
        <strong>Why it works:</strong> Keeps you top of mind. Turns one-time customers into repeat buyers.
      </p>

      <h3>4. Internal Notifications</h3>
      <p>
        Set up alerts when something needs attention: a high-priority lead comes in, a job goes over budget, or a tech clocks more than 10 hours.
      </p>
      <p>
        <strong>Why it works:</strong> You catch problems before they blow up.
      </p>

      <h2>Add AI Smartly</h2>

      <p>
        Once you've automated the repetitive stuff, AI can handle the tasks that require thinking.
      </p>

      <h3>Use Case 1: Summarize Service Calls</h3>
      <p>
        Record your CSR calls and use AI to summarize them into bullet points. Customer name. Issue. Next steps.
      </p>
      <p>
        <strong>Why it works:</strong> Faster handoffs to techs. Easier to review later. No more "wait, what did they say?"
      </p>

      <h3>Use Case 2: Rewrite Pricebook Descriptions</h3>
      <p>
        Your techs write pricebook items in technical language: "Replace capacitor, clean condenser coil."
      </p>
      <p>
        AI can rewrite them in homeowner language: "Keep your AC running smoothly all summer with a thorough cleaning and part replacement."
      </p>
      <p>
        <strong>Why it works:</strong> Customers understand what they're buying. Conversion rates go up.
      </p>

      <h3>Use Case 3: Employee Handbook Chatbot</h3>
      <p>
        Upload your employee handbook to an AI tool and let your team ask it questions.
      </p>
      <p>
        "How many vacation days do I get?" "What's the uniform policy?" "How do I request time off?"
      </p>
      <p>
        <strong>Why it works:</strong> Employees get instant answers. You stop answering the same questions over and over.
      </p>

      <h3>Use Case 4: Generate Marketing Content</h3>
      <p>
        Use AI to draft social media posts, email campaigns, or blog articles based on your voice and past content.
      </p>
      <p>
        <strong>Why it works:</strong> Consistent content. Less time writing. More time running your business.
      </p>

      <h2>The Crawl → Walk → Run Framework</h2>

      <p>
        Don't try to do everything at once. Here's the order I recommend:
      </p>

      <h3>Crawl: Fix Your Process</h3>
      <ul>
        <li>Map your workflows using swim lane charts</li>
        <li>Document your processes</li>
        <li>Train your team to follow them consistently</li>
      </ul>

      <h3>Walk: Automate the Repetitive Stuff</h3>
      <ul>
        <li>Start with appointment confirmations</li>
        <li>Add task automation for post-sale workflows</li>
        <li>Set up follow-up sequences</li>
      </ul>

      <h3>Run: Layer in AI</h3>
      <ul>
        <li>Summarize calls and notes</li>
        <li>Rewrite pricebook descriptions</li>
        <li>Build internal knowledge bots</li>
      </ul>

      <p>
        Most contractors try to run before they crawl. Don't be that guy.
      </p>

      <h2>Action Steps: 3 Quick Wins to Start Today</h2>

      <ol>
        <li>
          <strong>Turn on automated appointment confirmations.</strong> If you're using ServiceTitan, this takes 10 minutes. Set it up and forget it.
        </li>
        <li>
          <strong>Pick one repetitive task and automate it.</strong> Could be creating tasks after a sale, sending follow-up emails, or notifying your team when a lead comes in.
        </li>
        <li>
          <strong>Try AI for one thing this week.</strong> Summarize a service call. Rewrite a pricebook description. Ask ChatGPT to draft a social media post. Just try it.
        </li>
      </ol>

      <h2>Final Thought</h2>

      <p>
        AI and automation aren't magic. They multiply what you already have.
      </p>

      <p>
        If your process is broken, automation will make it break faster.<br />
        If your process is solid, automation will make you unstoppable.
      </p>

      <p className="font-bold text-lg">
        Fix your process first. Then let AI and automation do the heavy lifting.
      </p>

      <div className="bg-primary/5 p-8 rounded-lg my-8 not-prose">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Ready to Learn More?
        </h3>
        <p className="text-base mb-4">
          Join 5,000+ contractors in the ServiceTitan Hacks Facebook Group where we share automation workflows, AI tips, and real-world examples every week.
        </p>
        <a 
          href="https://www.facebook.com/groups/servicetitanhacks" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Join the Facebook Group
        </a>
      </div>
    </div>
  )
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug || "";
  
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ServiceTitan Hacks Blog`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }
    }

    return () => {
      document.title = "ServiceTitan Hacks";
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20 px-6">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const ogImageUrl = post.ogImage 
    ? post.ogImage
    : (typeof post.image === 'string' && post.image.startsWith('http') 
      ? post.image 
      : `https://servicetitanhacks.com${post.image}`);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${post.title} | ServiceTitan Hacks Blog`}
        description={post.excerpt}
        keywords={`${post.category}, HVAC, ServiceTitan, ${post.title}`}
        canonicalUrl={`https://servicetitanhacks.com/blog/${post.slug}`}
        ogImage={ogImageUrl}
        ogType="article"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden bg-[#1F1F1F]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Back to Blog Link */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2" data-testid="button-back-to-blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading" style={{ fontFamily: 'Oxygen, sans-serif' }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-black mb-12 pb-8 border-b">
            <div className="flex items-center gap-3">
              <img
                src={billBrownProfile}
                alt="Bill Brown"
                className="w-12 h-12 rounded-full object-cover"
                data-testid="img-author-profile"
              />
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Content */}
          {blogPostContent[slug] ? (
            blogPostContent[slug]
          ) : (
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-black leading-relaxed mb-12">
                {post.excerpt}
              </p>
              
              {/* Coming Soon Message for posts without full content */}
              <div className="bg-muted/50 rounded-lg p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 font-heading">
                  Full Article Coming Soon
                </h2>
                <p className="text-black mb-8 max-w-2xl mx-auto">
                  We're working on bringing you the complete article with in-depth insights, actionable strategies, and real-world examples. Check back soon!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/blog">
                    <Button variant="outline" size="lg">
                      Browse More Articles
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg">
                      Get Notified
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Connect with Bill Section */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-4 font-heading">Connect with Bill</h3>
            <p className="text-black mb-6">
              Have questions or want to discuss this article? Reach out directly or connect with me on social media:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:bill@st-hacks.com"
                className="inline-flex items-center gap-2"
                data-testid="link-email"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  bill@st-hacks.com
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/billbrown80/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                data-testid="link-linkedin"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>
              </a>
              <a
                href="https://www.facebook.com/billbrown80"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                data-testid="link-facebook"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </a>
              <a
                href="https://www.facebook.com/groups/servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                data-testid="link-facebook-group"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 13.5h-3.894v7.5h-3v-7.5H8.106V10.5H11V8.356c0-2.984 1.826-4.606 4.484-4.606.938 0 1.922.067 2.178.098v2.531h-1.495c-1.173 0-1.401.558-1.401 1.376V10.5h2.806l-.678 3z"/>
                  </svg>
                  Join Facebook Group
                </Button>
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
