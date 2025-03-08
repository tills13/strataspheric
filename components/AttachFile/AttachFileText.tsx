import * as styles from "./style.css";

import { useState } from "react";

import { File } from "../../data";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { AttachFileModal } from "./AttachFileModal";

interface Props {
  attachFileText?: React.ReactNode;
  onSelectFile?: (file: File | undefined) => Promise<any> | any;
  selectedFile?: { id: string; name: string; path: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileText({
  attachFileText = "Attach File",
  selectedFile,
  onSelectFile,
  upsertFile,
}: Props) {
  const [showAttachFileModal, setShowAttachFileModal] = useState(false);

  return (
    <>
      <Group gap="xs">
        {selectedFile ? (
          <>
            <FileTypeIcon
              className={styles.attachFileTextIcon}
              filePath={selectedFile.path}
            />

            <button
              className={styles.attachFileTextText}
              onClick={() => setShowAttachFileModal(true)}
              type="button"
            >
              {selectedFile.name}
            </button>
          </>
        ) : (
          <>
            <AttachmentIcon className={styles.attachFileTextIcon} />
            <button
              className={styles.attachFileTextText}
              onClick={() => setShowAttachFileModal(true)}
              type="button"
            >
              {attachFileText}
            </button>
          </>
        )}
      </Group>
      {showAttachFileModal && (
        <AttachFileModal
          close={() => setShowAttachFileModal(false)}
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          upsertFile={upsertFile}
        />
      )}
    </>
  );
}
