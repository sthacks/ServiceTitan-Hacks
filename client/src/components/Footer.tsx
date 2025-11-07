import { Link } from "wouter";
import { SiYoutube, SiFacebook, SiLinkedin } from "react-icons/si";
import logoImage from "@assets/secondary logo_1760895642629.png";
import smartACLogo from "@assets/logos.zip - smartac_1762023015702.png";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762022633613.png";
import polycamLogo from "@assets/polycam_1762023015702.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762022633613.png";
import winkLogo from "@assets/logos.zip - 6_1762022633613.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762022633613.png";
import volcaLogo from "@assets/logos.zip - 8_1762023121150.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/partners", label: "Partners" },
    { path: "/tools", label: "Tools" },
    { path: "/courses", label: "Courses" },
    { path: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass", label: "All-Access Pass", external: true },
  ];

  const resourceLinks = [
    { path: "/blog", label: "Blog" },
    { path: "/podcast", label: "Podcast" },
    { path: "/resources", label: "Resources" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const partners = [
    { name: "Volca.AI", logo: volcaLogo, url: "https://go.st-hacks.cc/volca" },
    { name: "Wink Toolbox", logo: winkLogo, url: "https://go.st-hacks.cc/wink" },
    { name: "SmartAC", logo: smartACLogo, url: "https://go.st-hacks.cc/smart-ac" },
    { name: "Contractor Commerce", logo: contractorCommerceLogo, url: "https://go.st-hacks.cc/contractor-commerce" },
    { name: "LiveSwitch", logo: liveswitchLogo, url: "https://go.st-hacks.cc/liveswitch" },
    { name: "Polycam", logo: polycamLogo, url: "https://go.st-hacks.cc/polycam" },
    { name: "Service Crucible", logo: serviceCrucibleLogo, url: "https://go.st-hacks.cc/Service-crucible" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-6">
              <img src={logoImage} alt="ServiceTitan Hacks Logo" className="h-14" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI and automations for ServiceTitan contractors. Grow smarter, automate faster, win more jobs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer">
                      <span className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                        {link.label}
                      </span>
                    </a>
                  ) : (
                    <Link href={link.path}>
                      <span className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                        {link.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="https://www.youtube.com/@servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="link-social-youtube"
              >
                <SiYoutube className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/groups/servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="link-social-facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/st-hacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="link-social-linkedin"
              >
                <SiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-center">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center mb-8">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate transition-all flex items-center justify-center"
                data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`w-auto object-contain ${partner.name === 'SmartAC' || partner.name === 'Contractor Commerce' || partner.name === 'Volca.AI' ? 'h-16' : 'h-12'}`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} ServiceTitan Hacks. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-terms">
                  Terms
                </span>
              </Link>
              <Link href="/privacy-policy">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-privacy">
                  Privacy
                </span>
              </Link>
              <Link href="/sms-privacy-policy">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-sms-privacy">
                  SMS Privacy
                </span>
              </Link>
              <Link href="/sms-terms-conditions">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-sms-terms">
                  SMS Terms
                </span>
              </Link>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-sitemap">
                  Sitemap
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
