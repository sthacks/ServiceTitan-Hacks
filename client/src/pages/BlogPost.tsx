import { useEffect } from "react";
import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import serviceTitanDashboardImage from "@assets/32492017-1_1762522874097.jpg";
import billBrownProfile from "@assets/red shirt round_1763150613592.png";

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
}

const blogPosts: BlogPost[] = [
  {
    id: "5",
    title: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional",
    excerpt: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory if you want to capture the next decade of HVAC replacement business.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "11 min read",
    category: "Marketing",
    image: "/blog-millennials-pricing.png",
    slug: "selling-hvac-systems-to-millennials-online-pricing"
  },
  {
    id: "4",
    title: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors",
    excerpt: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company and implementing dozens of software solutions.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "12 min read",
    category: "Business Operations",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "how-to-sell-saas-to-home-service-contractors"
  },
  {
    id: "1",
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead",
    excerpt: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    author: "Bill Brown",
    date: "January 22, 2025",
    readTime: "8 min read",
    category: "Business Operations",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop",
    slug: "stop-selling-other-peoples-equipment-build-your-brand"
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
    slug: "dmaic-process-improvement-framework"
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
    slug: "should-i-switch-to-servicetitan"
  }
];

// Full article content
const blogPostContent: Record<string, JSX.Element> = {
  "selling-hvac-systems-to-millennials-online-pricing": (
    <div className="prose prose-lg max-w-none">
      <p className="lead">
        For the past 20 years, most residential HVAC replacements have been purchased by Baby Boomers and Gen X homeowners. These generations bought HVAC systems long before online research became the norm, so traditional "call for price" or "schedule an estimate first" sales processes worked.
      </p>
      
      <p>
        But the next decade will not look like the last one.
      </p>

      <p>
        Millennials are now the largest adult generation in the U.S., and although their home-ownership rate lags behind Boomers, they represent a rapidly rising share of first-time buyers. As this demographic becomes a larger percentage of your customer base, their digital expectations will determine who wins HVAC replacement business.
      </p>

      <p>
        This article explains why offering transparent online pricing, at least in the form of credible price ranges, is becoming mandatory — not optional — if you want to win the Millennial homeowner.
      </p>

      <h2>1. Millennials Expect Accessible Online Information, Not Phone-Call Gatekeeping</h2>

      <p>The shift in buyer expectations is measurable:</p>

      <p className="font-semibold">Fact:</p>
      <p>
        A 2023 Statista survey reported that 84% of U.S. consumers research products online before making a purchase, even for high-ticket categories.
      </p>

      <p className="font-semibold">Fact:</p>
      <p>
        A report by Salesforce found that millennials are significantly more likely than older generations to prefer digital self-service during the buying process, including online research and online price discovery.
      </p>

      <p>
        If you're a millennial and you've been on the Internet purchasing things your entire life, and you see the "Call for Price" tab, the feeling is: I'm not going to call you.
      </p>

      <p>
        This is not theory. It is demonstrated behavior in every major consumer category.
      </p>

      <p>
        When a younger homeowner lands on a contractor's website and cannot find even a ballpark price range, the emotional response is frustration, not curiosity. And frustrated buyers do not pick up the phone.
      </p>

      <p>They simply click the back button.</p>

      <h2>2. Google and AI Results Reward Contractors Who Give People What They Want</h2>

      <p>This insight aligns directly with Marcus Sheridan's keynote:</p>

      <p className="italic">
        "In the future, buyers will not sift through a mountain of blue links. They will get the answer. If AI is not recommending you, you're in trouble."
      </p>

      <p>Today, Google's search algorithm heavily favors pages that provide:</p>
      <ul>
        <li>clear answers</li>
        <li>transparent information</li>
        <li>pricing guidance</li>
        <li>high-intent user experiences</li>
      </ul>

      <p>That reward system is not going away.</p>

      <p className="font-semibold">Fact:</p>
      <p>
        Google confirms in its Search Quality Evaluator Guidelines that websites demonstrating high "E-E-A-T" (Experience, Expertise, Authoritativeness, Trustworthiness) are favored in search rankings. Pricing transparency is directly tied to "trustworthiness" in these guidelines.
      </p>

      <p>
        When your website refuses to answer the very question customers most want answered — "How much does it cost?" — Google has little incentive to rank you.
      </p>

      <p>
        This isn't about beating the algorithm.<br />
        It's about earning the recommendation of both Google and AI-driven search tools.
      </p>

      <h2>3. The "Call for Price" Model Will Quietly Shrink Your Market Share</h2>

      <p className="font-semibold">
        "If you believe that younger buyers could even possibly expect online pricing and you don't change, you will lose market share."
      </p>

      <p>
        That warning aligns directly with Marcus Sheridan's "Big Five" framework — the five topics buyers always research:
      </p>
      <ul>
        <li>Cost</li>
        <li>Problems</li>
        <li>Comparisons</li>
        <li>Reviews</li>
        <li>Best/Top</li>
      </ul>

      <p>
        Every industry that embraces these five topics online gains trust and market exposure. The industries that avoid them lose visibility.
      </p>

      <p>
        Marcus's example from the pool industry is instructive: His company published one pricing article. It eventually generated over $35 million in revenue because it captured early-stage research traffic that competitors ignored.
      </p>

      <p>
        This is not about copying pools.<br />
        It's about understanding buyer psychology across all industries.
      </p>

      <h2>4. The Real Race to the Bottom Is Invisible: Not Being Considered at All</h2>

      <p>A common objection HVAC companies raise is:</p>

      <p className="italic">
        "If I post pricing online, won't it turn into a race to the bottom?"
      </p>

      <p className="font-semibold">
        "The bottom is not even getting the click, not getting the phone call, not getting the booking, not even knowing the customer existed. That's the bottom."
      </p>

      <p>
        Low pricing is not the enemy.<br />
        Invisibility is.
      </p>

      <p>
        If Millennials never see your estimate page because you hide pricing, you lose before the race begins.
      </p>

      <h2>5. Your Website Must Become a Transparent Digital Sales Experience</h2>

      <p>Marcus Sheridan identifies four pillars of a known and trusted brand. Two apply immediately to HVAC contractors:</p>

      <p className="font-semibold">Pillar 1: Say what others refuse to say</p>
      <p>
        Most contractors do not talk directly about cost, problems, comparisons, or alternatives.<br />
        That is why the ones who do become trusted quickly.
      </p>

      <p className="font-semibold">Pillar 3: Sell in ways your competitors are unwilling to sell</p>

      <p>The trend is clear:</p>
      <ul>
        <li>Buyers want to self-educate.</li>
        <li>Buyers want control.</li>
        <li>Buyers want transparency.</li>
        <li>Buyers want to make progress online without a salesperson.</li>
      </ul>

      <p>You can resist that trend or build systems around it.</p>

      <p>What this means for HVAC companies:</p>
      <p>You must consider adding:</p>
      <ul>
        <li>online pricing ranges</li>
        <li>system-level configurators</li>
        <li>"Which system is right for me?" quizzes</li>
        <li>instant estimate tools</li>
        <li>self-schedulers</li>
      </ul>

      <p>These tools increase trust and dramatically improve lead volume.</p>

      <p className="font-semibold">Fact:</p>
      <p>
        Salesforce reports that 66% of customers prefer brands that offer self-service tools, and this preference is stronger among Millennials.
      </p>

      <h2>6. The Perfect HVAC Pricing Page: What It Should Include</h2>

      <p>
        Marcus Sheridan teaches the "Perfect Pricing Page" model.<br />
        You already use these principles in the home. Now bring them online.
      </p>

      <p>A complete pricing page includes:</p>
      <ul>
        <li>factors that increase price</li>
        <li>factors that decrease price</li>
        <li>why different companies charge different rates</li>
        <li>where your pricing generally falls</li>
        <li>package explanations</li>
        <li>upgrades and add-ons</li>
        <li>hidden or unexpected costs</li>
        <li>life-cycle cost comparisons</li>
        <li>financing options</li>
        <li>photos or videos with price ranges</li>
        <li>a pricing estimator</li>
        <li>transparent disclaimers</li>
        <li>educational pricing videos</li>
      </ul>

      <p>
        You know all of this because you explain it to customers daily.
      </p>

      <p>
        Putting it online simply mirrors your real-world expertise.
      </p>

      <h2>7. Online Pricing Will Become Universal. Early Adopters Win.</h2>

      <p>Marcus said:</p>

      <p className="italic">
        "Within five years, every one of your competitors will have a pricing estimator on their site."
      </p>

      <p>This is historically accurate.</p>

      <p>
        The boating industry went from zero manufacturers offering online "Build & Price" to 70% adoption.
      </p>

      <ul>
        <li>Auto manufacturers use it.</li>
        <li>Solar installers use it.</li>
        <li>Roofing companies use it.</li>
        <li>Window and siding companies use it.</li>
      </ul>

      <p>The HVAC industry will follow.</p>

      <p>The only question is who gets the early-adopter advantage.</p>

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
        Because Millennial homeowners don't want sales pressure.<br />
        They want clarity.<br />
        They want control.<br />
        They want trust.
      </p>

      <p className="font-bold text-xl my-6">
        And the contractors who deliver that trust online will dominate the next era of residential HVAC.
      </p>

      <h2>External Sources</h2>
      <ol>
        <li>Statista. "Online research before purchase among U.S. consumers." <a href="https://www.statista.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.statista.com</a></li>
        <li>Salesforce. "State of the Connected Customer." <a href="https://www.salesforce.com/resources/research-reports/state-of-the-connected-customer/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.salesforce.com</a></li>
        <li>Google. "Search Quality Evaluator Guidelines." <a href="https://developers.google.com/search" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://developers.google.com/search</a></li>
        <li>Salesforce. "State of the Connected Customer." (Self-service preference data) <a href="https://www.salesforce.com/resources/research-reports/state-of-the-connected-customer/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.salesforce.com</a></li>
      </ol>
    </div>
  ),
  "how-to-sell-saas-to-home-service-contractors": (
    <div className="prose prose-lg max-w-none">
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
    <div className="prose prose-lg max-w-none">
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
    <div className="prose prose-lg max-w-none">
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
    <div className="prose prose-lg max-w-none">
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
    <div className="prose prose-lg max-w-none">
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

  const ogImageUrl = typeof post.image === 'string' && post.image.startsWith('http') 
    ? post.image 
    : `https://servicetitanhacks.com${post.image}`;

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
          <div className="flex items-center gap-6 text-muted-foreground mb-12 pb-8 border-b">
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
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                {post.excerpt}
              </p>
              
              {/* Coming Soon Message for posts without full content */}
              <div className="bg-muted/50 rounded-lg p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 font-heading">
                  Full Article Coming Soon
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            <p className="text-muted-foreground mb-6">
              Have questions or want to discuss this article? Connect with me on social media:
            </p>
            <div className="flex flex-wrap gap-4">
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
