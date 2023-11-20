import * as styles from "./style.css";

import Image from "next/image";

import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { Logo } from "../Logo";
import { Wordmark } from "../Wordmark";

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
