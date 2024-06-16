import { apiMe } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => apiMe(),
    // 2 hours
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
