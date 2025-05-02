import { FileWidget } from ".";
import { StrataWidget } from "../../data";
import { listFiles } from "../../data/files/listFiles";
import { getRecentApprovedMinutes } from "../../data/meetings/getRecentApprovedMinutes";
import { getWidgetFiles } from "../../data/widgets/getWidgetFiles";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

type Props = AbstractWidgetProps;

function loadFiles(widget: StrataWidget) {
  if (widget.type === "file") {
    return getWidgetFiles(widget.id, 10, 0);
  } else if (widget.type === "files_minutes") {
    return getRecentApprovedMinutes(widget.strataId, 10, 0);
  } else if (widget.type === "files_recent") {
    return listFiles(
      { strataId: widget.strataId },
      { orderBy: "createdAt desc" },
    );
  }

  return [];
}

export async function ServerFileWidget({ strataId, widget }: Props) {
  const files = await loadFiles(widget);

  return <FileWidget files={files} strataId={strataId} widget={widget} />;
}
