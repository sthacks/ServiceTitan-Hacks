import SEO from "@/components/SEO";

export default function EquipmentPricingReplay() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="How Contractors Buy Equipment Like Private Equity | Replay"
        description="Watch the replay of our webinar on how contractors can buy equipment like private equity firms."
        keywords="HVAC equipment, contractor equipment, private equity, equipment pricing"
        canonicalUrl="https://servicetitanhacks.com/webinar/equipment-pricing-replay"
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          How Contractors Buy Equipment Like Private Equity
        </h1>
        
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/204lbDm68Fo?si=wtIixNf78GDyQpAI"
            title="How Contractors Buy Equipment Like Private Equity"
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
