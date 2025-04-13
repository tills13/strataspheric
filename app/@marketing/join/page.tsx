import { PageProps } from "../../../.next/types/app/@marketing/join/page";
import { JoinForm } from "../../../components/JoinForm";
import { StaticPageContainer } from "../StaticPageContainer";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (token && typeof token === "string") {
    return (
      <StaticPageContainer centered>
        <JoinFromToken token={token} />
      </StaticPageContainer>
    );
  }

  return (
    <StaticPageContainer centered>
      <JoinForm onSubmit={joinAction} />
    </StaticPageContainer>
  );
}
