import { Strata } from "..";
import { findStratas } from "./findStratas";

export async function getStrataById(id: string): Promise<Strata | undefined> {
  const stratas = await findStratas({ id });
  return stratas?.[0];
}
