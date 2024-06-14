import HeroSection from "@/components/component/HeroSection";
import VideoSection from "@/components/component/Video";
import FeatureSection from "../components/component/Feature";
import { HoverImageLinks } from "@/components/component/teams";
import Faq from "@/components/component/Faq";
import Footer from "@/components/component/Footer";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between scroll-smooth bg-white bg-gradient-to-br text-black">
      <HeroSection />
      <VideoSection />
      <FeatureSection />
      <HoverImageLinks />
      <Faq />
      <Footer />
    </main>
  );
}
