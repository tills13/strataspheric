import * as styles from "./style.css";

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
  deleteEvent?: () => void;
  event?: Event;
  upsertEvent: (fd: FormData) => Promise<any>;
}

export function CreateOrUpdateEventForm({
  upsertEvent,
  defaultDate,
  deleteEvent,
  event,
}: Props) {
  return (
    <form
      className={styles.newEventForm}
      action={async (fd) => {
        patchTimezoneOffset(fd, "date_start");
        patchTimezoneOffset(fd, "date_end");

        const u = await upsertEvent(fd);
      }}
    >
      <Input name="name" placeholder="Name" defaultValue={event?.name} />

      <DateInput
        name="date"
        defaultStartValue={event?.startDate || defaultDate}
        defaultEndValue={event?.endDate || defaultDate}
        type="range"
      />

      <TextArea
        name="description"
        placeholder="Description"
        defaultValue={event?.description}
      />

      <ElementGroup gap="small">
        {event && deleteEvent && (
          <ConfirmButton
            onClickConfirm={deleteEvent}
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
