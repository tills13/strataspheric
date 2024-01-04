import { s } from "../../../../../../sprinkles.css";
import * as styles from "./style.css";

import { Button } from "../../../../../../components/Button";
import { EditMeetingButton } from "../../../../../../components/EditMeetingButton";
import { Header } from "../../../../../../components/Header";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { getMeeting } from "../../../../../../data/meetings/getMeeting";
import { parseTimestamp } from "../../../../../../utils/datetime";
import { deleteMeetingAction } from "../actions";
import { DeleteMeetingButton } from "./DeleteMeetingButton";
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
            <br /> {parseTimestamp(meeting.startDate).toLocaleString()}
          </p>
        </div>

        {meeting.notes && <p>{meeting.notes}</p>}

        <MeetingAgenda className={s({ mb: "normal" })} meetingId={meetingId} />

        {/* <MeetingMinutes meetingId={meetingId} /> */}

        <InfoPanel level="error">
          <Header className={s({ mb: "small" })} priority={3}>
            Delete Meeting
          </Header>

          <p className={s({ mb: "normal" })}>
            Deleting this meeting will delete all associated agenda items, but
            leave any files created during planning.
          </p>

          <DeleteMeetingButton
            deleteMeeting={deleteMeetingAction.bind(undefined, meeting.id)}
          />
        </InfoPanel>
      </div>
      <div className={styles.meetingTimelineSearchContainer}>
        <MeetingTimelineSearch meetingId={meetingId} strataId={strataId} />
      </div>
    </div>
  );
}
