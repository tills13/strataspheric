import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { Header } from "../../../../../components/Header";
import { Panel } from "../../../../../components/Panel";
import { classnames } from "../../../../../utils/classnames";
import { BookAmenityButton } from "./BookAmenityButton";

export const runtime = "edge";

export interface Amenity {}

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
          <Panel key={a.id} className={styles.amentity}>
            {/* eslint-disable-next-line */}
            <img
              alt={`Image for ${a.name}`}
              className={styles.amentityImage}
              src={a.imageSrc}
            />

            <div className={styles.amenityDescriptionContainer}>
              <Header priority={2}>{a.name}</Header>
              <p
                className={classnames(
                  s({ mb: "normal" }),
                  styles.amenityDescription,
                )}
              >
                {a.description}
              </p>
              <div className={styles.amentityActionsContainer}>
                <BookAmenityButton
                  amenity={a}
                  className={styles.bookAmenityButton}
                />
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
