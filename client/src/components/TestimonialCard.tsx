import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  photo: string;
}

export default function TestimonialCard({ quote, name, company, photo }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground italic mb-6">"{quote}"</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold" data-testid={`text-testimonial-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>{name}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
