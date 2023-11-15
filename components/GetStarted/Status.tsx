"use client";
import * as styles from "./style.css";

import { useEffect, useState } from "react";
import { Strata } from "../../data/stratas/getStrata";
import { GetDomainStatusResponseData } from "../../app/api/stratas/domainStatus/route";
import { Header } from "../Header";
import { Button } from "../Button";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { LoadingIcon } from "../LoadingIcon";
import { GoToStrataButton } from "../GoToStrataButton";

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
        "/api/stratas/domainStatus?domain=" + encodeURIComponent(domain)
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
    <div>
      <Header className={styles.statusPageTitle} priority={2}>
        Creating custom instance...
      </Header>

      {domainStatus === "active" ? (
        <p className={styles.statusPageText}>
          <CircleCheckIcon className={styles.statusPageCheckIcon} /> your strata
          is ready to go! Click the button below to go to your strata.
        </p>
      ) : (
        <p className={styles.statusPageText}>
          <LoadingIcon className={styles.statusPageLoadingIcon} /> We are
          initializing and setting up {domain} for you. This may take a few
          minutes. You can stay or come back to this page later to check on the
          status of this process.
        </p>
      )}

      <GoToStrataButton
        className={styles.statusPageGoToStrataButton}
        disabled={domainStatus !== "active"}
        size="xl"
        strata={strata}
        variant="primary"
      />
    </div>
  );
}
