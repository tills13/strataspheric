import * as styles from "./style.css";

import { mutate } from "swr";

import { Event } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { ConfirmButton } from "../ConfirmButton";
import { DateInput } from "../DateInput";
import { ElementGroup } from "../ElementGroup";
import { AddIcon } from "../Icon/AddIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  defaultDate?: string;
  deleteEvent?: () => Promise<any>;
  event?: Event;
  onDeleteEvent?: () => void;
  upsertEvent: (fd: FormData) => Promise<any>;
}

export function CreateOrUpdateEventForm({
  defaultDate,
  deleteEvent,
  event,
  onDeleteEvent,
  upsertEvent,
}: Props) {
  return (
    <form
      className={styles.newEventForm}
      action={async (fd) => {
        console.log(fd.get("date_end"));
        patchTimezoneOffset(fd, "date_start");
        patchTimezoneOffset(fd, "date_end");

        console.log(fd.get("date_end"));

        await upsertEvent(fd);
        mutate((k) => Array.isArray(k) && k[1] === "events");
      }}
    >
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

      <ElementGroup gap="small">
        {event && deleteEvent && (
          <ConfirmButton
            onClickConfirm={async () => {
              await deleteEvent();
              mutate((k) => Array.isArray(k) && k[1] === "events");
              onDeleteEvent?.();
            }}
            iconRight={<DeleteIcon />}
            color="error"
            style="secondary"
          >
            Delete Event
          </ConfirmButton>
        )}

        <StatusButton
          color="primary"
          iconRight={<AddIcon />}
          style="secondary"
          type="submit"
        >
          {event ? "Update Event" : "Create Event"}
        </StatusButton>
      </ElementGroup>
    </form>
  );
}
