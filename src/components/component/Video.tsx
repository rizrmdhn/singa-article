import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <motion.div
      id="about"
      whileInView={{ scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      className="h-96 w-full p-10 md:h-[600px] md:w-2/3 md:p-20"
    >
      <div className="md:shadow-blue-tertiary h-full w-full overflow-hidden rounded-xl md:shadow-2xl">
        <iframe
          src={"https://www.youtube.com/embed/Uer540qlGZc"}
          title="YouTube video player"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );
}
