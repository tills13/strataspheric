"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import React, { useState } from "react";

import { File, StrataWidget } from "../../data";
import { can, p } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
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
  files: File[];
  widget: StrataWidget;
}

export function FileWidget({ files, strataId, widget }: Props) {
  const session = useSession();
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
      strataId={strataId}
      widget={widget}
      widgetTitle={widget.title}
    >
      <div className={abstractWidgetStyles.abstractWidgetList}>
        {files.length === 0 && (
          <InfoPanel alignment="center" level="default">
            <Text>There are no selected files.</Text>
          </InfoPanel>
        )}

        {files.map((file) => (
          <FileWidgetFile
            key={file.id}
            deleteable={widget.type === "file"}
            file={file}
            widget={widget}
          />
        ))}
      </div>

      {showCreateModal && (
        <Modal
          closeModal={() => setShowCreateModal(false)}
          title={"Add File to " + widget.title}
        >
          <AddFileToWidgetForm strataId={strataId} widgetId={widget.id} />
        </Modal>
      )}
    </AbstractWidget>
  );
}
