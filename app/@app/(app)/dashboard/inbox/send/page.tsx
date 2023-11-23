import * as styles from "./style.css";

import { notFound } from "next/navigation";

import { auth } from "../../../../../../auth";
import { SendInboxMessageForm } from "../../../../../../components/SendInboxMessageForm";
import { getCurrentStrata } from "../../../../../../db/stratas/getStrata";
import { sendInboxMessageAction } from "../actions";

export const runtime = "edge";

export default async function Page() {
  const strata = await getCurrentStrata();
  const u = await auth();

  if (!strata) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <SendInboxMessageForm
          isFromNonMember={!u?.user}
          sendInboxMessageAction={sendInboxMessageAction.bind(
            undefined,
            strata.id,
            undefined,
          )}
        />
      </div>
    </div>
  );
}
