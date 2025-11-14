import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calculator, RotateCcw, Clock, DollarSign, AlertCircle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import winkLogo from "@assets/wink_logo_1762354464668.png";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function WinkROICalculator() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    invoicesPerMonth: 200,
    minutesPerInvoice: 15,
    workerHourlyPay: 20,
    mistakeRate: 5,
    costPerMistake: 150,
    winkMonthlyCost: 199,
    setupCost: 1000,
    setupCostSpread: 12,
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  // Wink improvements
  const winkImprovements = {
    timeSavingsPercent: 70, // Wink saves 70% of manual invoicing time
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setInputs(prev => ({
      ...prev,
      [field]: value[0]
    }));
  };

  const calculateROI = () => {
    const {
      invoicesPerMonth,
      minutesPerInvoice,
      workerHourlyPay,
      mistakeRate,
      costPerMistake,
      winkMonthlyCost,
      setupCost,
      setupCostSpread,
    } = inputs;

    // Calculate time wasted per month
    const timeWastedHours = (invoicesPerMonth * minutesPerInvoice) / 60;
    
    // Calculate time savings with Wink (70% reduction)
    const timeSavings = winkImprovements.timeSavingsPercent;
    const hoursSavedPerMonth = (timeWastedHours * timeSavings) / 100;
    
    // Calculate labor cost savings
    const monthlySavings = hoursSavedPerMonth * workerHourlyPay;
    const annualSavings = monthlySavings * 12;
    
    // Calculate mistake cost
    const mistakesPerMonth = (invoicesPerMonth * mistakeRate) / 100;
    const mistakeCostPerMonth = mistakesPerMonth * costPerMistake;
    const annualMistakeCost = mistakeCostPerMonth * 12;
    
    // Total annual savings (time + mistakes)
    const totalAnnualSavings = annualSavings + annualMistakeCost;
    
    // Calculate Wink costs
    const setupCostMonthly = setupCost / setupCostSpread;
    const winkYear1MonthlyCost = winkMonthlyCost + setupCostMonthly;
    const winkYear1AnnualCost = winkYear1MonthlyCost * 12;
    const winkRecurringAnnualCost = winkMonthlyCost * 12;
    
    // Net savings calculations
    const netSavingsYear1 = totalAnnualSavings - winkYear1AnnualCost;
    const netSavingsYears2Through5 = (totalAnnualSavings - winkRecurringAnnualCost) * 4;
    const netSavingsYear5 = netSavingsYear1 + netSavingsYears2Through5;
    
    // Total 5-year costs and ROI
    const totalWinkCost5Years = winkYear1AnnualCost + (winkRecurringAnnualCost * 4);
    const totalSavings5Years = totalAnnualSavings * 5;
    const fiveYearROI = Math.round(((netSavingsYear5 / totalWinkCost5Years) * 100));

    // Year-by-year breakdown
    const yearlyData = [];
    for (let year = 1; year <= 5; year++) {
      const costThisYear = year === 1 ? winkYear1AnnualCost : winkRecurringAnnualCost;
      const savingsThisYear = totalAnnualSavings;
      const netThisYear = savingsThisYear - costThisYear;
      
      yearlyData.push({
        year: `Year ${year}`,
        savings: savingsThisYear,
        cost: costThisYear,
        net: netThisYear,
      });
    }

    const resultsData = {
      // Time metrics
      timeWasted: timeWastedHours,
      timeSavings,
      hoursSavedPerMonth,
      
      // Financial metrics
      monthlySavings,
      annualSavings,
      
      // Mistake metrics
      mistakesPerMonth,
      mistakeCostPerMonth,
      annualMistakeCost,
      
      // Total savings
      totalAnnualSavings,
      
      // Wink costs
      winkMonthlyCost,
      winkYear1MonthlyCost,
      winkYear1AnnualCost,
      winkRecurringAnnualCost,
      totalWinkCost5Years,
      
      // ROI
      netSavingsYear1,
      netSavingsYear5,
      fiveYearROI,
      totalSavings5Years,
      
      // Year by year
      yearlyData,
    };

    setCalculatedResults(resultsData);
    setShowDialog(true);
  };

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest(
        "POST",
        "/api/wink-roi",
        {
          firstName: data.firstName,
          email: data.email,
          invoicesPerMonth: inputs.invoicesPerMonth,
          minutesPerInvoice: inputs.minutesPerInvoice,
          workerHourlyPay: inputs.workerHourlyPay,
          mistakeRate: inputs.mistakeRate,
          costPerMistake: inputs.costPerMistake,
          winkMonthlyCost: inputs.winkMonthlyCost,
          setupCost: inputs.setupCost,
          setupCostSpread: inputs.setupCostSpread,
          roiResults: JSON.stringify(calculatedResults),
        }
      );
    },
    onSuccess: () => {
      setResults(calculatedResults);
      setShowResults(true);
      setShowDialog(false);
      form.reset();
      toast({
        title: "ROI Report Sent!",
        description: "Check your email for your personalized Wink Toolbox ROI report.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to send ROI report. Please try again.",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  const handleReset = () => {
    setInputs({
      invoicesPerMonth: 200,
      minutesPerInvoice: 15,
      workerHourlyPay: 20,
      mistakeRate: 5,
      costPerMistake: 150,
      winkMonthlyCost: 199,
      setupCost: 1000,
      setupCostSpread: 12,
    });
    setShowResults(false);
    setResults(null);
    setCalculatedResults(null);
    form.reset();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Wink Toolbox ROI Calculator - AI Invoicing Savings | ServiceTitan Hacks"
        description="Calculate how much time and money you can save by automating your invoicing with Wink Toolbox. Get instant ROI analysis with time savings, mistake reduction, and 5-year projections."
        keywords="wink toolbox, roi calculator, invoicing automation, AI invoicing, servicetitan automation, time savings calculator"
      />
      <Header />
      
      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src={winkLogo} 
                alt="Wink Toolbox" 
                className="h-16 w-auto"
                data-testid="img-wink-logo"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4" data-testid="heading-page-title">
              Wink Toolbox ROI Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-page-description">
              See how much time and money you can save by automating your invoicing with AI-powered Wink Toolbox.
              Calculate your ROI based on your current workflow.
            </p>
          </div>

          {/* Input Form */}
          <Card className="mb-8" data-testid="card-input-form">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="heading-input-section">
                <Calculator className="h-5 w-5" />
                Your Current Invoicing Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Invoices Per Month */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="invoicesPerMonth" data-testid="label-invoices-per-month">
                      Invoices Created Per Month
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-invoices" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">How many invoices does your team create each month?</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="invoicesPerMonth"
                    type="number"
                    value={inputs.invoicesPerMonth}
                    onChange={(e) => handleInputChange('invoicesPerMonth', e.target.value)}
                    className="w-24 text-right"
                    data-testid="input-invoices-per-month"
                  />
                </div>
                <Slider
                  value={[inputs.invoicesPerMonth]}
                  onValueChange={(value) => handleSliderChange('invoicesPerMonth', value)}
                  min={50}
                  max={1000}
                  step={10}
                  className="w-full"
                  data-testid="slider-invoices-per-month"
                />
              </div>

              {/* Minutes Per Invoice */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minutesPerInvoice" data-testid="label-minutes-per-invoice">
                      Minutes Per Invoice (Manual Entry)
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-minutes" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Average time to manually create and review one invoice</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="minutesPerInvoice"
                    type="number"
                    value={inputs.minutesPerInvoice}
                    onChange={(e) => handleInputChange('minutesPerInvoice', e.target.value)}
                    className="w-24 text-right"
                    data-testid="input-minutes-per-invoice"
                  />
                </div>
                <Slider
                  value={[inputs.minutesPerInvoice]}
                  onValueChange={(value) => handleSliderChange('minutesPerInvoice', value)}
                  min={5}
                  max={60}
                  step={1}
                  className="w-full"
                  data-testid="slider-minutes-per-invoice"
                />
              </div>

              {/* Worker Hourly Pay */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="workerHourlyPay" data-testid="label-worker-hourly-pay">
                      Average Hourly Pay ($/hour)
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-pay" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Average hourly cost for staff handling invoicing</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="workerHourlyPay"
                    type="number"
                    value={inputs.workerHourlyPay}
                    onChange={(e) => handleInputChange('workerHourlyPay', e.target.value)}
                    className="w-24 text-right"
                    data-testid="input-worker-hourly-pay"
                  />
                </div>
                <Slider
                  value={[inputs.workerHourlyPay]}
                  onValueChange={(value) => handleSliderChange('workerHourlyPay', value)}
                  min={10}
                  max={50}
                  step={1}
                  className="w-full"
                  data-testid="slider-worker-hourly-pay"
                />
              </div>

              {/* Mistake Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="mistakeRate" data-testid="label-mistake-rate">
                      Invoice Error Rate (%)
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-mistake-rate" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Percentage of invoices with errors requiring correction</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="mistakeRate"
                    type="number"
                    value={inputs.mistakeRate}
                    onChange={(e) => handleInputChange('mistakeRate', e.target.value)}
                    className="w-24 text-right"
                    data-testid="input-mistake-rate"
                  />
                </div>
                <Slider
                  value={[inputs.mistakeRate]}
                  onValueChange={(value) => handleSliderChange('mistakeRate', value)}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                  data-testid="slider-mistake-rate"
                />
              </div>

              {/* Cost Per Mistake */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="costPerMistake" data-testid="label-cost-per-mistake">
                      Average Cost Per Mistake ($)
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-cost-mistake" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Time to fix errors, customer service costs, lost revenue</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="costPerMistake"
                    type="number"
                    value={inputs.costPerMistake}
                    onChange={(e) => handleInputChange('costPerMistake', e.target.value)}
                    className="w-24 text-right"
                    data-testid="input-cost-per-mistake"
                  />
                </div>
                <Slider
                  value={[inputs.costPerMistake]}
                  onValueChange={(value) => handleSliderChange('costPerMistake', value)}
                  min={50}
                  max={500}
                  step={10}
                  className="w-full"
                  data-testid="slider-cost-per-mistake"
                />
              </div>

              {/* Wink Pricing */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4" data-testid="heading-wink-pricing">Wink Toolbox Pricing</h3>
                
                <div className="space-y-6">
                  {/* Monthly Cost */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="winkMonthlyCost" data-testid="label-wink-monthly-cost">
                          Monthly Platform Cost ($)
                        </Label>
                      </div>
                      <Input
                        id="winkMonthlyCost"
                        type="number"
                        value={inputs.winkMonthlyCost}
                        onChange={(e) => handleInputChange('winkMonthlyCost', e.target.value)}
                        className="w-24 text-right"
                        data-testid="input-wink-monthly-cost"
                      />
                    </div>
                    <Slider
                      value={[inputs.winkMonthlyCost]}
                      onValueChange={(value) => handleSliderChange('winkMonthlyCost', value)}
                      min={99}
                      max={499}
                      step={10}
                      className="w-full"
                      data-testid="slider-wink-monthly-cost"
                    />
                  </div>

                  {/* Setup Cost */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="setupCost" data-testid="label-setup-cost">
                          One-Time Setup Cost ($)
                        </Label>
                      </div>
                      <Input
                        id="setupCost"
                        type="number"
                        value={inputs.setupCost}
                        onChange={(e) => handleInputChange('setupCost', e.target.value)}
                        className="w-24 text-right"
                        data-testid="input-setup-cost"
                      />
                    </div>
                    <Slider
                      value={[inputs.setupCost]}
                      onValueChange={(value) => handleSliderChange('setupCost', value)}
                      min={0}
                      max={5000}
                      step={100}
                      className="w-full"
                      data-testid="slider-setup-cost"
                    />
                  </div>

                  {/* Setup Cost Spread */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="setupCostSpread" data-testid="label-setup-cost-spread">
                          Spread Setup Cost Over (months)
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" data-testid="icon-info-spread" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Amortize setup cost over this many months for year 1 calculation</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="setupCostSpread"
                        type="number"
                        value={inputs.setupCostSpread}
                        onChange={(e) => handleInputChange('setupCostSpread', e.target.value)}
                        className="w-24 text-right"
                        data-testid="input-setup-cost-spread"
                      />
                    </div>
                    <Slider
                      value={[inputs.setupCostSpread]}
                      onValueChange={(value) => handleSliderChange('setupCostSpread', value)}
                      min={6}
                      max={24}
                      step={1}
                      className="w-full"
                      data-testid="slider-setup-cost-spread"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button 
                  onClick={calculateROI} 
                  className="flex-1"
                  size="lg"
                  data-testid="button-calculate-roi"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate My ROI
                </Button>
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  size="lg"
                  data-testid="button-reset"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {showResults && results && (
            <div className="space-y-6" data-testid="section-results">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card data-testid="card-year1-savings">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Year 1 Net Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600" data-testid="text-year1-savings">
                      {formatCurrency(results.netSavingsYear1)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">After platform costs</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-year5-savings">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      5-Year Cumulative
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary" data-testid="text-year5-savings">
                      {formatCurrency(results.netSavingsYear5)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{results.fiveYearROI}% ROI</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-time-saved">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Monthly Time Saved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold" data-testid="text-time-saved">
                      {formatNumber(results.hoursSavedPerMonth)} hrs
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{results.timeSavings}% reduction</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-annual-savings">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Annual Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold" data-testid="text-annual-savings">
                      {formatCurrency(results.totalAnnualSavings)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Time + mistakes</p>
                  </CardContent>
                </Card>
              </div>

              {/* 5-Year Chart */}
              <Card data-testid="card-chart">
                <CardHeader>
                  <CardTitle data-testid="heading-chart">5-Year Savings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <RechartsTooltip
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Legend />
                      <Bar dataKey="savings" name="Savings" fill="hsl(var(--primary))" />
                      <Bar dataKey="cost" name="Wink Cost" fill="hsl(var(--muted))" />
                      <Bar dataKey="net" name="Net Benefit" fill="hsl(142.1 76.2% 36.3%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <Card data-testid="card-breakdown">
                <CardHeader>
                  <CardTitle data-testid="heading-breakdown">Detailed Savings Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Time Savings
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly hours wasted:</span>
                          <span className="font-medium">{formatNumber(results.timeWasted)} hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hours saved per month:</span>
                          <span className="font-medium">{formatNumber(results.hoursSavedPerMonth)} hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly labor savings:</span>
                          <span className="font-medium">{formatCurrency(results.monthlySavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual labor savings:</span>
                          <span className="font-medium text-primary">{formatCurrency(results.annualSavings)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        Error Reduction
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mistakes per month:</span>
                          <span className="font-medium">{formatNumber(results.mistakesPerMonth)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly mistake cost:</span>
                          <span className="font-medium">{formatCurrency(results.mistakeCostPerMonth)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual mistake cost:</span>
                          <span className="font-medium text-primary">{formatCurrency(results.annualMistakeCost)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Investment Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wink monthly cost:</span>
                        <span className="font-medium">{formatCurrency(inputs.winkMonthlyCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year 1 total cost:</span>
                        <span className="font-medium">{formatCurrency(results.winkYear1AnnualCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">5-year total cost:</span>
                        <span className="font-medium">{formatCurrency(results.totalWinkCost5Years)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">5-Year Net Savings:</span>
                        <span className="font-bold text-green-600 text-lg">{formatCurrency(results.netSavingsYear5)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Contact Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent data-testid="dialog-contact-form">
          <DialogHeader>
            <DialogTitle data-testid="heading-dialog-title">Get Your Detailed ROI Report</DialogTitle>
            <DialogDescription data-testid="text-dialog-description">
              Enter your information to receive a personalized Wink Toolbox ROI report in your inbox.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-testid="label-first-name">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        {...field} 
                        data-testid="input-first-name"
                      />
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
                    <FormLabel data-testid="label-email">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        type="email"
                        {...field} 
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {submitMutation.isPending ? "Sending..." : "Send My ROI Report"}
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
