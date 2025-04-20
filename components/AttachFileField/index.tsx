"use client";

import React, { useState } from "react";

import { AttachFileText } from "../AttachFile/AttachFileText";

type AttachFileTextProps = Omit<
  React.ComponentProps<typeof AttachFileText>,
  "defaultValue" | "value"
>;

interface Props extends AttachFileTextProps {
  defaultValue?: AttachFileTextProps["selectedFile"];
  name: string;
  value?: AttachFileTextProps["selectedFile"];
}

export function AttachFileField({
  defaultValue,
  name,
  onSelectFile,
  value,
  ...delegateProps
}: Props) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  return (
    <>
      <AttachFileText
        onSelectFile={(file) => {
          setSelectedFile(file);
          onSelectFile?.(file);
        }}
        selectedFile={value || selectedFile}
        {...delegateProps}
      />

      <input
        type="hidden"
        name={name}
        value={(value || selectedFile)?.id || ""}
      />
    </>
  );
}
