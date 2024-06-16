import { toast } from "@/components/ui/use-toast";
import { apiUpdateArticle } from "@/lib/api";
import { useOptimisticMutation } from "./useOptimisticMutation";
import type { DetailArticle } from "@/types/articles";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateArticle(
  id: string,
  title: string,
  description: string,
  image?: FileList | undefined,
) {
  const queryClient = useQueryClient();

  return useOptimisticMutation<DetailArticle>({
    mutationFn: () => apiUpdateArticle({ id, title, description, image }),
    queryKey: ["articleDetail", id],
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article updated successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["articleDetail", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
    updater: (oldData) => {
      return {
        ...oldData,
        title,
        description,
        image,
      };
    },
    invalidates: ["articleDetail", "articles"],
  });
}
