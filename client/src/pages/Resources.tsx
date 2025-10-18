import { useState } from "react";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Resources() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const resources = [
    {
      title: "Customer Lifetime Value Analysis Prompt",
      description: "Unlock the power of ServiceTitan reports with this easy-to-use prompt for ChatGPT. Perfect for business owners and marketers, enhance your understanding of customer lifetime value today!",
      type: "Digital Download",
      image: "https://import.cdn.thinkific.com/1072722/bj43DcJVTeerV9M2FCWm_ServiceTitan%20Customer%20Lifetime%20Value%20Analysis.png",
      url: "https://www.servicetitanhacks.com/products/digital_downloads/ltv-analysis",
    },
    {
      title: "Connect ServiceTitan to Zapier",
      description: "Master the integration of ServiceTitan and Zapier to streamline operations and automate workflows. Enhance your productivity and efficiency with powerful, automated connections.",
      type: "Course",
      image: "https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png",
      url: "https://www.servicetitanhacks.com/products/courses/servicetitan-to-zapier",
    },
    {
      title: "Master Your Pricing Objections",
      description: "Transform tension into trust with my proven strategy for handling pricing objections. Download the 'Why It Costs What It Costs' graphic to confidently communicate your value without sounding defensive.",
      type: "Digital Download",
      image: "https://import.cdn.thinkific.com/1072722/ligxf2UyTB6c448xDSnm_IMG_3358.jpeg",
      url: "https://www.servicetitanhacks.com/products/digital_downloads/transform-your-pricing-strategy",
    },
    {
      title: "Streamline Your Business with Swimlane Charts",
      description: "Unlock your team's potential! Download my free Swimlane Chart template to establish clear processes, enhance collaboration, and adapt workflows for a more scalable business model.",
      type: "Digital Download",
      image: "https://import.cdn.thinkific.com/1072722/YE349y0ISMyGMhGo57f0_IMG_3356.jpeg",
      url: "https://www.servicetitanhacks.com/products/digital_downloads/swimlane-charts",
    },
    {
      title: "ServiceTitan Metric Definitions: The Plain English Guide",
      description: "Eliminate confusion around ServiceTitan metrics! This free guide clarifies key KPIs in simple terms, ensuring your team aligns, makes confident decisions, and seizes revenue opportunities.",
      type: "Digital Download",
      image: "https://import.cdn.thinkific.com/1072722/sYVl32TrSPuxL4jpF0m0_112%20ServiceTitan%20Metrics%20(2).png",
      url: "https://www.servicetitanhacks.com/products/digital_downloads/service-titan-metrics-guide",
    },
  ];

  const leadMutation = useMutation({
    mutationFn: async (data: { firstName: string; email: string; resourceName: string }) => {
      return apiRequest("POST", "/api/resource-leads", data);
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success!",
        description: "Redirecting you to the resource...",
      });
      
      const resource = resources.find(r => r.title === variables.resourceName);
      if (resource) {
        setTimeout(() => {
          window.open(resource.url, '_blank');
          handleCloseDialog();
        }, 1000);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDownloadClick = (resourceTitle: string) => {
    setSelectedResource(resourceTitle);
  };

  const handleCloseDialog = () => {
    setSelectedResource(null);
    setFirstName("");
    setEmail("");
    setHoneypot("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!firstName || !email) {
      toast({
        title: "Missing information",
        description: "Please provide your first name and email.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (selectedResource) {
      leadMutation.mutate({ firstName, email, resourceName: selectedResource });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Free Resources"
        subtitle="Access free templates, guides, and tools to help you get more out of ServiceTitan and grow your home service business."
        dark={false}
      />

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="hover-elevate flex flex-col">
                <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">{resource.type}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-heading mb-3 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <Button
                    onClick={() => handleDownloadClick(resource.title)}
                    className="w-full gap-2"
                    data-testid={`button-download-${index}`}
                  >
                    <Download className="h-4 w-4" />
                    Get Free Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">Looking for More?</h3>
                <p className="text-muted-foreground mb-6">
                  Join our free community of 9,500+ ServiceTitan users to access even more resources, ask questions, and connect with other contractors.
                </p>
                <a
                  href="https://go.st-hacks.cc/servicetitanhacks"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-community-cta"
                >
                  <Button size="lg" className="gap-2">
                    Join the Community <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedResource} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Your Free Resource</DialogTitle>
            <DialogDescription>
              Enter your details below to access <strong>{selectedResource}</strong>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                data-testid="input-resource-firstname"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid="input-resource-email"
              />
            </div>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: "absolute", left: "-9999px" }}
              tabIndex={-1}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              We'll send you the resource link and occasional updates. Unsubscribe anytime.
            </p>
            <Button type="submit" disabled={leadMutation.isPending} className="w-full" data-testid="button-submit-resource-form">
              {leadMutation.isPending ? "Processing..." : "Get Resource"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
