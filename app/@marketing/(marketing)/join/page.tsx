import * as styles from "./style.css";

import { JoinForm } from "../../../../components/JoinForm";
import { StaticPageContainer } from "../StaticPageContainer";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";


export default async function Page({ searchParams }: PageProps<"/join">) {
  const { token } = await searchParams;

  if (token && typeof token === "string") {
    return (
      <StaticPageContainer centered>
        <div className={styles.joinContainer}>
          <JoinFromToken token={token} />
        </div>
      </StaticPageContainer>
    );
  }

  return (
    <StaticPageContainer centered>
      <div className={styles.joinContainer}>
        <JoinForm onSubmit={joinAction} />
      </div>
    </StaticPageContainer>
  );
}
