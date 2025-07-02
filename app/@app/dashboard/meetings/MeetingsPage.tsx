import { mustAuth } from "../../../../auth";
import { DashboardLayout } from "../../../../components/DashboardLayout";
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
    <DashboardLayout
      actions={
        can(session.user, "stratas.meetings.create") && (
          <ScheduleMeetingButton />
        )
      }
      title="Meetings"
    >
      <MeetingListLayout strataId={strata.id} />
    </DashboardLayout>
  );
}
