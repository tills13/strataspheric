"use client";

import React from "react";

import { joinFromTokenAction } from "../../app/@marketing/join/actions";
import { signIn } from "../../auth/actions";
import { Strata } from "../../data";
import { StrataMembership } from "../../data/memberships/getStrataMembership";
import * as formdata from "../../utils/formdata";
import { Header } from "../Header";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
  membership: StrataMembership;

  strata: Strata;
  token: string;
}

export function JoinFromTokenForm({
  className,
  membership,
  strata,
  token,
}: Props) {
  return (
    <form
      action={async (fd) => {
        await joinFromTokenAction(token, fd);
        await signIn(membership.email, formdata.getString(fd, "password"));
      }}
      className={className}
    >
      <Stack>
        <Header as="h2">
          Welcome to Strataspheric,{" "}
          <Text as="span" color="secondary" fontFamily="unset" fontSize="unset">
            {membership.name}
          </Text>
        </Header>

        <Text mb="large">
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
