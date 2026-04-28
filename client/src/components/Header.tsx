import { Link, useLocation } from "wouter";
import { Menu, X, LogIn, LogOut, Shield, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/secondary logo_1760895642629.png";
import { useAuth } from "@/hooks/useAuth";

const appsAndToolsLinks = [
  { path: "/pricebook-overhaul", label: "Pricebook Overhaul" },
  { path: "/servicetitan-automation-services", label: "Automations" },
];

const resourcesLinks = [
  { path: "/blog", label: "Blog" },
  { path: "/podcast", label: "Podcast" },
  { path: "/events", label: "Events" },
  { path: "/partners", label: "Partners" },
  { path: "/purchasing-platform", label: "HVAC Equipment Purchasing Platform" },
];

function DropdownMenu({
  label,
  links,
  currentPath,
}: {
  label: string;
  links: { path: string; label: string }[];
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = links.some((l) => l.path === currentPath);

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          isActive ? "text-primary" : "text-white hover:text-gray-300"
        }`}
        onClick={() => setOpen((v) => !v)}
        data-testid={`button-nav-dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute top-full left-0 mt-1 w-64 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg py-1 z-50 transition-all ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <span
              className={`block px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                currentPath === link.path
                  ? "text-primary bg-white/5"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setOpen(false)}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAppsOpen, setMobileAppsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home-logo">
            <span className="flex items-center cursor-pointer">
              <img
                src={logoImage}
                alt="ServiceTitan Hacks Logo"
                className="h-16 md:h-20"
                style={{ paddingTop: "5px", paddingBottom: "5px" }}
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/resources">
              <span
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  location === "/resources" ? "text-primary" : "text-white hover:text-gray-300"
                }`}
                data-testid="link-nav-free-stuff"
              >
                Free Stuff
              </span>
            </Link>

            <Link href="/courses">
              <span
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  location === "/courses" ? "text-primary" : "text-white hover:text-gray-300"
                }`}
                data-testid="link-nav-courses"
              >
                Courses
              </span>
            </Link>

            <DropdownMenu label="Apps & Tools" links={appsAndToolsLinks} currentPath={location} />
            <DropdownMenu label="Resources" links={resourcesLinks} currentPath={location} />

            <a
              href="https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer text-white hover:text-gray-300"
                data-testid="link-nav-all-access-pass"
              >
                All-Access Pass
              </span>
            </a>

            <a
              href="https://www.facebook.com/groups/servicetitanhacks"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-nav-facebook-group"
            >
              <Button size="sm" className="ml-1">
                Join Facebook Group
              </Button>
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated && user?.isAdmin && (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  data-testid="button-admin"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
                onClick={() => (window.location.href = "/api/logout")}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300"
                onClick={() => (window.location.href = "/api/login")}
                data-testid="button-login"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

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

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col gap-1">
              <Link href="/resources">
                <span
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                    location === "/resources"
                      ? "text-primary bg-white/10"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-free-stuff"
                >
                  Free Stuff
                </span>
              </Link>

              <Link href="/courses">
                <span
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                    location === "/courses"
                      ? "text-primary bg-white/10"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-courses"
                >
                  Courses
                </span>
              </Link>

              {/* Apps & Tools accordion */}
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileAppsOpen((v) => !v)}
                data-testid="button-mobile-apps-tools"
              >
                Apps & Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileAppsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAppsOpen && (
                <div className="pl-4">
                  {appsAndToolsLinks.map((link) => (
                    <Link key={link.path} href={link.path}>
                      <span
                        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                          location === link.path
                            ? "text-primary bg-white/10"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                        onClick={() => { setMobileMenuOpen(false); setMobileAppsOpen(false); }}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Resources accordion */}
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileResourcesOpen((v) => !v)}
                data-testid="button-mobile-resources"
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-4">
                  {resourcesLinks.map((link) => (
                    <Link key={link.path} href={link.path}>
                      <span
                        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                          location === link.path
                            ? "text-primary bg-white/10"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                        onClick={() => { setMobileMenuOpen(false); setMobileResourcesOpen(false); }}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              <a
                href="https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="block px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-all-access-pass"
                >
                  All-Access Pass
                </span>
              </a>

              <a
                href="https://www.facebook.com/groups/servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 pt-2"
                data-testid="button-mobile-facebook-group"
              >
                <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Join Facebook Group
                </Button>
              </a>

              <div className="mt-2 pt-2 border-t border-gray-700">
                {isAuthenticated && user?.isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-primary hover:text-primary/80 hover:bg-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="button-mobile-admin"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                    onClick={() => (window.location.href = "/api/logout")}
                    data-testid="button-mobile-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                    onClick={() => (window.location.href = "/api/login")}
                    data-testid="button-mobile-login"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
