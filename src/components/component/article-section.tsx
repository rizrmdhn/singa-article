import useArticle from "@/hooks/useArticle";
import ArticleCardLoader from "../ArticleCardLoader";
import ArticleCard from "../ArticleCard";

export function ArticleSection() {
  const { data, status } = useArticle();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Latest Articles
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our latest insights and stories.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-4">
          {status === "pending" ? (
            Array(6)
              .fill(0)
              .map((_, index) => <ArticleCardLoader key={index} />)
          ) : data?.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                No Article Found
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sorry, we couldn't find any article.
              </p>
            </div>
          ) : (
            data?.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
