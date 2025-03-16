import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../auth";
import { Button } from "../../../../components/Button";
import { Date } from "../../../../components/Date";
import { DeleteButton } from "../../../../components/DeleteButton";
import { Group } from "../../../../components/Group";
import { InfoPanel } from "../../../../components/InfoPanel";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Text } from "../../../../components/Text";
import { getMeetings } from "../../../../data/meetings/getMeetings";
import { can, p } from "../../../../data/users/permissions";
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
        <InfoPanel
          action={
            can(session?.user, p("stratas", "meetings", "create")) && (
              <Button color="primary" style="secondary">
                Plan a Meeting
              </Button>
            )
          }
          className={styles.noMeetingsMessage}
          level="info"
        >
          <Text>No Meetings Scheduled</Text>
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
            <Group align="center" justify="space-between">
              <Group align="center">
                <h3>{meeting.purpose}</h3>
                <Date
                  className={styles.meetingDate}
                  timestamp={meeting.startDate}
                  output="date"
                />
              </Group>

              <Group gap="small">
                {can(session?.user, p("stratas", "meetings", "delete")) && (
                  <DeleteButton
                    onConfirmDelete={deleteMeetingAction.bind(
                      undefined,
                      meeting.id,
                    )}
                    color="error"
                    size="small"
                    style="tertiary"
                  />
                )}
              </Group>
            </Group>
          </InternalLink>
        ))}
      </div>
    </div>
  );
}
