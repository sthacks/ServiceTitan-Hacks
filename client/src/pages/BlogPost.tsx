import { useEffect } from "react";
import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import serviceTitanDashboardImage from "@assets/32492017-1_1762522874097.jpg";

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
  },
  {
    id: "4",
    title: "5 AI Tools Every ServiceTitan Contractor Should Use in 2025",
    excerpt: "Discover the top AI-powered tools that are transforming how home service contractors work, from automated scheduling to smart pricing optimization.",
    author: "Bill Brown",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    slug: "5-ai-tools-servicetitan-contractors-2025"
  },
  {
    id: "5",
    title: "How to Double Your Booking Rate with Better Forms",
    excerpt: "Learn the exact strategies top contractors use to convert more website visitors into booked jobs with optimized online forms.",
    author: "Bill Brown",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Growth Strategy",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    slug: "double-booking-rate-better-forms"
  },
  {
    id: "6",
    title: "ServiceTitan Dashboard Hacks: 10 Metrics You Should Track Daily",
    excerpt: "Stop drowning in data. Here are the 10 essential metrics that actually move the needle in your HVAC, plumbing, or electrical business.",
    author: "Bill Brown",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "ServiceTitan Tips",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    slug: "servicetitan-dashboard-metrics"
  },
  {
    id: "7",
    title: "The Ultimate Guide to Automating Follow-Up Calls",
    excerpt: "Automate your follow-up process without losing the personal touch. Save hours every week while improving customer satisfaction.",
    author: "Bill Brown",
    date: "December 28, 2024",
    readTime: "8 min read",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=400&fit=crop",
    slug: "automate-follow-up-calls"
  },
  {
    id: "8",
    title: "Why Your Pricebook Descriptions Are Costing You Money",
    excerpt: "Technical jargon kills conversions. Learn how to write pricebook descriptions that homeowners actually understand and buy from.",
    author: "Bill Brown",
    date: "December 20, 2024",
    readTime: "5 min read",
    category: "Sales Strategy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    slug: "pricebook-descriptions-costing-money"
  },
  {
    id: "9",
    title: "Equipment Buying 101: How to Get the Pricing Big Companies Get",
    excerpt: "Small contractors can access the same pricing as large national chains. Here's exactly how to do it without complicated processes.",
    author: "Bill Brown",
    date: "December 15, 2024",
    readTime: "6 min read",
    category: "Business Operations",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop",
    slug: "equipment-buying-guide"
  }
];

// Full article content
const blogPostContent: Record<string, JSX.Element> = {
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <div className="flex items-center gap-2">
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
        </article>
      </main>
      <Footer />
    </div>
  );
}
