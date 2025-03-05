import { s } from "../../sprinkles.css";

import { File } from "../../data";
import { AttachFileField } from "../AttachFileField";
import { FieldGroup } from "../FieldGroup";
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
      <FieldGroup className={s({ mb: "large" })}>
        <TextArea
          className={s({ w: "full" })}
          name="message"
          label="Message"
          rows={3}
          required
        />

        {upsertFile && (
          <AttachFileField name="fileId" upsertFile={upsertFile} />
        )}
      </FieldGroup>

      <StatusButton
        color="primary"
        style="primary"
        iconRight={<SendIcon />}
        type="submit"
      >
        Send Chat
      </StatusButton>
    </form>
  );
}
