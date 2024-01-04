"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { deleteRecord } from "../../../../../cloudflare/dns/deleteRecord";
import { removeCustomDomain } from "../../../../../cloudflare/pages/removeCustomDomain";
import { protocol, tld } from "../../../../../constants";
import { deleteAllEvents } from "../../../../../data/events/deleteAllEvents";
import { deleteAllFiles } from "../../../../../data/files/deleteAllFiles";
import { getFiles } from "../../../../../data/files/getFiles";
import { deleteAllThreadChats } from "../../../../../data/inbox/deleteAllThreadChats";
import { deleteAllThreads } from "../../../../../data/inbox/deleteAllThreads";
import { deleteAllMeetings } from "../../../../../data/meetings/deleteAllMeetings";
import { r2 } from "../../../../../data/r2";
import { deleteAllStrataMemberships } from "../../../../../data/strataMemberships/deleteAllStrataMemberships";
import { updateStrataMembership } from "../../../../../data/strataMemberships/updateStrataMembership";
import { deleteStrata } from "../../../../../data/stratas/deleteStrata";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { updateStrata } from "../../../../../data/stratas/updateStrata";
import { can, p } from "../../../../../data/users/permissions";
import { deleteAllWidgets } from "../../../../../data/widgets/deleteAllWidgets";

const NotAuthorized = new Error("not authorized");

export async function deleteStrataAction() {
  const currentStrata = await getCurrentStrata();
  const session = await auth();

  if (!currentStrata || !can(session?.user, "stratas.delete")) {
    throw NotAuthorized;
  }

  const files = await getFiles(currentStrata.id, true);

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

export async function updateStrataAction(formData: FormData) {
  const id = formData.get("id");
  const strataId = formData.get("strata_id") || "";
  const streetAddress = formData.get("strata_address_street_address") || "";
  const postalCode = formData.get("strata_address_postal_code") || "";
  const provinceState = formData.get("strata_address_province_state") || "";
  const strataName = formData.get("name");
  const isPublic = formData.get("is_public") === "on";

  if (
    typeof id !== "string" ||
    id === "" ||
    typeof strataId !== "string" ||
    typeof streetAddress !== "string" ||
    typeof postalCode !== "string" ||
    typeof provinceState !== "string" ||
    typeof strataName !== "string" ||
    strataName === ""
  ) {
    throw new Error("invalid fields");
  }

  await updateStrata(id, {
    name: strataName,
    strataId,
    streetAddress,
    postalCode,
    provinceState,
    isPublic: isPublic ? 1 : 0,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
}

export async function approveStrataMembershipAction(
  strataId: string,
  memberId: string,
) {
  await updateStrataMembership(strataId, memberId, { role: "owner" });
  revalidatePath("/dashboard/membership");
}
