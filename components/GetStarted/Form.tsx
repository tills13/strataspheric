"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useActionState, useEffect, useState } from "react";

import { SubmitGetStartedState } from "../../app/@marketing/get-started/actions";
import { signIn } from "../../auth/actions";
import { Session } from "../../auth/types";
import { tld } from "../../constants";
import { PricingPlan } from "../../data/strataPlans/constants";
import { useSession } from "../../hooks/useSession";
import { useTimeDeferredValue } from "../../hooks/useTimeDeferredValue";
import { classnames } from "../../utils/classnames";
import * as formdata from "../../utils/formdata";
import { normalizeStrataNameToSubdomain } from "../../utils/normalizeStrataNameToSubdomain";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../Icon/CircleErrorIcon";
import { CycleIcon } from "../Icon/CycleIcon";
import { RightIcon } from "../Icon/RightIcon";
import { InfoPanel } from "../InfoPanel";
import { Input } from "../Input";
import { JoinFormFields } from "../JoinForm/JoinFormFields";
import { Panel } from "../Panel";
import { RadioButton } from "../RadioButton";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
  selectedPlan: PricingPlan;

  submitGetStarted: (
    state: SubmitGetStartedState,
    fd: FormData,
  ) => Promise<SubmitGetStartedState>;
}

export function GetStartedForm({ className, submitGetStarted }: Props) {
  const session = useSession();
  const [state, action] = useActionState(
    async (state: SubmitGetStartedState, fd: FormData) => {
      const nextState = await submitGetStarted(state, fd);

      if (nextState?.success === true) {
        await signIn(
          formdata.getString(fd, "email"),
          formdata.getString(fd, "password"),
        );

        location.href = nextState.redirect;
      }

      return nextState;
    },
    undefined,
  );

  const [strataName, setStrataName] = useState("");
  const [isDomainAvailable, setIsDomainAvailable] = useState(undefined);
  const deferredStrataName = useTimeDeferredValue(strataName);
  const [numUnits, setNumUnits] = useState(0);

  const suggestedSubdomain = normalizeStrataNameToSubdomain(deferredStrataName);

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

  return (
    <form
      action={action}
      className={classnames(styles.getStartedForm, className)}
    >
      <Stack>
        {!session && (
          <div>
            <JoinFormFields />
          </div>
        )}

        <Header as="h2">Let&apos;s get to know your strata...</Header>

        <Input
          name="strata_name"
          label="Strata Name"
          onChange={(e) => setStrataName(e.target.value)}
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
          level="info"
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

        {/* {selectedPlan.pricePerUnit !== undefined && (
          <div className={classnames(styles.estimateContainer)}>
            <div>
              <span className={styles.estimateSummarySeats}>{numUnits}</span>{" "}
              {pluralize("Unit", numUnits)}
            </div>

            <div>
              <Money amount={numUnits * selectedPlan.pricePerUnit} />
              <span className={styles.estimatePeriod}>per month</span>
            </div>
          </div>
        )} */}

        {state?.success === false && state?.error && (
          <Panel>{state.error}</Panel>
        )}

        <StatusButton color="primary" iconRight={<RightIcon />} type="submit">
          Let&apos;s Get Started
        </StatusButton>
      </Stack>
    </form>
  );
}
