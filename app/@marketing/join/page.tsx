import { JoinForm } from "../../../components/JoinForm";
import { StaticPageContainer } from "../StaticPageContainer";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";


export default async function Page({ searchParams }: PageProps<"/join">) {
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
