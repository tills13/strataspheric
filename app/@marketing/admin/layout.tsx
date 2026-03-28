import * as styles from "./style.css";

import { mustAuthAdmin } from "../../../auth/admin";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await mustAuthAdmin();

  return (
    <div className={styles.adminLayoutContainer}>
      <AdminSidebar />
      <div className={styles.adminContentsContainer}>{children}</div>
    </div>
  );
}
