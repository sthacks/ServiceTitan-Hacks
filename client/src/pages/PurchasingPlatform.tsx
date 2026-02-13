import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Package, Clock, Truck, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import daikinLogo from "@assets/DAIKIN_logo.svg_1761309721068.png";
import goodmanLogo from "@assets/lveq8sixrzoasc1g9pnm_1761309482725.jpg";
import equipmentImage from "@assets/equipment_1761310475748.png";
import waterHeatersImage from "@assets/water heaters_1761310497282.png";
import buyingGroupImage from "@assets/$ (1)_1761314542186.png";

export default function PurchasingPlatform() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyWebsite: "",
    companyName: "",
    contractorLicense: "",
    issuingAuthority: ""
  });

  // SEO & Open Graph Meta Tags
  useEffect(() => {
    document.title = "Contractor Purchasing Platform";
    
    // Standard meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover vetted software, AI tools and services for HVAC, plumbing and electrical contractors looking to scale.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Discover vetted software, AI tools and services for HVAC, plumbing and electrical contractors looking to scale.";
      document.head.appendChild(meta);
    }

    // Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Contractor Purchasing Platform' },
      { property: 'og:description', content: 'Discover vetted software, AI tools and services for HVAC, plumbing and electrical contractors looking to scale.' },
      { property: 'og:image', content: 'https://servicetitanhacks.com/og-purchasing-platform.png' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://servicetitanhacks.com/purchasing-platform' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Contractor Purchasing Platform' },
      { name: 'twitter:description', content: 'Discover vetted software, AI tools and services for HVAC, plumbing and electrical contractors looking to scale.' },
      { name: 'twitter:image', content: 'https://servicetitanhacks.com/og-purchasing-platform.png' },
    ];

    ogTags.forEach(tag => {
      const property = tag.property || '';
      const name = tag.name || '';
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      
      let metaTag = document.querySelector(selector);
      if (metaTag) {
        metaTag.setAttribute('content', tag.content);
      } else {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        }
        if (name) {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', tag.content);
        document.head.appendChild(metaTag);
      }
    });

    return () => {
      document.title = "ServiceTitan Hacks";
    };
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company: data.companyWebsite,
        message: `Phone: ${data.phone}\nCompany Website: ${data.companyWebsite}\nCompany Name: ${data.companyName}\nContractor License #: ${data.contractorLicense}\nIssuing Authority: ${data.issuingAuthority}`,
        role: "HVAC Equipment Purchasing Platform Inquiry",
        consent: "HVAC Equipment Purchasing Platform Contact Form"
      });
    },
    onSuccess: () => {
      toast({
        title: "Access Request Received!",
        description: "We'll get back to you within 24 hours with access details.",
      });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", companyWebsite: "", companyName: "", contractorLicense: "", issuingAuthority: "" });
    },
    onError: () => {
      toast({
        title: "Failed to send",
        description: "Please email bill@st-hacks.com directly.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #09090b 0%, #1a1b20 100%)' }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Buy Like Private Equity
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-300">
                Get the pricing that the big guys get on HVAC and water heaters—no minimums, no contracts, no catch.
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                100% Free for ServiceTitan Hacks Facebook Group Members
              </p>
              <a href="#form">
                <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-hero-cta">
                  Get Access
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Brand Logos Section */}
        <section className="relative py-12 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #09090b 0%, #1a1b20 100%)' }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-8 text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Access Live Inventory for
            </h2>
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-center justify-center">
                  <img src={goodmanLogo} alt="Goodman" className="h-16 w-auto object-contain" />
                </CardContent>
              </Card>
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-center justify-center">
                  <img src={daikinLogo} alt="Daikin" className="h-16 w-auto object-contain" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Contractors Choose Us */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              WHY CONTRACTORS CHOOSE US
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="text-center" data-testid="card-benefit-savings">
                <CardHeader>
                  <DollarSign className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">Tens of Thousands in Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Save thousands each year with pricing previously reserved for national accounts.</p>
                </CardContent>
              </Card>

              <Card className="text-center" data-testid="card-benefit-minimums">
                <CardHeader>
                  <Package className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">No Minimums</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">2-truck shops get the same pricing as invitation homes and national accounts.</p>
                </CardContent>
              </Card>

              <Card className="text-center" data-testid="card-benefit-anytime">
                <CardHeader>
                  <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">Order Anytime</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Order online 24/7. No more waiting at the branch.</p>
                </CardContent>
              </Card>

              <Card className="text-center" data-testid="card-benefit-pickup">
                <CardHeader>
                  <Truck className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">Local Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Pick up at 1,200+ locations nationwide or get delivery to your jobsite.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-16 md:py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #09090b 0%, #1a1b20 100%)' }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-4 text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              HOW IT WORKS
            </h2>
            <p className="text-lg text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              Simple 4-step process for contractors who don't have time to waste.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="relative" data-testid="card-step-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    1
                  </div>
                  <CardTitle className="text-center text-lg">Create Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Sign up with your email and set your preferred pickup location.</p>
                </CardContent>
              </Card>

              <Card className="relative" data-testid="card-step-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    2
                  </div>
                  <CardTitle className="text-center text-lg">Browse & Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Search live inventory from Goodman, Daikin, and other leading brands.</p>
                </CardContent>
              </Card>

              <Card className="relative" data-testid="card-step-3">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    3
                  </div>
                  <CardTitle className="text-center text-lg">Pick Up or Get Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Choose local pickup or delivery to your jobsite.</p>
                </CardContent>
              </Card>

              <Card className="relative" data-testid="card-step-4">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    4
                  </div>
                  <CardTitle className="text-center text-lg">Save & Reinvest</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Use your savings to invest in marketing, training, or better equipment.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You Can Buy Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              WHAT YOU CAN BUY
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="overflow-hidden hover-elevate" data-testid="card-product-hvac">
                <div className="aspect-video bg-muted flex items-center justify-center p-6">
                  <img src={equipmentImage} alt="HVAC Equipment" className="max-h-full w-auto object-contain" />
                </div>
                <CardHeader>
                  <CardTitle>HVAC Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Goodman, Daikin, and major brands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>AC units, heat pumps, furnaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Dual fuel and package units</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Avoided all tariff increases</span>
                    </li>
                  </ul>
                  <a href="#form">
                    <Button variant="outline" className="w-full gap-2" data-testid="button-hvac-cta">
                      See Available Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-elevate" data-testid="card-product-water">
                <div className="aspect-video bg-muted flex items-center justify-center p-6">
                  <img src={waterHeatersImage} alt="Water Heaters" className="max-h-full w-auto object-contain" />
                </div>
                <CardHeader>
                  <CardTitle>Water Heaters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>National account pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Locked pricing for 12 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Tank and tankless options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Delivery available</span>
                    </li>
                  </ul>
                  <a href="#form">
                    <Button variant="outline" className="w-full gap-2" data-testid="button-water-cta">
                      See Available Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Powered by Industry Leaders */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-3 text-black" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              POWERED BY INDUSTRY LEADERS
            </h2>
            <p className="text-center text-sm text-black mb-8">Verified Supply Chain. Wholesale-Level Pricing.</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 max-w-4xl mx-auto">
              <div className="text-center">
                <img src={goodmanLogo} alt="Goodman" className="h-16 md:h-20 w-auto object-contain mx-auto mb-2" />
                <p className="text-sm text-black">Contractor-Exclusive Pricing</p>
              </div>
              <div className="text-center">
                <img src={daikinLogo} alt="Daikin" className="h-16 md:h-20 w-auto object-contain mx-auto mb-2" />
                <p className="text-sm text-black">Genuine Equipment Supplier</p>
              </div>
            </div>
            <p className="text-center text-black mt-8 max-w-3xl mx-auto">
              Our platform provides access to genuine Goodman and Daikin equipment through over 1,200 distributor locations nationwide.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Ready to Start Saving?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of contractors already buying smarter through our HVAC Equipment Purchasing Platform.
            </p>
            <a href="#form">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 border-white px-8 py-6 h-auto text-lg" data-testid="button-cta-section">
                Get Access
              </Button>
            </a>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get Access</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours with access details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-firstname"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-lastname"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company Website *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyWebsite}
                        onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="yourcompany.com"
                        data-testid="input-website"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your company name"
                        data-testid="input-company-name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Contractor License # *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contractorLicense}
                        onChange={(e) => setFormData({ ...formData, contractorLicense: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your contractor license number"
                        data-testid="input-contractor-license"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Issuing Authority *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.issuingAuthority}
                        onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., California Contractors State License Board"
                        data-testid="input-issuing-authority"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        required
                        id="terms-agreement"
                        data-testid="input-terms-agreement"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="terms-agreement" className="text-sm text-muted-foreground">
                        I agree to the{" "}
                        <a href="https://www.purchasingplatform.com/terms-of-membership" target="_blank" rel="noopener noreferrer" className="text-primary underline">Terms of Membership</a>,{" "}
                        <a href="https://www.purchasingplatform.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline">Terms of Use</a>{" "}
                        &amp;{" "}
                        <a href="https://www.purchasingplatform.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Privacy Policy</a>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-form"
                    >
                      {contactMutation.isPending ? "Sending..." : "Get Access"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
