import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Download, Calculator } from "lucide-react";

interface STHacksInputs {
  monthly_impressions: number;
  monthly_clicks: number;
  monthly_leads: number;
  sponsor_monthly_cost: number;
  email_open_rate?: number;
  click_through_rate?: number;
  landing_conversion_rate?: number;
}

interface SponsorInputs {
  close_rate: number;
  avg_revenue_per_sale: number;
  gross_margin_percent: number;
  time_horizon_months: number;
  sales_cycle_months?: number;
  churn_rate?: number;
  attribution_confidence_score: number;
}

interface CalculationResults {
  inputs: STHacksInputs & SponsorInputs;
  derived_metrics: {
    click_through_rate: number;
    landing_conversion_rate: number;
    projected_closed_deals_per_month: number;
  };
  monthly_projection: {
    projected_monthly_revenue: number;
    projected_monthly_profit: number;
    monthly_roi_multiple: number;
  };
  time_horizon_projection: {
    projected_closed_deals_total: number;
    projected_revenue_total: number;
    projected_profit_total: number;
    roi_multiple_total: number;
  };
  scenarios: {
    conservative: ScenarioResults;
    expected: ScenarioResults;
    aggressive: ScenarioResults;
  };
}

interface ScenarioResults {
  close_rate: number;
  projected_closed_deals_per_month: number;
  projected_monthly_revenue: number;
  projected_monthly_profit: number;
  monthly_roi_multiple: number;
}

