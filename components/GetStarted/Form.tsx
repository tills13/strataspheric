"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { SubmitGetStartedState } from "../../app/@marketing/get-started/actions";
import { tld } from "../../constants";
import { PricingPlan } from "../../data/strataPlans/constants";
import { useTimeDeferredValue } from "../../hooks/useTimeDeferredValue";
import { classnames } from "../../utils/classnames";
import { normalizeStrataNameToSubdomain } from "../../utils/normalizeStrataNameToSubdomain";
import { pluralize } from "../../utils/pluralize";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../Icon/CircleErrorIcon";
import { CycleIcon } from "../Icon/CycleIcon";
import { RightIcon } from "../Icon/RightIcon";
import { Input } from "../Input";
import { JoinFormFields } from "../JoinForm/JoinFormFields";
import { Money } from "../Money";
import { Panel } from "../Panel";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;
  selectedPlan: PricingPlan;
  session: Session | null;
  submitGetStarted: (
    state: SubmitGetStartedState,
    fd: FormData,
  ) => Promise<SubmitGetStartedState>;
}

export function GetStartedForm({
  className,
  session,
  selectedPlan,
  submitGetStarted,
}: Props) {
  const [state, action] = useFormState(
    async (state: SubmitGetStartedState, fd: FormData) => {
      const nextState = await submitGetStarted(state, fd);

      if (nextState?.success === true) {
        await signIn("credentials", {
          email: fd.get("email"),
          password: fd.get("password"),
          redirect: false,
        });

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
      {!session && (
        <div className={s({ mb: "xl" })}>
          <JoinFormFields />
        </div>
      )}

      <Header className={styles.header2} priority={2}>
        Let&apos;s get to know your strata...
      </Header>

      <Input
        className={styles.input}
        name="strata_name"
        placeholder="Strata Name"
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

      <label className={styles.isPublicField} htmlFor="is_public">
        <Header priority={3}>
          I want my strata&apos;s content to be public
        </Header>
        <Checkbox id="is_public" name="is_public" defaultChecked />
      </label>

      <Header className={styles.header3} priority={3}>
        How many units are in your strata?
      </Header>

      <Input
        className={styles.input}
        name="num_units"
        min={1}
        type="number"
        placeholder="# of Units"
        onChange={(e) => {
          setNumUnits(parseInt(e.target.value, 10));
        }}
      />

      {selectedPlan.pricePerUnit !== undefined && (
        <div className={styles.estimateContainer}>
          <div>
            <span className={styles.estimateSummarySeats}>{numUnits}</span>{" "}
            {pluralize("Unit", numUnits)}
          </div>

          <div>
            <Money amount={numUnits * selectedPlan.pricePerUnit} />
            <span className={styles.estimatePeriod}>per month</span>
          </div>
        </div>
      )}

      {state?.success === false && state?.error && <Panel>{state.error}</Panel>}

      <StatusButton color="primary" iconRight={<RightIcon />} type="submit">
        Let&apos;s Get Started
      </StatusButton>
    </form>
  );
}
