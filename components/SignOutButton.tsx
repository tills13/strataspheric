"use client";

import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "./Button";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick">;

export function SignOutButton(props: Props) {
  return (
    <Button onClick={() => signOut({ redirect: false })} {...props}>
      Sign Out
    </Button>
  );
}
