import * as styles from "./style.css";

import { Button } from "../../../../components/Button";
import { Header } from "../../../../components/Header";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Stack } from "../../../../components/Stack";
import { Text } from "../../../../components/Text";

export function InboxNoPlanPage() {
  return (
    <Stack className={styles.upsell}>
      <Header as="h3">Oops...</Header>

      <Text fontWeight="bold">
        The strata inbox is only available on select plans.
      </Text>

      <Text>
        Stop worrying about shared email accounts or private emails being used
        to store official strata communication. The strata inbox streamlines
        conversations with council, automatically keeping a history of all
        correspondance forever.
      </Text>

      <InternalLink href={"/dashboard/settings#plan"}>
        <Button color="primary" style="primary" fullWidth>
          Upgrade your plan today
        </Button>
      </InternalLink>
    </Stack>
  );
}
