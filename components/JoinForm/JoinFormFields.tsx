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

      <Input id="name" name="name" placeholder="Name" required />
      <Input id="email" name="email" type="email" placeholder="Email" required />

      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />

      <InfoPanel level="default">
        Create a strong password to protect your account and your strata&apos;s
        data.
      </InfoPanel>
    </Stack>
  );
}
