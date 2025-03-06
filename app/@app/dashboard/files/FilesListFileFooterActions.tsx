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

interface Props {
  deleteFile: (fileId: string) => any;
  file: File;
  upsertFile: (fileId: string, fd: FormData) => any;
}

export function FilesListFileFooterActions({
  deleteFile,
  file,
  upsertFile,
}: Props) {
  const [editingFile, setEditingFile] = useState<File>();

  return (
    <>
      <Group gap="small">
        <Button
          icon={<EditIcon />}
          onClick={() => setEditingFile(file)}
          size="small"
        />

        <ConfirmButton
          icon={<DeleteIcon />}
          onClickConfirm={deleteFile.bind(undefined, file.id)}
          size="small"
          color="error"
        />
      </Group>
      {editingFile && (
        <Modal
          closeModal={() => setEditingFile(undefined)}
          title={`Edit ${file.name}`}
        >
          <CreateOrUpdateFileForm
            file={file}
            upsertFile={upsertFile.bind(undefined, file.id)}
          />
        </Modal>
      )}
    </>
  );
}
