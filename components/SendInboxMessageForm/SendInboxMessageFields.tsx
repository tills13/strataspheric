import { classnames } from "../../utils/classnames";
import { AttachFileField } from "../AttachFileField";
import { AttachInvoiceField } from "../AttachInvoiceField";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { TextArea } from "../TextArea";

type AttachInvoiceFieldProps = React.ComponentProps<typeof AttachInvoiceField>;

interface Props {
  defaultInvoice?: AttachInvoiceFieldProps["defaultValue"];
  showSubjectInput?: boolean;
  upsertFile?: React.ComponentProps<typeof AttachFileField>["upsertFile"];
  upsertInvoice?: AttachInvoiceFieldProps["upsertInvoice"];
}

export function SendInboxMessageFields({
  defaultInvoice,
  showSubjectInput,
  upsertFile,
  upsertInvoice,
}: Props) {
  return (
    <Stack gap="normal">
      {showSubjectInput && <Input name="subject" label="Subject" required />}

      <TextArea name="message" label="Message" rows={3} required />

      {(upsertFile || upsertInvoice) && (
        <Flex from="tablet">
          {upsertFile && (
            <AttachFileField name="fileId" upsertFile={upsertFile} />
          )}

          {upsertInvoice && (
            <AttachInvoiceField
              name="invoiceId"
              upsertInvoice={upsertInvoice}
              defaultValue={defaultInvoice}
            />
          )}
        </Flex>
      )}
    </Stack>
  );
}
