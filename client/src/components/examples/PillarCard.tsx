import PillarCard from "../PillarCard";
import aiIcon from "@assets/generated_images/AI_Integrations_pillar_icon_e73a9edc.png";

export default function PillarCardExample() {
  return (
    <div className="max-w-sm">
      <PillarCard
        title="AI Integrations"
        description="Connect powerful AI tools directly to ServiceTitan for instant ROI."
        icon={aiIcon}
        link="/tools"
      />
    </div>
  );
}
