import { ArticleSection } from "@/components/component/article-section";
import { apiGetArticles } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

export default async function ArticlePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: apiGetArticles,
  });

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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticleSection />
        </HydrationBoundary>
      </div>
    </section>
  );
}
