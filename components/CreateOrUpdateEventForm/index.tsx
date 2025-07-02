import { mutate } from "swr";

import {
  deleteEventAction,
  upsertEventAction,
} from "../../app/@app/dashboard/calendar/[...segments]/actions";
import { Event } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { ConfirmButton } from "../ConfirmButton";
import { DateInput } from "../DateInput";
import { Flex } from "../Flex";
import { AddIcon } from "../Icon/AddIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  defaultDate?: string;
  event?: Pick<Event, "id" | "name" | "description" | "startDate" | "endDate">;
  onDeleteEvent?: () => void;
  submitLabel?: React.ReactNode;
}

export function CreateOrUpdateEventForm({
  defaultDate,
  event,
  onDeleteEvent,
  submitLabel,
}: Props) {
  return (
    <form
      action={async (fd) => {
        patchTimezoneOffset(fd, "date_start");
        patchTimezoneOffset(fd, "date_end");

        await upsertEventAction(event?.id, fd);
        mutate((k) => Array.isArray(k) && k[1] === "events");
      }}
    >
      <Stack>
        <Input name="name" label="Name" defaultValue={event?.name} />

        <DateInput
          name="date"
          defaultStartValue={event?.startDate || defaultDate}
          defaultEndValue={event?.endDate || defaultDate}
          type="range"
        />

        <TextArea
          name="description"
          label="Description"
          defaultValue={event?.description}
        />

        <Flex from="tablet">
          {event && (
            <ConfirmButton
              onClickConfirm={async () => {
                await deleteEventAction(event.id);
                mutate((k) => Array.isArray(k) && k[1] === "events");
                onDeleteEvent?.();
              }}
              icon={<DeleteIcon />}
              color="error"
              style="secondary"
            >
              Delete Event
            </ConfirmButton>
          )}

          <StatusButton
            color="primary"
            icon={<AddIcon />}
            style="primary"
            type="submit"
          >
            {submitLabel || (event ? "Update Event" : "Create Event")}
          </StatusButton>
        </Flex>
      </Stack>
    </form>
  );
}
