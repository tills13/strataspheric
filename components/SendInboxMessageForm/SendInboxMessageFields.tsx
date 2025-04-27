import React from "react";

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
}

export function SendInboxMessageFields({
  defaultInvoice,
  showSubjectInput = true,
}: Props) {
  return (
    <Stack gap="normal">
      {showSubjectInput && <Input name="subject" label="Subject" required />}

      <TextArea name="message" label="Message" rows={3} required />

      <Flex from="tablet">
        <AttachFileField name="fileId" />
        <AttachInvoiceField name="invoiceId" defaultValue={defaultInvoice} />
      </Flex>
    </Stack>
  );
}
