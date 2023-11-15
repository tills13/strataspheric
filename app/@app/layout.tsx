import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { getCurrentStrata } from "../../data/stratas/getStrata";
import { GlobalDashboardHeader } from "../../components/GlobalDashboardHeader";
import { notFound } from "next/navigation";

export default async function RootDashboardLayout({
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
