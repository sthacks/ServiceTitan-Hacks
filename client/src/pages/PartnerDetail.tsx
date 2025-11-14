import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExternalLink, ArrowLeft, CheckCircle2, BarChart3, Zap, Users, ClipboardCheck, Cog, DollarSign, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import smartACLogoWhite from "@assets/white.4c718087 (4)_1763145184369.png";
import smartACBackground from "@assets/Smartac (3)_1763145156012.png";
import smartACAppMockup from "@assets/SMAC-APP-MOCKUP-BRENSONS-HIGH-RISK_1763149326382.webp";
import smartACApp from "@assets/image (4)_1763145249281.png";
import smartACSensorsApp from "@assets/smartac.com-all-sensors-app_1763146209818.jpg";
import smartACDashboard from "@assets/image (3)_1763145261344.png";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762019262110.png";
import polycamLogo from "@assets/logos.zip - polycam_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";
import winkDashboard from "@assets/Dashboard (1)_1763145751270.webp";
import winkCertifiedBadge from "@assets/Certified Provider Badge-1_1763145751270.webp";
import winkCoachBadge from "@assets/Certified Provider Coach Badge-1_1763145751270.webp";
import winkCustomerLogos from "@assets/wink-customer-logos.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762019262110.png";

interface Partner {
  name: string;
  slug: string;
  logo: string;
  description: string;
  url: string;
}

