import { ArticleDetailSection } from "@/components/component/article-detail-section";
import React from "react";

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <ArticleDetailSection id={params.id} />
    </>
  );
}
