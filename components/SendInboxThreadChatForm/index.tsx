import * as styles from "./style.css";

import { ComponentProps } from "react";

import { getFiles } from "../../db/files/getFiles";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { FileSelect } from "../FileSelect";
import { Select } from "../Select";
import { TextArea } from "../TextArea";

interface Props {
  availableFileAttachments: ComponentProps<typeof FileSelect>["files"];
  className?: string;
  messageId?: string;
  sendInboxThreadChatAction: (fd: FormData) => void;
}

export async function SendInboxThreadChatForm({
  availableFileAttachments,
  className,
  messageId,
  sendInboxThreadChatAction,
}: Props) {
  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxThreadChatAction}
    >
      {messageId && (
        <input type="hidden" name="message_id" defaultValue={messageId} />
      )}
      <TextArea
        className={styles.formInput}
        name="message"
        placeholder="Message"
        rows={3}
        required
      />

      <FileSelect
        className={styles.formInput}
        files={availableFileAttachments}
      />

      <Button className={styles.formButton} type="submit" variant="primary">
        Send Chat
      </Button>
    </form>
  );
}
