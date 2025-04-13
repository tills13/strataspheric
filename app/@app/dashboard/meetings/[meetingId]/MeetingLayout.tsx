import * as styles from "./style.css";

import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { Date } from "../../../../../components/Date";
import { EditMeetingButton } from "../../../../../components/EditMeetingButton";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { getMeeting } from "../../../../../data/meetings/getMeeting";
import { deleteMeetingAction, upsertMeetingAction } from "../actions";
import { MeetingAgenda } from "./MeetingAgenda";
import { MeetingFiles } from "./MeetingFiles";
import { MeetingMinutes } from "./MeetingMinutes";

interface Props {
  meetingId: string;
  strataId: string;
}

export async function MeetingLayout({ meetingId, strataId }: Props) {
  const meeting = await getMeeting(strataId, meetingId);

  return (
    <Stack className={styles.meetingAgendaContainer} gap="large">
      <Group align="start" justify="space-between">
        <Stack gap="small">
          <Header priority={2}>{meeting.purpose}</Header>
          <Text color="secondary">
            Called by <b>{meeting.caller}</b> for{" "}
            <Date timestamp={meeting.startDate} />
          </Text>
        </Stack>

        <EditMeetingButton
          meeting={meeting}
          updateMeeting={upsertMeetingAction.bind(
            undefined,
            strataId,
            meeting.id,
          )}
        />
      </Group>

      {meeting.notes && <p>{meeting.notes}</p>}

      <MeetingAgenda meetingId={meetingId} />

      <MeetingFiles meetingId={meetingId} />

      <MeetingMinutes
        meetingId={meetingId}
        minutesUrl={meeting.minutesUrl}
        minutesUrlApprovedByName={meeting.minutesUrlApproverName}
      />

      <InfoPanel
        action={
          <ConfirmButton
            color="error"
            iconRight={<DeleteIcon />}
            onClickConfirm={deleteMeetingAction.bind(undefined, meeting.id)}
            style="secondary"
          >
            Delete Meeting
          </ConfirmButton>
        }
        className={styles.meetingAgendaContainerDeleteMeeting}
        header={<Header priority={3}>Delete Meeting</Header>}
        level="error"
      >
        <Text>
          Deleting this meeting will delete all associated agenda items, but
          leave any files created during planning.
        </Text>
      </InfoPanel>
    </Stack>
  );
}
