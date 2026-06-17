import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, ArrowRight, Video, Users, Play } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import smartACWebinarImage from "@assets/smartac_(9)_1769011910928.png";
import contractorCommerceImage from "@assets/contractor commerce (7).png";
import winkWebinarImage from "@assets/wink_(2)_1769014863023.png";
import webinarHeroImage from "@assets/switchy_images_(9)_1767654151254.png";
import incentivePlanImage from "@assets/ChatGPT_Image_Apr_16,_2026,_04_43_06_PM_1776372204837.png";
import stopBuyingHoursImage from "@assets/062C4475-E186-4088-AAAD-6CEEE00F3BCD_1781732770222.png";
import equipmentPricingImage from "@assets/webinar_image_1769885730082.png";
import referProHeroImage from "@assets/ReferPro_(2)_1772815536588.png";
import revinWebinarImage from "@assets/revin_1778696323692.png";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  eventDateTime: Date;
  time: string;
  timezone: string;
  type: "webinar" | "workshop" | "conference";
  image: string;
  link: string;
  replayLink?: string;
  youtubeId?: string;
  status: "upcoming" | "live" | "past";
  hosts: string[];
}

const events: Event[] = [
  {
    id: "10",
    title: "When a Live Answering Team Beats Voicemail",
    description: "The math behind in-house call handling versus a live answering team, for $3M+ ServiceTitan contractors. Get a three-path framework for choosing between in-house, overflow coverage, or a full live answering team — and a way to run the numbers for your own shop.",
    date: "Wednesday, June 24, 2026",
    eventDateTime: new Date("2026-06-24T18:00:00Z"),
    time: "2:00 PM",
    timezone: "EDT",
    type: "webinar",
    image: webinarHeroImage,
    link: "/webinars/live-answering-team",
    status: "upcoming",
    hosts: ["Bill Brown", "Jill's Office"]
  },
  {
    id: "9",
    title: "Stop Buying Hours: How Contractors Are Switching to Performance Pay",
    description: "A practical conversation about switching your techs from hourly pay to performance-based pay. Bill Brown, Ryan Shank (ShareWillow), and a contractor who recently made the switch share what works, what doesn't, and how to roll it out without losing your team.",
    date: "Tuesday, July 15, 2026",
    eventDateTime: new Date("2026-07-15T17:00:00Z"),
    time: "1:00 PM",
    timezone: "EDT",
    type: "webinar",
    image: stopBuyingHoursImage,
    link: "/webinars/stop-buying-hours",
    status: "upcoming",
    hosts: ["Bill Brown", "Ryan Shank"]
  },
  {
    id: "8",
    title: "How Contractors Are Handling More Calls Without Hiring More CSRs",
    description: "A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses. Featuring Bill Brown, Quinn Litherland (Revin.ai), and Britiny Leung (Director of Operations, Action Furnace Inc.).",
    date: "Tuesday, May 19, 2026",
    eventDateTime: new Date("2026-05-19T14:00:00-04:00"),
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: revinWebinarImage,
    link: "/webinar/ai-csr",
    youtubeId: "EYRXAtqXVjI",
    status: "past",
    hosts: ["Bill Brown", "Quinn Litherland", "Britiny Leung"]
  },
  {
    id: "1",
    title: "How to Find and Recruit A-Player Technicians Not On Job Boards",
    description: "Live training showing actionable methods any service business can implement this week. Learn the TradeRunner method for finding technicians who aren't on Indeed.",
    date: "Thursday, January 15, 2026",
    eventDateTime: new Date("2026-01-15T14:00:00-05:00"),
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: webinarHeroImage,
    link: "/webinar/invisible-labor-market",
    replayLink: "/webinar/recruiting-replay",
    youtubeId: "XlDbXdANfx4",
    status: "past",
    hosts: ["Bill Brown", "Andre Nordon"]
  },
  {
    id: "5",
    title: "How Contractors Buy Equipment Like Private Equity",
    description: "Learn how private equity gets better equipment pricing, why traditional distributor relationships limit your leverage, and how group purchasing changes the economics for HVAC owners.",
    date: "Wednesday, February 4, 2026",
    eventDateTime: new Date("2026-02-04T14:00:00-05:00"),
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: equipmentPricingImage,
    link: "/webinar/equipment-pricing",
    replayLink: "/webinar/equipment-pricing-replay",
    youtubeId: "RlffDnKEO8s",
    status: "past",
    hosts: ["Bill Brown", "Norris Ayvazian"]
  },
  {
    id: "4",
    title: "Stop Rebuying Your Own Customers",
    description: "Discover the specialist retention layer that keeps members renewing, booking, and referring - without rebuilding your ServiceTitan setup.",
    date: "Wednesday, February 11, 2026",
    eventDateTime: new Date("2026-02-11T14:00:00-05:00"),
    time: "2:00 PM",
    timezone: "ET",
    type: "webinar",
    image: smartACWebinarImage,
    link: "/webinar/membership-retention",
    replayLink: "/webinar/membership-retention-replay",
    youtubeId: "pqDJ-t6lOgw",
    status: "past",
    hosts: ["Bill Brown", "SmartAC"]
  },
  {
    id: "3",
    title: "Should Contractors Put Pricing Online in 2026?",
    description: "Customers are asking AI what HVAC systems cost before they ever call you. In this fireside chat, we debate whether contractors should put pricing online in 2026 and how to stay in control without commoditizing the business.",
    date: "Tuesday, February 24, 2026",
    eventDateTime: new Date("2026-02-24T14:00:00-05:00"),
    time: "2:00 PM",
    timezone: "ET",
    type: "webinar",
    image: contractorCommerceImage,
    link: "/webinar/price-conversation",
    youtubeId: "42z4bkyhxDw",
    status: "past",
    hosts: ["Bill Brown", "Contractor Commerce"]
  },
  {
    id: "6",
    title: "The 83% Referral Gap: Why Most Contractors Leave Referral Revenue on the Table",
    description: "83% of customers say they're willing to refer their contractor. Yet most receive very few actual referrals. Learn why referrals don't happen automatically—and how to build a system that consistently turns satisfied customers into new business.",
    date: "Tuesday, March 31, 2026",
    eventDateTime: new Date("2026-03-31T14:00:00-04:00"),
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: referProHeroImage,
    link: "/webinar/referral-gap",
    status: "past",
    hosts: ["Bill Brown", "Murphy Nadauld"]
  },
  {
    id: "7",
    title: "The Incentive Plan Problem: Why Most Contractor Bonus Plans Fail",
    description: "A practical conversation about technician incentives, performance pay, and what actually works inside a real contractor business. Featuring Bill Brown, Ryan Shank (ShareWillow), and Ron Williams, owner of One Hour Heating & Air Conditioning and Benjamin Franklin Plumbing.",
    date: "Tuesday, April 21, 2026",
    eventDateTime: new Date("2026-04-21T14:00:00-04:00"),
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: incentivePlanImage,
    link: "/webinar/incentive-plan-problem",
    youtubeId: "78IuakQeaDA",
    status: "past",
    hosts: ["Bill Brown", "Ron Williams", "Ryan Shank"]
  }
];

