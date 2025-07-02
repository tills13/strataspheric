import { s } from "../../sprinkles.css";

import { sendInboxThreadChatAction } from "../../app/@app/dashboard/inbox/[threadId]/actions";
import { AttachFileField } from "../AttachFileField";
import { SendIcon } from "../Icon/SendIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  messageId?: string;
  onSendInboxThreadChat?: (fd: FormData) => void;
  threadId: string;
}

export function SendInboxThreadChatForm({
  className,
  messageId,
  onSendInboxThreadChat,
  threadId,
}: Props) {
  return (
    <form
      className={className}
      action={async (fd) => {
        onSendInboxThreadChat?.(fd);
        await sendInboxThreadChatAction(threadId, messageId, fd);
      }}
    >
      <Stack>
        <TextArea
          className={s({ w: "full" })}
          name="message"
          label="Message"
          rows={3}
          required
        />

        <AttachFileField name="fileId" />

        <StatusButton
          color="primary"
          style="primary"
          icon={<SendIcon />}
          type="submit"
        >
          Send Chat
        </StatusButton>
      </Stack>
    </form>
  );
}
