import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { FileSelect } from "../FileSelect";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  sendInboxThreadChat: (fd: FormData) => void;
}

export function SendInboxThreadChatForm({
  className,
  sendInboxThreadChat,
}: Props) {
  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxThreadChat}
    >
      <TextArea
        className={styles.formInput}
        name="message"
        placeholder="Message"
        rows={3}
        required
      />

      <FileSelect className={styles.formInput} name="fileId" />

      <Button className={styles.formButton} type="submit" variant="primary">
        Send Chat
      </Button>
    </form>
  );
}
