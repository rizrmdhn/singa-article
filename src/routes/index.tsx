import useAuthUser from "@/hooks/useAuthUser";
import LoggedInRoutes from "./LoggedInRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";
import { LoaderCircle } from "lucide-react";

export default function Routes() {
  const { data: authUser, status } = useAuthUser();

  if (status === "pending") {
    return (
      // loading spinner in the middle
      <div className="flex h-screen items-center justify-center gap-4">
        <LoaderCircle className="h-10 w-10 animate-spin" />
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (authUser) {
    return <LoggedInRoutes />;
  } else {
    return <LoggedOutRoutes />;
  }
}
