import MainLayout from "@/layout/MainLayout";
import { getUser } from "../auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <MainLayout>{children}</MainLayout>;
}
