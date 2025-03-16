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
import { AddIcon } from "../Icon/AddIcon";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { Text } from "../Text";
import { FileWidgetFile } from "./FileWidgetFile";

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
        ) &&
          widget.type === "file" && {
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
            <Text>There are no selected files.</Text>
          </InfoPanel>
        )}

        {files.map((file) => (
          <FileWidgetFile
            key={file.id}
            deleteFile={deleteFile}
            deleteable={widget.type === "file"}
            file={file}
          />
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
