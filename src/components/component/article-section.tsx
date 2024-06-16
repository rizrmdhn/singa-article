"use client";

import useArticle from "@/hooks/useArticle";
import ArticleCardLoader from "../ArticleCardLoader";
import ArticleCard from "../ArticleCard";

export function ArticleSection() {
  const { data, status } = useArticle();

  return (
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
            Sorry, we couldn&apos;t find any article.
          </p>
        </div>
      ) : (
        data?.map((article) => <ArticleCard key={article.id} {...article} />)
      )}
    </div>
  );
}