function EventTypeIcon({ type }: { type: Event["type"] }) {
  switch (type) {
    case "webinar":
      return <Video className="h-4 w-4" />;
    case "workshop":
      return <Users className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
}

function EventStatusBadge({ status }: { status: Event["status"] }) {
  const styles = {
    upcoming: "bg-primary/10 text-primary",
    live: "bg-green-500/10 text-green-600",
    past: "bg-muted text-muted-foreground"
  };

  const labels = {
    upcoming: "Upcoming",
    live: "Live Now",
    past: "Replay Available"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return null;
  }

  return (
    <div className="flex gap-3 my-4" data-testid="countdown-timer">
      <div className="text-center">
        <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold text-primary">{timeLeft.days}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">Days</span>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">Hours</span>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">Min</span>
      </div>
      <div className="text-center">
        <div className="bg-primary/10 rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">Sec</span>
      </div>
    </div>
  );
}

export default function Events() {
  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "live");
  const pastEvents = events.filter(e => e.status === "past").sort((a, b) => b.eventDateTime.getTime() - a.eventDateTime.getTime());
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [replayModalOpen, setReplayModalOpen] = useState(false);
  const [selectedReplay, setSelectedReplay] = useState<{ slug: string; title: string } | null>(null);
  const [replayForm, setReplayForm] = useState({ firstName: "", email: "" });

  const replayMutation = useMutation({
    mutationFn: async (data: { firstName: string; email: string; webinarSlug: string }) => {
      return apiRequest("POST", "/api/replay-access", data);
    },
    onSuccess: () => {
      setReplayModalOpen(false);
      setReplayForm({ firstName: "", email: "" });
      if (selectedReplay) {
        navigate(selectedReplay.slug);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleReplayClick = (replayLink: string, title: string) => {
    setSelectedReplay({ slug: replayLink, title });
    setReplayModalOpen(true);
  };

  const handleReplaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replayForm.firstName || !replayForm.email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replayForm.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    if (selectedReplay) {
      replayMutation.mutate({
        firstName: replayForm.firstName,
        email: replayForm.email,
        webinarSlug: selectedReplay.slug,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Events & Webinars | ServiceTitan Hacks"
        description="Join live webinars and training events for home service contractors. Learn AI, automation, hiring, and ServiceTitan optimization strategies."
        keywords="HVAC webinars, contractor training, ServiceTitan events, home service workshops"
        canonicalUrl="https://servicetitanhacks.com/events"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "ServiceTitan Hacks Events & Webinars",
          "description": "Live webinars and training events for home service contractors covering AI, automation, hiring, and ServiceTitan optimization strategies.",
          "url": "https://servicetitanhacks.com/events",
          "itemListElement": events.map((ev, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": ev.title,
              "description": ev.description,
              "startDate": ev.eventDateTime.toISOString(),
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": `https://servicetitanhacks.com${ev.link}`
              },
              "url": `https://servicetitanhacks.com${ev.link}`,
              "organizer": {
                "@type": "Organization",
                "name": "ServiceTitan Hacks",
                "url": "https://servicetitanhacks.com"
              },
              "performer": ev.hosts.map(host => ({ "@type": "Person", "name": host }))
            }
          }))
        }}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20 bg-[#1F1F1F] text-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Events & Webinars
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Live training sessions to help you grow your home service business with AI, automation, and proven strategies.
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-background border-b">
          <div className="container mx-auto px-6">
            <div className="flex gap-4 py-3">
              {upcomingEvents.length > 0 && (
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={() => document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" })}
                  data-testid="tab-upcoming-events"
                >
                  <Calendar className="h-4 w-4" />
                  Upcoming Events
                </Button>
              )}
              {pastEvents.length > 0 && (
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={() => document.getElementById("past-events")?.scrollIntoView({ behavior: "smooth" })}
                  data-testid="tab-past-events"
                >
                  <Play className="h-4 w-4" />
                  Past Events
                </Button>
              )}
            </div>
          </div>
        </div>

        {upcomingEvents.length > 0 && (
          <section id="upcoming-events" className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Upcoming Events
              </h2>
              <div className="grid gap-8">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden" data-testid={`card-event-${event.id}`}>
                    <div className="md:flex">
                      <Link href={event.link} className="md:w-2/5 overflow-hidden block cursor-pointer">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-auto hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>
                      <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                              <EventTypeIcon type={event.type} />
                              {event.type}
                            </span>
                            <EventStatusBadge status={event.status} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time} {event.timezone}</span>
                            </div>
                          </div>
                          <CountdownTimer targetDate={event.eventDateTime} />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Hosted by:</span> {event.hosts.join(" & ")}
                          </p>
                        </div>
                        <div className="mt-6">
                          <Link href={event.link}>
                            <Button size="lg" className="gap-2" data-testid={`button-register-${event.id}`}>
                              Register Now
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section id="past-events" className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Past Events
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden" data-testid={`card-past-event-${event.id}`}>
                    {event.youtubeId ? (
                      <div className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${event.youtubeId}`}
                          title={event.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          data-testid={`iframe-youtube-${event.id}`}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                          <EventTypeIcon type={event.type} />
                          {event.type}
                        </span>
                        <EventStatusBadge status={event.status} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.hosts.join(" & ")}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {events.length === 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6 text-center">
              <Video className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
              <h2 className="text-2xl font-bold mb-4">No Events Scheduled</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Check back soon for upcoming webinars and training sessions.
              </p>
              <Link href="/resources">
                <Button variant="outline">
                  Browse Free Resources
                </Button>
              </Link>
            </div>
          </section>
        )}

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Want to Be Notified About Future Events?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community to get updates on upcoming webinars, workshops, and exclusive training sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.facebook.com/groups/servicetitanhacks" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-join-facebook">
                  Join Facebook Group
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={replayModalOpen} onOpenChange={setReplayModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Access to the Replay</DialogTitle>
            <DialogDescription>
              Enter your details below to watch the replay.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReplaySubmit} className="space-y-4">
            <div>
              <Label htmlFor="replay-firstName">First Name</Label>
              <Input
                id="replay-firstName"
                data-testid="input-replay-firstName"
                value={replayForm.firstName}
                onChange={(e) => setReplayForm({ ...replayForm, firstName: e.target.value })}
                placeholder="Your first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="replay-email">Email</Label>
              <Input
                id="replay-email"
                type="email"
                data-testid="input-replay-email"
                value={replayForm.email}
                onChange={(e) => setReplayForm({ ...replayForm, email: e.target.value })}
                placeholder="you@company.com"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              data-testid="button-submit-replay-access"
              disabled={replayMutation.isPending}
            >
              {replayMutation.isPending ? "Loading..." : "Watch the Replay"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
