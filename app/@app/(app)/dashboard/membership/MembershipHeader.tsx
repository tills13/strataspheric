"use client";

import { useState } from "react";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";
import { UpsertStrataMemberForm } from "../../../../../components/UpsertStrataMemberForm";

interface Props {
  addStrataMember: (fd: FormData) => void;
}

export function MembershipHeader({ addStrataMember }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DashboardHeader
        actions={[
          {
            action: () => setShowModal(true),
            label: "Add Member",
            icon: <AddIcon />,
          },
        ]}
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New Strata Member">
          <UpsertStrataMemberForm addStrataMember={addStrataMember} />
        </Modal>
      )}
    </>
  );
}
