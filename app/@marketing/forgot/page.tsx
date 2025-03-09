"use client";

import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { useFormState } from "react-dom";

import { Group } from "../../../components/Group";
import { Header } from "../../../components/Header";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { InfoPanel } from "../../../components/InfoPanel";
import { Input } from "../../../components/Input";
import { Panel } from "../../../components/Panel";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { Text } from "../../../components/Text";
import { classnames } from "../../../utils/classnames";
import { StaticPageContainer } from "../StaticPageContainer";
import {
  requestPasswordResetActionReducer,
  resetPasswordAction,
} from "./actions";

export const runtime = "edge";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [state, requestPasswordResetAction] = useFormState(
    requestPasswordResetActionReducer,
    {},
  );

  if (searchParams["token"]) {
    return (
      <StaticPageContainer>
        <Panel>
          <form action={resetPasswordAction}>
            <input
              name="token"
              type="hidden"
              defaultValue={searchParams["token"]}
            />
            <Stack>
              <Input label="Password" name="password" type="password" />

              <Input
                label="Confirm Password"
                name="confirm_password"
                type="password"
              />

              {state.error && (
                <InfoPanel level="error">{state.error}</InfoPanel>
              )}

              <StatusButton color="primary" success={state.success}>
                Reset Password
              </StatusButton>
            </Stack>
          </form>
        </Panel>
      </StaticPageContainer>
    );
  }

  return (
    <StaticPageContainer>
      <Panel>
        <form action={requestPasswordResetAction}>
          <Text className={classnames(s({ mb: "large" }), styles.blurb)}>
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
          </Text>
          <Stack>
            <Input label="Email Address" name="email_address" />

            {state.error && <InfoPanel level="error">{state.error}</InfoPanel>}

            {state.success ? (
              <Group gap="small">
                <CircleCheckIcon className={styles.submitButtonIcon} /> an email
                has been sent to the entered address if it exists in our system.
              </Group>
            ) : (
              <StatusButton color="primary" success={state.success}>
                Send Reset Email
              </StatusButton>
            )}
          </Stack>
        </form>
      </Panel>
    </StaticPageContainer>
  );
}
