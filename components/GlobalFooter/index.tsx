import * as styles from "./style.css";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { ElementGroup } from "../ElementGroup";
import { Header } from "../Header";

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <Header className={styles.footerHeader} priority={3}>
          Stratum
        </Header>
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
