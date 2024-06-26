"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
import { classnames } from "../../utils/classnames";
import { AttachFileField } from "../AttachFileField";
import { FileAttachmentChip } from "../FileAttachmentChip";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  agendaItem?: MeetingAgendaItem;
  onCreateOrUpdateAgendaItem?: () => void;
  upsertFile: (fd: FormData) => any;
  upsertMeetingAgendaItem: (fd: FormData) => any;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  agendaItem,
  onCreateOrUpdateAgendaItem,
  upsertFile,
  upsertMeetingAgendaItem,
}: Props) {
  const [attachedFile, setAttachedFile] = useState(
    agendaItem?.fileId && agendaItem?.fileName && agendaItem?.filePath
      ? {
          id: agendaItem.fileId,
          name: agendaItem.fileName,
          path: agendaItem.filePath,
        }
      : undefined,
  );

  return (
    <form
      action={async (fd) => {
        await upsertMeetingAgendaItem(fd);
        onCreateOrUpdateAgendaItem?.();
      }}
    >
      <Input
        className={s({ w: "full", mb: "small" })}
        name="title"
        placeholder="Title"
        defaultValue={agendaItem?.title}
      />

      <TextArea
        className={s({ w: "full", mb: "small" })}
        name="description"
        placeholder="Description"
        defaultValue={agendaItem?.description}
      />

      <div
        className={classnames(
          styles.fileAttachmentContainer,
          s({ mb: "large" }),
        )}
      >
        {attachedFile && (
          <FileAttachmentChip
            fileName={attachedFile.name}
            filePath={attachedFile.path}
          />
        )}

        <AttachFileField
          className={styles.fileAttachmentButton}
          defaultValue={attachedFile}
          name="fileId"
          onSelectFile={(file) => setAttachedFile(file)}
          upsertFile={upsertFile}
        />
      </div>

      <StatusButton
        color={agendaItem ? "primary" : "success"}
        iconRight={agendaItem ? <SaveIcon /> : <AddIcon />}
        style="secondary"
        type="submit"
      >
        {agendaItem ? "Update Agenda Item" : "Create Agenda Item"}
      </StatusButton>
    </form>
  );
}
