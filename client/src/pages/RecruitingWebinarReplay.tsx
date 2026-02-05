import SEO from "@/components/SEO";

export default function RecruitingWebinarReplay() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="How to Find and Recruit A-Player Technicians Not On Job Boards | Replay"
        description="Watch the replay of our webinar on finding and recruiting top technicians outside of traditional job boards."
        keywords="HVAC technicians, recruiting, hiring, A-player technicians, contractor hiring"
        canonicalUrl="https://servicetitanhacks.com/webinar/recruiting-replay"
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          How to Find and Recruit A-Player Technicians Not On Job Boards
        </h1>
        
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/XlDbXdANfx4?si=wFv3PZxqEsNb0WTs"
            title="How to Find and Recruit A-Player Technicians Not On Job Boards"
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
