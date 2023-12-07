"use client";

import * as styles from "./style.css";

import { useFormState } from "react-dom";

import { Header } from "../../../../../components/Header";
import { CircleCheckIcon } from "../../../../../components/Icon/CircleCheckIcon";
import { Input } from "../../../../../components/Input";
import { StatusButton } from "../../../../../components/StatusButton";
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
    { emailSent: false },
  );

  if (searchParams["token"]) {
    return (
      <form action={resetPasswordAction}>
        <Header className={styles.header} priority={2}>
          Reset Password
        </Header>

        <input
          name="token"
          type="hidden"
          defaultValue={searchParams["token"]}
        />

        <Input
          className={styles.input}
          placeholder="Password"
          name="password"
          type="password"
        />

        <Input
          className={styles.input}
          placeholder="Confirm Password"
          name="confirm_password"
          type="password"
        />

        <StatusButton success={state.emailSent} size="large" variant="primary">
          Reset Password
        </StatusButton>
      </form>
    );
  }

  return (
    <form action={requestPasswordResetAction}>
      <Header className={styles.header} priority={2}>
        Reset Password
      </Header>

      <p className={styles.blurb}>
        Enter the email address associated with your account, and we&apos;ll
        send you a link to reset your password.
      </p>

      <Input
        className={styles.input}
        placeholder="Email Address"
        name="email_address"
      />

      {state.emailSent ? (
        <>
          <CircleCheckIcon className={styles.submitButtonIcon} /> an email has
          been sent to the entered address if it exists in our system.
        </>
      ) : (
        <StatusButton success={state.emailSent} size="large" variant="primary">
          Continue
        </StatusButton>
      )}
    </form>
  );
}
