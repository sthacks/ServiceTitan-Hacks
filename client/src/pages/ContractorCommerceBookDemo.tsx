import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft } from "lucide-react";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";

export default function ContractorCommerceBookDemo() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numberOfTechs, setNumberOfTechs] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const demoMutation = useMutation({
    mutationFn: async (data: { 
      firstName: string; 
      lastName: string; 
      companyName: string;
      numberOfTechs: string;
      email: string;
      websiteUrl: string;
      cellPhone: string;
    }) => {
      const response = await apiRequest("POST", "/api/contractor-commerce-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      
      toast({
        title: "Demo Request Submitted!",
        description: "We'll be in touch soon to schedule your demo.",
      });
      
      setTimeout(() => {
        setLocation("/partners/contractor-commerce");
      }, 2000);
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
    mutationFn: async (data: { 
      firstName?: string; 
      lastName?: string; 
      companyName?: string;
      numberOfTechs?: string;
      email: string;
      websiteUrl?: string;
      cellPhone?: string;
    }) => {
      const response = await apiRequest("POST", "/api/contractor-commerce-demo/autosave", data);
      return response.json();
    },
  });

  const abandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/contractor-commerce-demo/abandoned", data);
      return response.json();
    },
  });

  useEffect(() => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSaveMutation.mutate({ 
          firstName, 
          lastName, 
          companyName,
          numberOfTechs,
          email,
          websiteUrl,
          cellPhone
        });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [email, firstName, lastName, companyName, numberOfTechs, websiteUrl, cellPhone]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (email && !formSubmitted) {
        navigator.sendBeacon('/api/contractor-commerce-demo/abandoned', JSON.stringify({ email }));
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

    if (!firstName || !lastName || !companyName || !numberOfTechs || !email || !cellPhone) {
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

    demoMutation.mutate({ 
      firstName, 
      lastName, 
      companyName,
      numberOfTechs,
      email,
      websiteUrl,
      cellPhone
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Book a Contractor Commerce Demo - ServiceTitan Hacks"
        description="Schedule a demo with Contractor Commerce to discover how to maximize revenue with strategic merchandising and dynamic pricing for your home service business."
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/partners/contractor-commerce")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contractor Commerce
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={contractorCommerceLogo} 
                alt="Contractor Commerce" 
                className="h-16 object-contain"
              />
            </div>
            <CardTitle className="text-3xl">Book a Contractor Commerce Demo</CardTitle>
            <CardDescription className="text-base">
              Discover how to maximize revenue with strategic merchandising and dynamic pricing. Fill out the form below to schedule your personalized demo.
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
                  <Label htmlFor="companyName" className="text-base">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ABC Home Services"
                    required
                    data-testid="input-company-name"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfTechs" className="text-base">
                    Number of techs in your company <span className="text-destructive">*</span>
                  </Label>
                  <Select value={numberOfTechs} onValueChange={setNumberOfTechs}>
                    <SelectTrigger id="numberOfTechs" data-testid="select-number-of-techs" className="mt-1.5">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11-25">11-25</SelectItem>
                      <SelectItem value="26-50">26-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="100+">100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    Company Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@abchomeservices.com"
                    required
                    data-testid="input-email"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="websiteUrl" className="text-base">
                    Website URL
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://www.abchomeservices.com"
                    data-testid="input-website-url"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="cellPhone" className="text-base">
                    Cell Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cellPhone"
                    type="tel"
                    value={cellPhone}
                    onChange={(e) => setCellPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                    data-testid="input-cell-phone"
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
                disabled={demoMutation.isPending}
                data-testid="button-submit"
              >
                {demoMutation.isPending ? "Submitting..." : "Book Demo"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                After submitting, we'll contact you to schedule your personalized demo.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
