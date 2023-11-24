"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { File, StrataWidget } from "../../db";
import { can } from "../../db/users/permissions";
import {
  AbstractWidget,
  type Props as AbstractWidgetProps,
} from "../AbstractWidget";
import { AddFileToWidgetForm } from "../AddFileToWidgetForm";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { ExternalLink } from "../Link/ExternalLink";
import { Modal } from "../Modal";

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
        can(session?.user, "stratas.files.create") && {
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
