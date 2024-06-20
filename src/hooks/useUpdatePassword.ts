import { toast } from "@/components/ui/use-toast";
import { updateUserPassword } from "@/server/actions/user-action";
import { useMutation } from "@tanstack/react-query";

export default function useUpdatePassword() {
  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      if (data?.data?.meta.status === "success") {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
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
