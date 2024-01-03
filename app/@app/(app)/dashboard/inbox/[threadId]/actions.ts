"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../../auth";
import { createThreadChat } from "../../../../../../data/inbox/createThreadChat";

export async function sendInboxThreadChatAction(
  threadId: string,
  messageId: string,
  fd: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthorized");
  }

  const message = fd.get("message");
  const fileId = fd.get("fileId") || "";

  if (
    typeof message !== "string" ||
    message === "" ||
    (messageId && typeof messageId !== "string") ||
    (fileId && typeof fileId !== "string")
  ) {
    throw new Error("invalid data");
  }

  await createThreadChat({
    threadId,
    message,
    messageId,
    fileId,
    userId: session.user.id,
  });

  revalidatePath("/dashboard/inbox/" + threadId);
}
