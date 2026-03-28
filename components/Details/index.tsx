import { Stack } from "../Stack";

export function Details({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Stack as="dl" gap="xs" className={className}>
      {children}
    </Stack>
  );
}
