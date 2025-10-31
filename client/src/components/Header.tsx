import { Link, useLocation } from "wouter";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/secondary logo_1760895642629.png";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const navLinks = [
    { path: "/courses", label: "Courses" },
    { path: "/tools", label: "Tools" },
    { path: "/purchasing-platform", label: "Buying Group" },
    { path: "/partners", label: "Partners" },
    { path: "/resources", label: "Free Stuff" },
    { path: "https://www.servicetitanhacks.com/bundles/servicetitan-hacks-all-access-pass", label: "All-Access Pass", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home-logo">
            <span className="flex items-center cursor-pointer">
              <img src={logoImage} alt="ServiceTitan Hacks Logo" className="h-16 md:h-20 py-[25px]" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.path} href={link.path} target="_blank" rel="noopener noreferrer">
                  <span
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer text-white hover:text-gray-300"
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </a>
              ) : (
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
              )
            ))}
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
                onClick={() => window.location.href = "/api/logout"}
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
                onClick={() => window.location.href = "/api/login"}
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
              
              <div className="mt-2 pt-2 border-t border-gray-800">
                {isAuthenticated && user?.isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-primary hover:text-primary/80 hover:bg-gray-800"
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
                    className="w-full justify-start text-white hover:text-gray-300 hover:bg-gray-800"
                    onClick={() => window.location.href = "/api/logout"}
                    data-testid="button-mobile-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-gray-300 hover:bg-gray-800"
                    onClick={() => window.location.href = "/api/login"}
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
