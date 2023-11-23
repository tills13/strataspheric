import * as styles from "./style.css";

import { ComponentProps } from "react";

import { getFiles } from "../../db/files/getFiles";
import { getCurrentStrata } from "../../db/stratas/getStrata";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { FileSelect } from "../FileSelect";
import { Header } from "../Header";
import { Input } from "../Input";
import { Select } from "../Select";
import { TextArea } from "../TextArea";

interface Props {
  availableFileAttachments: ComponentProps<typeof FileSelect>["files"];
  className?: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhoneNumber?: string;
  isFromNonMember: boolean;
  sendInboxMessageAction: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
}

export function SendInboxMessageForm({
  availableFileAttachments,
  className,
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  isFromNonMember,
  sendInboxMessageAction,
  showHeaders: showHeaders = true,
  showSubjectInput = true,
}: Props) {
  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxMessageAction}
    >
      {isFromNonMember && (
        <>
          {showHeaders && (
            <Header className={styles.formHeader} priority={2}>
              Contact Information
            </Header>
          )}
          <Input
            className={styles.formInput}
            name="name"
            placeholder="Name"
            defaultValue={defaultName}
            required
          />
          <Input
            className={styles.formInput}
            name="email_address"
            placeholder="Email Address"
            defaultValue={defaultEmail}
            required
          />
          <Input
            className={styles.formInput}
            name="phone_number"
            placeholder="Phone Number"
            defaultValue={defaultPhoneNumber}
          />
        </>
      )}

      {showHeaders && (
        <Header className={styles.formHeader} priority={2}>
          Message
        </Header>
      )}
      {showSubjectInput && (
        <Input
          className={styles.formInput}
          name="subject"
          placeholder="Subject"
          required
        />
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
        Send Message
      </Button>
    </form>
  );
}
