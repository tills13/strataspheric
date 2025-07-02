"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { tld } from "../../constants";
import { PricingPlan } from "../../data/strataPlans/constants";
import { useSession } from "../../hooks/useSession";
import { useTimeDeferredValue } from "../../hooks/useTimeDeferredValue";
import { normalizeStrataNameToSubdomain } from "../../utils/normalizeStrataNameToSubdomain";
import { pluralize } from "../../utils/pluralize";
import { Group } from "../Group";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../Icon/CircleErrorIcon";
import { CycleIcon } from "../Icon/CycleIcon";
import { RightIcon } from "../Icon/RightIcon";
import { InfoPanel } from "../InfoPanel";
import { Input } from "../Input";
import { JoinFormFields } from "../JoinForm/JoinFormFields";
import { Money } from "../Money";
import { RadioButton } from "../RadioButton";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { useFormState } from "./Form";

export function GetStartedFormFields({
  selectedPlan,
}: {
  selectedPlan: PricingPlan;
}) {
  const session = useSession();
  const [isDomainAvailable, setIsDomainAvailable] = useState(undefined);
  const [numUnits, setNumUnits] = useState(0);
  const [strataName, setStrataName] = useState("");
  const deferredStrataName = useTimeDeferredValue(strataName);
  const suggestedSubdomain = normalizeStrataNameToSubdomain(deferredStrataName);

  const state = useFormState();

  useEffect(() => {
    async function fetchIsDomainAvailable() {
      setIsDomainAvailable(undefined);

      const r = await fetch(
        "/api/stratas/domainAvailable?domain=" +
          encodeURIComponent(`${suggestedSubdomain}.${tld}`),
      );
      const rJson = await r.json();

      setIsDomainAvailable(rJson.isAvailable);
    }

    if (!suggestedSubdomain) {
      return;
    }

    fetchIsDomainAvailable();
  }, [suggestedSubdomain]);

  if (!state?.step || state.step === "CREATE_ACCOUNT") {
    return (
      <>
        <JoinFormFields />

        {state?.error && <InfoPanel level="error">{state.error}</InfoPanel>}

        <StatusButton color="primary" icon={<RightIcon />} type="submit">
          Next
        </StatusButton>
      </>
    );
  } else if (state.step === "CREATE_STRATA") {
    return (
      <>
        <Header as="h2">Let&apos;s get to know your strata...</Header>

        <Input
          name="strata_name"
          label="Strata Name"
          onChange={(e) => setStrataName(e.target.value)}
          required
        />

        <Input
          name="strata_main_contact"
          label="Main Contact Email"
          type="email"
          defaultValue={session?.user.email || ""}
          required
        />

        {suggestedSubdomain !== "" && (
          <div className={styles.subdomainField}>
            {isDomainAvailable === undefined && suggestedSubdomain ? (
              <CycleIcon className={styles.subdomainStatusLoading} />
            ) : isDomainAvailable ? (
              <CircleCheckIcon className={styles.subdomainStatusOk} />
            ) : (
              <CircleErrorIcon className={styles.subdomainStatusError} />
            )}

            <div>
              <span className={styles.subdomainFieldSubdomain}>
                {suggestedSubdomain}
              </span>
              <span className={styles.subdomainFieldRootDomain}>.{tld}</span>
            </div>

            <input
              name="strata_domain"
              type="hidden"
              value={`${suggestedSubdomain}.${tld}`}
            />
          </div>
        )}

        <Input
          name="num_units"
          min={1}
          type="number"
          label="# of Units"
          onChange={(e) => {
            setNumUnits(parseInt(e.target.value, 10));
          }}
        />

        <InfoPanel
          header={<Header as="h3">Content Visibility</Header>}
          level="default"
        >
          <Text>
            Controls access to strata content by outsiders. If your strata is
            public, visitors to your Strataspheric page that are not members
            will be able to see content on your dashboard, certain files that
            are public, and upcoming events.
          </Text>
          <RadioButton
            className={s({ flex: 1 })}
            name="visibility"
            options={["private", "public"]}
            defaultValue="private"
          />
        </InfoPanel>

        {selectedPlan.pricePerUnit !== undefined && (
          <Group justify="space-between">
            <Text>
              <Text as="span" fontSize="xxl" fw="bold">
                {numUnits}
              </Text>{" "}
              {pluralize("Unit", numUnits)}
            </Text>

            <Group gap="xs">
              <Money amount={numUnits * selectedPlan.pricePerUnit} />
              <Text color="secondary" fw="bold">
                per month
              </Text>
            </Group>
          </Group>
        )}

        {state?.error && <InfoPanel level="error">{state.error}</InfoPanel>}

        <StatusButton color="primary" icon={<RightIcon />} type="submit">
          Next
        </StatusButton>
      </>
    );
  } else if (state.step === "SUBMIT_PAYMENT") {
    return (
      <>
        <div id="payment-element" />

        <input
          name="planName"
          type="hidden"
          value={selectedPlan.name.toLowerCase()}
        />

        {state?.error && <InfoPanel level="error">{state.error}</InfoPanel>}

        <StatusButton color="primary" icon={<RightIcon />} type="submit">
          Next
        </StatusButton>
      </>
    );
  }
}
