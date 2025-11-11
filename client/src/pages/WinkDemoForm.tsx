import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";

export default function WinkDemoForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const winkDemoMutation = useMutation({
    mutationFn: async (data: { firstName: string; lastName: string; email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo", data);
      return response.json();
    },
    onSuccess: () => {
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
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Book a Demo with Wink Toolbox | ServiceTitan Hacks"
        description="Schedule a personalized demo of Wink Toolbox and see how you can eliminate your reporting bottlenecks and unlock your growth metrics."
        keywords="Wink Toolbox, ServiceTitan integration, contractor reporting, business intelligence, demo"
        canonicalUrl="https://servicetitanhacks.com/partners/wink-toolbox/book-demo"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-2xl px-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/partners/wink-toolbox")}
              className="mb-8"
              data-testid="button-back-to-wink"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wink Toolbox
            </Button>

            <div className="mb-8 flex items-center justify-center">
              <img
                src={winkLogo}
                alt="Wink Toolbox logo"
                className="object-contain max-h-24 w-auto"
                data-testid="img-wink-logo"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-heading text-center">Book a Demo with Wink</CardTitle>
                <CardDescription className="text-center text-base">
                  Enter your details below to schedule a personalized demo with the Wink team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      data-testid="input-firstname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your last name"
                      data-testid="input-lastname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      data-testid="input-email"
                    />
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: "absolute", left: "-9999px" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <p className="text-sm text-muted-foreground">
                    After submitting, you'll be redirected to Wink's scheduling page to choose your demo time.
                  </p>
                  <Button 
                    type="submit" 
                    disabled={winkDemoMutation.isPending} 
                    className="w-full"
                    data-testid="button-submit"
                  >
                    {winkDemoMutation.isPending ? "Submitting..." : "Continue to Schedule"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
