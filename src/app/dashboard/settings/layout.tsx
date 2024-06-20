import SettingSection from "@/components/component/setting-section";
import React from "react";

export default async function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <SettingSection>{children}</SettingSection>
    </>
  );
}
