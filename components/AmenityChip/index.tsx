"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { Amenity } from "../../data/amenities/getAmenity";
import { useCan } from "../../hooks/useCan";
import { classnames } from "../../utils/classnames";
import { getImageUri } from "../../utils/files";
import { BookAmenityButton } from "../BookAmenityButton";
import { Button } from "../Button";
import { CreateOrUpdateAmenityForm } from "../CreateOrUpdateAmenityForm";
import { Flex } from "../Flex";
import { Group } from "../Group";
import { EditIcon } from "../Icon/EditIcon";
import { Modal } from "../Modal";
import { Money } from "../Money";
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  amenity: Amenity;
  className?: string;
  showPrice?: boolean;
}

export function AmenityChip({ amenity, className, showPrice = true }: Props) {
  const can = useCan();
  const [showEditAmenityModal, setShowAmenityModal] = useState(false);

  return (
    <>
      <Panel className={classnames(styles.amenityChip, className)}>
        <Flex align="stretch" from="tablet" gap="normal">
          <img
            alt={`Image for ${amenity.name}`}
            className={styles.amentityImage}
            src={getImageUri(amenity.imageSrc)}
          />

          <Stack className={s({ flex: 1 })} justify="space-between">
            <Stack gap="xs">
              <Text as="span" fontSize="xl" fontWeight="bold">
                {amenity.name}
              </Text>
              <Text>{amenity.description}</Text>
            </Stack>

            <Group justify="end">
              {showPrice && amenity.costPerHour && (
                <Text as="span">
                  <Money amount={amenity.costPerHour} /> / hour
                </Text>
              )}

              <BookAmenityButton
                amenity={amenity}
                className={styles.bookAmenityButton}
              />

              {can("stratas.amenities.edit") && (
                <Button
                  icon={<EditIcon />}
                  style="secondary"
                  color="primary"
                  onClick={() => setShowAmenityModal(true)}
                />
              )}
            </Group>
          </Stack>
        </Flex>
      </Panel>
      {showEditAmenityModal && (
        <Modal
          closeModal={() => setShowAmenityModal(false)}
          title={`Edit ${amenity.name}`}
        >
          <CreateOrUpdateAmenityForm amenity={amenity} />
        </Modal>
      )}
    </>
  );
}
