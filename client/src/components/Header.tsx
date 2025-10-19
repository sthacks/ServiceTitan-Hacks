import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/secondary logo_1760895642629.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/courses", label: "Courses" },
    { path: "/tools", label: "Tools" },
    { path: "/partners", label: "Partners" },
    { path: "/resources", label: "Free Stuff" },
    { path: "/podcast", label: "Podcast" },
    { path: "/all-access", label: "All-Access Pass" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home-logo">
            <span className="flex items-center cursor-pointer">
              <img src={logoImage} alt="ServiceTitan Hacks Logo" className="h-16 md:h-20" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    location === link.path
                      ? "text-primary"
                      : "text-white hover:text-gray-300"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden text-white hover:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                      location === link.path
                        ? "text-primary bg-gray-800"
                        : "text-white hover:text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
