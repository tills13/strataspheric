import { notFound } from "next/navigation";

import { auth } from "../../../auth";
import { GlobalDashboardHeader } from "../../../components/GlobalDashboardHeader";
import { getCurrentStrata } from "../../../data/stratas/getStrataByDomain";

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
