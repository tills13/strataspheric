import { GlobalDashboardHeader } from "../DashboardNavigation";
import { MobileSubheaderNavigation } from "./MobileSubheaderNavigation";

export function DashboardHeader(
  props: React.ComponentProps<typeof GlobalDashboardHeader>,
) {
  return (
    <>
      <GlobalDashboardHeader {...props} />
      <MobileSubheaderNavigation {...props} />
    </>
  );
}
