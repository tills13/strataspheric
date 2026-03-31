"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import {
  AgendaItemVoteValue,
  MeetingAgendaItemType,
  MeetingAgendaItemUpdate,
  NewMeetingAgendaItem,
} from "../../../../../data";
import { db } from "../../../../../data";
import { createAndUploadFile } from "../../../../../data/files/createAndUploadFile";
import { updateFile } from "../../../../../data/files/updateFile";
import { listAgendaItemVotes } from "../../../../../data/meetings/listAgendaItemVotes";
import { addFileToMeeting } from "../../../../../data/meetings/addFileToMeeting";
import {
  addItemToMeetingAgenda,
  insertAgendaItemAfter,
} from "../../../../../data/meetings/addItemToMeetingAgenda";
import { addMinutesToMeeting } from "../../../../../data/meetings/addMinutesToMeeting";
import { recordAgendaItemVote } from "../../../../../data/meetings/recordAgendaItemVote";
import { removeAgendaItemVote } from "../../../../../data/meetings/removeAgendaItemVote";
import { removeFileFromMeeting } from "../../../../../data/meetings/removeFileFromMeeting";
import { listMeetingAttendees } from "../../../../../data/meetings/listMeetingAttendees";
import { reorderAgendaItem } from "../../../../../data/meetings/reorderAgendaItem";
import { getMeeting } from "../../../../../data/meetings/getMeeting";
import { listMeetingAgendaItems } from "../../../../../data/meetings/listMeetingAgendaItems";
import { removeItemFromAgenda } from "../../../../../data/meetings/removeItemFromMeetingAgenda";
import { removeMinutesFromMeeting } from "../../../../../data/meetings/removeMinutesFromMeeting";
import { updateMeeting } from "../../../../../data/meetings/updateMeeting";
import { updateMeetingAgendaItem } from "../../../../../data/meetings/updateMeetingAgendaItem";
import { updateMinutes } from "../../../../../data/meetings/updateMinutes";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { assertCan, p } from "../../../../../data/users/permissions";
import * as formdata from "../../../../../utils/formdata";
import {
  MeetingMinutesGenerator,
  plainTextMinutesGenerator,
} from "../../../../../utils/generateMeetingMinutes";

const VALID_AGENDA_ITEM_TYPES: MeetingAgendaItemType[] = [
  "item",
  "discussion",
  "vote",
];

export async function upsertAgendaItemAction(
  meetingId: string,
  agendaItemId: string | undefined,
  fd: FormData,
) {
  const title = formdata.getString(fd, "title");
  const description = formdata.getString(fd, "description");
  const fileId = formdata.getString(fd, "fileId");
  const invoiceId = formdata.getString(fd, "invoiceId");
  const rawType = formdata.getString(fd, "type") || "item";

  if (title === "") {
    throw new Error("invalid fields");
  }

  const type = VALID_AGENDA_ITEM_TYPES.includes(
    rawType as MeetingAgendaItemType,
  )
    ? (rawType as MeetingAgendaItemType)
    : "item";

  if (agendaItemId) {
    const meetingAgendaItemUpdate: MeetingAgendaItemUpdate = {
      title,
      description,
      type,
      fileId,
      invoiceId,
    };

    await updateMeetingAgendaItem(agendaItemId, meetingAgendaItemUpdate);
  } else {
    await addItemToMeetingAgenda(meetingId, {
      title,
      description,
      type,
      fileId,
      invoiceId,
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
  if (agendaItemUpdate.done === 1) {
    const item = await db()
      .selectFrom("meeting_agenda_items")
      .select(["type"])
      .where("id", "=", itemId)
      .executeTakeFirstOrThrow();

    if (item.type === "vote") {
      const [attendees, votes] = await Promise.all([
        listMeetingAttendees(meetingId),
        listAgendaItemVotes(itemId),
      ]);

      const votedUserIds = new Set(votes.map((v) => v.userId));
      const allVoted = attendees.every((a) => votedUserIds.has(a.userId));

      if (!allVoted) {
        throw new Error(
          "All attendees must cast a vote before completing this item.",
        );
      }
    }
  }

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

export async function reorderAgendaItemAction(
  meetingId: string,
  itemId: string,
  direction: "up" | "down",
): Promise<void> {
  await reorderAgendaItem(meetingId, itemId, direction);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function insertAgendaItemAfterAction(
  meetingId: string,
  afterItemId: string,
  fd: FormData,
): Promise<void> {
  const title = formdata.getString(fd, "title");
  const description = formdata.getString(fd, "description");
  const rawType = formdata.getString(fd, "type") || "item";

  if (title === "") {
    throw new Error("invalid fields");
  }

  const type = VALID_AGENDA_ITEM_TYPES.includes(
    rawType as MeetingAgendaItemType,
  )
    ? (rawType as MeetingAgendaItemType)
    : "item";

  await insertAgendaItemAfter(meetingId, afterItemId, {
    title,
    description,
    type,
  });

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

export async function recordVoteAction(
  meetingId: string,
  agendaItemId: string,
  userId: string,
  vote: AgendaItemVoteValue,
): Promise<void> {
  await recordAgendaItemVote(agendaItemId, userId, vote);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function removeVoteAction(
  meetingId: string,
  agendaItemId: string,
  userId: string,
): Promise<void> {
  await removeAgendaItemVote(agendaItemId, userId);

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function generateMeetingMinutesAction(
  meetingId: string,
): Promise<void> {
  const generator: MeetingMinutesGenerator = plainTextMinutesGenerator;
  const session = await auth();
  const strata = await mustGetCurrentStrata();

  assertCan(session?.user, p("stratas", "meetings", "edit"));

  const [meeting, agendaItems, attendees] = await Promise.all([
    getMeeting(strata.id, meetingId),
    listMeetingAgendaItems(meetingId),
    listMeetingAttendees(meetingId),
  ]);

  const content = await generator.generate({
    purpose: meeting.purpose,
    callerName: meeting.caller,
    strataName: strata.name,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
    notes: meeting.notes,
    attendees,
    agendaItems,
  });

  const fileName = `minutes-${meeting.purpose.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
  const blob = new Blob([content], { type: "text/plain; charset=utf-8" });
  const file = new File([blob], fileName, { type: "text/plain" });

  const uploaded = await createAndUploadFile(
    strata.id,
    session.user.id,
    fileName,
    `Meeting minutes for "${meeting.purpose}"`,
    fileName,
    file,
    false,
  );

  await addMinutesToMeeting(meetingId, uploaded.id);

  revalidatePath("/dashboard/meetings/" + meetingId);
}
