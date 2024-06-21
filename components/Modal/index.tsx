"use client";

import * as styles from "./style.css";

import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Header } from "../Header";
import { RemoveIcon } from "../Icon/RemoveIcon";

interface Props {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
  modalBodyClassName?: string;
  title?: React.ReactNode;
}

export function Modal({
  children,
  className,
  closeModal,
  modalBodyClassName,
  title,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null!);

  return ReactDOM.createPortal(
    <div
      className={classnames(className, styles.modalWrapper)}
      onMouseDown={(e) => {
        if (e.target === wrapperRef.current) {
          closeModal();
        }
      }}
      ref={wrapperRef}
    >
      <div className={styles.modal}>
        <div className={styles.modalBodyContainer}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderTitleContainer}>
              {typeof title === "string" ? (
                <Header className={styles.modalHeaderTitle} priority={2}>
                  {title}
                </Header>
              ) : (
                title
              )}
            </div>

            <Button
              icon={<RemoveIcon />}
              onClick={closeModal}
              style="tertiary"
            />
          </div>
          <div className={modalBodyClassName}>{children}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root")!,
  );
}
