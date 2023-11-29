"use client";

import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "./Button";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick">;

export function SignOutButton(props: Props) {
  return (
    <Button
      onClick={async () => {
        await signOut({ redirect: false });
        location.href = "/";
      }}
      {...props}
    >
      Sign Out
    </Button>
  );
}
