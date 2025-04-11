import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Panel } from "../../../../components/Panel";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";
import { listAmenitiesForCurrentStrata } from "../../../../data/amenities/listAmenitiesForCurrentStrata";
import { can, p } from "../../../../data/users/permissions";
import { getImageUri } from "../../../../utils/files";
import { AddNewAmenityButton } from "./AddNewAmenityButton";
import { BookAmenityButton } from "./BookAmenityButton";
import { createAmenityBookingAction, upsertAmenityAction } from "./actions";

export const runtime = "edge";

export type Amenity = Awaited<
  ReturnType<typeof listAmenitiesForCurrentStrata>
>[number];

export default async function Page() {
  const [session, amenities] = await Promise.all([
    auth(),
    listAmenitiesForCurrentStrata(),
  ]);

  return (
    <>
      <DashboardHeader />

      <div>
        <div className={s({ p: "normal" })}>
          <Group justify="space-between">
            <Header priority={2}>Amenities</Header>

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
            <Panel key={amenity.id}>
              <Group gap="normal" align="start">
                <img
                  alt={`Image for ${amenity.name}`}
                  className={styles.amentityImage}
                  src={getImageUri(amenity.imageSrc)}
                />

                <Stack>
                  <Stack gap="xs">
                    <Header priority={2}>{amenity.name}</Header>
                    <Text>{amenity.description}</Text>
                  </Stack>

                  <BookAmenityButton
                    amenity={amenity}
                    className={styles.bookAmenityButton}
                    createAmenityBooking={createAmenityBookingAction.bind(
                      undefined,
                      amenity.id,
                    )}
                  />
                </Stack>
              </Group>
            </Panel>
          ))}
        </Stack>
      </div>
    </>
  );
}
