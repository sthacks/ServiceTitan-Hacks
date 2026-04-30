import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2, BarChart3, Users, MousePointerClick, Mail, ExternalLink, RotateCcw, TrendingUp } from "lucide-react";
import { useState } from "react";

interface AnalyticsData {
  counts: Record<string, number>;
  tradeBreakdown: Record<string, number>;
  dailyVolume: Array<{ date: string; rewrites: number; pageViews: number }>;
}

const EVENT_LABELS: Record<string, string> = {
  page_view: "Page Views",
  trade_selected: "Trade Selected",
  path_chosen: "Path Chosen",
  rewrite_generated: "Rewrites Generated",
  email_captured: "Emails Captured",
  email_skipped: "Email Skipped",
  bulk_cta_clicked: "Bulk CTA Clicked",
  reset_clicked: "Try Another",
};

const EVENT_ICONS: Record<string, typeof Users> = {
  page_view: Users,
  trade_selected: MousePointerClick,
  path_chosen: MousePointerClick,
  rewrite_generated: TrendingUp,
  email_captured: Mail,
  email_skipped: RotateCcw,
  bulk_cta_clicked: ExternalLink,
  reset_clicked: RotateCcw,
};

const FUNNEL_STEPS = [
  "page_view",
  "trade_selected",
  "rewrite_generated",
  "email_captured",
  "bulk_cta_clicked",
];

const DAYS_OPTIONS = [7, 14, 30, 90];

export default function PricebookToolAnalytics() {
  const [days, setDays] = useState(30);

  const { data, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ["/api/admin/pricebook-tool/analytics", days],
    queryFn: () =>
      fetch(`/api/admin/pricebook-tool/analytics?days=${days}`).then((r) => {
        if (!r.ok) throw new Error("Unauthorized or error");
        return r.json();
      }),
  });

  const funnelMax = data ? Math.max(...FUNNEL_STEPS.map(k => data.counts[k] ?? 0), 1) : 1;

  const totalRewrites = data?.counts?.rewrite_generated ?? 0;
  const totalPageViews = data?.counts?.page_view ?? 0;
  const emailRate = totalRewrites > 0
    ? Math.round(((data?.counts?.email_captured ?? 0) / totalRewrites) * 100)
    : 0;
  const ctaRate = totalRewrites > 0
    ? Math.round(((data?.counts?.bulk_cta_clicked ?? 0) / totalRewrites) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-10">
        <div className="mx-auto max-w-5xl px-6 space-y-8">

          {/* Title + time range */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Pricebook Tool Analytics
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Event data from <a href="/pricebook-overhaul-tool" className="underline">/pricebook-overhaul-tool</a>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {DAYS_OPTIONS.map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={days === d ? "default" : "outline"}
                  onClick={() => setDays(d)}
                  data-testid={`button-days-${d}`}
                >
                  {d}d
                </Button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                <p>Could not load analytics. Make sure you're logged in as an admin.</p>
              </CardContent>
            </Card>
          )}

          {data && (
            <>
              {/* KPI summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Page Views", value: totalPageViews, icon: Users },
                  { label: "Rewrites Generated", value: totalRewrites, icon: TrendingUp },
                  { label: "Email Capture Rate", value: `${emailRate}%`, icon: Mail },
                  { label: "CTA Click Rate", value: `${ctaRate}%`, icon: ExternalLink },
                ].map(({ label, value, icon: Icon }) => (
                  <Card key={label}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
                      </div>
                      <p className="text-2xl font-bold" data-testid={`kpi-${label}`}>{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Conversion funnel */}
              <Card>
                <CardHeader className="pb-2">
                  <p className="font-semibold">Conversion Funnel</p>
                  <p className="text-xs text-muted-foreground">Last {days} days</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {FUNNEL_STEPS.map((step, i) => {
                    const count = data.counts[step] ?? 0;
                    const pct = Math.round((count / funnelMax) * 100);
                    const dropPct = i > 0 && (data.counts[FUNNEL_STEPS[i - 1]] ?? 0) > 0
                      ? Math.round((count / (data.counts[FUNNEL_STEPS[i - 1]] ?? 1)) * 100)
                      : null;
                    return (
                      <div key={step} className="space-y-1">
                        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                          <span className="font-medium">{EVENT_LABELS[step] ?? step}</span>
                          <div className="flex items-center gap-3">
                            {dropPct !== null && (
                              <span className="text-xs text-muted-foreground">
                                {dropPct}% from prev
                              </span>
                            )}
                            <span className="font-semibold tabular-nums">{count.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Trade breakdown + all events side by side */}
              <div className="grid gap-6 md:grid-cols-2">

                {/* Trade breakdown */}
                <Card>
                  <CardHeader className="pb-2">
                    <p className="font-semibold">Rewrites by Trade</p>
                    <p className="text-xs text-muted-foreground">Last {days} days</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.keys(data.tradeBreakdown).length === 0 && (
                      <p className="text-sm text-muted-foreground">No data yet.</p>
                    )}
                    {Object.entries(data.tradeBreakdown).map(([trade, count]) => {
                      const pct = Math.round((count / Math.max(...Object.values(data.tradeBreakdown), 1)) * 100);
                      return (
                        <div key={trade} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{trade}</span>
                            <span className="font-semibold tabular-nums">{count}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary/60 transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* All event counts */}
                <Card>
                  <CardHeader className="pb-2">
                    <p className="font-semibold">All Events</p>
                    <p className="text-xs text-muted-foreground">Last {days} days</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(data.counts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([event, count]) => {
                        const Icon = EVENT_ICONS[event] ?? MousePointerClick;
                        return (
                          <div key={event} className="flex items-center justify-between py-1 border-b last:border-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span>{EVENT_LABELS[event] ?? event}</span>
                            </div>
                            <span className="text-sm font-semibold tabular-nums">{count.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    {Object.keys(data.counts).length === 0 && (
                      <p className="text-sm text-muted-foreground">No events yet.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Daily volume chart (simple bar chart) */}
              {data.dailyVolume.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <p className="font-semibold">Daily Volume</p>
                    <p className="text-xs text-muted-foreground">Rewrites (pink) vs Page Views (gray) — last {days} days</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-1 h-32 mt-2">
                      {data.dailyVolume.map(({ date, rewrites, pageViews }) => {
                        const maxVal = Math.max(...data.dailyVolume.map(d => Math.max(d.rewrites, d.pageViews)), 1);
                        const rewritePct = Math.round((rewrites / maxVal) * 100);
                        const pvPct = Math.round((pageViews / maxVal) * 100);
                        const label = date.slice(5); // MM-DD
                        return (
                          <div key={date} className="flex-1 flex flex-col items-center gap-0.5" title={`${date}: ${rewrites} rewrites, ${pageViews} views`}>
                            <div className="w-full flex items-end gap-0.5 h-24">
                              <div
                                className="flex-1 rounded-t-sm bg-muted transition-all"
                                style={{ height: `${pvPct}%` }}
                              />
                              <div
                                className="flex-1 rounded-t-sm bg-primary transition-all"
                                style={{ height: `${rewritePct}%` }}
                              />
                            </div>
                            {data.dailyVolume.length <= 14 && (
                              <span className="text-[9px] text-muted-foreground rotate-45 origin-left">{label}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
