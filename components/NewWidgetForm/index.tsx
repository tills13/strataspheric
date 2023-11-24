"use client";

import * as styles from "./style.css";

import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { Input } from "../Input";
import { Select } from "../Select";

interface Props {
  createWidget: (formData: FormData) => void;
}

export function NewWidgetForm({ createWidget }: Props) {
  return (
    <form action={createWidget} className={styles.newWidgetForm}>
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
