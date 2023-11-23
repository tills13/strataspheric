"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../../auth";
import { createInboxThreadChat } from "../../../../../../db/inbox/createInboxThreadChat";

export async function sendInboxThreadChatAction(
  threadId: string,
  fd: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthorized");
  }

  const message = fd.get("message");
  const messageId = fd.get("message_id") || "";
  const fileId = fd.get("fileId") || "";

  if (
    typeof message !== "string" ||
    message === "" ||
    (messageId && typeof messageId !== "string") ||
    (fileId && typeof fileId !== "string")
  ) {
    throw new Error("invalid data");
  }

  await createInboxThreadChat({
    threadId,
    message,
    messageId,
    fileId,
    userId: session.user.id,
  });

  revalidatePath("/dashboard/inbox/" + threadId);
}
