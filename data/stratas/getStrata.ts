import { headers } from "next/headers";
import { db } from "../../db";
import { redirect } from "next/navigation";

export interface Strata {
  id: string;
  name: string;
  domain: string;
  numUnits: number;
  strataId: string;
  streetAddress: string;
  postalCode: string;
  provinceState: string;
  isPublic: boolean;
}

export function getCurrentStrata() {
  const domain = headers().get("host") || "";
  return getStrata(domain);
}

export function mustGetCurrentStrata() {
  const domain = headers().get("host") || "";
  return mustGetStrata(domain);
}

export function getStrata(domain: string): Promise<Strata | null> {
  return db()
    .prepare(
      `
      SELECT 
        id,
        name,
        domain,
        num_units AS numUnits,
        strata_id AS strataId,
        street_address AS streetAddress,
        postal_code AS postalCode,
        province_state AS provinceState,
        is_public AS isPublic 
      FROM stratas 
      WHERE domain = ?
      `
    )
    .bind(domain)
    .first();
}

export async function mustGetStrata(domain: string): Promise<Strata> {
  const strata = await getStrata(domain);

  if (!strata) {
    redirect("/");
  }

  return strata;
}
