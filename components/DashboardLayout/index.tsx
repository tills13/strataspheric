import { DashboardHeader } from "../DashboardHeader";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { DashboardLayoutHeader } from "./DashboardLayoutHeader";

interface Props {
  actions?: React.ReactNode;
  noPadding?: boolean;
  title?: string;
  subPageTitle?: string;
}

export function DashboardLayout({
  actions,
  children,
  noPadding,
  title,
  subPageTitle,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <DashboardHeader subPageTitle={subPageTitle} />
      <Stack flex={1} p={noPadding ? undefined : "20"} gap={noPadding ? undefined : "20"}>
        {(title || actions) && (
          <Group justify="space-between">
            <DashboardLayoutHeader>
              {title}
            </DashboardLayoutHeader>
            {actions}
          </Group>
        )}
        {children}
      </Stack>
    </>
  );
}
