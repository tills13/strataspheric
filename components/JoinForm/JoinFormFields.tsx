import { Header } from "../Header";
import { InfoPanel } from "../InfoPanel";
import { Input } from "../Input";
import { Stack } from "../Stack";

interface Props {
  className?: string;
}

export function JoinFormFields({ className }: Props) {
  return (
    <Stack className={className}>
      <Header as="h2">Let&apos;s get to know you...</Header>

      <Input id="name" name="name" label="Name" required />
      <Input id="email" name="email" type="email" label="Email" required />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        required
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        required
      />

      <InfoPanel level="info">
        Create a strong password to protect your account and your strata&apos;s
        data.
      </InfoPanel>
    </Stack>
  );
}
