import { toast } from "@/components/ui/use-toast";
import { apiLogout } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });

      queryClient.setQueryData(["authUser"], null);

      router.push("/login");

      return queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
}
