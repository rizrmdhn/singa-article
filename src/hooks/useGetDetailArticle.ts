import { articles } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailArticle(id: string) {
  return useQuery({
    queryKey: ["articleDetail", id],
    queryFn: () => articles.getArticleDetail(id),
    enabled: id !== undefined,
    retry: 1,
  });
}
