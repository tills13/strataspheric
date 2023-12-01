"use server";

import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { createMeeting } from "../../../../../data/meetings/createMeeting";
import * as formdata from "../../../../../utils/formdata";

export async function createMeetingAction(strataId: string, fd: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("not allowed");
  }

  const purpose = formdata.getString(fd, "purpose");
  const date = formdata.getString(fd, "date");

  const { id: meetingId } = await createMeeting({
    strataId,
    callerId: session.user.id,
    purpose,
    date,
  });

  redirect("/dashboard/meetings/" + meetingId);
}

export async function deleteMeetingAction(meetingId: string) {}
