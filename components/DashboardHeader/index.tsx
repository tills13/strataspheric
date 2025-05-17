import { GlobalDashboardHeader } from "../DashboardNavigation";
import { MobileSubheaderNavigation } from "./MobileSubheaderNavigation";

export function DashboardHeader() {
  return (
    <>
      <GlobalDashboardHeader />
      <MobileSubheaderNavigation />
    </>
  );
}
