"use client";

import { type ITeams, Teams } from "@/constant/Teams";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export function HoverImageLinks() {
  return (
    <section
      className="flex w-full flex-col items-center p-4 md:p-8"
      id="teams"
    >
      <h2 className="from-blue-primary to-blue-tertiary inline-block bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent">
        Our Teams
      </h2>
      <p className="mt-4 w-full text-center text-sm md:w-2/4">
        Singa team is a group of passionate individuals united by a common
        mission to provide you with the best in expertise and holistic care.
        Together, we are dedicated to enhancing your well-being and guiding you
        on your journey.
      </p>
      <div className="mx-auto w-full md:px-44">
        {Teams.map((team, i) => (
          <DataLink key={i} {...team} />
        ))}
      </div>
    </section>
  );
}

const DataLink = ({ name, github, linkedin, profile, role }: ITeams) => {
  // const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  // const handleMouseMove = (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  // ) => {
  //   const rect = ref.current!.getBoundingClientRect();

  //   const width = rect.width;
  //   const height = rect.height;

  //   const mouseX = e.clientX - rect.left;
  //   const mouseY = e.clientY - rect.top;

  //   const xPct = mouseX / width - 0.5;
  //   const yPct = mouseY / height - 0.5;

  //   x.set(xPct);
  //   y.set(yPct);
  // };

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="hover:border-blue-pritext-blue-primary hover:border-blue-primary group relative flex cursor-pointer items-center justify-between border-b-2 border-gray-400 py-4 transition-colors duration-500 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="group-hover:text-blue-primary relative z-10 block text-4xl font-bold text-gray-400 transition-colors duration-500 md:text-6xl"
        >
          {name.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="group-hover:text-blue-primary relative z-10 mt-2 block text-base text-gray-400 transition-colors duration-500">
          {role}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={profile}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${name}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 flex flex-col gap-3 p-4 md:flex-row md:gap-5"
      >
        <a href={github} target="_blank">
          <svg
            className="group-hover:stroke-blue-primary group-hover:fill-blue-primary h-10 w-10"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a href={linkedin} target="_blank">
          <Linkedin className="group-hover:stroke-blue-primary h-10 w-10" />
        </a>
      </motion.div>
    </motion.div>
  );
};
