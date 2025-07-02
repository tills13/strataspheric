import { LayoutProps } from "../../../../.next/types/app/@app/dashboard/invoices/layout";
import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Upsell } from "../../../../components/Upsell";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";

const INVOICES_UPSELL = `
Manage your strata's additional revenue and outflows all within Strataspheric.
`.trim();

export default async function Layout({ children }: LayoutProps) {
  const [session, strata] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
  ]);

  if (!strata.plan.enableInvoices) {
    return (
      <Upsell
        p="normal"
        upsellDescription={INVOICES_UPSELL}
        upsellFeature="Invoices"
        verb="are"
      />
    );
  }

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
