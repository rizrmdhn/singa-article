import type { Article } from "@/types/articles";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { toast } from "@/components/ui/use-toast";
import { deleteArticle } from "@/server/actions/article-action";

export default function useDeleteArticle(id: number) {
  return useOptimisticMutation<Article[]>({
    mutationFn: () => deleteArticle(id),
    queryKey: ["articles"],
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    },
    updater: (oldData) => oldData.filter((article) => article.id !== id),
    invalidates: ["articles"],
  });
}
