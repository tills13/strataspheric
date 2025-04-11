"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useEffect, useState } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { LoadingIcon } from "../LoadingIcon";
import { Panel } from "../Panel";
import { Select } from "../Select";
import { Text } from "../Text";

interface Props extends React.ComponentProps<typeof Select> {
  fileTypes?: string[];
  onSelectFile?: (file: File) => void;
}

export function FileSelect({
  onSelectFile,
  fileTypes,
  ...delegateProps
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

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

  if (isLoading) {
    return (
      <Panel
        className={classnames(styles.loadingState, s({ w: "full" }))}
        noPadding
      >
        <Group className={s({ w: "full" })} justify="space-between">
          <Text color="secondary">Loading files...</Text>
          <LoadingIcon size="xs" />
        </Group>
      </Panel>
    );
  }

  return (
    <Select
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
