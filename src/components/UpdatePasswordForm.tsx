"use client";

import React from "react";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { updatePasswordSchema } from "@/schema/users";
import { updateUserPassword } from "@/server/actions/user.action";

export default function UpdatePasswordForm() {
  return (
    <AutoForm
      onSubmit={(values) => updateUserPassword(values.newPassword)}
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
      <AutoFormSubmit>Update Password</AutoFormSubmit>
    </AutoForm>
  );
}
