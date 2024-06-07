import { toast } from "@/components/ui/use-toast";
import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type UseOptimisticMutationProps<T> = {
  mutationFn: MutationFunction<unknown, void> | undefined;
  queryKey: QueryKey;
  onSuccess:
    | ((data: unknown, variables: void, context: () => void) => unknown)
    | undefined;
  updater: (oldData: T) => T;
  invalidates: [string, ...string[]];
};

export const useOptimisticMutation = <T>({
  mutationFn,
  queryKey,
  onSuccess,
  updater,
  invalidates,
}: UseOptimisticMutationProps<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: onSuccess,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, updater);

      return () => {
        queryClient.setQueryData(queryKey, snapshot);
      };
    },
    onError: (err, rollback) => {
      // @ts-expect-error next-line
      rollback?.();
      toast({
        title: "Error",
        description: err.message,
      });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: invalidates,
      });
    },
  });
};
