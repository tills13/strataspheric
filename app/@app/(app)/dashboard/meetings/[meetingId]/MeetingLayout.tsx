import * as styles from "./style.css";

import { EditMeetingButton } from "../../../../../../components/EditMeetingButton";
import { Header } from "../../../../../../components/Header";
import { getMeeting } from "../../../../../../data/meetings/getMeeting";
import { MeetingAgenda } from "./MeetingAgenda";
import { MeetingTimelineSearch } from "./MeetingTimelineSearch";
import { updateMeetingAction } from "./actions";

interface Props {
  meetingId: string;
  strataId: string;
}

export async function MeetingLayout({ meetingId, strataId }: Props) {
  const meeting = await getMeeting(strataId, meetingId);

  return (
    <div className={styles.meetingLayoutContainer}>
      <div className={styles.meetingAgendaContainer}>
        <div className={styles.header}>
          <Header priority={2}>{meeting.purpose}</Header>
          <p>
            Called by {meeting.caller} on{" "}
            {new Date(meeting.date).toLocaleString()}
          </p>

          <EditMeetingButton
            className={styles.editMeetingButton}
            meeting={meeting}
            updateMeeting={updateMeetingAction.bind(undefined, meetingId)}
          />
        </div>

        {meeting.notes && <p>{meeting.notes}</p>}

        <MeetingAgenda meetingId={meetingId} />
      </div>
      <div className={styles.meetingTimelineSearchContainer}>
        <MeetingTimelineSearch meetingId={meetingId} strataId={strataId} />
      </div>
    </div>
  );
}