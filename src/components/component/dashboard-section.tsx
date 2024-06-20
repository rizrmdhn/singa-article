import { fetchListOfArticles, fetchListOfUsers } from "@/server/queries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardSection() {
  const users = await fetchListOfUsers();
  const articles = await fetchListOfArticles();

  return (
    <div
      className="flex flex-1 items-start justify-start gap-5 rounded-lg shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>List of Users</CardTitle>
          <CardDescription className="max-w-lg text-balance text-2xl leading-relaxed text-black dark:text-white">
            {users.length}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Articles</CardTitle>
          <CardDescription className="max-w-lg text-balance text-2xl leading-relaxed text-black dark:text-white">
            {articles.length}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
