import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CategoryCarousel from "@/components/CategoryCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <CategoryCarousel />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
