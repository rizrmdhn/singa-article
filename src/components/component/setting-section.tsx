"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();

  function isActive(bool: boolean) {
    return bool ? "font-semibold text-primary" : "";
  }

  return (
    <div
      className="flex flex-1 items-start justify-start gap-5 rounded-lg shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex w-full flex-row items-center justify-between gap-5 p-10">
        <div className="w-1/2 self-start sm:col-span-2">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="/dashboard/settings"
              className={isActive(location === "/dashboard/settings")}
            >
              General
            </Link>
            <Link
              href="/dashboard/settings/password"
              className={isActive(location === "/dashboard/settings/password")}
            >
              Password
            </Link>
          </nav>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
