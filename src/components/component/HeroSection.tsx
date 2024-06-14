import { InfiniteMovingCards } from "./Mockup";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="w-full flex px-2 flex-col items-center justify-end gap-5 md:gap-20 h-fit text-white bg-gradient-to-br from-blue-primary via-blue-secondary to-blue-tertiary"
    >
      <section className="flex flex-col items-center gap-4 mt-28">
        <h1 className="font-bold text-3xl lg:text-5xl text-center">
          Translating Silence <br /> Transcending
          <span className="ml-2 relative inline-block px-2">
            <div className="absolute inset-0 transform -skew-x-12 bg-white"></div>
            <span className="relative text-blue-tertiary">Barriers</span>
          </span>
        </h1>
        <p className="italic text-center md:text-xl md:w-3/5">
          An app that developed to fasilitate easy and effective communication
          between deaf and hearing individuals.
        </p>
        <div className="flex items-center w-full my-5 md:mt-10 justify-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-blue-tertiary transition duration-200 rounded shadow-md bg-white hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          >
            Download
          </button>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold text-white transition-colors duration-200 hover:text-deep-purple-accent-700"
          >
            Contact Us
          </a>
        </div>
      </section>
      <div className="rounded-md flex flex-col mb-10 antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={Mockup} direction="right" speed="slow" />
      </div>
    </section>
  );
}

const Mockup: Array<String> = [
  "/mockup1.png",
  "/mockup2.png",
  "/mockup3.png",
  "/mockup4.png",
];
