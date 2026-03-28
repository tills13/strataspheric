import { mustAuth } from "../../../../../auth";
import { Badge } from "../../../../../components/Badge";
import { Button } from "../../../../../components/Button";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { listMeetingAttendees } from "../../../../../data/meetings/listMeetingAttendees";
import { listStrataMemberships } from "../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import {
  addAttendeeAction,
  removeAttendeeAction,
  rsvpAction,
} from "../actions";

interface Props {
  meetingId: string;
}

function attendeeStatusLevel(
  status: "invited" | "confirmed" | "declined",
): "default" | "success" | "error" {
  if (status === "confirmed") return "success";
  if (status === "declined") return "error";
  return "default";
}

export async function MeetingAttendees({ meetingId }: Props) {
  const [session, strata] = await Promise.all([
    mustAuth(true),
    mustGetCurrentStrata(),
  ]);

  const [attendees, allMembers] = await Promise.all([
    listMeetingAttendees(meetingId),
    listStrataMemberships({ strataId: strata.id }),
  ]);

  const canEdit = can(session.user, "stratas.meetings.edit");

  const attendeeUserIds = new Set(attendees.map((a) => a.userId));
  const nonAttendeeMembers = allMembers.filter(
    (m) => !attendeeUserIds.has(m.id),
  );

  const currentUserAttendee = attendees.find(
    (a) => a.userId === session.user.id,
  );

  return (
    <Stack>
      <Header as="h3">Attendees</Header>

      {attendees.length === 0 && (
        <Text color="secondary">No attendees have been added yet.</Text>
      )}

      {attendees.length > 0 && (
        <Stack gap="small">
          {attendees.map((attendee) => (
            <Group key={attendee.userId} justify="space-between" align="center">
              <Group align="center" gap="small">
                <Text>{attendee.name}</Text>
                <Badge level={attendeeStatusLevel(attendee.status)}>
                  {attendee.status}
                </Badge>
              </Group>

              {canEdit && (
                <form
                  action={removeAttendeeAction.bind(
                    undefined,
                    meetingId,
                    attendee.userId,
                  )}
                >
                  <Button type="submit" size="small" style="tertiary" color="error">
                    Remove
                  </Button>
                </form>
              )}
            </Group>
          ))}
        </Stack>
      )}

      {currentUserAttendee && currentUserAttendee.status === "invited" && (
        <Group>
          <form action={rsvpAction.bind(undefined, meetingId, "confirmed")}>
            <Button type="submit" size="small" style="primary" color="success">
              Confirm Attendance
            </Button>
          </form>
          <form action={rsvpAction.bind(undefined, meetingId, "declined")}>
            <Button type="submit" size="small" style="secondary" color="error">
              Decline
            </Button>
          </form>
        </Group>
      )}

      {canEdit && nonAttendeeMembers.length > 0 && (
        <Stack gap="small">
          <Text color="secondary" fs="small">
            Add attendee:
          </Text>
          <Group gap="small">
            {nonAttendeeMembers.map((member) => (
              <form
                key={member.id}
                action={addAttendeeAction.bind(
                  undefined,
                  meetingId,
                  member.id,
                )}
              >
                <Button type="submit" size="small" style="tertiary" color="primary">
                  + {member.name}
                </Button>
              </form>
            ))}
          </Group>
        </Stack>
      )}
    </Stack>
  );
}
