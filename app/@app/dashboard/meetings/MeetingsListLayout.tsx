import * as styles from "./style.css";

import { mustAuth } from "../../../../auth";
import { Date } from "../../../../components/Date";
import { DeleteButton } from "../../../../components/DeleteButton";
import { Group } from "../../../../components/Group";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { NothingHere } from "../../../../components/NothingHere";
import { Text } from "../../../../components/Text";
import { findMeetings } from "../../../../data/meetings/findMeetings";
import { can, p } from "../../../../data/users/permissions";
import { deleteMeetingAction } from "./actions";

interface Props {
  strataId: string;
}

export async function MeetingListLayout({ strataId }: Props) {
  const [session, meetings] = await Promise.all([
    mustAuth(),
    findMeetings(strataId),
  ]);

  return (
    <>
      {meetings.length === 0 && <NothingHere />}

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
                <Text fw="bold">{meeting.purpose}</Text>
                <Text fc="secondary">
                  <Date timestamp={meeting.startDate} output="date" />
                </Text>
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
    </>
  );
}
