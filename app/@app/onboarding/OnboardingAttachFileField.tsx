"use client";

import { iconColorVar, vars } from "../../theme.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useState } from "react";

import { AttachFileField } from "../../../components/AttachFileField";
import { Group } from "../../../components/Group";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { File } from "../../../data";

interface Props {
  name: string;
  placeholder: string;
  upsertFile: (fd: FormData) => Promise<File>;
}

export function OnboardingAttachFileField({
  name,
  placeholder,
  upsertFile,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <Group justify="space-between">
      <AttachFileField
        placeholder={placeholder}
        name={name}
        onSelectFile={setSelectedFile}
        upsertFile={upsertFile}
        value={selectedFile}
      />
      {selectedFile && (
        <CircleCheckIcon
          style={assignInlineVars({ [iconColorVar]: vars.colors.green500 })}
          height={24}
        />
      )}
    </Group>
  );
}
