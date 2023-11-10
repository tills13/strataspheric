import * as styles from "./style.css";
import { type FileWidget as IFileWidget } from "../../data/widgets";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { auth } from "../../auth";
import { can } from "../../data/members/permissions";
import { NewFileForm } from "../NewFileForm";
import { Header } from "../Header";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => void;
  widget: IFileWidget;
}

export async function FileWidget({ createFile, deleteWidget, widget }: Props) {
  const session = await auth();

  return (
    <AbstractWidget
      className={styles.fileWidget}
      deleteWidget={deleteWidget}
      widget={widget}
    >
      <div className={styles.fileWidgetList}>
        {widget.files.length === 0 && <div>no files</div>}

        {widget.files.map((file) => (
          <div key={file.id}>
            <Header priority={3}>{file.name}</Header>
            <span suppressHydrationWarning>
              {file.createdAt.toLocaleDateString()}
            </span>
            <a href={file.path} target="_blank">
              Download
            </a>
          </div>
        ))}
      </div>

      {can(session?.user, "stratas.files.create") && (
        <div className={styles.fileWidgetFooter}>
          <Header priority={4}>New File</Header>
          <NewFileForm createFile={createFile} widgetId={widget.id} />
        </div>
      )}
    </AbstractWidget>
  );
}
