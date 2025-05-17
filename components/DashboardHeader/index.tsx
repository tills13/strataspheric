import { GlobalDashboardHeader } from "../GlobalDashboardHeader";
import { MobileSubheaderNavigation } from "./MobileSubheaderNavigation";

export function DashboardHeader() {
  return (
    <>
      <GlobalDashboardHeader />
      <MobileSubheaderNavigation />
    </>
  );
}
