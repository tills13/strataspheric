"use client";

import * as buttonStyles from "../Button/style.css";
import * as styles from "./style.css";

import { useFormState } from "react-dom";

import { classnames } from "../../utils/classnames";
import { FileSelect } from "../FileSelect";
import { FormSubmitStatusButton } from "../FormSubmitStatusButton";
import { Header } from "../Header";
import { Input } from "../Input";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhoneNumber?: string;
  showContactInformationFields: boolean;
  sendInboxMessageAction: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
}

export function SendInboxMessageForm({
  className,
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  showContactInformationFields = false,
  sendInboxMessageAction,
  showHeaders: showHeaders = true,
  showSubjectInput = true,
}: Props) {
  // const [state, action] = useFormState(async (state: {}, fd: FormData) => {
  //   await sendInboxMessageAction(fd);

  //   return { success: true };
  // }, {});

  return (
    <form
      className={classnames(styles.form, className)}
      action={sendInboxMessageAction}
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

      <FileSelect className={styles.formInput} name="fileId" />

      <FormSubmitStatusButton
        className={classnames(
          buttonStyles.buttonFullWidth,
          buttonStyles.buttonSizes.large,
          buttonStyles.buttonVariants.primary,
        )}
        type="submit"
        success={undefined}
      >
        Send Message
      </FormSubmitStatusButton>
    </form>
  );
}
