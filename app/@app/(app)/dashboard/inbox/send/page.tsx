import * as styles from "./style.css";

import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../../../auth";
import { DashboardHeader } from "../../../../../../components/DashboardHeader";
import { SendInboxMessageForm } from "../../../../../../components/SendInboxMessageForm";
import { getStrataPlan } from "../../../../../../data/strataPlans/getStrataPlan";
import { getCurrentStrata } from "../../../../../../data/stratas/getStrataByDomain";
import { sendInboxMessageAction } from "../actions";

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

  return (
    <>
      <DashboardHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <SendInboxMessageForm
            showContactInformationFields={!u?.user}
            sendInboxMessage={sendInboxMessageAction.bind(
              undefined,
              strata.id,
              undefined,
            )}
          />
        </div>
      </div>
    </>
  );
}
