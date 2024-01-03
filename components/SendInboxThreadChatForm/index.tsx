import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { FileSelect } from "../FileSelect";
import { SendIcon } from "../Icon/SendIcon";
import { StatusButton } from "../StatusButton";
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
