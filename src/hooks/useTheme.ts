import { getLocalTheme } from "@/lib/theme";
import { useQuery } from "@tanstack/react-query";

export default function useTheme() {
  return useQuery({
    queryKey: ["theme"],
    queryFn: getLocalTheme,
    staleTime: Infinity,
  });
}
