import { s } from "../../../../sprinkles.css";

import { notFound } from "next/navigation";

import { auth } from "../../../../auth";
import { AmenityChip } from "../../../../components/AmenityChip";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Stack } from "../../../../components/Stack";
import { listAmenitiesForCurrentStrata } from "../../../../data/amenities/listAmenitiesForCurrentStrata";
import { can, p } from "../../../../data/users/permissions";
import { AddNewAmenityButton } from "./AddNewAmenityButton";
import { createAmenityBookingAction, upsertAmenityAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const [amenities] = await Promise.all([listAmenitiesForCurrentStrata()]);

  return (
    <>
      <DashboardHeader />

      <div>
        <div className={s({ p: "normal" })}>
          <Group justify="space-between">
            <Header as="h2">Amenities</Header>

            <div>
              {can(session?.user, p("stratas", "memberships", "create")) && (
                <AddNewAmenityButton
                  upsertAmenity={upsertAmenityAction.bind(undefined, undefined)}
                />
              )}
            </div>
          </Group>
        </div>

        <Stack className={s({ ph: "normal" })}>
          {amenities.map((amenity) => (
            <AmenityChip
              key={amenity.id}
              amenity={amenity}
              createAmenityBooking={createAmenityBookingAction.bind(
                undefined,
                amenity.id,
              )}
            />
          ))}
        </Stack>
      </div>
    </>
  );
}
