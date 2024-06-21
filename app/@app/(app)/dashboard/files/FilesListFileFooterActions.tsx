"use client";

import * as confirmTextClickableTextStyles from "../../../../../components/ConfirmClickableText/style.css";
import * as styles from "./style.css";

import { useState } from "react";

import { ConfirmClickableText } from "../../../../../components/ConfirmClickableText";
import { CreateOrUpdateFileForm } from "../../../../../components/CreateOrUpdateFileForm";
import { Modal } from "../../../../../components/Modal";
import { File } from "../../../../../data";

interface Props {
  deleteFile: (fileId: string) => any;
  file: File;
  upsertFile: (fileId: string, fd: FormData) => any;
}

export function FilesListFileFooterActions({
  deleteFile: deleteFile,
  file,
  upsertFile,
}: Props) {
  const [editingFile, setEditingFile] = useState<File>();

  return (
    <>
      <div className={styles.filesListFileContainerFooter}>
        <span
          className={confirmTextClickableTextStyles.confirmClickableText}
          onClick={() => setEditingFile(file)}
        >
          edit
        </span>
        <ConfirmClickableText
          confirmModalTitle="Confirm Delete"
          confirmModalDescription={
            <>
              &quot;{file.name}&quot; will be deleted and will not be
              recoverable.
            </>
          }
          onClickConfirm={deleteFile.bind(undefined, file.id)}
        >
          delete
        </ConfirmClickableText>
      </div>
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
