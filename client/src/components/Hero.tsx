import { Button } from "@/components/ui/button";
import titleBg from "@assets/title-background.png";

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
  backgroundImage?: string;
}

export default function Hero({ title, subtitle, primaryCta, secondaryCta, dark = true, backgroundImage }: HeroProps) {
  const bgImage = backgroundImage || (dark ? titleBg : undefined);
  
  return (
    <section className={`relative ${dark ? "text-white" : "bg-background text-foreground"} py-24 md:py-32 overflow-hidden`}>
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
      )}
      <div className={`mx-auto max-w-7xl px-6 ${bgImage ? 'relative z-10' : ''}`}>
        <div className={`max-w-4xl ${bgImage && !backgroundImage ? 'mx-auto text-center' : backgroundImage ? 'text-left' : 'mx-auto text-center'}`}>
          <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xl mb-10 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row items-center ${backgroundImage ? 'justify-start' : 'justify-center'} gap-4`}>
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
                  <Button size="lg" variant="outline" className={dark ? "text-white border-2 border-primary hover:bg-white/10" : "border-2 border-primary"} data-testid="button-hero-secondary">
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
