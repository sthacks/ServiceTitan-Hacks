import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Package, Clock, Truck, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import amazonLogo from "@assets/amazon-logo-transparent_1761309654831.png";
import lowesProLogo from "@assets/lowes_pro_logo_RGB_horz_1761309909176.png";
import daikinLogo from "@assets/DAIKIN_logo.svg_1761309721068.png";
import goodmanLogo from "@assets/lveq8sixrzoasc1g9pnm_1761309482725.jpg";
import equipmentImage from "@assets/equipment_1761310475748.png";
import waterHeatersImage from "@assets/water heaters_1761310497282.png";
import toolsImage from "@assets/tools_1761310506283.png";

export default function PurchasingPlatform() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    zipCode: "",
    productInterest: "HVAC"
  });

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Equipment Buying Group | Get Pricing the Big Guys Get – ServiceTitan Hacks";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Access national-account pricing for HVAC equipment, water heaters, and tools—no contracts, no minimums. Free for ServiceTitan Hacks members.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Access national-account pricing for HVAC equipment, water heaters, and tools—no contracts, no minimums. Free for ServiceTitan Hacks members.";
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "ServiceTitan Hacks";
    };
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        company: data.company,
        message: `Zip Code: ${data.zipCode}\nProduct Interest: ${data.productInterest}`,
        role: "Equipment Buying Group Inquiry",
        consent: "Equipment Buying Group Contact Form"
      });
    },
    onSuccess: () => {
      toast({
        title: "Access Request Received!",
        description: "We'll get back to you within 24 hours with access details.",
      });
      setFormData({ name: "", email: "", company: "", zipCode: "", productInterest: "HVAC" });
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
        <section className="py-20 md:py-24 text-center bg-[#1F1F1F] text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Buy Like Private Equity
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 text-gray-200">
              Get the pricing that the big guys get on HVAC, water heaters, and tools—no minimums, no contracts, no catch.
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
        </section>

        {/* Brand Logos Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Buy from Leading Brands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-center justify-center">
                  <img src={lowesProLogo} alt="Lowe's Pro" className="h-16 w-auto object-contain" />
                </CardContent>
              </Card>
              <Card className="hover-elevate">
                <CardContent className="p-6 flex items-center justify-center">
                  <img src={amazonLogo} alt="Amazon" className="h-12 w-auto object-contain" />
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
        <section id="how-it-works" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              HOW IT WORKS
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
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
                  <p className="text-center text-muted-foreground">Search live inventory from Goodman, Daikin, Lowe's, Amazon, and more.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              WHAT YOU CAN BUY
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Everything you need to run your business, all in one place.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                      <span>Exclusive Lowe's partnership</span>
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

              <Card className="overflow-hidden hover-elevate" data-testid="card-product-tools">
                <div className="aspect-video bg-muted flex items-center justify-center p-6">
                  <img src={toolsImage} alt="Tools & Materials" className="max-h-full w-auto object-contain" />
                </div>
                <CardHeader>
                  <CardTitle>Tools & Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Milwaukee, DeWalt, and more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Power tools and hand tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Parts and supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Volume pricing available</span>
                    </li>
                  </ul>
                  <a href="#form">
                    <Button variant="outline" className="w-full gap-2" data-testid="button-tools-cta">
                      See Available Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Powered by Industry Leaders */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              POWERED BY INDUSTRY LEADERS
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-8">Verified Partnerships. Authorized Pricing.</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 max-w-4xl mx-auto">
              <div className="text-center">
                <img src={goodmanLogo} alt="Goodman" className="h-16 md:h-20 w-auto object-contain mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Direct Factory Pricing</p>
              </div>
              <div className="text-center">
                <img src={daikinLogo} alt="Daikin" className="h-16 md:h-20 w-auto object-contain mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Authorized Distributor</p>
              </div>
              <div className="text-center">
                <img src={lowesProLogo} alt="Lowe's Pro" className="h-16 md:h-20 w-auto object-contain mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Exclusive Partnership</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
              Our platform is built on partnerships with Goodman/Daikin and integrated with over 1,200 distributor locations nationwide.
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
              Join hundreds of contractors already buying smarter through our Equipment Buying Group.
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
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-name"
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
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="input-company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="12345"
                        data-testid="input-zipcode"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Product Interest *
                      </label>
                      <select
                        required
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-product-interest"
                      >
                        <option value="HVAC">HVAC Equipment</option>
                        <option value="Water Heaters">Water Heaters</option>
                        <option value="Tools">Tools & Materials</option>
                        <option value="All">All Products</option>
                      </select>
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
