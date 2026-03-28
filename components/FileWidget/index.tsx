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
import { Button } from "../Button";
import { AddIcon } from "../Icon/AddIcon";
import { ArrowBackIcon } from "../Icon/ArrowBackIcon";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { Text } from "../Text";
import { FileWidgetFile } from "./FileWidgetFile";

const PAGE_SIZE = 5;

interface Props extends AbstractWidgetProps {
  files: File[];
  widget: StrataWidget;
}

export function FileWidget({ files, strataId, widget }: Props) {
  const session = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(files.length / PAGE_SIZE));
  const paginatedFiles = files.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

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

        {paginatedFiles.map((file) => (
          <FileWidgetFile
            key={file.id}
            deleteable={widget.type === "file"}
            file={file}
            widget={widget}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={abstractWidgetStyles.abstractWidgetPagination}>
          <Button
            size="small"
            style="tertiary"
            iconOnly
            icon={<ArrowBackIcon />}
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          />
          <Text fontSize="small" color="secondary">
            {page + 1} / {totalPages}
          </Text>
          <Button
            size="small"
            style="tertiary"
            iconOnly
            icon={<ArrowForwardIcon />}
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          />
        </div>
      )}

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
