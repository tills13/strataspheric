import { LayoutProps } from "../../../../.next/types/app/@app/dashboard/invoices/layout";
import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { can } from "../../../../data/users/permissions";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";

export default async function Layout({ children }: LayoutProps) {
  const session = await mustAuth();

  return (
    <DashboardLayout
      title="Invoices"
      actions={
        can(session.user, "stratas.invoices.create") && (
          <CreateNewInvoiceButton />
        )
      }
    >
      {children}
    </DashboardLayout>
  );
}
