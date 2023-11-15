import * as styles from "./style.css";

import Image from "next/image";
import { InternalLink } from "../Link/InternalLink";
import { GlobalHeader } from "../GlobalHeader";
import { Wordmark } from "../Wordmark";
import { Logo } from "../Logo";

export function GlobalMarketingHeader() {
  return (
    <GlobalHeader className={styles.globalHeader}>
      <Logo className={styles.logo} />

      <InternalLink href="/" noUnderline>
        <h1 className={styles.globalHeaderTitle}>Strataspheric</h1>
      </InternalLink>
    </GlobalHeader>
  );
}