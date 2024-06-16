import React from "react";
import { Button } from "@/components/ui/button";
import logout from "@/lib/logout";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
