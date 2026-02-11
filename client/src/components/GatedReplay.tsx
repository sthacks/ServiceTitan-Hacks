import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import SEO from "@/components/SEO";

interface GatedReplayProps {
  title: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
  youtubeEmbedUrl: string;
  webinarSlug: string;
}

export default function GatedReplay({
  title,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  youtubeEmbedUrl,
  webinarSlug,
}: GatedReplayProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const replayMutation = useMutation({
    mutationFn: async (data: { firstName: string; email: string; webinarSlug: string }) => {
      return apiRequest("POST", "/api/replay-access", data);
    },
    onSuccess: () => {
      setUnlocked(true);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your first name and email.",
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

    replayMutation.mutate({ firstName: firstName.trim(), email: email.trim(), webinarSlug });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          {title}
        </h1>

        {unlocked ? (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={youtubeEmbedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg"
              data-testid="video-replay"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-700">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <p className="text-center text-zinc-300 mb-6">
                  Enter your details below to watch the replay.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="gate-firstName" className="text-zinc-300">First Name</Label>
                    <Input
                      id="gate-firstName"
                      data-testid="input-gate-firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gate-email" className="text-zinc-300">Email</Label>
                    <Input
                      id="gate-email"
                      type="email"
                      data-testid="input-gate-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="button-submit-gate"
                    disabled={replayMutation.isPending}
                    className="w-full bg-red-600 text-white border-red-700"
                  >
                    {replayMutation.isPending ? "Loading..." : "Watch the Replay"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
