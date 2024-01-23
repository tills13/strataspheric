import * as styles from "./style.css";

import { SignInForm } from "../../../components/SignInForm";
import { SignInJoinNavigation } from "../../../components/SignInJoinNavigation";
import { StaticPageContainer } from "../StaticPageContainer";

export const runtime = "edge";

export default function Page() {
  return (
    <StaticPageContainer>
      <SignInJoinNavigation className={styles.navigation} />
      <SignInForm />
    </StaticPageContainer>
  );
}
