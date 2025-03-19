import { s } from "../../sprinkles.css";

import { File } from "../../data";
import { AttachFileField } from "../AttachFileField";
import { SendIcon } from "../Icon/SendIcon";
import { Stack } from "../Stack";
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
      <Stack>
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

        <StatusButton
          color="primary"
          style="primary"
          iconRight={<SendIcon />}
          type="submit"
        >
          Send Chat
        </StatusButton>
      </Stack>
    </form>
  );
}
