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

interface Props {
  onSelectInvoice: (file: Invoice | undefined) => void;
  selectedInvoice?: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceButton({
  onSelectInvoice,
  selectedInvoice,
  upsertInvoice,
}: Props) {
  const [showAttachInvoiceModal, setShowAttachInvoiceModal] = useState(false);

  return (
    <>
      {selectedInvoice ? (
        <Button
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
        <Modal
          closeModal={() => setShowAttachInvoiceModal(false)}
          title="Attach Invoice"
        >
          <Header className={s({ mb: "normal" })} priority={3}>
            Existing Invoice
          </Header>
          <InvoiceSelect
            className={s({ mb: "normal", w: "full" })}
            onSelectInvoice={onSelectInvoice}
          />

          <Header className={s({ mb: "normal" })} priority={3}>
            New Invoice
          </Header>
          <CreateOrUpdateInvoiceForm
            onCreateOrUpdateInvoice={(invoice) => {
              setShowAttachInvoiceModal(false);
              onSelectInvoice(invoice);
            }}
            upsertInvoice={upsertInvoice}
          />
        </Modal>
      )}
    </>
  );
}
