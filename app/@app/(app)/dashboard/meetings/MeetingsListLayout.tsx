import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { DeleteButton } from "../../../../../components/DeleteButton";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { getMeetings } from "../../../../../data/meetings/getMeetings";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { deleteMeetingAction } from "./actions";

interface Props {
  strataId: string;
}

export async function MeetingListLayout({ strataId }: Props) {
  const session = await auth();
  const meetings = await getMeetings(strataId);

  return (
    <div>
      <div className={styles.meetingListContainer}>
        {meetings.length === 0 && (
          <div className={styles.meetingListRow}>
            <div className={styles.tableCell}>No Meetings Scheduled</div>
            {can(session?.user, p("stratas", "meetings", "create")) && (
              <Button>Plan a Meeting</Button>
            )}
          </div>
        )}

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
              {new Date(meeting.startDate).toLocaleString()}
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
