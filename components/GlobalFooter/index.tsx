import * as styles from "./style.css";

import { Suspense } from "react";

import { protocol, tld } from "../../constants";
import { ContinueWhereYouLeftOffWidget } from "../ContinueWhereYouLeftOffWidget";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Wordmark } from "../Wordmark";

const baseUrl = protocol + "//" + tld;

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <ExternalLink
          className={styles.footerWordMark}
          href={baseUrl + "/"}
          target="_blank"
        >
          <Wordmark />
        </ExternalLink>
        <div className={styles.footerLinks}>
          <ExternalLink href={baseUrl + "/about"} target="_blank">
            About
          </ExternalLink>
          <ExternalLink href={baseUrl + "/pricing"} target="_blank">
            Pricing
          </ExternalLink>
          <ExternalLink href={baseUrl + "/terms"} target="_blank">
            Terms
          </ExternalLink>
          <ExternalLink href={baseUrl + "/privacy"} target="_blank">
            Privacy
          </ExternalLink>
          <ExternalLink href={baseUrl + "/contact"} target="_blank">
            Contact
          </ExternalLink>
        </div>
        <p className={styles.madeWith}>
          Made in Canada <HeartIcon className={styles.heartIcon} />
        </p>
      </div>

      <Suspense>
        <ContinueWhereYouLeftOffWidget />
      </Suspense>
    </footer>
  );
}
