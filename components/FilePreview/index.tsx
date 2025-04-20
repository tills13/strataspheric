import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { getImageUri, isImageFile } from "../../utils/files";
import { FileTypeIcon } from "../FileTypeIcon";

interface Props {
  className?: string;
  defaultIcon?: React.ComponentProps<typeof FileTypeIcon>["defaultIcon"];
  showImagePreview?: boolean;
  file: { path: string };
}

export function FilePreview({
  className,
  defaultIcon,
  file,
  showImagePreview,
}: Props) {
  if (showImagePreview && isImageFile(file.path)) {
    return (
      <img
        className={classnames(className, styles.attachFileImagePreview)}
        src={getImageUri(file.path)}
      />
    );
  }

  return (
    <FileTypeIcon
      className={className}
      defaultIcon={defaultIcon}
      size="xs"
      filePath={file.path}
    />
  );
}
