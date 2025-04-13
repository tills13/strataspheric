import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { Header } from "../../../../../components/Header";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { SendInboxMessageContactDetailsFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageContactDetailsFields";
import { SendInboxMessageFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageFields";
import { getStrataPlan } from "../../../../../data/strataPlans/getStrataPlan";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { upsertFileAction } from "../../files/actions";
import { upsertInvoiceAction } from "../../invoices/actions";
import { createInboxMessageAction } from "../actions";

export const runtime = "edge";

export default async function Page() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const strataPlan = await getStrataPlan(strata.id);

  if (strataPlan.enableInbox !== 1) {
    redirect("/dashboard/inbox");
  }

  // const memberships = await getStrataMemberships(strata.id);

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

          <Header as="h2" mb="large">
            New Message to {strata.name}
          </Header>

          <SendInboxMessageForm
            sendInboxMessage={createInboxMessageAction.bind(
              undefined,
              undefined,
            )}
          >
            {!session?.user && (
              <>
                <Header as="h3">Contact Information</Header>
                <SendInboxMessageContactDetailsFields mb="large" />
              </>
            )}

            <Header as="h3">Message</Header>

            <SendInboxMessageFields
              upsertFile={upsertFileAction.bind(undefined, undefined)}
              upsertInvoice={upsertInvoiceAction.bind(undefined, undefined)}
            />
          </SendInboxMessageForm>
        </div>
      </div>
    </>
  );
}
