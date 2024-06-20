import { toast } from "@/components/ui/use-toast";
import { login } from "@/server/actions/login-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.data?.meta.status === "success") {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        router.push("/dashboard");
        return queryClient.invalidateQueries({
          queryKey: ["authUser"],
        });
      } else {
        toast({
          title: "Error",
          description: data?.data?.meta.message,
          variant: "destructive",
        });
      }
    },
  });
}
