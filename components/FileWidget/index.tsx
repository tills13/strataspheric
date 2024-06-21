"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { File, StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { AddFileToWidgetForm } from "../AddFileToWidgetForm";
import { Date } from "../Date";
import { FileLink } from "../FileLink";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { RemoveButton } from "../RemoveButton";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => void;
  deleteFile: (fileId: string) => void;
  files: File[];
  widget: StrataWidget;
  upsertStrataWidget: (fd: FormData) => void;
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
          <div
            key={file.id}
            className={abstractWidgetStyles.abstractWidgetListItem}
          >
            <div className={abstractWidgetStyles.abstractWidgetListItemContent}>
              <Header priority={3}>
                {can(session?.user, p("stratas", "files", "view")) ? (
                  <FileLink path={file.path}>{file.name}</FileLink>
                ) : (
                  file.name
                )}
              </Header>
              {file.description && <p>{file.description}</p>}
              <Date
                className={styles.fileWidgetListItemDate}
                output="date"
                timestamp={file.createdAt}
              />
            </div>

            <div className={styles.fileActions}>
              {can(session?.user, p("stratas", "widgets", "edit")) && (
                <RemoveButton
                  action={deleteFile.bind(undefined, file.id)}
                  color="error"
                  size="small"
                  style="tertiary"
                />
              )}
            </div>
          </div>
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
