"use client";

import { useState } from "react";

import { Invoice } from "../../data";
import { Button } from "../Button";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { AttachInvoiceModal } from "./AttachInvoiceModal";

interface Props {
  className?: string;
  onSelectInvoice?: (file: Invoice | undefined) => void;
  selectedInvoice?: Invoice;
}

export function AttachInvoiceButton({
  className,
  onSelectInvoice,
  selectedInvoice,
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
          onClick={() => onSelectInvoice?.(undefined)}
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
        />
      )}
    </>
  );
}
