import * as styles from "./style.css";

import { Suspense } from "react";

import { protocol, tld } from "../../constants";
import { ContinueWhereYouLeftOffWidget } from "../ContinueWhereYouLeftOffWidget";
import { Group } from "../Group";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Wordmark } from "../Wordmark";

const baseUrl = protocol + "//" + tld;

const FOOTER_LINKS = [
  ["About", "/about"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Contact", "/contact"],
  // ["Pricing", "/pricing"],
];

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
          {FOOTER_LINKS.map(([linkText, link]) => (
            <ExternalLink
              key={linkText}
              href={baseUrl + link}
              target="_blank"
              noUnderline
            >
              <Text color="primary">{linkText}</Text>
            </ExternalLink>
          ))}
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
