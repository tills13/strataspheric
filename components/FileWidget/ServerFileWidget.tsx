import { FileWidget } from ".";
import { StrataWidget } from "../../data";
import { getWidgetFiles } from "../../data/widgets/getWidgetFiles";
import { type Props as AbstractWidgetProps } from "../AbstractWidget";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => void;
  deleteFile: (fileId: string) => void;
  widget: StrataWidget;
}

export async function ServerFileWidget({
  createFile,
  deleteFile,
  deleteWidget,
  widget,
}: Props) {
  const files = await getWidgetFiles(widget.id, 10, 0);

  return (
    <FileWidget
      createFile={createFile}
      deleteFile={deleteFile}
      deleteWidget={deleteWidget}
      files={files}
      widget={widget}
    />
  );
}
