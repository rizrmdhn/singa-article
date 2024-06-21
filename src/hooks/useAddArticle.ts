import SchemaValidationError from "@/errors/SchemaValidationError";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "@/server/actions/article-action";
import { useRouter } from "next/navigation";

export default function useAddArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      if (data?.data?.meta.status === "success") {
        toast({
          title: "Success",
          description: data?.data?.meta.message,
        });

        router.back();
        return queryClient.invalidateQueries({
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
