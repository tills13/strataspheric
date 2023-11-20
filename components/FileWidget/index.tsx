import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { auth } from "../../auth";
import { type File as IFileWidget, StrataWidget } from "../../db";
import { can } from "../../db/users/permissions";
import { getWidgetFiles } from "../../db/widgets/getWidgetFiles";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { Header } from "../Header";
import { ExternalLink } from "../Link/ExternalLink";
import { NewFileForm } from "../NewFileForm";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => void;
  widget: StrataWidget;
}

export async function FileWidget({ createFile, deleteWidget, widget }: Props) {
  const session = await auth();
  const files = await getWidgetFiles(widget.id, 10, 0);

  return (
    <AbstractWidget
      className={styles.fileWidget}
      deleteWidget={deleteWidget}
      widget={widget}
    >
      <div className={abstractWidgetStyles.abstractWidgetList}>
        {files.length === 0 && <div>no files</div>}

        {files.map((file) => (
          <div
            key={file.id}
            className={abstractWidgetStyles.abstractWidgetListItem}
          >
            <div>
              <Header priority={3}>{file.name}</Header>
              {file.description && <p>{file.description}</p>}
              <span
                className={styles.fileWidgetListItemDate}
                suppressHydrationWarning
              >
                {new Date(file.createdAt).toLocaleDateString()}
              </span>
            </div>
            <ExternalLink href={file.path} target="_blank">
              Download
            </ExternalLink>
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
