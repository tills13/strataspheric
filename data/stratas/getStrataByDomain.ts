import { Strata } from "..";
import { getDomain } from "../../utils/getDomain";
import { findStrata } from "./findStrata";

export function getCurrentStrata() {
  return getStrataByDomain(getDomain());
}

export async function getStrataByDomain(
  domain: string,
): Promise<Strata | undefined> {
  return findStrata({ domain });
}
