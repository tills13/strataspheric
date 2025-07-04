import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Header } from "../../../../../components/Header";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { SendInboxMessageContactDetailsFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageContactDetailsFields";
import { SendInboxMessageFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageFields";
import { getStrataPlan } from "../../../../../data/strataPlans/getStrataPlan";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export default async function Page() {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  const strataPlan = await getStrataPlan(strata.id);

  if (strataPlan.enableInbox !== 1) {
    redirect("/dashboard/inbox");
  }

  // const memberships = await getStrataMemberships(strata.id);

  return (
    <DashboardLayout>
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          {/* <SendStrataEmailBlastForm
            recipients={memberships.map((m) => ({
              userId: m.userId,
              name: m.name,
              unit: m.unit,
            }))}
          /> */}

          <Header as="h2" mb="large">
            New Message to {strata.name}
          </Header>

          <SendInboxMessageForm>
            {!session?.user && (
              <SendInboxMessageContactDetailsFields mb="large" />
            )}

            <SendInboxMessageFields />
          </SendInboxMessageForm>
        </div>
      </div>
    </DashboardLayout>
  );
}
