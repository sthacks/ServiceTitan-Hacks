import PodcastCard from "../PodcastCard";
import thumbnail from "@assets/generated_images/Podcast_episode_thumbnail_f52b3465.png";

export default function PodcastCardExample() {
  return (
    <div className="max-w-3xl">
      <PodcastCard
        title="Scaling HVAC Operations with AI"
        guest="Sarah Mitchell, CEO of CoolTech HVAC"
        date="Jan 15, 2025"
        duration="42 min"
        takeaways={[
          "How AI reduced dispatch time by 40%",
          "Automated follow-ups that convert",
          "ROI metrics you should track",
        ]}
        thumbnail={thumbnail}
      />
    </div>
  );
}
