import * as styles from "./style.css";

import { Button } from "../Button";
import { Input } from "../Input";
import { ElementGroup } from "../ElementGroup";

interface Props {
  createEvent: (fd: FormData) => void;
  widgetId: string;
}

export function NewEventForm({ createEvent, widgetId }: Props) {
  return (
    <form className={styles.newEventForm} action={createEvent}>
      <input name="widget_id" type="hidden" defaultValue={widgetId} />

      <ElementGroup gap="small">
        <Input name="name" placeholder="Name" />
        <Input name="date" type="datetime-local" placeholder="Date" />
      </ElementGroup>

      <Input name="description" placeholder="Description" />
      <Button type="submit">Create</Button>
    </form>
  );
}
