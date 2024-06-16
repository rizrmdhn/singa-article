"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Accordion = ({ title, description }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="w-full p-4">
      <motion.div
        initial={false}
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="w-full font-semibold"
      >
        <h3
          className={twMerge(
            `w-full text-lg`,
            expanded && "text-blue-secondary",
          )}
        >
          {title}
        </h3>
        <motion.div
          initial={false}
          animate={{
            rotate: expanded ? 180 : 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={twMerge(expanded && "text-blue-secondary")}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            // Add animations for the accordion content
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="w-full"
          >
            <p className="w-full">{description}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
