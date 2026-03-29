"use client";

import { SignOutLink } from "../../../../components/SignOutLink";
import { MobileNav } from "../../../../components/MobileNav";
import { Stack } from "../../../../components/Stack";

export function AdminMobileNav() {
  return (
    <MobileNav title="Admin">
      <Stack gap="small">
        <SignOutLink />
      </Stack>
    </MobileNav>
  );
}
