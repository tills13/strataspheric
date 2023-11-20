import { redirect } from "next/navigation";

import { GetStartedStatus } from "../../../../../../components/GetStarted/Status";
import { getStrata } from "../../../../../../db/stratas/getStrata";

export const runtime = "edge";

export default async function Page({ params }: { params: { domain: string } }) {
  const strata = await getStrata(decodeURIComponent(params.domain));

  if (!strata) {
    redirect("/get-started");
  }

  return <GetStartedStatus strata={strata} />;
}
