"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { Date } from "../../../../components/Date";
import { FilePreview } from "../../../../components/FilePreview";
import { Group } from "../../../../components/Group";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { LockLockedIcon } from "../../../../components/Icon/LockLockedIcon";
import { LockUnlockedIcon } from "../../../../components/Icon/LockUnlockedIcon";
import { TextDocumentIcon } from "../../../../components/Icon/TextDocumentIcon";
import { Modal } from "../../../../components/Modal";
import { RemoveButton } from "../../../../components/RemoveButton";
import { StatusButton } from "../../../../components/StatusButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { File } from "../../../../data/files/getFile";
import { useCan } from "../../../../hooks/useCan";
import { getImageUri } from "../../../../utils/files";
import { deleteFileAction, setFilesVisibilityAction } from "./actions";

interface Props {
  file: File;
}

export function FileRow({ file }: Props) {
  const [showEditFileModal, setShowEditFileModal] = useState(false);
  const can = useCan();

  return (
    <>
      <TableRow
        actions={
          <Group gap="small">
            {can("stratas.files.edit") && (
              <StatusButton
                action={setFilesVisibilityAction.bind(
                  undefined,
                  [file.id],
                  file.isPublic === 1 ? "private" : "public",
                )}
                icon={
                  file.isPublic === 1 ? (
                    <LockLockedIcon />
                  ) : (
                    <LockUnlockedIcon />
                  )
                }
                size="small"
                style="tertiary"
                color="primary"
              />
            )}
            {can("stratas.files.edit") && (
              <Button
                icon={<EditIcon />}
                onClick={() => setShowEditFileModal(true)}
                size="small"
                style="tertiary"
                color="primary"
              />
            )}
            {can("stratas.files.delete") && (
              <RemoveButton
                action={deleteFileAction.bind(undefined, file.id)}
                icon={<DeleteIcon />}
                size="small"
                style="tertiary"
                color="primary"
              />
            )}
          </Group>
        }
        content={
          <Group>
            <FilePreview defaultIcon={<TextDocumentIcon />} file={file} />

            <Text color="fontPrimary" whiteSpace="nowrap">
              {file.name}
            </Text>
            <Text color="secondary" whiteSpace="nowrap">
              {file.description}
            </Text>
          </Group>
        }
        link={getImageUri(file.path)}
        rowId={file.id}
        rowEnd={
          <Group gap="small">
            {file.isPublic === 1 ? (
              <LockUnlockedIcon size="xxs" />
            ) : (
              <LockLockedIcon size="xxs" />
            )}
            <Date
              timestamp={file.createdAt}
              output="compact"
              color="secondary"
              fontSize="small"
              whiteSpace="nowrap"
            />
          </Group>
        }
      />
      {showEditFileModal && (
        <Modal
          closeModal={() => setShowEditFileModal(false)}
          title={`Edit ${file.name}`}
        >
          <CreateOrUpdateFileForm file={file} />
        </Modal>
      )}
    </>
  );
}
