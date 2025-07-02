import { Header } from "../../../../components/Header";
import { NothingHere } from "../../../../components/NothingHere";
import { Stack } from "../../../../components/Stack";
import { Table } from "../../../../components/Table";
import { listMeetings } from "../../../../data/meetings/listMeetings";
import { MeetingRow } from "./MeetingRow";

interface Props {
  strataId: string;
}

export async function MeetingListLayout({ strataId }: Props) {
  const [futureMeetings, pastMeetings] = await Promise.all([
    listMeetings({ strataId, startDateAfter: Date.now() / 1000 }),
    listMeetings(
      { strataId, startDateBefore: Date.now() / 1000 },
      { limit: 5 },
    ),
  ]);

  return (
    <Stack ph="normal">
      <Header as="h2">Upcoming Meetings</Header>
      {futureMeetings.length === 0 && <NothingHere />}
      <Table>
        {futureMeetings.map((meeting) => (
          <MeetingRow key={meeting.id} meeting={meeting} />
        ))}
      </Table>

      <Header as="h2">Recent Meetings</Header>
      <Table>
        {pastMeetings.map((meeting) => (
          <MeetingRow key={meeting.id} meeting={meeting} />
        ))}
      </Table>
    </Stack>
  );
}
