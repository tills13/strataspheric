"use client";

import { useActionState } from "react";

import { User } from "../../../../auth/types";
import { Checkbox } from "../../../../components/Checkbox";
import { Header } from "../../../../components/Header";
import { SaveIcon } from "../../../../components/Icon/SaveIcon";
import { Input } from "../../../../components/Input";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Text } from "../../../../components/Text";
import { updateUserActionReducer } from "./actions";

interface Membership {
  strataId: string;
  strataName: string;
  notifyEvents: boolean;
}

interface Props {
  user: User;
  memberships: Membership[];
}

export function UpdateProfileForm({ user, memberships }: Props) {
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

        <Input placeholder="Full name" name="name" defaultValue={user.name || ""} />

        <Header as="h3">Password</Header>
        <Input
          placeholder="Current Password"
          name="currentPassword"
          type="password"
        />

        <Input placeholder="Password" name="password" type="password" />
        <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        {memberships.length > 0 && (
          <>
            <Header as="h3">Notification Preferences</Header>
            <Text color="secondary">
              Receive email notifications when new events are added to your
              strata calendars.
            </Text>
            {memberships.map((membership) => (
              <div key={membership.strataId}>
                <input
                  type="hidden"
                  name={`membership_${membership.strataId}`}
                  value="1"
                />
                <Text as="label">
                  <Checkbox
                    name={`notifyEvents_${membership.strataId}`}
                    defaultChecked={membership.notifyEvents}
                  />
                  {membership.strataName}
                </Text>
              </div>
            ))}
          </>
        )}

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
