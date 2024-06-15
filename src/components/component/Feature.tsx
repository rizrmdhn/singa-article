"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function FeatureSection() {
  return (
    <section
      className="relative flex w-full flex-col items-center bg-white p-5"
      id="feature"
    >
      <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-blue-tertiary mix-blend-multiply blur-3xl filter"></div>
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-tertiary mix-blend-multiply blur-3xl filter"></div>
      <div className="absolute left-0 top-96 h-28 w-28 rounded-full bg-blue-tertiary mix-blend-multiply blur-3xl filter"></div>
      <div className="absolute right-0 top-1/2 h-28 w-28 rounded-full bg-blue-tertiary mix-blend-multiply blur-3xl filter"></div>
      <h2 className="inline-block bg-gradient-to-b from-slate-500 to-black bg-clip-text text-3xl font-bold text-transparent">
        Welcome To Our
      </h2>
      <h2 className="inline-block bg-gradient-to-b from-blue-primary to-blue-tertiary bg-clip-text text-4xl font-bold text-transparent">
        Amazing Feature
      </h2>
      <div className="my-6 flex w-full flex-col items-center justify-center gap-5 md:gap-8">
        <Feature
          title="Realtime Communication"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex molestias dolores voluptatum provident, maxime blanditiis. Quas iure, nihil eius animi itaque officia perspiciatis, culpa modi corporis enim incidunt quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vel fugiat ullam voluptatem, deserunt sint? Quis quas amet laboriosam molestias cupiditate eaque accusantium! Quos officia quia nam iure animi temporibus!"
          image="/mockup1.png"
          reverse={true}
        />
        <Feature
          title="Realtime Communication"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex molestias dolores voluptatum provident, maxime blanditiis. Quas iure, nihil eius animi itaque officia perspiciatis, culpa modi corporis enim incidunt quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vel fugiat ullam voluptatem, deserunt sint? Quis quas amet laboriosam molestias cupiditate eaque accusantium! Quos officia quia nam iure animi temporibus!"
          image="/mockup1.png"
        />
        <Feature
          title="Realtime Communication"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex molestias dolores voluptatum provident, maxime blanditiis. Quas iure, nihil eius animi itaque officia perspiciatis, culpa modi corporis enim incidunt quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vel fugiat ullam voluptatem, deserunt sint? Quis quas amet laboriosam molestias cupiditate eaque accusantium! Quos officia quia nam iure animi temporibus!"
          image="/mockup1.png"
          reverse={true}
        />
      </div>
    </section>
  );
}

function Feature({ title, description, image, reverse }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={twMerge(
        "flex w-full flex-col items-center gap-3 md:w-2/4 md:flex-row md:gap-5",
        reverse && "md:flex-row-reverse",
      )}
    >
      <motion.div className="flex flex-col gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-start rounded-xl bg-gradient-to-b from-blue-primary via-blue-secondary to-blue-tertiary md:h-20 md:w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-white p-2 md:p-4"
            >
              <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Realtime Communication
          </h1>
        </div>
        <p className="text-justify text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
          molestias dolores voluptatum provident, maxime blanditiis. Quas iure,
          nihil eius animi itaque officia perspiciatis, culpa modi corporis enim
          incidunt quam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ipsum vel fugiat ullam voluptatem, deserunt sint? Quis quas amet
          laboriosam molestias cupiditate eaque accusantium! Quos officia quia
          nam iure animi temporibus!
        </p>
      </motion.div>
      <img
        key={1}
        src={"/mockup2.png"}
        className="h-96 w-48 md:h-[500px] md:w-[250px]"
        width={500}
        height={500}
        alt="Hero"
      />
    </motion.div>
  );
}
