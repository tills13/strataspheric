"use client";

import * as styles from "./style.css";

import { useSelectedLayoutSegment } from "next/navigation";

import { Strata } from "../../data";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { GoToStrataButton } from "../GoToStrataButton";
import { Header } from "../Header";
import { HeartIcon } from "../Icon/HeartIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Panel } from "../Panel";
import { Wordmark } from "../Wordmark";

interface Props {
  sessionStratas: Strata[];
}

const baseUrl =
  process.env.NODE_ENV === "development" ? "" : "https://strataspheric.app";

export function GlobalFooter({ sessionStratas }: Props) {
  const isMarketingSegment =
    useSelectedLayoutSegment("marketing") !== "__DEFAULT__";

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

      <Panel className={styles.continuePanel}>
        <Header className={styles.continuePanelHeader} priority={3}>
          Continue where you left off...
        </Header>
        {isMarketingSegment && sessionStratas.length !== 0 ? (
          <ElementGroup
            className={styles.continuePanelList}
            orientation="column"
          >
            {sessionStratas.map((strata) => (
              <GoToStrataButton
                key={strata.domain}
                className={styles.continuePanelListButton}
                strata={strata}
              />
            ))}
          </ElementGroup>
        ) : (
          <ExternalLink href={baseUrl + "/find"}>
            <Button className={styles.continuePanelListButton}>
              Find Your Stratas
            </Button>
          </ExternalLink>
        )}
      </Panel>
    </footer>
  );
}
