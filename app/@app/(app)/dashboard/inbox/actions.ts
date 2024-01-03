"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { protocol, tld } from "../../../../../constants";
import { StrataMembership, User } from "../../../../../data";
import { createThreadEmail } from "../../../../../data/emails/createThreadEmail";
import { createAndUpdloadFile } from "../../../../../data/files/createAndUploadFile";
import { createThread } from "../../../../../data/inbox/createThread";
import { deleteThread } from "../../../../../data/inbox/deleteThread";
import { deleteThreadChats } from "../../../../../data/inbox/deleteThreadChats";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { getStrataMembership } from "../../../../../data/strataMemberships/getStrataMembership";
import { createStrata } from "../../../../../data/stratas/createStrata";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { getStrataById } from "../../../../../data/stratas/getStrataById";
import * as formdata from "../../../../../utils/formdata";
import { sendEmail } from "../../../../../utils/sendEmail";

export async function deleteThreadAction(threadId: string) {
  await deleteThread(threadId);
  await deleteThreadChats(threadId);

  revalidatePath("/dashboard/inbox");
}

export async function sendInboxMessageAction(
  strataId: string,
  threadId: string | undefined,
  fd: FormData,
) {
  const u = await auth();

  const senderName = formdata.getString(fd, "name");
  const senderEmail = formdata.getString(fd, "email_address");
  const senderPhoneNumber = formdata.getString(fd, "phone_number");
  const message = formdata.getString(fd, "message");

  let existingFileId = formdata.getString(fd, "existing_file");
  const newFile = formdata.getFile(fd, "new_file");

  const subject = formdata.getString(fd, "subject");
  const recipients = Object.entries(formdata.getObject(fd, "recipients"))
    .filter(([, v]) => v === "on")
    .map(([v]) => v);

  if (
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof senderPhoneNumber !== "string" ||
    typeof message !== "string" ||
    message === "" ||
    typeof subject !== "string" ||
    // subject is optional if threaded
    (threadId === undefined && subject === "")
  ) {
    throw new Error("invalid data");
  }

  let fileId = existingFileId;

  if (newFile && newFile.size !== 0) {
    const file = await createAndUpdloadFile(
      strataId,
      u?.user?.id,
      newFile.name,
      "",
      newFile.name,
      newFile,
      false,
    );

    fileId = file.id;
  }

  const newThread = await createThread({
    senderName,
    senderEmail,
    senderPhoneNumber,
    message,
    subject,
    senderUserId: u?.user?.id,
    strataId,
    fileId,
    ...(threadId && { threadId }),
  });

  const [message0] = await getThreadMessages(threadId || newThread.threadId);
  const strata = (await getStrataById(strataId))!;

  let viewPath = `/dashboard/inbox/${threadId || newThread.threadId}`;

  if (newThread.viewId) {
    viewPath += "?viewId=" + newThread.viewId;
  }

  const viewUrl = `${protocol}//${strata.domain}${viewPath}`;

  console.log(recipients);

  if (recipients.length) {
    const memberRecipients = (
      await Promise.all(recipients.map((r) => getStrataMembership(strataId, r)))
    )
      .filter((r): r is StrataMembership & User => !!r)
      .map((r) => r.email);

    for (const recipient of memberRecipients) {
      const r = await sendEmail(
        recipient,
        subject,
        message + `<br /> ${viewUrl}`,
      );

      await createThreadEmail({
        emailId: r.id,
        threadId: threadId || newThread.threadId,
        userId: u?.user.id,
      });
    }
  }

  if (threadId) {
    if (message0.senderUserId === undefined && message0.senderEmail) {
      // if the original message was from a non-member, generate an email for them

      await sendEmail(
        message0.senderEmail,
        "Re: " + message0.subject,
        `
        You have a new response from ${strata.name}. 
        To view and reply to the message, click the link below.

        <br />

        ${viewUrl}
      `,
      );
    }

    revalidatePath("/dashboard/inbox/" + threadId);
  }

  revalidatePath("/dashboard/inbox");
  redirect(viewPath);
}
