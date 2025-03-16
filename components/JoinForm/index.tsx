"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { signIn } from "next-auth/react";
import React from "react";
import { useFormState } from "react-dom";

import { type JoinFormState } from "../../app/@marketing/join/actions";
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
  const [state, onSubmitAction] = useFormState(
    async (state: JoinFormState, fd: FormData) => {
      if (strata) {
        fd.set("strataId", strata.id);
      }

      const nextState = await onSubmit(state, fd);

      if (nextState?.success) {
        await signIn("credentials", {
          email: fd.get("email"),
          password: fd.get("password"),
          redirect: false,
        });

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
