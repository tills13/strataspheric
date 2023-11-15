import { GetStartedStatus } from "../../../../../components/GetStarted/Status";
import { getStrata } from "../../../../../data/stratas/getStrata";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page({ params }: { params: { domain: string } }) {
  const strata = await getStrata(params.domain);

  if (!strata) {
    redirect("/get-started");
  }

  return <GetStartedStatus strata={strata} />;
}
