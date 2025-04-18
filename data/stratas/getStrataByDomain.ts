import { notFound } from "next/navigation";
import { cache } from "react";

import { Strata } from "..";
import { getDomain } from "../../utils/getDomain";
import { listStratas } from "./listStratas";

export async function mustGetCurrentStrata(): Promise<Strata> {
  const s = await getCurrentStrata();

  if (!s) {
    notFound();
  }

  return s;
}

export async function getCurrentStrata() {
  return getStrataByDomain(await getDomain());
}

export const getStrataByDomain = cache(
  async (domain: string): Promise<Strata | undefined> => {
    const stratas = await listStratas({ domain });
    return stratas?.[0];
  },
);
