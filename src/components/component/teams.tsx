import { ITeams, Teams } from "@/constant/Teams";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

export function HoverImageLinks() {
  return (
    <section
      className="flex w-full flex-col items-center p-4 md:p-8"
      id="teams"
    >
      <h2 className="inline-block bg-gradient-to-b from-blue-primary to-blue-tertiary bg-clip-text text-4xl font-bold text-transparent">
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
          <Link key={i} {...team} />
        ))}
      </div>
    </section>
  );
}

const Link = (item: ITeams) => {
  // const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="hover:border-blue-pritext-blue-primary group relative flex cursor-pointer items-center justify-between border-b-2 border-gray-400 py-4 transition-colors duration-500 hover:border-blue-primary md:py-8"
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
          className="relative z-10 block text-4xl font-bold text-gray-400 transition-colors duration-500 group-hover:text-blue-primary md:text-6xl"
        >
          {item.name.split("").map((l, i) => (
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
        <span className="relative z-10 mt-2 block text-base text-gray-400 transition-colors duration-500 group-hover:text-blue-primary">
          {item.role}
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
        src={item.profile}
        className="absolute z-0 hidden h-24 w-32 rounded-lg object-cover md:block md:h-48 md:w-64"
        alt={`Image representing a link for ${item.name}`}
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
        className="relative z-10 hidden flex-col gap-3 p-4 md:flex md:flex-row md:gap-5"
      >
        <a href={item.github} target="_blank">
          <Github className="h-10 w-10 group-hover:stroke-blue-primary" />
        </a>
        <a href={item.linkedin} target="_blank">
          <Linkedin className="h-10 w-10 group-hover:stroke-blue-primary" />
        </a>
      </motion.div>
      <img
        src={item.profile}
        className="absolute left-1/4 top-0 z-10 h-20 w-28 translate-x-[60%] translate-y-8 rotate-12 scale-0 rounded-lg object-cover duration-300 group-hover:scale-100 md:hidden md:h-48 md:w-64"
        alt={`Image representing a link for ${item.name}`}
      />
      <div className="relative z-50 flex translate-x-10 flex-col gap-3 p-4 opacity-0 duration-150 group-hover:translate-x-0 group-hover:opacity-100 md:hidden md:flex-row md:gap-5">
        <a href={item.github} target="_blank">
          <Github className="h-10 w-10 group-hover:stroke-blue-primary" />
        </a>
        <a href={item.linkedin} target="_blank">
          <Linkedin className="h-10 w-10 group-hover:stroke-blue-primary" />
        </a>
      </div>
    </motion.div>
  );
};
