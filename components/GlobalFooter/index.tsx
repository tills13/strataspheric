import * as styles from "./style.css";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Wordmark } from "../Wordmark";
import { vars } from "../../app/theme.css";

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <ExternalLink href="https://strataspheric.app">
          <Wordmark className={styles.footerWordMark} />
        </ExternalLink>
        <div className={styles.footerLinks}>
          <ExternalLink href="http://localhost:3000/about">About</ExternalLink>
          <ExternalLink href="http://localhost:3000/pricing">
            Pricing
          </ExternalLink>
          <ExternalLink href="http://localhost:3000/terms">Terms</ExternalLink>
          <ExternalLink href="http://localhost:3000/privacy">
            Privacy
          </ExternalLink>
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
