import * as styles from "./style.css";

import { GetStartedForm } from "../../../components/GetStartedForm";

import { submitGetStarted } from "./actions";

export const runtime = "edge";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <GetStartedForm
        submitGetStarted={submitGetStarted}
        className={styles.getStartedForm}
      />
    </div>
  );
}