export default function SponsorROICalculator() {
  const [stHacksInputs, setSTHacksInputs] = useState<STHacksInputs>({
    monthly_impressions: 50000,
    monthly_clicks: 1500,
    monthly_leads: 30,
    sponsor_monthly_cost: 5700,
  });

  const [sponsorInputs, setSponsorInputs] = useState<SponsorInputs>({
    close_rate: 0.15,
    avg_revenue_per_sale: 50000,
    gross_margin_percent: 0.30,
    time_horizon_months: 6,
    attribution_confidence_score: 2,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [error, setError] = useState<string>("");

  const validateInputs = (): string | null => {
    if (!stHacksInputs.monthly_impressions || stHacksInputs.monthly_impressions < 0) {
      return "Error: Missing required input: monthly_impressions.";
    }
    if (!stHacksInputs.monthly_clicks || stHacksInputs.monthly_clicks < 0) {
      return "Error: Missing required input: monthly_clicks.";
    }
    if (!stHacksInputs.monthly_leads || stHacksInputs.monthly_leads < 0) {
      return "Error: Missing required input: monthly_leads.";
    }
    if (!stHacksInputs.sponsor_monthly_cost || stHacksInputs.sponsor_monthly_cost <= 0) {
      return "Error: sponsor_monthly_cost must be greater than 0 to compute ROI.";
    }
    if (sponsorInputs.close_rate < 0 || sponsorInputs.close_rate > 1) {
      return "Error: Value out of range: close_rate. Rates must be between 0 and 1.";
    }
    if (sponsorInputs.gross_margin_percent < 0 || sponsorInputs.gross_margin_percent > 1) {
      return "Error: Value out of range: gross_margin_percent. Rates must be between 0 and 1.";
    }
    if (sponsorInputs.time_horizon_months <= 0) {
      return "Error: time_horizon_months must be greater than 0.";
    }
    return null;
  };

  const calculateROI = () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setResults(null);
      return;
    }

    setError("");

    // Derived metrics
    const click_through_rate = stHacksInputs.click_through_rate ?? 
      (stHacksInputs.monthly_impressions > 0 ? stHacksInputs.monthly_clicks / stHacksInputs.monthly_impressions : 0);
    
    const landing_conversion_rate = stHacksInputs.landing_conversion_rate ?? 
      (stHacksInputs.monthly_clicks > 0 ? stHacksInputs.monthly_leads / stHacksInputs.monthly_clicks : 0);
    
    const projected_closed_deals_per_month = stHacksInputs.monthly_leads * sponsorInputs.close_rate;

    // Monthly projections
    const projected_monthly_revenue = projected_closed_deals_per_month * sponsorInputs.avg_revenue_per_sale;
    const projected_monthly_profit = projected_monthly_revenue * sponsorInputs.gross_margin_percent;
    const monthly_roi_multiple = projected_monthly_profit / stHacksInputs.sponsor_monthly_cost;

    // Time horizon projections
    const projected_closed_deals_total = projected_closed_deals_per_month * sponsorInputs.time_horizon_months;
    const projected_revenue_total = projected_monthly_revenue * sponsorInputs.time_horizon_months;
    const projected_profit_total = projected_monthly_profit * sponsorInputs.time_horizon_months;
    const roi_multiple_total = projected_profit_total / (stHacksInputs.sponsor_monthly_cost * sponsorInputs.time_horizon_months);

    // Scenarios
    const calculateScenario = (closeRate: number): ScenarioResults => {
      const deals = stHacksInputs.monthly_leads * closeRate;
      const revenue = deals * sponsorInputs.avg_revenue_per_sale;
      const profit = revenue * sponsorInputs.gross_margin_percent;
      const roi = profit / stHacksInputs.sponsor_monthly_cost;
      
      return {
        close_rate: closeRate,
        projected_closed_deals_per_month: deals,
        projected_monthly_revenue: revenue,
        projected_monthly_profit: profit,
        monthly_roi_multiple: roi,
      };
    };

    const conservative = calculateScenario(sponsorInputs.close_rate * 0.5);
    const expected = calculateScenario(sponsorInputs.close_rate);
    const aggressive = calculateScenario(Math.min(sponsorInputs.close_rate * 1.5, 1.0));

    const calculationResults: CalculationResults = {
      inputs: {
        ...stHacksInputs,
        ...sponsorInputs,
      },
      derived_metrics: {
        click_through_rate,
        landing_conversion_rate,
        projected_closed_deals_per_month,
      },
      monthly_projection: {
        projected_monthly_revenue,
        projected_monthly_profit,
        monthly_roi_multiple,
      },
      time_horizon_projection: {
        projected_closed_deals_total,
        projected_revenue_total,
        projected_profit_total,
        roi_multiple_total,
      },
      scenarios: {
        conservative,
        expected,
        aggressive,
      },
    };

    setResults(calculationResults);
  };

  const downloadJSON = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sponsor-roi-calculation-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatMultiple = (value: number) => {
    return `${value.toFixed(2)}x`;
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      <SEO 
        title="Sponsor ROI Calculator - ServiceTitan Hacks"
        description="Calculate sponsor ROI with verified performance metrics"
        noindex={true}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Sponsor ROI Calculator
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Calculate transparent, data-backed ROI projections using verified ServiceTitan Hacks performance metrics and your sales economics.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* ServiceTitan Hacks Inputs */}
          <Card className="bg-[#1a1b20] border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                ServiceTitan Hacks Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthly_impressions" className="text-white">Monthly Impressions *</Label>
                <Input
                  id="monthly_impressions"
                  type="number"
                  value={stHacksInputs.monthly_impressions}
                  onChange={(e) => setSTHacksInputs({...stHacksInputs, monthly_impressions: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-monthly-impressions"
                />
              </div>
              <div>
                <Label htmlFor="monthly_clicks" className="text-white">Monthly Clicks *</Label>
                <Input
                  id="monthly_clicks"
                  type="number"
                  value={stHacksInputs.monthly_clicks}
                  onChange={(e) => setSTHacksInputs({...stHacksInputs, monthly_clicks: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-monthly-clicks"
                />
              </div>
              <div>
                <Label htmlFor="monthly_leads" className="text-white">Monthly Leads *</Label>
                <Input
                  id="monthly_leads"
                  type="number"
                  value={stHacksInputs.monthly_leads}
                  onChange={(e) => setSTHacksInputs({...stHacksInputs, monthly_leads: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-monthly-leads"
                />
              </div>
              <div>
                <Label htmlFor="sponsor_monthly_cost" className="text-white">Sponsor Monthly Cost ($) *</Label>
                <Input
                  id="sponsor_monthly_cost"
                  type="number"
                  value={stHacksInputs.sponsor_monthly_cost}
                  onChange={(e) => setSTHacksInputs({...stHacksInputs, sponsor_monthly_cost: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-sponsor-monthly-cost"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sponsor Inputs */}
          <Card className="bg-[#1a1b20] border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Your Sales Economics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="close_rate" className="text-white">Close Rate (0-1) *</Label>
                <Input
                  id="close_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={sponsorInputs.close_rate}
                  onChange={(e) => setSponsorInputs({...sponsorInputs, close_rate: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-close-rate"
                />
                <p className="text-xs text-gray-500 mt-1">Example: 0.15 = 15% close rate</p>
              </div>
              <div>
                <Label htmlFor="avg_revenue_per_sale" className="text-white">Average Revenue Per Sale ($) *</Label>
                <Input
                  id="avg_revenue_per_sale"
                  type="number"
                  value={sponsorInputs.avg_revenue_per_sale}
                  onChange={(e) => setSponsorInputs({...sponsorInputs, avg_revenue_per_sale: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-avg-revenue-per-sale"
                />
              </div>
              <div>
                <Label htmlFor="gross_margin_percent" className="text-white">Gross Margin (0-1) *</Label>
                <Input
                  id="gross_margin_percent"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={sponsorInputs.gross_margin_percent}
                  onChange={(e) => setSponsorInputs({...sponsorInputs, gross_margin_percent: parseFloat(e.target.value) || 0})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-gross-margin-percent"
                />
                <p className="text-xs text-gray-500 mt-1">Example: 0.30 = 30% margin</p>
              </div>
              <div>
                <Label htmlFor="time_horizon_months" className="text-white">Time Horizon (Months) *</Label>
                <Input
                  id="time_horizon_months"
                  type="number"
                  min="1"
                  value={sponsorInputs.time_horizon_months}
                  onChange={(e) => setSponsorInputs({...sponsorInputs, time_horizon_months: parseInt(e.target.value) || 1})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-time-horizon-months"
                />
              </div>
              <div>
                <Label htmlFor="attribution_confidence_score" className="text-white">Attribution Confidence (1-5)</Label>
                <Input
                  id="attribution_confidence_score"
                  type="number"
                  min="1"
                  max="5"
                  value={sponsorInputs.attribution_confidence_score}
                  onChange={(e) => setSponsorInputs({...sponsorInputs, attribution_confidence_score: parseInt(e.target.value) || 2})}
                  className="bg-[#09090b] border-gray-700 text-white"
                  data-testid="input-attribution-confidence"
                />
                <p className="text-xs text-gray-500 mt-1">1 = Low confidence, 5 = High confidence</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={calculateROI}
            size="lg"
            className="bg-[#ED254E] hover:bg-[#C1121F] text-white"
            data-testid="button-calculate-roi"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate ROI
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 bg-red-950 border-red-800">
            <CardContent className="pt-6">
              <p className="text-red-200" data-testid="text-error-message">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Results Display */}
        {results && (
          <div className="space-y-6">
            {/* Derived Metrics */}
            <Card className="bg-[#1a1b20] border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                  Derived Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Click-Through Rate</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-ctr">
                    {formatPercent(results.derived_metrics.click_through_rate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Landing Conversion Rate</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-landing-conversion">
                    {formatPercent(results.derived_metrics.landing_conversion_rate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Projected Deals/Month</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-deals-per-month">
                    {results.derived_metrics.projected_closed_deals_per_month.toFixed(1)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Projection */}
            <Card className="bg-[#1a1b20] border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                  Monthly Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-monthly-revenue">
                    {formatCurrency(results.monthly_projection.projected_monthly_revenue)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Monthly Profit</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-monthly-profit">
                    {formatCurrency(results.monthly_projection.projected_monthly_profit)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Monthly ROI Multiple</p>
                  <p className="text-2xl font-bold text-[#ED254E]" data-testid="text-monthly-roi">
                    {formatMultiple(results.monthly_projection.monthly_roi_multiple)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Time Horizon Projection */}
            <Card className="bg-[#1a1b20] border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                  {results.inputs.time_horizon_months}-Month Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Deals</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-total-deals">
                    {results.time_horizon_projection.projected_closed_deals_total.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-total-revenue">
                    {formatCurrency(results.time_horizon_projection.projected_revenue_total)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Profit</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-total-profit">
                    {formatCurrency(results.time_horizon_projection.projected_profit_total)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total ROI Multiple</p>
                  <p className="text-2xl font-bold text-[#ED254E]" data-testid="text-total-roi">
                    {formatMultiple(results.time_horizon_projection.roi_multiple_total)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Analysis */}
            <Card className="bg-[#1a1b20] border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                  Scenario Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Conservative */}
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">Conservative (50% of expected close rate)</h3>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Close Rate</p>
                      <p className="text-white font-semibold" data-testid="text-conservative-close-rate">
                        {formatPercent(results.scenarios.conservative.close_rate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Deals/Month</p>
                      <p className="text-white font-semibold">
                        {results.scenarios.conservative.projected_closed_deals_per_month.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Monthly Profit</p>
                      <p className="text-white font-semibold">
                        {formatCurrency(results.scenarios.conservative.projected_monthly_profit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">ROI Multiple</p>
                      <p className="text-yellow-400 font-bold" data-testid="text-conservative-roi">
                        {formatMultiple(results.scenarios.conservative.monthly_roi_multiple)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expected */}
                <div className="border-l-4 border-[#ED254E] pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">Expected (Your close rate)</h3>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Close Rate</p>
                      <p className="text-white font-semibold" data-testid="text-expected-close-rate">
                        {formatPercent(results.scenarios.expected.close_rate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Deals/Month</p>
                      <p className="text-white font-semibold">
                        {results.scenarios.expected.projected_closed_deals_per_month.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Monthly Profit</p>
                      <p className="text-white font-semibold">
                        {formatCurrency(results.scenarios.expected.projected_monthly_profit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">ROI Multiple</p>
                      <p className="text-[#ED254E] font-bold" data-testid="text-expected-roi">
                        {formatMultiple(results.scenarios.expected.monthly_roi_multiple)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Aggressive */}
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">Aggressive (150% of expected close rate)</h3>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Close Rate</p>
                      <p className="text-white font-semibold" data-testid="text-aggressive-close-rate">
                        {formatPercent(results.scenarios.aggressive.close_rate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Deals/Month</p>
                      <p className="text-white font-semibold">
                        {results.scenarios.aggressive.projected_closed_deals_per_month.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Monthly Profit</p>
                      <p className="text-white font-semibold">
                        {formatCurrency(results.scenarios.aggressive.projected_monthly_profit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">ROI Multiple</p>
                      <p className="text-green-400 font-bold" data-testid="text-aggressive-roi">
                        {formatMultiple(results.scenarios.aggressive.monthly_roi_multiple)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download JSON */}
            <div className="flex justify-center">
              <Button 
                onClick={downloadJSON}
                variant="outline"
                className="border-gray-700 text-white hover:bg-[#1a1b20]"
                data-testid="button-download-json"
              >
                <Download className="mr-2 h-4 w-4" />
                Download JSON Results
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
