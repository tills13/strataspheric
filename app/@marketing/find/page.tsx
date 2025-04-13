import * as styles from "./style.css";

import { Suspense } from "react";

import { PageProps } from "../../../.next/types/app/@marketing/find/page";
import { Header } from "../../../components/Header";
import { Stack } from "../../../components/Stack";
import { StaticPageContainer } from "../StaticPageContainer";
import { FindAStrata } from "./FindAStrata";
import { StrataSearchForm } from "./StrataSearchForm";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const { name, strataPlan, address } = await searchParams;

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
