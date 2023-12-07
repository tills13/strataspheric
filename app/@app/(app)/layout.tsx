import { Metadata, ResolvingMetadata } from "next";

import { GlobalDashboardHeader } from "../../../components/GlobalDashboardHeader";
import { getCurrentStrata } from "../../../data/stratas/getStrataByDomain";

export async function generateMetadata(
  _,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const strata = await getCurrentStrata();
  const p = await parent;

  if (!strata) {
    return {};
  }

  return {
    title: `${strata.name} - Strataspheric`,
  };
}

export default async function RootMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalDashboardHeader />
      {children}
    </>
  );
}
