"use client";

import * as styles from "./style.css";

import React from "react";

import { Strata, StrataMembership } from "../../data";
import { Button } from "../Button";
import { Header } from "../Header";
import { Input } from "../Input";

interface Props {
  className?: string;
  membership: StrataMembership;
  onSubmit: (fd: FormData) => void;
  strata: Strata;
}

export function JoinFromTokenForm({
  className,
  membership,
  onSubmit,
  strata,
}: Props) {
  return (
    <form action={onSubmit} className={className}>
      <Header className={styles.header} priority={2}>
        Welcome to Strataspheric, {membership.name}
      </Header>

      <Header className={styles.header} priority={2}>
        You have been invited to join {strata.name}
      </Header>

      <Input
        className={styles.input}
        placeholder="Password"
        name="password"
        type="password"
      />

      <Input
        className={styles.input}
        placeholder="Confirm Password"
        name="confirm_password"
        type="password"
      />

      <Button
        className={styles.submitButton}
        type="submit"
        size="large"
        variant="primary"
      >
        Set Password
      </Button>
    </form>
  );
}
