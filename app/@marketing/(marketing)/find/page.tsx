import * as styles from "./style.css";

import { Suspense } from "react";

import { Header } from "../../../../components/Header";
import { Stack } from "../../../../components/Stack";
import { StaticPageContainer } from "../StaticPageContainer";
import { FindAStrata } from "./FindAStrata";
import { StrataSearchForm } from "./StrataSearchForm";

export default async function Page({ searchParams }: PageProps<"/find">) {
  const {
    name: rawName,
    strataPlan: rawStrataPlan,
    address: rawAddress,
  } = await searchParams;
  const name = typeof rawName === "string" ? rawName : undefined;
  const strataPlan =
    typeof rawStrataPlan === "string" ? rawStrataPlan : undefined;
  const address = typeof rawAddress === "string" ? rawAddress : undefined;

  return (
    <StaticPageContainer>
      <div className={styles.strataSearchContainer}>
        <Stack>
          <Header as="h2">Find a Strata</Header>

          <StrataSearchForm
            name={name}
            strataPlan={strataPlan}
            address={address}
          />
        </Stack>
        <Stack>
          <Header as="h2">Stratas</Header>

          <Suspense fallback={<div>Searching...</div>}>
            <FindAStrata searchParams={await searchParams} />
          </Suspense>
        </Stack>
      </div>
    </StaticPageContainer>
  );
}
