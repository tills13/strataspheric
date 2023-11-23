import * as styles from "./style.css";

import { getFiles } from "../../db/files/getFiles";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Header } from "../Header";
import { Input } from "../Input";
import { Select } from "../Select";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhoneNumber?: string;
  isFromNonMember: boolean;
  sendInboxMessageAction: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
}

export async function SendInboxMessageForm({
  className,
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  isFromNonMember,
  sendInboxMessageAction,
  showHeaders: showHeaders = true,
  showSubjectInput = true,
}: Props) {
  const files = await getFiles();

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

      <Select className={styles.formInput} name="fileId">
        <option>Attach a File</option>
        {files.map((file) => (
          <option key={file.id} value={file.id}>
            {file.name}
          </option>
        ))}
      </Select>

      <Button className={styles.formButton} type="submit" variant="primary">
        Send Message
      </Button>
    </form>
  );
}
