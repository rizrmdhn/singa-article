import { faq } from "@/constant/Faq";
import { Accordion } from "./Accordion";

export default function Faq() {
  return (
    <section className="relative my-10 flex w-full flex-col items-center justify-center px-4">
      <div className="bg-blue-tertiary absolute left-1/2 top-1/2 h-20 w-20 rounded-full mix-blend-multiply blur-3xl filter"></div>
      <h2 className="inline-block bg-gradient-to-b from-slate-500 to-black bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl">
        Frequently asked questions
      </h2>
      <div className="my-4 flex w-full flex-col items-center justify-center md:my-10 md:w-3/4 md:px-10">
        {faq.map((item, i) => (
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
