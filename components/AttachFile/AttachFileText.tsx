import * as styles from "./style.css";

import React, { useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { getImageUri, isImageFile } from "../../utils/files";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { AttachFileModal } from "./AttachFileModal";

interface Props {
  className?: string;
  defaultIcon?: React.ReactElement<{ className: string }>;
  fileTypes?: string[];
  onSelectFile?: (file: File | undefined) => Promise<any> | any;
  placeholder?: React.ReactNode;
  selectedFile?: { id: string; name: string; path: string };
  showFileName?: boolean;
  showImagePreview?: boolean;
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileText({
  className,
  defaultIcon,
  fileTypes,
  placeholder = "Attach File",
  selectedFile,
  showFileName = true,
  showImagePreview,
  onSelectFile,
  upsertFile,
}: Props) {
  const [showAttachFileModal, setShowAttachFileModal] = useState(false);

  return (
    <>
      <button
        className={classnames(className, styles.attachFileTextText)}
        onClick={() => setShowAttachFileModal(true)}
        type="button"
      >
        <Group gap="small">
          {selectedFile ? (
            <>
              {showImagePreview && isImageFile(selectedFile.path) ? (
                <img
                  className={styles.attachFileImagePreview}
                  src={getImageUri(selectedFile.path)}
                />
              ) : (
                <FileTypeIcon
                  className={styles.attachFileTextIcon}
                  filePath={selectedFile.path}
                />
              )}
              {showFileName && selectedFile.name}
            </>
          ) : (
            <>
              {defaultIcon ? (
                React.cloneElement(defaultIcon, {
                  className: styles.attachFileTextIcon,
                })
              ) : (
                <AttachmentIcon className={styles.attachFileTextIcon} />
              )}
              {placeholder}
            </>
          )}
        </Group>
      </button>

      {showAttachFileModal && (
        <AttachFileModal
          close={() => setShowAttachFileModal(false)}
          fileTypes={fileTypes}
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          upsertFile={upsertFile}
        />
      )}
    </>
  );
}
