import React from "react";

import { Input } from "../Input";
import { Stack } from "../Stack";

interface Props extends React.ComponentProps<typeof Stack> {
  defaultName?: string | null;
  defaultEmail?: string | null;
  defaultPhoneNumber?: string | null;
}

export function SendInboxMessageContactDetailsFields({
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  ...delegateProps
}: Props) {
  return (
    <Stack gap="normal" {...delegateProps}>
      <Input
        name="name"
        label="Name"
        placeholder="Jane Doe"
        defaultValue={defaultName || ""}
        disabled={!!defaultName}
        required
      />
      <Input
        name="email_address"
        label="Email Address"
        placeholder="jane@example.com"
        defaultValue={defaultEmail || ""}
        disabled={!!defaultEmail}
        required
      />
      <Input
        name="phone_number"
        label="Phone Number"
        placeholder="604-555-1234"
        defaultValue={defaultPhoneNumber || ""}
        disabled={!!defaultPhoneNumber}
      />
    </Stack>
  );
}
