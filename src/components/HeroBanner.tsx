import { Sparkles } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-sale" />
            <span className="text-sale font-bold text-sm uppercase tracking-wide">Early Black Friday</span>
            <Sparkles className="h-5 w-5 text-sale" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            EXPLORE YOUR INTERESTS
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;