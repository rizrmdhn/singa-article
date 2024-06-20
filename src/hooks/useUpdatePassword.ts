import { toast } from "@/components/ui/use-toast";
import { updateUserPassword } from "@/server/actions/user-action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useUpdatePassword() {
  const { push } = useRouter();

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      if (data?.data?.meta.status === "success") {
        toast({
          title: "Success",
          description: "Password updated successfully",
        });
        push("/dashboard/settings");
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
