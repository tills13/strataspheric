"use client";

import * as styles from "./style.css";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Wordmark } from "../Wordmark";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Header } from "../Header";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { Strata } from "../../data/stratas/getStrata";

interface Props {
  sessionStratas: Strata[];
}

export function GlobalFooter({ sessionStratas }: Props) {
  const isMarketingSegment =
    useSelectedLayoutSegment("marketing") !== "__DEFAULT__";

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
        <p className={styles.madeWith}>
          Made in Canada <HeartIcon className={styles.heartIcon} />
        </p>
      </div>

      {isMarketingSegment && sessionStratas.length !== 0 && (
        <Panel className={styles.continuePanel}>
          <Header className={styles.continuePanelHeader} priority={3}>
            Continue where you left off...
          </Header>
          <ElementGroup
            className={styles.continuePanelList}
            orientation="column"
          >
            {sessionStratas.map((strata) => (
              <ExternalLink
                key={strata.domain}
                href={"https://" + strata.domain}
                target="_blank"
              >
                <Button className={styles.continuePanelListButton}>
                  Go to {strata.name}
                </Button>
              </ExternalLink>
            ))}
          </ElementGroup>
        </Panel>
      )}
    </footer>
  );
}
