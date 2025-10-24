import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingCart, Truck, Clock, DollarSign, Package, Wrench, Home } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import titleBg from "@assets/title-background.png";
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
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", {
        ...data,
        role: "Purchasing Platform Inquiry",
        consent: "Purchasing Platform Contact Form"
      });
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${titleBg})` }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                Buy Like Private Equity
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Big firms get rock-bottom pricing. Now you can too.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                Access bulk-rate savings on HVAC equipment, water heaters, and tools — no buyout, no contracts, no catch.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Stop overpaying. Start buying like the pros.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#get-started">
                  <Button size="lg" data-testid="button-get-started">
                    Get Started
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm" data-testid="button-learn-more">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor Logos Section */}
        <section className="py-12 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Shop From Leading Brands</h2>
              <p className="text-muted-foreground">Access inventory from Goodman, Daikin, Lowe's, Amazon, and more</p>
            </div>
            <div className="flex items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto overflow-x-auto">
              <img src={goodmanLogo} alt="Goodman" className="h-12 md:h-16 object-contain transition-all opacity-90 hover:opacity-100" />
              <img src={daikinLogo} alt="Daikin" className="h-12 md:h-16 object-contain transition-all opacity-90 hover:opacity-100" />
              <img src={lowesProLogo} alt="Lowe's Pro" className="h-12 md:h-16 object-contain transition-all opacity-90 hover:opacity-100" />
              <img src={amazonLogo} alt="Amazon" className="h-10 md:h-12 object-contain transition-all opacity-90 hover:opacity-100" />
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Why Contractors Choose Our Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access pricing and benefits that were previously only available to large national companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <a href="#get-started" className="block">
              <Card data-testid="card-benefit-pricing" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <DollarSign className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Tens of Thousands in Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Save tens of thousands per year with pricing that's sharper than distributor rates.
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="#get-started" className="block">
              <Card data-testid="card-benefit-access" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <Package className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Fair Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    2-truck shops get the same pricing as invitation homes and national accounts.
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="#get-started" className="block">
              <Card data-testid="card-benefit-convenience" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Order Anytime</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    80% of orders happen before 8am or after 7pm. No more waiting at the branch.
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="#get-started" className="block">
              <Card data-testid="card-benefit-pickup" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <Truck className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Local Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pick up at 1,200+ locations including Johnstone, Ferguson, and East Coast Metals.
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and designed for contractors who don't have time to waste.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign up with your email, add a payment method, and set your home address or preferred pickup location.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Browse & Order</h3>
                <p className="text-muted-foreground">
                  Search our live inventory feed from Goodman, Daikin, Lowes, Amazon, and more. Order equipment, water heaters, tools, and materials at the same pricing that national accounts get.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pick Up or Get Delivery</h3>
                <p className="text-muted-foreground">
                  Choose pickup at your local distributor (Goodman/Daikin, Johnstone, Ferguson, East Coast Metals and more) or request delivery to your jobsite.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save & Reinvest</h3>
                <p className="text-muted-foreground">
                  Use your savings to invest in marketing, training, or better equipment. Lower expenses mean higher profits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* What You Can Buy Section */}
        <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              What You Can Buy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run your business, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="#get-started" className="block">
              <Card data-testid="card-product-hvac" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <img src={equipmentImage} alt="HVAC Equipment" className="h-24 w-auto object-contain mb-3" />
                  <CardTitle>HVAC Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
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
                </CardContent>
              </Card>
            </a>

            <a href="#get-started" className="block">
              <Card data-testid="card-product-water" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <img src={waterHeatersImage} alt="Water Heaters" className="h-24 w-auto object-contain mb-3" />
                  <CardTitle>Water Heaters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
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
                </CardContent>
              </Card>
            </a>

            <a href="#get-started" className="block">
              <Card data-testid="card-product-tools" className="h-full hover-elevate active-elevate-2 cursor-pointer">
                <CardHeader>
                  <img src={toolsImage} alt="Tools & Materials" className="h-24 w-auto object-contain mb-3" />
                  <CardTitle>Tools & Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
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
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

        {/* Partnership Section */}
        <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-center">
                  Powered by Industry Leaders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Our platform is built on partnerships with Goodman/Daikin and integrated with over 1,200 distributor locations nationwide.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4">
                    <Package className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Goodman/Daikin</h3>
                    <p className="text-sm text-muted-foreground">Direct factory pricing</p>
                  </div>
                  <div className="text-center p-4">
                    <Truck className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">1,200+ Locations</h3>
                    <p className="text-sm text-muted-foreground">Johnstone, Ferguson, East Coast Metals</p>
                  </div>
                  <div className="text-center p-4">
                    <Home className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Lowe's Partner</h3>
                    <p className="text-sm text-muted-foreground">Exclusive water heater pricing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* Get Started Section */}
        <section id="get-started" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Ready to Start Saving?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get in touch to learn more about pricing and how to get started with the Purchasing Platform.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name *
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
                      Email Address *
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
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about your business and what you're interested in..."
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "Sending..." : "Get Started"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Footer */}
        <section className="py-16 bg-gradient-to-br from-[#ED254E] via-[#C1124F] to-[#8B0E38] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
            Join Hundreds of Contractors Saving Money
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Stop overpaying for equipment. Get the pricing you deserve and reinvest those savings into growing your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#get-started">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm" data-testid="button-footer-cta">
                Contact Us Today
              </Button>
            </a>
            <Link href="/">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
