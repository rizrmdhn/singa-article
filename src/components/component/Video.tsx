import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <div className="h-96 w-full p-10 md:h-[600px] md:w-2/3 md:p-20">
      <div id="about"></div>
      <motion.div
        whileInView={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="h-full w-full"
      >
        <div className="h-full w-full overflow-hidden rounded-xl md:shadow-2xl md:shadow-blue-tertiary">
          <iframe
            src={"https://www.youtube.com/embed/XNhLLJ7GuhY"}
            title="YouTube video player"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
