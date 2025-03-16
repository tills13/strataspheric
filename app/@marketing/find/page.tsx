import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { Group } from "../../../components/Group";
import { Header } from "../../../components/Header";
import { Panel } from "../../../components/Panel";
import { Stack } from "../../../components/Stack";
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
      <div className={styles.strataSearchContainer}>
        <Stack>
          <Header priority={2}>Find a Strata</Header>

          <StrataSearchForm
            name={searchParams["name"]}
            strataPlan={searchParams["strataPlan"]}
            address={searchParams["address"]}
          />
        </Stack>
        <Stack>
          <Header priority={2}>Stratas</Header>

          <Suspense fallback={<div>Searching...</div>}>
            <FindAStrata searchParams={searchParams} />
          </Suspense>
        </Stack>
      </div>
    </StaticPageContainer>
  );
}
