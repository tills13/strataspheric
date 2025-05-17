import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { JoinFromTokenForm } from "../../../components/JoinFromTokenForm";
import { listStrataMemberships } from "../../../data/memberships/listStrataMemberships";
import { getStrataById } from "../../../data/stratas/getStrataById";
import { getUserPasswordResetToken } from "../../../data/userPasswordResetTokens/getUserPasswordResetToken";

interface Props {
  token: string;
}

export async function JoinFromToken({ token: rawToken }: Props) {
  const token = await getUserPasswordResetToken({
    token: rawToken,
  });

  if (!token) {
    redirect("/");
  }

  const [membership] = await listStrataMemberships({ userId: token.userId });

  if (!membership) {
    redirect("/");
  }

  const strata = await getStrataById(membership.strataId);

  if (!strata) {
    redirect("/");
  }

  return (
    <JoinFromTokenForm
      className={styles.joinForm}
      membership={membership}
      strata={strata}
      token={token.token}
    />
  );
}
