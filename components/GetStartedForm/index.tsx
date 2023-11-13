"use client";

import * as styles from "./style.css";

import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { Input } from "../Input";
import { useDeferredValue, useEffect, useState } from "react";

export function GetStartedForm() {
  const [strataName, setStrataName] = useState("");
  const deferredStrataName = useDeferredValue(strataName);

  const suggestedDomain = strataName.replaceAll(/ '/g, "").toLowerCase();

  useEffect(() => {
    // const;
  }, [deferredStrataName]);

  return (
    <form className={styles.getStartedForm}>
      <Header priority={2}>Let's get to know you...</Header>

      <Input name="name" placeholder="Name" />
      <Input name="email" placeholder="Email" />

      <Header priority={2}>Let's get to know your strata...</Header>

      <Input
        name="strata_name"
        placeholder="Strata Name"
        onChange={(e) => setStrataName(e.target.value)}
      />

      {strataName !== "" && <div>{suggestedDomain}.stratum.pages.dev</div>}

      <label className={styles.isPublicField} htmlFor="is_public">
        <Header priority={2}>I want my strata's content to be public</Header>
        <Checkbox id="is_public" name="is_public" />
      </label>

      <Button type="submit">I'm done</Button>
    </form>
  );
}
