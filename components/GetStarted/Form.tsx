"use client";

import * as styles from "./style.css";

import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { Input } from "../Input";
import { useDeferredValue, useEffect, useState } from "react";
import { CycleIcon } from "../Icon/CycleIcon";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../Icon/CircleErrorIcon";
import { InternalLink } from "../Link/InternalLink";
import { pluralize } from "../../utils/pluralize";
import { classnames } from "../../utils/classnames";
import { Money } from "../Money";

const rootDomain = "strataspheric.app";

interface Props {
  className?: string;
  submitGetStarted: (fd: FormData) => void;
}

export function GetStartedForm({ className, submitGetStarted }: Props) {
  const [strataName, setStrataName] = useState("");
  const [isDomainAvailable, setIsDomainAvailable] = useState(undefined);
  const deferredStrataName = useDeferredValue(strataName);
  const [numUnits, setNumUnits] = useState(0);
  const [numSeats, setNumSeats] = useState(0);

  const suggestedSubdomain = deferredStrataName
    .replaceAll(/[ ']/g, "")
    .toLowerCase();

  useEffect(() => {
    async function fetchIsDomainAvailable() {
      setIsDomainAvailable(undefined);

      const r = await fetch(
        "/api/stratas/domainAvailable?domain=" +
          encodeURIComponent(`${suggestedSubdomain}.${rootDomain}`)
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
      <Header priority={2}>Let's get to know you...</Header>

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

      <Header priority={2}>Let's get to know your strata...</Header>

      <Input
        name="strata_name"
        placeholder="Strata Name"
        onChange={(e) => setStrataName(e.target.value)}
        required
      />

      {strataName !== "" && (
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
        <Header priority={3}>I want my strata's content to be public</Header>
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
          setNumSeats(parseInt(e.target.value, 10));
        }}
      />

      <Header priority={3}>Paid Seats</Header>

      <p>
        We recommend 1 seat per unit so that at least someone per unit can view
        and download important documents, but you can choose as many or as few
        seats as you'd like. Non-paid seats will be able to sign in and view
        content, but not download or interact with it. For more info on pricing,
        refer to the <InternalLink href="/pricing">pricing</InternalLink> page.
      </p>

      <div className={styles.numSeatsField}>
        1
        <input
          className={styles.numSeatsInput}
          name="num_seats"
          type="range"
          min={1}
          max={numUnits}
          disabled={numUnits === 0}
          onChange={(e) => setNumSeats(parseInt(e.target.value, 10))}
          value={numSeats}
        />
        {numUnits}
      </div>

      <Header priority={3}>Estimate</Header>

      <div className={styles.estimateContainer}>
        <div className={styles.estimateSummary}>
          <span className={styles.estimateSummarySeats}>{numSeats}</span>{" "}
          {pluralize("Seat", numSeats)}
        </div>

        <div>
          <Money amount={10 + numSeats * 1} />
          <span className={styles.estimatePeriod}>per month</span>
        </div>
      </div>

      <Button type="submit" variant="primary" size="large">
        Let's Get Started
      </Button>
    </form>
  );
}
