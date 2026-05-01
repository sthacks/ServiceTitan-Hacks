import SEO from "@/components/SEO";
import { ArrowRight, Users, Calendar, Wrench, Key } from "lucide-react";
import billPhoto from "@assets/647706816_34729460389978511_260123712305313039_n (1).jpg";
import sthLogo from "@assets/Horizontal_White_lettering_1767654224442.png";

const paths = [
  {
    icon: Users,
    label: "Join the Free Community",
    description: "10,800+ contractors sharing tips, wins, and ServiceTitan strategies.",
    cta: "Join Free on Facebook",
    href: "https://go.st-hacks.cc/servicetitanhacks",
    external: true,
    featured: true,
  },
  {
    icon: Calendar,
    label: "Register for a Free Webinar",
    description: "Live conversations with real contractors about what's working right now.",
    cta: "See Upcoming Events",
    href: "/events",
    external: false,
    featured: false,
  },
  {
    icon: Wrench,
    label: "Browse Free Tools",
    description: "AI tools, calculators, and automations built specifically for ServiceTitan users.",
    cta: "Explore Free Tools",
    href: "/apps",
    external: false,
    featured: false,
  },
  {
    icon: Key,
    label: "Get All-Access",
    description: "Every course, tool, and monthly live Q&A — unlimited access for one price.",
    cta: "See All-Access Pass",
    href: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass",
    external: true,
    featured: false,
  },
];

export default function BillLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Bill Brown | ServiceTitan Hacks"
        description="Bill Brown helps HVAC and home service contractors grow smarter using AI, automation, and ServiceTitan. Join 10,800+ contractors in the free community."
        canonicalUrl="https://servicetitanhacks.com/bill"
      />

      {/* Logo bar */}
      <div className="py-4 px-6 flex justify-center border-b border-white/10">
        <a href="/">
          <img src={sthLogo} alt="ServiceTitan Hacks" className="h-8 object-contain" />
        </a>
      </div>

      {/* Hero — above the fold */}
      <section className="px-6 pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="max-w-xl mx-auto text-center">

          <img
            src={billPhoto}
            alt="Bill Brown"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#ED254E] ring-offset-2 ring-offset-black"
            data-testid="img-bill"
          />

          <p className="text-[#ED254E] text-xs font-semibold uppercase tracking-widest mb-2">
            Hi, I'm Bill Brown
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            I help HVAC and home service contractors grow faster with ServiceTitan
          </h1>

          <p className="text-white/65 text-base leading-relaxed mb-6">
            I ran an INC 5000 HVAC company. I know what it actually takes. Now I help contractors like you use AI, automation, and smarter systems to win more jobs and stop leaving money on the table.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/50 mb-2">
            <span>Over 10,000 contractors</span>
            <span className="text-white/25">·</span>
            <span>100+ free tutorials</span>
            <span className="text-white/25">·</span>
            <span>INC 5000 operator</span>
          </div>
        </div>
      </section>

      {/* Choose Your Path — prominent */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-2xl mx-auto">

          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-6">
            Choose your path
          </p>

          <div className="flex flex-col gap-4">
            {paths.map((path) => {
              const Icon = path.icon;
              const inner = (
                <div
                  className={`group flex items-center gap-5 p-5 rounded-xl border transition-all cursor-pointer ${
                    path.featured
                      ? "bg-[#ED254E] border-[#ED254E] text-white"
                      : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10"
                  }`}
                  data-testid={`path-${path.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    path.featured ? "bg-white/20" : "bg-white/10"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-base mb-0.5">{path.label}</p>
                    <p className={`text-sm leading-snug ${path.featured ? "text-white/80" : "text-white/55"}`}>
                      {path.description}
                    </p>
                  </div>
                  <ArrowRight className={`flex-shrink-0 w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    path.featured ? "text-white" : "text-white/40"
                  }`} />
                </div>
              );

              return path.external ? (
                <a
                  key={path.label}
                  href={path.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <a key={path.label} href={path.href}>
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="py-6 px-6 border-t border-white/10 text-center text-white/30 text-xs">
        <a href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
        <span className="mx-3">·</span>
        <span>© {new Date().getFullYear()} ServiceTitan Hacks</span>
      </div>
    </div>
  );
}
