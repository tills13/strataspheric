import { mustAuth } from "../../../../auth";
import { Date } from "../../../../components/Date";
import { Group } from "../../../../components/Group";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { RemoveButton } from "../../../../components/RemoveButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { Meeting } from "../../../../data";
import { can } from "../../../../data/users/permissions";
import { deleteMeetingAction } from "./actions";

interface Props {
  meeting: Meeting;
}

export async function MeetingRow({ meeting }: Props) {
  const session = await mustAuth();

  return (
    <TableRow
      actions={
        <Group gap="small">
          {can(session.user, "stratas.meetings.delete") && (
            <RemoveButton
              action={deleteMeetingAction.bind(undefined, meeting.id)}
              icon={<DeleteIcon />}
              size="small"
              style="tertiary"
              color="primary"
            />
          )}
        </Group>
      }
      content={
        <Group>
          <Text color="primary" whiteSpace="nowrap">
            {meeting.purpose}
          </Text>
        </Group>
      }
      link={"/dashboard/meetings/" + meeting.id}
      rowEnd={
        <Date
          timestamp={meeting.startDate}
          output="compact"
          color="secondary"
          fontSize="small"
          whiteSpace="nowrap"
        />
      }
      rowId={meeting.id}
    />
  );
}
