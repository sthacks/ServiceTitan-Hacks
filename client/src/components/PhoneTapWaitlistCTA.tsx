import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Phone, CheckCircle } from "lucide-react";

interface PhoneTapWaitlistCTAProps {
  variant?: "inline" | "card";
}

export default function PhoneTapWaitlistCTA({ variant = "card" }: PhoneTapWaitlistCTAProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const waitlistMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/phonetap-waitlist", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "You're on the list!",
        description: "We'll reach out when PhoneTAP is ready for you.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.companyName || !formData.companySize) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    waitlistMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">You're on the waitlist!</h3>
            <p className="text-muted-foreground">
              We'll be in touch soon with early access details.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="waitlist-name">Name</Label>
          <Input
            id="waitlist-name"
            data-testid="input-waitlist-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <Label htmlFor="waitlist-email">Email</Label>
          <Input
            id="waitlist-email"
            type="email"
            data-testid="input-waitlist-email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="waitlist-phone">Phone Number</Label>
          <Input
            id="waitlist-phone"
            type="tel"
            data-testid="input-waitlist-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 555-5555"
            required
          />
        </div>
        <div>
          <Label htmlFor="waitlist-company">Company Name</Label>
          <Input
            id="waitlist-company"
            data-testid="input-waitlist-company"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Your company"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="waitlist-size">Company Size</Label>
        <Select
          value={formData.companySize}
          onValueChange={(value) => setFormData({ ...formData, companySize: value })}
        >
          <SelectTrigger id="waitlist-size" data-testid="select-waitlist-size">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1-5 employees</SelectItem>
            <SelectItem value="6-15">6-15 employees</SelectItem>
            <SelectItem value="16-30">16-30 employees</SelectItem>
            <SelectItem value="31-50">31-50 employees</SelectItem>
            <SelectItem value="51-100">51-100 employees</SelectItem>
            <SelectItem value="100+">100+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="w-full"
        data-testid="button-join-waitlist"
        disabled={waitlistMutation.isPending}
      >
        {waitlistMutation.isPending ? "Joining..." : "Join the Waitlist"}
      </Button>
    </form>
  );

  if (variant === "inline") {
    return formContent;
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading">Join the PhoneTAP Waitlist</h3>
            <p className="text-sm text-muted-foreground">Get early access to AI-powered call analysis</p>
          </div>
        </div>
        {formContent}
      </CardContent>
    </Card>
  );
}
