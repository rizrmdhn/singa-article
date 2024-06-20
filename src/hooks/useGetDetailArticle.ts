import { getArticleDetail } from "@/server/actions/article-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailArticle(id: string) {
  return useQuery({
    queryKey: ["articleDetail", id],
    queryFn: () => getArticleDetail(Number(id)),
    enabled: id !== undefined,
    retry: 1,
  });
}
