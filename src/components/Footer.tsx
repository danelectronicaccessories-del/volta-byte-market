import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter signup */}
        <div className="bg-primary/10 rounded-lg p-6 mb-8 backdrop-blur-sm border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white/80">Get the latest deals and tech news delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-w-[250px]"
              />
              <Button className="bg-sale hover:bg-sale/90 text-sale-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              TechStore
            </h3>
            <p className="text-white/80 mb-4">
              Your trusted destination for the latest electronics and tech gadgets at unbeatable prices.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Button key={index} size="icon" variant="ghost" className="hover:bg-white/10">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Contact", "FAQ", "Shipping Info", "Returns", "Track Order"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-smooth">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Smartphones", "Laptops", "Gaming", "Audio", "Smart Home", "Accessories"].map((category) => (
                <li key={category}>
                  <a href="#" className="text-white/80 hover:text-white transition-smooth">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-white/80">1-800-TECH-STORE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-white/80">support@techstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-white/80">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2024 TechStore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;