import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SponsorCardProps {
  name: string;
  description: string;
  logo?: string;
}

export default function SponsorCard({ name, description, logo }: SponsorCardProps) {
  return (
    <Card className="hover-elevate transition-shadow">
      <CardHeader>
        <div className="h-24 flex items-center justify-center mb-4">
          {logo ? (
            <img src={logo} alt={name} className="max-h-20 max-w-full object-contain grayscale hover:grayscale-0 transition-all" loading="lazy" />
          ) : (
            <div className="text-4xl font-bold text-muted-foreground">{name}</div>
          )}
        </div>
        <h3 className="text-xl font-semibold font-heading text-center">{name}</h3>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm" data-testid={`button-sponsor-${name.toLowerCase().replace(/\s+/g, "-")}`}>
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
}
