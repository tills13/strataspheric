import { Strata } from "..";
import { getDomain } from "../../utils/getDomain";
import { findStratas } from "./findStratas";

export function getCurrentStrata() {
  return getStrataByDomain(getDomain());
}

export async function getStrataByDomain(
  domain: string,
): Promise<Strata | undefined> {
  const stratas = await findStratas({ domain });
  return stratas?.[0];
}
