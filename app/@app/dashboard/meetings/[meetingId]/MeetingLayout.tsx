import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { Date } from "../../../../../components/Date";
import { EditMeetingButton } from "../../../../../components/EditMeetingButton";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Text } from "../../../../../components/Text";
import { getMeeting } from "../../../../../data/meetings/getMeeting";
import { classnames } from "../../../../../utils/classnames";
import { deleteMeetingAction } from "../actions";
import { MeetingAgenda } from "./MeetingAgenda";
import { MeetingFiles } from "./MeetingFiles";
import { MeetingMinutes } from "./MeetingMinutes";
import { updateMeetingAction } from "./actions";

interface Props {
  meetingId: string;
  strataId: string;
}

function MeetingInfo({
  className,
  meeting,
}: {
  className?: string;
  meeting: Awaited<ReturnType<typeof getMeeting>>;
}) {
  return (
    <div className={classnames(styles.header, s({ mb: "normal" }), className)}>
      <EditMeetingButton
        className={styles.editMeetingButton}
        meeting={meeting}
        updateMeeting={updateMeetingAction.bind(undefined, meeting.id)}
      />
      <Header className={s({ mb: "normal" })} priority={2}>
        {meeting.purpose}
      </Header>
      <p>
        Called by <b>{meeting.caller}</b> for
        <br /> <Date timestamp={meeting.startDate} />
      </p>
    </div>
  );
}

export async function MeetingLayout({ meetingId, strataId }: Props) {
  const meeting = await getMeeting(strataId, meetingId);

  return (
    <div className={styles.meetingLayoutContainer}>
      <div
        className={classnames(
          styles.meetingInfoSidebar,
          s({ padding: "normal" }),
        )}
      >
        <MeetingInfo meeting={meeting} />
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
          header={<Header priority={3}>Delete Meeting</Header>}
          level="error"
        >
          Deleting this meeting will delete all associated agenda items, but
          leave any files created during planning.
        </InfoPanel>
      </div>

      <div className={styles.meetingAgendaContainer}>
        <MeetingInfo
          className={styles.meetingAgendaContainerMeetingInfo}
          meeting={meeting}
        />

        {meeting.notes && <p className={s({ mb: "large" })}>{meeting.notes}</p>}

        <MeetingAgenda className={s({ mb: "large" })} meetingId={meetingId} />

        <MeetingFiles className={s({ mb: "large" })} meetingId={meetingId} />

        <MeetingMinutes
          className={s({ mb: "large" })}
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
          Deleting this meeting will delete all associated agenda items, but
          leave any files created during planning.
        </InfoPanel>
      </div>
    </div>
  );
}
