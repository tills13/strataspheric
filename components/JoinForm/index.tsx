"use client";

import React, { useActionState } from "react";

import { type JoinFormState } from "../../app/@marketing/join/actions";
import { signIn } from "../../auth/actions";
import { Strata } from "../../data";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { Group } from "../Group";
import { InfoPanel } from "../InfoPanel";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { JoinFormFields } from "./JoinFormFields";

interface Props {
  className?: string;
  onSubmit: (state: JoinFormState, fd: FormData) => Promise<JoinFormState>;
  strata?: Strata;
}

export function JoinForm({ className, onSubmit, strata }: Props) {
  const [state, onSubmitAction] = useActionState(
    async (state: JoinFormState, fd: FormData) => {
      const nextState = await onSubmit(state, fd);

      if (nextState?.success) {
        await signIn(fd.get("email"), fd.get("password"));
        location.href = "/";
      }

      return nextState;
    },
    null,
  );

  return (
    <form action={onSubmitAction} className={classnames(className)}>
      <Stack>
        <JoinFormFields />

        <label htmlFor="isRealtor">
          <Group justify="space-between">
            <Text family="secondaryHeader">I am a realtor</Text>
            <Checkbox id="isRealtor" name="isRealtor" defaultChecked={false} />
          </Group>
        </label>

        {!state?.success && state?.error && (
          <InfoPanel level="error">
            <Text>{state.error}</Text>
          </InfoPanel>
        )}

        <StatusButton color="primary" success={state?.success} type="submit">
          {strata ? `Join ${strata.name}` : "Sign Up"}
        </StatusButton>
      </Stack>
    </form>
  );
}
