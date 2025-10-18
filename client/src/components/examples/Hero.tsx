import Hero from "../Hero";

export default function HeroExample() {
  return (
    <Hero
      title="AI and automations for ServiceTitan contractors"
      subtitle="Grow smarter, automate faster, win more jobs."
      primaryCta={{
        label: "Join the Facebook Group",
        href: "https://www.facebook.com/groups/servicetitanhacks",
        external: true,
      }}
      secondaryCta={{
        label: "All-Access Pass",
        href: "/all-access",
      }}
    />
  );
}
