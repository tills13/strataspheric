import * as styles from "./style.css";

import { redirect } from "next/navigation";

import { GetStartedStatus } from "../../../../../../components/GetStarted/Status";
import { getStrataByDomain } from "../../../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export default async function Page({ params }: { params: { domain: string } }) {
  const strata = await getStrataByDomain(decodeURIComponent(params.domain));

  if (!strata) {
    redirect("/get-started");
  }

  return (
    <div className={styles.pageContainer}>
      <GetStartedStatus strata={strata} />
    </div>
  );
}
