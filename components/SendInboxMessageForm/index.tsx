"use client";

import * as buttonStyles from "../Button/style.css";
import * as styles from "./style.css";

import { useFormState } from "react-dom";

import { classnames } from "../../utils/classnames";
import { FileSelect } from "../FileSelect";
import { FileSelectOrUpload } from "../FileSelectOrUpload";
import { Header } from "../Header";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhoneNumber?: string;
  showContactInformationFields: boolean;
  sendInboxMessage: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
}

export function SendInboxMessageForm({
  className,
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  showContactInformationFields = false,
  sendInboxMessage: sendInboxMessage,
  showHeaders: showHeaders = true,
  showSubjectInput = true,
}: Props) {
  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxMessage}
    >
      {showContactInformationFields && (
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

      <FileSelectOrUpload className={styles.formInput} baseName="file" />

      <StatusButton
        className={classnames(
          buttonStyles.fullWidth,
          buttonStyles.buttonSizes.large,
          buttonStyles.colors.primary,
        )}
        type="submit"
      >
        Send Message
      </StatusButton>
    </form>
  );
}
