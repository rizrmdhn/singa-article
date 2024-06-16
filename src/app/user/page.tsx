import React from "react";
import { getUser } from "./action";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl">Welcome {user.name}</h1>
      <p className="text-sm">You are now logged in</p>
      <p className="text-sm">Your ID is {user.id}</p>
      <p className="text-sm">Your email is {user.email}</p>
      <p className="text-sm">Your provider is {user.provider}</p>
      <SignOutButton />
    </div>
  );
}
