"use client";

import React from "react";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { updatePasswordSchema } from "@/schema/users";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { LoaderCircle } from "lucide-react";

export default function UpdatePasswordForm() {
  const { mutate, status } = useUpdatePassword();

  return (
    <AutoForm
      onSubmit={(finalValues) => {
        mutate(finalValues);
      }}
      formSchema={updatePasswordSchema}
      fieldConfig={{
        currentPassword: {
          inputProps: {
            type: "password",
            placeholder: "input your old password",
          },
        },
        newPassword: {
          inputProps: {
            type: "password",
            placeholder: "input your new password",
          },
        },
        newPasswordConfirmation: {
          inputProps: {
            type: "password",
            placeholder: "input your new password again",
          },
        },
      }}
    >
      <AutoFormSubmit disabled={status === "pending"}>
        {status === "pending" ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Update Password
      </AutoFormSubmit>
    </AutoForm>
  );
}
