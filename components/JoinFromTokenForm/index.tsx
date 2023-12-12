"use client";

import * as buttonStyles from "../Button/style.css";
import * as styles from "./style.css";

import React from "react";

import { Strata, StrataMembership } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Header } from "../Header";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

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
      <Header className={styles.header0} priority={2}>
        Welcome to Strataspheric, {membership.name}
      </Header>

      <Header className={styles.header1} priority={3}>
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

      <StatusButton
        className={classnames(
          buttonStyles.fullWidth,
          buttonStyles.colors.primary,
          buttonStyles.buttonSizes.large,
        )}
        type="submit"
      >
        Set Password
      </StatusButton>
    </form>
  );
}
