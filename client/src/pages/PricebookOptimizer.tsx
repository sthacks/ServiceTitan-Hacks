import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, Check, RotateCcw, ExternalLink, CheckCircle2, Wind, Droplets, Zap, Warehouse, Home, MoreHorizontal, Mail } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const CHECKOUT_URL = "https://buy.stripe.com/cNi4gy86A39aep9gCAgbm0J";

const TRADES = [
  { value: "HVAC",         label: "HVAC",         icon: Wind },
  { value: "Plumbing",     label: "Plumbing",      icon: Droplets },
  { value: "Electrical",   label: "Electrical",    icon: Zap },
  { value: "Garage Door",  label: "Garage Door",   icon: Warehouse },
  { value: "Roofing",      label: "Roofing",       icon: Home },
  { value: "Other",        label: "Other",         icon: MoreHorizontal },
];

const SAMPLES: Record<string, string[]> = {
  HVAC: [
    "replace outdoor ac fan motor and fan blade",
    "clean and tune up condenser, replace capacitor",
    "install 3 ton 16 seer heat pump system with air handler",
    "replace blower motor on furnace, includes new run capacitor",
    "r-410a refrigerant leak search and repair, includes 2 lbs refrigerant",
  ],
  Plumbing: [
    "replace 40 gal gas water heater",
    "clear main sewer line with cable machine",
    "install pressure reducing valve at main water supply",
    "replace kitchen faucet customer supplied",
    "repair burst pex line in wall, includes drywall access",
  ],
  Electrical: [
    "replace 200 amp main panel",
    "install ceiling fan customer supplied",
    "add 20 amp dedicated circuit for kitchen appliance",
    "troubleshoot and repair tripping breaker",
    "install whole home surge protector at main panel",
  ],
  "Garage Door": [
    "replace both torsion springs on 16 ft door",
    "install new garage door opener with wifi",
    "replace bottom seal and weatherstripping",
    "service and lubricate garage door, adjust tension",
    "replace bent or damaged section of garage door panel",
  ],
  Roofing: [
    "repair active leak in valley flashing",
    "replace 10 damaged shingles after storm",
    "install ridge vent and seal off old box vents",
    "replace pipe boot flashing on plumbing vent",
    "tarp roof emergency until full repair",
  ],
};

function track(event: string, params?: Record<string, string | number>) {
  try { (window as any).gtag?.("event", event, params); } catch { /* ignore */ }
}

