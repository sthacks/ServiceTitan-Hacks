import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  dark?: boolean;
}

export default function Hero({ title, subtitle, primaryCta, secondaryCta, dark = true }: HeroProps) {
  return (
    <section className={`relative ${dark ? "bg-[#1F1F1F] text-white" : "bg-background text-foreground"} py-24 md:py-32`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg md:text-xl mb-10 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {primaryCta && (
                primaryCta.external ? (
                  <a href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" data-testid="button-hero-primary">
                      {primaryCta.label}
                    </Button>
                  </a>
                ) : (
                  <a href={primaryCta.href}>
                    <Button size="lg" data-testid="button-hero-primary">
                      {primaryCta.label}
                    </Button>
                  </a>
                )
              )}
              {secondaryCta && (
                <a href={secondaryCta.href}>
                  <Button size="lg" variant="outline" className={dark ? "text-white border-white hover:bg-white/10" : ""} data-testid="button-hero-secondary">
                    {secondaryCta.label}
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
