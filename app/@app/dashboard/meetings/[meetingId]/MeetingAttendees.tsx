import { mustAuth } from "../../../../../auth";
import { Button } from "../../../../../components/Button";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
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

  const confirmed = attendees.filter((a) => a.status === "confirmed");
  const declined = attendees.filter((a) => a.status === "declined");
  const pending = attendees.filter(
    (a) => a.status !== "confirmed" && a.status !== "declined",
  );

  return (
    <Stack>
      <Header as="h3">Attendees</Header>

      {attendees.length === 0 && (
        <Text color="secondary">No attendees have been added yet.</Text>
      )}

      {confirmed.length > 0 && (
        <Stack gap="small">
          <Text color="secondary" fs="small">
            Confirmed
          </Text>
          <Group gap="small" wrap="wrap">
            {confirmed.map((attendee) => (
              <form
                key={attendee.userId}
                action={
                  canEdit
                    ? removeAttendeeAction.bind(
                        undefined,
                        meetingId,
                        attendee.userId,
                      )
                    : undefined
                }
              >
                <Button
                  type={canEdit ? "submit" : "button"}
                  size="small"
                  style="secondary"
                  color="success"
                  icon={canEdit ? <RemoveIcon /> : undefined}
                  iconTextBehaviour="centerRemainder"
                >
                  {attendee.name}
                </Button>
              </form>
            ))}
          </Group>
        </Stack>
      )}

      {pending.length > 0 && (
        <Stack gap="small">
          <Text color="secondary" fs="small">
            Pending
          </Text>
          <Group gap="small" wrap="wrap">
            {pending.map((attendee) => (
              <form
                key={attendee.userId}
                action={
                  canEdit
                    ? removeAttendeeAction.bind(
                        undefined,
                        meetingId,
                        attendee.userId,
                      )
                    : undefined
                }
              >
                <Button
                  color="primary"
                  type={canEdit ? "submit" : "button"}
                  size="small"
                  style="secondary"
                  icon={canEdit ? <RemoveIcon /> : undefined}
                  iconTextBehaviour="centerRemainder"
                >
                  {attendee.name}
                </Button>
              </form>
            ))}
          </Group>
        </Stack>
      )}

      {declined.length > 0 && (
        <Stack gap="small">
          <Text color="secondary" fs="small">
            Declined
          </Text>
          <Group gap="small" wrap="wrap">
            {declined.map((attendee) => (
              <form
                key={attendee.userId}
                action={
                  canEdit
                    ? removeAttendeeAction.bind(
                        undefined,
                        meetingId,
                        attendee.userId,
                      )
                    : undefined
                }
              >
                <Button
                  type={canEdit ? "submit" : "button"}
                  size="small"
                  style="secondary"
                  color="error"
                  icon={canEdit ? <RemoveIcon /> : undefined}
                  iconTextBehaviour="centerRemainder"
                >
                  {attendee.name}
                </Button>
              </form>
            ))}
          </Group>
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
          <Group gap="small" wrap="wrap">
            {nonAttendeeMembers.map((member) => (
              <form
                key={member.id}
                action={addAttendeeAction.bind(undefined, meetingId, member.id)}
              >
                <Button
                  type="submit"
                  size="small"
                  style="tertiary"
                  color="primary"
                  icon={<AddIcon />}
                  iconTextBehaviour="centerRemainder"
                >
                  {member.name}
                </Button>
              </form>
            ))}
          </Group>
        </Stack>
      )}
    </Stack>
  );
}
