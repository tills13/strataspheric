"use client";

import React from "react";

import { signOut } from "../auth/actions";
import { Button } from "./Button";
import { SignOutIcon } from "./Icon/SignOutIcon";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick">;

export function SignOutButton(props: Props) {
  return (
    <Button
      onClick={async () => {
        await signOut();
        location.href = "/";
      }}
      icon={<SignOutIcon />}
      iconTextBehaviour="centerRemainder"
      {...props}
    >
      Sign Out
    </Button>
  );
}
