"use client";

import React, { useState } from "react";

import { Invoice } from "../../data";
import { AttachInvoiceButton } from "../AttachInvoice";
import { AttachInvoiceText } from "../AttachInvoice/AttachInvoiceText";

type AttachInvoiceButtonProps = React.ComponentProps<
  typeof AttachInvoiceButton
>;

interface Props {
  buttonClassName?: string;
  name?: string;
  defaultValue?: AttachInvoiceButtonProps["selectedInvoice"];
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceField({
  buttonClassName,
  defaultValue,
  name,
  upsertInvoice,
}: Props) {
  const [selectedInvoice, setSelectedInvoice] = useState(defaultValue);

  return (
    <>
      <AttachInvoiceText
        className={buttonClassName}
        onSelectInvoice={setSelectedInvoice}
        selectedInvoice={selectedInvoice}
        upsertInvoice={upsertInvoice}
      />

      <input type="hidden" name={name} value={selectedInvoice?.id} />
    </>
  );
}
