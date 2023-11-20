import * as styles from "./style.css";

import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";

interface Props {
  createEvent: (fd: FormData) => void;
  widgetId: string;
}

export function NewEventForm({ createEvent, widgetId }: Props) {
  return (
    <form className={styles.newEventForm} action={createEvent}>
      <input name="widget_id" type="hidden" defaultValue={widgetId} />

      <Input name="name" placeholder="Name" />
      <Input name="date" type="datetime-local" placeholder="Date" />

      <Input name="description" placeholder="Description" />
      <Button type="submit">Create</Button>
    </form>
  );
}
