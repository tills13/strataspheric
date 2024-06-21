"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { CreateOrUpdateFileForm } from "../CreateOrUpdateFileForm";
import { FileSelect } from "../FileSelect";
import { Header } from "../Header";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";
import { Modal } from "../Modal";

type ButtonProps = React.ComponentProps<typeof Button>;

interface Props extends ButtonProps {
  attachFileText?: React.ReactNode;
  onSelectFile: (file: File | undefined) => Promise<any> | any;
  selectedFile?: { id: string; name: string; path: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileButton({
  attachFileText = "Attach File",
  onSelectFile,
  selectedFile,
  upsertFile,
  ...delegateProps
}: Props) {
  const [showAttachFileModal, setShowAttachFileModal] = useState(false);

  return (
    <>
      {selectedFile ? (
        <Button
          className={classnames(
            delegateProps.className,
            styles.attachFileButton,
          )}
          color="error"
          style="secondary"
          iconRight={<TextDocumentIcon />}
          onClick={() => onSelectFile(undefined)}
          type="button"
          {...delegateProps}
        >
          Unattach File
        </Button>
      ) : (
        <Button
          className={classnames(
            delegateProps.className,
            styles.attachFileButton,
          )}
          color="primary"
          style="secondary"
          iconRight={<AttachmentIcon />}
          onClick={() => setShowAttachFileModal(true)}
          type="button"
          {...delegateProps}
        >
          {attachFileText}
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
            onSelectFile={async (file) => {
              await onSelectFile(file);
              setShowAttachFileModal(false);
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
