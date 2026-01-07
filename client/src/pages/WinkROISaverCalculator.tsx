import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calculator, Copy, Calendar, FileText, CheckCircle, DollarSign, TrendingUp, Target } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";

const STORAGE_KEY = "wink-roi-saver-lead-submitted";
const STORAGE_KEY_INPUTS = "wink-roi-saver-inputs";

const BASE_FEE = 499;
const IMPLEMENTATION_FEE = 2000;
const FREE_INVOICES = 200;
const COST_PER_INVOICE = 0.48;

const leadFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phoneNumber: z.string().max(50).optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface CalculatorInputs {
  invoicesPerMonth: number;
  minutesPerInvoice: number;
  hourlyRate: number;
  errorRate: number;
  costPerError: number;
  amortizeMonths: number;
}

interface CalculationResults {
  winkMonthlyCost: number;
  totalWinkMonthlyCost: number;
  manualLaborCost: number;
  manualErrorCost: number;
  totalManualMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  roi: number;
  breakEvenInvoices: number | null;
  savesFromDayOne: boolean;
}

const defaultInputs: CalculatorInputs = {
  invoicesPerMonth: 500,
  minutesPerInvoice: 8,
  hourlyRate: 30,
  errorRate: 2,
  costPerError: 150,
  amortizeMonths: 12,
};

function calculateROI(inputs: CalculatorInputs): CalculationResults {
  const {
    invoicesPerMonth,
    minutesPerInvoice,
    hourlyRate,
    errorRate,
    costPerError,
    amortizeMonths,
  } = inputs;

  const winkInvoiceCost = invoicesPerMonth <= FREE_INVOICES 
    ? 0 
    : (invoicesPerMonth - FREE_INVOICES) * COST_PER_INVOICE;
  
  const amortizedSetup = IMPLEMENTATION_FEE / amortizeMonths;
  const totalWinkMonthlyCost = winkInvoiceCost + amortizedSetup;

  const manualLaborCost = (invoicesPerMonth * minutesPerInvoice / 60) * hourlyRate;
  const manualErrorCost = invoicesPerMonth * (errorRate / 100) * costPerError;
  const totalManualMonthlyCost = manualLaborCost + manualErrorCost;

  const monthlySavings = totalManualMonthlyCost - totalWinkMonthlyCost;
  const annualSavings = monthlySavings * 12;
  
  const totalAnnualWinkCost = (BASE_FEE * 12) + IMPLEMENTATION_FEE;
  const roi = totalAnnualWinkCost > 0 ? ((annualSavings / totalAnnualWinkCost) * 100) : 0;

  const manualCostPerInvoice = (minutesPerInvoice / 60) * hourlyRate + (errorRate / 100) * costPerError;
  
  let breakEvenInvoices: number | null = null;
  let savesFromDayOne = false;
  
  if (monthlySavings > 0 && invoicesPerMonth <= FREE_INVOICES) {
    savesFromDayOne = true;
  } else if (manualCostPerInvoice > COST_PER_INVOICE) {
    const fixedMonthlyCosts = amortizedSetup;
    breakEvenInvoices = Math.ceil((fixedMonthlyCosts + FREE_INVOICES * COST_PER_INVOICE) / (manualCostPerInvoice - COST_PER_INVOICE));
    if (breakEvenInvoices <= invoicesPerMonth) {
      savesFromDayOne = true;
    }
  }

  return {
    winkMonthlyCost: winkInvoiceCost,
    totalWinkMonthlyCost,
    manualLaborCost,
    manualErrorCost,
    totalManualMonthlyCost,
    monthlySavings,
    annualSavings,
    roi,
    breakEvenInvoices,
    savesFromDayOne,
  };
}

