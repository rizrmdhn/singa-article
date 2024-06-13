import ThemeButton from "@/components/ThemeButton";
import React from "react";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <ThemeButton />
      {children}
    </main>
  );
}
