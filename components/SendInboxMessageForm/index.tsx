import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { File, Invoice } from "../../data";
import { classnames } from "../../utils/classnames";
import { AttachFileField } from "../AttachFileField";
import { AttachInvoiceField } from "../AttachInvoiceField";
import { Group } from "../Group";
import { Header } from "../Header";
import { SendIcon } from "../Icon/SendIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
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
  return (
    <form
      action={sendInboxMessage}
      className={classnames(styles.form, className)}
    >
      {showContactInformationFields && (
        <>
          {showHeaders && (
            <Header
              className={classnames(s({ mb: "large" }), styles.formHeader)}
              priority={2}
            >
              Contact Information
            </Header>
          )}
          <Stack className={s({ mb: "large" })} gap="normal">
            <Input
              className={styles.formInput}
              name="name"
              label="Name"
              defaultValue={defaultName || ""}
              disabled={!!defaultName}
              required
            />
            <Input
              className={styles.formInput}
              name="email_address"
              label="Email Address"
              defaultValue={defaultEmail || ""}
              disabled={!!defaultEmail}
              required
            />
            <Input
              className={styles.formInput}
              name="phone_number"
              label="Phone Number"
              defaultValue={defaultPhoneNumber || ""}
              disabled={!!defaultPhoneNumber}
            />
          </Stack>
        </>
      )}

      {showHeaders && (
        <Header
          className={classnames(s({ mb: "large" }), styles.formHeader)}
          priority={2}
        >
          New Message to Strata
        </Header>
      )}

      <Stack gap="normal">
        {showSubjectInput && (
          <Input
            className={styles.formInput}
            name="subject"
            label="Subject"
            required
          />
        )}

        <TextArea
          className={styles.formInput}
          name="message"
          label="Message"
          rows={3}
          required
        />

        {(upsertFile || upsertInvoice) && (
          <div className={classnames(styles.formActionsContainer)}>
            {upsertFile && (
              <AttachFileField name="fileId" upsertFile={upsertFile} />
            )}

            {upsertInvoice && (
              <AttachInvoiceField
                name="invoiceId"
                upsertInvoice={upsertInvoice}
              />
            )}
          </div>
        )}

        <StatusButton color="primary" iconRight={<SendIcon />} type="submit">
          Send Message
        </StatusButton>
      </Stack>
    </form>
  );
}
