import { DashboardHeader } from "../DashboardHeader";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { DashboardLayoutHeader } from "./DashboardLayoutHeader";

interface Props {
  actions?: React.ReactNode;
  title?: string;
  subPageTitle?: string;
}

export function DashboardLayout({
  actions,
  children,
  title,
  subPageTitle,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <DashboardHeader subPageTitle={subPageTitle || title} />
      <Stack flex={1}>
        {(title || actions) && (
          <Group ph="normal" pt="normal" justify="space-between">
            <DashboardLayoutHeader
            // visibleOn={showPageTitleOnDesktop ? "mobile" : undefined}
            >
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
