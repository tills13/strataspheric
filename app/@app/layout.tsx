import { Metadata, ResolvingMetadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "../../auth";
import { GlobalDashboardHeader } from "../../components/GlobalDashboardHeader";
import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { SWRProvider } from "./SWRProvider";

export async function generateMetadata(
  _: any,
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

export default async function RootAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SWRProvider>
      <SessionProvider session={session}>
        <GlobalDashboardHeader />

        {children}
      </SessionProvider>
    </SWRProvider>
  );
}
