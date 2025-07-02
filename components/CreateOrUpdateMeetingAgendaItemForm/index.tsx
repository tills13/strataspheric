import { s } from "../../sprinkles.css";

import React from "react";

import { upsertAgendaItemAction } from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { AttachFileField } from "../AttachFileField";
import { AttachInvoiceField } from "../AttachInvoiceField";
import { AddIcon } from "../Icon/AddIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  agendaItem?: MeetingAgendaItem;
  meetingId: string;
  onCreateOrUpdateAgendaItem?: () => void;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  agendaItem,
  meetingId,
  onCreateOrUpdateAgendaItem,
}: Props) {
  return (
    <form
      action={async (fd) => {
        await upsertAgendaItemAction(meetingId, agendaItem?.id, fd);
        onCreateOrUpdateAgendaItem?.();
      }}
    >
      <Stack>
        <Input
          className={s({ w: "full" })}
          name="title"
          label="Description"
          defaultValue={agendaItem?.title}
        />

        <TextArea
          className={s({ w: "full" })}
          name="description"
          label="Details"
          defaultValue={agendaItem?.description}
        />

        <AttachFileField defaultValue={agendaItem?.file} name="fileId" />

        <AttachInvoiceField
          name="invoiceId"
          defaultValue={agendaItem?.invoice}
        />

        <StatusButton
          color={agendaItem ? "primary" : "success"}
          icon={agendaItem ? <SaveIcon /> : <AddIcon />}
          style="primary"
          type="submit"
        >
          {agendaItem ? "Update Agenda Item" : "Add Agenda Item"}
        </StatusButton>
      </Stack>
    </form>
  );
}
