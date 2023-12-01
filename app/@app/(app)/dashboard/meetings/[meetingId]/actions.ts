"use server";

import { revalidatePath } from "next/cache";

import {
  MeetingAgendaItemUpdate,
  MeetingUpdate,
  NewMeetingAgendaItem,
} from "../../../../../../data";
import { addItemToMeetingAgenda } from "../../../../../../data/meetings/addItemToMeetingAgenda";
import { removeItemFromAgenda } from "../../../../../../data/meetings/removeItemFromMeetingAgenda";
import { updateMeeting } from "../../../../../../data/meetings/updateMeeting";
import { updateMeetingAgendaItem } from "../../../../../../data/meetings/updateMeetingAgendaItem";
import * as formdata from "../../../../../../utils/formdata";
import { AgendaTimelineEntry } from "./MeetingTimelineSearch";

export async function updateMeetingAction(meetingId: string, fd: FormData) {
  const meetingUpdate: MeetingUpdate = {
    purpose: formdata.getString(fd, "purpose"),
    date: formdata.getString(fd, "date"),
  };

  if (Object.keys(meetingUpdate).length === 0) {
    return;
  }

  await updateMeeting(meetingId, meetingUpdate);
  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function createMeetingAgendaItemAction(
  meetingId: string,
  fd: FormData,
) {
  const title = formdata.getString(fd, "title");
  const description = formdata.getString(fd, "description");

  if (title === "") {
    throw new Error("invalid fields");
  }

  await addItemToMeetingAgenda(meetingId, {
    title,
    description,
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function addItemToAgendaAction(
  meetingId: string,
  item: AgendaTimelineEntry,
): Promise<void> {
  let newItem: Omit<NewMeetingAgendaItem, "id"> = {
    description: item.description,
    title: item.title,
    meetingId,
  };

  if (item.type === "chat") {
    newItem.chatId = item.id;
  } else if (item.type === "event") {
    newItem.eventId = item.id;
  } else if (item.type === "file") {
    newItem.fileId = item.id;
  } else if (item.type === "inbox_message") {
    newItem.messageId = item.id;
  }

  await addItemToMeetingAgenda(meetingId, newItem);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function updateAgendaItemAction(
  meetingId: string,
  itemId: string,
  fd: FormData,
): Promise<void> {
  const meetingAgendaItemUpdate: MeetingAgendaItemUpdate = {
    title: formdata.getString(fd, "title"),
    description: formdata.getString(fd, "description"),
  };

  if (Object.keys(meetingAgendaItemUpdate).length === 0) {
    return;
  }

  await updateMeetingAgendaItem(itemId, meetingAgendaItemUpdate);

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
