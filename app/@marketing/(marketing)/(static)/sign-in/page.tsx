import * as styles from "./style.css";

import { SignInForm } from "../../../../../components/SignInForm";
import { SignInJoinNavigation } from "../../../../../components/SignInJoinNavigation";

export const runtime = "edge";

export default function Page() {
  return (
    <div>
      <SignInJoinNavigation className={styles.navigation} />
      <SignInForm />
    </div>
  );
}
