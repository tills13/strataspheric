import { s } from "../../sprinkles.css";

import { File } from "../../data";
import { AttachFileField } from "../AttachFileField";
import { SendIcon } from "../Icon/SendIcon";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  sendInboxThreadChat: (fd: FormData) => void;
  upsertFile?: (fd: FormData) => Promise<File>;
}

export function SendInboxThreadChatForm({
  className,
  sendInboxThreadChat,
  upsertFile,
}: Props) {
  return (
    <form className={className} action={sendInboxThreadChat}>
      <TextArea
        className={s({ mb: "small", w: "full" })}
        name="message"
        placeholder="Message"
        rows={3}
        required
      />

      {upsertFile && (
        <AttachFileField
          className={s({ mb: "small" })}
          name="fileId"
          upsertFile={upsertFile}
        />
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
