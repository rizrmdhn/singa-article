import { auth } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });
}
