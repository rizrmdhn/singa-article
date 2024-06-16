import SchemaValidationError from "@/errors/SchemaValidationError";
import { toast } from "@/components/ui/use-toast";
import { apiAddArticle } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiAddArticle,
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
