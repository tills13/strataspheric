import { ProtectedPage } from "../../../../components/ProtectedPage";
import { Upsell } from "../../../../components/Upsell";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { AmenitiesPage } from "./AmenitiesPage";

export const runtime = "edge";

const AMENITIES_UPSELL = `
Manage amenity bookings & invoicing directly within Strataspheric.
`.trim();

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  if (!strata.plan.enableAmenities) {
    return (
      <Upsell
        upsellDescription={AMENITIES_UPSELL}
        upsellFeature="Amenities"
        verb="are"
      />
    );
  }

  return (
    <ProtectedPage permissions={["stratas.amenities.view"]}>
      <AmenitiesPage />
    </ProtectedPage>
  );
}
