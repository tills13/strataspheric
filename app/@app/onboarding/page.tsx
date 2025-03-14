import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { AttachFileField } from "../../../components/AttachFileField";
import { Group } from "../../../components/Group";
import { Header } from "../../../components/Header";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { Panel } from "../../../components/Panel";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { StrataAddressFormFields } from "../../../components/StrataAddressFormFields";
import { Text } from "../../../components/Text";
import { Wordmark } from "../../../components/Wordmark";
import { mustGetCurrentStrata } from "../../../data/stratas/getStrataByDomain";
import { upsertFileAction } from "../dashboard/files/actions";
import { AttachBylawsField } from "./AttachBylawsField";
import { completeOnboardingAction } from "./actions";

export const runtime = "edge";

export default async function Onboarding() {
  const strata = await mustGetCurrentStrata();

  return (
    <form action={completeOnboardingAction} className={styles.pageContainer}>
      <Group className={s({ mb: "large" })} justify="center">
        <Text size="large">Welcome to </Text>
        <Wordmark />
      </Group>

      <Stack>
        <Header priority={2}>
          Welcome to your Strata. Let&apos;s get a few things setup for you...
        </Header>

        <Panel>
          <Header className={s({ mb: "small" })} priority={3}>
            Address
          </Header>

          <Stack>
            <Text color="secondary">
              Add your address to allow people to find your strata.
            </Text>

            <StrataAddressFormFields strata={strata} />
          </Stack>
        </Panel>

        <Panel>
          <Header className={s({ mb: "small" })} priority={3}>
            Bylaws
          </Header>
          <Stack>
            <Text color="secondary">Add your bylaws for easy reference</Text>

            <AttachBylawsField
              upsertFileAction={upsertFileAction.bind(undefined, undefined)}
            />
          </Stack>
        </Panel>
        <StatusButton iconRight={<CircleCheckIcon />} color="primary">
          Ok, I&apos;m Done
        </StatusButton>
      </Stack>
    </form>
  );
}
