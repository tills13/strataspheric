"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { CreateOrUpdateInvoiceForm } from "../../../../components/CreateOrUpdateInvoiceForm";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";
import { can, p } from "../../../../data/users/permissions";

interface Props {
  upsertInvoice: (fd: FormData) => any;
}

export function InvoicesHeader({ upsertInvoice }: Props) {
  const { data: session } = useSession();
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

  return (
    <>
      <DashboardHeader
        actions={[
          can(session?.user, p("stratas", "invoices", "create")) && {
            action: () => setShowNewInvoiceModal(true),
            label: "New Invoice",
            icon: <AddIcon />,
          },
        ]}
      />
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
