import { s } from "../../../sprinkles.css";

import { JoinForm } from "../../../components/JoinForm";
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
      <JoinForm onSubmit={joinAction} />
    </StaticPageContainer>
  );
}
