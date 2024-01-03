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
import { Button } from "../Button";
import { FileLink } from "../FileLink";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { DownloadIcon } from "../Icon/DownloadIcon";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { RemoveButton } from "../RemoveButton";

interface Props extends AbstractWidgetProps {
  createFile: (fd: FormData) => void;
  deleteFile: (fileId: string) => void;
  files: File[];
  widget: StrataWidget;
}

export function FileWidget({
  createFile,
  deleteFile,
  deleteWidget,
  files,
  widget,
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

            <div className={styles.fileActions}>
              {can(session?.user, p("stratas", "files", "view")) && (
                <FileLink path={file.path}>
                  <Button
                    icon={<DownloadIcon />}
                    size="small"
                    style="tertiary"
                  />
                </FileLink>
              )}
              {can(session?.user, p("stratas", "widgets", "edit")) && (
                <RemoveButton
                  onClick={deleteFile.bind(undefined, file.id)}
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
