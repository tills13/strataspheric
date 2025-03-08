"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { Invoice } from "../../data";
import { CreateOrUpdateInvoiceForm } from "../CreateOrUpdateInvoiceForm";
import { Group } from "../Group";
import { Header } from "../Header";
import { PaidDocumentIcon } from "../Icon/PaidDocumentIcon";
import { InvoiceSelect } from "../InvoiceSelect";
import { Modal } from "../Modal";
import { AttachInvoiceModal } from "./AttachInvoiceModal";

interface Props {
  attachInvoiceText?: string;
  className?: string;
  onSelectInvoice: (file: Invoice | undefined) => void;
  selectedInvoice?: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceText({
  attachInvoiceText = "Attach Invoice",
  className,
  onSelectInvoice,
  selectedInvoice,
  upsertInvoice,
}: Props) {
  const [showAttachInvoiceModal, setShowAttachInvoiceModal] = useState(false);

  return (
    <>
      <Group gap="xs">
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
