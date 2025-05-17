"use client";

import React, { useEffect, useRef, useState } from "react";

import { File } from "../../data";
import { Button } from "../Button";
import { RemoveIcon } from "../Icon/RemoveIcon";
import { LoadingIcon } from "../LoadingIcon";
import { Select } from "../Select";

interface Props extends React.ComponentProps<typeof Select> {
  fileTypes?: string[];
  onSelectFile?: (file: File | undefined) => void;
}

export function FileSelect({
  onSelectFile,
  fileTypes,
  ...delegateProps
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<HTMLSelectElement>(null!);

  useEffect(() => {
    async function loadFiles() {
      setIsLoading(true);

      const query = new URLSearchParams();

      if (fileTypes) {
        for (const fileType of fileTypes) {
          query.append("fileType", fileType);
        }
      }

      const r = await fetch("/api/files/listFiles?" + query.toString());
      const rJson = await r.json();

      setFiles(rJson.files || []);
      setIsLoading(false);
    }

    if (delegateProps.disabled) {
      setIsLoading(false);
      return;
    }

    loadFiles();
  }, [delegateProps.disabled, fileTypes]);

  return (
    <Select
      key={isLoading ? "SelectLoading" : "SelectLoaded"}
      actionRight={
        <Button
          icon={isLoading ? <LoadingIcon loading /> : <RemoveIcon />}
          color="primary"
          onClick={() => (ref.current.value = "")}
          style="tertiary"
          type="button"
        />
      }
      onChange={(e) => {
        const selectedFile = files.find(
          (file) => file.id === e.currentTarget.value,
        );

        if (!selectedFile) {
          // something went wrong
          return;
        }

        onSelectFile?.(selectedFile);
      }}
      ref={ref}
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
