import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { NothingHere } from "../../../../../components/NothingHere";
import { ProtectedPage } from "../../../../../components/ProtectedPage";
import { Table } from "../../../../../components/Table";
import { listMeetings } from "../../../../../data/meetings/listMeetings";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { MeetingRow } from "../MeetingRow";

export default async function Page() {
  const strata = await mustGetCurrentStrata();

  const pastMeetings = await listMeetings({
    strataId: strata.id,
    startDateBefore: Date.now() / 1000,
  });

  return (
    <ProtectedPage permissions={["stratas.meetings.view"]}>
      <DashboardLayout title="Past Meetings">
        {pastMeetings.length === 0 ? (
          <NothingHere />
        ) : (
          <Table>
            {pastMeetings.map((meeting) => (
              <MeetingRow key={meeting.id} meeting={meeting} />
            ))}
          </Table>
        )}
      </DashboardLayout>
    </ProtectedPage>
  );
}
