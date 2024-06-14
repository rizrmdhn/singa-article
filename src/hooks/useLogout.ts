import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });

      queryClient.setQueryData(["authUser"], null);

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
