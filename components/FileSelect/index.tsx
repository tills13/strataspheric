import { ComponentProps } from "react";

import { File } from "../../db";
import { Select } from "../Select";

interface Props extends ComponentProps<typeof Select> {
  className?: string;
  files: Pick<File, "id" | "name">[];
}

export function FileSelect({
  className,
  files,
  placeholder,
  ...delegateProps
}: Props) {
  return (
    <Select className={className} {...delegateProps}>
      <option value="">{placeholder || "Attach a File"}</option>
      {files.map((file) => (
        <option key={file.id} value={file.id}>
          {file.name}
        </option>
      ))}
    </Select>
  );
}
