"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";
import { AttachFileModal } from "./AttachFileModal";

type ButtonProps = Omit<React.ComponentProps<typeof Button>, "placeholder">;

interface Props extends ButtonProps {
  onSelectFile?: (file: File | undefined) => Promise<any> | any;
  placeholder?: React.ReactNode;
  selectedFile?: { id: string; name: string; path: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileButton({
  placeholder: attachFileText = "Attach File",
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
          onClick={() => onSelectFile?.(undefined)}
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
        <AttachFileModal
          close={() => setShowAttachFileModal(false)}
          upsertFile={upsertFile}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />
      )}
    </>
  );
}
