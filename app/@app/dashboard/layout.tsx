import { notFound, redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getCurrentStrata } from "../../../data/stratas/getStrata";

import { DashboardHeader } from "../../../components/DashboardHeader";

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
