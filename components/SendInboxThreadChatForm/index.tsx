import * as styles from "./style.css";

import { getFiles } from "../../db/files/getFiles";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Select } from "../Select";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  messageId?: string;
  sendInboxThreadChatAction: (fd: FormData) => void;
}

export async function SendInboxThreadChatForm({
  className,
  messageId,
  sendInboxThreadChatAction,
}: Props) {
  const files = await getFiles();

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

      <Select className={styles.formInput} name="fileId">
        <option>Attach a File</option>
        {files.map((file) => (
          <option key={file.id} value={file.id}>
            {file.name}
          </option>
        ))}
      </Select>

      <Button className={styles.formButton} type="submit" variant="primary">
        Send Chat
      </Button>
    </form>
  );
}
