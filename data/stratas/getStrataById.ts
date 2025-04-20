import { Strata } from "..";
import { listStratas } from "./listStratas";

export async function getStrataById(id: string): Promise<Strata | undefined> {
  const stratas = await listStratas({ id });
  return stratas?.[0];
}
