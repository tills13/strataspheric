import { notFound } from "next/navigation";

import { Strata } from "..";
import { getDomain } from "../../utils/getDomain";
import { findStratas } from "./findStratas";

export async function mustGetCurrentStrata(): Promise<Strata> {
  const s = await getCurrentStrata();

  if (!s) {
    notFound();
    // throw new Error("invariant: strata should exist");
  }

  return s;
}

export function getCurrentStrata() {
  return getStrataByDomain(getDomain());
}

export async function getStrataByDomain(
  domain: string,
): Promise<Strata | undefined> {
  const stratas = await findStratas({ domain });
  return stratas?.[0];
}
