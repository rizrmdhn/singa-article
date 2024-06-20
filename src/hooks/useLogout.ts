import { toast } from "@/components/ui/use-toast";
import { logout } from "@/server/actions/logout-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data: any) => {
      if (data?.meta.status === "success") {
        toast({
          title: "Success",
          description: "You have been logged out successfully",
        });

        queryClient.setQueryData(["authUser"], null);

        router.push("/login");

        return queryClient.invalidateQueries({
          queryKey: ["authUser"],
        });
      } else {
        toast({
          title: "Error",
          description: data?.meta.message,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
}
