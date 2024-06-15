import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Feature",
    link: "#feature",
  },
  {
    name: "Article",
    link: "#article",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full bg-gradient-to-tr from-blue-primary via-blue-secondary to-blue-tertiary p-6 md:absolute md:from-transparent md:via-transparent md:to-transparent">
      <nav className="container mx-auto">
        <div className={cn("hidden", visible ? "md:hidden" : "md:flex")}>
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.svg" alt="logo" className="h-20" />
            <h1 className="text-2xl font-bold text-white">SINGA</h1>
          </div>
          <ul className="ml-auto hidden list-none space-x-6 text-xl font-normal md:flex">
            {navItems.map((navItem: any, idx: number) => (
              <li key={`link=${idx}`}>
                <a
                  href={navItem.link}
                  className="text-white hover:text-gray-100"
                >
                  {navItem.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <motion.button
          initial="hide"
          animate={mobileNav ? "show" : "hide"}
          onClick={toggleMobileNav}
          className="relative z-10 flex flex-col space-y-1 md:hidden"
        >
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: 45,
                y: 5,
              },
            }}
            className="block h-px w-6 bg-white"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                opacity: 1,
              },
              show: {
                opacity: 0,
              },
            }}
            className="block h-px w-6 bg-white"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: -45,
                y: -5,
              },
            }}
            className="block h-px w-6 bg-white"
          ></motion.span>
        </motion.button>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              opacity: 1,
              y: -50,
            }}
            animate={{
              y: visible ? 0 : -50,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "fixed inset-x-0 top-5 z-[5000] mx-auto hidden w-fit items-center justify-center space-x-4 rounded-full border border-gray-100 bg-white/60 px-6 py-4 text-3xl shadow-lg backdrop-blur-lg dark:border-white/[0.2] dark:bg-black md:flex",
            )}
          >
            {navItems.map((navItem: any, idx: number) => (
              <a
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center space-x-1 text-5xl text-neutral-900 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                )}
              >
                <span className="hidden text-sm sm:block">{navItem.name}</span>
              </a>
            ))}
          </motion.div>
          {mobileNav && (
            <MotionConfig
              transition={{
                type: "spring",
                bounce: 0.1,
              }}
            >
              <motion.div
                key="mobile-nav"
                variants={{
                  hide: {
                    x: "-100%",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "afterChildren",
                      staggerChildren: 0.25,
                    },
                  },
                  show: {
                    x: "0%",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "beforeChildren",
                      staggerChildren: 0.25,
                    },
                  },
                }}
                initial="hide"
                animate="show"
                exit="hide"
                className="fixed inset-0 flex flex-col justify-center space-y-10 bg-blue-primary p-6 lg:hidden"
              >
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="list-none space-y-6"
                >
                  {navItems.map((navItem: any, idx: number) => (
                    <motion.li key={`link=${idx}`}>
                      <a
                        href={navItem.link}
                        onClick={() => {
                          toggleMobileNav();
                        }}
                        className="text-2xl font-bold text-white"
                      >
                        {navItem.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="h-px w-full bg-white/30"
                ></motion.div>
              </motion.div>
            </MotionConfig>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
