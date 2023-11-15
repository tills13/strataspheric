import * as styles from "./style.css";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Wordmark } from "../Wordmark";
import { vars } from "../../app/theme.css";
import { InternalLink } from "../Link/InternalLink";

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <ExternalLink href="https://strataspheric.app" target="_blank">
          <Wordmark className={styles.footerWordMark} />
        </ExternalLink>
        <div className={styles.footerLinks}>
          <InternalLink href="/about">About</InternalLink>
          <InternalLink href="/pricing">Pricing</InternalLink>
          <InternalLink href="/terms">Terms</InternalLink>
          <InternalLink href="/privacy">Privacy</InternalLink>
        </div>
      </div>
      <div>
        <p className={styles.madeWith}>
          Made in Canada <HeartIcon className={styles.heartIcon} />
        </p>
      </div>
    </footer>
  );
}
