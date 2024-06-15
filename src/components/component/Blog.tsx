export default function ArticleSection() {
  return (
    <div
      className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      id="article"
    >
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="inline-block bg-gradient-to-b from-slate-500 to-black bg-clip-text text-3xl font-bold text-transparent">
          Article
        </h2>
        <p className="mt-4">
          We provide valuable insights and resources on ASL and health, ensuring
          you stay informed and connected with your community needs regularly.
        </p>
      </div>
      {/* End Title */}
      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        <a className="group" href="#">
          <div className="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]">
            <img
              className="absolute start-0 top-0 size-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
              alt="Image Description"
            />
            <span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-gray-800 px-3 py-1.5 text-xs font-medium text-white dark:bg-neutral-900">
              Latest
            </span>
          </div>
          <div className="mt-7">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
              Studio by Preline
            </h3>
            <p className="mt-3 text-gray-800 dark:text-neutral-200">
              Produce professional, reliable streams easily leveraging Preline's
              innovative broadcast studio
            </p>
            <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 decoration-2 group-hover:underline">
              Read more
              <svg
                className="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </a>
        {/* End Card */}
        {/* Card */}
        <a className="group" href="#">
          <div className="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]">
            <img
              className="absolute start-0 top-0 size-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Image Description"
            />
          </div>
          <div className="mt-7">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
              Onsite
            </h3>
            <p className="mt-3 text-gray-800 dark:text-neutral-200">
              Optimize your in-person experience with best-in-class capabilities
              like badge printing and lead retrieval
            </p>
            <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 decoration-2 group-hover:underline">
              Read more
              <svg
                className="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </a>
        {/* End Card */}
        {/* Card */}
        <a
          className="group relative flex min-h-60 w-full flex-col rounded-xl bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80')] bg-cover bg-center transition hover:shadow-lg"
          href="#"
        >
          <div className="flex-auto p-4 md:p-6">
            <h3 className="text-xl text-white/90 group-hover:text-white">
              <span className="font-bold">Singa APP</span> We provide valuable
              insights and resources on ASL and health, ensuring you stay
              informed and connected with your community’s needs regularly.
            </h3>
          </div>
          <div className="p-4 pt-0 md:p-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
              Read More
              <svg
                className="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </a>
        {/* End Card */}
      </div>
      {/* End Grid */}
    </div>
  );
}
