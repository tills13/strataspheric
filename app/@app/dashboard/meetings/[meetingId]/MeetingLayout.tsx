import * as styles from "./style.css";

import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { Date } from "../../../../../components/Date";
import { EditMeetingButton } from "../../../../../components/EditMeetingButton";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { getMeeting } from "../../../../../data/meetings/getMeeting";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { deleteMeetingAction } from "../actions";
import { MeetingAgenda } from "./MeetingAgenda";
import { MeetingFiles } from "./MeetingFiles";
import { MeetingMinutes } from "./MeetingMinutes";

interface Props {
  meetingId: string;
}

export async function MeetingLayout({ meetingId }: Props) {
  const strata = await mustGetCurrentStrata();
  const meeting = await getMeeting(strata.id, meetingId);

  return (
    <Stack className={styles.meetingAgendaContainer} gap="large">
      <Group align="start" justify="space-between">
        <Stack gap="small">
          <Header as="h2">{meeting.purpose}</Header>
          <Text color="secondary">
            Called by <b>{meeting.caller}</b> for{" "}
            <Date timestamp={meeting.startDate} />
          </Text>
        </Stack>

        <Group>
          <StatusButton
            action={deleteMeetingAction.bind(undefined, meetingId)}
            icon={<RemoveIcon />}
            color="error"
            style="tertiary"
            size="small"
          />
          <EditMeetingButton meeting={meeting} />
        </Group>
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
        header={<Header as="h3">Delete Meeting</Header>}
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
