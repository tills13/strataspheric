"use client";

import React, { useEffect, useState } from "react";

import { Invoice } from "../../data";
import { Select } from "../Select";

interface Props extends React.ComponentProps<typeof Select> {
  onSelectInvoice?: (file: Invoice) => void;
  className?: string;
}

export function InvoiceSelect({
  className,
  label: placeholder = "Attach an Invoice",
  onSelectInvoice,
  ...delegateProps
}: Props) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function loadInvoices() {
      const r = await fetch("/api/invoices/listInvoices");
      const rJson = await r.json();

      setInvoices(rJson.invoices || []);
    }

    loadInvoices();
  }, []);

  return (
    <Select
      className={className}
      onChange={(e) => {
        const selectedInvoice = invoices.find(
          (invoice) => invoice.id === e.currentTarget.value,
        );

        if (!selectedInvoice) {
          // something went wrong
          return;
        }

        onSelectInvoice?.(selectedInvoice);
      }}
      label={placeholder}
      {...delegateProps}
    >
      {invoices.map((invoice) => (
        <option key={invoice.id} value={invoice.id}>
          #{invoice.identifier} (${invoice.amount})
        </option>
      ))}
    </Select>
  );
}
