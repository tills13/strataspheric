"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../../../auth";
import { createThread } from "../../../../../data/inbox/createThread";
import { deleteThread } from "../../../../../data/inbox/deleteThread";
import { deleteThreadChats } from "../../../../../data/inbox/deleteThreadChats";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { sendEmail } from "../../../../../utils/sendEmail";

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://strataspheric.app";

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

  const senderName = fd.get("name") ?? "";
  const senderEmail = fd.get("email_address") ?? "";
  const senderPhoneNumber = fd.get("phone_number") ?? "";
  const message = fd.get("message");
  const fileId = fd.get("fileId") || "";
  const subject = fd.get("subject") ?? "";

  if (
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof senderPhoneNumber !== "string" ||
    typeof message !== "string" ||
    message === "" ||
    typeof subject !== "string" ||
    // subject is optional if threaded
    (threadId === undefined && subject === "") ||
    (fileId && typeof fileId !== "string")
  ) {
    throw new Error("invalid data");
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

        ${domain}/dashboard/inbox/${threadId}?viewId=${message0.viewId}
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
