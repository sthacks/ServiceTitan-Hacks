import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PodcastCard from "@/components/PodcastCard";
import podcastThumb from "@assets/generated_images/Podcast_episode_thumbnail_f52b3465.png";

export default function Podcast() {
  const episodes = [
    {
      title: "Scaling HVAC Operations with AI",
      guest: "Sarah Mitchell, CEO of CoolTech HVAC",
      date: "Jan 15, 2025",
      duration: "42 min",
      takeaways: [
        "How AI reduced dispatch time by 40%",
        "Automated follow-ups that convert",
        "ROI metrics you should track",
      ],
      thumbnail: podcastThumb,
    },
    {
      title: "From $2M to $10M: Scaling with ServiceTitan",
      guest: "Tom Ramirez, Ramirez Plumbing",
      date: "Jan 8, 2025",
      duration: "38 min",
      takeaways: [
        "Organizational structure for growth",
        "Hiring and training at scale",
        "Using data to drive decisions",
      ],
      thumbnail: podcastThumb,
    },
    {
      title: "Building a Marketing Machine",
      guest: "Lisa Chen, Marketing Director at HomeHero HVAC",
      date: "Jan 1, 2025",
      duration: "45 min",
      takeaways: [
        "Google Ads strategies that work",
        "Tracking attribution in ServiceTitan",
        "Content marketing for contractors",
      ],
      thumbnail: podcastThumb,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                ServiceTitan Hacks Podcast
              </h1>
              <p className="text-xl text-muted-foreground">
                Real conversations with contractors who've mastered ServiceTitan, AI, and operational excellence. No fluff, just actionable insights.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold font-heading mb-6">Latest Episode</h2>
              <div className="bg-muted rounded-lg p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <div className="aspect-video bg-card rounded-lg flex items-center justify-center border border-border">
                      <p className="text-muted-foreground">[Audio player embed]</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold font-heading mb-4">
                      {episodes[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Guest: {episodes[0].guest}
                    </p>
                    <div className="space-y-2">
                      {episodes[0].takeaways.map((takeaway, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading mb-6">All Episodes</h2>
              <div className="space-y-6">
                {episodes.map((episode) => (
                  <PodcastCard key={episode.title} {...episode} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
