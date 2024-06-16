import DashboardArticleSection from "@/components/component/dashboard-article-section";
import { apiGetArticles } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default async function ArticlePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: apiGetArticles,
  });

  return (
    <>
      <div className="flex items-center">
        {/* the button should be placed on the right */}
        <Link
          href={"/dashboard/articles/new"}
          className="ml-auto inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Create Article
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardArticleSection />
      </HydrationBoundary>
    </>
  );
}
