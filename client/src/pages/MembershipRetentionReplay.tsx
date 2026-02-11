import SEO from "@/components/SEO";

export default function MembershipRetentionReplay() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Stop Rebuying Your Own Customers | Replay"
        description="Watch the replay of our webinar on membership retention strategies that keep members renewing, booking, and referring."
        keywords="membership retention, HVAC membership, ServiceTitan, customer retention, SmartAC"
        canonicalUrl="https://servicetitanhacks.com/webinar/membership-retention-replay"
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          Stop Rebuying Your Own Customers
        </h1>
        
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/pqDJ-t6lOgw"
            title="Stop Rebuying Your Own Customers"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg"
            data-testid="video-replay"
          />
        </div>
      </div>
    </div>
  );
}