export default function PartnerDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const partnerSlug = params.slug;
  const { toast } = useToast();
  
  const [showWinkDemoDialog, setShowWinkDemoDialog] = useState(false);
  const [showSmartACDemoDialog, setShowSmartACDemoDialog] = useState(false);
  const [showContractorCommerceDemoDialog, setShowContractorCommerceDemoDialog] = useState(false);
  const [showLiveswitchDemoDialog, setShowLiveswitchDemoDialog] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [winkFormSubmitted, setWinkFormSubmitted] = useState(false);
  const [smartACFormSubmitted, setSmartACFormSubmitted] = useState(false);
  const [contractorCommerceFormSubmitted, setContractorCommerceFormSubmitted] = useState(false);
  const [liveswitchFormSubmitted, setLiveswitchFormSubmitted] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // SmartAC-specific fields
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
  
  // Contractor Commerce-specific fields
  const [numberOfTechs, setNumberOfTechs] = useState("");
  const [cellPhone, setCellPhone] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partnerSlug]);

  const winkDemoMutation = useMutation({
    mutationFn: async (data: { firstName: string; lastName: string; email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setWinkFormSubmitted(true);
      
      // Build Calendly URL with prefilled parameters
      const calendlyUrl = new URL("https://letsmeet.winktoolbox.com/meetings/wink/team-usa");
      calendlyUrl.searchParams.append("firstName", firstName);
      calendlyUrl.searchParams.append("lastName", lastName);
      calendlyUrl.searchParams.append("email", email);
      calendlyUrl.searchParams.append("a1", "ServiceTitan Hacks"); // "How did you hear about Wink?"
      
      // Redirect to Calendly
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

  const winkAutoSaveMutation = useMutation({
    mutationFn: async (data: { firstName?: string; lastName?: string; email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo/autosave", data);
      return response.json();
    },
  });

  const winkAbandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/wink-demo/abandoned", data);
      return response.json();
    },
  });

  const handleWinkDemoSubmit = (e: React.FormEvent) => {
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

  const handleCloseWinkDialog = () => {
    if (email && !winkFormSubmitted) {
      winkAbandonedMutation.mutate({ email });
    }
    
    setShowWinkDemoDialog(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setHoneypot("");
    setWinkFormSubmitted(false);
  };

  useEffect(() => {
    if (showWinkDemoDialog && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        winkAutoSaveMutation.mutate({ firstName, lastName, email });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [showWinkDemoDialog, email, firstName, lastName]);

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
      setSmartACFormSubmitted(true);
      
      toast({
        title: "Demo Request Submitted!",
        description: "Thank you for your interest in SmartAC. We'll be in touch soon.",
      });
      handleCloseSmartACDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const smartACAutoSaveMutation = useMutation({
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

  const smartACAbandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/smartac-demo/abandoned", data);
      return response.json();
    },
  });

  const handleSmartACDemoSubmit = (e: React.FormEvent) => {
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

  const handleCloseSmartACDialog = () => {
    if (email && !smartACFormSubmitted) {
      smartACAbandonedMutation.mutate({ email });
    }
    
    setShowSmartACDemoDialog(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setWebsiteUrl("");
    setZipCode("");
    setRole("");
    setIsLicensedContractor("");
    setReadyToGrow("");
    setMembershipAgreements("");
    setAnnualRevenue("");
    setServiceTrucks("");
    setHoneypot("");
    setSmartACFormSubmitted(false);
  };

  useEffect(() => {
    if (showSmartACDemoDialog && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        smartACAutoSaveMutation.mutate({
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
  }, [showSmartACDemoDialog, email, firstName, lastName, phone, companyName, websiteUrl, zipCode, role, isLicensedContractor, readyToGrow, membershipAgreements, annualRevenue, serviceTrucks]);

  const contractorCommerceDemoMutation = useMutation({
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
      setContractorCommerceFormSubmitted(true);
      
      toast({
        title: "Demo Request Submitted!",
        description: "Thank you for your interest in Contractor Commerce. We'll be in touch soon.",
      });
      handleCloseContractorCommerceDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const contractorCommerceAutoSaveMutation = useMutation({
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

  const contractorCommerceAbandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/contractor-commerce-demo/abandoned", data);
      return response.json();
    },
  });

  const handleContractorCommerceDemoSubmit = (e: React.FormEvent) => {
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

    contractorCommerceDemoMutation.mutate({
      firstName,
      lastName,
      companyName,
      numberOfTechs,
      email,
      websiteUrl,
      cellPhone,
    });
  };

  const handleCloseContractorCommerceDialog = () => {
    if (email && !contractorCommerceFormSubmitted) {
      contractorCommerceAbandonedMutation.mutate({ email });
    }
    
    setShowContractorCommerceDemoDialog(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setCompanyName("");
    setNumberOfTechs("");
    setWebsiteUrl("");
    setCellPhone("");
    setHoneypot("");
    setContractorCommerceFormSubmitted(false);
  };

  useEffect(() => {
    if (showContractorCommerceDemoDialog && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        contractorCommerceAutoSaveMutation.mutate({
          firstName,
          lastName,
          companyName,
          numberOfTechs,
          email,
          websiteUrl,
          cellPhone,
        });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [showContractorCommerceDemoDialog, email, firstName, lastName, companyName, numberOfTechs, websiteUrl, cellPhone]);

  const liveswitchDemoMutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
    }) => {
      const response = await apiRequest("POST", "/api/liveswitch-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setLiveswitchFormSubmitted(true);
      
      // Build LiveSwitch URL with prefilled email parameter
      const liveswitchUrl = new URL("https://www.liveswitch.com/book-a-demo/");
      liveswitchUrl.searchParams.append("email", email);
      
      // Redirect to LiveSwitch booking page
      window.location.href = liveswitchUrl.toString();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const liveswitchAutoSaveMutation = useMutation({
    mutationFn: async (data: {
      firstName?: string;
      lastName?: string;
      email: string;
    }) => {
      const response = await apiRequest("POST", "/api/liveswitch-demo/autosave", data);
      return response.json();
    },
  });

  const liveswitchAbandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/liveswitch-demo/abandoned", data);
      return response.json();
    },
  });

  const handleLiveswitchDemoSubmit = (e: React.FormEvent) => {
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

    liveswitchDemoMutation.mutate({ firstName, lastName, email });
  };

  const handleCloseLiveswitchDialog = () => {
    if (email && !liveswitchFormSubmitted) {
      liveswitchAbandonedMutation.mutate({ email });
    }
    
    setShowLiveswitchDemoDialog(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setHoneypot("");
    setLiveswitchFormSubmitted(false);
  };

  useEffect(() => {
    if (showLiveswitchDemoDialog && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        liveswitchAutoSaveMutation.mutate({ firstName, lastName, email });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [showLiveswitchDemoDialog, email, firstName, lastName]);

  const partners: Partner[] = [
    {
      name: "Wink Toolbox",
      slug: "wink-toolbox",
      logo: winkLogo,
      description: "Wink Toolbox connects your tech stack, automates your reporting and back-office workflows, and gives home-service companies the clarity they need to scale.",
      url: "https://go.st-hacks.cc/wink",
    },
    {
      name: "SmartAC",
      slug: "smartac",
      logo: smartACLogo,
      description: "Smart automation and customer communication tools that help contractors deliver exceptional service experiences.",
      url: "https://go.st-hacks.cc/smart-ac",
    },
    {
      name: "Contractor Commerce",
      slug: "contractor-commerce",
      logo: contractorCommerceLogo,
      description: "E-commerce and online sales solutions tailored specifically for home service contractors and ServiceTitan users.",
      url: "https://go.st-hacks.cc/contractor-commerce",
    },
    {
      name: "LiveSwitch",
      slug: "liveswitch",
      logo: liveswitchLogo,
      description: "Professional virtual phone solutions designed to streamline communication and enhance customer service for home service businesses.",
      url: "https://go.st-hacks.cc/liveswitch",
    },
    {
      name: "Polycam",
      slug: "polycam",
      logo: polycamLogo,
      description: "Advanced 3D scanning and modeling solutions for home service contractors to capture accurate property measurements and documentation.",
      url: "https://go.st-hacks.cc/polycam",
    },
    {
      name: "Service Crucible",
      slug: "service-crucible",
      logo: serviceCrucibleLogo,
      description: "Service Crucible helps HVAC, plumbing, and electrical companies grow, boost profits, and build systems that run without daily chaos.",
      url: "https://go.st-hacks.cc/Service-crucible",
    },
  ];

  const partner = partners.find((p) => p.slug === partnerSlug);

  if (!partner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Partner Not Found</h1>
            <Button onClick={() => setLocation("/partners")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render detailed Wink Toolbox page
  if (partner.slug === "wink-toolbox") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, reporting automation, business intelligence`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
              <Button
                variant="ghost"
                onClick={() => setLocation("/partners")}
                className="mb-8"
                data-testid="button-back-to-partners"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Partners
              </Button>

              <div className="text-center">
                <div className="mb-8 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="object-contain max-h-32 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  Transform your numbers into actionable insights — without adding another system.
                </h1>

                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>

                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => setShowWinkDemoDialog(true)}
                  data-testid="button-demo-cta"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </section>

          {/* What Wink Toolbox Does */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-what-it-does">
                What Wink Toolbox Does
              </h2>
              
              <p className="text-lg text-foreground mb-8 text-center max-w-3xl mx-auto">
                Wink Toolbox helps contractors save time and cut mistakes by handling three major jobs.
              </p>

              <div className="space-y-6 mb-8">
                <Card className="bg-card border-0" data-testid="card-feature-ocr">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 flex items-start gap-2">
                      <span className="text-primary">1.</span>
                      <a 
                        href="https://go.st-hacks.cc/wink-ocr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        OCR
                      </a> for invoices
                    </h3>
                    <p className="text-foreground">
                      Wink reads your vendor invoices for you. It pulls out names, dates, totals, and line items, then sends the data into your systems. You no longer type invoices by hand. This removes errors and saves hours each week.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-pricebook">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 flex items-start gap-2">
                      <span className="text-primary">2.</span>
                      <a 
                        href="https://go.st-hacks.cc/wink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Pricebook
                      </a> management
                    </h3>
                    <p className="text-foreground">
                      Wink keeps your pricebook clean and updated. It matches vendor cost changes, fixes errors, and keeps items organized so your techs see the right prices.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-automations">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 flex items-start gap-2">
                      <span className="text-primary">3.</span>
                      Smart <a 
                        href="https://go.st-hacks.cc/wink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        automations
                      </a> with AI
                    </h3>
                    <p className="text-foreground">
                      Wink builds custom automations that handle repeat tasks like matching invoices, syncing data, creating rules, and sending alerts. Your team gets more work done with fewer manual steps.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => setShowWinkDemoDialog(true)}
                  data-testid="button-book-demo"
                >
                  Book a Demo with Wink
                </Button>
              </div>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-why-matters">
                Why It Matters for Your Business
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3" data-testid="benefit-time">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Stop wasting time merging spreadsheets and chasing data.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-visibility">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Get real-time visibility into jobs, inventory, margins and cash flow.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-automation">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Automate repetitive kindred tasks so your team focuses on growth, not grunt work.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-truth">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Build one consistent "source of truth" so everyone is looking at the same numbers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Spotlight */}
          <section className="py-16 bg-black text-white">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-features">
                Features Spotlight
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3" data-testid="feature-dashboards">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Unlimited dashboards & reports that blend multiple data sources.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-formulas">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Excel-style formulas, pivot tables, conditional formatting so you can customise the analysis yourself.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-automation-rules">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Automation rules: send notifications via email, Slack or SMS; trigger follow-on tasks based on your business rules.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-integrations">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Prebuilt integrations with 25+ software tools (ServiceTitan, QuickBooks, simPRO, HubSpot etc.).</p>
                </div>
                <div className="flex gap-3" data-testid="feature-pricing">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Pricing tiers that scale from startup to enterprise so you pick the level you need.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Preview */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-dashboard-preview">
                See Wink in Action
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Get instant visibility into your business metrics with customizable dashboards and real-time reporting.
              </p>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={winkDashboard}
                  alt="Wink Toolbox dashboard showing analytics and reports"
                  className="w-full"
                  data-testid="img-wink-dashboard"
                />
              </div>
            </div>
          </section>

          {/* Trusted By */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-12 text-center" data-testid="heading-trusted-by">
                Trusted by Leading Contractors
              </h2>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <img
                  src={winkCustomerLogos}
                  alt="Companies using Wink Toolbox"
                  className="w-full"
                  data-testid="img-customer-logos"
                />
              </div>
            </div>
          </section>

          {/* ServiceTitan Certified */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-certified">
                ServiceTitan Certified Provider
              </h2>
              <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
                Wink Toolbox is an official ServiceTitan Certified Provider and Coach, ensuring seamless integration and expert support for your business.
              </p>
              <div className="flex justify-center items-center gap-12 flex-wrap">
                <img
                  src={winkCertifiedBadge}
                  alt="ServiceTitan Certified Provider Badge"
                  className="h-32 w-auto"
                  data-testid="img-certified-badge"
                />
                <img
                  src={winkCoachBadge}
                  alt="ServiceTitan Certified Provider Coach Badge"
                  className="h-32 w-auto"
                  data-testid="img-coach-badge"
                />
              </div>
            </div>
          </section>

          {/* Who It's For */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-6 text-center" data-testid="heading-who-for">
                Who It's For
              </h2>
              <p className="text-lg text-foreground text-center max-w-3xl mx-auto mb-8" data-testid="text-target-audience">
                Ideal for home-service business owners, operations leads and consultants working with HVAC, plumbing, electrical or other trade firms. If your team uses ServiceTitan (or similar), and you're looking to turn data into action—this is the tool.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-final-cta">
                Ready to Unlock Your Growth Metrics?
              </h2>
              <p className="text-xl mb-8 text-white/90" data-testid="text-cta-description">
                Book a personalised demo of Wink Toolbox today and see how you can eliminate your reporting bottlenecks and unlock your growth metrics.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-white text-primary hover:bg-white/90 border-white"
                onClick={() => setShowWinkDemoDialog(true)}
                data-testid="button-final-cta"
              >
                Book Your Demo
              </Button>
            </div>
          </section>
        </main>
        <Footer />

        {/* Wink Demo Dialog */}
        <Dialog open={showWinkDemoDialog} onOpenChange={(open) => !open && handleCloseWinkDialog()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Demo with Wink</DialogTitle>
              <DialogDescription>
                Enter your details below to schedule a personalized demo with the Wink team.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleWinkDemoSubmit} className="space-y-4">
              <div>
                <Label htmlFor="wink-firstName">First Name *</Label>
                <Input
                  id="wink-firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  data-testid="input-wink-firstname"
                />
              </div>
              <div>
                <Label htmlFor="wink-lastName">Last Name *</Label>
                <Input
                  id="wink-lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Your last name"
                  data-testid="input-wink-lastname"
                />
              </div>
              <div>
                <Label htmlFor="wink-email">Email Address *</Label>
                <Input
                  id="wink-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="input-wink-email"
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
              <p className="text-xs text-muted-foreground">
                After submitting, you'll be redirected to Wink's scheduling page to choose your demo time.
              </p>
              <Button 
                type="submit" 
                disabled={winkDemoMutation.isPending} 
                className="w-full"
                data-testid="button-submit-wink-demo"
              >
                {winkDemoMutation.isPending ? "Submitting..." : "Continue to Schedule"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Render detailed Service Crucible page
  if (partner.slug === "service-crucible") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, business consulting, operations optimization`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
              <Button
                variant="ghost"
                onClick={() => setLocation("/partners")}
                className="mb-8"
                data-testid="button-back-to-partners"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Partners
              </Button>

              <div className="text-center">
                <div className="mb-8 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="object-contain max-h-32 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  What Service Crucible Does
                </h1>

                <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>

                <p className="text-lg text-foreground mb-8 max-w-3xl mx-auto">
                  Many contractors start small, wearing all the hats—running calls, handling money, and managing people. Service Crucible helps them build real systems so the business can grow without falling apart.
                </p>

                <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto">
                  The Service Crucible team has worked in the trades and understands what it takes. Service Crucible doesn't provide fluffy advice—they build clear steps and tools contractors can actually use.
                </p>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-learn-more-hero"
                >
                  <Button size="lg" className="gap-2">
                    Get Started <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* How Service Crucible Helps */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-how-we-help">
                Here's How Service Crucible Helps
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-0" data-testid="card-service-audit">
                  <CardContent className="pt-6">
                    <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">The Crucible Audit</h3>
                    <p className="text-foreground">
                      Find out what's working and what's not in your business.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-execution">
                  <CardContent className="pt-6">
                    <Cog className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Execution Hub</h3>
                    <p className="text-foreground">
                      Get step-by-step systems to manage jobs, money, and people better.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-financial">
                  <CardContent className="pt-6">
                    <DollarSign className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Financial Tools</h3>
                    <p className="text-foreground">
                      Learn how to price for profit and track your numbers the right way.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-culture">
                  <CardContent className="pt-6">
                    <Heart className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Culture and Leadership</h3>
                    <p className="text-foreground">
                      Build a strong team that takes pride in their work.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* The Goal */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-our-goal">
                The Goal
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto" data-testid="text-goal-description">
                The goal is simple—help contractors turn their businesses into ones that run smoothly, make solid profit, and give them freedom from daily chaos.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-final-cta">
                Ready to Grow Stronger?
              </h2>
              <p className="text-xl mb-8 text-white/90" data-testid="text-cta-description">
                Let Service Crucible help you build the systems and team you need to scale your business with confidence.
              </p>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-final-cta"
              >
                <Button size="lg" variant="outline" className="gap-2 bg-white text-primary hover:bg-white/90 border-white">
                  Get Started Today <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Render detailed SmartAC page
  if (partner.slug === "smartac") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, membership programs, smart sensors`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-[#2970bf] to-white relative">
            <div className="mx-auto max-w-6xl px-6 relative z-10">
              <Button
                variant="ghost"
                onClick={() => setLocation("/partners")}
                className="mb-8 text-white hover:bg-white/20 hover:text-white"
                data-testid="button-back-to-partners"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Partners
              </Button>

              <div className="text-center">
                <div className="mb-8 flex items-center justify-center">
                  <img
                    src={smartACLogoWhite}
                    alt={`${partner.name} logo`}
                    className="object-contain max-h-32 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-black" data-testid="text-partner-name">
                  {partner.name}
                </h1>

                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>
              </div>
            </div>
          </section>

          {/* What SmartAC Does */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-6">
              <p className="text-lg text-foreground mb-12 text-center max-w-3xl mx-auto">
                SmartAC helps HVAC contractors grow their membership programs, keep more customers, and work smarter without adding more trucks or techs.
              </p>

              <div className="space-y-8 mb-8">
                <Card className="bg-card border-0 overflow-hidden" data-testid="card-feature-sensors">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          Smart sensors and monitoring
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          SmartAC uses wireless sensors to watch HVAC systems for problems like leaks, airflow issues, or dirty filters. When something looks wrong, it sends an alert so you can fix it before it becomes a bigger problem.
                        </p>
                      </div>
                      <div className="p-6 bg-muted/50 flex items-center justify-center">
                        <img
                          src={smartACSensorsApp}
                          alt="SmartAC sensors and mobile app showing air filter monitoring"
                          className="w-full max-w-md rounded-lg shadow-md"
                          data-testid="img-mobile-app-preview"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0 overflow-hidden" data-testid="card-feature-app">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-muted/50 flex items-center justify-center order-2 md:order-1">
                        <img
                          src={smartACAppMockup}
                          alt="SmartAC mobile app showing Brenson's HVAC dashboard with loyalty balance and system health"
                          className="w-full max-w-sm rounded-lg shadow-md"
                          data-testid="img-mobile-app"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center order-1 md:order-2">
                        <h3 className="text-2xl font-bold mb-4 flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          Homeowner experience app
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          SmartAC gives your customers a simple app. They can see their system health, get alerts, book service, and stay connected with your team. This builds trust and keeps you top of mind.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0 overflow-hidden" data-testid="card-feature-membership">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 flex items-start gap-2">
                          <span className="text-primary">3.</span>
                          Membership growth
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          SmartAC helps turn one-time service calls into long-term members. Many contractors see more signups and higher retention. This means steady revenue without extra labor.
                        </p>
                      </div>
                      <div className="p-6 bg-muted/50 flex items-center justify-center">
                        <img
                          src={smartACDashboard}
                          alt="SmartAC analytics and adoption dashboard"
                          className="w-full rounded-lg shadow-md"
                          data-testid="img-analytics-dashboard"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={() => setShowSmartACDemoDialog(true)}
                  data-testid="button-book-demo"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />

        {/* SmartAC Demo Dialog */}
        <Dialog open={showSmartACDemoDialog} onOpenChange={(open) => !open && handleCloseSmartACDialog()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book a Demo with SmartAC</DialogTitle>
              <DialogDescription>
                Complete all fields below to schedule your personalized demo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSmartACDemoSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smartac-firstName">First name *</Label>
                  <Input
                    id="smartac-firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    data-testid="input-smartac-firstname"
                  />
                </div>
                <div>
                  <Label htmlFor="smartac-lastName">Last name *</Label>
                  <Input
                    id="smartac-lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    data-testid="input-smartac-lastname"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smartac-email">Email *</Label>
                  <Input
                    id="smartac-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="input-smartac-email"
                  />
                </div>
                <div>
                  <Label htmlFor="smartac-phone">Cell phone number *</Label>
                  <Input
                    id="smartac-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-testid="input-smartac-phone"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smartac-companyName">Company name *</Label>
                  <Input
                    id="smartac-companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    data-testid="input-smartac-company"
                  />
                </div>
                <div>
                  <Label htmlFor="smartac-websiteUrl">Website URL *</Label>
                  <Input
                    id="smartac-websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    data-testid="input-smartac-website"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smartac-zipCode">Zip code *</Label>
                  <Input
                    id="smartac-zipCode"
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    data-testid="input-smartac-zipcode"
                  />
                </div>
                <div>
                  <Label htmlFor="smartac-role">What is your role? *</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger data-testid="select-smartac-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="smartac-licensed">Are you a licensed residential HVAC contractor? *</Label>
                <Select value={isLicensedContractor} onValueChange={setIsLicensedContractor}>
                  <SelectTrigger data-testid="select-smartac-licensed">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="smartac-ready">When would you be ready to grow your HVAC business with SmartAC? *</Label>
                <Select value={readyToGrow} onValueChange={setReadyToGrow}>
                  <SelectTrigger data-testid="select-smartac-ready">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="justexploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="smartac-memberships">How many membership agreements do you have? *</Label>
                <Select value={membershipAgreements} onValueChange={setMembershipAgreements}>
                  <SelectTrigger data-testid="select-smartac-memberships">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100">0-100</SelectItem>
                    <SelectItem value="101-500">101-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1001-2000">1001-2000</SelectItem>
                    <SelectItem value="2000+">2000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>What is your approximate annual revenue? *</Label>
                <RadioGroup value={annualRevenue} onValueChange={setAnnualRevenue} className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under500k" id="smartac-revenue1" data-testid="radio-smartac-revenue-under500k" />
                    <Label htmlFor="smartac-revenue1" className="font-normal cursor-pointer">Under $500K</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500k-3m" id="smartac-revenue2" data-testid="radio-smartac-revenue-500k-3m" />
                    <Label htmlFor="smartac-revenue2" className="font-normal cursor-pointer">$500K - $3MM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3m-10m" id="smartac-revenue3" data-testid="radio-smartac-revenue-3m-10m" />
                    <Label htmlFor="smartac-revenue3" className="font-normal cursor-pointer">$3MM - $10MM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10m-20m" id="smartac-revenue4" data-testid="radio-smartac-revenue-10m-20m" />
                    <Label htmlFor="smartac-revenue4" className="font-normal cursor-pointer">$10MM - $20MM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="20m+" id="smartac-revenue5" data-testid="radio-smartac-revenue-20m+" />
                    <Label htmlFor="smartac-revenue5" className="font-normal cursor-pointer">$20MM+</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Number of service trucks *</Label>
                <RadioGroup value={serviceTrucks} onValueChange={setServiceTrucks} className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-4" id="smartac-trucks1" data-testid="radio-smartac-trucks-1-4" />
                    <Label htmlFor="smartac-trucks1" className="font-normal cursor-pointer">1-4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5-10" id="smartac-trucks2" data-testid="radio-smartac-trucks-5-10" />
                    <Label htmlFor="smartac-trucks2" className="font-normal cursor-pointer">5-10</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="11-20" id="smartac-trucks3" data-testid="radio-smartac-trucks-11-20" />
                    <Label htmlFor="smartac-trucks3" className="font-normal cursor-pointer">11-20</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="21-39" id="smartac-trucks4" data-testid="radio-smartac-trucks-21-39" />
                    <Label htmlFor="smartac-trucks4" className="font-normal cursor-pointer">21-39</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="40+" id="smartac-trucks5" data-testid="radio-smartac-trucks-40+" />
                    <Label htmlFor="smartac-trucks5" className="font-normal cursor-pointer">40+</Label>
                  </div>
                </RadioGroup>
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

              <Button 
                type="submit" 
                disabled={smartACDemoMutation.isPending} 
                className="w-full"
                data-testid="button-submit-smartac-demo"
              >
                {smartACDemoMutation.isPending ? "Submitting..." : "Submit Demo Request"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Render detailed Contractor Commerce page
  if (partner.slug === "contractor-commerce") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, e-commerce, online store`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
              <Button
                variant="ghost"
                onClick={() => setLocation("/partners")}
                className="mb-8"
                data-testid="button-back-to-partners"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Partners
              </Button>

              <div className="text-center">
                <div className="mb-8 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="object-contain max-h-40 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  {partner.name}
                </h1>

                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>
              </div>
            </div>
          </section>

          {/* What Contractor Commerce Does */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-6">
              <p className="text-lg text-foreground mb-8 text-center max-w-3xl mx-auto">
                Contractor Commerce helps HVAC and plumbing contractors sell more online without extra headaches.
              </p>

              <div className="space-y-6 mb-8">
                <Card className="bg-card border-0" data-testid="card-feature-store">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      Plug-and-play online store
                    </h3>
                    <p className="text-foreground">
                      When you add Contractor Commerce, your website gets a ready-to-go online shop. You sell filters, memberships, and full systems—even when your trucks are off the road.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-products">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      Products, services, and systems
                    </h3>
                    <p className="text-foreground">
                      Sell air filters shipped direct to customers, purchase plans for service, or full system installs. Contractor Commerce handles stock, delivery, checkout, and your techs just do the job.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-leads">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      More leads, more sales
                    </h3>
                    <p className="text-foreground">
                      Your site becomes a sales engine. Visitors get quotes, buy services, or book installs online. You turn more traffic into paying customers.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center space-y-4">
                <Button 
                  size="lg"
                  onClick={() => setShowContractorCommerceDemoDialog(true)}
                  data-testid="button-book-demo"
                >
                  Book a Demo
                </Button>
                <div>
                  <a
                    href="https://go.st-hacks.cc/contractor-commerce"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-learn-more"
                  >
                    <Button size="lg" variant="outline" className="gap-2">
                      Learn More <ExternalLink className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />

        {/* Contractor Commerce Demo Dialog */}
        <Dialog open={showContractorCommerceDemoDialog} onOpenChange={(open) => !open && handleCloseContractorCommerceDialog()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book a Demo with Contractor Commerce</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll be in touch to schedule your personalized demo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContractorCommerceDemoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cc-firstName">First Name *</Label>
                  <Input
                    id="cc-firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    data-testid="input-first-name"
                  />
                </div>

                <div>
                  <Label htmlFor="cc-lastName">Last Name *</Label>
                  <Input
                    id="cc-lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cc-companyName">Company Name *</Label>
                <Input
                  id="cc-companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ABC Home Services"
                  required
                  data-testid="input-company-name"
                />
              </div>

              <div>
                <Label htmlFor="cc-numberOfTechs">Number of techs in your company *</Label>
                <Select value={numberOfTechs} onValueChange={setNumberOfTechs}>
                  <SelectTrigger id="cc-numberOfTechs" data-testid="select-number-of-techs">
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
                <Label htmlFor="cc-email">Company Email *</Label>
                <Input
                  id="cc-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@abchomeservices.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="cc-websiteUrl">Website URL</Label>
                <Input
                  id="cc-websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://www.abchomeservices.com"
                  data-testid="input-website-url"
                />
              </div>

              <div>
                <Label htmlFor="cc-cellPhone">Cell Phone Number *</Label>
                <Input
                  id="cc-cellPhone"
                  type="tel"
                  value={cellPhone}
                  onChange={(e) => setCellPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  data-testid="input-cell-phone"
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

              <Button 
                type="submit" 
                disabled={contractorCommerceDemoMutation.isPending} 
                className="w-full"
                data-testid="button-submit-contractor-commerce-demo"
              >
                {contractorCommerceDemoMutation.isPending ? "Submitting..." : "Submit Demo Request"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Default partner page layout for all other partners
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${partner.name} | ServiceTitan Hacks Partners`}
        description={partner.description}
        keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software`}
        canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/partners")}
              className="mb-8"
              data-testid="button-back-to-partners"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Button>

            <div className="text-center">
              <div className="mb-8 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`object-contain ${
                    partner.name === "SmartAC" ||
                    partner.name === "Contractor Commerce"
                      ? "max-h-40"
                      : "max-h-32"
                  } w-auto`}
                  data-testid="img-partner-logo"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                {partner.name}
              </h1>

              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                {partner.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {partner.slug === "liveswitch" && (
                  <Button 
                    size="lg"
                    onClick={() => setShowLiveswitchDemoDialog(true)}
                    data-testid="button-book-demo"
                  >
                    Book a Demo
                  </Button>
                )}
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-learn-more"
                >
                  <Button size="lg" variant={partner.slug === "liveswitch" ? "outline" : "default"} className="gap-2">
                    Learn More <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* LiveSwitch Demo Dialog */}
      {partner.slug === "liveswitch" && (
        <Dialog open={showLiveswitchDemoDialog} onOpenChange={(open) => !open && handleCloseLiveswitchDialog()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Demo with LiveSwitch</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll redirect you to schedule your demo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLiveswitchDemoSubmit} className="space-y-4">
              <div>
                <Label htmlFor="ls-firstName">First Name *</Label>
                <Input
                  id="ls-firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  data-testid="input-first-name"
                />
              </div>

              <div>
                <Label htmlFor="ls-lastName">Last Name *</Label>
                <Input
                  id="ls-lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  required
                  data-testid="input-last-name"
                />
              </div>

              <div>
                <Label htmlFor="ls-email">Email Address *</Label>
                <Input
                  id="ls-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
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

              <Button 
                type="submit" 
                disabled={liveswitchDemoMutation.isPending} 
                className="w-full"
                data-testid="button-submit-liveswitch-demo"
              >
                {liveswitchDemoMutation.isPending ? "Submitting..." : "Continue to Booking"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
