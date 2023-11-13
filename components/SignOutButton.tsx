"use client";

import { signOut } from "next-auth/react";
import { Button } from "./Button";
import React from "react";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick">;

export function SignOutButton(props: Props) {
  return (
    <Button onClick={() => signOut()} {...props}>
      Sign Out
    </Button>
  );
}
