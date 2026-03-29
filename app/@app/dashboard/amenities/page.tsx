import { DashboardLayout } from "../../../../components/DashboardLayout";
import { ProtectedPage } from "../../../../components/ProtectedPage";
import { Upsell } from "../../../../components/Upsell";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { AmenitiesPage } from "./AmenitiesPage";

const AMENITIES_UPSELL =
  "Let residents book shared spaces online. Reduce scheduling conflicts and keep amenity usage fair and transparent.";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  if (!strata.plan.enableAmenities) {
    return (
      <DashboardLayout title="Amenities">
        <Upsell
          upsellDescription={AMENITIES_UPSELL}
          upsellFeature="Amenities"
          verb="are"
        />
      </DashboardLayout>
    );
  }

  return (
    <ProtectedPage permissions={["stratas.amenities.view"]}>
      <AmenitiesPage />
    </ProtectedPage>
  );
}
