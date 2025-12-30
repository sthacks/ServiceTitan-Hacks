import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, RotateCcw, DollarSign, Clock, Users, AlertTriangle, TrendingDown, Info, ExternalLink } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const WEEKS_PER_MONTH = 4.345;
const STORAGE_KEY = "hiring_calc_lead_submitted";

const leadFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone is required"),
  companyName: z.string().min(1, "Company name is required"),
  trade: z.string().min(1, "Trade is required"),
  serviceTitanUser: z.string().min(1, "Please select an option"),
  companySize: z.string().min(1, "Company size is required"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface CalculatorInputs {
  avgTicket: number;
  jobsPerWeekPerTech: number;
  grossMarginPct: number;
  weeksToHire: number;
  callbacksPct: number;
  currentOvertimeHoursPerWeek: number;
  overtimeHourlyCost: number;
  officeLoadHoursPerWeek: number;
  officeHourlyCost: number;
  monthlyHiringCost: number;
  rampWeeks: number;
  rampProductivityPct: number;
}

interface CalculationResults {
  lostJobs: number;
  lostRevenue: number;
  lostGrossProfit: number;
  overtimeCost: number;
  officeLoadCost: number;
  hiddenLaborCost: number;
  callbackCost: number;
  rampGrossProfitLoss: number;
  hiringSpendDuringOpen: number;
  totalCost: number;
  costPerWeek: number;
  weeksSavedFor10k: number;
}

const defaultInputs: CalculatorInputs = {
  avgTicket: 650,
  jobsPerWeekPerTech: 25,
  grossMarginPct: 35,
  weeksToHire: 6,
  callbacksPct: 5,
  currentOvertimeHoursPerWeek: 10,
  overtimeHourlyCost: 45,
  officeLoadHoursPerWeek: 5,
  officeHourlyCost: 35,
  monthlyHiringCost: 1500,
  rampWeeks: 4,
  rampProductivityPct: 60,
};

function calculateROI(inputs: CalculatorInputs): CalculationResults {
  const grossMargin = inputs.grossMarginPct / 100;
  const callbacks = inputs.callbacksPct / 100;
  const rampProd = inputs.rampProductivityPct / 100;

  const lostJobs = inputs.jobsPerWeekPerTech * inputs.weeksToHire;
  const lostRevenue = lostJobs * inputs.avgTicket;
  const lostGrossProfit = lostRevenue * grossMargin;

  const overtimeCost = inputs.currentOvertimeHoursPerWeek * inputs.overtimeHourlyCost * inputs.weeksToHire;
  const officeLoadCost = inputs.officeLoadHoursPerWeek * inputs.officeHourlyCost * inputs.weeksToHire;
  const hiddenLaborCost = overtimeCost + officeLoadCost;

  const affectedRevenue = lostRevenue;
  const callbackCost = affectedRevenue * callbacks * grossMargin;

  const rampJobsIfFull = inputs.jobsPerWeekPerTech * inputs.rampWeeks;
  const rampRevenueIfFull = rampJobsIfFull * inputs.avgTicket;
  const rampGrossProfitIfFull = rampRevenueIfFull * grossMargin;
  const rampGrossProfitActual = rampGrossProfitIfFull * rampProd;
  const rampGrossProfitLoss = rampGrossProfitIfFull - rampGrossProfitActual;

  const hiringSpendDuringOpen = inputs.monthlyHiringCost * (inputs.weeksToHire / WEEKS_PER_MONTH);

  const totalCost = lostGrossProfit + hiddenLaborCost + callbackCost + rampGrossProfitLoss + hiringSpendDuringOpen;

  const costPerWeek = inputs.weeksToHire > 0 ? totalCost / inputs.weeksToHire : 0;
  const weeksSavedFor10k = costPerWeek > 0 ? 10000 / costPerWeek : 0;

  return {
    lostJobs,
    lostRevenue,
    lostGrossProfit,
    overtimeCost,
    officeLoadCost,
    hiddenLaborCost,
    callbackCost,
    rampGrossProfitLoss,
    hiringSpendDuringOpen,
    totalCost,
    costPerWeek,
    weeksSavedFor10k,
  };
}

export default function HiringROICalculator() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingResults, setPendingResults] = useState<CalculationResults | null>(null);
  const [leadAlreadyCaptured, setLeadAlreadyCaptured] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setLeadAlreadyCaptured(true);
    }
  }, []);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      trade: "",
      serviceTitanUser: "",
      companySize: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: LeadFormData & { calculatorInputs: string; calculatorResults: string; leadAlreadyCaptured: boolean }) => {
      return await apiRequest("POST", "/api/hiring-roi", data);
    },
    onSuccess: () => {
      localStorage.setItem(STORAGE_KEY, "true");
      setLeadAlreadyCaptured(true);
      if (pendingResults) {
        setResults(pendingResults);
        setShowResults(true);
      }
      setShowLeadModal(false);
      form.reset();
      toast({
        title: "Results Ready!",
        description: "Your hiring ROI calculation is displayed below.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit. Please try again.",
      });
    },
  });

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    if (inputs.weeksToHire === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Weeks to hire must be greater than 0.",
      });
      return;
    }

    const calcResults = calculateROI(inputs);
    setPendingResults(calcResults);

    if (leadAlreadyCaptured) {
      submitMutation.mutate({
        firstName: "Returning",
        lastName: "User",
        email: "returning@user.local",
        phone: "N/A",
        companyName: "N/A",
        trade: "N/A",
        serviceTitanUser: "N/A",
        companySize: "N/A",
        calculatorInputs: JSON.stringify(inputs),
        calculatorResults: JSON.stringify(calcResults),
        leadAlreadyCaptured: true,
      });
      setResults(calcResults);
      setShowResults(true);
    } else {
      setShowLeadModal(true);
    }
  };

  const onLeadSubmit = (data: LeadFormData) => {
    if (!pendingResults) return;
    submitMutation.mutate({
      ...data,
      calculatorInputs: JSON.stringify(inputs),
      calculatorResults: JSON.stringify(pendingResults),
      leadAlreadyCaptured: false,
    });
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setShowResults(false);
    setResults(null);
    setPendingResults(null);
  };

  const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const formatNumber = (value: number, decimals: number = 1) => value.toFixed(decimals);

  const inputFields = [
    { key: "avgTicket", label: "Average Revenue Per Job", helper: "Average ticket size for a completed service call", suffix: "$", min: 0, max: 10000 },
    { key: "jobsPerWeekPerTech", label: "Jobs Per Week Per Tech", helper: "How many jobs a technician completes weekly", suffix: "", min: 1, max: 100 },
    { key: "grossMarginPct", label: "Gross Margin", helper: "Your gross profit margin on jobs", suffix: "%", min: 0, max: 100 },
    { key: "weeksToHire", label: "Weeks Role Stays Open", helper: "How long it typically takes to fill a position", suffix: "weeks", min: 1, max: 52 },
    { key: "callbacksPct", label: "Callbacks / Rework Rate", helper: "Percentage of jobs requiring callbacks when rushed", suffix: "%", min: 0, max: 100 },
    { key: "currentOvertimeHoursPerWeek", label: "Current Overtime Hours/Week", helper: "Extra hours worked due to being short-staffed", suffix: "hrs", min: 0, max: 100 },
    { key: "overtimeHourlyCost", label: "Overtime Hourly Cost", helper: "Blended OT cost per hour (1.5x base)", suffix: "$", min: 0, max: 200 },
    { key: "officeLoadHoursPerWeek", label: "Office Load Hours/Week", helper: "Extra dispatch/CSR/manager time from understaffing", suffix: "hrs", min: 0, max: 100 },
    { key: "officeHourlyCost", label: "Office Hourly Cost", helper: "Average hourly cost for office staff", suffix: "$", min: 0, max: 200 },
    { key: "monthlyHiringCost", label: "Monthly Hiring Cost", helper: "Job ads, recruiter fees, signing bonuses, etc.", suffix: "$", min: 0, max: 20000 },
    { key: "rampWeeks", label: "Ramp-Up Weeks", helper: "Weeks until new hire is fully productive", suffix: "weeks", min: 1, max: 26 },
    { key: "rampProductivityPct", label: "Ramp Productivity", helper: "Average productivity during ramp period", suffix: "%", min: 0, max: 100 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Hiring ROI Calculator | ServiceTitan Hacks"
        description="Calculate the true cost of leaving a technician role unfilled. Estimate lost revenue, hidden labor costs, and ramp-up drag with our free calculator."
        keywords="hiring ROI, technician hiring, HVAC staffing, contractor hiring calculator, ServiceTitan"
        canonicalUrl="https://servicetitanhacks.com/hiring-roi-calculator"
      />
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{
              background: "linear-gradient(to bottom, #09090b, #1a1b20)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              What is one unfilled technician role costing you?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{
              background: "linear-gradient(to bottom, #09090b, #1a1b20)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Use this quick calculator to estimate gross profit loss, hidden labor costs, and ramp-up drag. Get the results sent to you and see how much faster hiring pays off.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculator Inputs
                </CardTitle>
                <CardDescription>
                  Adjust these values based on your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TooltipProvider>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {inputFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <div className="flex items-center gap-1">
                          <Label htmlFor={field.key} className="text-sm font-medium">
                            {field.label}
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{field.helper}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="relative">
                          <Input
                            id={field.key}
                            type="number"
                            min={field.min}
                            max={field.max}
                            value={inputs[field.key as keyof CalculatorInputs]}
                            onChange={(e) => handleInputChange(field.key as keyof CalculatorInputs, e.target.value)}
                            className="pr-12"
                            data-testid={`input-${field.key}`}
                          />
                          {field.suffix && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              {field.suffix}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TooltipProvider>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1"
                    disabled={submitMutation.isPending}
                    data-testid="button-calculate"
                  >
                    {submitMutation.isPending ? "Calculating..." : "Calculate ROI"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showResults && results ? (
              <div className="space-y-6">
                <Card className="border-primary/50 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Estimated Cost of Leaving the Role Open</p>
                      <p className="text-4xl md:text-5xl font-bold text-primary" data-testid="text-total-cost">
                        {formatCurrency(results.totalCost)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        That's about <span className="font-semibold">{formatCurrency(results.costPerWeek)}</span> per week
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                          <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Lost Gross Profit</p>
                          <p className="text-xl font-bold" data-testid="text-lost-profit">{formatCurrency(results.lostGrossProfit)}</p>
                          <p className="text-xs text-muted-foreground">{results.lostJobs} jobs missed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                          <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hidden Labor Cost</p>
                          <p className="text-xl font-bold" data-testid="text-hidden-labor">{formatCurrency(results.hiddenLaborCost)}</p>
                          <p className="text-xs text-muted-foreground">OT + Office load</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Callback Cost</p>
                          <p className="text-xl font-bold" data-testid="text-callback-cost">{formatCurrency(results.callbackCost)}</p>
                          <p className="text-xs text-muted-foreground">Quality drag from rushing</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Ramp Productivity Loss</p>
                          <p className="text-xl font-bold" data-testid="text-ramp-loss">{formatCurrency(results.rampGrossProfitLoss)}</p>
                          <p className="text-xs text-muted-foreground">During {inputs.rampWeeks} week ramp</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="sm:col-span-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hiring Spend During Open Role</p>
                          <p className="text-xl font-bold" data-testid="text-hiring-spend">{formatCurrency(results.hiringSpendDuringOpen)}</p>
                          <p className="text-xs text-muted-foreground">Ads, recruiter fees, etc.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-green-700 dark:text-green-300 mb-1">Break-Even Insight</p>
                      <p className="text-lg font-semibold text-green-800 dark:text-green-200" data-testid="text-insight">
                        Hire about <span className="text-2xl font-bold">{formatNumber(results.weeksSavedFor10k)}</span> weeks faster to save $10,000
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => window.open("https://traderunner.com/demo", "_blank")}
                    data-testid="button-book-demo"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Book a Demo with Traderunner
                  </Button>
                  <Button variant="outline" disabled className="flex-1" data-testid="button-download-pdf">
                    Download Results as PDF (Coming Soon)
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill in your details and click "Calculate ROI" to see your results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Where should we send your results?</DialogTitle>
            <DialogDescription>
              Get your personalized hiring ROI report delivered to your inbox.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLeadSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} data-testid="input-firstName" />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} data-testid="input-lastName" />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@company.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Heating & Cooling" {...field} data-testid="input-companyName" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="trade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-trade">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HVAC">HVAC</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Garage Door">Garage Door</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceTitanUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ServiceTitan User?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-servicetitan">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-companySize">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-5 techs">1-5 techs</SelectItem>
                        <SelectItem value="6-15 techs">6-15 techs</SelectItem>
                        <SelectItem value="16-30 techs">16-30 techs</SelectItem>
                        <SelectItem value="31-60 techs">31-60 techs</SelectItem>
                        <SelectItem value="61+ techs">61+ techs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted about hiring solutions. No spam.
              </p>
              <DialogFooter>
                <Button type="submit" disabled={submitMutation.isPending} className="w-full" data-testid="button-submit-lead">
                  {submitMutation.isPending ? "Submitting..." : "Get My Results"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
