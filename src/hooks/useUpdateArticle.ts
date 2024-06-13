import { toast } from "@/components/ui/use-toast";
import { articles } from "@/lib/api";
import { useOptimisticMutation } from "./useOptimisticMutation";
import { DetailArticle } from "@/types/articles";

export default function useUpdateArticle(
  id: string,
  title: string,
  description: string,
  image?: FileList | undefined,
) {
  return useOptimisticMutation<DetailArticle>({
    mutationFn: () => articles.updateArticle({ id, title, description, image }),
    queryKey: ["articleDetail", id],
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article updated successfully",
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
    invalidates: ["articleDetail"],
  });
}
