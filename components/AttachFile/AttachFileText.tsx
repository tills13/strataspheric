"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { FilePreview } from "../FilePreview";
import { Group } from "../Group";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text";
import { AttachFileModal } from "./AttachFileModal";

interface Props {
  className?: string;
  defaultIcon?: React.ReactElement<React.ComponentProps<typeof Icon>>;
  fileTypes?: string[];
  onSelectFile?: (file: File | undefined) => Promise<any> | any;
  placeholder?: React.ReactNode;
  selectedFile?: { id: string; name: string; path: string };
  showFileName?: boolean;
  showImagePreview?: boolean;
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
              <FilePreview
                file={selectedFile}
                showImagePreview={showImagePreview}
              />
              {showFileName && (
                <Text fw="bold" td="underline" ws="nowrap">
                  {selectedFile.name}
                </Text>
              )}
            </>
          ) : (
            <>
              {defaultIcon ? (
                React.cloneElement(defaultIcon, { size: "xs" })
              ) : (
                <AttachmentIcon size="xs" />
              )}
              <Text fw="bold" td="underline" ws="nowrap">
                {placeholder}
              </Text>
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
          showImagePreview={showImagePreview}
        />
      )}
    </>
  );
}
