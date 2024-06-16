import { apiLogin } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiLogin,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });
}
