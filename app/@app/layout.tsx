import { Metadata } from "next";

import { getCurrentStrata } from "../../data/stratas/getStrataByDomain";
import { SWRProvider } from "./SWRProvider";

export async function generateMetadata(): Promise<Metadata> {
  // _: unknown,
  // parent: ResolvingMetadata,
  const strata = await getCurrentStrata();
  // const p = await parent;

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
  return <SWRProvider>{children}</SWRProvider>;
}
