import { ArticleDetailSection } from "@/components/component/article-detail-section";
import { fetchArticleById } from "@/server/queries";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articlesDetail", params.id],
    queryFn: () => fetchArticleById(Number(params.id)),
  });

  return (
    <>
      <ArticleDetailSection id={params.id} />
    </>
  );
}
