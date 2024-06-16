import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardLoader() {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <a className="absolute inset-0 z-10" href="#">
        <Skeleton className="h-60 w-full" />
      </a>
      <Skeleton className="h-60 w-full" />

      <div className="bg-white p-4 dark:bg-gray-950">
        <Skeleton className="mb-2 h-6 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
