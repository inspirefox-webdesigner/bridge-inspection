import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSection from "@/components/ProblemSection";
import EcosystemSection from "@/components/EcosystemSection";
import Howitworking from "@/components/HowItWorksSection";
import AIDetectionSection from "@/components/AIDetectionSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <FeaturesSection />
      <ProblemSection />
      <Howitworking />
      <AIDetectionSection />
      <StatsSection />
      <EcosystemSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
