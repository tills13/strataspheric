import * as styles from "./style.css";

import { protocol, tld } from "../../constants";
import { Button } from "../Button";
import { FlexBox } from "../FlexBox";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Logo } from "../Logo";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  returnTo?: string;
}

export function NotFound({ returnTo = protocol + "//" + tld }: Props) {
  return (
    <FlexBox align="center" direction="column" justify="center">
      <Stack className={styles.contentContainer}>
        <Logo height="xxl3" />
        <Text as="h2" fontSize="xl">
          Oops, this page is missing...
        </Text>
        <ExternalLink href={returnTo} noUnderline>
          <Button
            style="primary"
            color="primary"
            iconRight={<ArrowForwardIcon />}
          >
            Return to Strataspheric
          </Button>
        </ExternalLink>
      </Stack>
    </FlexBox>
  );
}
