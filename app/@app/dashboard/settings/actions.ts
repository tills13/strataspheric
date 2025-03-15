"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { deleteRecord } from "../../../../cloudflare/dns/deleteRecord";
import { removeCustomDomain } from "../../../../cloudflare/pages/removeCustomDomain";
import { protocol, tld } from "../../../../constants";
import { deleteAllEvents } from "../../../../data/events/deleteAllEvents";
import { deleteAllFiles } from "../../../../data/files/deleteAllFiles";
import { listFiles } from "../../../../data/files/listFiles";
import { deleteAllThreadChats } from "../../../../data/inbox/deleteAllThreadChats";
import { deleteAllThreads } from "../../../../data/inbox/deleteAllThreads";
import { deleteAllMeetings } from "../../../../data/meetings/deleteAllMeetings";
import { r2 } from "../../../../data/r2";
import { deleteAllStrataMemberships } from "../../../../data/strataMemberships/deleteAllStrataMemberships";
import { updateStrataMembership } from "../../../../data/strataMemberships/updateStrataMembership";
import { deleteStrata } from "../../../../data/stratas/deleteStrata";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { deleteAllWidgets } from "../../../../data/widgets/deleteAllWidgets";

const NotAuthorized = new Error("not authorized");

export async function deleteStrataAction() {
  const currentStrata = await getCurrentStrata();
  const session = await auth();

  if (!currentStrata || !can(session?.user, "stratas.delete")) {
    throw NotAuthorized;
  }

  const files = await listFiles(currentStrata.id, true);

  if (files.length !== 0) {
    await r2.delete(files.map((file) => file.path));
  }

  // await deleteAllEmails();
  await deleteAllEvents(currentStrata.id);
  await deleteAllFiles(currentStrata.id);
  await deleteAllThreadChats(currentStrata.id);
  await deleteAllThreads(currentStrata.id);
  await deleteAllMeetings(currentStrata.id);
  await deleteAllWidgets(currentStrata.id);
  await deleteStrata(currentStrata.id);
  await deleteAllStrataMemberships(currentStrata.id);

  if (process.env.NODE_ENV !== "development") {
    await removeCustomDomain(currentStrata.domain);
    await deleteRecord(currentStrata.domainRecordId);
  }

  redirect(`${protocol}//${tld}`);
}

export async function approveStrataMembershipAction(
  strataId: string,
  memberId: string,
) {
  await updateStrataMembership(strataId, memberId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
