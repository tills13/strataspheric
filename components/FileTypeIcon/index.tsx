import React from "react";

import { extname } from "../../utils/files";
import { ImageIcon } from "../Icon/ImageIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props {
  className?: string;
  defaultIcon?: React.ReactNode;
  filePath: string;
}

export function FileTypeIcon({ className, defaultIcon, filePath }: Props) {
  const extension = extname(filePath);

  switch (extension) {
    case "txt":
    case "docx":
    case "csv":
    case "xlsx":
    case "pdf": {
      return <TextDocumentIcon className={className} />;
    }
    case "jpg":
    case "png": {
      return <ImageIcon className={className} />;
    }
    default: {
      return defaultIcon || null;
    }
  }
}
