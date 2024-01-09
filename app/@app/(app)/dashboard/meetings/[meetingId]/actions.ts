"use server";

import { revalidatePath } from "next/cache";

import {
  MeetingAgendaItemUpdate,
  NewMeetingAgendaItem,
} from "../../../../../../data";
import { addFileToMeeting } from "../../../../../../data/meetings/addFileToMeeting";
import { addItemToMeetingAgenda } from "../../../../../../data/meetings/addItemToMeetingAgenda";
import { removeItemFromAgenda } from "../../../../../../data/meetings/removeItemFromMeetingAgenda";
import { updateMeeting } from "../../../../../../data/meetings/updateMeeting";
import { updateMeetingAgendaItem } from "../../../../../../data/meetings/updateMeetingAgendaItem";
import { updateMeetingEvent } from "../../../../../../data/meetings/updateMeetingEvent";
import * as formdata from "../../../../../../utils/formdata";
import { AgendaTimelineEntry } from "./MeetingTimelineSearch";

export async function updateMeetingAction(meetingId: string, fd: FormData) {
  const purpose = formdata.getString(fd, "purpose");
  const startDate = formdata.getTimestamp(fd, "startDate");
  const endDate = formdata.getTimestamp(fd, "endDate") || startDate;

  await updateMeeting(meetingId, { purpose });
  await updateMeetingEvent(meetingId, {
    name: purpose,
    startDate,
    endDate,
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

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
  item: AgendaTimelineEntry,
): Promise<void> {
  let newItem: Omit<NewMeetingAgendaItem, "id"> = {
    title: "",
    description: "",
    meetingId,
  };

  if (item.type === "chat") {
    newItem.chatId = item.chatId;
    // newItem.description = item.chatMessage;
    newItem.title = "Discuss message chat";
  } else if (item.type === "event") {
    newItem.eventId = item.eventId;
    newItem.title = `Discuss upcoming event "${item.eventName}"`;
  } else if (item.type === "file") {
    newItem.fileId = item.fileId;
    newItem.title = `Discuss file "${item.fileName}"`;
  } else if (item.type === "inbox_message") {
    newItem.messageId = item.messageId;
    newItem.title = "Discuss recieved message";
  }

  await addItemToMeetingAgenda(meetingId, newItem);

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

export async function addFileToMeetingAction(
  meetingId: string,
  fileId: string,
): Promise<void> {
  await addFileToMeeting(meetingId, fileId);

  revalidatePath("/dashboard/meetings/" + meetingId);
}
