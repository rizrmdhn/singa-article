import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });

      queryClient.setQueryData(["authUser"], null);
      navigate("/login");
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
