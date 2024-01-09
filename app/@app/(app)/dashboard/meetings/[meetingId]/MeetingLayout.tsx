import { s } from "../../../../../../sprinkles.css";
import * as styles from "./style.css";

import { ConfirmButton } from "../../../../../../components/ConfirmButton";
import { Date } from "../../../../../../components/Date";
import { EditMeetingButton } from "../../../../../../components/EditMeetingButton";
import { Header } from "../../../../../../components/Header";
import { DeleteIcon } from "../../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { getMeeting } from "../../../../../../data/meetings/getMeeting";
import { deleteMeetingAction } from "../actions";
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
            <br /> <Date timestamp={meeting.startDate} />
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

          <ConfirmButton
            color="error"
            iconRight={<DeleteIcon />}
            onClickConfirm={deleteMeetingAction.bind(undefined, meeting.id)}
            style="secondary"
          >
            Delete Meeting
          </ConfirmButton>
        </InfoPanel>
      </div>
      <div className={styles.meetingTimelineSearchContainer}>
        <MeetingTimelineSearch meetingId={meetingId} strataId={strataId} />
      </div>
    </div>
  );
}
