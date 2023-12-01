import * as styles from "./style.css";

import { MeetingAgendaItem } from "../../data";
import { FormSubmitStatusButton } from "../FormSubmitStatusButton";
import { Input } from "../Input";

interface Props {
  createOrUpdateMeetingAgendaItem: (fd: FormData) => void;
  agendaItem?: MeetingAgendaItem;
}

export function CreateOrUpdateMeetingAgendaItemForm({
  createOrUpdateMeetingAgendaItem,
  agendaItem,
}: Props) {
  return (
    <form action={createOrUpdateMeetingAgendaItem}>
      <Input
        className={styles.input}
        name="title"
        placeholder="Title"
        defaultValue={agendaItem?.title}
      />

      <Input
        className={styles.input}
        name="description"
        placeholder="Description"
        defaultValue={agendaItem?.description}
      />

      <FormSubmitStatusButton type="submit">
        {agendaItem ? "Update Agenda Item" : "Create Agenda Item"}
      </FormSubmitStatusButton>
    </form>
  );
}
