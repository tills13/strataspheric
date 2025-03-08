"use client";

import { s } from "../../sprinkles.css";

import { useState } from "react";

import { Invoice } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateInvoiceForm } from "../CreateOrUpdateInvoiceForm";
import { Header } from "../Header";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { InvoiceSelect } from "../InvoiceSelect";
import { Modal } from "../Modal";
import { AttachInvoiceModal } from "./AttachInvoiceModal";

interface Props {
  className?: string;
  onSelectInvoice: (file: Invoice | undefined) => void;
  selectedInvoice?: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceButton({
  className,
  onSelectInvoice,
  selectedInvoice,
  upsertInvoice,
}: Props) {
  const [showAttachInvoiceModal, setShowAttachInvoiceModal] = useState(false);

  return (
    <>
      {selectedInvoice ? (
        <Button
          className={className}
          color="error"
          style="secondary"
          iconRight={<PaidDocumentIcon />}
          onClick={() => onSelectInvoice(undefined)}
          type="button"
        >
          Unattach Invoice (#{selectedInvoice.identifier})
        </Button>
      ) : (
        <Button
          className={className}
          color="primary"
          style="secondary"
          iconRight={<PaidDocumentIcon />}
          onClick={() => setShowAttachInvoiceModal(true)}
          type="button"
        >
          Attach Invoice
        </Button>
      )}

      {showAttachInvoiceModal && (
        <AttachInvoiceModal
          close={() => setShowAttachInvoiceModal(false)}
          selectedInvoice={selectedInvoice}
          onSelectInvoice={onSelectInvoice}
          upsertInvoice={upsertInvoice}
        />
      )}
    </>
  );
}
