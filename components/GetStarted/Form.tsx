"use client";

import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { useTimeDeferredValue } from "../../hooks/useTimeDeferredValue";
import { classnames } from "../../utils/classnames";
import { normalizeStrataNameToSubdomain } from "../../utils/normalizeStrataNameToSubdomain";
import { pluralize } from "../../utils/pluralize";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../Icon/CircleErrorIcon";
import { CycleIcon } from "../Icon/CycleIcon";
import { Input } from "../Input";
import { Money } from "../Money";

const rootDomain = "strataspheric.app";

interface Props {
  className?: string;
  submitGetStarted: (fd: FormData) => void;
}

export function GetStartedForm({ className, submitGetStarted }: Props) {
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
          encodeURIComponent(`${suggestedSubdomain}.${rootDomain}`),
      );
      const rJson = await r.json();

      setIsDomainAvailable(rJson.isAvailable);
    }

    fetchIsDomainAvailable();
  }, [suggestedSubdomain]);

  return (
    <form
      action={submitGetStarted}
      className={classnames(styles.getStartedForm, className)}
    >
      <Header priority={2}>Let&apos;s get to know you...</Header>

      <Input name="name" placeholder="Name" required />

      <Input name="email" placeholder="Email" required />

      <Header priority={3}>A password to protect your account</Header>

      <Input name="password" placeholder="Password" type="password" required />
      <Input
        name="confirm_password"
        placeholder="Confirm Password"
        type="password"
        required
      />

      <Header priority={2}>Let&apos;s get to know your strata...</Header>

      <Input
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
            <span className={styles.subdomainFieldRootDomain}>
              .{rootDomain}
            </span>
          </div>

          <input
            name="strata_domain"
            type="hidden"
            value={`${suggestedSubdomain}.${rootDomain}`}
          />
        </div>
      )}

      <label className={styles.isPublicField} htmlFor="is_public">
        <Header priority={3}>
          I want my strata&apos;s content to be public
        </Header>
        <Checkbox id="is_public" name="is_public" defaultChecked />
      </label>

      <Header priority={3}>How many units are in your strata?</Header>

      <Input
        name="num_units"
        min={1}
        type="number"
        placeholder="# of Units"
        onChange={(e) => {
          setNumUnits(parseInt(e.target.value, 10));
        }}
      />

      <Header priority={3}>Estimate</Header>

      <div className={styles.estimateContainer}>
        <div className={styles.estimateSummary}>
          <span className={styles.estimateSummarySeats}>{numUnits}</span>{" "}
          {pluralize("Unit", numUnits)}
        </div>

        <div>
          <Money amount={numUnits * 1} />
          <span className={styles.estimatePeriod}>per month</span>
        </div>
      </div>

      <Button type="submit" variant="primary" size="large">
        Let&apos;s Get Started
      </Button>
    </form>
  );
}
