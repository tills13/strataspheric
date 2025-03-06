"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { File, StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import { classnames } from "../../utils/classnames";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { AddFileToWidgetForm } from "../AddFileToWidgetForm";
import { Date } from "../Date";
import { FileLink } from "../FileLink";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { RemoveButton } from "../RemoveButton";
import { Wrap } from "../Wrap";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  files: File[];
  widget: StrataWidget;
  upsertStrataWidget: (fd: FormData) => Promise<void>;
}

export function FileWidget({
  createFile,
  deleteFile,
  deleteWidget,
  files,
  widget,
  upsertStrataWidget,
}: Props) {
  const { data: session } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AbstractWidget
      additionalActions={[
        can(
          session?.user,
          p("stratas", "files", "create"),
          p("stratas", "widgets", "edit"),
        ) && {
          label: "Add File",
          action: () => setShowCreateModal(true),
          icon: <AddIcon />,
        },
      ]}
      className={styles.fileWidget}
      deleteWidget={deleteWidget}
      upsertStrataWidget={upsertStrataWidget}
      widget={widget}
      widgetTitle={widget.title}
    >
      <div className={abstractWidgetStyles.abstractWidgetList}>
        {files.length === 0 && (
          <InfoPanel alignment="center" level="info">
            There are no selected files.
          </InfoPanel>
        )}

        {files.map((file) => (
          <Wrap
            key={file.id}
            if={can(session?.user, p("stratas", "files", "view"))}
            with={(children) => (
              <FileLink path={file.path}>{children}</FileLink>
            )}
          >
            <Group
              className={classnames(
                abstractWidgetStyles.abstractWidgetListItem,
                styles.fileWidgetListItem,
              )}
              align="center"
              justify="space-between"
            >
              <Group
                className={abstractWidgetStyles.abstractWidgetListItemContent}
                align="center"
              >
                <FileTypeIcon
                  className={styles.fileWidgetListItemIcon}
                  filePath={file.path}
                />
                <Header priority={3}>{file.name}</Header>
              </Group>

              <Group>
                <Date
                  className={styles.fileWidgetListItemDate}
                  output="date"
                  timestamp={file.createdAt}
                />
                {widget.type === "file" && (
                  <>
                    {can(session?.user, p("stratas", "widgets", "edit")) && (
                      <RemoveButton
                        action={deleteFile.bind(undefined, file.id)}
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
        ))}
      </div>

      {showCreateModal && (
        <Modal
          closeModal={() => setShowCreateModal(false)}
          title={"Add File to " + widget.title}
        >
          <AddFileToWidgetForm createFile={createFile} />
        </Modal>
      )}
    </AbstractWidget>
  );
}
