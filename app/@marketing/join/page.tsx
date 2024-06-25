import { s } from "../../../sprinkles.css";

import { JoinForm } from "../../../components/JoinForm";
import { SignInJoinNavigation } from "../../../components/SignInJoinNavigation";
import { StaticPageContainer } from "../StaticPageContainer";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  if (searchParams["token"]) {
    return (
      <StaticPageContainer>
        <JoinFromToken token={searchParams["token"]} />
      </StaticPageContainer>
    );
  }

  return (
    <StaticPageContainer>
      <SignInJoinNavigation className={s({ mb: "large" })} />
      <JoinForm onSubmit={joinAction} />
    </StaticPageContainer>
  );
}
