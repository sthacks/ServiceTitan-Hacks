import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface PodcastCardProps {
  title: string;
  guest: string;
  date: string;
  duration: string;
  takeaways: string[];
  thumbnail: string;
}

export default function PodcastCard({ title, guest, date, duration, takeaways, thumbnail }: PodcastCardProps) {
  return (
    <Card className="hover-elevate transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-48 flex-shrink-0">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{date}</Badge>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
            <h3 className="text-xl font-semibold font-heading mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">Guest: {guest}</p>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Key takeaways:</p>
              <ul className="space-y-1">
                {takeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="sm" data-testid={`button-podcast-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              <Play className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
