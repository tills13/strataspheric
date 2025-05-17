import { Group } from "../Group";
import { Stack } from "../Stack";

interface Props {
  actions?: React.ReactNode;
  title: React.ReactNode;
}

export function DashboardLayout({
  actions,
  children,
} // title,
: React.PropsWithChildren<Props>) {
  return (
    <Stack>
      <Group ph="normal" pt="normal" justify="end">
        {actions && <div>{actions}</div>}
      </Group>

      {children}
    </Stack>
  );
}
