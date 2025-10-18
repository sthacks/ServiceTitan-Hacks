import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (honeypot) {
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Connect to real API endpoint
    console.log("Email subscription:", email);
    
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our mailing list.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-muted rounded-lg p-8">
      <h3 className="text-2xl font-semibold font-heading mb-2">Stay in the loop</h3>
      <p className="text-muted-foreground mb-6">
        Get tips, tools, and exclusive offers delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          data-testid="input-email-subscribe"
        />
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          autoComplete="off"
        />
        <Button type="submit" disabled={isLoading} data-testid="button-subscribe">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
