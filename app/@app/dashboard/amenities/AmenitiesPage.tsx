import { mustAuth } from "../../../../auth";
import { AmenityChip } from "../../../../components/AmenityChip";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { NothingHere } from "../../../../components/NothingHere";
import { Stack } from "../../../../components/Stack";
import { UpcomingAmenityBookings } from "../../../../components/UpcomingAmenityBookings";
import { listAmenitiesForCurrentStrata } from "../../../../data/amenities/listAmenitiesForCurrentStrata";
import { can } from "../../../../data/users/permissions";
import { AddNewAmenityButton } from "./AddNewAmenityButton";

export async function AmenitiesPage() {
  const [session, amenities] = await Promise.all([
    mustAuth(true),
    listAmenitiesForCurrentStrata(),
  ]);

  return (
    <DashboardLayout
      actions={
        can(session.user, "stratas.memberships.create") && (
          <AddNewAmenityButton />
        )
      }
      title="Amenities"
    >
      <Stack gap="large">
        <UpcomingAmenityBookings userId={session.user.id} />
        {amenities.length === 0 && (
          <NothingHere>This strata has no amenities.</NothingHere>
        )}
        <Stack>
          {amenities.map((amenity) => (
            <AmenityChip key={amenity.id} amenity={amenity} />
          ))}
        </Stack>
      </Stack>
    </DashboardLayout>
  );
}
