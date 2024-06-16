import { apiGetDetailArticles } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailArticle(id: string) {
  return useQuery({
    queryKey: ["articleDetail", id],
    queryFn: () => apiGetDetailArticles(id),
    enabled: id !== undefined,
    retry: 1,
  });
}
