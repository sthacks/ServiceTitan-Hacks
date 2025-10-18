import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

const formSchema = insertPricebookOptimizationSchema.extend({
  honeypot: z.string().max(0),
});

export default function PricebookOptimizer() {
  const { toast } = useToast();
  const [showOtherCategory, setShowOtherCategory] = useState(false);

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
      return apiRequest("POST", "/api/pricebook-optimization", submitData);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your optimized description will be sent to your email shortly.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Talk to Homeowners in Plain English
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                This AI tool helps you turn technical service descriptions into simple language homeowners can easily understand. No confusing jargon. Just clear words that show your quality work and care.
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">What It Does</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  It changes technical details into simple explanations homeowners can understand. Each description talks about comfort, safety, and how your work helps them—so homeowners see the real value in what you do.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">How It Works</h2>
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

        <section className="py-16 bg-muted">
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
      </main>
      <Footer />
    </div>
  );
}
