"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";
import { p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";

interface Props {
  upsertStrataMembership: (fd: FormData) => void;
}

export function MembershipHeader({ upsertStrataMembership }: Props) {
  const can = useCan();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DashboardHeader
        actions={[
          can(p("stratas", "memberships", "create")) && {
            action: () => setShowModal(true),
            label: "Add Member",
            icon: <AddIcon />,
          },
        ]}
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New Strata Member">
          <CreateOrUpdateStrataMembershipForm
            upsertStrataMembership={upsertStrataMembership}
          />
        </Modal>
      )}
    </>
  );
}
