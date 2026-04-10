import { NothingHere } from "../../../../components/NothingHere";
import { Table } from "../../../../components/Table";
import { listMeetings } from "../../../../data/meetings/listMeetings";
import { MeetingRow } from "./MeetingRow";

interface Props {
  strataId: string;
}

export async function MeetingListLayout({ strataId }: Props) {
  const futureMeetings = await listMeetings({
    strataId,
    startDateAfter: Date.now() / 1000,
  });

  if (futureMeetings.length === 0) {
    return <NothingHere />;
  }

  return (
    <Table>
      {futureMeetings.map((meeting) => (
        <MeetingRow key={meeting.id} meeting={meeting} />
      ))}
    </Table>
  );
}
