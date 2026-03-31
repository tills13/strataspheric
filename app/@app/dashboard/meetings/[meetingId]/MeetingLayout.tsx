import * as styles from "./style.css";

import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { LiveSyncProvider } from "../../../../../components/LiveSyncProvider";
import { Date } from "../../../../../components/Date";
import { EditMeetingButton } from "../../../../../components/EditMeetingButton";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { getMeeting } from "../../../../../data/meetings/getMeeting";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { deleteMeetingAction } from "../actions";
import { MeetingAgenda } from "./MeetingAgenda";
import { MeetingAttendees } from "./MeetingAttendees";
import { MeetingFiles } from "./MeetingFiles";
import { MeetingMinutes } from "./MeetingMinutes";

interface Props {
  meetingId: string;
}

export async function MeetingLayout({ meetingId }: Props) {
  const strata = await mustGetCurrentStrata();
  const meeting = await getMeeting(strata.id, meetingId);

  return (
    <DashboardLayout
      title={meeting.purpose}
      subPageTitle={meeting.purpose}
      actions={
        <Group gap="small">
          <ConfirmButton
            onClickConfirm={deleteMeetingAction.bind(undefined, meetingId)}
            icon={<RemoveIcon />}
            color="error"
            style="tertiary"
            size="small"
          />
          <EditMeetingButton meeting={meeting} />
        </Group>
      }
    >
      <LiveSyncProvider intervalMs={5000}>
        <Stack className={styles.meetingAgendaContainer}>
          <Text color="secondary">
            Called by <b>{meeting.caller}</b> for{" "}
            <Date timestamp={meeting.startDate} />
          </Text>

          {meeting.notes && <p>{meeting.notes}</p>}

          <MeetingAttendees meetingId={meetingId} />

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
                icon={<DeleteIcon />}
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
      </LiveSyncProvider>
    </DashboardLayout>
  );
}
