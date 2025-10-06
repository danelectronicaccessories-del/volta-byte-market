import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Newsletter signup */}
        <div className="bg-primary/10 rounded-lg p-4 md:p-6 mb-6 md:mb-8 backdrop-blur-sm border border-white/20">
          <div className="flex flex-col items-start md:items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Stay Updated</h3>
              <p className="text-sm md:text-base text-white/80">Get the latest deals and tech news delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 w-full sm:min-w-[250px]"
              />
              <Button className="bg-sale hover:bg-sale/90 text-sale-foreground w-full sm:w-auto whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3 md:mb-4">
              TechStore
            </h3>
            <p className="text-sm md:text-base text-white/80 mb-3 md:mb-4">
              Your trusted destination for the latest electronics and tech gadgets at unbeatable prices.
            </p>
            <div className="flex gap-2 md:gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Button key={index} size="icon" variant="ghost" className="hover:bg-white/10 h-8 w-8 md:h-10 md:w-10">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {["About Us", "Contact", "FAQ", "Shipping Info", "Returns", "Track Order"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm md:text-base text-white/80 hover:text-white transition-smooth block py-0.5">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Categories</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {["Smartphones", "Laptops", "Gaming", "Audio", "Smart Home", "Accessories"].map((category) => (
                <li key={category}>
                  <a href="#" className="text-sm md:text-base text-white/80 hover:text-white transition-smooth block py-0.5">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Contact Us</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm md:text-base text-white/80">1-800-TECH-STORE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm md:text-base text-white/80 break-all">support@techstore.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-white/80">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-white/60 text-xs md:text-sm text-center md:text-left">
            © 2024 TechStore. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-smooth whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth whitespace-nowrap">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth whitespace-nowrap">Cookies</a>
            <a href="/admin/auth" className="text-white/60 hover:text-white transition-smooth whitespace-nowrap">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;