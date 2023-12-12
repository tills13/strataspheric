"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { createEvent } from "../../../../../data/events/createEvent";
import { createMeeting } from "../../../../../data/meetings/createMeeting";
import { deleteMeeting } from "../../../../../data/meetings/deleteMeeting";
import * as formdata from "../../../../../utils/formdata";

export async function createMeetingAction(strataId: string, fd: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const purpose = formdata.getString(fd, "purpose");

  const event = await createEvent({
    strataId,
    creatorId: session.user.id,
    name: purpose,
    description: "",
    startDate: formdata.getString(fd, "startDate"),
    endDate: formdata.getString(fd, "endDate"),
  });

  const { id: meetingId } = await createMeeting({
    strataId,
    callerId: session.user.id,
    eventId: event.id,
    purpose,
  });

  redirect("/dashboard/meetings/" + meetingId);
}

export async function deleteMeetingAction(meetingId: string) {
  await deleteMeeting(meetingId);

  revalidatePath("/dashboard/meetings");
  redirect("/dashboard/meetings");
}
