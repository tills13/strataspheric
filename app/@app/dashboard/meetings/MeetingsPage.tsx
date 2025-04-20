import { mustAuth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { MeetingListLayout } from "./MeetingsListLayout";
import { ScheduleMeetingButton } from "./ScheduleMeetingButton";

export async function MeetingsPage() {
  const [session, strata] = await Promise.all([
    mustAuth(true),
    mustGetCurrentStrata(),
  ]);

  return (
    <div>
      <Group p="normal" justify="space-between">
        <Header as="h2">Meetings</Header>

        {can(session.user, "stratas.meetings.create") && (
          <Group>
            <ScheduleMeetingButton />
          </Group>
        )}
      </Group>

      <MeetingListLayout strataId={strata.id} />
    </div>
  );
}
