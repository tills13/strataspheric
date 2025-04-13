import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Amenity } from "../../data/amenities/getAmenity";
import { classnames } from "../../utils/classnames";
import { getImageUri } from "../../utils/files";
import { BookAmenityButton } from "../BookAmenityButton";
import { Flex } from "../Flex";
import { Group } from "../Group";
import { Money } from "../Money";
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  amenity: Amenity;
  createAmenityBooking?: React.ComponentProps<
    typeof BookAmenityButton
  >["createAmenityBooking"];
  className?: string;
  showPrice?: boolean;
}

export function AmenityChip({
  amenity,
  className,
  createAmenityBooking,
  showPrice = true,
}: Props) {
  return (
    <Panel className={classnames(styles.amenityChip, className)}>
      <Flex align="stretch" from="tablet" gap="normal">
        <img
          alt={`Image for ${amenity.name}`}
          className={styles.amentityImage}
          src={getImageUri(amenity.imageSrc)}
        />

        <Stack className={s({ flex: 1 })} justify="space-between">
          <Stack gap="xs">
            <Text as="span" size="xl" weight="bold">
              {amenity.name}
            </Text>
            <Text>{amenity.description}</Text>
          </Stack>

          <Group justify="end">
            {showPrice && amenity.costPerHour && (
              <span>
                <Money amount={amenity.costPerHour} /> / hour
              </span>
            )}

            {createAmenityBooking && (
              <BookAmenityButton
                amenity={amenity}
                className={styles.bookAmenityButton}
                createAmenityBooking={createAmenityBooking}
              />
            )}
          </Group>
        </Stack>
      </Flex>
    </Panel>
  );
}
