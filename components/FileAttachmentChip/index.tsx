import * as styles from "./style.css";

import React from "react";

import { extname } from "../../utils/extname";
import { FileLink } from "../FileLink";
import { AttachmentIcon } from "../Icon/AttachmentIcon";
import { ImageIcon } from "../Icon/ImageIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props {
  className?: string;
  fileName: string;
  filePath: string;
}

export function FileAttachmentChip({ className, fileName, filePath }: Props) {
  let icon: React.ReactNode = <AttachmentIcon className={styles.icon} />;
  const extension = extname(filePath);

  switch (extension) {
    case "word":
    case "pdf": {
      icon = <TextDocumentIcon className={styles.icon} />;
      break;
    }
    case "jpg": {
      icon = <ImageIcon className={styles.icon} />;
    }
  }

  return (
    <FileLink className={className || styles.file} path={filePath}>
      {icon}
      {fileName}
    </FileLink>
  );
}
