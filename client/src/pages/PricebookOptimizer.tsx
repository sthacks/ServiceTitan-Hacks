import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPricebookOptimizationSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Copy, Check, Loader2, ArrowRight } from "lucide-react";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";

const CHECKOUT_URL = "https://buy.stripe.com/cNi4gy86A39aep9gCAgbm0J";

const formSchema = insertPricebookOptimizationSchema.extend({
  honeypot: z.string().max(0),
});

interface OptimizationResult {
  optimizedDescription: string;
  originalDescription: string;
  category: string;
}

export default function PricebookOptimizer() {
  const { toast } = useToast();
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const howItWorksItems = [
    {
      title: "Removes confusing words",
      description: "and keeps a professional tone that shows you know what you're doing.",
    },
    {
      title: "Shows real benefits",
      description: "like better comfort, performance, and peace of mind for homeowners.",
    },
    {
      title: "Uses examples homeowners understand",
      description: "that explain why doing the job right matters.",
    },
    {
      title: "Highlights your quality work",
      description: "instead of talking about quick or easy shortcuts.",
    },
    {
      title: "Shows what makes you different",
      description: "like better materials, newer technology, and work that lasts.",
    },
  ];

  const categories = [
    { label: "HVAC", value: "HVAC" },
    { label: "HVAC Repair", value: "HVAC Repair" },
    { label: "HVAC Maintenance", value: "HVAC Maintenance" },
    { label: "HVAC Cleanings", value: "HVAC Cleanings" },
    { label: "HVAC System Replacement/Installation", value: "HVAC System Replacement/Installation" },
    { label: "Plumbing", value: "Plumbing" },
    { label: "Drain Cleaning/Unclogging", value: "Drain Cleaning/Unclogging" },
    { label: "Faucet Repair or Replacement", value: "Faucet Repair or Replacement" },
    { label: "Garbage Disposal Installation", value: "Garbage Disposal Installation" },
    { label: "Gas Line Installation or Repair", value: "Gas Line Installation or Repair" },
    { label: "Leak Detection and Repair", value: "Leak Detection and Repair" },
    { label: "Pipe Repair or Repiping", value: "Pipe Repair or Repiping" },
    { label: "Sewer Line Repair/Replacement", value: "Sewer Line Repair/Replacement" },
    { label: "Shower/Tub Installation or Upgrade", value: "Shower/Tub Installation or Upgrade" },
    { label: "Sump Pump Installation/Repair", value: "Sump Pump Installation/Repair" },
    { label: "Toilet Repair or Replacement", value: "Toilet Repair or Replacement" },
    { label: "Water Heater Repair", value: "Water Heater Repair" },
    { label: "Water Heater Replacement (Tank/Tankless)", value: "Water Heater Replacement (Tank/Tankless)" },
    { label: "Water Softener/Filtration System Installation", value: "Water Softener/Filtration System Installation" },
    { label: "Electrical", value: "Electrical" },
    { label: "Ceiling Fan Installation", value: "Ceiling Fan Installation" },
    { label: "Circuit Breaker Replacement", value: "Circuit Breaker Replacement" },
    { label: "Code Compliance Corrections", value: "Code Compliance Corrections" },
    { label: "Electrical Panel Upgrade/Replacement", value: "Electrical Panel Upgrade/Replacement" },
    { label: "Electrical Troubleshooting", value: "Electrical Troubleshooting" },
    { label: "EV Charger Installation", value: "EV Charger Installation" },
    { label: "Generator Installation", value: "Generator Installation" },
    { label: "Lighting Installation (Indoor/Outdoor)", value: "Lighting Installation (Indoor/Outdoor)" },
    { label: "Low Voltage Wiring (Doorbells, Data)", value: "Low Voltage Wiring (Doorbells, Data)" },
    { label: "Outlet/Switch Installation or Repair", value: "Outlet/Switch Installation or Repair" },
    { label: "Smart Home System Installation", value: "Smart Home System Installation" },
    { label: "Smoke/CO Detector Installation", value: "Smoke/CO Detector Installation" },
    { label: "Surge Protection System", value: "Surge Protection System" },
    { label: "Whole-Home Rewiring", value: "Whole-Home Rewiring" },
    { label: "OTHER", value: "OTHER" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      otherCategory: "",
      currentDescription: "",
      firstName: "",
      lastName: "",
      email: "",
      honeypot: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (data.honeypot) throw new Error("Spam detected");
      const { honeypot, ...submitData } = data;
      const response = await apiRequest("POST", "/api/pricebook-optimization", submitData);
      return response.json();
    },
    onSuccess: (data: any) => {
      setFormSubmitted(true);
      setSubmitError(null);

      // Track form submission
      try { (window as any).gtag?.("event", "pricebook_optimizer_submit"); } catch {}
      try { (window as any).fbq?.("track", "Lead"); } catch {}

      if (data.optimization) {
        setResult({
          optimizedDescription: data.optimization.optimizedDescription,
          originalDescription: data.optimization.originalDescription,
          category: data.optimization.category,
        });
        setCopied(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    onError: (error: any) => {
      const msg = error.message || "Something went wrong. Please try again or email bill@st-hacks.com";
      setSubmitError(msg);
      setResult(null);
      console.error("[pricebook-optimizer] submission error:", error);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
  });

  const autoSaveMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/pricebook-optimization/autosave", data);
      return response.json();
    },
  });

  const abandonedMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/pricebook-optimization/abandoned", data);
      return response.json();
    },
  });

  // Auto-save when form data changes
  useEffect(() => {
    const email = form.watch("email");
    const category = form.watch("category");
    const currentDescription = form.watch("currentDescription");
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    const otherCategory = form.watch("otherCategory");

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && category && currentDescription && currentDescription.length >= 10) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSaveMutation.mutate({ 
          email, 
          category, 
          currentDescription, 
          firstName, 
          lastName,
          otherCategory 
        });
      }, 1000);
    }
    
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [form.watch("email"), form.watch("category"), form.watch("currentDescription"), form.watch("firstName"), form.watch("lastName"), form.watch("otherCategory")]);

  // Track form abandonment
  useEffect(() => {
    const email = form.watch("email");

    const handleBeforeUnload = () => {
      if (email && !formSubmitted) {
        navigator.sendBeacon('/api/pricebook-optimization/abandoned', JSON.stringify({ email }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (email && !formSubmitted) {
        abandonedMutation.mutate({ email });
      }
    };
  }, [form.watch("email"), formSubmitted]);

  const handleCopy = async () => {
    if (result?.optimizedDescription) {
      await navigator.clipboard.writeText(result.optimizedDescription);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Optimized description copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Pricebook Optimizer Tool for HVAC Contractors"
        description="Free AI tool to transform technical descriptions into customer-friendly language. Boost conversions and help homeowners understand your services."
        keywords="pricebook optimizer, AI pricebook, ServiceTitan pricebook, service descriptions, ChatGPT"
        canonicalUrl="https://servicetitanhacks.com/pricebook-overhaul-tool"
        ogImage="https://servicetitanhacks.com/og-pricebook-optimizer.png"
      />
      <Header />
      <main className="flex-1">
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Is your ServiceTitan Pricebook always a work-in-progress?
              </h1>
              <p className="text-2xl text-muted-foreground mb-4">
                We solved that with this simple tool
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                This AI tool helps you turn technical service descriptions into simple language homeowners can easily understand. No confusing jargon. Just clear words that show your quality work and care.
              </p>
              <Button 
                size="lg"
                onClick={() => {
                  document.getElementById('try-it-form')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                data-testid="button-try-it"
              >
                Try it - no sign up, no credit card needed
              </Button>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Download your pricebook from ServiceTitan</h3>
                      <p className="text-muted-foreground">Export your current pricebook file from your ServiceTitan account.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Upload it to our tool</h3>
                      <p className="text-muted-foreground">Simply upload your pricebook file and let our AI get to work.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Our AI rewrites your descriptions</h3>
                      <p className="text-muted-foreground">The AI changes technical details into simple explanations homeowners can understand—talking about comfort, safety, and real value.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">We send the file back to you</h3>
                      <p className="text-muted-foreground">Get your updated pricebook file with all the new descriptions ready to go.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Review and upload to ServiceTitan</h3>
                      <p className="text-muted-foreground">Look over the changes, make any tweaks you want, then upload it back to ServiceTitan.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">What You Get</h2>
                <ul className="space-y-4">
                  {howItWorksItems.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold">{item.title}</span>{" "}
                        <span className="text-muted-foreground">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">Why It Matters</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When you speak clearly and confidently, homeowners feel informed instead of pressured. This builds trust and shows you're a true professional who delivers quality work that lasts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="try-it-form" className="py-16 bg-muted">
          <div className="mx-auto max-w-3xl px-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold font-heading mb-4">Turn One of Your Pricebook Items Into a Homeowner-Friendly Description</h2>
                <p className="text-muted-foreground mb-6">
                  We'll take your technical explanation and rewrite it in plain, engaging language that helps your techs connect with homeowners and build value—fast.
                </p>
                <p className="text-sm text-muted-foreground mb-8 italic">
                  The more detail you provide in your description, the better the results. Also, these descriptions can be 100% customized to your company.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose a category *</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setShowOtherCategory(value === "OTHER");
                            }} 
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Please Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showOtherCategory && (
                      <FormField
                        control={form.control}
                        name="otherCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Category *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Examples: ac repair, water heater replacement, electrical"
                                data-testid="input-other-category"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="currentDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current description from ServiceTitan Pricebook *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder="The more detail, the better the result from the AI."
                              data-testid="textarea-current-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="John"
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Smith"
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              placeholder="john@example.com"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem style={{ position: "absolute", left: "-9999px" }}>
                          <FormControl>
                            <Input 
                              {...field} 
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? "Rewriting..." : "Rewrite Description"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loading state */}
        {mutation.isPending && (
          <section className="py-12 bg-background">
            <div className="mx-auto max-w-3xl px-6">
              <div className="flex flex-col items-center gap-4 text-muted-foreground" data-testid="status-loading">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-base font-medium">Rewriting your description...</p>
              </div>
            </div>
          </section>
        )}

        {/* Results / error section */}
        {(result || submitError) && !mutation.isPending && (
          <section id="results-section" className="py-16 bg-background" ref={resultRef}>
            <div className="mx-auto max-w-4xl px-6">

              {submitError && (
                <Card className="mb-8 border-destructive/50 bg-destructive/5">
                  <CardContent className="p-6">
                    <p className="text-destructive font-medium" data-testid="text-error">
                      {submitError.includes("bill@st-hacks.com")
                        ? submitError
                        : "Something went wrong. Please try again or email bill@st-hacks.com"}
                    </p>
                  </CardContent>
                </Card>
              )}

              {result && (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-heading mb-2" data-testid="heading-result">Your rewritten description</h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-1">
                          <h3 className="font-semibold text-lg">Original</h3>
                          <Badge variant="outline">Before</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-original">{result.originalDescription}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-1">
                          <h3 className="font-semibold text-lg text-primary">Rewritten</h3>
                          <Badge>After</Badge>
                        </div>
                        <div className="whitespace-pre-line leading-relaxed" data-testid="text-optimized">
                          {result.optimizedDescription}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-primary/5 border-primary/20 mb-6">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-semibold mb-1">Ready to paste into ServiceTitan</h3>
                          <p className="text-sm text-muted-foreground">
                            Copy and paste the rewritten description directly into your pricebook.
                          </p>
                        </div>
                        <Button
                          onClick={handleCopy}
                          size="lg"
                          className="whitespace-nowrap"
                          data-testid="button-copy-description"
                        >
                          {copied ? (
                            <><Check className="mr-2 h-4 w-4" />Copied!</>
                          ) : (
                            <><Copy className="mr-2 h-4 w-4" />Copy Description</>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upgrade CTA */}
                  <Card className="bg-primary text-primary-foreground mb-8">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold font-heading mb-2" data-testid="heading-upsell">
                        This is one item. Imagine your entire pricebook rewritten.
                      </h3>
                      <p className="text-primary-foreground/80 mb-6 text-sm" data-testid="text-upsell-subhead">
                        Founder pricing: $395 to overhaul your full pricebook. 6 spots left of 10.
                      </p>
                      <a
                        href={CHECKOUT_URL}
                        target="_self"
                        data-testid="button-claim-founder-spot"
                        onClick={() => {
                          try { (window as any).gtag?.("event", "pricebook_optimizer_claim_founder"); } catch {}
                          try { (window as any).fbq?.("track", "InitiateCheckout"); } catch {}
                        }}
                      >
                        <Button
                          size="lg"
                          className="bg-white text-primary border-white gap-2 mb-4"
                        >
                          Claim a Founder Spot — $395 <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                      <div>
                        <button
                          className="text-primary-foreground/70 text-sm underline underline-offset-2 hover:text-primary-foreground transition-colors"
                          data-testid="button-try-another"
                          onClick={() => {
                            form.setValue("category", "");
                            form.setValue("currentDescription", "");
                            form.setValue("otherCategory", "");
                            setShowOtherCategory(false);
                            setResult(null);
                            setSubmitError(null);
                            document.getElementById("try-it-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        >
                          Try another description
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
