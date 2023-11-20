import * as styles from "./style.css";

import { Button } from "../../../../../components/Button";
import { Input } from "../../../../../components/Input";
import { resetPasswordAction, requestPasswordResetAction } from "./actions";
import { Header } from "../../../../../components/Header";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
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
        />

        <Input
          className={styles.input}
          placeholder="Confirm Password"
          name="confirm_password"
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
      <Button
        className={styles.submitButton}
        type="submit"
        size="large"
        variant="primary"
      >
        Continue
      </Button>
    </form>
  );
}
