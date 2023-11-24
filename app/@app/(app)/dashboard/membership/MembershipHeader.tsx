"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";
import { UpsertStrataMemberForm } from "../../../../../components/UpsertStrataMemberForm";
import { p } from "../../../../../db/users/permissions";
import { useCan } from "../../../../../hooks/useCan";

interface Props {
  addStrataMember: (fd: FormData) => void;
}

export function MembershipHeader({ addStrataMember }: Props) {
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
          <UpsertStrataMemberForm addStrataMember={addStrataMember} />
        </Modal>
      )}
    </>
  );
}
