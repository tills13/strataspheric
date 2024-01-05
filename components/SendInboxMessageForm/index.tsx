"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { File, Invoice } from "../../data";
import { classnames } from "../../utils/classnames";
import { AttachFileButton } from "../AttachFileButton";
import { AttachInvoiceButton } from "../AttachInvoiceButton";
import { Header } from "../Header";
import { SendIcon } from "../Icon/SendIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  defaultName?: string | null;
  defaultEmail?: string | null;
  defaultPhoneNumber?: string | null;
  showContactInformationFields: boolean;
  sendInboxMessage: (fd: FormData) => void;
  showHeaders?: boolean;
  showSubjectInput?: boolean;
  upsertFile?: (fd: FormData) => Promise<File>;
  upsertInvoice?: (fd: FormData) => Promise<Invoice>;
}

export function SendInboxMessageForm({
  className,
  defaultName,
  defaultEmail,
  defaultPhoneNumber,
  showContactInformationFields = false,
  sendInboxMessage,
  showHeaders = true,
  showSubjectInput = true,
  upsertFile,
  upsertInvoice,
}: Props) {
  const [setInvoice, setSelectedInvoice] = useState<Invoice>();
  const [selectedFile, setSelectedFile] = useState<File>();

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
            defaultValue={defaultName || ""}
            required
          />
          <Input
            className={styles.formInput}
            name="email_address"
            placeholder="Email Address"
            defaultValue={defaultEmail || ""}
            required
          />
          <Input
            className={styles.formInput}
            name="phone_number"
            placeholder="Phone Number"
            defaultValue={defaultPhoneNumber || ""}
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

      {(upsertFile || upsertInvoice) && (
        <div
          className={classnames(
            s({ mb: "small" }),
            styles.formActionsContainer,
          )}
        >
          {upsertFile && (
            <AttachFileButton
              onSelectFile={setSelectedFile}
              selectedFile={selectedFile}
              upsertFile={upsertFile}
            />
          )}

          {upsertInvoice && (
            <AttachInvoiceButton
              onSelectInvoice={setSelectedInvoice}
              selectedInvoice={setInvoice}
              upsertInvoice={upsertInvoice}
            />
          )}
        </div>
      )}

      {selectedFile && (
        <input type="hidden" name="fileId" value={selectedFile.id} />
      )}

      {setInvoice && (
        <input type="hidden" name="invoiceId" defaultValue={setInvoice.id} />
      )}

      <StatusButton color="primary" iconRight={<SendIcon />} type="submit">
        Send Message
      </StatusButton>
    </form>
  );
}
