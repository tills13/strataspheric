"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../../../auth";
import { createThreadChat } from "../../../../../data/inbox/createThreadChat";
import { getString } from "../../../../../utils/formdata";

export async function sendInboxThreadChatAction(
  threadId: string,
  messageId: string | undefined,
  fd: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthorized");
  }

  const message = getString(fd, "message");
  const fileId = getString(fd, "fileId");

  if (message === "") {
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
