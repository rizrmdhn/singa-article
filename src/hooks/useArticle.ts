import { articleList } from "@/server/actions/article-action";
import { useQuery } from "@tanstack/react-query";

export default function useArticle() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => articleList(),
  });
}
