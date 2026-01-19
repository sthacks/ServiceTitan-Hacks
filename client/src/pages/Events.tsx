import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Video, Users } from "lucide-react";
import webinarHeroImage from "@assets/switchy_images_(9)_1767654151254.png";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  type: "webinar" | "workshop" | "conference";
  image: string;
  link: string;
  status: "upcoming" | "live" | "past";
  hosts: string[];
}

const events: Event[] = [
  {
    id: "1",
    title: "How to Find and Recruit A-Player Technicians Not On Job Boards",
    description: "Live training showing actionable methods any service business can implement this week. Learn the TradeRunner method for finding technicians who aren't on Indeed.",
    date: "Thursday, January 15, 2026",
    time: "2:00 PM",
    timezone: "EST",
    type: "webinar",
    image: webinarHeroImage,
    link: "/webinar/invisible-labor-market",
    status: "upcoming",
    hosts: ["Bill Brown", "Andre Nordon"]
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
    past: "Recording Available"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function Events() {
  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "live");
  const pastEvents = events.filter(e => e.status === "past");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Events & Webinars | ServiceTitan Hacks"
        description="Join live webinars and training events for home service contractors. Learn AI, automation, hiring, and ServiceTitan optimization strategies."
        keywords="HVAC webinars, contractor training, ServiceTitan events, home service workshops"
        canonicalUrl="https://servicetitanhacks.com/events"
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

        {upcomingEvents.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Upcoming Events
              </h2>
              <div className="grid gap-8">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden" data-testid={`card-event-${event.id}`}>
                    <div className="md:flex">
                      <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
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
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time} {event.timezone}</span>
                            </div>
                          </div>
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
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: 'Oxygen, sans-serif' }}>
                Past Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="hover-elevate overflow-hidden" data-testid={`card-past-event-${event.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <EventStatusBadge status={event.status} />
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <Link href={event.link}>
                        <Button variant="outline" size="sm" className="gap-2">
                          Watch Recording
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
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
    </div>
  );
}
