import * as styles from "./style.css";

import { mustAuthAdmin } from "../../../auth/admin";
import { AdminMobileNav } from "./components/AdminMobileNav";
import { AdminMobileSubheaderNavigation } from "./components/AdminMobileSubheaderNavigation";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await mustAuthAdmin();

  return (
    <div className={styles.adminLayoutContainer}>
      <AdminMobileNav />
      <AdminMobileSubheaderNavigation />
      <AdminSidebar />
      <div className={styles.adminContentsContainer}>{children}</div>
    </div>
  );
}
