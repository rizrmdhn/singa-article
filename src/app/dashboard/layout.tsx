import MainLayout from "@/layout/MainLayout";
import { getUser } from "../auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <MainLayout>
      {children}
      {modal}
      <div id="modal-root" />
    </MainLayout>
  );
}
