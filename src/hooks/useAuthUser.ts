import { auth } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => auth.me(),
    // 2 hours
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
