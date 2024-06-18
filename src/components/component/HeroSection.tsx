import { Mockup } from "@/constant/Mockup";
import { InfiniteMovingCards } from "./Mockup";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex h-fit min-h-screen w-full flex-col items-center justify-end gap-5 bg-gradient-to-br from-blue-primary via-blue-secondary to-blue-tertiary px-2 text-white md:gap-20"
    >
      <section className="mt-28 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold lg:text-5xl">
          Translating Silence <br /> Transcending
          <span className="relative ml-2 inline-block px-2">
            <div className="absolute inset-0 -skew-x-12 transform bg-white"></div>
            <span className="relative text-blue-tertiary">Barriers</span>
          </span>
        </h1>
        <p className="text-center italic md:w-3/5 md:text-xl">
          An app to facilitate easy and effective communication between deaf and
          hearing individuals
        </p>
        <div className="my-5 flex w-full items-center justify-center md:mt-10">
          <a
            href="https://github.com/Signa-Lingua/singa-app/releases/latest"
            target="_blank"
            className="focus:shadow-outline mr-6 inline-flex h-12 items-center justify-center rounded bg-white px-6 font-medium tracking-wide text-blue-tertiary shadow-md transition duration-200 hover:bg-gray-200 focus:outline-none"
          >
            Download
          </a>
          <a
            href="#about"
            aria-label=""
            className="inline-flex items-center font-semibold text-white transition-colors duration-200 hover:text-gray-200"
          >
            About Us
          </a>
        </div>
      </section>
      <div className="dark:bg-grid-white/[0.05] relative mb-10 flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
        <InfiniteMovingCards items={Mockup} direction="right" speed="slow" />
      </div>
    </section>
  );
}
