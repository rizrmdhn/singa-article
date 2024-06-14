"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function FeatureSection() {
  return (
    <section className="w-full bg-white flex relative p-5 flex-col items-center">
      <div className="absolute w-20 h-20 bottom-0 left-0 bg-blue-tertiary rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute w-28 h-28 top-0 right-0 bg-blue-tertiary rounded-full mix-blend-multiply filter blur-3xl"></div>
      <h2 className="font-bold text-3xl from-slate-500 bg-gradient-to-b to-black inline-block text-transparent bg-clip-text">
        Welcome To Our
      </h2>
      <h2 className="font-bold text-4xl from-blue-primary bg-gradient-to-b  to-blue-tertiary inline-block text-transparent bg-clip-text">
        Amazing Feature
      </h2>
      <div className="my-6 w-full gap-5 md:gap-8 flex flex-col justify-center items-center">
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
      className={twMerge(
        "flex md:w-2/4 w-full gap-3 md:gap-5 flex-col md:flex-row items-center",
        reverse && "md:flex-row-reverse"
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        transition={{ duration: 0.9 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-3 md:gap-5"
      >
        <div className="flex gap-2 items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex justify-start items-center   bg-gradient-to-b from-blue-primary via-blue-secondary to-blue-tertiary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="p-2 md:p-4 fill-white"
            >
              <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Realtime Communication
          </h1>
        </div>
        <p className="text-sm text-justify md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
          molestias dolores voluptatum provident, maxime blanditiis. Quas iure,
          nihil eius animi itaque officia perspiciatis, culpa modi corporis enim
          incidunt quam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ipsum vel fugiat ullam voluptatem, deserunt sint? Quis quas amet
          laboriosam molestias cupiditate eaque accusantium! Quos officia quia
          nam iure animi temporibus!
        </p>
      </motion.div>
      <Image
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
