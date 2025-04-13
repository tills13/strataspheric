import { Input } from "../Input";
import { Stack } from "../Stack";

interface Props extends React.ComponentProps<typeof Stack> {
  defaultName?: string;
  defaultEmail?: string;
  defaultPhoneNumber?: string;
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
        defaultValue={defaultName || ""}
        disabled={!!defaultName}
        required
      />
      <Input
        name="email_address"
        label="Email Address"
        defaultValue={defaultEmail || ""}
        disabled={!!defaultEmail}
        required
      />
      <Input
        name="phone_number"
        label="Phone Number"
        defaultValue={defaultPhoneNumber || ""}
        disabled={!!defaultPhoneNumber}
      />
    </Stack>
  );
}
