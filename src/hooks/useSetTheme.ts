import { getLocalTheme, setTheme } from "@/lib/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSetTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const localTheme = getLocalTheme();

      setTheme(localTheme === "light" ? "dark" : "light");
      return Promise.resolve();
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["theme"],
      });
    },
  });
}
