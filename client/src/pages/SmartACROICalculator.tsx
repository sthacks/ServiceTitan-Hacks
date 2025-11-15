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
import { Calculator, RotateCcw, TrendingUp, DollarSign, Users, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import smartacLogo from "@assets/smartac_1762359582715.png";
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

export default function SmartACROICalculator() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    activeMembers: 500,
    retentionRate: 75,
    newVisitsPerYear: 1000,
    closeRate: 20,
    revenuePerMember: 850,
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

  // SmartAC improvements based on their actual data
  const smartACImprovements = {
    retentionImprovement: 15, // 75% → 90% (15 point increase)
    closeRateMultiplier: 2, // 20% → 40% (2x improvement)
    platformCostMonthly: 1000,
    platformCostAnnual: 12000,
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
      activeMembers,
      retentionRate,
      newVisitsPerYear,
      closeRate,
      revenuePerMember,
    } = inputs;

    // Calculate member growth year by year - BEFORE SmartAC (current approach)
    const beforeRetention = retentionRate / 100;
    const beforeCloseRate = closeRate / 100;
    
    let beforeMembers = [activeMembers];
    for (let year = 1; year <= 5; year++) {
      const retained = beforeMembers[year - 1] * beforeRetention;
      const newMembers = newVisitsPerYear * beforeCloseRate;
      beforeMembers.push(retained + newMembers);
    }

    // Calculate member growth year by year - AFTER SmartAC (with improvements)
    const afterRetention = Math.min(100, retentionRate + smartACImprovements.retentionImprovement) / 100;
    const afterCloseRate = (closeRate * smartACImprovements.closeRateMultiplier) / 100;
    
    let afterMembers = [activeMembers];
    for (let year = 1; year <= 5; year++) {
      const retained = afterMembers[year - 1] * afterRetention;
      const newMembers = newVisitsPerYear * afterCloseRate;
      afterMembers.push(retained + newMembers);
    }

    // Calculate revenue for each year
    const fiveYearData = [];
    let totalRevenueBefore = 0;
    let totalRevenueAfter = 0;
    
    for (let year = 0; year <= 5; year++) {
      const beforeRevenue = beforeMembers[year] * revenuePerMember;
      const afterRevenue = afterMembers[year] * revenuePerMember;
      
      if (year > 0) {
        totalRevenueBefore += beforeRevenue;
        totalRevenueAfter += afterRevenue;
        fiveYearData.push({
          year: `Year ${year}`,
          before: beforeRevenue,
          after: afterRevenue,
          beforeMembers: Math.round(beforeMembers[year]),
          afterMembers: Math.round(afterMembers[year]),
        });
      }
    }

    // Calculate Year 5 metrics
    const year5BeforeMembers = Math.round(beforeMembers[5]);
    const year5AfterMembers = Math.round(afterMembers[5]);
    const year5BeforeRevenue = beforeMembers[5] * revenuePerMember;
    const year5AfterRevenue = afterMembers[5] * revenuePerMember;
    
    // Member growth percentage
    const memberGrowthPercent = ((year5AfterMembers - year5BeforeMembers) / year5BeforeMembers) * 100;
    
    // Calculate 5-year totals
    const totalPlatformCost = smartACImprovements.platformCostAnnual * 5;
    const incrementalRevenue = totalRevenueAfter - totalRevenueBefore;
    const netGain = incrementalRevenue - totalPlatformCost;
    const roi = (netGain / totalPlatformCost) * 100;

    const resultsData = {
      // Year 5 snapshots
      year5BeforeMembers,
      year5AfterMembers,
      year5BeforeRevenue,
      year5AfterRevenue,
      memberGrowthPercent,
      
      // 5-year cumulative
      totalRevenueBefore,
      totalRevenueAfter,
      incrementalRevenue,
      totalPlatformCost,
      netGain,
      roi,
      
      // Year by year data
      fiveYearData,
      
      // Starting metrics
      startingMembers: activeMembers,
      currentRetention: retentionRate,
      improvedRetention: Math.min(100, retentionRate + smartACImprovements.retentionImprovement),
      currentCloseRate: closeRate,
      improvedCloseRate: closeRate * smartACImprovements.closeRateMultiplier,
    };

    setCalculatedResults(resultsData);
    setShowDialog(true);
  };

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest(
        "POST",
        "/api/smartac-roi",
        {
          firstName: data.firstName,
          email: data.email,
          activeMembers: inputs.activeMembers,
          retentionRate: inputs.retentionRate,
          newVisitsPerYear: inputs.newVisitsPerYear,
          closeRate: inputs.closeRate,
          revenuePerMember: inputs.revenuePerMember,
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
        description: "Check your email for your personalized SmartAC ROI report.",
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
      activeMembers: 500,
      retentionRate: 75,
      newVisitsPerYear: 1000,
      closeRate: 20,
      revenuePerMember: 850,
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

  const formatPercent = (value: number) => {
    return `${Math.round(value)}%`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="SmartAC ROI Calculator for HVAC Contractors"
        description="Calculate potential profit growth, truck roll savings and membership revenue improvements using SmartAC for your HVAC business. Free ROI tool."
        keywords="HVAC ROI calculator, SmartAC, membership revenue, truck roll savings, HVAC profit calculator"
        canonicalUrl="https://servicetitanhacks.com/smartac-roi-calculator"
        ogImage="https://servicetitanhacks.com/og-smartac-roi-calculator.png"
      />
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-black py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <img 
                src={smartacLogo} 
                alt="SmartAC.com" 
                className="h-16 md:h-20 mx-auto mb-8"
                data-testid="img-smartac-logo"
              />
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                SmartAC ROI Calculator: See Your 5-Year Profit Growth
              </h1>
              <p className="text-lg text-white/90">
                Enter a few numbers to see how SmartAC turns memberships into a growth engine. Calculate your potential savings, revenue increase, and ROI with our interactive calculator designed for HVAC contractors.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#1b5eec]" />
                  Your Current Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TooltipProvider>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="activeMembers">Members Today</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Current number of active membership plan members</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-[#1b5eec]">{inputs.activeMembers.toLocaleString()}</span>
                      </div>
                      <Slider
                        id="activeMembers"
                        min={50}
                        max={10000}
                        step={50}
                        value={[inputs.activeMembers]}
                        onValueChange={(value) => handleSliderChange('activeMembers', value)}
                        className="mb-2 [&_[role=slider]]:border-[#1b5eec] [&>span>span]:bg-[#1b5eec]"
                        data-testid="slider-active-members"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>50</span>
                        <span>10,000</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="retentionRate">Annual Retention (%)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Percentage of members who renew each year</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-[#1b5eec]">{inputs.retentionRate}%</span>
                      </div>
                      <Slider
                        id="retentionRate"
                        min={25}
                        max={100}
                        step={1}
                        value={[inputs.retentionRate]}
                        onValueChange={(value) => handleSliderChange('retentionRate', value)}
                        className="mb-2 [&_[role=slider]]:border-[#1b5eec] [&>span>span]:bg-[#1b5eec]"
                        data-testid="slider-retention-rate"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>25%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="newVisitsPerYear">New Customer Visits per Year</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Number of new customer visits you get annually where you can offer memberships</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-[#1b5eec]">{inputs.newVisitsPerYear.toLocaleString()}</span>
                      </div>
                      <Slider
                        id="newVisitsPerYear"
                        min={100}
                        max={10000}
                        step={100}
                        value={[inputs.newVisitsPerYear]}
                        onValueChange={(value) => handleSliderChange('newVisitsPerYear', value)}
                        className="mb-2 [&_[role=slider]]:border-[#1b5eec] [&>span>span]:bg-[#1b5eec]"
                        data-testid="slider-new-visits"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100</span>
                        <span>10,000</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="closeRate">Membership Close Rate (%)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Percentage of new customer visits that become members</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-[#1b5eec]">{inputs.closeRate}%</span>
                      </div>
                      <Slider
                        id="closeRate"
                        min={5}
                        max={75}
                        step={1}
                        value={[inputs.closeRate]}
                        onValueChange={(value) => handleSliderChange('closeRate', value)}
                        className="mb-2 [&_[role=slider]]:border-[#1b5eec] [&>span>span]:bg-[#1b5eec]"
                        data-testid="slider-close-rate"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>75%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="revenuePerMember">Annual Revenue per Member ($)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Average annual revenue generated per member</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-[#1b5eec]">${inputs.revenuePerMember.toLocaleString()}</span>
                      </div>
                      <Slider
                        id="revenuePerMember"
                        min={200}
                        max={3000}
                        step={50}
                        value={[inputs.revenuePerMember]}
                        onValueChange={(value) => handleSliderChange('revenuePerMember', value)}
                        className="mb-2 [&_[role=slider]]:border-[#1b5eec] [&>span>span]:bg-[#1b5eec]"
                        data-testid="slider-revenue-per-member"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$200</span>
                        <span>$3,000</span>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={calculateROI}
                    className="flex-1"
                    size="lg"
                    data-testid="button-calculate"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate ROI
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SmartAC Improvements Card */}
            <Card className="bg-[#1b5eec]/5 border-[#1b5eec]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#1b5eec]" />
                  SmartAC Improvement Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Membership Close Rate</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Your rate → 2x with SmartAC</div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">+100% improvement</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Annual Retention Rate</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">+15 percentage points</div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">Up to 90% retention</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg border-2 border-[#1b5eec]/30">
                    <span className="text-sm font-medium">SmartAC Platform Cost</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">$1,000/month</div>
                      <div className="text-xs text-muted-foreground">($12,000/year)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg border-2 border-[#1b5eec]/30">
                  <h4 className="font-semibold mb-2 text-sm">How SmartAC Drives Growth:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Smart sensors make memberships more valuable</li>
                    <li>• Virtual inspections reduce truck rolls</li>
                    <li>• Automated engagement boosts retention</li>
                    <li>• Mobile app increases close rates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold font-heading mb-2">What's Your SmartAC Upside?</h2>
                <p className="text-muted-foreground">Here's your 5-year member growth projection with SmartAC</p>
              </div>

              {/* Year 5 Snapshot */}
              <Card className="bg-gradient-to-br from-[#1b5eec]/10 to-[#1b5eec]/5 border-[#1b5eec]/20">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">Current Approach in Year 5</div>
                      <div className="text-4xl font-bold mb-1">{results.year5BeforeMembers.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">On SmartAC in Year 5</div>
                      <div className="text-4xl font-bold text-[#1b5eec] mb-1">{results.year5AfterMembers.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">members</div>
                    </div>
                  </div>
                  <div className="text-center mt-6 pt-6 border-t">
                    <div className="text-sm text-muted-foreground mb-1">Member Growth on SmartAC</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">+{formatPercent(results.memberGrowthPercent)}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {formatCurrency(results.netGain)}
                      </div>
                      <div className="text-sm text-muted-foreground">5-Year Net Gain</div>
                      <div className="text-xs text-muted-foreground mt-1">(after ${formatCurrency(results.totalPlatformCost)} platform cost)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#1b5eec]/10 to-[#1b5eec]/5 border-[#1b5eec]/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-[#1b5eec] mx-auto mb-2" />
                      <div className="text-2xl md:text-3xl font-bold text-[#1b5eec] mb-1">
                        {formatPercent(results.roi)}
                      </div>
                      <div className="text-sm text-muted-foreground">5-Year ROI</div>
                      <div className="text-xs text-muted-foreground mt-1">(return on investment)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-[#1b5eec] mx-auto mb-2" />
                      <div className="text-2xl md:text-3xl font-bold text-[#1b5eec] mb-1">
                        {formatCurrency(results.incrementalRevenue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Incremental Revenue</div>
                      <div className="text-xs text-muted-foreground mt-1">(5-year total)</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 5-Year Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>5-Year Member & Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.fiveYearData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                        />
                        <RechartsTooltip
                          formatter={(value: number) => formatCurrency(value)}
                          labelStyle={{ color: '#333' }}
                        />
                        <Legend />
                        <Bar dataKey="before" name="Current Approach" fill="#94a3b8" />
                        <Bar dataKey="after" name="With SmartAC" fill="#1b5eec" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">5-Year Revenue (Current)</div>
                      <div className="text-2xl font-bold">{formatCurrency(results.totalRevenueBefore)}</div>
                    </div>
                    <div className="p-4 bg-[#1b5eec]/10 border-2 border-[#1b5eec]/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">5-Year Revenue (With SmartAC)</div>
                      <div className="text-2xl font-bold text-[#1b5eec]">{formatCurrency(results.totalRevenueAfter)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="bg-gradient-to-br from-[#1b5eec]/10 to-[#1b5eec]/5 border-[#1b5eec]/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold font-heading mb-4">
                    Ready to Transform Your Membership Program?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    These numbers are just the beginning. Schedule a personalized ROI review with SmartAC's team to model your specific scenarios and see how SmartAC can scale your membership program.
                  </p>
                  <div className="flex justify-center">
                    <a href="https://go.st-hacks.cc/smart-ac" target="_blank" rel="noopener noreferrer" data-testid="link-schedule-demo">
                      <Button size="lg" className="bg-[#1b5eec] hover:bg-[#1b5eec]/90 text-white focus-visible:ring-0 focus-visible:outline-none">
                        Learn More About SmartAC
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Contact Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-roi-email">
          <DialogHeader>
            <DialogTitle>Get Your ROI Report</DialogTitle>
            <DialogDescription>
              Enter your details to receive your personalized SmartAC ROI report via email.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} data-testid="input-first-name" />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  data-testid="button-send-report"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Report"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
