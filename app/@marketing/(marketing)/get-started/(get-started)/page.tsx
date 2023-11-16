import * as styles from "./style.css";

import { GetStartedForm } from "../../../../../components/GetStarted/Form";
import { submitGetStarted } from "./actions";

export const runtime = "edge";

export default function Page() {
  return (
    <GetStartedForm
      submitGetStarted={submitGetStarted}
      className={styles.getStartedForm}
    />
  );
}
