import * as styles from "./style.css";

import { Button } from "../Button";
import { Group } from "../Group";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InternalLink } from "../Link/InternalLink";
import { Text } from "../Text";
import { Wrap } from "../Wrap";

interface Props {
  currentPage: number;
  totalPages?: number;
}

export function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages !== undefined && totalPages <= 1) {
    return null;
  }

  return (
    <Group>
      <Wrap
        if={currentPage !== 1}
        with={(children) => (
          <InternalLink href={`?page=${currentPage - 1}`}>
            {children}
          </InternalLink>
        )}
      >
        <Button
          disabled={currentPage === 1}
          icon={<ArrowForwardIcon className={styles.arrowBackIcon} />}
          size="small"
          color="primary"
          style="tertiary"
        />
      </Wrap>
      <Group gap="small">
        <Text as="span" fw="bold" color="secondary">
          {currentPage}
        </Text>
        <Text as="span">of</Text>
        <Text as="span" fw="bold" color="secondary">
          {totalPages}
        </Text>
      </Group>
      <Wrap
        if={!totalPages || currentPage !== totalPages}
        with={(children) => (
          <InternalLink href={`?page=${currentPage + 1}`}>
            {children}
          </InternalLink>
        )}
      >
        <Button
          disabled={!!totalPages && currentPage === totalPages}
          icon={<ArrowForwardIcon />}
          size="small"
          color="primary"
          style="tertiary"
        />
      </Wrap>
    </Group>
  );
}
