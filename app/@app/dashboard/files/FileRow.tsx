"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { Date } from "../../../../components/Date";
import { FilePreview } from "../../../../components/FilePreview";
import { Group } from "../../../../components/Group";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { EditIcon } from "../../../../components/Icon/EditIcon";
import { TextDocumentIcon } from "../../../../components/Icon/TextDocumentIcon";
import { Modal } from "../../../../components/Modal";
import { RemoveButton } from "../../../../components/RemoveButton";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { File } from "../../../../data/files/getFile";
import { useCan } from "../../../../hooks/useCan";
import { getImageUri } from "../../../../utils/files";
import { deleteFileAction } from "./actions";

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
            <FilePreview
              defaultIcon={<TextDocumentIcon />}
              file={file}
              showImagePreview
            />
            <Text color="primary" whiteSpace="nowrap">
              {file.name}
            </Text>
            <Text color="secondary" whiteSpace="nowrap">
              {file.description}
            </Text>
          </Group>
        }
        link={getImageUri(file.path)}
        rowEnd={
          <Date
            timestamp={file.createdAt}
            output="compact"
            color="secondary"
            fontSize="small"
            whiteSpace="nowrap"
          />
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
