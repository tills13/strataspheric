"use client";

import { s } from "../../sprinkles.css";
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
      <ElementGroup
        className={s({ mb: "large" })}
        orientation="column"
        gap="normal"
      >
        <Input
          name="title"
          type="title"
          label="Widget Title"
          defaultValue={widget?.title}
        />

        <Select
          label="Widget Type"
          name="type"
          defaultValue={widget?.type || "file"}
        >
          <option value="file">Files</option>
          <option value="event">Events</option>
        </Select>
      </ElementGroup>
      <Button
        color="success"
        iconRight={<AddIcon />}
        style="secondary"
        type="submit"
      >
        {widget ? "Update" : "Create"} Widget
      </Button>
    </form>
  );
}
