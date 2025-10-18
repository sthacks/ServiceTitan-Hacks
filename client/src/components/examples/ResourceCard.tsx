import ResourceCard from "../ResourceCard";

export default function ResourceCardExample() {
  return (
    <div className="max-w-sm">
      <ResourceCard
        title="ServiceTitan Setup Checklist"
        description="Step-by-step guide to optimize your ServiceTitan configuration."
        type="Checklist"
        gated={false}
      />
    </div>
  );
}
