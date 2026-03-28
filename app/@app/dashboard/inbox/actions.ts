"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import { protocol } from "../../../../constants";
import { createThreadEmail } from "../../../../data/emails/createThreadEmail";
import { archiveThreads } from "../../../../data/inbox/archiveThreads";
import { createThreadMessage } from "../../../../data/inbox/createThreadMessage";
import { deleteThread } from "../../../../data/inbox/deleteThread";
import { deleteThreadChats } from "../../../../data/inbox/deleteThreadChats";
import { getThreadMessages } from "../../../../data/inbox/getThreadMessages";
import { updateThread } from "../../../../data/inbox/updateThread";
import {
  StrataMembership,
  getStrataMembership,
} from "../../../../data/memberships/getStrataMembership";
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { assertCan } from "../../../../data/users/permissions";
import * as formdata from "../../../../utils/formdata";
import { sendNotification } from "../../../../utils/notifications";
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

    // Notify thread participants
    const allMessages = await getThreadMessages(threadId);
    const participantUserIds = [
      ...new Set(
        allMessages
          .map((m) => m.senderUserId)
          .filter((id): id is string => !!id && id !== u?.user?.id),
      ),
    ];

    const participantEmails: string[] = [];
    for (const uid of participantUserIds) {
      const member = await getStrataMembership(strata.id, uid);
      if (member) participantEmails.push(member.email);
    }

    if (participantEmails.length > 0) {
      await sendNotification({
        to: participantEmails,
        subject: `Re: ${message0.subject}`,
        html: `
          <p><strong>${u?.user?.name || senderName || "Someone"}</strong> replied:</p>
          <p>${message}</p>
          <p><a href="${viewUrl}">View conversation</a></p>
        `,
        ccStrataInbox: true,
      });
    }

    revalidatePath("/dashboard/inbox/" + threadId);
    return;
  }

  // For new threads, CC strata inbox
  await sendNotification({
    to: [],
    subject: subject,
    html: `
      <p><strong>${senderName || "Someone"}</strong> sent a new message:</p>
      <p>${message}</p>
    `,
    ccStrataInbox: true,
  });

  revalidatePath("/dashboard/inbox");
  redirect(viewPath);
}

export async function markThreadAsReadAction(threadId: string) {
  await updateThread(threadId, { isUnread: 0 });
  revalidatePath("/dashboard/inbox");
}

export async function markThreadAsUnreadAction(threadId: string) {
  await updateThread(threadId, { isUnread: 1 });
  revalidatePath("/dashboard/inbox");
}

export async function archiveThreadAction(threadId: string) {
  await archiveThreads([threadId]);
  revalidatePath("/dashboard/inbox");
}

export async function archiveThreadsAction(threadIds: string[]) {
  await archiveThreads(threadIds);
  revalidatePath("/dashboard/inbox");
}

export async function unarchiveThreadAction(threadId: string) {
  await updateThread(threadId, { archivedAt: null });
  revalidatePath("/dashboard/inbox");
  revalidatePath("/dashboard/inbox/archived");
}

export async function sendInboxBlastAction(fd: FormData) {
  const [session, strata] = await Promise.all([
    auth(),
    mustGetCurrentStrata(),
  ]);

  if (!session) throw new Error("not allowed");
  assertCan(session.user, "stratas.inbox_blasts.create");

  const subject = formdata.getString(fd, "subject");
  const message = formdata.getString(fd, "message");

  if (!subject || !message) {
    throw new Error("Subject and message are required");
  }

  const newMessage = await createThreadMessage({
    subject,
    message,
    senderUserId: session.user.id,
    strataId: strata.id,
  });

  const members = await listStrataMemberships({ strataId: strata.id });
  const recipientEmails = members
    .map((m) => m.email)
    .filter((email) => email !== session.user.email);

  if (recipientEmails.length > 0) {
    await sendNotification({
      to: recipientEmails,
      subject,
      html: `
        <p><strong>${session.user.name}</strong> sent a message to all members:</p>
        <p>${message}</p>
        <p><a href="${protocol}//${strata.domain}/dashboard/inbox/${newMessage.threadId}">View message</a></p>
      `,
      ccStrataInbox: true,
    });
  }

  revalidatePath("/dashboard/inbox");
  redirect(`/dashboard/inbox/${newMessage.threadId}`);
}
