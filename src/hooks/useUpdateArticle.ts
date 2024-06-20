import { toast } from "@/components/ui/use-toast";
import { useOptimisticMutation } from "./useOptimisticMutation";
import type { DetailArticle } from "@/types/articles";
import { useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "@/server/actions/article-action";

export default function useUpdateArticle(
  id: string,
  title: string,
  description: string,
  image?: string,
) {
  const queryClient = useQueryClient();

  return useOptimisticMutation<DetailArticle>({
    mutationFn: () => updateArticle({ id, title, description, image }),
    queryKey: ["articleDetail", id],
    onSuccess: (data: any) => {
      if (data?.data?.meta.status === "success") {
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
      } else {
        toast({
          title: "Error",
          description: data?.data?.meta.message,
          variant: "destructive",
        });
      }
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
