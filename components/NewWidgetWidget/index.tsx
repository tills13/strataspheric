"use client";

import * as styles from "./style.css";

import { useState } from "react";

import { AddIcon } from "../Icon/AddIcon";
import { Modal } from "../Modal";
import { NewWidgetForm } from "../NewWidgetForm";

interface Props {
  createWidget: (fd: FormData) => void;
}

export function NewWidgetWidget({ createWidget }: Props) {
  const [showNewWidgetModal, setShowNewWidgetModal] = useState(false);
  return (
    <>
      <div
        className={styles.addWidgetWidget}
        onClick={() => setShowNewWidgetModal(true)}
      >
        <div className={styles.addWidgetWidgetContainer}>
          <AddIcon className={styles.addWidgetWidgetIcon} />
          <div>Add Widget</div>
        </div>
      </div>
      {showNewWidgetModal && (
        <Modal
          closeModal={() => setShowNewWidgetModal(false)}
          title="New Widget"
        >
          <NewWidgetForm createWidget={createWidget} />
        </Modal>
      )}
    </>
  );
}
