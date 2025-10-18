import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  name: string;
  description: string;
  benefits: string[];
  tag?: string;
  link?: string;
}

export default function ToolCard({ name, description, benefits, tag, link }: ToolCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        {tag && <Badge className="w-fit mb-3">{tag}</Badge>}
        <h3 className="text-2xl font-semibold font-heading">{name}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 mb-6 flex-1">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
        {link ? (
          <a 
            href={link}
            target={link.startsWith('http') ? '_blank' : undefined}
            rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <Button variant="outline" className="w-full" data-testid={`button-tool-${name.toLowerCase().replace(/\s+/g, "-")}`}>
              See details
            </Button>
          </a>
        ) : (
          <Button variant="outline" className="w-full" data-testid={`button-tool-${name.toLowerCase().replace(/\s+/g, "-")}`}>
            See details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
