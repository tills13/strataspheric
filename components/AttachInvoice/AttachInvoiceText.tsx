"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { Invoice } from "../../data";
import { Group } from "../Group";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { AttachInvoiceModal } from "./AttachInvoiceModal";

interface Props {
  attachInvoiceText?: string;
  onSelectInvoice: (file: Invoice | undefined) => void;
  selectedInvoice?: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceText({
  attachInvoiceText = "Attach Invoice",
  onSelectInvoice,
  selectedInvoice,
  upsertInvoice,
}: Props) {
  const [showAttachInvoiceModal, setShowAttachInvoiceModal] = useState(false);

  return (
    <>
      <Group gap="small">
        <PaidDocumentIcon className={styles.attachInvoiceTextIcon} />

        <button
          className={styles.attachInvoiceTextText}
          onClick={() => setShowAttachInvoiceModal(true)}
          type="button"
        >
          {selectedInvoice
            ? `#${selectedInvoice.identifier}`
            : attachInvoiceText}
        </button>
      </Group>

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
