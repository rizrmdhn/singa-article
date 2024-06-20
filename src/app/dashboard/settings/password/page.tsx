import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Page() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your account&apos;s password</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}
