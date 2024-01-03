"use client";

import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { FileSelectOrUpload } from "../FileSelectOrUpload";
import { Header } from "../Header";
import { SendIcon } from "../Icon/SendIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";
import { RecipientsSelect } from "./RecipientsSelect";

interface Props {
  className?: string;
  recipients: Array<{ userId: string; name: string; unit: string | null }>;
  sendInboxMessage: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
}

export function SendStrataEmailBlastForm({
  className,
  recipients,
  sendInboxMessage,
  showHeaders = true,
  showSubjectInput = true,
}: Props) {
  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxMessage}
    >
      {showHeaders && (
        <Header className={styles.formHeader} priority={2}>
          Strata Email Blast
        </Header>
      )}
      {showSubjectInput && (
        <Input
          className={styles.formElement}
          name="subject"
          placeholder="Subject"
          required
        />
      )}
      <TextArea
        className={styles.formElement}
        name="message"
        placeholder="Message"
        rows={3}
        required
      />

      <FileSelectOrUpload className={styles.formElement} baseName="file" />

      <RecipientsSelect
        className={styles.formElement}
        recipients={recipients}
      />

      <StatusButton
        iconRight={<SendIcon />}
        color="primary"
        size="normal"
        type="submit"
      >
        Send Message
      </StatusButton>
    </form>
  );
}
