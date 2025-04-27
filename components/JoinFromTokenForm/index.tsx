"use client";

import React from "react";

import { Strata } from "../../data";
import { Header } from "../Header";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

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
      <Stack>
        <Header as="h2">
          Welcome to Strataspheric,{" "}
          <Text as="span" color="secondary" fontFamily="unset" fontSize="unset">
            {membershipName}
          </Text>
        </Header>

        <Text color="secondary" mb="large">
          You have been invited to join <b>{strata.name}</b> on Strataspheric.
          Finish setting up your account be creating a password. After you've
          signed in, you can complete your Strataspheric profile.
        </Text>

        <Input label="Password" name="password" type="password" />

        <Input
          label="Confirm Password"
          name="confirm_password"
          type="password"
        />

        <StatusButton color="primary" type="submit">
          Set Password
        </StatusButton>
      </Stack>
    </form>
  );
}
