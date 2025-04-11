"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateInvoiceForm } from "../../../../components/CreateOrUpdateInvoiceForm";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";
import { Invoice } from "../../../../data";

interface Props {
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function CreateNewInvoiceButton({ upsertInvoice }: Props) {
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  return (
    <>
      <Button
        iconRight={<AddIcon />}
        color="success"
        iconTextBehaviour="centerRemainder"
        onClick={() => setShowNewInvoiceModal(true)}
        style="secondary"
      >
        Add Invoice
      </Button>
      {showNewInvoiceModal && (
        <Modal
          closeModal={() => setShowNewInvoiceModal(false)}
          title="New Invoice"
        >
          <CreateOrUpdateInvoiceForm
            onCreateOrUpdateInvoice={() => setShowNewInvoiceModal(false)}
            upsertInvoice={upsertInvoice}
          />
        </Modal>
      )}
    </>
  );
}
