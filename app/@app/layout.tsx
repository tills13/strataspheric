import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { mustGetCurrentStrata } from "../../data/stratas/getStrata";
import { GlobalDashboardHeader } from "../../components/GlobalDashboardHeader";

export default async function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  return (
    <SessionProvider session={session}>
      <GlobalDashboardHeader session={session} strata={strata} />
      <div>{children}</div>
    </SessionProvider>
  );
}
