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
import { Calculator, RotateCcw, TrendingUp, DollarSign, Users, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

export default function SmartACROICalculator() {
  const [inputs, setInputs] = useState({
    activeMembers: 5000,
    annualCost: 240,
    closeRate: 20,
    retentionRate: 70,
    truckRolls: 2,
    rollCost: 400,
    revenuePerMember: 1000,
    grossMargin: 50,
  });

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const smartACImprovements = {
    conversionBefore: 20,
    conversionAfter: 40,
    retentionBefore: 70,
    retentionAfter: 90,
    truckRollsBefore: 2,
    truckRollsAfter: 1,
    virtualSavings: 300,
    platformCost: 12000,
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
      annualCost,
      closeRate,
      retentionRate,
      truckRolls,
      rollCost,
      revenuePerMember,
      grossMargin,
    } = inputs;

    // Before SmartAC
    const beforeRevenue = activeMembers * revenuePerMember;
    const beforeProfit = beforeRevenue * (grossMargin / 100);
    const beforeTruckRollCost = truckRolls * rollCost * activeMembers;

    // After SmartAC (with improvements)
    const conversionMultiplier = smartACImprovements.conversionAfter / smartACImprovements.conversionBefore;
    const afterRevenue = activeMembers * conversionMultiplier * revenuePerMember;
    const afterProfit = afterRevenue * (grossMargin / 100);
    const afterTruckRollCost = smartACImprovements.truckRollsAfter * rollCost * activeMembers;

    // Savings calculations
    const truckRollSavings = beforeTruckRollCost - afterTruckRollCost;
    const virtualSavings = smartACImprovements.virtualSavings * activeMembers;
    const profitIncrease = afterProfit - beforeProfit;
    const annualSavings = truckRollSavings + virtualSavings + profitIncrease;
    const netSavings = annualSavings - smartACImprovements.platformCost;
    const roi = ((netSavings) / smartACImprovements.platformCost) * 100;

    // 5-Year projections
    const beforeGrowth = 1.279; // 27.9% over 5 years
    const afterGrowth = 2.79; // 179% over 5 years with SmartAC

    const fiveYearData = [
      { year: 'Year 1', before: beforeRevenue, after: afterRevenue },
      { year: 'Year 2', before: beforeRevenue * 1.055, after: afterRevenue * 1.30 },
      { year: 'Year 3', before: beforeRevenue * 1.115, after: afterRevenue * 1.70 },
      { year: 'Year 4', before: beforeRevenue * 1.195, after: afterRevenue * 2.20 },
      { year: 'Year 5', before: beforeRevenue * beforeGrowth, after: afterRevenue * afterGrowth },
    ];

    setResults({
      beforeRevenue,
      afterRevenue,
      beforeProfit,
      afterProfit,
      beforeTruckRollCost,
      afterTruckRollCost,
      truckRollSavings,
      virtualSavings,
      annualSavings,
      netSavings,
      roi,
      fiveYearData,
      fiveYearGrowthBefore: beforeRevenue * beforeGrowth,
      fiveYearGrowthAfter: afterRevenue * afterGrowth,
    });

    setShowResults(true);
  };

  const handleReset = () => {
    setInputs({
      activeMembers: 5000,
      annualCost: 240,
      closeRate: 20,
      retentionRate: 70,
      truckRolls: 2,
      rollCost: 400,
      revenuePerMember: 1000,
      grossMargin: 50,
    });
    setShowResults(false);
    setResults(null);
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
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="SmartAC ROI Calculator | 5-Year Profit Growth Calculator for HVAC"
        description="Calculate your potential profit growth, truck-roll savings, and membership revenue improvement with SmartAC's platform. See your 5-year ROI projection instantly."
        keywords="HVAC ROI calculator, SmartAC, membership revenue, truck roll savings, HVAC profit calculator"
        canonicalUrl="https://servicetitanhacks.com/smartac-roi-calculator"
      />
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calculator className="h-12 w-12 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold font-heading">
                  SmartAC ROI Calculator
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-4">
                See Your 5-Year Profit Growth with SmartAC
              </p>
              <p className="text-lg text-muted-foreground">
                Enter a few numbers to see how SmartAC turns memberships into a growth engine.
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
                  <Users className="h-5 w-5 text-primary" />
                  Your Current Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TooltipProvider>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="activeMembers">Active Memberships</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Total number of active service plan members</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span className="text-sm font-semibold text-primary">{inputs.activeMembers.toLocaleString()}</span>
                      </div>
                      <Slider
                        id="activeMembers"
                        min={100}
                        max={20000}
                        step={100}
                        value={[inputs.activeMembers]}
                        onValueChange={(value) => handleSliderChange('activeMembers', value)}
                        className="mb-2"
                        data-testid="slider-active-members"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100</span>
                        <span>20,000</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="annualCost">Annual Membership Cost ($)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average yearly cost per membership plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="annualCost"
                        type="number"
                        value={inputs.annualCost}
                        onChange={(e) => handleInputChange('annualCost', e.target.value)}
                        data-testid="input-annual-cost"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="closeRate">Membership Close Rate (%)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage of leads that become members</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="closeRate"
                        type="number"
                        value={inputs.closeRate}
                        onChange={(e) => handleInputChange('closeRate', e.target.value)}
                        data-testid="input-close-rate"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="retentionRate">Annual Retention Rate (%)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage of members who renew each year</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="retentionRate"
                        type="number"
                        value={inputs.retentionRate}
                        onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                        data-testid="input-retention-rate"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="truckRolls">Avg Truck Rolls per Member/Year</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average service visits per member annually</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="truckRolls"
                        type="number"
                        value={inputs.truckRolls}
                        onChange={(e) => handleInputChange('truckRolls', e.target.value)}
                        data-testid="input-truck-rolls"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="rollCost">Average Truck Roll Cost ($)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cost per service visit including labor and overhead</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="rollCost"
                        type="number"
                        value={inputs.rollCost}
                        onChange={(e) => handleInputChange('rollCost', e.target.value)}
                        data-testid="input-roll-cost"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="revenuePerMember">Avg Revenue per Member/Year ($)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average annual revenue generated per member</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="revenuePerMember"
                        type="number"
                        value={inputs.revenuePerMember}
                        onChange={(e) => handleInputChange('revenuePerMember', e.target.value)}
                        data-testid="input-revenue-per-member"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="grossMargin">Gross Margin (%)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your profit margin after direct costs</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="grossMargin"
                        type="number"
                        value={inputs.grossMargin}
                        onChange={(e) => handleInputChange('grossMargin', e.target.value)}
                        data-testid="input-gross-margin"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
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
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  SmartAC Improvement Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">20% → 40%</div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">+100% increase</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Retention Rate</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">70% → 90%</div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">+29% increase</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Truck Rolls per Member</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">2 → 1</div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">50% reduction</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="text-sm font-medium">Virtual Visit Savings</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">$300/home/year</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-background rounded-lg border-2 border-primary/30">
                    <span className="text-sm font-medium">SmartAC Platform Cost</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">$1,000/month</div>
                      <div className="text-xs text-muted-foreground">($12,000/year)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg border-2 border-primary/30">
                  <h4 className="font-semibold mb-2 text-sm">How SmartAC Works:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI-powered diagnostics reduce unnecessary visits</li>
                    <li>• Virtual inspections via mobile app</li>
                    <li>• Automated customer engagement & retention</li>
                    <li>• Predictive maintenance alerts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {showResults && results && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-bold font-heading mb-2">Your ROI Analysis</h2>
                <p className="text-muted-foreground">Based on your inputs, here's your potential with SmartAC</p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {formatCurrency(results.netSavings)}
                      </div>
                      <div className="text-sm text-muted-foreground">Net Annual Savings</div>
                      <div className="text-xs text-muted-foreground mt-1">(after platform cost)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        {formatPercent(results.roi)}
                      </div>
                      <div className="text-sm text-muted-foreground">Annual ROI</div>
                      <div className="text-xs text-muted-foreground mt-1">(return on investment)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold mb-1">Truck Roll Savings</div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {formatCurrency(results.truckRollSavings)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(results.beforeTruckRollCost)} → {formatCurrency(results.afterTruckRollCost)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold mb-1">Revenue Increase</div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {formatCurrency(results.afterRevenue - results.beforeRevenue)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(results.beforeRevenue)} → {formatCurrency(results.afterRevenue)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Before/After Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Before vs. After Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Annual Revenue</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg line-through text-muted-foreground">{formatCurrency(results.beforeRevenue)}</span>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(results.afterRevenue)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Annual Profit</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg line-through text-muted-foreground">{formatCurrency(results.beforeProfit)}</span>
                        <span className="text-2xl font-bold text-primary">{formatCurrency(results.afterProfit)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Truck Roll Costs</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg line-through text-muted-foreground">{formatCurrency(results.beforeTruckRollCost)}</span>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(results.afterTruckRollCost)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5-Year Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>5-Year Revenue Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.fiveYearData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                        />
                        <RechartsTooltip
                          formatter={(value: number) => formatCurrency(value)}
                          labelStyle={{ color: '#333' }}
                        />
                        <Legend />
                        <Bar dataKey="before" name="Before SmartAC" fill="#94a3b8" />
                        <Bar dataKey="after" name="With SmartAC" fill="#ED254E" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">5-Year Total (Before)</div>
                      <div className="text-2xl font-bold">{formatCurrency(results.fiveYearGrowthBefore)}</div>
                    </div>
                    <div className="p-4 bg-primary/10 border-2 border-primary/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">5-Year Total (With SmartAC)</div>
                      <div className="text-2xl font-bold text-primary">{formatCurrency(results.fiveYearGrowthAfter)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold font-heading mb-4">
                    Ready to Transform Your Membership Program?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    See how SmartAC can help you achieve these results. Schedule a personalized demo with our team to learn more about implementing SmartAC in your business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" data-testid="link-schedule-demo">
                      <Button size="lg">
                        Schedule a SmartAC Demo
                      </Button>
                    </a>
                    <a href="/resources" data-testid="link-learn-more">
                      <Button size="lg" variant="outline">
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
    </div>
  );
}
