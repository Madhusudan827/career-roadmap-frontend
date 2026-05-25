import { Navbar } from "@/components/navbar";
import {
  HeroSection,
  CareerRolesSection,
  FeaturesSection,
  CTASection,
  Footer,
} from "@/components/home-sections";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CareerRolesSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
