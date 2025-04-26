import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { deleteWidgetFileAction } from "../../app/@app/dashboard/actions";
import { File, StrataWidget } from "../../data";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { classnames } from "../../utils/classnames";
import { Date } from "../Date";
import { FileLink } from "../FileLink";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";
import { RemoveButton } from "../RemoveButton";
import { Wrap } from "../Wrap";

interface Props {
  deleteable?: boolean;
  file: File;
  widget: StrataWidget;
}

export function FileWidgetFile({ deleteable, file, widget }: Props) {
  const can = useCan();

  return (
    <Wrap
      if={can(p("stratas", "files", "view"))}
      with={(children) => <FileLink path={file.path}>{children}</FileLink>}
    >
      <Group
        className={classnames(
          abstractWidgetStyles.abstractWidgetListItem,
          styles.fileWidgetListItem,
        )}
        justify="space-between"
      >
        <Group className={abstractWidgetStyles.abstractWidgetListItemContent}>
          <FileTypeIcon
            className={styles.fileWidgetListItemIcon}
            filePath={file.path}
          />
          <span className={styles.fileWidgetListItemTitle}>{file.name}</span>
        </Group>

        <Group>
          <Date
            className={styles.fileWidgetListItemDate}
            output="date"
            timestamp={file.createdAt}
          />
          {deleteable && (
            <>
              {can(p("stratas", "widgets", "edit")) && (
                <RemoveButton
                  action={deleteWidgetFileAction.bind(
                    undefined,
                    widget.id,
                    file.id,
                  )}
                  color="error"
                  size="small"
                  style="tertiary"
                />
              )}
            </>
          )}
        </Group>
      </Group>
    </Wrap>
  );
}
