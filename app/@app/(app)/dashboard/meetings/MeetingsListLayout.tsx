import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { getMeetings } from "../../../../../data/meetings/getMeetings";
import { can, p } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import { deleteMeetingAction } from "./actions";

interface Props {
  strataId: string;
}

export async function MeetingListLayout({ strataId }: Props) {
  const session = await auth();
  const meetings = await getMeetings(strataId);

  return (
    <div>
      {meetings.length === 0 && (
        <InfoPanel className={styles.noMeetingsMessage} level="info">
          <p className={s({ mb: "small" })}>No Meetings Scheduled</p>
          {can(session?.user, p("stratas", "meetings", "create")) && (
            <Button color="primary" style="secondary">
              Plan a Meeting
            </Button>
          )}
        </InfoPanel>
      )}
      <div className={styles.meetingListContainer}>
        {meetings.map((meeting) => (
          <InternalLink
            key={meeting.id}
            className={styles.meetingListRow}
            href={{
              pathname: "/dashboard/meetings/" + meeting.id,
            }}
          >
            <div className={styles.purposeCell}>{meeting.purpose}</div>
            <div className={styles.dateCell}>
              {parseTimestamp(meeting.startDate).toLocaleString()}
            </div>
            <div className={styles.actionsCell}>
              {can(session?.user, p("stratas", "meetings", "delete")) && (
                <DeleteButton
                  onClick={deleteMeetingAction.bind(undefined, meeting.id)}
                  color="error"
                  size="small"
                  style="tertiary"
                />
              )}
            </div>
          </InternalLink>
        ))}
      </div>
    </div>
  );
}
