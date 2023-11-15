import { notFound } from "next/navigation";
import { auth } from "../../../auth";
import { GlobalDashboardHeader } from "../../../components/GlobalDashboardHeader";
import { getCurrentStrata } from "../../../data/stratas/getStrata";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider session={session}>
      <GlobalDashboardHeader session={session} strata={strata} />
      <div>{children}</div>
    </SessionProvider>
  );
}
