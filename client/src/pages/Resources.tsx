import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import hvacMarketingImage from "@assets/IMG_4342_1760897351059.jpeg";
import pricingObjectionsImage from "@assets/Untitled design_1760897689409.png";
import referralWizardImage from "@assets/generated_images/Referral_marketing_business_illustration_4a956926.png";
import winkROIImage from "@assets/generated_images/ROI_automation_savings_illustration_d00c9d33.png";
import ltvAnalysisImage from "@assets/generated_images/Customer_lifetime_value_analysis_04f8592e.png";
import zapierIntegrationImage from "@assets/generated_images/ServiceTitan_Zapier_integration_visual_c40d4316.png";
import swimlaneChartImage from "@assets/generated_images/Business_process_swimlane_workflow_e4e79b67.png";
import metricsGuideImage from "@assets/generated_images/Business_metrics_KPI_dashboard_b247c6c8.png";
import freeResourcesHero from "@assets/switchy images (21)_1761919068554.png";

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
      type: "Tool",
      image: ltvAnalysisImage,
      url: "https://go.st-hacks.cc/ltv-analysis",
      isExternalTool: true,
    },
    {
      title: "Connect ServiceTitan to Zapier",
      description: "Master the integration of ServiceTitan and Zapier to streamline operations and automate workflows. Enhance your productivity and efficiency with powerful, automated connections.",
      type: "Course",
      image: zapierIntegrationImage,
      url: "https://go.st-hacks.cc/st-zapier",
      isExternalCourse: true,
    },
    {
      title: "Master Your Pricing Objections",
      description: "Transform tension into trust with my proven strategy for handling pricing objections. Download the 'Why It Costs What It Costs' graphic to confidently communicate your value without sounding defensive.",
      type: "Digital Download",
      image: pricingObjectionsImage,
      url: "https://servicetitanhacks.thinkific.com/products/digital_downloads/transform-your-pricing-strategy",
      isExternalTool: true,
    },
    {
      title: "Streamline Your Business with Swimlane Charts",
      description: "Unlock your team's potential! Download my free Swimlane Chart template to establish clear processes, enhance collaboration, and adapt workflows for a more scalable business model.",
      type: "Digital Download",
      image: swimlaneChartImage,
      url: "/downloads/Tech-Turnover-Swimlane.pdf",
      isLocalFile: true,
    },
    {
      title: "ServiceTitan Metric Definitions: The Plain English Guide",
      description: "Eliminate confusion around ServiceTitan metrics! This free guide clarifies key KPIs in simple terms, ensuring your team aligns, makes confident decisions, and seizes revenue opportunities.",
      type: "Digital Download",
      image: metricsGuideImage,
      url: "https://go.st-hacks.cc/servicetitan-metrics",
      isExternalTool: true,
    },
    {
      title: "HVAC Marketing Calculator",
      description: "Calculate your marketing ROI and discover how much revenue you need to generate to justify your marketing spend. Get instant insights to make smarter marketing decisions.",
      type: "Tool",
      image: hvacMarketingImage,
      url: "https://hvac-marketing-calculator.lovable.app/",
      isExternalTool: true,
    },
    {
      title: "Referral Wizard Calculator",
      description: "Discover how powerful referrals can be for your business. Calculate the lifetime value of a single referral and see how word-of-mouth marketing drives sustainable growth.",
      type: "Tool",
      image: referralWizardImage,
      url: "https://go.st-hacks.cc/referral-calculator",
      isExternalTool: true,
    },
    {
      title: "Wink ROI Saver Calculator",
      description: "Calculate your potential savings and ROI with Wink's automation tools. See exactly how much time and money you can save by streamlining your ServiceTitan operations.",
      type: "Tool",
      image: winkROIImage,
      url: "https://go.st-hacks.cc/roi-calc",
      isExternalTool: true,
    },
  ];

  const leadMutation = useMutation({
    mutationFn: async (data: { firstName: string; email: string; resourceName: string }) => {
      const response = await apiRequest("POST", "/api/resource-leads", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success!",
        description: "Downloading your resource...",
      });
      
      const resource = resources.find(r => r.title === variables.resourceName);
      if (resource) {
        setTimeout(() => {
          if (resource.isLocalFile) {
            // For local files, trigger download
            const link = document.createElement('a');
            link.href = resource.url;
            // Extract filename from URL
            const filename = resource.url.split('/').pop() || 'download';
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // For external URLs, open in new tab
            window.open(resource.url, '_blank');
          }
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
        title="Free ServiceTitan Resources: Tools, Templates & Guides for Contractors"
        subtitle="Access a curated collection of free resources tailored for ServiceTitan users, including downloadable templates, automation guides, and practical tools. Whether you're aiming to enhance efficiency, streamline operations, or deepen your understanding of ServiceTitan, these resources are designed to support contractors at every level."
        backgroundImage={freeResourcesHero}
        dark={true}
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
                  
                  {resource.isExternalTool || resource.isExternalCourse ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      data-testid={`link-${resource.type === 'Course' ? 'course' : resource.type === 'Tool' ? 'tool' : 'resource'}-${index}`}
                    >
                      <Button className="w-full gap-2">
                        {resource.type === 'Course' ? 'View Course' : resource.type === 'Tool' ? 'View Calculator' : 'Get Free Resource'} <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      onClick={() => handleDownloadClick(resource.title)}
                      className="w-full gap-2"
                      data-testid={`button-download-${index}`}
                    >
                      <Download className="h-4 w-4" />
                      Get Free Resource
                    </Button>
                  )}
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
      </main>
      <Footer />
    </div>
  );
}
