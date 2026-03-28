"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { createEvent } from "../../../../data/events/createEvent";
import { addMeetingAttendee } from "../../../../data/meetings/addMeetingAttendee";
import { createMeeting } from "../../../../data/meetings/createMeeting";
import { deleteMeeting } from "../../../../data/meetings/deleteMeeting";
import { getMeeting } from "../../../../data/meetings/getMeeting";
import { removeMeetingAttendee } from "../../../../data/meetings/removeMeetingAttendee";
import { updateMeeting } from "../../../../data/meetings/updateMeeting";
import { updateMeetingAttendee } from "../../../../data/meetings/updateMeetingAttendee";
import { updateMeetingEvent } from "../../../../data/meetings/updateMeetingEvent";
import { getStrataMembership } from "../../../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import * as formdata from "../../../../utils/formdata";
import { sendNotification } from "../../../../utils/notifications";

export async function upsertMeetingAction(
  meetingId: string | undefined,
  fd: FormData,
) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  if (!session) {
    throw new Error("not allowed");
  }

  const purpose = formdata.getString(fd, "purpose");

  const startDateTs = formdata.getTimestamp(fd, "date_start");
  const endDateTs = formdata.getTimestamp(fd, "date_end") || startDateTs;

  if (meetingId) {
    await updateMeeting(meetingId, { purpose });
    await updateMeetingEvent(meetingId, {
      name: purpose,
      startDate: startDateTs,
      endDate: endDateTs,
    });

    revalidatePath("/dashboard/meetings");
    revalidatePath("/dashboard/meetings/" + meetingId);
  } else {
    const event = await createEvent({
      strataId: strata.id,
      creatorId: session.user.id,
      name: purpose,
      description: "",
      startDate: startDateTs,
      endDate: endDateTs,
    });

    const { id: meetingId } = await createMeeting({
      strataId: strata.id,
      callerId: session.user.id,
      eventId: event.id,
      purpose,
    });

    redirect("/dashboard/meetings/" + meetingId);
  }
}

export async function deleteMeetingAction(meetingId: string) {
  await deleteMeeting(meetingId);

  revalidatePath("/dashboard/meetings");
  redirect("/dashboard/meetings");
}

export async function addAttendeeAction(meetingId: string, userId: string) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  const strata = await mustGetCurrentStrata();
  const meeting = await getMeeting(strata.id, meetingId);

  await addMeetingAttendee(meetingId, userId);

  const member = await getStrataMembership(strata.id, userId);
  if (member) {
    const startDate = new Date(meeting.startDate * 1000);
    await sendNotification({
      to: member.email,
      subject: `You've been added to: ${meeting.purpose}`,
      html: `
        <h2>${meeting.purpose}</h2>
        <p>You've been added as an attendee to this meeting.</p>
        <p><strong>Date:</strong> ${startDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        <p>Visit your dashboard to confirm your attendance.</p>
      `,
    });
  }

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function removeAttendeeAction(meetingId: string, userId: string) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  await removeMeetingAttendee(meetingId, userId);
  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function rsvpAction(
  meetingId: string,
  status: "confirmed" | "declined",
) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  await updateMeetingAttendee(meetingId, session.user.id, {
    status,
    respondedAt: Date.now(),
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}
