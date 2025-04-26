"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { protocol } from "../../../../constants";
import { createThreadEmail } from "../../../../data/emails/createThreadEmail";
import { createThreadMessage } from "../../../../data/inbox/createThreadMessage";
import { deleteThread } from "../../../../data/inbox/deleteThread";
import { deleteThreadChats } from "../../../../data/inbox/deleteThreadChats";
import { getThreadMessages } from "../../../../data/inbox/getThreadMessages";
import {
  StrataMembership,
  getStrataMembership,
} from "../../../../data/memberships/getStrataMembership";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import * as formdata from "../../../../utils/formdata";
import { sendEmail } from "../../../../utils/sendEmail";

export async function deleteThreadAction(threadId: string) {
  await deleteThread(threadId);
  await deleteThreadChats(threadId);

  revalidatePath("/dashboard/inbox");
  redirect("/dashboard/inbox");
}

export async function createInboxMessageAction(
  threadId: string | undefined,
  fd: FormData,
) {
  const strata = await mustGetCurrentStrata();
  const u = await auth();

  const senderName = formdata.getString(fd, "name");
  const senderEmail = formdata.getString(fd, "email_address");
  const senderPhoneNumber = formdata.getString(fd, "phone_number");
  const message = formdata.getString(fd, "message");

  const fileId = formdata.getString(fd, "fileId");
  const invoiceId = formdata.getString(fd, "invoiceId");
  const subject = formdata.getString(fd, "subject");

  if (
    message === "" ||
    // subject is optional if threaded
    (threadId === undefined && subject === "")
  ) {
    throw new Error("invalid data");
  }

  const newMessage = await createThreadMessage({
    senderName,
    senderEmail,
    senderPhoneNumber,
    message,
    subject,
    senderUserId: u?.user?.id,
    strataId: strata.id,
    fileId,
    invoiceId,
    ...(threadId && { threadId }),
  });

  const [message0] = await getThreadMessages(threadId || newMessage.threadId);

  let viewPath = `/dashboard/inbox/${threadId || newMessage.threadId}`;

  if (newMessage.viewId) {
    viewPath += "?viewId=" + newMessage.viewId;
  }

  const viewUrl = `${protocol}//${strata.domain}${viewPath}`;

  const recipients = Object.entries(formdata.getObject(fd, "recipients"))
    .filter(([, v]) => v === "on")
    .map(([v]) => v);

  if (recipients.length) {
    const memberRecipients = (
      await Promise.all(
        recipients.map((r) => getStrataMembership(strata.id, r)),
      )
    )
      .filter((r): r is StrataMembership => !!r)
      .map((r) => r.email);

    for (const recipient of memberRecipients) {
      const r = await sendEmail(
        recipient,
        subject,
        message + `<br /> ${viewUrl}`,
      );

      await createThreadEmail({
        emailId: r.id,
        threadId: threadId || newMessage.threadId,
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
    return;
  }

  revalidatePath("/dashboard/inbox");
  redirect(viewPath);
}
