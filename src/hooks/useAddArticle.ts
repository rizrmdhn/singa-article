import { toast } from "@/components/ui/use-toast";
import SchemaValidationError from "@/errors/SchemaValidationError";
import { articles } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articles.addArticle,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
    onError: (error) => {
      if (error instanceof SchemaValidationError) {
        error.errors.forEach((err) => {
          toast({
            title: "Error",
            description: err.message,
          });
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    },
  });
}
