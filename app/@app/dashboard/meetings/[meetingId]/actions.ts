"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import {
  MeetingAgendaItemUpdate,
  NewMeetingAgendaItem,
} from "../../../../../data";
import { updateFile } from "../../../../../data/files/updateFile";
import { addFileToMeeting } from "../../../../../data/meetings/addFileToMeeting";
import { addItemToMeetingAgenda } from "../../../../../data/meetings/addItemToMeetingAgenda";
import { addMinutesToMeeting } from "../../../../../data/meetings/addMinutesToMeeting";
import { removeFileFromMeeting } from "../../../../../data/meetings/removeFileFromMeeting";
import { removeItemFromAgenda } from "../../../../../data/meetings/removeItemFromMeetingAgenda";
import { removeMinutesFromMeeting } from "../../../../../data/meetings/removeMinutesFromMeeting";
import { updateMeeting } from "../../../../../data/meetings/updateMeeting";
import { updateMeetingAgendaItem } from "../../../../../data/meetings/updateMeetingAgendaItem";
import { updateMeetingEvent } from "../../../../../data/meetings/updateMeetingEvent";
import { updateMinutes } from "../../../../../data/meetings/updateMinutes";
import { assertCan, can, p } from "../../../../../data/users/permissions";
import * as formdata from "../../../../../utils/formdata";

export async function upsertAgendaItemAction(
  meetingId: string,
  agendaItemId: string | undefined,
  fd: FormData,
) {
  const title = formdata.getString(fd, "title");
  const description = formdata.getString(fd, "description");
  const fileId = formdata.getString(fd, "fileId");

  if (title === "") {
    throw new Error("invalid fields");
  }

  if (agendaItemId) {
    const meetingAgendaItemUpdate: MeetingAgendaItemUpdate = {
      title,
      description,
      fileId,
    };

    await updateMeetingAgendaItem(agendaItemId, meetingAgendaItemUpdate);
  } else {
    await addItemToMeetingAgenda(meetingId, {
      title,
      description,
      fileId,
    });
  }

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function addItemToAgendaAction(
  meetingId: string,
  item: Omit<NewMeetingAgendaItem, "id" | "meetingId">,
): Promise<void> {
  await addItemToMeetingAgenda(meetingId, item);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function imperativeUpdateAgendaItemAction(
  meetingId: string,
  itemId: string,
  agendaItemUpdate: MeetingAgendaItemUpdate,
): Promise<void> {
  await updateMeetingAgendaItem(itemId, agendaItemUpdate);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function removeItemFromAgendaAction(
  meetingId: string,
  itemId: string,
): Promise<void> {
  await removeItemFromAgenda(meetingId, itemId);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function clearMinutesUrlAction(meetingId: string) {
  await updateMeeting(meetingId, { minutesUrl: "" });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function updateMinutesUrlAction(meetingId: string, fd: FormData) {
  const minutesUrl = formdata.getString(fd, "minutesUrl");
  await updateMeeting(meetingId, { minutesUrl });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function approveMeetingMinutesUrlAction(meetingId: string) {
  const session = await auth();

  assertCan(session?.user, p("stratas", "meetings", "edit"));

  await updateMeeting(meetingId, {
    minutesUrlApproverId: session.user.id,
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function approveMeetingMinutesAction(
  meetingId: string,
  fileId: string,
) {
  const session = await auth();

  assertCan(session?.user, p("stratas", "meetings", "edit"));

  await updateFile(fileId, { isPublic: 1 });
  await updateMinutes(meetingId, fileId, {
    state: "approved",
    approverId: session.user.id,
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function removeFileFromMeetingAction(
  meetingId: string,
  type: "file" | "minutes",
  fileId: string,
) {
  if (type === "file") {
    await removeFileFromMeeting(meetingId, fileId);
  } else {
    await removeMinutesFromMeeting(meetingId, fileId);
  }

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function addFileToMeetingAction(
  meetingId: string,
  type: "file" | "minutes",
  fileId: string,
): Promise<void> {
  if (type === "file") {
    await addFileToMeeting(meetingId, fileId);
  } else {
    await addMinutesToMeeting(meetingId, fileId);
  }

  revalidatePath("/dashboard/meetings/" + meetingId);
}
