import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { Header } from "../../../components/Header";
import { Panel } from "../../../components/Panel";
import { classnames } from "../../../utils/classnames";
import { StaticPageContainer } from "../StaticPageContainer";
import { FindAStrata } from "./FindAStrata";
import { StrataSearchForm } from "./StrataSearchForm";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <StaticPageContainer>
      <div className={styles.strataSearchPageContainer}>
        <div className={styles.strataSearchContainer}>
          <Header
            className={classnames(styles.header, s({ mb: "large" }))}
            priority={2}
          >
            Find a Strata
          </Header>
          <Panel>
            <StrataSearchForm
              className={classnames(styles.strataSearchForm)}
              name={searchParams["name"]}
              strataPlan={searchParams["strataPlan"]}
              address={searchParams["address"]}
            />
          </Panel>
        </div>
        <div className={styles.stratasListContainer}>
          <Header
            className={classnames(styles.header, s({ mb: "large" }))}
            priority={2}
          >
            Stratas
          </Header>

          <Suspense fallback={<div>Searching...</div>}>
            <FindAStrata searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </StaticPageContainer>
  );
}
