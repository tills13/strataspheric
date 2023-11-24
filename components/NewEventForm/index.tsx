import * as styles from "./style.css";

import { Button } from "../Button";
import { Input } from "../Input";

interface Props {
  createEvent: (fd: FormData) => void;
}

export function NewEventForm({ createEvent }: Props) {
  return (
    <form className={styles.newEventForm} action={createEvent}>
      <Input name="name" placeholder="Name" />
      <Input name="date" type="datetime-local" placeholder="Date" />

      <Input name="description" placeholder="Description" />
      <Button type="submit">Create</Button>
    </form>
  );
}
