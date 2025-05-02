"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { Group } from "../../../../components/Group";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { Modal } from "../../../../components/Modal";
import { File } from "../../../../data";
import { deleteFileAction } from "./actions";

interface Props {
  file: File;
}

export function FilesListFileActions({ file }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Group gap="small">
        <Button
          icon={<EditIcon />}
          onClick={() => setShowEditModal(true)}
          size="small"
          style="tertiary"
          color="primary"
        />

        <ConfirmButton
          icon={<DeleteIcon />}
          onClickConfirm={deleteFileAction.bind(undefined, file.id)}
          size="small"
          color="error"
          style="tertiary"
        />
      </Group>
      {showEditModal && (
        <Modal
          closeModal={() => setShowEditModal(false)}
          title={`Edit ${file.name}`}
        >
          <CreateOrUpdateFileForm file={file} />
        </Modal>
      )}
    </>
  );
}
