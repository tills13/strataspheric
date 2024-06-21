"use client";

import * as styles from "./style.css";

import { StrataWidget } from "../../data";
import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Select } from "../Select";

interface Props {
  upsertStrataWidget: (formData: FormData) => void;
  widget?: StrataWidget;
}

export function CreateOrUpdateStrataWidgetForm({
  upsertStrataWidget,
  widget,
}: Props) {
  return (
    <form action={upsertStrataWidget} className={styles.newWidgetForm}>
      <ElementGroup orientation="column" gap="small">
        <Input
          name="title"
          type="title"
          placeholder="Title"
          defaultValue={widget?.title}
        />

        <Select name="type" defaultValue={widget?.type || "file"}>
          <option value="file">Files</option>
          <option value="event">Events</option>
        </Select>

        <Button
          color="success"
          iconRight={<AddIcon />}
          style="secondary"
          type="submit"
        >
          Create Widget
        </Button>
      </ElementGroup>
    </form>
  );
}
