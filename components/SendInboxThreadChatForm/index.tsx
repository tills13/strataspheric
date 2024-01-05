"use client";

import { s } from "../../sprinkles.css";

import { useState } from "react";

import { File } from "../../data";
import { AttachFileButton } from "../AttachFileButton";
import { SendIcon } from "../Icon/SendIcon";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  sendInboxThreadChat: (fd: FormData) => void;
  upsertFile: (fd: FormData) => Promise<File>;
}

export function SendInboxThreadChatForm({
  className,
  sendInboxThreadChat,
  upsertFile,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <form className={className} action={sendInboxThreadChat}>
      <TextArea
        className={s({ mb: "small", w: "full" })}
        name="message"
        placeholder="Message"
        rows={3}
        required
      />

      <AttachFileButton
        className={s({ mb: "small" })}
        onSelectFile={setSelectedFile}
        upsertFile={upsertFile}
        selectedFile={selectedFile}
      />

      {selectedFile && (
        <input type="hidden" name="fileId" value={selectedFile.id} />
      )}

      <StatusButton
        color="primary"
        style="secondary"
        iconRight={<SendIcon />}
        type="submit"
      >
        Send Chat
      </StatusButton>
    </form>
  );
}
