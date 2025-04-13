import * as styles from "./style.css";

import { mustAuth } from "../../../../auth";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";
import { MeetingListLayout } from "./MeetingsListLayout";
import { ScheduleMeetingButton } from "./ScheduleMeetingButton";
import { upsertMeetingAction } from "./actions";

export const runtime = "edge";

export default async function Page() {
  const [session, strata] = await Promise.all([
    mustAuth(true),
    mustGetCurrentStrata(),
  ]);

  return (
    <>
      <DashboardHeader />

      <div className={styles.pageContainer}>
        <Group mb="normal" justify="space-between">
          <Header as="h2">Meetings</Header>

          {can(session?.user, p("stratas", "meetings", "create")) && (
            <ScheduleMeetingButton
              upsertMeeting={upsertMeetingAction.bind(
                undefined,
                strata.id,
                undefined,
              )}
            />
          )}
        </Group>

        <MeetingListLayout strataId={strata.id} />
      </div>
    </>
  );
}