export default function WinkROISaverCalculator() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadAlreadyCaptured, setLeadAlreadyCaptured] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setLeadAlreadyCaptured(true);
      setShowResults(true);
    }
    
    const params = new URLSearchParams(window.location.search);
    if (params.get("test") === "1") {
      setTestMode(true);
    }

    const storedInputs = localStorage.getItem(STORAGE_KEY_INPUTS);
    let loadedInputs = { ...defaultInputs };
    if (storedInputs) {
      try {
        loadedInputs = { ...loadedInputs, ...JSON.parse(storedInputs) };
      } catch {}
    }

    const inputParams: (keyof CalculatorInputs)[] = [
      "invoicesPerMonth", "minutesPerInvoice", "hourlyRate", 
      "errorRate", "costPerError", "amortizeMonths"
    ];
    inputParams.forEach(key => {
      const val = params.get(key);
      if (val) loadedInputs[key] = parseFloat(val);
    });

    setInputs(loadedInputs);
  }, []);

  useEffect(() => {
    const calcResults = calculateROI(inputs);
    setResults(calcResults);
    localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(inputs));
  }, [inputs]);

  const leadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      return await apiRequest("POST", "/api/wink-roi-saver", data);
    },
    onSuccess: () => {
      localStorage.setItem(STORAGE_KEY, "true");
      setLeadAlreadyCaptured(true);
      setShowResults(true);
      setShowLeadModal(false);
      form.reset();
      toast({
        title: "Results Ready!",
        description: "Your savings report is displayed below.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });

  const handleShowResults = () => {
    if (testMode) {
      setShowResults(true);
      toast({
        title: "Test Mode Active",
        description: "Lead capture bypassed for testing.",
      });
    } else if (leadAlreadyCaptured) {
      setShowResults(true);
    } else {
      setShowLeadModal(true);
    }
  };

  const handleLeadSubmit = (data: LeadFormData) => {
    leadMutation.mutate(data);
  };

  const handleSliderChange = (field: keyof CalculatorInputs, value: number[]) => {
    setInputs(prev => ({ ...prev, [field]: value[0] }));
  };

  const copyCalculatorLink = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      params.set(key, value.toString());
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Calculator link copied to clipboard.",
    });
  };

  const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const formatPercent = (value: number) => `${Math.round(value)}%`;

  const sliderInputs = [
    { key: "invoicesPerMonth", label: "Invoices each month", min: 200, max: 10000, step: 50, suffix: "" },
    { key: "minutesPerInvoice", label: "Minutes per invoice (old way)", min: 1, max: 20, step: 0.5, suffix: " min", hint: "Includes reading, typing, and checking your work" },
    { key: "hourlyRate", label: "Hourly labor cost", min: 15, max: 100, step: 1, prefix: "$" },
    { key: "errorRate", label: "Error rate (old way)", min: 0, max: 10, step: 0.5, suffix: "%" },
    { key: "costPerError", label: "Cost per error", min: 50, max: 350, step: 10, prefix: "$" },
    { key: "amortizeMonths", label: "Spread setup cost over", min: 6, max: 24, step: 1, suffix: " months" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Wink Toolbox ROI Calculator | ServiceTitan Hacks"
        description="Calculate how much money you can save with Wink Toolbox invoice automation. See your monthly and annual savings instantly."
        keywords="Wink Toolbox, ROI calculator, invoice automation, ServiceTitan, OCR"
        canonicalUrl="https://servicetitanhacks.com/wink-roi-saver"
      />
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <img src={winkLogo} alt="Wink Toolbox" className="h-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Wink Toolbox ROI Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how much you can save by automating invoice processing. Adjust the sliders to match your business.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                What is Wink Toolbox?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What Wink Toolbox Does:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      Reads invoices and finds the important information
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      Finds company names, totals, and dates
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      Splits up documents with many pages
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      Works with your accounting software
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Why Businesses Like It:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      Save 15-30 hours every month
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      Make 90% fewer mistakes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      No need to hire more people
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      Gets it right 96% of the time
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Your Business Numbers
                  </CardTitle>
                  <CardDescription>
                    Adjust these values based on your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sliderInputs.map((input) => (
                    <div key={input.key} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">{input.label}</Label>
                        <span className="text-sm font-semibold text-primary">
                          {input.prefix || ""}{inputs[input.key as keyof CalculatorInputs]}{input.suffix || ""}
                        </span>
                      </div>
                      <Slider
                        value={[inputs[input.key as keyof CalculatorInputs]]}
                        onValueChange={(value) => handleSliderChange(input.key as keyof CalculatorInputs, value)}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        className="w-full"
                        data-testid={`slider-${input.key}`}
                      />
                      {input.hint && (
                        <p className="text-xs text-muted-foreground">{input.hint}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Wink Toolbox Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Fee</span>
                    <span className="font-medium">${BASE_FEE}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Setup Fee (one-time)</span>
                    <span className="font-medium">${IMPLEMENTATION_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">First 200 invoices</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Additional invoices</span>
                    <span className="font-medium">${COST_PER_INVOICE}/each</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {!showResults && (
                <Card className="border-primary/50 bg-primary/5">
                  <CardContent className="pt-6 text-center space-y-4">
                    <Calculator className="h-12 w-12 mx-auto text-primary/60" />
                    <div>
                      <p className="text-xl font-bold mb-1">
                        Ready to See Your Savings?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Enter your info to see your personalized ROI report based on the numbers above.
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handleShowResults}
                      data-testid="button-see-results"
                    >
                      Get My Results
                    </Button>
                  </CardContent>
                </Card>
              )}

              {results && showResults && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="pt-6 text-center">
                        <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400" />
                        <p className="text-xs text-muted-foreground mb-1">Monthly Savings</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400" data-testid="text-monthly-savings">
                          {formatCurrency(results.monthlySavings)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="pt-6 text-center">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <p className="text-xs text-muted-foreground mb-1">Annual Savings</p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-annual-savings">
                          {formatCurrency(results.annualSavings)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                      <CardContent className="pt-6 text-center">
                        <Target className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                        <p className="text-xs text-muted-foreground mb-1">ROI</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400" data-testid="text-roi">
                          {formatPercent(results.roi)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cost Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Old Way (Manual)</span>
                          <span className="font-semibold">{formatCurrency(results.totalManualMonthlyCost)}/mo</span>
                        </div>
                        <div className="h-6 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (results.totalManualMonthlyCost / Math.max(results.totalManualMonthlyCost, results.totalWinkMonthlyCost)) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Labor: {formatCurrency(results.manualLaborCost)} + Errors: {formatCurrency(results.manualErrorCost)}
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>New Way (Wink)</span>
                          <span className="font-semibold">{formatCurrency(results.totalWinkMonthlyCost)}/mo</span>
                        </div>
                        <div className="h-6 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (results.totalWinkMonthlyCost / Math.max(results.totalManualMonthlyCost, results.totalWinkMonthlyCost)) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Invoice fees: {formatCurrency(results.winkMonthlyCost)} + Setup amortized: {formatCurrency(IMPLEMENTATION_FEE / inputs.amortizeMonths)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={results.savesFromDayOne ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : ""}>
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm font-medium" data-testid="text-breakeven">
                        {results.savesFromDayOne ? (
                          <span className="text-green-600 dark:text-green-400">
                            You save money from day one!
                          </span>
                        ) : results.breakEvenInvoices ? (
                          <>You start saving at <span className="font-bold">{results.breakEvenInvoices.toLocaleString()}</span> invoices/month</>
                        ) : (
                          "Adjust your inputs to see break-even point"
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => window.open("https://cal.com/wink-toolbox/roi-review", "_blank")}
                      data-testid="button-book-demo"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book a Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={copyCalculatorLink}
                      data-testid="button-copy-link"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Calculator Link
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">How This Works</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-2">
                      <p>Savings are based on less time spent typing and checking invoices</p>
                      <p>We also count savings from fewer mistakes and corrections</p>
                      <p>Your first 200 invoices each month are free with Wink</p>
                      <p>The setup cost is spread over {inputs.amortizeMonths} months to show true monthly cost</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>See Your Full Report</DialogTitle>
            <DialogDescription>
              Enter your info to unlock the complete ROI breakdown with detailed savings analysis.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLeadSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} data-testid="input-firstName" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@company.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={leadMutation.isPending}
                data-testid="button-submit-lead"
              >
                {leadMutation.isPending ? "Loading..." : "Show My Results"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
