import { auth } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      navigate("/");
      return queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });
}
