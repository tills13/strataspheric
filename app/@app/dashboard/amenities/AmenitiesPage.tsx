import { s } from "../../../../sprinkles.css";

import { mustAuth } from "../../../../auth";
import { AmenityChip } from "../../../../components/AmenityChip";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Stack } from "../../../../components/Stack";
import { listAmenitiesForCurrentStrata } from "../../../../data/amenities/listAmenitiesForCurrentStrata";
import { can } from "../../../../data/users/permissions";
import { AddNewAmenityButton } from "./AddNewAmenityButton";

export async function AmenitiesPage() {
  const [session, amenities] = await Promise.all([
    mustAuth(true),
    listAmenitiesForCurrentStrata(),
  ]);

  return (
    <div>
      <div className={s({ p: "normal" })}>
        <Group justify="space-between">
          <Header as="h2">Amenities</Header>

          <div>
            {can(session.user, "stratas.memberships.create") && (
              <AddNewAmenityButton />
            )}
          </div>
        </Group>
      </div>

      <Stack ph="normal">
        {amenities.map((amenity) => (
          <AmenityChip key={amenity.id} amenity={amenity} />
        ))}
      </Stack>
    </div>
  );
}
