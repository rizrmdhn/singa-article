import Faq from "@/components/component/Faq";
import FeatureSection from "@/components/component/Feature";
import Footer from "@/components/component/Footer";
import HeroSection from "@/components/component/HeroSection";
import { FloatingNav } from "@/components/component/Navbar";
import { HoverImageLinks } from "@/components/component/Teams";
import VideoSection from "@/components/component/VideoSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br scroll-smooth">
      <FloatingNav />
      <HeroSection />
      <VideoSection />
      <FeatureSection />
      <HoverImageLinks />
      <Faq />
      <Footer />
    </main>
  );
}
