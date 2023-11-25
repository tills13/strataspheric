import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { Button } from "../../../../../components/Button";
import { Header } from "../../../../../components/Header";
import { Input } from "../../../../../components/Input";
import { findStrataMemberships } from "../../../../../data/strataMemberships/findStrataMemberships";
import { getStrataById } from "../../../../../data/stratas/getStrataById";
import { getUserPasswordResetToken } from "../../../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { resetPasswordAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const token = await getUserPasswordResetToken({
    token: searchParams["token"],
  });

  if (!token) {
    redirect("/");
  }

  const [membership] = await findStrataMemberships({ userId: token.userId });

  if (!membership) {
    redirect("/");
  }

  const strata = await getStrataById(membership.strataId);

  if (!strata) {
    redirect("/");
  }

  return (
    <form action={resetPasswordAction}>
      <Header className={styles.header} priority={2}>
        Welcome to Strataspheric, {membership.name}
      </Header>

      <Header className={styles.header} priority={2}>
        You have been invited to join {strata.name}
      </Header>

      <input name="token" type="hidden" defaultValue={searchParams["token"]} />

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
        Set Password
      </Button>
    </form>
  );
}
