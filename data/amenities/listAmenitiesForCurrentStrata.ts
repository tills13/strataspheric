import { mustGetCurrentStrata } from "../stratas/getStrataByDomain";
import { listAmenities } from "./listAmentities";

export async function listAmenitiesForCurrentStrata() {
  const strata = await mustGetCurrentStrata();
  return listAmenities({ strataId: strata.id });
}
