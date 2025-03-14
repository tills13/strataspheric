"use client";

import { s } from "../../../sprinkles.css";
import { iconColorVar, vars } from "../../theme.css";
import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useState } from "react";

import { AttachFileField } from "../../../components/AttachFileField";
import { FileAttachmentChip } from "../../../components/FileAttachmentChip";
import { Group } from "../../../components/Group";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { File } from "../../../data";
import { classnames } from "../../../utils/classnames";

interface Props {
  upsertFileAction: (fd: FormData) => Promise<File>;
}

export function AttachBylawsField({ upsertFileAction }: Props) {
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <>
      {selectedFile ? (
        <Group>
          <FileAttachmentChip
            className={s({ w: "full" })}
            fileName={selectedFile.name}
            filePath={selectedFile.path}
          />

          <CircleCheckIcon
            style={assignInlineVars({ [iconColorVar]: vars.colors.green500 })}
            height={24}
          />
        </Group>
      ) : (
        <AttachFileField
          attachFileText="Upload Strata Bylaws"
          name="bylawsFileIdId"
          onSelectFile={setSelectedFile}
          upsertFile={upsertFileAction}
        />
      )}
    </>
  );
}
