"use client";

import { useState } from "react";

import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";
import { NewFileForm } from "../../../../../components/NewFileForm";

interface Props {
  createFile: (fd: FormData) => void;
}

export function FilesHeader({ createFile }: Props) {
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  return (
    <>
      <DashboardHeader
        actions={[
          {
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
