import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { notFound } from "next/navigation";

import { auth } from "../../../../auth";
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
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  if (!session) {
    notFound();
  }

  return (
    <>
      <DashboardHeader />

      <div className={styles.pageContainer}>
        <Group className={s({ mb: "normal" })} justify="space-between">
          <Header priority={2}>Meetings</Header>
          <div>
            {can(session?.user, p("stratas", "meetings", "create")) && (
              <ScheduleMeetingButton
                upsertMeeting={upsertMeetingAction.bind(
                  undefined,
                  strata.id,
                  undefined,
                )}
              />
            )}
          </div>
        </Group>

        <MeetingListLayout strataId={strata.id} />
      </div>
    </>
  );
}
