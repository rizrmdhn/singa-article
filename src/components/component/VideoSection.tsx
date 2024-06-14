"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <motion.div
      id="about"
      whileInView={{ scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-2/3 h-96 md:h-[600px] p-10 md:p-20"
    >
      <div className="w-full h-full rounded-xl overflow-hidden md:shadow-2xl md:shadow-blue-tertiary">
        <iframe
          src={"https://www.youtube.com/embed/Uer540qlGZc"}
          title="YouTube video player"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </motion.div>
  );
}
