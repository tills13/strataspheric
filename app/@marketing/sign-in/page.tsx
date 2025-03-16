import * as styles from "./style.css";

import { SignInForm } from "../../../components/SignInForm";
import { StaticPageContainer } from "../StaticPageContainer";

export const runtime = "edge";

export default function Page() {
  return (
    <StaticPageContainer centered>
      <SignInForm className={styles.signInForm} />
    </StaticPageContainer>
  );
}
