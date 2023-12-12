"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { protocol, tld } from "../../../../../constants";
import { createAndUpdloadFile } from "../../../../../data/files/createAndUploadFile";
import { createThread } from "../../../../../data/inbox/createThread";
import { deleteThread } from "../../../../../data/inbox/deleteThread";
import { deleteThreadChats } from "../../../../../data/inbox/deleteThreadChats";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
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

  const newMessage = await createThread({
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

  if (threadId) {
    const [message0] = await getThreadMessages(threadId);
    const strata = await getCurrentStrata();

    if (message0.senderUserId === undefined && message0.senderEmail && strata) {
      // if the original message was from a non-member, generate an email for them

      await sendEmail(
        message0.senderEmail,
        "Re: " + message0.subject,
        `
        You have a new response from ${strata.name}. 
        To view and reply to the message, click the link below.

        <br />

        ${protocol}//${tld}/dashboard/inbox/${threadId}?viewId=${message0.viewId}
      `,
      );
    }
  }

  revalidatePath("/dashboard/inbox");

  if (threadId) {
    revalidatePath("/dashboard/inbox/" + threadId);
  }

  let redirectLoc = "/dashboard/inbox/" + newMessage.threadId;

  if (newMessage.viewId) {
    redirectLoc += "?viewId=" + newMessage.viewId;
  }

  redirect(redirectLoc);
}
