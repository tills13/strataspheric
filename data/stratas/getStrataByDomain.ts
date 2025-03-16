import { notFound } from "next/navigation";
import { cache } from "react";

import { Strata } from "..";
import { getDomain } from "../../utils/getDomain";
import { findStratas } from "./findStratas";

export async function mustGetCurrentStrata(): Promise<Strata> {
  const s = await getCurrentStrata();

  if (!s) {
    notFound();
  }

  return s;
}

export function getCurrentStrata() {
  return getStrataByDomain(getDomain());
}

export const getStrataByDomain = cache(
  async (domain: string): Promise<Strata | undefined> => {
    const stratas = await findStratas({ domain });
    return stratas?.[0];
  },
);
