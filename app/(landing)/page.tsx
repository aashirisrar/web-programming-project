import Navbar from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { ProductShowcase } from "./sections/ProductShowcase";
import { Pricing } from "./sections/Pricing";
import Productivity from "./sections/Productivity";
import { Testimonials } from "./sections/Testimonials";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <Pricing />
        <Productivity />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
