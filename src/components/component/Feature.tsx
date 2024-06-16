"use client";
import { FeatureItem, IFeatureItem } from "@/constant/Feature";
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
        {FeatureItem.map((item, index) => (
          <Feature key={index} item={item} reverse={index % 2 == 0} />
        ))}
      </div>
    </section>
  );
}

function Feature({ reverse, item }: { reverse: boolean; item: IFeatureItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={twMerge(
        "flex w-full flex-col items-center gap-3 md:w-2/4 md:flex-row md:gap-12",
        reverse && "md:flex-row-reverse",
      )}
      id={item.id}
    >
      <motion.div className="flex flex-col gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-start rounded-xl bg-gradient-to-b from-blue-primary via-blue-secondary to-blue-tertiary p-3 md:h-20 md:w-20">
            <div>{item.icon}</div>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">{item.title}</h1>
        </div>
        <p className="text-justify text-sm md:text-lg">{item.description}</p>
      </motion.div>
      <img
        key={1}
        src={item.image}
        className="h-96 w-48 md:h-[500px] md:w-[250px]"
        width={500}
        height={500}
        alt="Hero"
      />
    </motion.div>
  );
}
