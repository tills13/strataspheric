"use client";

import { useActionState } from "react";

import { User } from "../../../auth/types";
import { Header } from "../../../components/Header";
import { SaveIcon } from "../../../components/Icon/SaveIcon";
import { Input } from "../../../components/Input";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { updateUserActionReducer } from "./actions";

interface Props {
  user: User;
}

export function UpdateProfileForm({ user }: Props) {
  const [state, dispatch] = useActionState(updateUserActionReducer, {
    success: undefined,
  });

  return (
    <form action={dispatch}>
      <Header mb="large" as="h2">
        Update Profile
      </Header>

      <Stack>
        <Header as="h3">Name</Header>

        <Input label="Full name" name="name" defaultValue={user.name || ""} />

        <Header as="h3">Password</Header>
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
        />

        <Input label="Password" name="password" type="password" />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <StatusButton
          color="success"
          icon={<SaveIcon />}
          style="secondary"
          success={state.success}
        >
          Update
        </StatusButton>
      </Stack>
    </form>
  );
}
