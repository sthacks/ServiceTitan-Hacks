import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  gated?: boolean;
}

export default function ResourceCard({ title, description, type, gated }: ResourceCardProps) {
  const handleDownload = () => {
    console.log("Download:", title);
    if (gated) {
      console.log("Show email gate modal");
    }
  };

  return (
    <Card className="hover-elevate transition-shadow">
      <CardHeader>
        <Badge className="w-fit mb-2">{type}</Badge>
        <h3 className="text-xl font-semibold font-heading">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" className="w-full" onClick={handleDownload} data-testid={`button-resource-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Download className="h-4 w-4 mr-2" />
          Download {gated && "(Email required)"}
        </Button>
      </CardContent>
    </Card>
  );
}
