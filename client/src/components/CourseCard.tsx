import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface CourseCardProps {
  title: string;
  level: string;
  duration: string;
  outcomes: string[];
  included: string[];
}

export default function CourseCard({ title, level, duration, outcomes, included }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col hover-elevate transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{level}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <h3 className="text-2xl font-semibold font-heading">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-4">
          <h4 className="font-semibold mb-2">You'll learn:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Includes:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full mt-auto" data-testid={`button-course-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          Get Access
        </Button>
      </CardContent>
    </Card>
  );
}
