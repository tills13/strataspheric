import { redirect } from "next/navigation";

import { GetStartedStatus } from "../../../../components/GetStarted/Status";
import { getStrataByDomain } from "../../../../data/stratas/getStrataByDomain";
import { StaticPageContainer } from "../../StaticPageContainer";

export const runtime = "edge";

export default async function Page({ params }: { params: { domain: string } }) {
  const strata = await getStrataByDomain(decodeURIComponent(params.domain));

  if (!strata) {
    redirect("/get-started");
  }

  return (
    <StaticPageContainer centered>
      <GetStartedStatus strata={strata} />
    </StaticPageContainer>
  );
}
