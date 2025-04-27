"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useState } from "react";

import { upsertStrataWidgetAction } from "../../app/@app/dashboard/actions";
import { StrataWidget } from "../../data";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { Select } from "../Select";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { CreateOrUpdateStrataInfoWidgetForm } from "./CreateOrUpdateStrataInfoWidgetForm";

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

interface Props {
  onUpsertWidget?: () => void;
  strataId: string;
  widget?: StrataWidget;
}

export function CreateOrUpdateStrataWidgetForm({
  onUpsertWidget,
  strataId,
  widget,
}: Props) {
  const type = widget ? mapSubtypeToType(widget.type) : undefined;
  const [selectedType, setSelectedType] = useState<string>(type || "file");

  return (
    <form
      action={async (fd) => {
        await upsertStrataWidgetAction(strataId, widget?.id, fd);
        onUpsertWidget?.();
      }}
      className={styles.newWidgetForm}
    >
      <Stack>
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
        <StatusButton
          color="success"
          iconRight={<AddIcon />}
          style="primary"
          type="submit"
        >
          {widget ? "Update" : "Create"} Widget
        </StatusButton>
      </Stack>
    </form>
  );
}
