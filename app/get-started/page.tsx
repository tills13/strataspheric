import * as styles from "./style.css";

import { GetStartedForm } from "../../components/GetStartedForm";

export const runtime = "edge";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <GetStartedForm className={styles.getStartedForm} />
    </div>
  );
}
