"use client";

import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { GetDomainStatusResponseData } from "../../app/api/stratas/domainStatus/route";
import { Strata } from "../../data";
import { GoToStrataLinkButton } from "../GoToStrataLinkButton";
import { Group } from "../Group";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { LoadingIcon } from "../LoadingIcon";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  strata: Strata;
}

export function GetStartedStatus({ strata }: Props) {
  const domain = strata.domain;
  const [domainStatus, setDomainStatus] = useState("pending");

  useEffect(() => {
    let t: number | NodeJS.Timeout;

    async function loadDomainStatus() {
      const r = await fetch(
        "/api/stratas/domainStatus?domain=" + encodeURIComponent(domain),
      );
      const rJson = (await r.json()) as GetDomainStatusResponseData;

      setDomainStatus(rJson.status);

      if (rJson.status !== "active") {
        t = setTimeout(loadDomainStatus, 5_000);
      }
    }

    loadDomainStatus();

    return () => {
      clearTimeout(t);
    };
  });

  return (
    <Stack className={styles.statusContainer}>
      <Header priority={2}>Creating your strata...</Header>

      {domainStatus === "active" ? (
        <Group gap="small">
          <CircleCheckIcon className={styles.statusPageCheckIcon} />
          <Text>
            your strata is ready to go! Click the button below to continue.
          </Text>
        </Group>
      ) : (
        <Group gap="small" align="start">
          <LoadingIcon className={styles.statusPageLoadingIcon} />
          <Text>
            We are initializing and setting up <b>{strata.name}</b> for you.
            This may take a few minutes. You can stay and wait or come back to
            this page later to check on the status of this process.
          </Text>
        </Group>
      )}

      <GoToStrataLinkButton
        disabled={domainStatus !== "active"}
        buttonSize="xl"
        path="/onboarding"
        strata={strata}
        buttonColor="primary"
      />
    </Stack>
  );
}
