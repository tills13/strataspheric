import * as styles from "./style.css";

import { MeetingAgendaItem } from "../../data";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

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

      <StatusButton type="submit">
        {agendaItem ? "Update Agenda Item" : "Create Agenda Item"}
      </StatusButton>
    </form>
  );
}
