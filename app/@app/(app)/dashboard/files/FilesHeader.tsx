"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { CreateOrUpdateFileForm } from "../../../../../components/CreateOrUpdateFileForm";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";
import { can, p } from "../../../../../data/users/permissions";

interface Props {
  upsertFile: (fd: FormData) => any;
}

export function FilesHeader({ upsertFile }: Props) {
  const { data: session } = useSession();
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  return (
    <>
      <DashboardHeader
        actions={[
          can(session?.user, p("stratas", "files", "create")) && {
            action: () => setShowNewFileModal(true),
            label: "New File",
            icon: <AddIcon />,
          },
        ]}
      />
      {showNewFileModal && (
        <Modal closeModal={() => setShowNewFileModal(false)} title="New File">
          <CreateOrUpdateFileForm
            onCreateOrUpdateFile={() => setShowNewFileModal(false)}
            upsertFile={upsertFile}
          />
        </Modal>
      )}
    </>
  );
}
