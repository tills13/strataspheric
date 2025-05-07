import { Group } from "../Group";
import { Header } from "../Header";
import { Stack } from "../Stack";
import { NavigateBackButton } from "./NavigateBackButton";

interface Props {
  actions?: React.ReactNode;
  title: React.ReactNode;
}

export function DashboardLayout({
  actions,
  children,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <Stack>
      <Group ph="normal" pt="normal" justify="space-between">
        <Stack h="normal" justify="center">
          <Header as="h2">
            <Group gap="small">
              <NavigateBackButton />
              {title}
            </Group>
          </Header>
        </Stack>
        {actions && <div>{actions}</div>}
      </Group>

      {children}
    </Stack>
  );
}
