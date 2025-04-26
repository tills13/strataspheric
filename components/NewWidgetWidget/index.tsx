"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { CreateOrUpdateStrataWidgetForm } from "../CreateOrUpdateStrataWidgetForm";
import { AddIcon } from "../Icon/AddIcon";
import { Modal } from "../Modal";

interface Props {
  strataId: string;
}

export function NewWidgetWidget({ strataId }: Props) {
  const [showNewWidgetModal, setShowNewWidgetModal] = useState(false);

  return (
    <>
      <div
        className={styles.addWidgetWidget}
        onClick={() => setShowNewWidgetModal(true)}
      >
        <div className={styles.addWidgetWidgetContainer}>
          <AddIcon className={styles.addWidgetWidgetIcon} />
          <span>Add Widget</span>
        </div>
      </div>
      {showNewWidgetModal && (
        <Modal
          closeModal={() => setShowNewWidgetModal(false)}
          title="New Widget"
        >
          <CreateOrUpdateStrataWidgetForm
            onUpsertWidget={() => setShowNewWidgetModal(false)}
            strataId={strataId}
          />
        </Modal>
      )}
    </>
  );
}
