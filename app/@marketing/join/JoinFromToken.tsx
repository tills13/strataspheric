import { redirect } from "next/navigation";

import { JoinFromTokenForm } from "../../../components/JoinFromTokenForm";
import { findStrataMemberships } from "../../../data/strataMemberships/findStrataMemberships";
import { getStrataById } from "../../../data/stratas/getStrataById";
import { getUserPasswordResetToken } from "../../../data/userPasswordResetTokens/getUserPasswordResetToken";
import { joinFromTokenAction } from "./actions";

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

  const [membership] = await findStrataMemberships({ userId: token.userId });

  if (!membership) {
    redirect("/");
  }

  const strata = await getStrataById(membership.strataId);

  if (!strata) {
    redirect("/");
  }

  return (
    <JoinFromTokenForm
      membership={membership}
      onSubmit={joinFromTokenAction.bind(undefined, token.token)}
      strata={strata}
    />
  );
}
