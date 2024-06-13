import { getArticles } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useArticle() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
}
