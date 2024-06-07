import { articles } from "@/lib/api";
import { Article } from "@/types/articles";
import { useOptimisticMutation } from "./useOptimisticMutation";
import { toast } from "@/components/ui/use-toast";

export default function useDeleteArticle(id: string) {
  return useOptimisticMutation<Article[]>({
    mutationFn: () => articles.deleteArticle(id),
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
