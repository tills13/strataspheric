"use client";

import * as styles from "./style.css";

import React, { useState } from "react";

import { ConfirmModal } from "../ConfirmModal";

interface Props {
  children: React.ReactNode;
  onClickConfirm: () => void | Promise<void>;
  confirmModalDescription?: React.ComponentProps<
    typeof ConfirmModal
  >["description"];
  confirmModalTitle?: React.ComponentProps<typeof ConfirmModal>["title"];
}

export function ConfirmClickableText({
  children,
  confirmModalDescription,
  confirmModalTitle,
  onClickConfirm,
}: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <span
        className={styles.confirmClickableText}
        onClick={(e) => {
          e.preventDefault();
          setShowConfirmModal(true);
        }}
      >
        {children}
      </span>

      {showConfirmModal && (
        <ConfirmModal
          closeModal={() => setShowConfirmModal(false)}
          description={confirmModalDescription}
          onClickConfirm={onClickConfirm}
          title={confirmModalTitle}
        />
      )}
    </>
  );
}
