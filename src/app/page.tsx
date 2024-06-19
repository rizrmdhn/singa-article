"use client";

import FeatureSection from "@/components/component/Feature";
import HeroSection from "@/components/component/HeroSection";
import Navbar from "@/components/component/Navbar";
import VideoSection from "@/components/component/Video";
import { HoverImageLinks } from "@/components/component/teams";
import BlogSection from "@/components/component/Blog";
import Faq from "@/components/component/Faq";
import Footer from "@/components/component/Footer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-white bg-gradient-to-br text-black">
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
