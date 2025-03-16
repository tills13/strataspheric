import * as styles from "./style.css";

import { Suspense } from "react";

import { protocol, tld } from "../../constants";
import { ContinueWhereYouLeftOffWidget } from "../ContinueWhereYouLeftOffWidget";
import { Group } from "../Group";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Stack } from "../Stack";
import { Wordmark } from "../Wordmark";

const baseUrl = protocol + "//" + tld;

export function GlobalFooter() {
  return (
    <footer className={styles.footer}>
      <Stack gap="small">
        <ExternalLink
          className={styles.footerWordMark}
          href={baseUrl + "/"}
          target="_blank"
        >
          <Wordmark />
        </ExternalLink>
        <Group gap="small">
          <ExternalLink href={baseUrl + "/about"} target="_blank">
            About
          </ExternalLink>
          {/* <ExternalLink href={baseUrl + "/pricing"} target="_blank">
            Pricing
          </ExternalLink> */}
          <ExternalLink href={baseUrl + "/terms"} target="_blank">
            Terms
          </ExternalLink>
          <ExternalLink href={baseUrl + "/privacy"} target="_blank">
            Privacy
          </ExternalLink>
          <ExternalLink href={baseUrl + "/contact"} target="_blank">
            Contact
          </ExternalLink>
        </Group>
        <Group gap="small">
          Made in Canada <HeartIcon className={styles.heartIcon} size="small" />
        </Group>
      </Stack>

      <Suspense>
        <ContinueWhereYouLeftOffWidget />
      </Suspense>
    </footer>
  );
}
