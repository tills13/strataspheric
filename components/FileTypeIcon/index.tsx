import React from "react";

import { extname } from "../../utils/files";
import { Icon } from "../Icon/Icon";
import { ImageIcon } from "../Icon/ImageIcon";
import { TextDocumentIcon } from "../Icon/TextDocumentIcon";

interface Props extends React.ComponentProps<typeof Icon> {
  defaultIcon?: React.ReactElement<React.ComponentProps<typeof Icon>>;
  filePath: string;
}

export function FileTypeIcon({ defaultIcon, filePath, ...rest }: Props) {
  const extension = extname(filePath);

  switch (extension) {
    case "txt":
    case "docx":
    case "csv":
    case "xlsx":
    case "pdf": {
      return <TextDocumentIcon {...rest} />;
    }
    case "jpg":
    case "png": {
      return <ImageIcon {...rest} />;
    }
    default: {
      return defaultIcon ? React.cloneElement(defaultIcon, rest) : null;
    }
  }
}
