import * as styles from "./style.css";

import { JoinForm } from "../../../../components/JoinForm";
import { SignInJoinNavigation } from "../../../../components/SignInJoinNavigation";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  if (searchParams["token"]) {
    return <JoinFromToken token={searchParams["token"]} />;
  }

  return (
    <>
      <SignInJoinNavigation className={styles.navigation} />
      <JoinForm onSubmit={joinAction} />
    </>
  );
}
