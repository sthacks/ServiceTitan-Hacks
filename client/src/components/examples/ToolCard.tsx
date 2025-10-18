import ToolCard from "../ToolCard";

export default function ToolCardExample() {
  return (
    <div className="max-w-sm">
      <ToolCard
        name="Pricebook Optimizer"
        description="Transform technical jargon into homeowner-friendly descriptions."
        benefits={[
          "AI rewrites in plain English",
          "Batch process entire pricebook",
          "Export directly to ServiceTitan",
        ]}
        tag="Popular"
      />
    </div>
  );
}
