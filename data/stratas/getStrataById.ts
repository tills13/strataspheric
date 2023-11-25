import { Strata } from "..";
import { findStrata } from "./findStrata";

export async function getStrataById(id: string): Promise<Strata | undefined> {
  return findStrata({ id });
}
