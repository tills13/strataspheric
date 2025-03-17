"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { createEvent } from "../../../../data/events/createEvent";
import { createMeeting } from "../../../../data/meetings/createMeeting";
import { deleteMeeting } from "../../../../data/meetings/deleteMeeting";
import { updateMeeting } from "../../../../data/meetings/updateMeeting";
import { updateMeetingEvent } from "../../../../data/meetings/updateMeetingEvent";
import * as formdata from "../../../../utils/formdata";

export async function upsertMeetingAction(
  strataId: string,
  meetingId: string | undefined,
  fd: FormData,
) {
  const session = await auth();

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
      strataId,
      creatorId: session.user.id,
      name: purpose,
      description: "",
      startDate: startDateTs,
      endDate: endDateTs,
    });

    const { id: meetingId } = await createMeeting({
      strataId,
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
