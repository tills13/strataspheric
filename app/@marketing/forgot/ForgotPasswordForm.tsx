"use client";

import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { useFormState } from "react-dom";

import { Group } from "../../../components/Group";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { InfoPanel } from "../../../components/InfoPanel";
import { Input } from "../../../components/Input";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { Text } from "../../../components/Text";
import { classnames } from "../../../utils/classnames";
import { requestPasswordResetActionReducer } from "./actions";

export function ForgotPasswordForm() {
  const [state, requestPasswordResetAction] = useFormState(
    requestPasswordResetActionReducer,
    {},
  );

  return (
    <form action={requestPasswordResetAction}>
      <Text className={classnames(s({ mb: "large" }), styles.blurb)}>
        Enter the email address associated with your account and we&apos;ll send
        you a link to reset your password.
      </Text>
      <Stack>
        <Input label="Email Address" name="email_address" />

        {state.error && (
          <InfoPanel level="error">
            <Text>{state.error}</Text>
          </InfoPanel>
        )}

        {state.success ? (
          <Group gap="small">
            <CircleCheckIcon className={styles.submitButtonIcon} /> an email has
            been sent to the entered address if it exists in our system.
          </Group>
        ) : (
          <StatusButton color="primary" success={state.success}>
            Send Reset Email
          </StatusButton>
        )}
      </Stack>
    </form>
  );
}
