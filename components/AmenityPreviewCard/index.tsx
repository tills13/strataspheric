import * as styles from "./style.css";

import { getImageUri } from "../../utils/files";
import { Flex } from "../Flex";
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface AmenityPreview {
  name: string;
  description?: string | null;
  imageSrc?: string | null;
}

interface Props {
  amenity: AmenityPreview;
  children?: React.ReactNode;
  className?: string;
}

export function AmenityPreviewCard({ amenity, children, className }: Props) {
  return (
    <Panel className={className}>
      <Flex align="stretch" from="tablet" gap="normal">
        {amenity.imageSrc && (
          <img
            alt={`Image for ${amenity.name}`}
            className={styles.amenityImage}
            src={getImageUri(amenity.imageSrc)}
          />
        )}

        <Stack flex={1} justify="space-between">
          <Stack gap="xs">
            <Text as="span" fontSize="xl" fontWeight="bold">
              {amenity.name}
            </Text>
            {amenity.description && (
              <Text color="secondary">{amenity.description}</Text>
            )}
          </Stack>

          {children}
        </Stack>
      </Flex>
    </Panel>
  );
}
