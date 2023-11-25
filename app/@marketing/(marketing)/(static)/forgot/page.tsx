"use client";

import * as styles from "./style.css";

import {
  experimental_useFormState, // @ts-expect-error
  experimental_useFormStatus,
} from "react-dom";

import { Button } from "../../../../../components/Button";
import { Header } from "../../../../../components/Header";
import { CircleCheckIcon } from "../../../../../components/Icon/CircleCheckIcon";
import { Input } from "../../../../../components/Input";
import { LoadingIcon } from "../../../../../components/LoadingIcon";
import {
  requestPasswordResetActionReducer,
  resetPasswordAction,
} from "./actions";

export const runtime = "edge";

function RequestPasswordFormSubmitStatus({
  submitSuccess,
}: {
  submitSuccess: boolean;
}) {
  const s = experimental_useFormStatus();

  if (s.pending) {
    return (
      <div className={styles.submitPendingContainer}>
        <LoadingIcon />
      </div>
    );
  }

  return submitSuccess ? (
    <>
      <CircleCheckIcon className={styles.submitButtonIcon} /> an email has been
      sent to the entered address if it exists in our system.
    </>
  ) : (
    <Button
      className={styles.submitButton}
      type="submit"
      size="large"
      variant="primary"
    >
      Continue{" "}
    </Button>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [state, requestPasswordResetAction] = experimental_useFormState(
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

        <Button
          className={styles.submitButton}
          type="submit"
          size="large"
          variant="primary"
        >
          Reset Password
        </Button>
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

      <RequestPasswordFormSubmitStatus submitSuccess={!!state.emailSent} />
    </form>
  );
}
