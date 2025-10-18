import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export default function PillarCard({ title, description, icon, link }: PillarCardProps) {
  const content = (
    <Card className="h-full hover-elevate transition-shadow cursor-pointer">
      <CardHeader>
        <div className="mb-4">
          <img src={icon} alt={title} className="w-20 h-20 object-contain" loading="lazy" />
        </div>
        <h3 className="text-2xl font-semibold font-heading">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {link && (
          <div className="flex items-center text-primary font-medium group">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (link) {
    return (
      <a href={link} data-testid={`card-pillar-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        {content}
      </a>
    );
  }

  return content;
}
