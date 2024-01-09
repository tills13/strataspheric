"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CreateOrUpdateFileForm } from "../CreateOrUpdateFileForm";
import { FileSelect } from "../FileSelect";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";
import { Modal } from "../Modal";

interface Props {
  className?: string;
  onSelectFile: (file: File | undefined) => void;
  selectedFile?: { id: string; name: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileButton({
  className,
  onSelectFile,
  selectedFile,
  upsertFile,
}: Props) {
  const [showAttachFileModal, setShowAttachFileModal] = useState(false);

  return (
    <>
      {selectedFile ? (
        <Button
          className={classnames(className, styles.attachFileButton)}
          color="error"
          style="secondary"
          iconRight={<TextDocumentIcon />}
          onClick={() => onSelectFile(undefined)}
          type="button"
        >
          Unattach File (
          <span className={styles.fileName}>{selectedFile.name}</span>)
        </Button>
      ) : (
        <Button
          className={classnames(className, styles.attachFileButton)}
          color="primary"
          style="secondary"
          iconRight={<AttachmentIcon />}
          onClick={() => setShowAttachFileModal(true)}
          type="button"
        >
          Attach File
        </Button>
      )}

      {showAttachFileModal && (
        <Modal
          title="Attach File"
          closeModal={() => setShowAttachFileModal(false)}
        >
          <Header className={s({ mb: "normal" })} priority={3}>
            Existing File
          </Header>
          <FileSelect
            className={s({ mb: "normal", w: "full" })}
            onSelectFile={(file) => {
              setShowAttachFileModal(false);
              onSelectFile(file);
            }}
          />
          <Header className={s({ mb: "normal" })} priority={3}>
            New File
          </Header>
          <CreateOrUpdateFileForm
            onCreateOrUpdateFile={(file) => {
              setShowAttachFileModal(false);
              onSelectFile(file);
            }}
            upsertFile={upsertFile}
          />
        </Modal>
      )}
    </>
  );
}
