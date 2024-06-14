"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Faq() {
  const accordionIds = [
    // Add your FAQ data here
    {
      title: "What tools do I need to develop an Android app?",
      description:
        "To develop an Android app, you need Android Studio, which is the official IDE for Android development. Additionally, you should have a good understanding of Java or Kotlin programming languages.",
    },
    {
      title: "How can I integrate ASL features into my Android app?",
      description:
        "Integrating ASL features can be done using various libraries and APIs. You can use the Google Cloud Vision API to recognize hand gestures or develop custom machine learning models using TensorFlow Lite for more complex ASL recognition.",
    },
    {
      title:
        "Are there any open-source libraries available for ASL recognition?",
      description:
        "Yes, there are several open-source libraries available for ASL recognition. Some popular ones include MediaPipe by Google, which offers hand tracking capabilities, and TensorFlow models specifically trained for ASL recognition.",
    },
    {
      title: "How do I ensure accessibility in my ASL app?",
      description:
        "Ensure accessibility by providing text alternatives for all ASL content, using accessible color schemes, and providing voice-over capabilities. Testing your app with users who are fluent in ASL can also help identify and fix accessibility issues.",
    },
    {
      title: "Can I use pre-recorded ASL videos in my app?",
      description:
        "Yes, you can use pre-recorded ASL videos in your app. Make sure the videos are of high quality and include captions for users who may benefit from them. Consider using a video compression library to optimize video playback performance.",
    },
    {
      title: "What are some best practices for developing an ASL learning app?",
      description:
        "Some best practices include incorporating interactive lessons, providing feedback on user performance, including a variety of learning materials (videos, quizzes, games), and ensuring the app is user-friendly and engaging.",
    },
    {
      title: "How can I test the ASL functionality in my app?",
      description:
        "You can test ASL functionality by collaborating with native ASL users or communities. Additionally, using automated testing frameworks that support gesture recognition can help in testing the app's functionality.",
    },
    {
      title: "Is it necessary to have knowledge of ASL to develop this app?",
      description:
        "While it is not strictly necessary to be fluent in ASL, having a basic understanding can be very beneficial. Collaborating with ASL experts and incorporating their feedback during development is crucial for creating an effective and accurate ASL app.",
    },
  ];

  return (
    <section className="my-10 w-full px-4 relative justify-center flex flex-col items-center">
      <div className="absolute w-20 h-20 top-1/2 left-1/2 bg-blue-tertiary rounded-full mix-blend-multiply filter blur-3xl"></div>
      <h2 className="font-bold text-2xl md:text-4xl text-center from-slate-500 bg-gradient-to-b to-black inline-block text-transparent bg-clip-text">
        Frequently asked questions
      </h2>
      <div className="flex flex-col justify-center my-4 md:my-10 items-center w-full md:w-3/4 md:px-10">
        {accordionIds.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

const Accordion = ({ i, title, description }: any) => {
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
            expanded && "text-blue-secondary"
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
