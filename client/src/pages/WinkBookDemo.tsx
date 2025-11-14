import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft } from "lucide-react";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";

export default function WinkBookDemo() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const urlParams = new URLSearchParams(window.location.search);
  const prefillFirstName = urlParams.get('firstName') || "";
  const prefillEmail = urlParams.get('email') || "";
  
  const [firstName, setFirstName] = useState(prefillFirstName);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(prefillEmail);
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const winkDemoMutation = useMutation({
    mutationFn: async (data: { firstName: string; lastName: string; email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      
      const calendlyUrl = new URL("https://letsmeet.winktoolbox.com/meetings/wink/team-usa");
      calendlyUrl.searchParams.append("firstName", firstName);
      calendlyUrl.searchParams.append("lastName", lastName);
      calendlyUrl.searchParams.append("email", email);
      calendlyUrl.searchParams.append("a1", "ServiceTitan Hacks");
      
      window.location.href = calendlyUrl.toString();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const autoSaveMutation = useMutation({
    mutationFn: async (data: { firstName?: string; lastName?: string; email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo/autosave", data);
      return response.json();
    },
  });

  const abandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo/abandoned", data);
      return response.json();
    },
  });

  useEffect(() => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSaveMutation.mutate({ firstName, lastName, email });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [email, firstName, lastName]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (email && !formSubmitted) {
        navigator.sendBeacon('/api/wink-demo/abandoned', JSON.stringify({ email }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (email && !formSubmitted) {
        abandonedMutation.mutate({ email });
      }
    };
  }, [email, formSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    winkDemoMutation.mutate({ firstName, lastName, email });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Book a Wink Toolbox Demo - ServiceTitan Hacks"
        description="Schedule a demo with Wink Toolbox to see how they can connect your tech stack, automate workflows, and give you the clarity needed to scale your home service business."
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/partners/wink-toolbox")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wink Toolbox
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={winkLogo} 
                alt="Wink Toolbox" 
                className="h-16 object-contain"
              />
            </div>
            <CardTitle className="text-3xl">Book a Wink Toolbox Demo</CardTitle>
            <CardDescription className="text-base">
              Connect your tech stack, automate workflows, and scale with clarity. Fill out the form below to schedule your personalized demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-base">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    data-testid="input-first-name"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-base">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    required
                    data-testid="input-last-name"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    data-testid="input-email"
                    className="mt-1.5"
                  />
                </div>

                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={winkDemoMutation.isPending}
                data-testid="button-submit"
              >
                {winkDemoMutation.isPending ? "Submitting..." : "Book Demo"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                After submitting, you'll be redirected to schedule your demo at a time that works for you.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
