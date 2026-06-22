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
import { ExternalLink, ArrowLeft, CheckCircle2, BarChart3, Zap, Users, ClipboardCheck, Cog, DollarSign, Heart, ArrowRight, Play, Calendar, Check, TrendingUp, Smartphone, Database, ClipboardList, Phone, Clock, Shield, PhoneCall, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import smartACLogoWhite from "@assets/smartac (4)_1763149949473.png";
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
import dataturkLogo from "@assets/logo-21b053a2661df6e0f2bed3fa3d77630731d6a715ed24b52912e636d38_1765216543435.png";
import broccoliLogo from "@assets/broccoli_logo_1780576160196.svg";
import phonetapLogo from "@assets/phonetap-logo-BlpFkpJi_1780576726245.webp";
import sharewillowLogo from "@assets/sharewillow_1780932326327.png";
import billHeadshot from "@assets/pro_headshot_(8)_1781285653008.png";
import sthacksHorizLogo from "@assets/new_horz_logo_transparent.png";
import sthacksNavLogo from "@assets/secondary logo_1760895642629.png";
import sharewillowNewLogo from "@assets/sharewillow_new_transparent.png";
import jillsOfficeLogo from "@assets/Logo_Colored-Logo_1782138935300.png";

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

  // ShareWillow demo form
  const [swForm, setSwForm] = useState({ name: "", email: "", company: "", techs: "", onST: "yes" });
  const [swSubmitted, setSwSubmitted] = useState(false);

  // Broccoli AI callback form
  const [broccoliCallForm, setBroccoliCallForm] = useState({ name: "", phone: "" });
  const [broccoliCallConfirmed, setBroccoliCallConfirmed] = useState(false);

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

  const broccoliCallbackMutation = useMutation({
    mutationFn: async (data: { name: string; phone: string }) => {
      const response = await apiRequest("POST", "/api/broccoli-callback", data);
      return response.json();
    },
    onSuccess: () => {
      setBroccoliCallConfirmed(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sharewillowDemoMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; company: string; techs: string; onST: string }) => {
      const response = await apiRequest("POST", "/api/sharewillow-demo", data);
      return response.json();
    },
    onSuccess: () => {
      setSwSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
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
      name: "Broccoli AI",
      slug: "broccoli-ai",
      logo: broccoliLogo,
      description: "AI voice agents built for home service contractors using ServiceTitan.",
      url: "https://go.st-hacks.cc/broccoli-ai",
    },
    {
      name: "ShareWillow",
      slug: "sharewillow",
      logo: sharewillowLogo,
      description: "Performance pay and incentive plans for home service contractors.",
      url: "https://lp.sharewillow.com/industries/construction",
    },
    {
      name: "Jill's Office",
      slug: "jills-office",
      logo: jillsOfficeLogo,
      description: "Live answering service for the trades. Jill's Office captures more leads and books more jobs by making sure every call gets answered by a real person.",
      url: "https://jillsoffice.com",
    },
    {
      name: "PhoneTap",
      slug: "phonetap",
      logo: phonetapLogo,
      description: "AI call intelligence for ServiceTitan contractors.",
      url: "https://phonetap.ai/demo?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page",
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
    {
      name: "DataTurk",
      slug: "dataturk",
      logo: dataturkLogo,
      description: "AI-powered funnel analytics that grades your ServiceTitan performance from call center to close, with actionable insights to boost bookings, conversions, and revenue.",
      url: "https://app.dataturk.ai",
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
                        href="https://go.st-hacks.cc/wink-ocr?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
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
                        href="https://go.st-hacks.cc/wink?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
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
                        href="https://go.st-hacks.cc/wink?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
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
    const DEMO_URL = "https://hub.smartac.com/servicetitanhacks-offer?eid=xoeqYg";

    const SA = {
      navy: "#0B1B3A",
      navyMid: "#16305C",
      navyLight: "#EEF3FA",
      navyTint: "#D6E4F5",
      white: "#FFFFFF",
      red: "#ec164d",
      body: "#1a1a1a",
    };
    const font = { fontFamily: "Oxygen, Arial, sans-serif", color: SA.body };

    const saFeatures = [
      {
        icon: Clock,
        title: "Customers book themselves, 24/7",
        chips: ["Self-scheduling", "After-hours"],
        body: "Homeowners schedule their own visits in one click, day or night. No phone tag, no missed bookings, and no added load on your CSRs.",
      },
      {
        icon: Heart,
        title: "Loyalty that drives retention",
        chips: ["Memberships", "Rewards"],
        body: "Members see their loyalty rewards in the app, which keeps them enrolled and engaged year over year instead of churning after the first visit.",
      },
      {
        icon: DollarSign,
        title: "Built-in filter store",
        chips: ["Recurring revenue", "Filters"],
        body: "Automatic filter reminders and reordering turn a single maintenance visit into recurring revenue you do not have to chase.",
      },
      {
        icon: Shield,
        title: "Branded to your company",
        chips: ["White-label", "Branding"],
        body: "Your logo and your brand in every homeowner's pocket. SmartAC runs the program in the background. The customer sees you.",
      },
    ];

    const saStats = [
      { value: "4x", label: "Membership signups", body: "Adoption climbs from about 20% to 80% with SmartAC." },
      { value: "120 day", label: "Money-back guarantee", body: "Backed by the industry's first performance guarantee." },
      { value: "96%", label: "Customer retention rate", body: "Members stay enrolled and loyal year over year." },
      { value: "50%", label: "Capacity unlocked", body: "Free up half your team's time for higher-value jobs." },
      { value: "100%+", label: "Program scalability", body: "Add homes under management without adding trucks or techs." },
      { value: "30%", label: "Margin improvement", body: "Shift time from routine maintenance to profitable replacements and new customer visits." },
    ];

    const saSteps = [
      { n: "1", title: "Book your demo", body: "See SmartAC run against your membership numbers and lock in the ServiceTitan Hacks offer." },
      { n: "2", title: "Brand the app", body: "Add your logo and configure rewards, filters, and scheduling for your shop." },
      { n: "3", title: "Roll it out", body: "Put SmartAC in front of your techs and your customers." },
      { n: "4", title: "Track the lift", body: "Watch signups, retention, and recurring filter revenue in your dashboard." },
    ];

    const saFaqs = [
      { q: "How does SmartAC work with ServiceTitan?", a: "[Integration detail pending sign-off.]" },
      { q: "What does it cost?", a: "Pricing scales with your membership base. SmartAC will model it against your numbers on the demo. [Pricing detail pending sign-off.]" },
      { q: "Who manages the membership program?", a: "SmartAC runs the program in the background. Your customers see your brand, and your team stays focused on the work." },
      { q: "What is the 120-day guarantee?", a: "SmartAC backs results with a 120-day money-back performance guarantee." },
      { q: "How long does setup take?", a: "[Setup timeline pending sign-off.]" },
    ];

    return (
      <div className="min-h-screen flex flex-col" style={font}>
        <SEO
          title="SmartAC + ServiceTitan Hacks: Lock In Loyalty on Every Visit"
          description="SmartAC increases membership signups, boosts plan retention, and cuts the cost of managing your membership program. Book your demo for the ServiceTitan Hacks special offer."
          keywords="SmartAC, ServiceTitan partner, membership program, HVAC loyalty, contractor memberships, filter store"
          canonicalUrl="https://servicetitanhacks.com/partners/smartac"
          ogImage="https://servicetitanhacks.com/og-smartac.png"
        />
        <Header />
        <main className="flex-1" style={{ backgroundColor: SA.navyLight }}>

          {/* Back button */}
          <div style={{ backgroundColor: SA.navyLight, padding: "28px 24px 0" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <button onClick={() => setLocation("/partners")}
                      data-testid="button-back-to-partners"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: SA.body, fontSize: 14, opacity: 0.7, padding: 0 }}>
                <ArrowLeft size={16} /> Back to Partners
              </button>
            </div>
          </div>

          {/* ── 1. HERO ── */}
          <section style={{ backgroundColor: SA.navyLight }} className="px-6 pb-20 pt-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: text */}
                <div className="text-center lg:text-left">
                  {/* Co-brand lockup */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 flex-wrap">
                    <span style={{ fontFamily: "Oxygen, Arial, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", color: SA.body }}>
                      ServiceTitan <span style={{ color: SA.red }}>HACKS</span>
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 300, opacity: 0.4 }}>×</span>
                    <img src={smartACLogo} alt="SmartAC" style={{ height: 36, width: "auto" }} />
                  </div>

                  {/* Badge */}
                  <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-0 px-4 py-2 rounded-2xl text-xs font-bold tracking-wide mb-8 text-center"
                       style={{ backgroundColor: SA.navyTint, border: `1px solid ${SA.navy}22`, color: SA.navy }}>
                    <span>OUR EXCLUSIVE MEMBERSHIP &amp; LOYALTY PARTNER</span>
                    <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
                    <span>INTEGRATES WITH SERVICETITAN</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6" style={{ color: SA.body }}>
                    Lock in <em style={{ color: SA.navy, fontStyle: "italic" }}>loyalty</em> with every home you visit
                  </h1>

                  <p className="text-lg mb-10" style={{ opacity: 0.75 }}>
                    SmartAC increases signups, boosts plan retention, and cuts the cost of managing your membership program. Book your demo to secure your ServiceTitan Hacks special offer.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                       style={{ backgroundColor: SA.navy, color: SA.white }}>
                      Book My Demo
                    </a>
                    <a href="#offer"
                       className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base border-2"
                       style={{ borderColor: SA.navy, color: SA.navy }}>
                      See the ServiceTitan Hacks Offer
                    </a>
                  </div>
                </div>

                {/* Right: phone mockup */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img src={smartACAppMockup} alt="SmartAC homeowner app showing loyalty rewards and 1-click scheduling"
                         className="rounded-2xl shadow-lg"
                         style={{ maxHeight: 520, width: "auto" }} />
                    {/* Callout labels */}
                    <div className="absolute top-6 -left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow"
                         style={{ backgroundColor: SA.white, color: SA.navy }}>Your logo here</div>
                    <div className="absolute top-1/4 -right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow"
                         style={{ backgroundColor: SA.navy, color: SA.white }}>1-click scheduling</div>
                    <div className="absolute top-1/2 -left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow"
                         style={{ backgroundColor: SA.white, color: SA.navy }}>Loyalty reward shown</div>
                    <div className="absolute bottom-6 -right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow"
                         style={{ backgroundColor: SA.navy, color: SA.white }}>Built-in filter store</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. BILL'S NOTE ── */}
          <section style={{ backgroundColor: SA.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-5" style={{ color: SA.red }}>
                WHY THIS PARTNERSHIP EXISTS
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 mb-8 text-center sm:text-left">
                <img src={billHeadshot} alt="Bill Brown" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: SA.body }}>A note from Bill</h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed" style={{ opacity: 0.85 }}>
                <p>Every contractor in this community knows the membership program is where the durable value lives. Recurring revenue, higher retention, and a customer base that holds up when the phone slows down. The hard part has always been the same. Getting homeowners to sign up, keeping them enrolled, and running the program without eating your team's time.</p>
                <p>SmartAC puts the membership in the homeowner's pocket. They book their own visits, they see their loyalty rewards, and the built-in filter store turns a one-time maintenance call into recurring revenue. All of it runs under your brand, so the customer sees you, not a third party.</p>
                <p>The contractors already running it are not small names. Abacus, Parker &amp; Sons, Vines, and the Houston HVAC Alliance are using it in the field today. That is the kind of proof I look for before I put a partnership in front of this community.</p>
                <p>I only partner with tools I would have used at Paramount. SmartAC is one of them.</p>
              </div>
              <p className="mt-8 font-bold text-base">
                Bill Brown <span className="font-normal" style={{ opacity: 0.55 }}>· Founder, ServiceTitan Hacks · Built and sold Paramount Heating and Air</span>
              </p>
              <p className="mt-4 text-xs" style={{ opacity: 0.45 }}>
                Transparency: SmartAC is a paid sponsor of ServiceTitan Hacks. We only accept sponsors whose products are vetted with real contractors in the community.
              </p>
            </div>
          </section>

          {/* ── 3. TRUST STRIP ── */}
          <section style={{ backgroundColor: SA.navyLight }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ opacity: 0.5 }}>
                TRUSTED IN THE FIELD
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10 max-w-2xl" style={{ color: SA.body }}>
                Trusted by 300+ professionals nationwide
              </h2>
              {/* Logo row placeholders */}
              <div className="flex flex-wrap items-center gap-6 mb-10">
                {["Laury", "Parker & Sons", "Vines", "Houston HVAC Alliance", "Abacus"].map((name) => (
                  <div key={name} className="px-4 py-2 rounded-xl text-sm font-semibold"
                       style={{ backgroundColor: SA.navyTint, color: SA.navy }}>
                    {name}
                  </div>
                ))}
              </div>
              {/* Pending quote */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: SA.navyMid, color: SA.white }}>
                <p className="text-lg leading-relaxed mb-4" style={{ fontStyle: "italic", opacity: 0.9 }}>
                  [Quote pending sign-off. A contractor customer will share their result here.]
                </p>
                <footer className="text-sm" style={{ opacity: 0.55 }}>[Contractor name, company, location]</footer>
              </div>
            </div>
          </section>

          {/* ── 4. WHAT SMARTAC DOES ── */}
          <section style={{ backgroundColor: SA.white }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center" style={{ color: SA.body }}>
                What SmartAC actually <em style={{ color: SA.navy }}>does</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {saFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="rounded-2xl p-8" style={{ backgroundColor: SA.navyLight }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                           style={{ backgroundColor: SA.navyTint }}>
                        <Icon size={22} style={{ color: SA.navy }} />
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: SA.body }}>{f.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {f.chips.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{ backgroundColor: SA.white, color: SA.navy, border: `1px solid ${SA.navyTint}` }}>
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>{f.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 5. STATS GRID ── */}
          <section style={{ backgroundColor: SA.navyLight }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-center" style={{ color: SA.body }}>
                What sets SmartAC apart
              </h2>
              <p className="text-sm text-center mb-10" style={{ opacity: 0.55 }}>Results reported by SmartAC across contractor accounts.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {saStats.map((s) => (
                  <div key={s.value} className="rounded-2xl p-7" style={{ backgroundColor: SA.white }}>
                    <p className="text-4xl font-extrabold mb-1" style={{ color: SA.navy }}>{s.value}</p>
                    <p className="text-sm font-bold mb-2" style={{ color: SA.body }}>{s.label}</p>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{s.body}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base"
                   style={{ backgroundColor: SA.navy, color: SA.white }}>
                  Book My Demo
                </a>
              </div>
            </div>
          </section>

          {/* ── 6. HOW IT WORKS ── */}
          <section style={{ backgroundColor: SA.white }} className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-12" style={{ color: SA.body }}>
                Up and running in <em style={{ color: SA.navy }}>4 steps</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {saSteps.map((s) => (
                  <div key={s.n} className="rounded-2xl p-7" style={{ backgroundColor: SA.navyLight }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-base mb-4"
                         style={{ backgroundColor: SA.navy, color: SA.white }}>
                      {s.n}
                    </div>
                    <h3 className="text-base font-bold mb-2" style={{ color: SA.body }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 7. CONTRACTOR TESTIMONIAL ── */}
          <section id="offer" style={{ backgroundColor: SA.navyMid, color: SA.white }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                Hear it from a contractor
              </h2>
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                {/* Video placeholder */}
                <div className="flex flex-col items-center justify-center gap-4 p-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: SA.navy }}>
                    <Play size={28} style={{ color: SA.white }} />
                  </div>
                  <p className="font-bold text-lg">Tony Patino, President</p>
                  <p className="text-sm" style={{ opacity: 0.65 }}>Abacus Plumbing, Air Conditioning &amp; Electrical</p>
                  <p className="text-xs mt-2" style={{ opacity: 0.4 }}>[Video embed pending. Drop in the Tony Patino testimonial URL.]</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 8. FAQ ── */}
          <section style={{ backgroundColor: SA.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10" style={{ color: SA.body }}>
                Questions every owner asks
              </h2>
              <div className="space-y-4">
                {saFaqs.map((f) => (
                  <div key={f.q} className="rounded-2xl p-7" style={{ backgroundColor: SA.navyLight }}>
                    <h3 className="text-base font-bold mb-2" style={{ color: SA.body }}>{f.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.72 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 9. FINAL CTA ── */}
          <section style={{ backgroundColor: SA.navy, color: SA.white }} className="px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to lock in <em style={{ color: SA.navyTint, fontStyle: "italic" }}>loyalty</em> on every visit?
              </h2>
              <p className="text-base mb-10 max-w-xl mx-auto" style={{ opacity: 0.75 }}>
                Book a demo and SmartAC will model the membership lift against your own numbers, then show you the ServiceTitan Hacks offer.
              </p>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base"
                 style={{ backgroundColor: SA.white, color: SA.navy }}>
                Book My Demo
              </a>
              <p className="mt-6 text-sm" style={{ opacity: 0.55 }}>
                Booking from this page tags you as a ServiceTitan Hacks member so you get the offer.
              </p>
            </div>
          </section>

        </main>
        <Footer />

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
                    href="https://go.st-hacks.cc/contractor-commerce?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
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

  // Render Broccoli AI page
  if (partner.slug === "broccoli-ai") {
    // ── PLACEHOLDER URLS – edit here before launch ──────────────────────────
    const WEBINAR_URL = "PLACEHOLDER_WEBINAR_URL?utm_source=sthacks&utm_medium=partner_page&utm_campaign=broccoli";
    const DEMO_URL    = "PLACEHOLDER_DEMO_URL?utm_source=sthacks&utm_medium=partner_page&utm_campaign=broccoli";
    const FOUND_MONEY_URL  = "PLACEHOLDER_TOOL_URL_FOUND_MONEY?utm_source=sthacks&utm_medium=partner_page&utm_campaign=broccoli";
    const SCORECARD_URL    = "PLACEHOLDER_TOOL_URL_SCORECARD?utm_source=sthacks&utm_medium=partner_page&utm_campaign=broccoli";
    // ────────────────────────────────────────────────────────────────────────

    const BL = {
      purple: "#7c3aed",
      deepPurple: "#5b21b6",
      darkPurple: "#3b1a6e",
      lavender: "#f4f0fc",
      lavenderDark: "#ede9fe",
      green: "#4ade80",
      badgeCream: "#fdf3d4",
      badgeBorder: "#ecdfae",
      red: "#ec164d",
      nearBlack: "#111111",
      body: "#1a1a1a",
      white: "#ffffff",
    };
    const font = { fontFamily: "Oxygen, Arial, sans-serif", color: BL.body };

    const blFeatures = [
      {
        icon: Phone,
        title: "Answers every call, even yours",
        chips: ["Inbound", "Overflow", "After-hours"],
        body: "Your AI CSR, Dane, picks up every call — whether it's 2 PM Tuesday or 11 PM Friday. Homeowners get a real conversation. Your team gets their evenings back.",
      },
      {
        icon: Calendar,
        title: "Books directly into ServiceTitan",
        chips: ["Native integration", "Live calendar", "Real bookings"],
        body: "Broccoli has direct access to your dispatch calendar. It checks availability, picks the right job type, and creates the booking in ServiceTitan without a human touching anything.",
      },
      {
        icon: ClipboardCheck,
        title: "Qualifies before it books",
        chips: ["Job type", "Service area", "Urgency"],
        body: "Not every call should be booked. Broccoli qualifies the opportunity — checks service area, captures the right job type, and routes calls that need a human to a human.",
      },
      {
        icon: PhoneCall,
        title: "Escalates when it needs to",
        chips: ["Live transfer", "Voicemail", "Follow-up"],
        body: "When Broccoli hits a situation it can't handle, it escalates cleanly: live transfer to an on-call CSR, or a structured voicemail that gets worked the next morning.",
      },
    ];

    const blSteps = [
      { n: "1", title: "Audit your call data", body: "Broccoli pulls your last 90 days of call data and maps exactly where bookings are leaking — missed calls, mishandled calls, after-hours gaps." },
      { n: "2", title: "Configure your AI", body: "Setup covers your service area, job types, dispatch calendar, and the voice and tone you want representing your brand." },
      { n: "3", title: "Run shadow calls", body: "Before Broccoli goes live, you hear it handle real call scenarios against your actual jobs. You approve the go-live." },
      { n: "4", title: "Go live and monitor", body: "Flip the switch. Every call, booking, and escalation is visible in a live dashboard. Your CSR team focuses on the calls that actually need them." },
    ];

    const blFaqs = [
      {
        q: "Will customers know they're talking to an AI?",
        a: "Dane actually doesn't identify himself as AI unless the client has customized him to do so.",
      },
      {
        q: "What if a customer asks something Broccoli can't handle?",
        a: "Broccoli escalates. It can transfer live to an on-call CSR, capture a structured voicemail, or schedule a callback. You define the escalation rules during setup. No call falls through without a next step.",
      },
      {
        q: "How does the ServiceTitan integration actually work?",
        a: "Broccoli is an official ServiceTitan technology partner. It connects to your ST account directly via API — reads your calendar, writes bookings, captures customer data. No middleware, no manual syncing.",
      },
      {
        q: "What does it cost?",
        a: "Pricing is based on call volume and scales with your business. Broccoli will model it against your actual inbound call data on the demo so you see the ROI before you sign anything. [Pricing detail pending sign-off]",
      },
    ];

    const handleBroccoliCallChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setBroccoliCallForm({ ...broccoliCallForm, [e.target.name]: e.target.value });

    const handleBroccoliCallSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!broccoliCallForm.name.trim() || !broccoliCallForm.phone.trim()) {
        toast({ title: "Please fill in your name and phone number.", variant: "destructive" });
        return;
      }
      broccoliCallbackMutation.mutate(broccoliCallForm);
    };

    return (
      <div className="min-h-screen flex flex-col" style={font}>
        <SEO
          title="Broccoli + ServiceTitan Hacks: Your Phones, Covered"
          description="AI CSR for ServiceTitan contractors. Broccoli answers calls, books jobs, and handles overflow so your team stops losing appointments."
          keywords="Broccoli AI, ServiceTitan partner, AI voice agent, AI CSR, contractor call handling, after-hours answering"
          canonicalUrl="https://servicetitanhacks.com/partners/broccoli-ai"
          ogImage="https://servicetitanhacks.com/og-broccoli.png"
          ogImageAlt="Broccoli + ServiceTitan Hacks: Your phones, covered. AI CSR + ServiceTitan integration."
        />
        <Header />
        <main className="flex-1" style={{ backgroundColor: BL.lavender, color: BL.body }}>

          {/* Back button – native element, no shadcn bg-background bleed */}
          <div style={{ backgroundColor: BL.lavender, padding: "28px 24px 0" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <button onClick={() => setLocation("/partners")}
                      data-testid="button-back-to-partners"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: BL.body, fontSize: 14, opacity: 0.7, padding: 0 }}>
                <ArrowLeft size={16} /> Back to Partners
              </button>
            </div>
          </div>

          {/* ── 1. HERO ────────────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.lavender }} className="px-6 pb-20 pt-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Co-brand lockup */}
              <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                <span style={{ fontFamily: "Oxygen, Arial, sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.01em", color: BL.body }}>
                  ServiceTitan <span style={{ color: BL.red }}>HACKS</span>
                </span>
                <span style={{ fontSize: 24, fontWeight: 300, opacity: 0.4 }}>×</span>
                <img src={broccoliLogo} alt="Broccoli AI" style={{ height: 40, width: "auto" }} />
              </div>

              {/* Badge */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-0 px-4 py-2 rounded-2xl text-xs font-bold tracking-wide mb-8 text-center"
                   style={{ backgroundColor: BL.badgeCream, border: `1px solid ${BL.badgeBorder}`, color: BL.body }}>
                <span>OUR EXCLUSIVE AI VOICE / AI CSR PARTNER</span>
                <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
                <span>FULLY INTEGRATES WITH SERVICETITAN</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: BL.body }}>
                Your phones, covered.<br />
                Your evenings, <em style={{ color: BL.purple, fontStyle: "italic" }}>back</em>.
              </h1>

              <p className="text-lg max-w-2xl mx-auto mb-10" style={{ opacity: 0.75 }}>
                Broccoli's AI voice agent answers every call, books jobs in ServiceTitan, and handles
                after-hours overflow — so your team isn't the bottleneck between a homeowner and a
                booked appointment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#ai-callback"
                   className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                   style={{ backgroundColor: BL.nearBlack, color: BL.white }}>
                  <Phone size={18} /> Have the AI Call You
                </a>
                <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                   style={{ backgroundColor: BL.red, color: BL.white }}>
                  <Calendar size={18} /> Save a Webinar Seat – Aug 12
                </a>
              </div>
            </div>
          </section>

          {/* ── 2. BILL'S NOTE ────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-5" style={{ color: BL.red }}>
                WHY THIS PARTNERSHIP EXISTS
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 mb-8 text-center sm:text-left">
                <img src={billHeadshot} alt="Bill Brown" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: BL.body }}>A note from Bill</h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed" style={{ opacity: 0.85 }}>
                <p>Every contractor I talk to in this community has the same problem: good CSRs are impossible to find, expensive to keep, and impossible to clone. Meanwhile, every missed call is a job your competitor is booking.</p>
                <p>I spent time watching Broccoli before putting this partnership together. The thing that convinced me wasn't the demo. It was listening to real calls — calls where homeowners had no idea they were talking to an AI. The booking happened. The job got scheduled. Nobody had to chase a voicemail.</p>
                <p>Broccoli integrates directly with ServiceTitan. That's not marketing language — it means the AI has access to your actual dispatch calendar, your actual job types, and your actual service areas. The booking is real. The data lands in ST automatically.</p>
                <p>I only partner with tools I would have used at Paramount. Broccoli is one of them.</p>
              </div>
              <p className="mt-8 font-bold text-base">
                Bill Brown <span className="font-normal" style={{ opacity: 0.55 }}>· Founder, ServiceTitan Hacks · Built and sold Paramount Heating &amp; Air</span>
              </p>
              <p className="mt-4 text-xs" style={{ opacity: 0.45 }}>
                Transparency: Broccoli AI is a paid sponsor of ServiceTitan Hacks. We only accept sponsors whose products we have vetted with real contractors in this community.
              </p>
            </div>
          </section>

          {/* ── 3. STATS ──────────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.lavender }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ opacity: 0.5 }}>
                NUMBERS WE VERIFIED BEFORE PUBLISHING
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10 max-w-2xl" style={{ color: BL.body }}>
                Numbers from real contractor locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { value: "10,000+", label: "On average, Broccoli handles over 10,000 calls a day" },
                  { value: "730", label: "730 ServiceTitan contractors live on Broccoli" },
                  { value: "3,952", label: "On average, Speed-to-Lead is catching about 3,952 leads per day" },
                ].map((s) => (
                  <div key={s.value} className="rounded-2xl p-6" style={{ backgroundColor: BL.white }}>
                    <p className="text-4xl font-extrabold mb-2" style={{ color: BL.purple }}>{s.value}</p>
                    <p className="text-sm" style={{ opacity: 0.7 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Quote card */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: BL.darkPurple, color: BL.white }}>
                <p className="text-lg leading-relaxed mb-4" style={{ fontStyle: "italic", opacity: 0.9 }}>
                  [Quote pending sign-off — a contractor customer will share their experience here.]
                </p>
                <footer className="text-sm" style={{ opacity: 0.55 }}>[Contractor name, company — location]</footer>
              </div>
            </div>
          </section>

          {/* ── 4. FEATURES ───────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.white }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center" style={{ color: BL.body }}>
                What Broccoli actually <em style={{ color: BL.purple }}>does</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="rounded-2xl p-8" style={{ backgroundColor: BL.lavender }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                           style={{ backgroundColor: BL.lavenderDark }}>
                        <Icon size={22} style={{ color: BL.purple }} />
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: BL.body }}>{f.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {f.chips.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{ backgroundColor: BL.white, color: BL.purple, border: `1px solid ${BL.lavenderDark}` }}>
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>{f.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 5. HOW IT WORKS ───────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.lavender }} className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-12" style={{ color: BL.body }}>
                From skeptic to covered in <em style={{ color: BL.purple }}>4 steps</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blSteps.map((s) => (
                  <div key={s.n} className="rounded-2xl p-7" style={{ backgroundColor: BL.white }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-base mb-4"
                         style={{ backgroundColor: BL.purple, color: BL.white }}>
                      {s.n}
                    </div>
                    <h3 className="text-base font-bold mb-2" style={{ color: BL.body }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 6. DARK SECTION: AUDIO + CALLBACK + WEBINAR ───────────── */}
          <section id="ai-callback" style={{ backgroundColor: BL.darkPurple, color: BL.white }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                <em style={{ color: BL.green, fontStyle: "italic" }}>Hear it</em> before you believe it
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left: audio + callback form */}
                <div className="rounded-2xl p-8 flex flex-col gap-6" style={{ backgroundColor: BL.deepPurple }}>
                  {/* Audio player placeholder */}
                  <div>
                    <p className="text-xs font-bold tracking-widest mb-4" style={{ color: BL.green }}>
                      SAMPLE CALL
                    </p>
                    <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                      <p className="text-sm font-semibold mb-3">Hear Dane handle a real dispatch call</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ backgroundColor: BL.green }}>
                          <Play size={18} style={{ color: BL.darkPurple }} />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                            <div className="h-2 rounded-full w-0" style={{ backgroundColor: BL.green }} />
                          </div>
                          <p className="text-xs mt-1" style={{ opacity: 0.45 }}>Audio pending — drop file here</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Callback form */}
                  <div>
                    <p className="text-xs font-bold tracking-widest mb-4" style={{ color: BL.green }}>
                      OR LET DANE CALL YOU
                    </p>
                    {broccoliCallConfirmed ? (
                      <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "rgba(74,222,128,0.15)", border: `1px solid ${BL.green}` }}>
                        <Check size={28} className="mx-auto mb-2" style={{ color: BL.green }} />
                        <p className="font-bold text-sm">Dane is calling you within 60 seconds.</p>
                        <p className="text-xs mt-1" style={{ opacity: 0.6 }}>Make sure your ringer is on.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleBroccoliCallSubmit} className="space-y-3">
                        <input name="name" placeholder="Your name" value={broccoliCallForm.name}
                               onChange={handleBroccoliCallChange}
                               className="w-full px-4 py-3 rounded-xl text-sm"
                               style={{ backgroundColor: BL.white, color: BL.body, border: "none", outline: "none" }} />
                        <input name="phone" placeholder="Your phone number" value={broccoliCallForm.phone}
                               onChange={handleBroccoliCallChange}
                               className="w-full px-4 py-3 rounded-xl text-sm"
                               style={{ backgroundColor: BL.white, color: BL.body, border: "none", outline: "none" }} />
                        <button type="submit" disabled={broccoliCallbackMutation.isPending}
                                className="w-full py-3 rounded-full font-bold text-sm"
                                style={{ backgroundColor: BL.nearBlack, color: BL.white }}>
                          {broccoliCallbackMutation.isPending ? "Connecting..." : "Call me now!"}
                        </button>
                        <p className="text-xs text-center" style={{ opacity: 0.4 }}>
                          A real AI call. No sales rep. No agenda. Just Dane.
                        </p>
                      </form>
                    )}
                  </div>
                </div>

                {/* Right: webinar card */}
                <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: BL.deepPurple }}>
                  <p className="text-xs font-bold tracking-widest mb-4" style={{ color: BL.red }}>
                    NEXT LIVE WEBINAR
                  </p>
                  <h3 className="text-2xl font-extrabold mb-3">
                    How contractors are putting their phones on autopilot
                  </h3>
                  <div className="flex items-center gap-2 text-sm mb-4" style={{ opacity: 0.7 }}>
                    <Calendar size={14} /> Tuesday, August 12 · 2 PM Eastern
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ opacity: 0.7 }}>
                    Live demo of Broccoli handling real call scenarios, Q&amp;A with the founders, and a
                    behind-the-scenes look at how the ServiceTitan integration actually works.
                    Replay sent to all registrants.
                  </p>
                  <div className="mt-auto">
                    <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
                       style={{ backgroundColor: BL.red, color: BL.white }}>
                      <Calendar size={16} /> Save My Seat
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── 7. FAQ ────────────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10" style={{ color: BL.body }}>
                Questions every owner asks
              </h2>
              <div className="space-y-4">
                {blFaqs.map((f) => (
                  <div key={f.q} className="rounded-2xl p-7" style={{ backgroundColor: BL.lavender }}>
                    <h3 className="text-base font-bold mb-2" style={{ color: BL.body }}>{f.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.72 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 8. FREE TOOLS STRIP ───────────────────────────────────── */}
          <section style={{ backgroundColor: "#fff5f8" }} className="px-6 py-14">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-6 text-center" style={{ color: BL.red }}>
                FREE TOOLS FROM SERVICETITAN HACKS
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Found Money Calculator",
                    body: "See how much revenue is leaking from missed and mishandled calls. Takes 90 seconds.",
                    href: FOUND_MONEY_URL,
                  },
                  {
                    title: "AI Voice Vendor Scorecard",
                    body: "Compare AI voice vendors side by side on the criteria that actually matter for home service contractors.",
                    href: SCORECARD_URL,
                  },
                ].map((t) => (
                  <div key={t.title} className="rounded-2xl p-7" style={{ backgroundColor: BL.white, border: `2px solid ${BL.red}` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                         style={{ backgroundColor: "#fff5f8" }}>
                      <FileText size={20} style={{ color: BL.red }} />
                    </div>
                    <h3 className="text-base font-bold mb-2" style={{ color: BL.body }}>{t.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ opacity: 0.7 }}>{t.body}</p>
                    <a href={t.href} target="_blank" rel="noopener noreferrer"
                       className="text-sm font-bold" style={{ color: BL.red }}>
                      Open the tool &rarr;
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 9. FINAL CTA ──────────────────────────────────────────── */}
          <section style={{ backgroundColor: BL.lavender }} className="px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: BL.body }}>
                Ready to hear <em style={{ color: BL.purple, fontStyle: "italic" }}>your</em> calls handled?
              </h2>
              <p className="text-base mb-8 max-w-xl mx-auto" style={{ opacity: 0.7 }}>
                Book a demo and Broccoli will pull your ServiceTitan call data live on the call —
                showing you exactly where bookings are slipping and what the AI would have done instead.
              </p>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                 style={{ backgroundColor: BL.nearBlack, color: BL.white }}>
                Book My Demo <ArrowRight size={18} />
              </a>
              <p className="mt-5 text-sm" style={{ opacity: 0.5 }}>
                Booking happens on Broccoli's calendar. Coming from this page tags you as a ServiceTitan
                Hacks member so you skip the line.
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    );
  }

  // Render ShareWillow page
  if (partner.slug === "sharewillow") {
    const SW = {
      cream: "#FAF7EC",
      ink: "#1C2B1C",
      yellow: "#F7EC6A",
      white: "#FFFFFF",
      pink: "#EC1B52",
    };
    const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

    const swStats = [
      { value: "$800 to $1,500+", label: "Average ticket before vs after switching to performance pay at Ron Williams' shops" },
      { value: "18%", label: "Target labor rate Ron's plumbing division runs on ShareWillow" },
      { value: "2 months", label: "From rollout to techs tracking their own numbers daily" },
    ];

    const swFeatures = [
      {
        icon: ClipboardList,
        title: "Plan design, done with you",
        body: "You don't start from a blank page. ShareWillow's incentive specialists build the plan around your numbers: the labor rate you can live with and the upside that gets techs excited.",
      },
      {
        icon: TrendingUp,
        title: "Shadow payroll takes the fear out",
        body: "The scariest sentence a tech can hear is 'we're changing how you get paid.' ShareWillow runs your real jobs through the new plan first, so every tech sees what they would have earned before anything changes.",
      },
      {
        icon: Database,
        title: "Official ServiceTitan partner",
        body: "ShareWillow pulls your ServiceTitan data directly. Before you spend a dollar, they can show you where your labor rate is bleeding and what the plan pays out on your actual jobs, not sample data.",
      },
      {
        icon: Smartphone,
        title: "Techs see it in real time",
        body: "A mobile app shows every tech where they stand today: one more five-star review, one more on-time arrival, and what it pays. Quarterly bonuses get treated like gifts. Real-time pay changes behavior.",
        screenshot: true,
      },
    ];

    const swSteps = [
      { n: "1", title: "Determine your cadence", body: "Weekly, biweekly, or monthly payouts. Most contractors start quarterly and tighten the feedback loop from there." },
      { n: "2", title: "Set up thresholds", body: "Company goals that have to be hit before the plan pays out, so payouts only happen when you can afford them." },
      { n: "3", title: "Establish formulas", body: "Different formulas by role: techs, installers, apprentices, office. Tenure minimums, splits, whatever fits your shop." },
      { n: "4", title: "Launch and share", body: "Invite your team into ShareWillow so they can see their calculations, goals, and payouts on one dashboard." },
    ];

    const swFaqs = [
      {
        q: "Will my techs quit if I change how they're paid?",
        a: "This is the #1 fear, and it's why ShareWillow built shadow payroll. Run both systems side by side and show each tech what they would have made. When Bill switched his own company, he paid whichever number was higher for 90 days. Performance pay won almost every week, and the team asked to switch.",
      },
      {
        q: "Is this just commission with extra steps?",
        a: "No. Commission pays for selling. Performance pay can reward whatever drives your business: on-time arrivals, five-star reviews, callback rates, job efficiency, revenue. You pick the metrics, ShareWillow handles the math and the transparency.",
      },
      {
        q: "When is the right time to switch?",
        a: "Most owners can't touch process changes mid-season. The playbook: get your plan designed now, run shadow payroll during the busy season, and flip the switch in the shoulder season when you have bandwidth. That conversation starts with a demo.",
      },
      {
        q: "What does it cost?",
        a: "Simple subscription priced on active participants, with an optional one-time plan design engagement. Get exact numbers on the demo; they'll model it against your headcount on the call.",
      },
    ];

    const handleSwChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setSwForm({ ...swForm, [e.target.name]: e.target.value });

    const handleSwSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      sharewillowDemoMutation.mutate(swForm);
    };

    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title="ShareWillow + ServiceTitan Hacks: Pay for Results"
          description="Performance pay software for ServiceTitan teams. ShareWillow helps contractors design, launch, and manage incentive plans tied to real numbers."
          keywords="ShareWillow, ServiceTitan partner, performance pay, incentive plans, employee bonuses, profit sharing"
          canonicalUrl="https://servicetitanhacks.com/partners/sharewillow"
          ogImage="https://servicetitanhacks.com/og-sharewillow.png"
          ogImageAlt="ShareWillow + ServiceTitan Hacks: Pay for results. Performance pay for ServiceTitan teams."
        />
        <Header />
        <main className="flex-1" style={{ backgroundColor: SW.cream, color: SW.ink }}>

          {/* Back button */}
          <div className="px-6 pt-8 max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setLocation("/partners")}
              data-testid="button-back-to-partners"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Button>
          </div>

          {/* HERO */}
          <section className="px-6 pt-10 pb-20 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span style={{ fontFamily: "Oxygen, Arial, sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: "-0.01em", color: SW.ink }}>
                ServiceTitan <span style={{ color: SW.pink }}>HACKS</span>
              </span>
              <span style={{ fontSize: 28, fontWeight: 300, opacity: 0.4 }}>×</span>
              <img src={sharewillowNewLogo} alt="ShareWillow" style={{ height: 44, width: "auto" }} />
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8"
                 style={{ backgroundColor: SW.yellow, color: SW.ink }}>
              OUR EXCLUSIVE PERFORMANCE PAY PARTNER
            </div>

            <h1 className="text-5xl md:text-6xl leading-tight mb-6" style={serif}>
              Stop buying hours.<br />
              Start paying for <em>results</em>.
            </h1>

            <p className="text-lg max-w-2xl mx-auto mb-10" style={{ opacity: 0.8 }}>
              ShareWillow helps contractors on ServiceTitan design, launch, and manage
              performance pay plans that get technicians thinking like owners. Vetted by
              this community, used by your peers, and the only incentive pay software we
              put our name behind.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://lp.sharewillow.com/sthacks?utm_source=sthacks&utm_medium=partner_page"
                 target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                 style={{ backgroundColor: SW.ink, color: SW.cream }}>
                Book a Demo <ArrowRight size={18} />
              </a>
              <a href="https://lp.sharewillow.com/sthacks-webinar?utm_source=sthacks&utm_medium=partner_page"
                 target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base border-2"
                 style={{ borderColor: SW.ink, color: SW.ink }}>
                <Play size={18} /> Watch the Free Webinar
              </a>
            </div>
          </section>

          {/* BILL'S NOTE */}
          <section style={{ backgroundColor: SW.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: SW.pink }}>
                WHY THIS PARTNERSHIP EXISTS
              </p>
              <div className="flex items-center gap-5 mb-8">
                <img src={billHeadshot} alt="Bill Brown" style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <h2 className="text-3xl md:text-4xl" style={serif}>
                  A note from Bill
                </h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed" style={{ opacity: 0.85 }}>
                <p>
                  When I ran Paramount Heating &amp; Air, the hardest conversation I ever had
                  with my team was telling them we were changing how they got paid. The most
                  fear you will ever see on a technician's face is in that moment. It feels
                  like you're telling them they might get fired.
                </p>
                <p>
                  So here's what I did: for 90 days I ran payroll both ways, hourly and
                  performance, and paid every tech whichever number was higher. Performance
                  pay won almost every single week. After that, nobody wanted to go back.
                  I have never met a contractor who switched to performance pay and regretted it.
                </p>
                <p>
                  The problem was never whether performance pay works. It's that designing the
                  plan, running the math, and showing techs their numbers in real time used to
                  take spreadsheets and a prayer. ShareWillow is the first tool I've seen that
                  handles all of it, and they're an official ServiceTitan partner, so it runs
                  on your real data.
                </p>
                <p>
                  That's why they're our exclusive partner in this category. I don't put this
                  community's name on tools I wouldn't have used in my own shop.
                </p>
              </div>
              <p className="mt-8 font-semibold" style={serif}>
                Bill Brown<span className="font-normal" style={{ opacity: 0.6 }}> · Founder, ServiceTitan Hacks · Built and sold Paramount Heating &amp; Air</span>
              </p>
              <p className="mt-4 text-xs" style={{ opacity: 0.5 }}>
                Transparency: ShareWillow is a paid sponsor of ServiceTitan Hacks. We only
                accept sponsors whose products we've vetted with real contractors in this community.
              </p>
            </div>
          </section>

          {/* RESULTS BAND */}
          <section style={{ backgroundColor: SW.yellow }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ opacity: 0.6 }}>
                FROM OUR LIVE WEBINAR
              </p>
              <h2 className="text-3xl md:text-4xl mb-10 max-w-2xl" style={serif}>
                Real numbers from a $5M shop that made the switch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {swStats.map((s) => (
                  <div key={s.value} className="rounded-2xl p-6" style={{ backgroundColor: SW.cream }}>
                    <p className="text-3xl font-bold mb-2" style={serif}>{s.value}</p>
                    <p className="text-sm" style={{ opacity: 0.75 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <blockquote className="rounded-2xl p-8" style={{ backgroundColor: SW.ink, color: SW.cream }}>
                <p className="text-lg leading-relaxed mb-4" style={serif}>
                  "I've been beating my head against the table for a long time trying to figure
                  out what to do, from commission to performance to new comp. ShareWillow made
                  it a lot easier for us. My plumbers are watching their numbers day in and day
                  out more than I ever could."
                </p>
                <footer className="text-sm" style={{ opacity: 0.7 }}>
                  Ron Williams · Benjamin Franklin Plumbing &amp; One Hour · Ocean City, MD
                </footer>
              </blockquote>
            </div>
          </section>

          {/* FEATURES */}
          <section style={{ backgroundColor: SW.cream }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-12 text-center" style={serif}>
                What ShareWillow actually <em>does</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {swFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="rounded-2xl p-8" style={{ backgroundColor: SW.white }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                           style={{ backgroundColor: SW.yellow }}>
                        <Icon size={22} style={{ color: SW.ink }} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3" style={serif}>{f.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>{f.body}</p>
                      {(f as any).screenshot && (
                        <div style={{ width: "100%", height: 160, backgroundColor: "#E8E3D5", border: "1px dashed #9B9484", borderRadius: 12, marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 11, color: "#9B9484", fontFamily: "monospace" }}>product screenshot</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ backgroundColor: SW.white }} className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-12" style={serif}>
                From hourly to performance pay in a <em>few easy steps</em>
              </h2>
              <div className="space-y-8">
                {swSteps.map((s) => (
                  <div key={s.n} className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                         style={{ backgroundColor: SW.ink, color: SW.cream }}>
                      {s.n}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={serif}>{s.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WEBINAR */}
          <section style={{ backgroundColor: SW.ink, color: SW.cream }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(250,247,236,0.07)" }}>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: SW.yellow }}>
                  WATCH NOW · FREE REPLAY
                </p>
                <h3 className="text-2xl mb-4" style={serif}>
                  The Incentive Plan Problem: Why Most Contractor Bonus Plans Fail
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ opacity: 0.7 }}>
                  Bill, Ron Williams, and ShareWillow founder Ryan Shank break down why
                  quarterly bonuses get treated like gifts, what an 18% labor rate plan
                  looks like, and how Ron's average ticket nearly doubled.
                </p>
                <a href="https://lp.sharewillow.com/sthacks-webinar?utm_source=sthacks&utm_medium=partner_page"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                   style={{ backgroundColor: SW.yellow, color: SW.ink }}>
                  <Play size={16} /> Watch the Replay
                </a>
              </div>
              <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(250,247,236,0.07)" }}>
                <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: SW.yellow }}>
                  NEXT LIVE WEBINAR
                </p>
                <h3 className="text-2xl mb-4" style={serif}>
                  How to Stop Buying Hours, Start Paying for Results, and Sell the Switch to Your Techs
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ opacity: 0.7 }}>
                  <Calendar size={14} className="inline mr-1" />
                  Wednesday, July 15 · 1 PM Eastern. Live with a ShareWillow customer telling
                  their rollout story, plus open Q&amp;A. Registration opens July 1; replay sent
                  to all registrants.
                </p>
                <a href="https://lp.sharewillow.com/sthacks-webinar?utm_source=sthacks&utm_medium=partner_page"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2"
                   style={{ borderColor: SW.cream, color: SW.cream }}>
                  Get Notified <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ backgroundColor: SW.cream }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-10" style={serif}>
                The questions every owner asks
              </h2>
              <div className="space-y-6">
                {swFaqs.map((f) => (
                  <div key={f.q} className="rounded-2xl p-7" style={{ backgroundColor: SW.white }}>
                    <h3 className="text-lg font-semibold mb-2" style={serif}>{f.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DEMO FORM */}
          <section id="demo" style={{ backgroundColor: SW.yellow }} className="px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl mb-4" style={serif}>
                See your numbers, not sample data
              </h2>
              <p className="text-base mb-10 max-w-xl mx-auto" style={{ opacity: 0.75 }}>
                Book a demo and ShareWillow will pull your ServiceTitan data live on the
                call: where your labor rate stands, and what a plan would have paid out on
                your actual jobs. Coming from ServiceTitan Hacks means you skip the line.
              </p>

              <a href="https://lp.sharewillow.com/sthacks?utm_source=sthacks&utm_medium=partner_page"
                 target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                 style={{ backgroundColor: SW.ink, color: SW.cream }}>
                Book My Demo <ArrowRight size={18} />
              </a>
              <p className="mt-6 text-sm" style={{ opacity: 0.6 }}>
                Booking happens on ShareWillow's calendar. Coming from this page tags you as a
                ServiceTitan Hacks member, so you skip the line.
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    );
  }

  // Render Jill's Office page
  if (partner.slug === "jills-office") {
    const JO = {
      orange: "#F39200",
      navy: "#16233F",
      lightBg: "#FFF8EE",
      midBg: "#FFF3DC",
      white: "#FFFFFF",
      red: "#ec164d",
    };
    const font = { fontFamily: "Oxygen, Arial, sans-serif" };

    const joPoints = [
      {
        icon: DollarSign,
        title: "Turns missed calls into a dollar figure.",
        body: "Plug in your real numbers and see the annual revenue at risk. One number, clearly labeled, with every variable you can adjust.",
      },
      {
        icon: FileText,
        title: "Uses benchmarks from Jill's Office.",
        body: "The default missed call and never call back rates come from Jill's Office data, attributed, and you can replace them with your own.",
      },
      {
        icon: BarChart3,
        title: "Shows the math.",
        body: "Every figure is calculated in the open so you can check it against your own reports. No black box.",
      },
    ];

    return (
      <div className="min-h-screen flex flex-col" style={font}>
        <SEO
          title="Jill's Office + ServiceTitan Hacks: Missed Call Cost Calculator"
          description="See what missed calls are costing your shop. A 90 second calculator built with Jill's Office, the live answering service for the trades."
          keywords="Jill's Office, ServiceTitan partner, live answering service, missed call calculator, call answering trades"
          canonicalUrl="https://servicetitanhacks.com/partners/jills-office"
          ogImage="https://servicetitanhacks.com/og-jills-office.png"
        />
        <Header />
        <main className="flex-1">

          {/* Back button */}
          <div className="px-6 pt-8 max-w-6xl mx-auto">
            <button
              onClick={() => setLocation("/partners")}
              data-testid="button-back-to-partners"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: JO.navy, fontSize: 14, opacity: 0.7, padding: 0 }}
            >
              <ArrowLeft size={16} /> Back to Partners
            </button>
          </div>

          {/* ── 1. HERO ── */}
          <section style={{ backgroundColor: JO.lightBg }} className="px-6 pb-20 pt-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Co-brand lockup */}
              <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                <span style={{ fontFamily: "Oxygen, Arial, sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: "-0.01em", color: JO.navy }}>
                  ServiceTitan <span style={{ color: JO.red }}>HACKS</span>
                </span>
                <span style={{ fontSize: 26, fontWeight: 300, opacity: 0.4, color: JO.navy }}>×</span>
                <img src={jillsOfficeLogo} alt="Jill's Office" style={{ height: 48, width: "auto" }} />
              </div>

              {/* Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8"
                   style={{ backgroundColor: JO.orange, color: JO.white }}>
                FREE TOOL, BUILT WITH JILL'S OFFICE
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: JO.navy }}>
                See what missed calls are costing your shop.
              </h1>

              <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: JO.navy, opacity: 0.75 }}>
                A 90 second calculator that turns your call volume, average ticket, and booking rate into a real dollar figure for the calls slipping past your team. Built with Jill's Office, the live answering service for the trades.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#calculator"
                   className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                   style={{ backgroundColor: JO.orange, color: JO.white }}>
                  Run your numbers
                </a>
                <a href="#webinar"
                   className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base"
                   style={{ backgroundColor: JO.navy, color: JO.white }}>
                  <Calendar size={18} /> Save your seat for June 24
                </a>
              </div>
            </div>
          </section>

          {/* ── 2. CALCULATOR PREVIEW ── */}
          <section id="calculator" style={{ backgroundColor: JO.white }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: JO.orange + "44" }}>
                {/* Panel header */}
                <div className="px-8 pt-8 pb-4" style={{ backgroundColor: JO.midBg }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
                    <h2 className="text-2xl font-extrabold" style={{ color: JO.navy }}>Missed Call Cost Calculator</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: JO.orange, color: JO.white, whiteSpace: "nowrap" }}>
                      Preview. Interactive version goes live June 24.
                    </span>
                  </div>
                </div>

                {/* Two-column body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Left: inputs */}
                  <div className="p-8 border-r" style={{ borderColor: JO.orange + "22", backgroundColor: JO.lightBg }}>
                    <p className="text-xs font-bold tracking-widest mb-5" style={{ color: JO.orange }}>YOUR NUMBERS</p>
                    <div className="space-y-4 mb-8">
                      {[
                        { label: "Monthly inbound calls", placeholder: "e.g. 400" },
                        { label: "Average booked job value ($)", placeholder: "e.g. 350" },
                        { label: "Booking rate on answered calls (%)", placeholder: "e.g. 70" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="block text-sm font-semibold mb-1" style={{ color: JO.navy }}>{field.label}</label>
                          <input
                            disabled
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-xl text-sm"
                            style={{ backgroundColor: JO.white, border: `1px solid ${JO.navy}22`, color: JO.navy, opacity: 0.5, cursor: "not-allowed" }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-bold tracking-widest mb-4" style={{ color: JO.navy, opacity: 0.5 }}>
                      BENCHMARKS (DEFAULT FROM JILL'S OFFICE DATA, ADJUST TO YOUR SHOP)
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: "Missed call rate (%)", placeholder: "e.g. 20" },
                        { label: "Never call back rate (%)", placeholder: "e.g. 60" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="block text-sm font-semibold mb-1" style={{ color: JO.navy }}>{field.label}</label>
                          <input
                            disabled
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-xl text-sm"
                            style={{ backgroundColor: JO.white, border: `1px solid ${JO.navy}22`, color: JO.navy, opacity: 0.5, cursor: "not-allowed" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: output */}
                  <div className="p-8 flex flex-col items-center justify-center text-center" style={{ backgroundColor: JO.navy }}>
                    <p className="text-xs font-bold tracking-widest mb-6" style={{ color: JO.orange }}>YOUR RESULT</p>
                    <div className="rounded-2xl p-8 w-full" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                      <p className="text-sm mb-3" style={{ color: JO.white, opacity: 0.6 }}>Annual revenue at risk</p>
                      <p className="text-6xl font-extrabold mb-4" style={{ color: JO.orange }}>$--,---</p>
                      <p className="text-base font-semibold mb-2" style={{ color: JO.white }}>Your number appears here</p>
                      <p className="text-sm" style={{ color: JO.white, opacity: 0.5 }}>We show the formula so you can verify every step.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. WHAT THIS CALCULATOR DOES ── */}
          <section style={{ backgroundColor: JO.lightBg }} className="px-6 py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center" style={{ color: JO.navy }}>
                What this calculator does
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {joPoints.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="rounded-2xl p-8" style={{ backgroundColor: JO.white }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                           style={{ backgroundColor: JO.midBg }}>
                        <Icon size={22} style={{ color: JO.orange }} />
                      </div>
                      <h3 className="text-base font-bold mb-2" style={{ color: JO.navy }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: JO.navy, opacity: 0.7 }}>{p.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 4. WEBINAR TIE-IN ── */}
          <section id="webinar" style={{ backgroundColor: JO.navy }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl p-10" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-bold tracking-widest mb-4" style={{ color: JO.orange }}>LIVE WEBINAR</p>
                <h3 className="text-2xl font-extrabold mb-3" style={{ color: JO.white }}>
                  When a Live Answering Team Beats Voicemail: A Profitability Lens for $3M+ Contractors
                </h3>
                <div className="flex items-center gap-2 text-sm mb-5" style={{ color: JO.white, opacity: 0.65 }}>
                  <Calendar size={14} /> Wednesday, June 24, 2026, 2:00 PM ET
                </div>
                <p className="text-sm leading-relaxed mb-8" style={{ color: JO.white, opacity: 0.7 }}>
                  We build your numbers live, then send the replay and the calculator to everyone who registers.
                </p>
                <a href="#"
                   className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
                   style={{ backgroundColor: JO.orange, color: JO.white }}>
                  <Calendar size={16} /> Save my seat
                </a>
              </div>
            </div>
          </section>

          {/* ── 5. ABOUT JILL'S OFFICE ── */}
          <section style={{ backgroundColor: JO.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-5 mb-8">
                <img src={jillsOfficeLogo} alt="Jill's Office" style={{ height: 48, width: "auto", flexShrink: 0 }} />
              </div>
              <h2 className="text-3xl font-extrabold mb-5" style={{ color: JO.navy }}>About Jill's Office</h2>
              <p className="text-base leading-relaxed" style={{ color: JO.navy, opacity: 0.8 }}>
                Jill's Office is the live answering service for the trades. According to Jill's Office, the team has spent 10+ years serving trade businesses, captured more than 1.6M leads, and handles over 100K calls a month, with an Excellent rating across 249 Google reviews. Jill's Office is a ServiceTitan Certified Provider.
              </p>
            </div>
          </section>

          {/* ── 6. CLOSING CTA ── */}
          <section style={{ backgroundColor: JO.midBg }} className="px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-4" style={{ color: JO.navy }}>Want help running your numbers?</h2>
              <p className="text-base mb-8" style={{ color: JO.navy, opacity: 0.75 }}>
                Book a 20 minute call with Jill's Office to pressure test your figures against what they see across the trades.
              </p>
              <a href="#"
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base"
                 style={{ backgroundColor: JO.orange, color: JO.white }}>
                Book a 20 minute call
              </a>
              <p className="mt-5 text-sm" style={{ color: JO.navy, opacity: 0.55 }}>
                Booking happens on Jill's Office's calendar. Coming from this page tags you as a ServiceTitan Hacks member.
              </p>
            </div>
          </section>

          {/* ── 7. A NOTE FROM BILL ── */}
          <section style={{ backgroundColor: JO.white }} className="px-6 py-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-bold tracking-widest mb-5" style={{ color: JO.orange }}>
                WHY THIS PARTNERSHIP EXISTS
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 mb-8 text-center sm:text-left">
                <img src={billHeadshot} alt="Bill Brown" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: JO.navy }}>A note from Bill</h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: JO.navy, opacity: 0.85 }}>
                <p>
                  Every contractor I talk to in this community has the same leak. Calls hit voicemail at 5:30 on a Friday, or ring out when both CSRs are already on the phone during a heat wave. Those calls do not show up in a report. They show up as booked jobs at the shop down the road that answered.
                </p>
                <p>
                  This calculator does one thing. It turns that leak into a number you can see. Jill's Office gave us the benchmarks behind it, and I built it so you can check every figure against your own reports.
                </p>
                <p>
                  A live answering team is one of three ways to close that gap. The calculator shows you the size of the gap. What you do about it is your call.
                </p>
              </div>
              <p className="mt-8 font-bold text-base" style={{ color: JO.navy }}>
                Bill Brown <span className="font-normal" style={{ opacity: 0.55 }}>· Founder, ServiceTitan Hacks · Built and sold Paramount Heating and Air</span>
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    );
  }

  // Render PhoneTap page
  if (partner.slug === "phonetap") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title="PhoneTap | ServiceTitan Hacks Partner"
          description="PhoneTap helps ServiceTitan contractors analyze calls, find missed revenue, fix bad call data, and give CSR managers clearer daily insights."
          keywords="PhoneTap, ServiceTitan partner, call intelligence, AI call analytics, CSR performance, missed revenue"
          canonicalUrl="https://servicetitanhacks.com/partners/phonetap"
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
                    src={phonetapLogo}
                    alt="PhoneTap logo"
                    className="object-contain max-h-16 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  PhoneTap
                </h1>

                <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto" data-testid="text-partner-description">
                  AI call intelligence for ServiceTitan contractors.
                </p>

                <p className="text-base text-muted-foreground mb-12 max-w-2xl mx-auto">
                  PhoneTap helps home service companies find missed calls, fix bad call data, and understand what is really happening on the phones.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-6">
              <p className="text-lg text-foreground mb-8 text-center max-w-3xl mx-auto">
                PhoneTap reviews your calls, classifies what happened, and gives managers a clear picture of booking performance, missed revenue, and CSR opportunities.
              </p>

              <div className="space-y-6 mb-12">
                <Card className="bg-card border-0" data-testid="card-feature-call-data">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      Fix bad call data in ServiceTitan
                    </h3>
                    <p className="text-foreground">
                      PhoneTap analyzes inbound calls and helps identify when call types, booking outcomes, or missed-call data are wrong. This gives managers cleaner reporting and a more accurate view of the business.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-missed-revenue">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      Find missed revenue opportunities
                    </h3>
                    <p className="text-foreground">
                      PhoneTap helps surface calls that were missed, mishandled, or not booked correctly, so your team can follow up before the opportunity is lost.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-csr-view">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">
                      Give CSR managers a clearer daily view
                    </h3>
                    <p className="text-foreground">
                      PhoneTap turns call activity into simple insights managers can use, including answered calls, booked calls, unbooked calls, missed calls, and calls that need attention.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center space-y-4">
                <a
                  href="https://phonetap.ai/demo?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-book-demo"
                >
                  <Button size="lg">
                    Book a Demo
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Render detailed DataTurk page
  if (partner.slug === "dataturk") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, funnel analytics, contractor analytics, HVAC reporting, ServiceTitan reporting`}
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
                    className="object-contain max-h-20 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  Know Your Numbers. Fix What's Broken. Grow Faster.
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-partner-description">
                  DataTurk's Funnel Report Card grades your ServiceTitan performance from call center to close — and shows you exactly where you're leaving money on the table.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <a
                    href="https://app.dataturk.ai/public/samples/funnel_report_card?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-view-sample"
                  >
                    <Button size="lg" className="gap-2">
                      View Sample Report <ExternalLink className="h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-get-started"
                  >
                    <Button size="lg" variant="outline" className="gap-2">
                      Get Started <ExternalLink className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Funnel Report Card */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-4 text-center">
                Sample Funnel Report Card
              </h2>
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                See how DataTurk grades every stage of your business funnel with actionable insights and dollar impact.
              </p>

              {/* TOP OF THE FUNNEL */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">TOP OF THE FUNNEL</h3>
                    <p className="text-muted-foreground">How well you capture attention, answer the phone, and book appointments</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Marketing Leads */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-yellow-600">B-</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Marketing Leads</h4>
                          <p className="text-foreground mb-3">You're doing well at capturing the attention of potential customers and answering the phone. There's room for improvement.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a B would mean as much as <strong>$51k additional revenue this month</strong> (about $610k/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase inbound calls to 1,824 (currently: 1,603)</li>
                              <li>• Increase unique callers percentage to 74% (currently: 69%)</li>
                              <li>• Reduce abandoned calls to 0 (currently: 92)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Classification */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-orange-600">C</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Lead Classification</h4>
                          <p className="text-foreground mb-3">You're doing so-so at identifying how well the call center distinguishes opportunities from non-opportunities. This is worth improving.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a C+ would mean as much as <strong>$51k additional revenue this month</strong> (about $610k/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase inbound booked calls to opportunities rate to 86% (currently: 78%)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booking */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-600">D</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Booking</h4>
                          <p className="text-foreground mb-3">You're doing poorly at turning interest into action — getting callers to book an appointment. Let's focus on getting you back on track.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a C would mean as much as <strong>$100k additional revenue this month</strong> (about $1.2M/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase inbound booked calls to 305 (currently: 244)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* MIDDLE OF THE FUNNEL */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">MIDDLE OF THE FUNNEL</h3>
                    <p className="text-muted-foreground">How well you dispatch techs and create opportunities to sell</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Dispatch */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-yellow-600">B-</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Dispatch</h4>
                          <p className="text-foreground mb-3">You're doing well at getting technicians assigned and out to jobs. There's room for improvement.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a B would mean as much as <strong>$100k additional revenue this month</strong> (about $1.2M/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase appointments count to 582 (currently: 466)</li>
                              <li>• Increase appointments kept rate to 92% (currently: 89%)</li>
                              <li>• Reduce appointments canceled rate to 8% (currently: 10%)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunity To Sell */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-orange-600">C</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Opportunity To Sell</h4>
                          <p className="text-foreground mb-3">You're doing so-so at creating chances for your team to present solutions once they arrive at the customer's home. This is worth improving.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a C+ would mean as much as <strong>$150k additional revenue this month</strong> (about $1.8M/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase total sales leads count to 255 (currently: 186)</li>
                              <li>• Increase sales lead closing rate to 56% (currently: 37%)</li>
                              <li>• Increase estimate written percentage to 56% (currently: 45%)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* BOTTOM OF THE FUNNEL */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">BOTTOM OF THE FUNNEL</h3>
                    <p className="text-muted-foreground">How well you turn opportunities into completed jobs and grow revenue</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Conversion */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-orange-600">C</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Conversion</h4>
                          <p className="text-foreground mb-3">You're doing so-so at turning sales opportunities into completed jobs. This is worth improving.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a C+ would mean as much as <strong>$200k additional revenue this month</strong> (about $2.4M/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase sold estimate count to 103 (currently: 69)</li>
                              <li>• Increase estimate written percentage to 50% (currently: 45%)</li>
                              <li>• Increase sales lead closing rate to 42% (currently: 37%)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Trend */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-orange-600">C</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">Revenue Trend</h4>
                          <p className="text-foreground mb-3">You're doing so-so at growing revenue over time. Keep your eye on your revenue trend line to make sure it's moving in the right direction.</p>
                          <div className="bg-primary/5 rounded-lg p-4 mb-3">
                            <p className="text-sm font-medium text-primary mb-2">Revenue Impact</p>
                            <p className="text-foreground">Achieving a C+ would mean as much as <strong>$700k additional revenue this month</strong> (about $8.4M/year).</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">How to improve:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Increase total threshold jobs count to 250 (currently: 167)</li>
                              <li>• Increase average threshold job revenue to $2.90k (currently: $2.35k)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Total Potential Impact */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Total Potential Annual Revenue Impact</h3>
                  <div className="text-5xl font-bold text-primary mb-4">$16M+</div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    This sample report shows how small improvements across your funnel can add up to massive revenue gains. Get your own personalized Funnel Report Card to see exactly where your business is leaving money on the table.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6">
                Ready to See Your Grade?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get your free Funnel Report Card and discover where your business is leaving money on the table.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://app.dataturk.ai/public/samples/funnel_report_card?utm_source=servicetitanhacks&utm_medium=partner_page&utm_campaign=landing_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-view-sample-cta"
                >
                  <Button size="lg" className="gap-2">
                    View Sample Report <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-get-started-cta"
                >
                  <Button size="lg" variant="outline" className="gap-2">
                    Get Your Report <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
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
