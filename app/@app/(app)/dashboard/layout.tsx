import { notFound, redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { getCurrentStrata } from "../../../../db/stratas/getStrata";

export default async function Layout({ children }) {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  if (!session && !strata.isPublic) {
    redirect("/");
  }

  return (
    <>
      <DashboardHeader />

      {children}
    </>
  );
}
