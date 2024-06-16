import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { register } from "./action";

export default function Page() {
  return (
    // register page with form
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Register Page</h1>
      {/*  form */}
      <form className="flex flex-col gap-4" action={register}>
        <div className="flex flex-col gap-3">
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" name="username" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
