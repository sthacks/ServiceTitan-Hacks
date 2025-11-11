import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";

export default function SmartACDemoForm() {
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
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Book a Demo with SmartAC | ServiceTitan Hacks"
        description="Fill out the form to schedule a demo with SmartAC and see how smart sensors and monitoring can grow your HVAC membership program."
        keywords="SmartAC, HVAC, membership program, demo, smart sensors"
        canonicalUrl="https://servicetitanhacks.com/partners/smartac/book-demo"
      />
      <Header />
      <main className="flex-1 bg-background">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/partners/smartac")}
              className="mb-8"
              data-testid="button-back-to-smartac"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to SmartAC
            </Button>

            <div className="mb-8 flex items-center justify-center">
              <img
                src={smartACLogo}
                alt="SmartAC logo"
                className="object-contain max-h-24 w-auto"
                data-testid="img-smartac-logo"
              />
            </div>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-3xl font-heading text-center">Fill up the form to Book a Demo</CardTitle>
                <CardDescription className="text-center text-base">
                  Complete all fields below to get started with SmartAC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        data-testid="input-firstname"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        data-testid="input-lastname"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Cell phone number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company name *</Label>
                      <Input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        data-testid="input-company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="websiteUrl">Website URL *</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        data-testid="input-website"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="zipCode">Zip code *</Label>
                      <Input
                        id="zipCode"
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        data-testid="input-zipcode"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">What is your role? *</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger data-testid="select-role">
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
                    <Label htmlFor="isLicensedContractor">Are you a licensed residential HVAC contractor? *</Label>
                    <Select value={isLicensedContractor} onValueChange={setIsLicensedContractor}>
                      <SelectTrigger data-testid="select-licensed">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="readyToGrow">When would you be ready to grow your HVAC business with SmartAC? *</Label>
                    <Select value={readyToGrow} onValueChange={setReadyToGrow}>
                      <SelectTrigger data-testid="select-ready">
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
                    <Label htmlFor="membershipAgreements">How many membership agreements do you have? *</Label>
                    <Select value={membershipAgreements} onValueChange={setMembershipAgreements}>
                      <SelectTrigger data-testid="select-memberships">
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
                        <RadioGroupItem value="under500k" id="revenue1" data-testid="radio-revenue-under500k" />
                        <Label htmlFor="revenue1" className="font-normal cursor-pointer">Under $500K</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="500k-3m" id="revenue2" data-testid="radio-revenue-500k-3m" />
                        <Label htmlFor="revenue2" className="font-normal cursor-pointer">$500K - $3MM</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3m-10m" id="revenue3" data-testid="radio-revenue-3m-10m" />
                        <Label htmlFor="revenue3" className="font-normal cursor-pointer">$3MM - $10MM</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10m-20m" id="revenue4" data-testid="radio-revenue-10m-20m" />
                        <Label htmlFor="revenue4" className="font-normal cursor-pointer">$10MM - $20MM</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="20m+" id="revenue5" data-testid="radio-revenue-20m+" />
                        <Label htmlFor="revenue5" className="font-normal cursor-pointer">$20MM+</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Number of service trucks *</Label>
                    <RadioGroup value={serviceTrucks} onValueChange={setServiceTrucks} className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-4" id="trucks1" data-testid="radio-trucks-1-4" />
                        <Label htmlFor="trucks1" className="font-normal cursor-pointer">1-4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5-10" id="trucks2" data-testid="radio-trucks-5-10" />
                        <Label htmlFor="trucks2" className="font-normal cursor-pointer">5-10</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="11-20" id="trucks3" data-testid="radio-trucks-11-20" />
                        <Label htmlFor="trucks3" className="font-normal cursor-pointer">11-20</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="21-39" id="trucks4" data-testid="radio-trucks-21-39" />
                        <Label htmlFor="trucks4" className="font-normal cursor-pointer">21-39</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="40+" id="trucks5" data-testid="radio-trucks-40+" />
                        <Label htmlFor="trucks5" className="font-normal cursor-pointer">40+</Label>
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
                    size="lg"
                    data-testid="button-submit"
                  >
                    {smartACDemoMutation.isPending ? "Submitting..." : "Submit Demo Request"}
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
