import * as styles from "./style.css";

import { Button } from "../Button";
import { Input } from "../Input";

export function formatDefaultDate(d: Date) {
  return d.toISOString().substring(0, 16);
}

interface Props {
  defaultDate?: string;
  createEvent: (fd: FormData) => void;
}

export function NewEventForm({ createEvent, defaultDate }: Props) {
  return (
    <form className={styles.newEventForm} action={createEvent}>
      <Input name="name" placeholder="Name" />
      <Input
        name="date"
        type="datetime-local"
        placeholder="Date"
        defaultValue={defaultDate}
      />

      <Input name="description" placeholder="Description" />
      <Button type="submit">Create</Button>
    </form>
  );
}
