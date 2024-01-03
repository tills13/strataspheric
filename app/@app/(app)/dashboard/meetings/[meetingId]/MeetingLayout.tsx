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
          <EditMeetingButton
            className={styles.editMeetingButton}
            meeting={meeting}
            updateMeeting={updateMeetingAction.bind(undefined, meetingId)}
          />
          <Header className={styles.headerHeader} priority={2}>
            {meeting.purpose}
          </Header>
          <p>
            Called by <b>{meeting.caller}</b> for
            <br /> {new Date(meeting.startDate).toLocaleString()}
          </p>
        </div>

        {meeting.notes && <p>{meeting.notes}</p>}

        <MeetingAgenda meetingId={meetingId} />

        {/* <MeetingMinutes meetingId={meetingId} /> */}
      </div>
      <div className={styles.meetingTimelineSearchContainer}>
        <MeetingTimelineSearch meetingId={meetingId} strataId={strataId} />
      </div>
    </div>
  );
}
