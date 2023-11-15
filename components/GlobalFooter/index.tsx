import * as styles from "./style.css";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Wordmark } from "../Wordmark";
import { vars } from "../../app/theme.css";

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <Wordmark className={styles.footerWordMark} color={vars.colors.white} />
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
          Made with <HeartIcon className={styles.heartIcon} /> in Canada
        </p>
      </div>
    </footer>
  );
}
