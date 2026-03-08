import { redirect } from "next/navigation";

import { GetStartedStatus } from "../../../../components/GetStarted/Status";
import { getStrataByDomain } from "../../../../data/stratas/getStrataByDomain";
import { StaticPageContainer } from "../../StaticPageContainer";

export default async function Page({
  params,
}: PageProps<"/get-started/[domain]">) {
  const { domain } = await params;
  const strata = await getStrataByDomain(decodeURIComponent(domain));

  if (!strata) {
    redirect("/get-started");
  }

  return (
    <StaticPageContainer centered>
      <GetStartedStatus strata={strata} />
    </StaticPageContainer>
  );
}
