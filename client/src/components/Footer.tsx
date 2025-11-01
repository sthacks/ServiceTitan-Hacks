import { Link } from "wouter";
import { SiYoutube, SiFacebook, SiLinkedin } from "react-icons/si";
import logoImage from "@assets/secondary logo_1760895642629.png";
import smartACLogo from "@assets/Partners (1)_1760812144267.png";
import liveswitchLogo from "@assets/liveswitch logo_1762010571776.webp";
import polycamLogo from "@assets/polycam_1762011143447.png";

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
    { name: "Volca.AI", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/ba8/d11/01b/volca.png", url: "https://go.st-hacks.cc/volca" },
    { name: "Free-2-Grow", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/e42/a11/fb9/Free_2_Grow.png", url: "https://go.st-hacks.cc/free-2-grow" },
    { name: "Wink Toolbox", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/ebb/c0e/9fe/wink_logo.png", url: "https://go.st-hacks.cc/wink" },
    { name: "SmartAC", logo: smartACLogo, url: "https://go.st-hacks.cc/smart-ac" },
    { name: "Contractor Commerce", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/3a4/5e2/7c3/1.png", url: "https://go.st-hacks.cc/contractor-commerce" },
    { name: "LiveSwitch", logo: liveswitchLogo, url: "https://go.st-hacks.cc/liveswitch" },
    { name: "Polycam", logo: polycamLogo, url: "https://go.st-hacks.cc/polycam" },
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center mb-8">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate transition-all bg-white rounded-md p-4"
                data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain"
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
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Terms
              </a>
              <Link href="/privacy-policy">
                <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-privacy">
                  Privacy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
