import { notFound } from "next/navigation";

import { auth } from "../../../auth";
import { GlobalDashboardHeader } from "../../../components/GlobalDashboardHeader";
import { getCurrentStrata } from "../../../db/stratas/getStrata";

export default async function RootMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <>
      <GlobalDashboardHeader session={session} strata={strata} />
      {children}
    </>
  );
}
