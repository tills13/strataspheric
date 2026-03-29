"use client";

import { MobileSubheaderNavigation } from "../../../../components/MobileSubheaderNavigation";
import { ADMIN_NAV_LINKS } from "./adminNavLinks";

export function AdminMobileSubheaderNavigation() {
  return <MobileSubheaderNavigation links={ADMIN_NAV_LINKS} />;
}
