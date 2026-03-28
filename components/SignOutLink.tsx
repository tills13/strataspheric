"use client";

import { signOut } from "../auth/actions";
import { Text } from "./Text";

export function SignOutLink() {
  return (
    <button
      onClick={async () => {
        await signOut();
        location.href = "/";
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
      }}
    >
      <Text color="primary" fontSize="normal" fontWeight="bold">
        Sign Out
      </Text>
    </button>
  );
}
