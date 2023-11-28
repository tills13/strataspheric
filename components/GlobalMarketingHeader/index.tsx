import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { Logo } from "../Logo";

export function GlobalMarketingHeader() {
  return (
    <GlobalHeader className={styles.globalHeader}>
      <Logo className={styles.logo} />

      <InternalLink className={linkStyles.noUnderline} href="/">
        <h1 className={styles.globalHeaderTitle}>Strataspheric</h1>
      </InternalLink>
    </GlobalHeader>
  );
}
