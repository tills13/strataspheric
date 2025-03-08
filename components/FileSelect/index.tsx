"use client";

import { useEffect, useState } from "react";

import { File } from "../../data";
import { Select } from "../Select";

interface Props extends React.ComponentProps<typeof Select> {
  onSelectFile?: (file: File) => void;
  className?: string;
}

export function FileSelect({
  className,

  onSelectFile,
  ...delegateProps
}: Props) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function loadFiles() {
      const r = await fetch("/api/files/listFiles");
      const rJson = await r.json();

      setFiles(rJson.files || []);
    }

    loadFiles();
  }, []);

  return (
    <Select
      className={className}
      onChange={(e) => {
        onSelectFile?.(
          files.find((file) => file.id === e.currentTarget.value)!,
        );
      }}
      {...delegateProps}
    >
      {files.map((file) => (
        <option key={file.id} value={file.id}>
          {file.name}
        </option>
      ))}
    </Select>
  );
}
