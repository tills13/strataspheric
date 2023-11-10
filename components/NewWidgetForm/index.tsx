"use client";

import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";
import { Select } from "../Select";
import * as styles from "./style.css";

interface Props {
  createWidget: (formData: FormData) => void;
  strataId: string;
}

export function NewWidgetForm({ createWidget, strataId }: Props) {
  return (
    <form action={createWidget} className={styles.newWidgetForm}>
      <input name="strata_id" type="hidden" defaultValue={strataId} />

      <ElementGroup orientation="column" gap="small">
        <Input name="title" type="title" placeholder="Title" />

        <Select name="type" defaultValue="file">
          <option value="file">Files</option>
          <option value="event">Events</option>
        </Select>

        <Button type="submit">Create Widget</Button>
      </ElementGroup>
    </form>
  );
}
