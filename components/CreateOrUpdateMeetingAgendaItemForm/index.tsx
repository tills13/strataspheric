"use client";

import { s } from "../../sprinkles.css";

import React, { useState } from "react";

import {
  insertAgendaItemAfterAction,
  upsertAgendaItemAction,
} from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { MeetingAgendaItemType } from "../../data";
import { MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { AttachFileField } from "../AttachFileField";
import { AttachInvoiceField } from "../AttachInvoiceField";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { RadioButton } from "../RadioButton";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

const AGENDA_ITEM_TYPES: MeetingAgendaItemType[] = [
  "item",
  "discussion",
  "vote",
];

const TYPE_LABELS: Record<MeetingAgendaItemType, string> = {
  item: "Agenda Item",
  discussion: "Discussion",
  vote: "Vote",
};

const TYPE_PLACEHOLDERS: Record<
  MeetingAgendaItemType,
  { title: string; description: string }
> = {
  item: {
    title: "Agenda item title",
    description: "Additional details or context",
  },
  discussion: {
    title: "Discussion topic",
    description: "Notes or context for this discussion",
  },
  vote: {
    title: "Motion or question to vote on",
    description: "Details about the motion",
  },
};

interface Props {
  afterItemId?: string;
  agendaItem?: MeetingAgendaItem;
  meetingId: string;
  onCreateOrUpdateAgendaItem?: () => void;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  afterItemId,
  agendaItem,
  meetingId,
  onCreateOrUpdateAgendaItem,
}: Props) {
  const [selectedType, setSelectedType] = useState<MeetingAgendaItemType>(
    agendaItem?.type ?? "item",
  );

  return (
    <form
      action={async (fd) => {
        if (afterItemId) {
          await insertAgendaItemAfterAction(meetingId, afterItemId, fd);
        } else {
          await upsertAgendaItemAction(meetingId, agendaItem?.id, fd);
        }
        onCreateOrUpdateAgendaItem?.();
      }}
    >
      <Stack>
        <RadioButton
          name="type"
          options={AGENDA_ITEM_TYPES}
          defaultValue={selectedType}
          onChange={(value) => {
            if (value === "item" || value === "discussion" || value === "vote") {
              setSelectedType(value);
            }
          }}
        />

        <Input
          className={s({ w: "full" })}
          name="title"
          label={selectedType === "vote" ? "Motion" : "Description"}
          placeholder={TYPE_PLACEHOLDERS[selectedType].title}
          defaultValue={agendaItem?.title}
        />

        <TextArea
          className={s({ w: "full" })}
          name="description"
          label="Details"
          placeholder={TYPE_PLACEHOLDERS[selectedType].description}
          defaultValue={agendaItem?.description}
        />

        {selectedType === "item" && (
          <>
            <AttachFileField defaultValue={agendaItem?.file} name="fileId" />

            <AttachInvoiceField
              name="invoiceId"
              defaultValue={
                agendaItem?.invoice as React.ComponentProps<
                  typeof AttachInvoiceField
                >["defaultValue"]
              }
            />
          </>
        )}

        <StatusButton
          color={agendaItem ? "primary" : "success"}
          icon={agendaItem ? <SaveIcon /> : <AddIcon />}
          style="primary"
          type="submit"
        >
          {agendaItem
            ? `Update ${TYPE_LABELS[selectedType]}`
            : `Add ${TYPE_LABELS[selectedType]}`}
        </StatusButton>
      </Stack>
    </form>
  );
}
