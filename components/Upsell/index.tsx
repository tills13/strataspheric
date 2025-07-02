import * as styles from "./style.css";

import { Button } from "../Button";
import { Header } from "../Header";
import { InternalLink } from "../Link/InternalLink";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props extends React.ComponentProps<typeof Stack> {
  upsellFeature: string;
  upsellDescription: string;
  verb?: string;
}

export function Upsell({
  upsellDescription,
  upsellFeature,
  verb = "is",
  ...rest
}: Props) {
  return (
    <div className={styles.upsellContainer}>
      <Stack className={styles.upsell} {...rest}>
        <Header as="h2">Oops...</Header>

        <Text fontWeight="bold">
          {upsellFeature} {verb} only available on select plans.
        </Text>

        <Text color="secondary">{upsellDescription}</Text>

        <InternalLink href={"/dashboard/settings#plan"}>
          <Button color="primary" style="primary" fullWidth>
            Upgrade your plan today
          </Button>
        </InternalLink>
      </Stack>
    </div>
  );
}
