"use client";

import * as styles from "./style.css";

import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { Header } from "../Header";
import { RemoveIcon } from "../Icon/RemoveIcon";

interface Props {
  modalBodyClassName?: string;
  children: React.ReactNode;
  closeModal: () => void;
  title?: React.ReactNode;
}

export function Modal({
  children,
  closeModal,
  modalBodyClassName,
  title,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null!);

  return ReactDOM.createPortal(
    <div
      className={styles.modalWrapper}
      onClick={(e) => {
        if (e.target === wrapperRef.current) {
          closeModal();
        }
      }}
      ref={wrapperRef}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {title ? <Header priority={2}>{title}</Header> : <div />}
          <RemoveIcon
            className={styles.modalHeaderCloseIcon}
            onClick={closeModal}
          />
        </div>
        <div className={modalBodyClassName}>{children}</div>
      </div>
    </div>,
    document.querySelector("#modal-root")!,
  );
}
