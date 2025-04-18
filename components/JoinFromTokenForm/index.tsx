"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React from "react";

import { Strata } from "../../data";
import { Header } from "../Header";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;
  membershipName: string;
  onSubmit: (fd: FormData) => void;
  strata: Strata;
}

export function JoinFromTokenForm({
  className,
  membershipName,
  onSubmit,
  strata,
}: Props) {
  return (
    <form action={onSubmit} className={className}>
      <Header className={styles.header0} as="h2">
        Welcome to Strataspheric, {membershipName}
      </Header>

      <Header className={styles.header1} as="h3">
        You have been invited to join {strata.name}
      </Header>

      <Input
        className={s({ mb: "normal", w: "full" })}
        label="Password"
        name="password"
        type="password"
      />

      <Input
        className={s({ mb: "large", w: "full" })}
        label="Confirm Password"
        name="confirm_password"
        type="password"
      />

      <StatusButton color="primary" type="submit">
        Set Password
      </StatusButton>
    </form>
  );
}
