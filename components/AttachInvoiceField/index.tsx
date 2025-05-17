"use client";

import React, { useState } from "react";

import { AttachInvoiceText } from "../AttachInvoice/AttachInvoiceText";

type AttachInvoiceButtonProps = React.ComponentProps<typeof AttachInvoiceText>;

interface Props {
  name?: string;
  defaultValue?: AttachInvoiceButtonProps["selectedInvoice"];
}

export function AttachInvoiceField({ defaultValue, name }: Props) {
  const [selectedInvoice, setSelectedInvoice] = useState(defaultValue);

  return (
    <>
      <AttachInvoiceText
        onSelectInvoice={setSelectedInvoice}
        selectedInvoice={selectedInvoice}
      />

      <input type="hidden" name={name} value={selectedInvoice?.id || ""} />
    </>
  );
}
