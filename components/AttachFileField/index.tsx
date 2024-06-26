"use client";

import React, { useState } from "react";

import { File } from "../../data";
import { AttachFileButton } from "../AttachFileButton";

type AttachFileButtonProps = Omit<
  React.ComponentProps<typeof AttachFileButton>,
  "defaultValue"
>;

interface Props extends AttachFileButtonProps {
  defaultValue?: File;
  name: string;
}

export function AttachFileField({
  defaultValue,
  name,
  ...delegateProps
}: Props) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  return (
    <>
      <AttachFileButton
        onSelectFile={(file) => {
          setSelectedFile(file);
          delegateProps.onSelectFile?.(file);
        }}
        {...delegateProps}
      />

      <input type="hidden" name={name} value={selectedFile?.id || ""} />
    </>
  );
}
