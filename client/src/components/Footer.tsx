import { Link } from "wouter";
import { SiYoutube, SiFacebook, SiLinkedin } from "react-icons/si";
import logoImage from "@assets/Secondary Logo - 1_1760805018619.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/partners", label: "Partners" },
    { path: "/tools", label: "Tools" },
    { path: "/courses", label: "Courses" },
    { path: "/all-access", label: "All-Access Pass" },
  ];

  const resourceLinks = [
    { path: "/podcast", label: "Podcast" },
    { path: "/resources", label: "Resources" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
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
                  <Link href={link.path}>
                    <span className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                      {link.label}
                    </span>
                  </Link>
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
                href="https://linkedin.com"
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
