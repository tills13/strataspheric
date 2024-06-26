import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { getStrataMemberships } from "../../../../../data/strataMemberships/getStrataMemberships";
import { getStrataPlan } from "../../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { upsertFileAction } from "../../actions";
import { upsertInvoiceAction } from "../../invoices/actions";
import { createInboxMessageAction } from "../actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();
  const u = await auth();

  if (!strata) {
    notFound();
  }

  const strataPlan = await getStrataPlan(strata.id);

  if (strataPlan.enableInbox !== 1) {
    redirect("/dashboard/inbox");
  }

  const memberships = await getStrataMemberships(strata.id);

  return (
    <>
      <DashboardHeader />

      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          {/* <SendStrataEmailBlastForm
            recipients={memberships.map((m) => ({
              userId: m.userId,
              name: m.name,
              unit: m.unit,
            }))}
            sendInboxMessage={sendInboxMessageAction.bind(
              undefined,
              strata.id,
              undefined,
            )}
          /> */}

          <SendInboxMessageForm
            showContactInformationFields={!u?.user}
            upsertFile={upsertFileAction.bind(undefined, undefined)}
            upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
            sendInboxMessage={createInboxMessageAction.bind(
              undefined,
              undefined,
            )}
          />
        </div>
      </div>
    </>
  );
}
