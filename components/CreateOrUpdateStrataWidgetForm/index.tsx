"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { StrataWidget } from "../../data";
import { Button } from "../Button";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Select } from "../Select";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";
import { CreateOrUpdateStrataInfoWidgetForm } from "./CreateOrUpdateStrataInfoWidgetForm";

interface Props {
  upsertStrataWidget: (formData: FormData) => void;
  widget?: StrataWidget;
}

function mapSubtypeToType(subType: StrataWidget["type"]) {
  if (subType.startsWith("file")) {
    return "file";
  } else if (subType.startsWith("event")) {
    return "event";
  } else if (subType.startsWith("info")) {
    return "info";
  }

  return subType;
}

export function CreateOrUpdateStrataWidgetForm({
  upsertStrataWidget,
  widget,
}: Props) {
  const type = widget ? mapSubtypeToType(widget.type) : undefined;
  const [selectedType, setSelectedType] = useState(type || "file");

  return (
    <form action={upsertStrataWidget} className={styles.newWidgetForm}>
      <Stack className={s({ mb: "large" })} gap="normal">
        <Input
          name="title"
          type="title"
          label="Widget Title"
          defaultValue={widget?.title}
        />

        <Select
          label="Widget Type"
          onChangeValue={setSelectedType}
          value={selectedType}
        >
          <option value="info">Info</option>
          <option value="file">Files</option>
          <option value="event">Events</option>
        </Select>

        {selectedType === "event" && (
          <Select
            label="Event Widget Type"
            name="type"
            defaultValue={widget?.type || "event"}
          >
            <option value="event">Manual</option>
            <option value="events_upcoming">Events (Upcoming)</option>
          </Select>
        )}

        {selectedType === "file" && (
          <Select
            label="File Widget Type"
            name="type"
            defaultValue={widget?.type || "file"}
          >
            <option value="file">Manual</option>
            <option value="files_minutes">Minutes (Latest)</option>
            <option value="files_recent">Files (Recent)</option>
          </Select>
        )}

        {selectedType === "info" && (
          <CreateOrUpdateStrataInfoWidgetForm widget={widget} />
        )}
      </Stack>
      <StatusButton
        color="success"
        iconRight={<AddIcon />}
        style="primary"
        type="submit"
      >
        {widget ? "Update" : "Create"} Widget
      </StatusButton>
    </form>
  );
}
