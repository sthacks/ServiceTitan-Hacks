import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, Loader2, Search, Download, AlertCircle, Package } from "lucide-react";

type OrderStatus = "received" | "in_progress" | "complete";

interface OverhaulOrder {
  id: string;
  email: string;
  status: OrderStatus;
  fileName: string;
  downloadUrl: string | null;
  notes: string | null;
  submittedAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string; description: string }> = {
  received: {
    label: "Received",
    icon: <Package className="h-5 w-5" />,
    color: "text-blue-400",
    description: "We have your pricebook file and are queuing it for processing.",
  },
  in_progress: {
    label: "In Progress",
    icon: <Clock className="h-5 w-5" />,
    color: "text-yellow-400",
    description: "We are actively rewriting your pricebook descriptions right now.",
  },
  complete: {
    label: "Complete",
    icon: <CheckCircle className="h-5 w-5" />,
    color: "text-green-400",
    description: "Your rewritten pricebook is ready to download.",
  },
};

const STEPS: OrderStatus[] = ["received", "in_progress", "complete"];

function StatusStepper({ status }: { status: OrderStatus }) {
  const currentIdx = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-0 w-full max-w-sm mx-auto mb-8">
      {STEPS.map((step, idx) => {
        const cfg = STATUS_CONFIG[step];
        const isActive = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isActive
                    ? isCurrent
                      ? "border-primary bg-primary text-white"
                      : "border-green-500 bg-green-500/10 text-green-400"
                    : "border-zinc-700 bg-zinc-900 text-zinc-600"
                }`}
              >
                {isActive && !isCurrent ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  cfg.icon
                )}
              </div>
              <p className={`text-xs mt-1.5 font-medium ${isActive ? "text-white" : "text-zinc-600"}`}>
                {cfg.label}
              </p>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-16px] ${idx < currentIdx ? "bg-green-500" : "bg-zinc-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: OverhaulOrder }) {
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.received;
  const submitted = new Date(order.submittedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-4" data-testid={`card-order-${order.id}`}>
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={cfg.color}>{cfg.icon}</span>
          <span className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
        </div>
        <p className="text-zinc-500 text-xs">Submitted {submitted}</p>
      </div>

      <StatusStepper status={order.status} />

      <p className="text-zinc-400 text-sm text-center mb-4">{cfg.description}</p>

      {order.status === "complete" && order.downloadUrl && (
        <div className="text-center">
          <a
            href={order.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-download-pricebook"
          >
            <Button size="default" className="gap-2">
              <Download className="h-4 w-4" />
              Download Your Rewritten Pricebook
            </Button>
          </a>
          <p className="text-zinc-600 text-xs mt-3">
            After downloading, import the file back into ServiceTitan via Pricebook → Import.
          </p>
        </div>
      )}

      {order.status !== "complete" && (
        <div className="bg-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-400 text-center">
          Expect delivery within <span className="text-white font-medium">72 hours</span> of submission. Usually faster.
        </div>
      )}

      <p className="text-zinc-600 text-xs text-center mt-3">
        File: {order.fileName}
      </p>
    </div>
  );
}

export default function OverhaulStatus() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<OverhaulOrder[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrders(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`/api/overhaul-status?email=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setOrders(data.orders || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <SEO
        title="Check Your Pricebook Overhaul Order Status | ServiceTitan Hacks"
        description="Enter your email to check the status of your ServiceTitan Pricebook Overhaul order."
        canonicalUrl="https://servicetitanhacks.com/overhaul-status"
      />
      <Header />
      <main className="flex-1 py-20 md:py-28">
        <div className="mx-auto max-w-lg px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
              Track Your Overhaul Order
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              Enter the email address you used at checkout to see your order status.
            </p>
          </div>

          <form onSubmit={handleLookup} className="mb-8">
            <div className="space-y-3">
              <Label htmlFor="email-lookup" className="text-white text-sm font-medium">
                Email address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email-lookup"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-primary flex-1"
                  data-testid="input-email-lookup"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2"
                  data-testid="button-check-status"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {loading ? "Checking..." : "Check"}
                </Button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-3" data-testid="text-error">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </form>

          {searched && orders !== null && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl" data-testid="text-no-orders">
                  <Package className="h-10 w-10 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-300 font-medium mb-2">No orders found</p>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                    We couldn't find any orders for that email. Double-check the address, or email{" "}
                    <a href="mailto:bill@st-hacks.com" className="text-primary hover:underline">
                      bill@st-hacks.com
                    </a>{" "}
                    if you think something's wrong.
                  </p>
                </div>
              ) : (
                <div data-testid="list-orders">
                  {orders.map(order => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          )}

          {!searched && (
            <div className="text-center text-zinc-600 text-sm">
              <p>
                Questions? Email{" "}
                <a href="mailto:bill@st-hacks.com" className="text-zinc-400 hover:text-white transition-colors">
                  bill@st-hacks.com
                </a>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
