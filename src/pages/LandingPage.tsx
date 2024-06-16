import HeroSection from "@/components/component/HeroSection";
import VideoSection from "@/components/component/Video";
import FeatureSection from "../components/component/Feature";
import { HoverImageLinks } from "@/components/component/teams";
import Faq from "@/components/component/Faq";
import Footer from "@/components/component/Footer";
import Navbar from "@/components/component/Navbar";
import BlogSection from "@/components/component/Blog";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden scroll-smooth bg-white bg-gradient-to-br text-black">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <FeatureSection />
      <HoverImageLinks />
      <BlogSection />
      <Faq />
      <Footer />
    </main>
  );
}
