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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft } from "lucide-react";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";

export default function SmartACBookDemo() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [role, setRole] = useState("");
  const [isLicensedContractor, setIsLicensedContractor] = useState("");
  const [readyToGrow, setReadyToGrow] = useState("");
  const [membershipAgreements, setMembershipAgreements] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [serviceTrucks, setServiceTrucks] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const smartACDemoMutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      companyName: string;
      websiteUrl: string;
      zipCode: string;
      role: string;
      isLicensedContractor: string;
      readyToGrow: string;
      membershipAgreements: string;
      annualRevenue: string;
      serviceTrucks: string;
    }) => {
      const response = await apiRequest("POST", "/api/smartac-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Demo Request Submitted!",
        description: "Thank you for your interest in SmartAC. We'll be in touch soon.",
      });
      
      setTimeout(() => {
        setLocation("/partners/smartac");
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
      email: string;
      phone?: string;
      companyName?: string;
      websiteUrl?: string;
      zipCode?: string;
      role?: string;
      isLicensedContractor?: string;
      readyToGrow?: string;
      membershipAgreements?: string;
      annualRevenue?: string;
      serviceTrucks?: string;
    }) => {
      const response = await apiRequest("POST", "/api/smartac-demo/autosave", data);
      return response.json();
    },
  });

  const abandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/smartac-demo/abandoned", data);
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
          email,
          phone,
          companyName,
          websiteUrl,
          zipCode,
          role,
          isLicensedContractor,
          readyToGrow,
          membershipAgreements,
          annualRevenue,
          serviceTrucks,
        });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [email, firstName, lastName, phone, companyName, websiteUrl, zipCode, role, isLicensedContractor, readyToGrow, membershipAgreements, annualRevenue, serviceTrucks]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (email && !formSubmitted) {
        navigator.sendBeacon('/api/smartac-demo/abandoned', JSON.stringify({ email }));
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

    if (!firstName || !lastName || !email || !phone || !companyName || !websiteUrl || !zipCode || !role || !isLicensedContractor || !readyToGrow || !membershipAgreements || !annualRevenue || !serviceTrucks) {
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

    smartACDemoMutation.mutate({
      firstName,
      lastName,
      email,
      phone,
      companyName,
      websiteUrl,
      zipCode,
      role,
      isLicensedContractor,
      readyToGrow,
      membershipAgreements,
      annualRevenue,
      serviceTrucks,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Book a SmartAC Demo - ServiceTitan Hacks"
        description="Schedule a demo with SmartAC to discover smart automation and customer communication tools that help contractors deliver exceptional service experiences."
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/partners/smartac")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to SmartAC
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={smartACLogo} 
                alt="SmartAC" 
                className="h-16 object-contain"
              />
            </div>
            <CardTitle className="text-3xl">Book a SmartAC Demo</CardTitle>
            <CardDescription className="text-base">
              Discover smart automation and customer communication tools. Complete the form below to schedule your personalized demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div>
                  <Label htmlFor="phone" className="text-base">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                    data-testid="input-phone"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-base">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ABC Heating & Cooling"
                    required
                    data-testid="input-company-name"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="websiteUrl" className="text-base">
                    Website URL <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    data-testid="input-website-url"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode" className="text-base">
                    Zip Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="12345"
                    required
                    data-testid="input-zip-code"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-base">
                    Your Role <span className="text-destructive">*</span>
                  </Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role" data-testid="select-role" className="mt-1.5">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="General Manager">General Manager</SelectItem>
                      <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                      <SelectItem value="Service Manager">Service Manager</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="isLicensedContractor" className="text-base">
                    Licensed HVAC Contractor? <span className="text-destructive">*</span>
                  </Label>
                  <Select value={isLicensedContractor} onValueChange={setIsLicensedContractor} required>
                    <SelectTrigger id="isLicensedContractor" data-testid="select-licensed-contractor" className="mt-1.5">
                      <SelectValue placeholder="Select yes or no" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="readyToGrow" className="text-base">
                    Ready to Grow? <span className="text-destructive">*</span>
                  </Label>
                  <Select value={readyToGrow} onValueChange={setReadyToGrow} required>
                    <SelectTrigger id="readyToGrow" data-testid="select-ready-to-grow" className="mt-1.5">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes, within 3 months">Yes, within 3 months</SelectItem>
                      <SelectItem value="Yes, within 6 months">Yes, within 6 months</SelectItem>
                      <SelectItem value="Yes, within 12 months">Yes, within 12 months</SelectItem>
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="membershipAgreements" className="text-base">
                  Membership Agreements <span className="text-destructive">*</span>
                </Label>
                <Select value={membershipAgreements} onValueChange={setMembershipAgreements} required>
                  <SelectTrigger id="membershipAgreements" data-testid="select-membership-agreements" className="mt-1.5">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="1-50">1-50</SelectItem>
                    <SelectItem value="51-100">51-100</SelectItem>
                    <SelectItem value="101-250">101-250</SelectItem>
                    <SelectItem value="251-500">251-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base">
                  Annual Revenue <span className="text-destructive">*</span>
                </Label>
                <RadioGroup value={annualRevenue} onValueChange={setAnnualRevenue} className="mt-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Under $100k" id="revenue-under-100k" data-testid="radio-revenue-under-100k" />
                    <Label htmlFor="revenue-under-100k" className="font-normal cursor-pointer">Under $100k</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="$100k - $500k" id="revenue-100k-500k" data-testid="radio-revenue-100k-500k" />
                    <Label htmlFor="revenue-100k-500k" className="font-normal cursor-pointer">$100k - $500k</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="$500k - $1M" id="revenue-500k-1m" data-testid="radio-revenue-500k-1m" />
                    <Label htmlFor="revenue-500k-1m" className="font-normal cursor-pointer">$500k - $1M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="$1M - $3M" id="revenue-1m-3m" data-testid="radio-revenue-1m-3m" />
                    <Label htmlFor="revenue-1m-3m" className="font-normal cursor-pointer">$1M - $3M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="$3M+" id="revenue-3m-plus" data-testid="radio-revenue-3m-plus" />
                    <Label htmlFor="revenue-3m-plus" className="font-normal cursor-pointer">$3M+</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">
                  Service Trucks <span className="text-destructive">*</span>
                </Label>
                <RadioGroup value={serviceTrucks} onValueChange={setServiceTrucks} className="mt-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3" id="trucks-1-3" data-testid="radio-trucks-1-3" />
                    <Label htmlFor="trucks-1-3" className="font-normal cursor-pointer">1-3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4-6" id="trucks-4-6" data-testid="radio-trucks-4-6" />
                    <Label htmlFor="trucks-4-6" className="font-normal cursor-pointer">4-6</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7-10" id="trucks-7-10" data-testid="radio-trucks-7-10" />
                    <Label htmlFor="trucks-7-10" className="font-normal cursor-pointer">7-10</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="11+" id="trucks-11-plus" data-testid="radio-trucks-11-plus" />
                    <Label htmlFor="trucks-11-plus" className="font-normal cursor-pointer">11+</Label>
                  </div>
                </RadioGroup>
              </div>

              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={smartACDemoMutation.isPending}
                data-testid="button-submit"
              >
                {smartACDemoMutation.isPending ? "Submitting..." : "Book Demo"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                We'll review your information and contact you within 24 hours to schedule your personalized demo.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
