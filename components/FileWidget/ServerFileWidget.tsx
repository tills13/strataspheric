import { FileWidget } from ".";
import { StrataWidget } from "../../data";
import { listFiles } from "../../data/files/listFiles";
import { getRecentApprovedMinutes } from "../../data/meetings/getRecentApprovedMinutes";
import { getWidgetFiles } from "../../data/widgets/getWidgetFiles";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
}

function loadFiles(widget: StrataWidget) {
  if (widget.type === "file") {
    return getWidgetFiles(widget.id, 10, 0);
  } else if (widget.type === "files_minutes") {
    return getRecentApprovedMinutes(widget.strataId, 10, 0);
  } else if (widget.type === "files_recent") {
    return listFiles(widget.strataId, false, "createdAt desc");
  }

  return [];
}

export async function ServerFileWidget({
  createFile,
  deleteFile,
  deleteWidget,
  widget,
  upsertStrataWidget,
}: Props) {
  const files = await loadFiles(widget);

  return (
    <FileWidget
      createFile={createFile}
      deleteFile={deleteFile}
      deleteWidget={deleteWidget}
      files={files}
      widget={widget}
      upsertStrataWidget={upsertStrataWidget}
    />
  );
}
