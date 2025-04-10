import * as styles from "./style.css";

import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Panel } from "../../../../components/Panel";
import { Text } from "../../../../components/Text";
import { upsertEventAction } from "../calendar/[...segments]/actions";
import { BookAmenityButton } from "./BookAmenityButton";

export const runtime = "edge";

export interface Amenity {
  id: string;
  description: string;
  name: string;
}

const amenities = [
  {
    id: "1",
    name: "Guest Suite",
    description: "A guest suite.",
    costPerHour: 5,
    imageSrc:
      "https://www.fortpark.ca/wp-content/uploads/2021/01/Strata-pool.jpeg",
  },
];

export default function Page() {
  return (
    <>
      <DashboardHeader />

      <div className={styles.amentitiesContainer}>
        {amenities.map((a) => (
          <Panel key={a.id}>
            <Group gap="normal" align="start">
              <img
                alt={`Image for ${a.name}`}
                className={styles.amentityImage}
                src={a.imageSrc}
              />

              <div>
                <Header priority={2}>{a.name}</Header>

                <Text>{a.description}</Text>

                <BookAmenityButton
                  amenity={a}
                  className={styles.bookAmenityButton}
                  upsertEvent={upsertEventAction}
                />
              </div>
            </Group>
          </Panel>
        ))}
      </div>
    </>
  );
}
