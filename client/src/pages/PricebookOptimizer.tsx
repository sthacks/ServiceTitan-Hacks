import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { CheckCircle2, Copy, Check } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

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
      // Check honeypot
      if (data.honeypot) {
        throw new Error("Spam detected");
      }

      const { honeypot, ...submitData } = data;
      const response = await apiRequest("POST", "/api/pricebook-optimization", submitData);
      return response.json();
    },
    onSuccess: (data: any) => {
      if (data.optimization) {
        setResult({
          optimizedDescription: data.optimization.optimizedDescription,
          originalDescription: data.optimization.originalDescription,
          category: data.optimization.category,
        });
        setCopied(false);
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
      
      toast({
        title: "Success!",
        description: "Your optimized description is ready below.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

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
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-heading mb-4">
                    Make Your Pricebook Easy for Homeowners to Understand
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    We'll take your technical description and rewrite it in simple, clear language that helps your techs connect with homeowners and show value—fast.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>The more details you give us, the better your results will be.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>We can customize these descriptions to match your company style.</strong>
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                    {/* Before/After Example */}
                    <div className="bg-muted/50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-lg mb-4">See the Difference</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Before</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            replace outdoor ac fan motor and fan blade
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>After</Badge>
                          </div>
                          <div className="text-sm whitespace-pre-line">
                            {`We replace the failing fan motor and blade with properly matched, weather-rated parts, then set rotation, balance, and clearances to factory specs. This restores airflow, protects the compressor from overheating, and improves cooling efficiency and noise levels—especially during heat waves.
•Correct motor, blade, and capacitor pairing
•Precision balancing to reduce vibration
•Sealed bearings for durability
•Airflow and amp-draw verification`}
                          </div>
                        </div>
                      </div>
                    </div>

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
                            <FormLabel>Other Category</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Examples: ac repair, water heater replacement, electrical" 
                                {...field}
                                value={field.value || ""}
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
                              placeholder="The more detail, the better the result from the AI." 
                              className="min-h-32"
                              {...field} 
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
                              <Input {...field} data-testid="input-first-name" />
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
                              <Input {...field} data-testid="input-last-name" />
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
                            <Input type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot field */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} tabIndex={-1} autoComplete="off" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-optimize-it"
                    >
                      {mutation.isPending ? "Submitting..." : "OPTIMIZE IT"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {result && (
          <section id="results-section" className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading mb-2">Your Optimized Description</h2>
                <p className="text-muted-foreground">Here's your homeowner-friendly pricebook description</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Original Description</h3>
                      <Badge variant="outline">Before</Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{result.originalDescription}</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-primary">Optimized Description</h3>
                      <Badge>After</Badge>
                    </div>
                    <div className="whitespace-pre-line leading-relaxed">
                      {result.optimizedDescription}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Ready to use in ServiceTitan</h3>
                      <p className="text-sm text-muted-foreground">
                        Copy this optimized description and paste it into your ServiceTitan pricebook.
                      </p>
                    </div>
                    <Button 
                      onClick={handleCopy} 
                      size="lg"
                      className="whitespace-nowrap"
                      data-testid="button-copy-description"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Description
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setResult(null);
                    form.reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  data-testid="button-optimize-another"
                >
                  Optimize Another Description
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