export default function PricebookOptimizer() {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLElement | null>(null);

  const [trade, setTrade] = useState("");
  const [mode, setMode] = useState<"sample" | "custom" | null>(null);
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number | null>(null);
  const [customDescription, setCustomDescription] = useState("");
  const [result, setResult] = useState<{ optimized: string; original: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Post-result email capture state
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSkipped, setEmailSkipped] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const samples = SAMPLES[trade] ?? [];
  const inputDescription =
    mode === "sample" && selectedSampleIdx !== null
      ? samples[selectedSampleIdx]
      : customDescription;

  const handleTradeChange = (val: string) => {
    setTrade(val);
    setMode(val === "Other" ? "custom" : null);
    setSelectedSampleIdx(null);
    setCustomDescription("");
    track("trade_selected", { trade: val });
  };

  const handleModeSelect = (m: "sample" | "custom") => {
    setMode(m);
    setSelectedSampleIdx(null);
    track("path_chosen", { path: m });
  };

  const handleSampleClick = (idx: number) => {
    setSelectedSampleIdx(idx);
    track("sample_clicked", { index: idx });
  };

  const handleRewrite = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/pricebook-tool/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade,
          description: inputDescription,
          inputType: mode,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get rewrite");

      setResult({ optimized: data.optimizedDescription, original: inputDescription });
      track("rewrite_generated");

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCapture = async () => {
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      toast({ title: "Enter a valid email address", variant: "destructive" });
      return;
    }
    setEmailSubmitting(true);
    try {
      await fetch("/api/pricebook-tool/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          trade,
          description: result?.original,
          inputType: mode,
          rewriteOutput: result?.optimized,
        }),
      });
      setEmailSent(true);
      track("email_captured");
    } catch {
      // silent — don't block the user
    } finally {
      setEmailSubmitting(false);
    }
  };

  const handleReset = () => {
    setTrade("");
    setMode(null);
    setSelectedSampleIdx(null);
    setCustomDescription("");
    setEmailInput("");
    setEmailSent(false);
    setEmailSkipped(false);
    setEmailSubmitting(false);
    setResult(null);
    setError("");
    setCopied(false);
    track("reset_clicked");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCopy = async () => {
    if (result?.optimized) {
      await navigator.clipboard.writeText(result.optimized.replace(/<[^>]+>/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Free Pricebook Rewrite Tool | See Your Descriptions in Homeowner Language"
        description="Pick a sample or paste your own pricebook description. AI rewrites it in homeowner language in 10 seconds. Free tool from ServiceTitan Hacks."
        canonicalUrl="https://servicetitanhacks.com/pricebook-overhaul-tool"
        ogImage="https://servicetitanhacks.com/og-pricebook-optimizer.png"
      />
      <Header />

      <main className="flex-1">
        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="pt-12 pb-6 bg-background" ref={formRef as any}>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
              See Your Pricebook Rewritten in Homeowner Language
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick a sample or paste your own. AI rewrites it in 10 seconds.
            </p>
          </div>
        </section>

        {/* ─── Form ─────────────────────────────────────────────── */}
        {!result && !isLoading && (
          <section id="form" className="pb-16 bg-background">
            <div className="mx-auto max-w-2xl px-6 space-y-8">

              {/* Step 1 — Trade */}
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  What trade is this for? <span className="text-destructive">*</span>
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TRADES.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      data-testid={`radio-trade-${value.replace(" ", "-")}`}
                      onClick={() => handleTradeChange(value)}
                      aria-pressed={trade === value}
                      className={cn(
                        "flex flex-col items-center gap-2 py-4 px-2 rounded-md border transition-colors hover-elevate",
                        trade === value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <span className="text-xs font-medium leading-tight text-center">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — Mode selection */}
              {trade && trade !== "Other" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">What would you like to do?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      data-testid="card-mode-sample"
                      onClick={() => handleModeSelect("sample")}
                      className={cn(
                        "rounded-md border p-5 text-left hover-elevate transition-colors",
                        mode === "sample"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      <p className="font-semibold mb-1">See a sample rewrite</p>
                      <p className="text-sm text-muted-foreground">
                        Pick from 5 examples for your trade
                      </p>
                    </button>

                    <button
                      type="button"
                      data-testid="card-mode-custom"
                      onClick={() => handleModeSelect("custom")}
                      className={cn(
                        "rounded-md border p-5 text-left hover-elevate transition-colors",
                        mode === "custom"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      <p className="font-semibold mb-1">Rewrite my own description</p>
                      <p className="text-sm text-muted-foreground">
                        Paste a description from your pricebook
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3a — Sample cards */}
              {mode === "sample" && samples.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Select a description to rewrite:</p>
                  <div className="space-y-2">
                    {samples.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        data-testid={`card-sample-${idx}`}
                        onClick={() => handleSampleClick(idx)}
                        className={cn(
                          "w-full rounded-md border px-4 py-3 text-left font-sans text-sm hover-elevate transition-colors",
                          selectedSampleIdx === idx
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card"
                        )}
                      >
                        {selectedSampleIdx === idx && (
                          <CheckCircle2 className="inline-block h-4 w-4 text-primary mr-2 -mt-0.5" />
                        )}
                        {sample}
                      </button>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={selectedSampleIdx === null}
                    onClick={handleRewrite}
                    data-testid="button-rewrite-sample"
                  >
                    Rewrite this sample
                  </Button>
                </div>
              )}

              {/* Step 3b — Custom textarea */}
              {mode === "custom" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium" htmlFor="custom-description">
                    Paste your description from ServiceTitan
                  </label>
                  <Textarea
                    id="custom-description"
                    data-testid="textarea-description"
                    rows={5}
                    placeholder="The more detail you provide, the better the rewrite"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                  />
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={customDescription.trim().length < 5}
                    onClick={handleRewrite}
                    data-testid="button-rewrite-custom"
                  >
                    Rewrite my description
                  </Button>
                </div>
              )}

              {/* Inline error */}
              {error && (
                <p className="text-sm text-destructive" data-testid="text-error">{error}</p>
              )}
            </div>
          </section>
        )}

        {/* ─── Loading ───────────────────────────────────────────── */}
        {isLoading && (
          <section className="py-24 bg-background">
            <div className="mx-auto max-w-2xl px-6 flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="status-loading" />
              <p className="text-base font-medium">Generating your rewrite...</p>
            </div>
          </section>
        )}

        {/* ─── Result ───────────────────────────────────────────── */}
        {result && !isLoading && (
          <section ref={resultRef} className="py-12 bg-background">
            <div className="mx-auto max-w-4xl px-6 space-y-10">

              {/* Before / After comparison */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-result">
                  Here's your rewrite
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Before */}
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                        Before
                      </p>
                      <p className="font-mono text-sm leading-relaxed text-foreground italic" data-testid="text-before">
                        "{result.original}"
                      </p>
                    </CardContent>
                  </Card>

                  {/* After */}
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          After
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCopy}
                          data-testid="button-copy"
                        >
                          {copied ? (
                            <><Check className="h-3 w-3 mr-1" /> Copied</>
                          ) : (
                            <><Copy className="h-3 w-3 mr-1" /> Copy</>
                          )}
                        </Button>
                      </div>
                      <div
                        className="text-sm leading-relaxed text-foreground prose prose-sm max-w-none"
                        data-testid="text-after"
                        dangerouslySetInnerHTML={{ __html: result.optimized }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Block 1 — Email capture (inline, optional) */}
              {!emailSkipped && (
                <div className="rounded-md border bg-muted/40 px-6 py-6 space-y-4" data-testid="block-email-capture">
                  {emailSent ? (
                    <div className="flex items-center gap-3 text-sm" data-testid="text-email-sent">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Sent. Check your inbox.</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <p className="font-semibold text-sm">Want a copy emailed to you?</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We'll send the rewrite plus occasional pricebook tips. Unsubscribe anytime.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleEmailCapture()}
                          className="flex-1 min-w-48"
                          data-testid="input-email"
                        />
                        <Button
                          onClick={handleEmailCapture}
                          disabled={emailSubmitting}
                          data-testid="button-email-submit"
                        >
                          {emailSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Email me a copy
                        </Button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailSkipped(true);
                          track("email_skipped");
                        }}
                        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                        data-testid="button-skip-email"
                      >
                        No thanks, skip this
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Block 2 — Bulk CTA */}
              <div className="rounded-md border bg-card px-6 py-8 text-center space-y-4" data-testid="block-bulk-cta">
                <p className="text-lg font-semibold">
                  Want this done on your entire pricebook?
                </p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  AI rewrites every description in your ServiceTitan pricebook. 72-hour turnaround. Flat $395.
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    track("bulk_cta_clicked");
                    window.open(CHECKOUT_URL, "_blank");
                  }}
                  data-testid="button-bulk-cta"
                >
                  Get the Bulk Overhaul — $395
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Block 3 — Reset */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                  data-testid="button-try-another"
                >
                  <RotateCcw className="inline h-3 w-3 mr-1 -mt-0.5" />
                  Try another rewrite
                </button>
              </div>

            </div>
          </section>
        )}

        {/* ─── Accordion — How does this work? ─────────────────── */}
        <section className="py-10 border-t bg-background">
          <div className="mx-auto max-w-2xl px-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="how-it-works">
                <AccordionTrigger
                  className="text-base font-medium"
                  data-testid="accordion-how-it-works"
                >
                  How does this work?
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-4 pt-2">
                    {[
                      {
                        title: "Download your pricebook from ServiceTitan",
                        body: "Export your current pricebook file from your ServiceTitan account.",
                      },
                      {
                        title: "Upload it to our tool",
                        body: "Simply upload your pricebook file and let our AI get to work.",
                      },
                      {
                        title: "Our AI rewrites your descriptions",
                        body: "Technical details become simple explanations homeowners understand—focused on comfort, safety, and real value.",
                      },
                      {
                        title: "We send the file back to you",
                        body: "Get your updated pricebook file with all the new descriptions ready to go.",
                      },
                      {
                        title: "Review and upload to ServiceTitan",
                        body: "Look over the changes, make any tweaks, then upload it back to ServiceTitan.",
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
