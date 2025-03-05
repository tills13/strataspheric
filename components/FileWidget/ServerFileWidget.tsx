import { FileWidget } from ".";
import { getWidgetFiles } from "../../data/widgets/getWidgetFiles";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
}

export async function ServerFileWidget({
  createFile,
  deleteFile,
  deleteWidget,
  widget,
  upsertStrataWidget,
}: Props) {
  const files = await getWidgetFiles(widget.id, 10, 0);

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
