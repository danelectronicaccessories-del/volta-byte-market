import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="Electronics Collection" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-accent animate-float" />
            <span className="text-accent font-medium">Limited Time Offer</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Latest Tech
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Unbeatable Prices
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Discover cutting-edge electronics with up to 70% off. 
            From smartphones to smart homes - your tech upgrade starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-sale hover:shadow-glow transition-all duration-300 text-sale-foreground font-semibold"
            >
              Shop Flash Sale
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              View All Categories
            </Button>
          </div>
          
          <div className="flex items-center gap-6 mt-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2M+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm">Products</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;