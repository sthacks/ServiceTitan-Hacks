import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { DollarSign, Truck, Clock, Map, Wrench, Building2, Users, Calculator } from "lucide-react";

export default function TruckRollCalculator() {
  const [wage, setWage] = useState(28.00);
  const [burdenRate, setBurdenRate] = useState(35);
  const [hoursPerCall, setHoursPerCall] = useState(1.5);
  const [milesPerCall, setMilesPerCall] = useState(20);
  const [costPerMile, setCostPerMile] = useState(0.85);
  const [monthlyTruckCost, setMonthlyTruckCost] = useState(1250);
  const [billableHoursPerTech, setBillableHoursPerTech] = useState(150);
  const [monthlyOverhead, setMonthlyOverhead] = useState(45000);
  const [totalBillableHours, setTotalBillableHours] = useState(600);

  // Calculations
  const fullyBurdenedRate = wage * (1 + burdenRate / 100);
  const laborCost = fullyBurdenedRate * hoursPerCall;
  const vehicleCost = milesPerCall * costPerMile;
  const truckCostPerHour = monthlyTruckCost / billableHoursPerTech;
  const truckCost = truckCostPerHour * hoursPerCall;
  const overheadRatePerHour = monthlyOverhead / totalBillableHours;
  const overheadCost = overheadRatePerHour * hoursPerCall;
  const totalCost = laborCost + vehicleCost + truckCost + overheadCost;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Cost Per Truck Roll Calculator - True Service Call Cost | ServiceTitan Hacks"
        description="Calculate the true cost to send a technician to a home. Free HVAC contractor calculator includes labor burden, vehicle costs, overhead allocation, and truck/tooling expenses."
        keywords="truck roll cost calculator, HVAC service call cost, technician cost calculator, contractor cost analysis, field service pricing"
        canonicalUrl="https://servicetitanhacks.com/truck-roll-calculator"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Cost Per Truck Roll Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover your true cost to send a technician to a home. Know your numbers before setting your prices.
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Your Business Numbers
              </CardTitle>
              <CardDescription>
                Adjust these values to match your business. Results update automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Labor Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Labor Costs
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="wage">Technician Hourly Wage</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="wage"
                        type="number"
                        step="0.50"
                        min="0"
                        value={wage}
                        onChange={(e) => setWage(Number(e.target.value))}
                        className="max-w-[120px]"
                        data-testid="input-wage"
                      />
                      <span className="text-sm text-muted-foreground">${wage.toFixed(2)}/hour</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="burden">Labor Burden Rate (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        id="burden"
                        min={0}
                        max={100}
                        step={1}
                        value={[burdenRate]}
                        onValueChange={(value) => setBurdenRate(value[0])}
                        data-testid="slider-burden"
                      />
                      <span className="text-sm text-muted-foreground">
                        {burdenRate}% (covers payroll tax, workers comp, health, PTO)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time & Distance Section */}
              <div className="space-y-6 pt-6 border-t">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Time & Distance Per Call
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Average Time Per Service Call (hours)</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="hours"
                        type="number"
                        step="0.25"
                        min="0"
                        value={hoursPerCall}
                        onChange={(e) => setHoursPerCall(Number(e.target.value))}
                        className="max-w-[120px]"
                        data-testid="input-hours"
                      />
                      <span className="text-sm text-muted-foreground">{hoursPerCall} hours (including drive time)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="miles">Average Round-Trip Miles Per Call</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="miles"
                        type="number"
                        step="1"
                        min="0"
                        value={milesPerCall}
                        onChange={(e) => setMilesPerCall(Number(e.target.value))}
                        className="max-w-[120px]"
                        data-testid="input-miles"
                      />
                      <span className="text-sm text-muted-foreground">{milesPerCall} miles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Costs Section */}
              <div className="space-y-6 pt-6 border-t">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Vehicle & Equipment Costs
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="costPerMile">Cost Per Mile</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="costPerMile"
                        type="number"
                        step="0.05"
                        min="0"
                        value={costPerMile}
                        onChange={(e) => setCostPerMile(Number(e.target.value))}
                        className="max-w-[120px]"
                        data-testid="input-cost-per-mile"
                      />
                      <span className="text-sm text-muted-foreground">${costPerMile.toFixed(2)} (fuel, repairs, depreciation, insurance)</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truckCost">Monthly Truck/Tooling Cost</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="truckCost"
                        type="number"
                        step="50"
                        min="0"
                        value={monthlyTruckCost}
                        onChange={(e) => setMonthlyTruckCost(Number(e.target.value))}
                        className="max-w-[120px]"
                        data-testid="input-truck-cost"
                      />
                      <span className="text-sm text-muted-foreground">${monthlyTruckCost.toLocaleString()} (truck payment, tools, uniforms)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overhead Section */}
              <div className="space-y-6 pt-6 border-t">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Overhead Allocation
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="billableHours">Billable Hours Per Tech/Month</Label>
                    <Input
                      id="billableHours"
                      type="number"
                      step="10"
                      min="0"
                      value={billableHoursPerTech}
                      onChange={(e) => setBillableHoursPerTech(Number(e.target.value))}
                      data-testid="input-billable-hours"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overhead">Monthly Overhead Cost</Label>
                    <Input
                      id="overhead"
                      type="number"
                      step="1000"
                      min="0"
                      value={monthlyOverhead}
                      onChange={(e) => setMonthlyOverhead(Number(e.target.value))}
                      data-testid="input-overhead"
                    />
                    <span className="text-xs text-muted-foreground">Office, salaries, rent, software</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalBillable">Total Billable Hours/Month</Label>
                    <Input
                      id="totalBillable"
                      type="number"
                      step="10"
                      min="0"
                      value={totalBillableHours}
                      onChange={(e) => setTotalBillableHours(Number(e.target.value))}
                      data-testid="input-total-billable"
                    />
                    <span className="text-xs text-muted-foreground">Entire company</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Your Cost Breakdown</CardTitle>
              <CardDescription>
                These are your costs to send a truck. This is not what you should charge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cost Breakdown Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg border" data-testid="result-burdened-rate">
                  <div className="text-sm text-muted-foreground mb-1">Fully Burdened Labor Rate</div>
                  <div className="text-xl font-bold">{formatCurrency(fullyBurdenedRate)}/hour</div>
                </div>
                <div className="p-4 bg-background rounded-lg border" data-testid="result-labor-cost">
                  <div className="text-sm text-muted-foreground mb-1">Labor Cost Per Call</div>
                  <div className="text-xl font-bold">{formatCurrency(laborCost)}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border" data-testid="result-vehicle-cost">
                  <div className="text-sm text-muted-foreground mb-1">Vehicle Cost Per Call</div>
                  <div className="text-xl font-bold">{formatCurrency(vehicleCost)}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border" data-testid="result-truck-cost">
                  <div className="text-sm text-muted-foreground mb-1">Truck/Tool Cost Per Call</div>
                  <div className="text-xl font-bold">{formatCurrency(truckCost)}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border md:col-span-2" data-testid="result-overhead-cost">
                  <div className="text-sm text-muted-foreground mb-1">Overhead Cost Per Call</div>
                  <div className="text-xl font-bold">{formatCurrency(overheadCost)}</div>
                </div>
              </div>

              {/* Total Cost - Highlighted */}
              <div className="p-8 bg-primary text-primary-foreground rounded-lg text-center" data-testid="result-total-cost">
                <div className="text-sm uppercase tracking-wide mb-2 opacity-90">Total Cost Per Service Call</div>
                <div className="text-5xl md:text-6xl font-bold font-heading mb-2">
                  {formatCurrency(totalCost)}
                </div>
                <div className="text-sm opacity-90">
                  This is your break-even cost before profit
                </div>
              </div>

              {/* Important Note */}
              <div className="p-6 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg">
                <p className="text-sm text-center font-medium">
                  ⚠️ <strong>Important:</strong> This calculates your cost to <em>send</em> a truck, not what you should charge. Your pricing must cover profit, marketing costs, and business growth on top of this cost.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
