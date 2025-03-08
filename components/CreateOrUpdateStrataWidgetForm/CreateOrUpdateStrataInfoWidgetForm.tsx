import { useState } from "react";

import { StrataWidget } from "../../data";
import { Select } from "../Select";
import { Stack } from "../Stack";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  widget?: StrataWidget;
}

export function CreateOrUpdateStrataInfoWidgetForm({
  className,
  widget,
}: Props) {
  const [selectedType, setSelectedType] = useState(widget?.type || "info");
  return (
    <Stack className={className}>
      <Select
        label="Info Widget Type"
        name="type"
        onChangeValue={setSelectedType}
        value={selectedType}
      >
        <option value="info">Manual</option>
        <option value="info_contact">Contact</option>
      </Select>

      {selectedType === "info" && (
        <TextArea
          label="Message"
          name="body"
          rows={4}
          defaultValue={widget.body}
        />
      )}
    </Stack>
  );
}
