"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";
import { NewFileForm } from "../../../../../components/NewFileForm";
import { can, p } from "../../../../../db/users/permissions";

interface Props {
  createFile: (fd: FormData) => void;
}

export function FilesHeader({ createFile }: Props) {
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
          <NewFileForm createFile={createFile} />
        </Modal>
      )}
    </>
  );
}
