import { Metadata, ResolvingMetadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "../../auth";
import { auth as auth2 } from "../../auth2";
import { GlobalDashboardHeader } from "../../components/GlobalDashboardHeader";
import { SessionProvider as SessionProvider2 } from "../../components/SessionProvider";
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
  const session2 = await auth2();

  return (
    <SWRProvider>
      <SessionProvider session={session}>
        <SessionProvider2 session={session2}>
          <GlobalDashboardHeader />

          {children}
        </SessionProvider2>
      </SessionProvider>
    </SWRProvider>
  );
}
